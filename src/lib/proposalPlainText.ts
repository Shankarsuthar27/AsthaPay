// src/lib/proposalPlainText.ts
// Client-safe & Server-safe Executive Plain-Text FinTech Proposal Formatter

import { GeneratedProposal } from '@/types/admin';
import { ProposalModularConfig, DEFAULT_PROPOSAL_CONFIG } from '@/lib/proposalConfig';

/**
 * Generates an easy-to-understand, friendly, executive plain-text proposal email body
 * Pure plain text without HTML tags - ideal for plain-text email clients, SMS, and clipboard copy.
 */
export function generateProposalPlainText(
  proposal: GeneratedProposal,
  customConfig?: ProposalModularConfig
): string {
  const { 
    client, 
    requirements, 
    proposalId, 
  } = proposal;

  const config = customConfig || DEFAULT_PROPOSAL_CONFIG;
  const brand = config.companyInfo?.brandName || 'AsthaPay';
  const company = config.companyInfo?.companyName || 'Asthasoft Technologies Pvt. Ltd.';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const proposalUrl = `${appUrl}/proposals/${proposalId}`;
  const pdfDownloadUrl = `${appUrl}/api/proposals/${proposalId}/pdf`;
  const attachmentFilename = `${(client.companyName || 'Partner').replace(/[^a-zA-Z0-9_-]/g, '_')}-fintech-proposal.pdf`;

  // Selected services list
  const selectedList = (requirements?.selectedServices && requirements.selectedServices.length > 0)
    ? requirements.selectedServices.map((s, idx) => `  ${idx + 1}. ${s}`).join('\n')
    : '  1. Aadhaar Enabled Payment System (AePS)\n  2. Domestic Money Transfer (DMT)\n  3. Micro ATM / mPOS\n  4. BBPS Utility Bill Payments';

  return `Dear ${client.fullName || 'Valued Partner'},

Greetings from ${company}.

We are pleased to present our White-Label Fintech Software Proposal for ${client.companyName || 'your esteemed organization'}. Our end-to-end platform is built to streamline digital payments, optimize distribution networks, and deliver enterprise-grade reliability for your operations.

With our white-label solution, you maintain complete brand ownership—including your custom domain, tailored user interface, dedicated AWS server infrastructure, and proprietary APIs.


Standard Deliverables Across All Packages:

• Custom responsive website and corporate branding
• Dedicated Android mobile application
• Dedicated AWS cloud server hosting and setup
• Domain registration and complete Web Admin Panel
• Complimentary automated SMS & email transactional alerts

Selected Services for Launch (${requirements?.selectedServices?.length || 4}):
${selectedList}

Proposal Documents & Access:
• Commercials & Commission Matrix: ${attachmentFilename}
• Interactive Online Proposal: ${proposalUrl}
• Direct Download: ${pdfDownloadUrl}


Core Platform Capabilities:

• Multi-Tier Hierarchy: Create unlimited Retailer, Distributor, and Master Distributor accounts.
• Flexible Wallet Top-Ups: Native support for UPI QR, Virtual Accounts, Cash Deposit, and IMPS/NEFT/RTGS.
• Digital Onboarding: Streamlined e-KYC via real-time PAN and verification services.
• Instant Settlements: Automated, real-time payouts for AEPS and mATM transactions.
• Hardware Ready: Out-of-the-box compatibility with branded mATM and kiosk devices.
• API Re-distribution: Publish and commercialize your own downstream APIs to external partners.
• Business Operations: Automated TDS/GST invoicing, member daybooks, ticket-based dispute resolution, and dynamic content management.


Commercial Terms & Conditions:

• Applicable Taxes: 18% GST applies to all quoted rates.
• Payment Schedule: 70% advance upon contract signing; 30% balance due prior to credential delivery.
• Setup Policy: Initial setup and deployment fees are non-refundable.
• App Store Setup: Google Play Console registration ($25 USD) is billed separately.
• Annual Maintenance (AMC): INR 8,000 + 18% GST.

Required Onboarding Documents:
1. Authorized Signatory Photo ID
2. Proof of Business Address
3. PAN Card Copy
4. Business Registration / Incorporation Certificate
5. Cancelled Cheque (for payout account verification)


Engagement Summary:


• Reference ID: ${proposalId}
• Client Company: ${client.companyName}
• Primary Contact: ${client.fullName} (${client.mobileNumber}, ${client.businessEmail})
• Architecture Model: ${requirements.partnershipModel || 'White-Label B2B Portal & App'}
• Target Network Size: ${requirements.retailNetwork || '50–200 Retailers'}

We look forward to demonstrating the platform and supporting your business expansion.

Warm regards,

Business Development & Solutions Team
${company}
Brand: ${brand}
Support: ${config.companyInfo?.supportEmail || 'info@asthasoftindia.com'}
Direct Line: ${config.companyInfo?.phone || '+91-7023318111'}
Website: ${config.companyInfo?.websiteUrl || 'https://asthapay.in'}
Address: ${config.companyInfo?.address || 'Glitz cinema, Jalore, Rajasthan 343001'}`.trim();
}