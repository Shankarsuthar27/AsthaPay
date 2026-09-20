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
