// src/lib/firebaseAdmin.ts
// Firebase ADMIN SDK initialization for server-side Next.js API routes.
// NEVER import this in client components — it runs on the server only.

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getStorage, Storage } from 'firebase-admin/storage';

function getAdminApp(): App | null {
  if (getApps().length > 0) return getApps()[0];

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  // Defensive validation: Ensure valid service account private key format before initializing
  if (
    !projectId ||
    !clientEmail ||
    !rawKey ||
    rawKey.includes('YOUR_KEY_HERE') ||
    !rawKey.includes('-----BEGIN PRIVATE KEY-----')
  ) {
    // Return null in development/sandbox mode so builds & local testing never crash
    return null;
  }

  try {
    const privateKey = rawKey.replace(/\\n/g, '\n');
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (err) {
    console.warn('[FIREBASE ADMIN SDK] Could not initialize Firebase Admin SDK:', err);
    return null;
  }
}

const adminApp: App | null = getAdminApp();

export const adminDb: Firestore | null = adminApp ? getFirestore(adminApp) : null;
export const adminAuth: Auth | null = adminApp ? getAuth(adminApp) : null;
export const adminStorage: Storage | null = adminApp ? getStorage(adminApp) : null;

export default adminApp;
