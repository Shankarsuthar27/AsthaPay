// src/app/api/proposals/[id]/pdf/route.ts
// Server endpoint for streaming / downloading the official generated PDF proposal

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { synthesizeProposal } from '@/lib/proposalEngine';
import { generateProposalPdfBuffer } from '@/lib/pdfGenerator';
import { GeneratedProposal } from '@/types/admin';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;

    if (!proposalId) {
      return NextResponse.json({ error: 'Proposal ID is required' }, { status: 400 });
    }

    let proposal: GeneratedProposal | null = null;

    // 1. Check Firestore for saved proposal
    if (adminDb) {
      try {
        // Query demo_requests first
        let snapshot = await adminDb
          .collection('demo_requests')
          .where('proposal_id', '==', proposalId)
          .limit(1)
          .get();

        if (snapshot.empty) {
          // Fallback to leads collection
          snapshot = await adminDb
            .collection('leads')
            .where('proposalId', '==', proposalId)
            .limit(1)
            .get();
        }

        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          if (docData.proposal_content || docData.proposalContent) {
            proposal = docData.proposal_content || docData.proposalContent;
          } else {
            // Synthesize from stored fields
            proposal = synthesizeProposal({
              fullName: docData.full_name || docData.name || 'Valued Partner',
              businessEmail: docData.business_email || docData.email || 'partner@example.com',
              mobileNumber: docData.mobile_number || docData.phone || '+91 9876543210',
              companyName: docData.company_name || docData.companyName || 'FinTech Partner',
              partnershipModel: docData.partnership_model || docData.businessType || 'White-Label B2B Portal & App',
              retailNetwork: docData.retail_network || docData.estimatedRetailers || '10–50 Retailers',
              selectedServices: docData.selected_services || docData.selectedServices || ['AePS', 'DMT', 'BBPS'],
              additionalRequirements: docData.additional_requirements || docData.additionalRequirements,
            });
            proposal.proposalId = proposalId;
          }
        }
      } catch (dbErr) {
        console.warn('Firestore proposal lookup skipped in PDF route:', dbErr);
      }
    }

    // 2. Fallback synthesis if record not in DB
    if (!proposal) {
      proposal = synthesizeProposal({
        fullName: 'Executive Partner',
        businessEmail: 'partner@example.com',
        mobileNumber: '+91 98765 43210',
        companyName: 'FinTech Enterprise',
        partnershipModel: 'White-Label B2B Portal & App',
        retailNetwork: '200–1,000+ Retailers',
        selectedServices: [
          'Aadhaar Enabled Payment System (AePS)',
          'Domestic Money Transfer (DMT)',
          'Micro ATM',
          'BBPS',
          'Payout APIs',
        ],
      });
      proposal.proposalId = proposalId;
    }

    // 3. Generate Binary PDF
    const pdfBuffer = generateProposalPdfBuffer(proposal);
    const companySlug = (proposal.client.companyName || 'partner').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${companySlug}-fintech-proposal.pdf`;

    // 4. Return as downloadable PDF stream
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate proposal PDF';
    console.error('GET /api/proposals/[id]/pdf error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
