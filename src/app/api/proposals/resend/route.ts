// src/app/api/proposals/resend/route.ts
// Retry sending existing proposal to client without creating duplicate proposals

import { NextRequest, NextResponse } from 'next/server';
import { sendProposalEmail } from '@/lib/emailService';
import { GeneratedProposal } from '@/types/admin';
import { adminDb } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let proposal = body.proposal;
    const leadId = body.leadId || body.id;

    if (!proposal && (body.leadInput || body.lead || body.businessEmail || body.email)) {
      const input = body.leadInput || body.lead || body;
      const { synthesizeProposal } = await import('@/lib/proposalEngine');
      proposal = synthesizeProposal({
        fullName: input.fullName || input.name || 'Valued Partner',
        companyName: input.companyName || 'Enterprise Partner',
        businessEmail: input.businessEmail || input.email,
        mobileNumber: input.mobileNumber || input.phone || '+91 9999999999',
        partnershipModel: input.partnershipModel || input.businessType || 'White-Label B2B Portal & App',
        retailNetwork: input.retailNetwork || input.estimatedRetailers || '10–50 Retailers',
        selectedServices: input.selectedServices || [],
        additionalRequirements: input.additionalRequirements || '',
      });
      if (input.proposalId) proposal.proposalId = input.proposalId;
    }

    if (!proposal || (!proposal.client?.businessEmail && !body.email)) {
      return NextResponse.json({ error: 'Valid proposal content with recipient email is required to resend.' }, { status: 400 });
    }

    if (body.email && proposal.client) {
      proposal.client.businessEmail = body.email;
    }

    // Attempt email dispatch (with PDF attached)
    const result = await sendProposalEmail(proposal as GeneratedProposal);

    // Update database status if leadId is provided
    if (leadId && adminDb) {
      try {
        const updatePayload = {
          email_status: result.success ? 'sent' : 'failed',
          emailStatus: result.success ? 'sent' : 'failed',
          sent_at: result.success ? new Date() : null,
          sentAt: result.success ? new Date() : null,
          updated_at: new Date(),
          updatedAt: new Date(),
        };

        // Update in demo_requests collection
        const demoRef = adminDb.collection('demo_requests').doc(leadId);
        const demoSnap = await demoRef.get();
        if (demoSnap.exists) {
          await demoRef.update(updatePayload);
        }

        // Update in leads collection
        const leadRef = adminDb.collection('leads').doc(leadId);
        const leadSnap = await leadRef.get();
        if (leadSnap.exists) {
          await leadRef.update(updatePayload);
        }
      } catch (dbErr) {
        console.warn('Database update skipped during proposal resend:', dbErr);
      }
    }

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error || 'Failed to dispatch email. Check server email settings.',
      }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      message: `Proposal successfully resent to ${proposal.client.businessEmail}`,
      simulated: result.simulated ?? false,
      provider: result.provider,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error resending proposal';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
