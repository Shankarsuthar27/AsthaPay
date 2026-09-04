// src/lib/firebaseAdmin.ts
// Firebase ADMIN SDK initialization for server-side Next.js API routes.
// NEVER import this in client components — it runs on the server only.

import type { App } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';
import type { Auth } from 'firebase-admin/auth';
import type { Storage } from 'firebase-admin/storage';

let adminAppInstance: App | null = null;
let adminDbInstance: Firestore | null = null;
let adminAuthInstance: Auth | null = null;
let adminStorageInstance: Storage | null = null;
let hasAttemptedInit = false;

function initFirebaseAdmin() {
  if (hasAttemptedInit) return;
  hasAttemptedInit = true;

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
    return;
  }

  try {
    // Dynamic require so module load time never crashes in serverless runtimes
    const { initializeApp, getApps, cert } = require('firebase-admin/app');
    const { getFirestore } = require('firebase-admin/firestore');
    const { getAuth } = require('firebase-admin/auth');
    const { getStorage } = require('firebase-admin/storage');

    if (getApps().length > 0) {
      adminAppInstance = getApps()[0];
    } else {
      let privateKey = rawKey;
      if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.slice(1, -1);
      }
      privateKey = privateKey.replace(/\\n/g, '\n');

      adminAppInstance = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }

    if (adminAppInstance) {
      adminDbInstance = getFirestore(adminAppInstance);
      adminAuthInstance = getAuth(adminAppInstance);
      adminStorageInstance = getStorage(adminAppInstance);
    }
  } catch (err) {
    console.warn('[FIREBASE ADMIN SDK] Could not initialize Firebase Admin SDK:', err);
    adminAppInstance = null;
    adminDbInstance = null;
    adminAuthInstance = null;
    adminStorageInstance = null;
  }
}

// Safely execute init on module load inside try/catch
try {
  initFirebaseAdmin();
} catch (e) {
  console.warn('[FIREBASE ADMIN SDK] Safe initialization caught error:', e);
}

export const adminApp: App | null = adminAppInstance;
export const adminDb: Firestore | null = adminDbInstance;
export const adminAuth: Auth | null = adminAuthInstance;
export const adminStorage: Storage | null = adminStorageInstance;

export default adminApp;
