// src/app/api/admin/proposal-config/route.ts
// REST endpoint to get and update the modular proposal configuration

import { NextRequest, NextResponse } from 'next/server';
import { getProposalConfig, updateProposalConfig, ProposalModularConfig } from '@/lib/proposalConfig';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET() {
  try {
    // If Firestore is available, try fetching persisted config
    if (adminDb) {
      try {
        const snap = await adminDb.collection('settings').doc('proposal_config').get();
        if (snap.exists) {
          const remoteConfig = snap.data() as ProposalModularConfig;
          updateProposalConfig(remoteConfig);
        }
      } catch (err) {
        console.warn('Could not read proposal_config from Firestore, using memory config:', err);
      }
    }

    const config = getProposalConfig();
    return NextResponse.json({ success: true, config });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve proposal configuration';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = updateProposalConfig(body);

    // Save to Firestore if connected
    if (adminDb) {
      try {
        await adminDb.collection('settings').doc('proposal_config').set(updated, { merge: true });
      } catch (err) {
        console.warn('Could not persist proposal_config to Firestore, preserved in-memory:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Proposal engine configuration updated successfully.',
      config: updated,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update proposal configuration';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
