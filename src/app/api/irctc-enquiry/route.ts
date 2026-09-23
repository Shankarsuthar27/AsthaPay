// src/app/api/irctc-enquiry/route.ts
// Backend endpoint for receiving IRCTC Agent inquiries, recording them in Firestore, and sending confirmation notifications

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

// In-memory rate limiter: max 5 submissions per 15 minutes per IP/email
const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, mobileNumber, state, message, honeypot } = body;

    // Honeypot anti-spam check
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Received' }, { status: 200 });
    }

    // Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter a valid full name.' }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const cleanMobile = (mobileNumber || '').replace(/[^0-9+]/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit mobile number.' }, { status: 400 });
    }

    // Rate Limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const rateLimitKey = `${ip}_${email.toLowerCase()}`;
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few minutes before submitting again.' },
        { status: 429 }
      );
    }

    const enquiryDoc = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      mobileNumber: cleanMobile,
      state: state || 'Not Specified',
      message: message ? message.trim() : '',
      service: 'IRCTC Authorized Agent Registration',
      status: 'pending',
      createdAt: new Date().toISOString(),
      source: 'irctc_landing_page',
    };

    // Save to Firestore if available
    try {
      if (adminDb) {
        await adminDb.collection('irctc_enquiries').add(enquiryDoc);
      }
    } catch (dbErr) {
      console.warn('Firestore write skipped or failed:', dbErr);
    }

    // Dispatch Email Notifications (Admin Alert & Applicant Confirmation)
    const adminNotificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'shankar.952152@gmail.com';
    try {
      const { sendEmail } = await import('@/lib/emailService');

      // 1. Alert Admin/Operations
      await sendEmail({
        to: adminNotificationEmail,
        subject: `[IRCTC Lead Alert] New Agent Application: ${enquiryDoc.fullName} (${enquiryDoc.state})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 10px; background: #FFFFFF;">
            <div style="background: #D8232A; color: #FFFFFF; padding: 12px 16px; border-radius: 6px; font-weight: bold; font-size: 16px;">
              🚆 New IRCTC Agent Registration Enquiry
            </div>
            <p style="margin-top: 16px; font-size: 14px; color: #334155;">
              A new applicant has submitted an inquiry to become an IRCTC Authorized Agent:
            </p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 140px;">Applicant Name:</td>
                <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${enquiryDoc.fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Mobile Number:</td>
                <td style="padding: 8px 0; color: #0F172A;"><a href="tel:${enquiryDoc.mobileNumber}" style="color: #2563EB;">${enquiryDoc.mobileNumber}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td>
                <td style="padding: 8px 0; color: #0F172A;"><a href="mailto:${enquiryDoc.email}" style="color: #2563EB;">${enquiryDoc.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">State / Region:</td>
                <td style="padding: 8px 0; color: #0F172A;">${enquiryDoc.state}</td>
              </tr>
              ${enquiryDoc.message ? `
              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Applicant Message:</td>
                <td style="padding: 8px 0; color: #0F172A;">${enquiryDoc.message}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Submitted At:</td>
                <td style="padding: 8px 0; color: #64748B;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
              </tr>
            </table>
          </div>
        `,
        text: `[IRCTC Agent Application]\nName: ${enquiryDoc.fullName}\nPhone: ${enquiryDoc.mobileNumber}\nEmail: ${enquiryDoc.email}\nState: ${enquiryDoc.state}\nMessage: ${enquiryDoc.message || 'N/A'}\nSubmitted: ${new Date().toISOString()}`,
      });

      // 2. Send Confirmation to Applicant (if not same as admin)
      if (enquiryDoc.email.toLowerCase() !== adminNotificationEmail.toLowerCase()) {
        await sendEmail({
          to: enquiryDoc.email,
          subject: 'Thank You for Your IRCTC Authorized Agent Registration Enquiry – Asthasoft',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 10px; background: #FFFFFF; color: #1E293B;">
              <h2 style="color: #D8232A; margin-top: 0;">IRCTC Authorized Agent Registration</h2>
              <p>Dear <strong>${enquiryDoc.fullName}</strong>,</p>
              <p>Thank you for reaching out to <strong>Asthasoft Technologies</strong> regarding IRCTC Authorized Sub-Agent registration. We have successfully received your details.</p>
              
              <div style="background: #F8FAFC; border-left: 4px solid #D8232A; padding: 12px 16px; margin: 16px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 13px; font-weight: bold; color: #0F172A;">Next Onboarding Steps:</p>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: #475569;">
                  Our authorized agency onboarding executive will contact you at <strong>${enquiryDoc.mobileNumber}</strong> within 1 business day to guide you through the digital documentation and IRCTC agent ID activation process.
                </p>
              </div>

              <p style="font-size: 13px; margin: 16px 0 6px 0; font-weight: bold;">Documents required for fast-track activation:</p>
              <ul style="font-size: 13px; line-height: 1.6; margin: 0; padding-left: 20px; color: #334155;">
                <li>Aadhaar Card (front & back)</li>
                <li>PAN Card copy</li>
                <li>Shop / Business address proof</li>
                <li>Passport-size photo & cancelled cheque</li>
              </ul>

              <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid #E2E8F0; font-size: 12px; color: #64748B;">
                <strong>Asthasoft Technologies Pvt. Ltd.</strong> &bull; IRCTC Principal Service Provider Partner<br/>
                Helpline: <a href="tel:+917023318111" style="color: #2563EB;">+91-7023318111</a> &bull; Email: <a href="mailto:info@asthasoftindia.com" style="color: #2563EB;">info@asthasoftindia.com</a><br/>
                Address: Glitz cinema, Jalore Rajasthan 343001
              </div>
            </div>
          `,
          text: `Dear ${enquiryDoc.fullName},\n\nThank you for reaching out to Asthasoft Technologies regarding IRCTC Authorized Agent registration. We have received your details.\n\nOur onboarding executive will contact you at ${enquiryDoc.mobileNumber} shortly to assist you with digital verification and agent ID provisioning.\n\nHelpline: +91-7023318111\nEmail: info@asthasoftindia.com\nAsthasoft Technologies Pvt. Ltd.`,
        });
      }
    } catch (emailErr) {
      console.warn('IRCTC Enquiry email dispatch warning (non-blocking):', emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your IRCTC Agent registration enquiry has been submitted. Our onboarding team will contact you shortly.',
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error('IRCTC Enquiry API error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
