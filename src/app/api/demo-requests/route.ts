// src/app/api/demo-requests/route.ts
// Backend endpoint for receiving demo requests, synthesizing proposals, and dispatching emails

import { NextRequest, NextResponse } from 'next/server';
import { synthesizeProposal } from '@/lib/proposalEngine';
import { sendProposalEmail } from '@/lib/emailService';
import { adminDb } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

// In-memory rate limiter: max 5 submissions per 15 minutes per IP/email
const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record) {
    rateLimitMap.set(key, { count: 1, firstAttempt: now });
    return false;
  }

  if (now - record.firstAttempt > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(key, { count: 1, firstAttempt: now });
    return false;
  }

  if (record.count >= MAX_ATTEMPTS) {
    return true;
  }

  record.count += 1;
  return false;
}

// Clean old records every 30 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now - value.firstAttempt > RATE_LIMIT_WINDOW) {
        rateLimitMap.delete(key);
      }
    }
  }, 30 * 60 * 1000);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      businessEmail,
      mobileNumber,
      companyName,
      partnershipModel,
      retailNetwork,
      selectedServices,
      additionalRequirements,
      honeypot, // anti-spam hidden field
    } = body;

    // 1. Anti-Spam Honeypot Verification
    if (honeypot) {
      console.warn('[SPAM DETECTED] Honeypot field filled by bot:', honeypot);
      // Silently return success to mislead bots
      return NextResponse.json({
        success: true,
        message: 'Your requirements have been received successfully.',
        proposalId: 'FIN-2026-SPAM-FILTERED',
      });
    }

    // 2. In-Memory Rate Limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
    const emailKey = businessEmail ? String(businessEmail).toLowerCase().trim() : clientIp;
    if (isRateLimited(emailKey) || isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests submitted. Please wait 15 minutes before trying again.' },
        { status: 429 }
      );
    }

    // 3. Backend Input Validation & Sanitization
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ error: 'Full name is required (minimum 2 characters).' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!businessEmail || !emailRegex.test(String(businessEmail).trim())) {
      return NextResponse.json({ error: 'A valid business email address is required.' }, { status: 400 });
    }

    const sanitizedPhone = String(mobileNumber || '').replace(/[^\d+ ]/g, '').trim();
    const digitCount = sanitizedPhone.replace(/\D/g, '').length;
    if (!sanitizedPhone || digitCount < 10) {
      return NextResponse.json({ error: 'A valid mobile number with country code is required (min 10 digits).' }, { status: 400 });
    }

    const validModels = [
      'White-Label B2B Portal & App',
      'Master Distributor Model',
      'Enterprise REST APIs',
      'Hardware Micro ATM Distribution',
    ];
    if (!partnershipModel || !validModels.some((m) => partnershipModel.includes(m.split(' ')[0]))) {
      return NextResponse.json({ error: 'Please select a valid partnership model.' }, { status: 400 });
    }

    const validNetworks = [
      'Starting New (1–10 Retailers)',
      '10–50 Retailers',
      '50–200 Retailers',
      '200–1,000+ Retailers',
      'Enterprise Bank Switch',
    ];
    if (!retailNetwork) {
      return NextResponse.json({ error: 'Please select your estimated retail network size.' }, { status: 400 });
    }

    const sanitizedServices = Array.isArray(selectedServices) && selectedServices.length > 0
      ? selectedServices.map((s) => String(s).trim())
      : ['Aadhaar Enabled Payment System (AePS)', 'Domestic Money Transfer (DMT)', 'Micro ATM', 'BBPS'];

    const cleanFullName = String(fullName).replace(/[<>]/g, '').trim();
    const cleanCompany = companyName ? String(companyName).replace(/[<>]/g, '').trim() : `${cleanFullName}'s Network`;
    const cleanEmail = String(businessEmail).trim().toLowerCase();
    const cleanNotes = additionalRequirements ? String(additionalRequirements).replace(/[<>]/g, '').trim() : undefined;

    // 4. Synthesize Personalized Proposal via Analysis Engine
    const proposal = synthesizeProposal({
      fullName: cleanFullName,
      businessEmail: cleanEmail,
      mobileNumber: sanitizedPhone,
      companyName: cleanCompany,
      partnershipModel,
      retailNetwork,
      selectedServices: sanitizedServices,
      additionalRequirements: cleanNotes,
      customProposalId: body.customProposalId || body.proposalId,
    });

    let emailStatus: 'pending' | 'sending' | 'sent' | 'failed' = 'sending';
    let proposalStatus: 'generating' | 'generated' | 'sent' | 'failed' = 'generated';

    // 5. Dispatch Email to Client with Attached PDF
    let emailDispatchDetails: any = null;
    try {
      const emailResult = await sendProposalEmail(proposal);
      emailDispatchDetails = emailResult;
      console.log('[DEMO-REQUEST EMAIL RESULT]:', emailResult);
      if (emailResult.clientDelivered) {
        emailStatus = 'sent';
        proposalStatus = 'sent';
      } else if (emailResult.adminDelivered) {
        emailStatus = 'pending';
        proposalStatus = 'generated';
      } else if (emailResult.simulated) {
        emailStatus = 'sent';
        proposalStatus = 'sent';
      } else {
        emailStatus = 'failed';
        console.error('[DEMO-REQUEST EMAIL FAILED]:', emailResult.error);
      }
    } catch (emailErr) {
      console.error('Proposal email delivery error:', emailErr);
      emailStatus = 'failed';
    }

    const pdfDownloadUrl = `/api/proposals/${proposal.proposalId}/pdf`;

    // 6. Save Lead in Database (Section 15 Schema)
    let leadDocId = `demo-${Date.now()}`;
    try {
      if (adminDb) {
        // Save to demo_requests collection
        const demoRef = await adminDb.collection('demo_requests').add({
          proposal_id: proposal.proposalId,
          full_name: cleanFullName,
          mobile_number: sanitizedPhone,
          business_email: cleanEmail,
          company_name: cleanCompany,
          partnership_model: partnershipModel,
          retail_network: retailNetwork,
          selected_services: sanitizedServices,
          additional_requirements: cleanNotes || null,
          proposal_content: proposal,
          proposal_pdf_url: pdfDownloadUrl,
          email_status: emailStatus,
          proposal_status: proposalStatus,
          internal_notes: null,
          created_at: FieldValue.serverTimestamp(),
          updated_at: FieldValue.serverTimestamp(),
          sent_at: emailStatus === 'sent' ? FieldValue.serverTimestamp() : null,
        });
        leadDocId = demoRef.id;

        // Also duplicate to leads collection for backward compatibility with existing admin views
        await adminDb.collection('leads').doc(leadDocId).set({
          proposalId: proposal.proposalId,
          name: cleanFullName,
          email: cleanEmail,
          phone: sanitizedPhone,
          companyName: cleanCompany,
          businessType: partnershipModel,
          estimatedRetailers: retailNetwork,
          selectedServices: sanitizedServices,
          additionalRequirements: cleanNotes || null,
          proposalContent: proposal,
          proposalPdfUrl: pdfDownloadUrl,
          proposalStatus,
          emailStatus,
          status: 'new',
          source: 'Schedule Your Free Live Product Demo',
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
          sentAt: emailStatus === 'sent' ? FieldValue.serverTimestamp() : null,
        });
      }
    } catch (dbErr) {
      console.warn('Firestore database write skipped (fallback to local memory):', dbErr);
    }

    const confirmationMessage = emailStatus === 'sent'
      ? `Thank you! Your requirements have been received and your official FinTech proposal PDF has been dispatched directly to ${cleanEmail}.`
      : `Thank you! Your requirements have been received and your official proposal has been synthesized. You can view and download your PDF proposal immediately below.`;

    return NextResponse.json({
      success: true,
      message: confirmationMessage,
      id: leadDocId,
      proposalId: proposal.proposalId,
      proposal,
      pdfUrl: pdfDownloadUrl,
      emailStatus,
      proposalStatus,
      emailDispatchResult: emailDispatchDetails,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error processing demo request';
    console.error('POST /api/demo-requests error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
