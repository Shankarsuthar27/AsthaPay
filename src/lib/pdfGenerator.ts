// src/lib/pdfGenerator.ts
// Server-side publication-grade PDF generator for AsthaPay FinTech Proposals using jsPDF

import { jsPDF } from 'jspdf';
import { GeneratedProposal } from '@/types/admin';

export function generateProposalPdfBuffer(proposal: GeneratedProposal): Buffer {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = 40;

  // Colors
  const primaryNavy = [7, 23, 47]; // #07172F
  const brandCoral = [255, 87, 51]; // #FF5733
  const textDark = [30, 41, 59]; // #1E293B
  const textMuted = [100, 116, 139]; // #64748B
  const bgLight = [248, 250, 252]; // #F8FAFC
  const borderLight = [226, 232, 240]; // #E2E8F0

  // Helper: check space and add page if needed
  const ensureSpace = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 50) {
      drawFooter();
      doc.addPage();
      y = 45;
      drawPageHeader();
    }
  };

  const drawPageHeader = () => {
    doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.rect(margin, 20, contentWidth, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text('ASTHAPAY TECHNOLOGIES — CONFIDENTIAL PROPOSAL', margin, 16);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`REF: ${proposal.proposalId}`, pageWidth - margin, 16, { align: 'right' });
  };

  const drawFooter = () => {
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 35, pageWidth - margin, pageHeight - 35);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(
      'AsthaPay Technologies Private Limited • Institutional B2B FinTech & Switch Infrastructure',
      margin,
      pageHeight - 22
    );
    const pageNumber = (doc as any).internal.getCurrentPageInfo().pageNumber;
    doc.text(`Page ${pageNumber}`, pageWidth - margin, pageHeight - 22, { align: 'right' });
  };

  // ==========================================
  // 1. COVER / HEADER SECTION
  // ==========================================
  // Brand Header Bar
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.roundedRect(margin, y, contentWidth, 75, 8, 8, 'F');

  // Brand Logo Text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('Astha', margin + 18, y + 36);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('Pay', margin + 74, y + 36);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 215, 235);
  doc.text('Turnkey FinTech Infrastructure & Multi-Bank Switch Platform', margin + 18, y + 54);

  // Proposal Reference Badge
  doc.setFillColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.roundedRect(pageWidth - margin - 150, y + 20, 135, 34, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIAL PROPOSAL', pageWidth - margin - 82, y + 33, { align: 'center' });
  doc.setFontSize(10);
  doc.text(proposal.proposalId, pageWidth - margin - 82, y + 47, { align: 'center' });

  y += 90;

  // Proposal Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('Turnkey FinTech Infrastructure Proposal', margin, y);
  y += 18;

  // Prepared Exclusively Box
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.setLineWidth(1);
  doc.roundedRect(margin, y, contentWidth, 68, 8, 8, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('PREPARED EXCLUSIVELY FOR:', margin + 14, y + 18);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text(proposal.client.companyName || 'Prospective FinTech Partner', margin + 14, y + 36);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`Authorized Contact: ${proposal.client.fullName}`, margin + 14, y + 52);

  // Right column of prepared box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('DATE PREPARED:', margin + 300, y + 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(proposal.generatedAt, margin + 300, y + 32);
  doc.text(`Email: ${proposal.client.businessEmail}`, margin + 300, y + 46);
  doc.text(`Phone: ${proposal.client.mobileNumber}`, margin + 300, y + 58);

  y += 82;

  // ==========================================
  // 2. EXECUTIVE SUMMARY
  // ==========================================
  ensureSpace(90);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('1. EXECUTIVE SUMMARY', margin, y);
  y += 14;

  doc.setFillColor(254, 247, 244); // subtle warm coral tint
  doc.setDrawColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.setLineWidth(1.5);
  doc.line(margin, y, margin, y + 56);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const splitSummary = doc.splitTextToSize(proposal.executiveSummary, contentWidth - 20);
  doc.text(splitSummary, margin + 10, y + 10);
  y += Math.max(50, splitSummary.length * 12 + 15);

  // ==========================================
  // 3. CLIENT REQUIREMENTS MATRIX
  // ==========================================
  ensureSpace(120);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('2. SUBMITTED REQUIREMENTS MATRIX', margin, y);
  y += 12;

  const reqTable = [
    { label: 'Partnership Model', val: proposal.requirements.partnershipModel },
    { label: 'Estimated Retail Network', val: proposal.requirements.retailNetwork },
    { label: 'Operating Brand / Entity', val: proposal.client.companyName },
    { label: 'Target Launch Services', val: `${proposal.requirements.selectedServices.length} Turnkey Services Selected` },
  ];

  reqTable.forEach((row, i) => {
    const rowY = y + i * 18;
    doc.setFillColor(i % 2 === 0 ? bgLight[0] : 255, i % 2 === 0 ? bgLight[1] : 255, i % 2 === 0 ? bgLight[2] : 255);
    doc.rect(margin, rowY, contentWidth, 18, 'F');
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, rowY + 18, margin + contentWidth, rowY + 18);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(row.label, margin + 8, rowY + 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text(row.val, margin + 180, rowY + 12);
  });
  y += reqTable.length * 18 + 16;

  // ==========================================
  // 4. RECOMMENDED PLATFORM SOLUTION MODULES
  // ==========================================
  ensureSpace(120);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('3. RECOMMENDED PLATFORM SOLUTION ARCHITECTURE', margin, y);
  y += 14;

  proposal.recommendedSolution.forEach((mod, idx) => {
    ensureSpace(70);
    doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.7);
    doc.roundedRect(margin, y, contentWidth, 58, 6, 6, 'FD');

    // Number Pill
    doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.circle(margin + 16, y + 16, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(`${idx + 1}`, margin + 16, y + 19, { align: 'center' });

    // Module Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text(mod.module, margin + 30, y + 19);

    // Module Desc
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    const splitDesc = doc.splitTextToSize(mod.description, contentWidth - 45);
    doc.text(splitDesc, margin + 30, y + 31);

    // Features Preview
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const featuresPreview = mod.features.slice(0, 3).map((f) => `• ${f}`).join('   ');
    doc.text(featuresPreview, margin + 30, y + 48);

    y += 66;
  });

  // ==========================================
  // 5. SERVICES SELECTED FOR LAUNCH
  // ==========================================
  ensureSpace(120);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text(`4. SERVICES SELECTED FOR LAUNCH (${proposal.selectedServicesDetails.length})`, margin, y);
  y += 14;

  proposal.selectedServicesDetails.forEach((srv) => {
    ensureSpace(68);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.6);
    doc.roundedRect(margin, y, contentWidth, 62, 5, 5, 'FD');

    // Service Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text(srv.service, margin + 10, y + 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(16, 185, 129); // emerald green
    doc.text('SWITCH READY', contentWidth + margin - 10, y + 14, { align: 'right' });

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const splitSrvDesc = doc.splitTextToSize(srv.description, contentWidth - 20);
    doc.text(splitSrvDesc.slice(0, 2), margin + 10, y + 26);

    // Mini Meta Grid
    doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
    doc.rect(margin + 5, y + 38, contentWidth - 10, 18, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('USE CASE:', margin + 10, y + 49);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const useCaseText = doc.splitTextToSize(srv.businessUseCase, 180)[0];
    doc.text(useCaseText, margin + 55, y + 49);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('INFRASTRUCTURE:', margin + 250, y + 49);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const infraText = doc.splitTextToSize(srv.requiredInfrastructure, 200)[0];
    doc.text(infraText, margin + 335, y + 49);

    y += 70;
  });

  // ==========================================
  // 6. TECHNOLOGY & INFRASTRUCTURE STANDARDS
  // ==========================================
  ensureSpace(120);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('5. TECHNOLOGY, SWITCH & SECURITY STANDARDS', margin, y);
  y += 14;

  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.roundedRect(margin, y, contentWidth, 75, 6, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Enterprise-Grade High Availability Banking Switch (99.99% Uptime SLA)', margin + 14, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(200, 215, 235);
  const techItems = proposal.technologyInfrastructure.slice(0, 6);
  techItems.forEach((tech, ti) => {
    const col = ti % 2 === 0 ? margin + 14 : margin + 260;
    const rowY = y + 33 + Math.floor(ti / 2) * 13;
    doc.text(`✓ ${tech}`, col, rowY);
  });
  y += 90;

  // ==========================================
  // 7. IMPLEMENTATION ROADMAP
  // ==========================================
  ensureSpace(120);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('6. IMPLEMENTATION ROADMAP & TIMELINE', margin, y);
  y += 12;

  proposal.implementationRoadmap.forEach((phase, pi) => {
    ensureSpace(32);
    doc.setFillColor(pi % 2 === 0 ? bgLight[0] : 255, pi % 2 === 0 ? bgLight[1] : 255, pi % 2 === 0 ? bgLight[2] : 255);
    doc.rect(margin, y, contentWidth, 24, 'F');
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.line(margin, y + 24, margin + contentWidth, y + 24);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
    doc.text(phase.phase, margin + 8, y + 15);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.text(phase.title, margin + 60, y + 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(phase.duration, pageWidth - margin - 8, y + 15, { align: 'right' });

    y += 24;
  });
  y += 14;

  // ==========================================
  // 8. COMMERCIAL PROPOSAL TERMS
  // ==========================================
  ensureSpace(120);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(brandCoral[0], brandCoral[1], brandCoral[2]);
  doc.text('7. COMMERCIAL PROPOSAL & PRICING STRUCTURE', margin, y);
  y += 12;

  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.roundedRect(margin, y, contentWidth, 68, 6, 6, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const splitNote = doc.splitTextToSize(proposal.commercialTerms.note, contentWidth - 20);
  doc.text(splitNote, margin + 10, y + 14);

  // Commercial grid
  const commTerms = [
    { label: 'Platform Setup Fee', val: proposal.commercialTerms.setupFee },
    { label: 'Monthly Platform Fee', val: proposal.commercialTerms.monthlyFee },
    { label: 'API Charges', val: proposal.commercialTerms.apiCharges },
    { label: 'Transaction Charges', val: proposal.commercialTerms.transactionCharges },
  ];

  commTerms.forEach((c, ci) => {
    const col = ci % 2 === 0 ? margin + 10 : margin + 260;
    const rowY = y + 34 + Math.floor(ci / 2) * 16;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`${c.label}:`, col, rowY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const valText = doc.splitTextToSize(c.val, 150)[0];
    doc.text(valText, col + 95, rowY);
  });
  y += 82;

  // ==========================================
  // 9. FORMAL CONFIRMATION & SIGNATURES
  // ==========================================
  ensureSpace(95);
  doc.setDrawColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 16;

  // Left: AsthaPay
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('For AsthaPay Technologies Private Limited', margin, y);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Authorized FinTech Solutions Director', margin, y + 34);
  doc.text('Enterprise Architecture & Banking Switches Group', margin, y + 46);

  // Right: Client
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('Accepted on Behalf of Partner Entity', pageWidth - margin, y, { align: 'right' });
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Authorized Signatory & Official Stamp', pageWidth - margin, y + 34, { align: 'right' });
  doc.text(proposal.client.companyName || 'Authorized Partner', pageWidth - margin, y + 46, { align: 'right' });

  // Final page footer
  drawFooter();

  // Convert arraybuffer to Node Buffer
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
