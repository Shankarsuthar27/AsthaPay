// src/lib/proposalPlainText.ts
// Client-safe & Server-safe Executive Plain-Text FinTech Proposal Formatter
// Matches official White-Label Commercial Proposal reference format

import { GeneratedProposal, CommercialSlab, RoadmapPhase } from '@/types/admin';
import { ProposalModularConfig, DEFAULT_PROPOSAL_CONFIG } from '@/lib/proposalConfig';

/**
 * Formats rate value for plain-text display
 */
function formatSlabRateText(slab: CommercialSlab): string {
  if (slab.commissionType === 'fixed') {
    return `₹${Number(slab.value).toFixed(2)}`;
  }
  return `${Number(slab.value).toFixed(2)}%`;
}

/**
 * Generates official clean plain-text proposal matching the executive commercial matrix format
 */
export function generateProposalPlainText(
  proposal: GeneratedProposal,
  customConfig?: ProposalModularConfig
): string {
  const { 
    client, 
    proposalId, 
    generatedAt,
    commercialTerms,
  } = proposal;

  const config = customConfig || DEFAULT_PROPOSAL_CONFIG;
  const company = config.companyInfo?.companyName || 'Asthasoft Technologies Pvt. Ltd.';
  const brand = config.companyInfo?.brandName || 'AsthaPay';
  const address = config.companyInfo?.address || 'Glitz cinema , Jalore Rajasthan 343001';

  const clientCompany = client.companyName || 'Metro Digital Services';
  const clientName = client.fullName || 'Rahul Verma';
  const clientEmail = client.businessEmail || 'rahul@metrodigital.in';
  const clientPhone = client.mobileNumber || '+91 98111 22334';
  const refId = proposalId || 'FIN-2026-LIVE';
  const dateStr = generatedAt || '1 October 2026';

  // Slabs
  const slabs: CommercialSlab[] = (proposal.commercialSlabs && proposal.commercialSlabs.length > 0)
    ? proposal.commercialSlabs
    : config.commercialSlabs || DEFAULT_PROPOSAL_CONFIG.commercialSlabs;

  const slabsRows = slabs.map((s) => `${s.service}\t${formatSlabRateText(s)}\t${s.notes || 'Instant credit'}`).join('\n');

  // Roadmap
  const roadmap: RoadmapPhase[] = (proposal.implementationRoadmap && proposal.implementationRoadmap.length > 0)
    ? proposal.implementationRoadmap
    : config.implementationRoadmap || DEFAULT_PROPOSAL_CONFIG.implementationRoadmap;

  const roadmapText = roadmap.map((phase) => {
    return `${phase.phase}\n${phase.duration}\n${phase.title}\n\n${phase.description}`;
  }).join('\n\n');

  // Terms
  const terms = (config.termsAndConditions && config.termsAndConditions.length > 0)
    ? config.termsAndConditions
    : DEFAULT_PROPOSAL_CONFIG.termsAndConditions;

  const selectedPlan = proposal.selectedPlan || proposal.requirements?.selectedPlan || 'Advanced Plan';
  const selectedServices = proposal.requirements?.selectedServices || [];
  const servicesCount = selectedServices.length > 0
    ? selectedServices.length
    : (selectedPlan.toLowerCase().includes('basic') ? 7 : selectedPlan.toLowerCase().includes('pro') ? 21 : 14);

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

  const termsText = terms.join('\n');

  return `${brand}
Enterprise Turnkey B2B FinTech & Banking Switch Infrastructure

${address}

Commercial Proposal
REF: ${refId}
Selected Plan: ${selectedPlan}

Date: ${dateStr}

Prepared Specifically For
${clientCompany}

Attn: ${clientName}

${clientEmail} • ${clientPhone}

Selected Package & Platform Tier
${selectedPlan} (${servicesCount} FinTech Services Configured)

Platform Architecture
Enterprise White-Label Switch

Web Portal • Android APK • Micro ATM

24x7 Instant Settlement Rails

Executive Overview
Based on your objective to deploy a fully branded turnkey White-Label B2B FinTech platform under the ${selectedPlan} (${servicesCount} FinTech services configured), AsthaPay has engineered a comprehensive multi-tiered infrastructure solution. Under this deployment, ${clientCompany} will launch and manage its own independent web and mobile banking ecosystem, backed by institutional multi-bank switch routing, instant commission distribution, and seamless retailer onboarding.

Commercial Pricing & License Terms
Selected Platform Tier\t${selectedPlan} (${servicesCount} Services: ${servicesListSummary})
Platform Setup Fee\t${commercialTerms?.setupFee || `Customized for ${selectedPlan} deployment including white-label portal, Android APK, and switch routing.`}
Monthly Maintenance / AMC\t${commercialTerms?.monthlyFee || 'Covers cloud server scaling, multi-bank switch routing, SSL certificates, and technical support.'}
API Charges\t${commercialTerms?.apiCharges || 'Included in enterprise package with zero per-hit overhead on standard transactions.'}
Transaction Charges\t${commercialTerms?.transactionCharges || 'Zero debit MDR for AePS and Micro ATM; standard IMPS commercial slabs apply for DMT.'}
Hardware mPOS / PIN-Pad\t${commercialTerms?.hardwareCharges || 'Hardware mPOS and Biometric scanners available at volume distributor rates.'}
* Note: ${commercialTerms?.note || 'Commercial pricing will be finalized based on the selected services, transaction volume, infrastructure requirements, and integration scope discussed during your live product demonstration.'}

Proposed Commercial Commission Matrix (${selectedPlan})
Service\tCommercial Rate\tNotes & Settlement
${slabsRows}

Implementation Roadmap
${roadmapText}

Terms & Conditions
${termsText}

For ${clientCompany}

Authorized Signatory

Name & Designation

For ${company}

AsthaPay Solutions
Authorized FinTech Solutions Director

Turnkey FinTech Switch Division`.trim();
}