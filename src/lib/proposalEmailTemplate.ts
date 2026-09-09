// src/lib/proposalEmailTemplate.ts
// Client-safe & Server-safe HTML Proposal Email Generator
// Matches official White Label Software Business Proposal reference format

import { GeneratedProposal } from '@/types/admin';
import { ProposalModularConfig, DEFAULT_PROPOSAL_CONFIG } from '@/lib/proposalConfig';

/**
 * Generates clean executive HTML email body matching the user reference email screenshots
 */
export function generateProposalEmailHtml(
  proposal: GeneratedProposal,
  customConfig?: ProposalModularConfig
): string {
  const { client, requirements, proposalId } = proposal;
  const config = customConfig || DEFAULT_PROPOSAL_CONFIG;
  const company = config.companyInfo?.companyName || 'Asthasoft Technologies Pvt. Ltd.';
  const brand = config.companyInfo?.brandName || 'AsthaPay';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const proposalUrl = `${appUrl}/proposals/${proposalId}`;
  const pdfDownloadUrl = `${appUrl}/api/proposals/${proposalId}/pdf`;
  const attachmentFilename = `${(client.companyName || 'Partner').replace(/[^a-zA-Z0-9_-]/g, '_')}-fintech-proposal.pdf`;

  const selectedList = (requirements?.selectedServices && requirements.selectedServices.length > 0)
    ? requirements.selectedServices.map((s) => `<span style="display:inline-block;background:#F1F5F9;padding:3px 8px;border-radius:4px;margin:2px 4px 2px 0;font-size:12px;font-weight:600;border:1px solid #E2E8F0;">${s}</span>`).join(' ')
    : 'AePS, DMT, Micro ATM, BBPS';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>White Label Software Business Proposal – ${client.companyName}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #FFFFFF; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; color: #1E293B;">
  <div style="max-width: 680px; margin: 0 auto;">
    <p style="margin: 0 0 16px 0;">Dear ${client.fullName ? `${client.fullName} / Sir` : 'Sir'},</p>

    <p style="margin: 0 0 16px 0;">
      Greetings from <strong>${company}</strong>!
    </p>

    <p style="margin: 0 0 16px 0;">
      ${company} is an innovative Fintech Organization that provides cutting-edge payment solutions to individuals and businesses.<br/>
      We are excited to present our White Label Software Business Proposal to ${client.companyName || 'your esteemed organization'}.
    </p>

    <p style="margin: 0 0 16px 0;">
      Our White Label Software is designed to simplify the payment process for businesses of all sizes.
    </p>

    <p style="margin: 0 0 20px 0;">
      We believe that our White Label Software &amp; Financial APIs can be a valuable asset to your business, and we would be honored to have the opportunity to work with you.<br/>
      We have a team of experienced professionals who will work with you every step of the way to ensure that our solutions meet your specific requirements.
    </p>

    <h2 style="font-size: 18px; font-weight: bold; margin: 24px 0 12px 0; text-decoration: underline; color: #000000;">
      20+ Services Under one panel
    </h2>

    <p style="margin: 0 0 12px 0; text-decoration: underline; color: #78350F; font-size: 14px;">
      Our Available Package: (Client can choose as per requirements)
    </p>

    <!-- Highlighted Value Proposition Callout with Yellow Background matching reference image -->
    <div style="background-color: #FEF08A; padding: 4px 6px; margin: 16px 0; border-radius: 2px; color: #000000; line-height: 1.6; font-size: 14px;">
      Our Software is not our's Its completely yours - Your design, Your Addon, Your Branding &amp; Domain, Your APIs.<br/>
      Now boost your Business with Our support, Our Knowledge, Our Experience, Our Technical Skills, Our Dedicated Servers.
    </div>

    <p style="margin: 16px 0 8px 0; font-size: 14px;">
      <strong>We are providing all these service &amp; products with All Package</strong> (<span style="text-decoration: underline; color: #991B1B;">Basic Plan, Standard Plan, Ultimate Plan</span>)
    </p>
    <ul style="margin: 0 0 16px 0; padding-left: 22px; line-height: 1.8;">
      <li>Website</li>
      <li>Logo Design</li>
      <li>Android Application Development</li>
      <li>Hosting Dedicated AWS Server</li>
      <li>Domain Registration</li>
      <li>Web Panel (Admin Software)</li>
      <li>FREE - SMS &amp; Email Notifications</li>
    </ul>

    <div style="margin: 16px 0; padding: 10px 14px; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px;">
      <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: bold; color: #475569; text-transform: uppercase;">Selected Services for Your Launch:</p>
      <div>${selectedList}</div>
    </div>

    <p style="margin: 16px 0;">
      <strong>Note:</strong> <a href="${pdfDownloadUrl}" style="color: #2563EB; font-weight: bold; text-decoration: underline;">Please find the Below attachment for plan &amp; Pricing, Commission</a>
    </p>

    <hr style="border: 0; border-top: 1px solid #CBD5E1; margin: 24px 0;" />

    <p style="font-weight: bold; font-size: 15px; margin: 18px 0 8px 0; color: #0F172A;">
      Software Features:
    </p>
    <ul style="margin: 0 0 20px 0; padding-left: 22px; line-height: 1.8;">
      <li>Create Unlimited - <strong>Retailer, Distributor, Master Distributor</strong></li>
      <li>Dynamic website / Pages management.</li>
      <li><strong>Multiple Wallet Top-up Option</strong><br/>
        &nbsp;&nbsp;a) Cash Deposit &nbsp;&nbsp;b) Virtual A/c No.<br/>
        &nbsp;&nbsp;c) UPI QR Code &nbsp;&nbsp;d) IMPS/NEFT/RTGS
      </li>
      <li>News (App and Web) Management feature.</li>
      <li>Banner (App and Web) Management feature.</li>
      <li>Employee Management. (Create Unlimited Employee)</li>
      <li>All Service receipt printing feature</li>
      <li><strong>E-KYC Onboarding Through Pan and Aadhar verification</strong></li>
      <li>Wallet system (Fund add/deduct, Transfer, credit etc).</li>
      <li>Recharge dispute and pending management.</li>
      <li>Dispute and support management.</li>
      <li>Charge/ Commission/ Scheme Manager</li>
      <li>Company profile management.</li>
      <li>Integrate SMS API.</li>
      <li>Virtual Fund Management System</li>
      <li><strong>Instant Settlement for AEPS/mATM Transactions</strong></li>
      <li>DayBook Report - Members.</li>
      <li><strong>Can provide own brand Self mATM &amp; KIOSK Machine</strong></li>
      <li>TDS/ GST Report / Invoice Management</li>
      <li>Inbuilt SMS and E-mail Registration</li>
      <li><strong>Can Provide own API to Market.</strong></li>
      <li>Dispute and Support Management</li>
    </ul>

    <hr style="border: 0; border-top: 1px solid #CBD5E1; margin: 24px 0;" />

    <p style="font-weight: bold; font-size: 15px; margin: 18px 0 8px 0; color: #0F172A;">
      Payment Terms &amp; Conditions:
    </p>
    <ul style="margin: 0 0 20px 0; padding-left: 22px; line-height: 1.8;">
      <li><strong>18 % GST</strong> will be applicable on above rate</li>
      <li><strong>70% payments in advance &amp; 30% payments before software login credentials delivery email.</strong></li>
      <li>The Setup fees mentioned in this proposal is <strong>completely non refundable</strong> and under no circumstances the company is liable to refund.</li>
      <li>This quotation not including play store console registration.</li>
      <li>Play Store console fees <strong>25$ is additional charges</strong>.</li>
      <li><strong>Annual Maintenance Cost (AMC) - INR 8000/- + GST</strong></li>
    </ul>

    <hr style="border: 0; border-top: 1px solid #CBD5E1; margin: 24px 0;" />

    <p style="font-weight: bold; font-size: 15px; margin: 18px 0 8px 0; color: #0F172A;">
      Documents required for Registration:
    </p>
    <ol style="margin: 0 0 20px 0; padding-left: 22px; line-height: 1.8;">
      <li><strong>Photo ID Proof Copy</strong></li>
      <li><strong>Address Proof Copy</strong></li>
      <li><strong>Pan Card Copy</strong></li>
      <li><strong>Business Registration Document</strong></li>
      <li><strong>Cancelled cheque</strong></li>
    </ol>

    <hr style="border: 0; border-top: 1px solid #CBD5E1; margin: 24px 0;" />

    <!-- Action & Verification Link -->
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px 18px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748B;">
        <strong>Proposal Reference:</strong> <span style="font-family: monospace; color: #EA580C; font-weight: bold;">${proposalId}</span> &bull; 
        <strong>Attachment:</strong> <span style="font-family: monospace; font-size: 12px; color: #334155;">${attachmentFilename}</span>
      </p>
      <p style="margin: 0; font-size: 13px;">
        🔗 <strong>Review Live Interactive Proposal Online:</strong> 
        <a href="${proposalUrl}" target="_blank" style="color: #2563EB; font-weight: bold; text-decoration: underline;">Open Interactive Proposal &rarr;</a>
      </p>
    </div>

    <!-- Signoff -->
    <div style="margin-top: 24px; font-size: 13.5px; color: #334155;">
      <p style="margin: 0 0 4px 0;">We look forward to demonstrating the platform to you.</p>
      <p style="margin: 12px 0 0 0; font-weight: bold; color: #0F172A;">Warm regards,</p>
      <p style="margin: 2px 0 0 0; font-weight: bold; color: #EA580C;">Business Development &amp; FinTech Solutions Team</p>
      <p style="margin: 2px 0 0 0; font-weight: bold; color: #0F172A;">${company}</p>
      <p style="margin: 2px 0 0 0; font-size: 12px; color: #64748B;">
        Website: <a href="${config.companyInfo?.websiteUrl || 'https://asthapay.com'}" style="color: #2563EB; text-decoration: underline;">${config.companyInfo?.websiteUrl || 'https://asthapay.com'}</a> &bull; 
        Support: ${config.companyInfo?.supportEmail || 'support@asthapay.com'} &bull; 
        Phone: ${config.companyInfo?.phone || '+91 98111 22334'}
      </p>
      <p style="margin: 2px 0 0 0; font-size: 11px; color: #94A3B8;">
        Address: ${config.companyInfo?.address || 'DLF Cyber City, Sector 24, Gurugram, Haryana - 122002'}
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
