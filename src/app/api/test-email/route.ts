// src/app/api/test-email/route.ts
// Diagnostic endpoint for testing email delivery credentials (SMTP / Resend)

import { NextRequest, NextResponse } from 'next/server';
import { synthesizeProposal } from '@/lib/proposalEngine';
import { sendProposalEmail } from '@/lib/emailService';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const recipientEmail = searchParams.get('to') || 'shankar.952152@gmail.com';

    const testProposal = synthesizeProposal({
      fullName: 'AsthaPay Diagnostic Test',
      businessEmail: recipientEmail,
      mobileNumber: '+91 9876543210',
      companyName: 'AsthaPay Technologies Test Corp',
      partnershipModel: 'White-Label B2B Portal & App',
      retailNetwork: '50–200 Retailers',
      selectedServices: ['Aadhaar Enabled Payment System (AePS)', 'BBPS', 'Payout APIs'],
      additionalRequirements: 'Diagnostic email delivery test',
    });

    const emailResult = await sendProposalEmail(testProposal);

    return NextResponse.json({
      success: emailResult.success || emailResult.clientDelivered,
      recipient: recipientEmail,
      emailResult,
      envConfiguration: {
        hasEmailHost: !!process.env.EMAIL_HOST,
        emailHost: process.env.EMAIL_HOST ? process.env.EMAIL_HOST : 'not configured',
        emailPort: process.env.EMAIL_PORT || '587',
        emailUserConfigured: !!process.env.EMAIL_USER,
        emailUser: process.env.EMAIL_USER ? process.env.EMAIL_USER : 'not configured',
        emailPasswordConfigured: !!process.env.EMAIL_PASSWORD,
        hasResendApiKey: !!process.env.RESEND_API_KEY,
        emailFrom: process.env.EMAIL_FROM || 'default',
        adminNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL || 'shankar.952152@gmail.com',
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error in test email execution';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const recipientEmail = body.to || body.email;

    if (!recipientEmail || !recipientEmail.includes('@')) {
      return NextResponse.json({ error: 'Valid "to" email address required.' }, { status: 400 });
    }

    const testProposal = synthesizeProposal({
      fullName: body.fullName || 'AsthaPay Partner',
      businessEmail: recipientEmail,
      mobileNumber: body.mobileNumber || '+91 9876543210',
      companyName: body.companyName || 'FinTech Partner Entity',
      partnershipModel: body.partnershipModel || 'White-Label B2B Portal & App',
      retailNetwork: body.retailNetwork || '50–200 Retailers',
      selectedServices: ['Aadhaar Enabled Payment System (AePS)', 'Micro ATM', 'BBPS'],
      additionalRequirements: 'Transactional proposal test delivery',
    });

    const emailResult = await sendProposalEmail(testProposal);

    return NextResponse.json({
      success: emailResult.clientDelivered || emailResult.success,
      recipient: recipientEmail,
      emailResult,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error testing proposal delivery';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
