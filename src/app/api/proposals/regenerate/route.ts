// src/app/api/proposals/regenerate/route.ts
// Regenerate proposal content for an existing lead with updated requirements or refreshed pricing

import { NextRequest, NextResponse } from 'next/server';
import { synthesizeProposal, ProposalInput } from '@/lib/proposalEngine';
import { adminDb } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const leadId = body.leadId;
    const leadInput: ProposalInput = body.leadInput || {
      fullName: body.fullName,
      companyName: body.companyName,
      businessEmail: body.businessEmail,
      mobileNumber: body.mobileNumber,
      partnershipModel: body.partnershipModel,
      retailNetwork: body.retailNetwork,
      selectedServices: body.selectedServices,
      additionalRequirements: body.additionalRequirements,
    };
    const configOverride = body.configOverride;

    if (!leadInput || !leadInput.fullName || !leadInput.businessEmail) {
      return NextResponse.json({ error: 'Valid lead input is required to regenerate proposal.' }, { status: 400 });
    }

    const proposal = synthesizeProposal(leadInput, configOverride);
    const pdfUrl = `/api/proposals/${proposal.proposalId}/pdf`;

    if (leadId && adminDb) {
      try {
        const updatePayload = {
          proposal_id: proposal.proposalId,
          proposalId: proposal.proposalId,
          proposal_content: proposal,
          proposalContent: proposal,
          proposal_pdf_url: pdfUrl,
          proposalPdfUrl: pdfUrl,
          proposal_status: 'generated',
          proposalStatus: 'generated',
          updated_at: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        };

        const demoRef = adminDb.collection('demo_requests').doc(leadId);
        const demoSnap = await demoRef.get();
        if (demoSnap.exists) {
          await demoRef.update(updatePayload);
        }

        const leadRef = adminDb.collection('leads').doc(leadId);
        const leadSnap = await leadRef.get();
        if (leadSnap.exists) {
          await leadRef.update(updatePayload);
        }
      } catch (dbErr) {
        console.warn('Database update skipped during proposal regeneration:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      proposal,
      pdfUrl,
      message: `Proposal successfully regenerated (Ref: ${proposal.proposalId}).`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error regenerating proposal';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
