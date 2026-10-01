// src/lib/pdfGenerator.ts
// Server-side publication-grade simplified PDF generator for AsthaPay FinTech Proposals
// Matches official White-Label Commercial Proposal reference format

import { jsPDF } from 'jspdf';
import { GeneratedProposal, CommercialSlab, RoadmapPhase } from '@/types/admin';
import { DEFAULT_PROPOSAL_CONFIG } from '@/lib/proposalConfig';

/**
 * Sanitizes strings for safe rendering in standard jsPDF fonts (WinAnsi/Latin-1)
 * Replaces unicode currency and quotation symbols with clean readable ASCII equivalents.
 */
function cleanText(text: string | null | undefined): string {
  if (!text) return '';
  return String(text)
    .replace(/₹/g, 'Rs. ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[—–]/g, '-')
    .replace(/•/g, '*')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Formats commercial slab rate value
 */
function formatSlabRate(slab: CommercialSlab): string {
  if (slab.commissionType === 'fixed') {
    return `Rs. ${Number(slab.value).toFixed(2)}`;
  }
  return `${Number(slab.value).toFixed(2)}%`;
}

export function generateProposalPdfBuffer(proposal: GeneratedProposal): Buffer {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 36;
  const contentWidth = pageWidth - margin * 2; // 523.28 pt

  // Executive FinTech Palette
  const primaryNavy = [10, 25, 49];      // #0A1931 - deep corporate navy
  const brandCoral = [255, 87, 51];      // #FF5733 - energetic brand coral
  const textDark = [15, 23, 42];         // #0F172A - dark heading text
  const textBody = [51, 65, 85];         // #334155 - clean slate body
  const textMuted = [100, 116, 139];     // #64748B - secondary label text
  const bgLight = [248, 250, 252];       // #F8FAFC - subtle background
  const borderLight = [226, 232, 240];   // #E2E8F0 - crisp border
  const borderNavy = [203, 213, 225];    // #CBD5E1 - divider line
  const emeraldGreen = [16, 185, 129];   // #10B981 - status green

  // Active or Fallback Data
  const companyName = cleanText(proposal.client?.companyName) || 'Metro Digital Services';
  const clientName = cleanText(proposal.client?.fullName) || 'Rahul Verma';
  const clientEmail = cleanText(proposal.client?.businessEmail) || 'rahul@metrodigital.in';
  const clientPhone = cleanText(proposal.client?.mobileNumber) || '+91 98111 22334';
  const refId = cleanText(proposal.proposalId) || 'FIN-2026-LIVE';
  const dateStr = cleanText(proposal.generatedAt) || '1 October 2026';

  const rawPlan = proposal.selectedPlan || proposal.requirements?.selectedPlan;
  const selectedPlan = cleanText(rawPlan) || 'Advanced Plan';
  const selectedServices = proposal.requirements?.selectedServices || [];
  const servicesCount = selectedServices.length > 0
    ? selectedServices.length
    : (selectedPlan.toLowerCase().includes('basic') ? 7 : selectedPlan.toLowerCase().includes('pro') ? 21 : 14);

  // Friendly short summary of included services for the plan
  let servicesListSummary = '';
  if (selectedPlan.toLowerCase().includes('basic')) {
    servicesListSummary = 'AePS, DMT, Micro ATM, Mobile/DTH, Electricity, FASTag (7 Services)';
  } else if (selectedPlan.toLowerCase().includes('pro')) {
    servicesListSummary = 'All 21 Services: Banking & Payout APIs, AePS, DMT, Micro ATM, BBPS, KYC Switch';
  } else if (selectedPlan.toLowerCase().includes('advanced')) {
    servicesListSummary = 'Basic (7) + Aadhaar Pay, BBPS, PAN, Insurance, Travel, UPI, Retailer Management (14 Services)';
  } else {
    servicesListSummary = selectedServices.length > 0
      ? selectedServices.slice(0, 5).join(', ') + (selectedServices.length > 5 ? ` + ${selectedServices.length - 5} more` : '')
      : 'Configured FinTech Services';
  }

  const slabs: CommercialSlab[] = (proposal.commercialSlabs && proposal.commercialSlabs.length > 0)
    ? proposal.commercialSlabs
    : DEFAULT_PROPOSAL_CONFIG.commercialSlabs;

  const roadmap: RoadmapPhase[] = (proposal.implementationRoadmap && proposal.implementationRoadmap.length > 0)
    ? proposal.implementationRoadmap
    : DEFAULT_PROPOSAL_CONFIG.implementationRoadmap;

  const terms: string[] = DEFAULT_PROPOSAL_CONFIG.termsAndConditions;

  // Running footer for each page
  const drawFooter = (pageNum: number) => {
    const footerY = pageHeight - 26;
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.75);
    doc.line(margin, footerY - 8, pageWidth - margin, footerY - 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(
      'AsthaPay Technologies Pvt. Ltd. | Glitz cinema , Jalore Rajasthan 343001 | +91-7023318111 | asthapay.in',
      margin,
      footerY + 4
    );

    doc.setFont('helvetica', 'bold');
    doc.text(`Page ${pageNum} of 2`, pageWidth - margin, footerY + 4, { align: 'right' });
  };

  // Running header for Page 2
  const drawPageHeader = () => {
    doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.rect(margin, 20, contentWidth, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text(`ASTHAPAY TECHNOLOGIES -- COMMERCIAL PROPOSAL (${selectedPlan.toUpperCase()})`, margin, 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`REF: ${refId}`, pageWidth - margin, 15, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: COMMERCIAL PROPOSAL & COMMISSIONS
  // ==========================================
  let y = 26;

  // 1. HEADER BANNER
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.roundedRect(margin, y, contentWidth, 54, 5, 5, 'F');

  // AsthaPay Logo Text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('Astha', margin + 14, y + 26);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('Pay', margin + 68, y + 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text('Enterprise Turnkey B2B FinTech & Banking Switch Infrastructure', margin + 14, y + 38);
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Glitz cinema , Jalore Rajasthan 343001', margin + 14, y + 48);

  // Proposal Reference Badge (Right side)
  doc.setFillColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.roundedRect(pageWidth - margin - 148, y + 8, 140, 38, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('COMMERCIAL PROPOSAL', pageWidth - margin - 78, y + 19, { align: 'center' });
  doc.setFontSize(8.5);
  doc.text(`REF: ${refId}`, pageWidth - margin - 78, y + 29, { align: 'center' });
  doc.setFontSize(7);
  doc.text(`PLAN: ${selectedPlan.toUpperCase()}`, pageWidth - margin - 78, y + 38, { align: 'center' });

  y += 64;

  // 2. PREPARED SPECIFICALLY FOR & PLATFORM ARCHITECTURE (2-COLUMN CARD)
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.setLineWidth(1);
  doc.roundedRect(margin, y, contentWidth, 58, 5, 5, 'FD');

  // Left: Prepared Specifically For
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('PREPARED SPECIFICALLY FOR:', margin + 12, y + 14);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text(companyName.substring(0, 36), margin + 12, y + 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`Attn: ${clientName}`, margin + 12, y + 38);

  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`${clientEmail}  *  ${clientPhone}`, margin + 12, y + 49);

  // Right: Platform Architecture & Package
  const archColX = margin + 270;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('PLATFORM ARCHITECTURE & PACKAGE:', archColX, y + 14);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('Enterprise White-Label Switch', archColX, y + 25);

  // Distinctive Plan Badge Pill
  const isBasic = selectedPlan.toLowerCase().includes('basic');
  const isPro = selectedPlan.toLowerCase().includes('pro');
  const pillBg = isBasic ? [236, 253, 245] : isPro ? [255, 247, 237] : [239, 246, 255];
  const pillText = isBasic ? [5, 150, 105] : isPro ? [234, 88, 12] : [29, 78, 216];
  const pillBorder = isBasic ? [167, 243, 208] : isPro ? [254, 215, 170] : [191, 219, 254];

  doc.setFillColor(pillBg[0], pillBg[1], pillBg[2]);
  doc.setDrawColor(pillBorder[0], pillBorder[1], pillBorder[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(archColX, y + 29, 210, 13, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(pillText[0], pillText[1], pillText[2]);
  doc.text(`* ${selectedPlan.toUpperCase()} (${servicesCount} SERVICES CONFIGURED)`, archColX + 5, y + 38.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);
  doc.text('Web Portal * Android APK * Micro ATM * 24x7 Settlement', archColX, y + 50);

  y += 68;

  // 3. EXECUTIVE OVERVIEW
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('Executive Overview', margin, y);
  y += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const execText = `Based on your objective to deploy a fully branded turnkey White-Label B2B FinTech platform under the ${selectedPlan} (${servicesCount} FinTech services configured), AsthaPay has engineered a comprehensive multi-tiered infrastructure solution. Under this deployment, ${companyName} will launch and manage its own independent web and mobile banking ecosystem, backed by institutional multi-bank switch routing, instant commission distribution, and seamless retailer onboarding.`;
  const splitExec = doc.splitTextToSize(cleanText(execText), contentWidth);
  doc.text(splitExec, margin, y);
  y += splitExec.length * 10.5 + 8;

  // 4. COMMERCIAL PRICING & LICENSE TERMS TABLE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('Commercial Pricing & License Terms', margin, y);
  y += 10;

  // Pricing Table Header
  const pCol1W = 150;
  const pCol2W = contentWidth - pCol1W;

  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(margin, y, contentWidth, 16, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('LICENSING / COMMERCIAL TERM', margin + 8, y + 11);
  doc.text('DETAILS & SPECIFICATIONS', margin + pCol1W + 8, y + 11);
  y += 16;

  const pricingRows = [
    {
      term: 'Selected Platform Tier',
      desc: `${selectedPlan} (${servicesCount} Services: ${servicesListSummary})`,
    },
    {
      term: 'Platform Setup Fee',
      desc: cleanText(proposal.commercialTerms?.setupFee) || `Customized for ${selectedPlan} deployment including white-label portal, Android APK, and switch routing.`,
    },
    {
      term: 'Monthly Maintenance / AMC',
      desc: cleanText(proposal.commercialTerms?.monthlyFee) || 'Covers cloud server scaling, multi-bank switch routing, SSL certificates, and technical support.',
    },
    {
      term: 'API Charges',
      desc: cleanText(proposal.commercialTerms?.apiCharges) || 'Included in enterprise package with zero per-hit overhead on standard transactions.',
    },
    {
      term: 'Transaction Charges',
      desc: cleanText(proposal.commercialTerms?.transactionCharges) || 'Zero debit MDR for AePS and Micro ATM; standard IMPS commercial slabs apply for DMT.',
    },
    {
      term: 'Hardware mPOS / PIN-Pad',
      desc: cleanText(proposal.commercialTerms?.hardwareCharges) || 'Hardware mPOS and Biometric scanners available at volume distributor rates.',
    },
  ];

  pricingRows.forEach((pr, idx) => {
    const isEven = idx % 2 === 0;
    const rowH = 14;
    doc.setFillColor(isEven ? 255 : bgLight[0], isEven ? 255 : bgLight[1], isEven ? 255 : bgLight[2]);
    doc.rect(margin, y, contentWidth, rowH, 'F');

    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, y + rowH, margin + contentWidth, y + rowH);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text(pr.term, margin + 8, y + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const splitPrDesc = doc.splitTextToSize(pr.desc, pCol2W - 14);
    doc.text(splitPrDesc[0] || pr.desc, margin + pCol1W + 8, y + 10);

    y += rowH;
  });

  // Note Row
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 14, 'F');
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('* Note: Commercial pricing will be finalized based on the selected services, transaction volume, infrastructure requirements, and integration scope discussed during your live product demonstration.', margin + 8, y + 9.5);
  y += 20;

  // 5. PROPOSED COMMERCIAL COMMISSION MATRIX TABLE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text(`Proposed Commercial Commission Matrix (${selectedPlan})`, margin, y);
  y += 10;

  // Table Header
  const mCol1W = 210;   // Service
  const mCol2W = 95;    // Commercial Rate
  const mCol3W = contentWidth - mCol1W - mCol2W; // 218.28 - Notes & Settlement

  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(margin, y, contentWidth, 16, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('SERVICE', margin + 8, y + 11);
  doc.text('COMMERCIAL RATE', margin + mCol1W + 8, y + 11);
  doc.text('NOTES & SETTLEMENT', margin + mCol1W + mCol2W + 8, y + 11);
  y += 16;

  slabs.slice(0, 8).forEach((slab, sIdx) => {
    const isEven = sIdx % 2 === 0;
    const rowH = 15;
    doc.setFillColor(isEven ? 255 : bgLight[0], isEven ? 255 : bgLight[1], isEven ? 255 : bgLight[2]);
    doc.rect(margin, y, contentWidth, rowH, 'F');

    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, y + rowH, margin + contentWidth, y + rowH);

    // Service
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text(cleanText(slab.service), margin + 8, y + 10.5);

    // Rate (Brand Coral)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
    doc.text(formatSlabRate(slab), margin + mCol1W + 8, y + 10.5);

    // Notes
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(cleanText(slab.notes) || 'Instant wallet credit', margin + mCol1W + mCol2W + 8, y + 10.5);

    y += rowH;
  });

  // Footer for Page 1
  drawFooter(1);

  // ==========================================
  // PAGE 2: ROADMAP, TERMS & SIGNATURES
  // ==========================================
  doc.addPage();
  drawPageHeader();

  y = 32;

  // 6. IMPLEMENTATION ROADMAP
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('Implementation Roadmap', margin, y);
  y += 12;

  // 6 Phases in a clean 2-column grid
  const rCardW = (contentWidth - 10) / 2;
  const rCardH = 46;

  roadmap.slice(0, 6).forEach((phase, pIdx) => {
    const col = pIdx % 2 === 0 ? margin : margin + rCardW + 10;
    const rowY = y + Math.floor(pIdx / 2) * (rCardH + 6);

    doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.6);
    doc.roundedRect(col, rowY, rCardW, rCardH, 4, 4, 'FD');

    // Phase & Duration
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
    doc.text(cleanText(phase.phase), col + 8, rowY + 11);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(cleanText(phase.duration), col + rCardW - 8, rowY + 11, { align: 'right' });

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text(cleanText(phase.title).substring(0, 36), col + 8, rowY + 22);

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(textBody[0], textBody[1], textBody[2]);
    const splitDesc = doc.splitTextToSize(cleanText(phase.description), rCardW - 16);
    doc.text(splitDesc.slice(0, 2), col + 8, rowY + 32);
  });

  y += 3 * (rCardH + 6) + 12;

  // 7. TERMS & CONDITIONS
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('Terms & Conditions', margin, y);
  y += 10;

  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 80, 4, 4, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  terms.forEach((term, tIdx) => {
    const itemY = y + 11 + tIdx * 9.8;
    doc.setFillColor(brandCoral[0], brandCoral[1], brandCoral[2]);
    doc.circle(margin + 10, itemY - 2.5, 1.8, 'F');
    doc.text(cleanText(term), margin + 16, itemY);
  });

  y += 94;

  // 8. FORMAL SIGNATURES & ACCEPTANCE
  doc.setDrawColor(borderNavy[0], borderNavy[1], borderNavy[2]);
  doc.setLineWidth(0.75);
  doc.line(margin, y, pageWidth - margin, y);
  y += 14;

  // Left Signatory: Client
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text(`For ${companyName}`, margin, y);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Authorized Signatory', margin, y + 26);
  doc.text('Name & Designation', margin, y + 36);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`Attn: ${clientName}`, margin, y + 46);

  // Right Signatory: Asthasoft / AsthaPay
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('For Asthasoft Technologies Pvt. Ltd.', pageWidth - margin, y, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('AsthaPay Solutions', pageWidth - margin, y + 14, { align: 'right' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Authorized FinTech Solutions Director', pageWidth - margin, y + 26, { align: 'right' });
  doc.text('Turnkey FinTech Switch Division', pageWidth - margin, y + 36, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Glitz cinema , Jalore Rajasthan 343001', pageWidth - margin, y + 46, { align: 'right' });

  y += 56;

  // 9. BOTTOM DIRECT CONTACT CARD
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 26, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('AsthaPay Technologies Private Limited', margin + 10, y + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);
  doc.text('Phone: +91-7023318111   |   Support: info@asthasoftindia.com   |   Website: https://asthapay.in', margin + 10, y + 20);

  // Footer for Page 2
  drawFooter(2);

  // Convert to Node Buffer
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
