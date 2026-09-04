// src/lib/emailService.ts
// Secure Transactional Email Delivery System supporting SMTP (Nodemailer), Resend API, and Sandbox Fallback

import { GeneratedProposal } from '@/types/admin';
import { generateProposalPdfBuffer } from '@/lib/pdfGenerator';
import nodemailer from 'nodemailer';

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  provider?: 'smtp' | 'resend' | 'sandbox';
  clientDelivered?: boolean;
  adminDelivered?: boolean;
  warning?: string;
  error?: string;
}

/**
 * Generates the clean executive HTML email body matching the prompt specification
 */
export function generateProposalEmailHtml(proposal: GeneratedProposal): string {
  const { client, requirements, proposalId, executiveSummary } = proposal;
  const proposalUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/proposals/${proposalId}`;
  const pdfDownloadUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/proposals/${proposalId}/pdf`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Personalized FinTech Infrastructure Proposal – ${client.companyName}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B; line-height: 1.6; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #F1F5F9; padding: 40px 0; }
    .container { max-width: 620px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(7, 23, 47, 0.08); border: 1px solid #E2E8F0; }
    .header { background: linear-gradient(135deg, #07172F 0%, #0A1931 100%); padding: 36px 32px; text-align: center; color: #FFFFFF; }
    .brand-title { font-size: 26px; font-weight: 900; letter-spacing: -0.5px; margin: 0; color: #FFFFFF; }
    .brand-title span { color: #FF5733; }
    .brand-tagline { font-size: 12px; color: #94A3B8; margin-top: 6px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
    .badge { display: inline-block; background: rgba(255, 87, 51, 0.15); border: 1px solid rgba(255, 87, 51, 0.35); color: #FF5733; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 800; font-family: monospace; margin-top: 14px; }
    .content { padding: 36px 32px; }
    .greeting { font-size: 18px; font-weight: 800; color: #07172F; margin-bottom: 18px; }
    .paragraph { font-size: 14px; color: #334155; line-height: 1.7; margin-bottom: 16px; }
    .summary-card { background: #F8FAFC; border-left: 4px solid #FF5733; padding: 18px 20px; border-radius: 8px; margin: 24px 0; }
    .summary-card h4 { margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; color: #07172F; font-weight: 800; letter-spacing: 0.5px; }
    .summary-card p { margin: 0; font-size: 13.5px; color: #475569; line-height: 1.6; }
    .specs-table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 13px; }
    .specs-table td { padding: 10px 14px; border-bottom: 1px solid #EDF2F7; }
    .specs-table td.label { font-weight: 700; color: #64748B; width: 40%; background: #F8FAFC; }
    .specs-table td.val { font-weight: 700; color: #0F172A; }
    .services-title { font-size: 13px; font-weight: 800; color: #07172F; text-transform: uppercase; letter-spacing: 0.5px; margin: 24px 0 10px 0; }
    .services-grid { margin-bottom: 24px; }
    .service-tag { display: inline-block; background: #EEF2F6; color: #07172F; font-weight: 600; font-size: 11.5px; padding: 5px 12px; border-radius: 6px; margin: 0 5px 8px 0; border: 1px solid #E2E8F0; }
    .attachment-notice { background: #FFF7ED; border: 1px solid #FED7AA; border-radius: 12px; padding: 16px; margin: 24px 0; display: flex; align-items: center; }
    .attachment-notice p { margin: 0; font-size: 13px; color: #9A3412; font-weight: 600; }
    .cta-container { text-align: center; margin: 32px 0 16px 0; }
    .btn-primary { display: inline-block; background: linear-gradient(135deg, #FF5733 0%, #E03E1D 100%); color: #FFFFFF !important; font-size: 14px; font-weight: 800; text-decoration: none; padding: 14px 30px; border-radius: 10px; box-shadow: 0 4px 14px rgba(255, 87, 51, 0.35); }
    .btn-secondary { display: inline-block; background: #F1F5F9; color: #0F172A !important; font-size: 12.5px; font-weight: 700; text-decoration: none; padding: 10px 20px; border-radius: 8px; margin-left: 8px; }
    .signoff { margin-top: 32px; padding-top: 20px; border-top: 1px solid #E2E8F0; font-size: 13.5px; color: #475569; }
    .footer { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 24px 32px; text-align: center; font-size: 11.5px; color: #94A3B8; }
    .footer p { margin: 4px 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="brand-title">Astha<span>Pay</span> Technologies</div>
        <div class="brand-tagline">Turnkey FinTech Infrastructure &amp; Multi-Bank Switch Platform</div>
        <div class="badge">PROPOSAL REF: ${proposalId}</div>
      </div>

      <!-- Main Content -->
      <div class="content">
        <div class="greeting">Hello ${client.fullName},</div>

        <p class="paragraph">
          Thank you for your interest in our Turnkey FinTech Infrastructure platform.
        </p>

        <p class="paragraph">
          Based on the requirements you submitted, we have prepared a personalized proposal for <strong>${client.companyName}</strong>.
        </p>

        <p class="paragraph">
          The proposal includes our recommended platform architecture, selected services, implementation approach and next steps.
        </p>

        <div class="attachment-notice">
          <p>
            📎 <strong>Please find your personalized proposal attached:</strong><br/>
            <span style="font-family: monospace; font-size: 12px; color: #C2410C;">
              ${client.companyName.replace(/[^a-zA-Z0-9_-]/g, '_')}-fintech-proposal.pdf
            </span>
          </p>
        </div>

        <!-- Executive Summary Box -->
        <div class="summary-card">
          <h4>Executive Solution Overview</h4>
          <p>${executiveSummary}</p>
        </div>

        <!-- Key Specifications Table -->
        <table class="specs-table">
          <tr>
            <td class="label">Partnership Model</td>
            <td class="val">${requirements.partnershipModel}</td>
          </tr>
          <tr>
            <td class="label">Estimated Retail Network</td>
            <td class="val">${requirements.retailNetwork}</td>
          </tr>
          <tr>
            <td class="label">Operating Company</td>
            <td class="val">${client.companyName}</td>
          </tr>
          <tr>
            <td class="label">Proposal Reference</td>
            <td class="val" style="font-family: monospace; color: #FF5733;">${proposalId}</td>
          </tr>
          <tr>
            <td class="label">Date Generated</td>
            <td class="val">${proposal.generatedAt}</td>
          </tr>
        </table>

        <!-- Selected Services -->
        <div class="services-title">Services Selected for Launch (${requirements.selectedServices.length}):</div>
        <div class="services-grid">
          ${requirements.selectedServices.map((s) => `<span class="service-tag">${s}</span>`).join('')}
        </div>

        <!-- Action CTAs -->
        <div class="cta-container">
          <a href="${proposalUrl}" target="_blank" class="btn-primary">
            View Live Proposal Online &rarr;
          </a>
          <a href="${pdfDownloadUrl}" target="_blank" class="btn-secondary">
            Download PDF
          </a>
        </div>

        <!-- Signoff -->
        <div class="signoff">
          <p style="margin: 0 0 4px 0;">We look forward to demonstrating the platform to you.</p>
          <p style="margin: 0; font-weight: 700; color: #07172F;">Regards,</p>
          <p style="margin: 0; font-weight: 800; color: #FF5733;">FinTech Infrastructure Team</p>
          <p style="margin: 2px 0 0 0; font-size: 12px; color: #64748B;">AsthaPay Technologies Private Limited</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p><strong>AsthaPay Technologies Private Limited</strong></p>
        <p>Enterprise Banking Switches &bull; NPCI Integrated Connectivity &bull; Instant 24x7 Settlement</p>
        <p style="margin-top: 8px;">
          Direct Inquiries: <a href="mailto:support@asthapay.com" style="color: #FF5733; text-decoration: none; font-weight: bold;">support@asthapay.com</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Plain-text email fallback matching prompt template
 */
export function generateProposalEmailText(proposal: GeneratedProposal): string {
  const { client, proposalId } = proposal;
  return `
Hello ${client.fullName},

Thank you for your interest in our Turnkey FinTech Infrastructure platform.

Based on the requirements you submitted, we have prepared a personalized proposal for ${client.companyName}.

The proposal includes our recommended platform architecture, selected services, implementation approach and next steps.

Please find your personalized proposal attached (${client.companyName}-fintech-proposal.pdf).

Proposal Reference: ${proposalId}
Partnership Model: ${proposal.requirements.partnershipModel}
Retail Network: ${proposal.requirements.retailNetwork}

You can also review your interactive proposal online at:
${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/proposals/${proposalId}

We look forward to demonstrating the platform to you.

Regards,
FinTech Infrastructure Team
AsthaPay Technologies Private Limited
  `.trim();
}

/**
 * Dispatches personalized proposal to client's business email with attached PDF.
 * Checks SMTP credentials first, then Resend API, with sandbox fallback.
 */
export async function sendProposalEmail(proposal: GeneratedProposal): Promise<EmailDispatchResult> {
  const { client, proposalId } = proposal;
  const companySlug = client.companyName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const attachmentFilename = `${companySlug}-fintech-proposal.pdf`;
  const subject = `Your Personalized FinTech Infrastructure Proposal – ${client.companyName}`;

  // 1. Generate Binary PDF Buffer
  let pdfBuffer: Buffer;
  try {
    pdfBuffer = generateProposalPdfBuffer(proposal);
  } catch (pdfErr) {
    console.error('Failed to generate PDF buffer for email attachment:', pdfErr);
    pdfBuffer = Buffer.from('PDF generation in progress');
  }

  const htmlContent = generateProposalEmailHtml(proposal);
  const textContent = generateProposalEmailText(proposal);

  const emailHost = process.env.EMAIL_HOST;
  const emailPort = process.env.EMAIL_PORT;
  const emailUser = process.env.EMAIL_USER;
  const rawEmailPassword = process.env.EMAIL_PASSWORD;
  const emailService = process.env.EMAIL_SERVICE;
  const configuredFrom = process.env.EMAIL_FROM;
  const resendApiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;
  const adminNotificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.RESEND_ACCOUNT_EMAIL || 'shankar.952152@gmail.com';

  // 2. Try SMTP if configured (Host or Service + User + Password present)
  if ((emailHost || emailService) && emailUser && rawEmailPassword && !emailHost?.includes('placeholder')) {
    try {
      const isGmail = emailService === 'gmail' || emailHost?.toLowerCase().includes('gmail');
      const cleanPassword = rawEmailPassword.replace(/\s+/g, ''); // strip spaces in Google 16-char app passwords
      const port = emailPort ? parseInt(emailPort, 10) : (isGmail ? 465 : 587);

      const transporter = isGmail
        ? nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: emailUser,
              pass: cleanPassword,
            },
            tls: {
              rejectUnauthorized: false,
            },
          })
        : nodemailer.createTransport({
            host: emailHost,
            port,
            secure: port === 465,
            auth: {
              user: emailUser,
              pass: cleanPassword,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

      // Default SMTP sender to authenticated email to prevent SMTP rejection
      const smtpFrom = configuredFrom && !configuredFrom.includes('onboarding@resend.dev')
        ? configuredFrom
        : `AsthaPay Technologies <${emailUser}>`;

      // Dispatch primary proposal to client
      console.log(`[SMTP DISPATCH] Delivering proposal to client: ${client.businessEmail} via ${isGmail ? 'Gmail' : emailHost}`);
      const info = await transporter.sendMail({
        from: smtpFrom,
        to: client.businessEmail,
        subject,
        text: textContent,
        html: htmlContent,
        attachments: [
          {
            filename: attachmentFilename,
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ],
      });

      console.log(`[SMTP SUCCESS] Proposal delivered to ${client.businessEmail} (MessageId: ${info.messageId})`);

      // Dispatch secondary notification to Admin/Sales
      let adminDelivered = false;
      if (adminNotificationEmail && adminNotificationEmail.toLowerCase() !== client.businessEmail.toLowerCase()) {
        try {
          await transporter.sendMail({
            from: smtpFrom,
            to: adminNotificationEmail,
            subject: `[Lead Alert] New Demo Request: ${client.companyName} (${client.fullName})`,
            text: `New demo request received from ${client.fullName} (${client.businessEmail}, ${client.mobileNumber}). Proposal ${proposalId} has been delivered to their email.\n\n` + textContent,
            html: `<div style="background:#EFF6FF;border:1px solid #BFDBFE;padding:12px 16px;margin-bottom:20px;border-radius:8px;font-family:sans-serif;font-size:13px;color:#1E40AF;">
              <strong>Inbound Lead Notification:</strong> A new live demo was scheduled by <strong>${client.fullName}</strong> (${client.businessEmail}, ${client.mobileNumber}) from <strong>${client.companyName}</strong>. The personalized proposal attached below was delivered to the client.
            </div>` + htmlContent,
            attachments: [
              {
                filename: attachmentFilename,
                content: pdfBuffer,
                contentType: 'application/pdf',
              },
            ],
          });
          adminDelivered = true;
          console.log(`[SMTP SUCCESS] Admin alert dispatched to ${adminNotificationEmail}`);
        } catch (adminErr) {
          console.warn('[SMTP WARNING] Admin lead alert skipped:', adminErr);
        }
      }

      return {
        success: true,
        clientDelivered: true,
        adminDelivered,
        provider: 'smtp',
        messageId: info.messageId,
      };
    } catch (smtpErr: unknown) {
      const errMsg = smtpErr instanceof Error ? smtpErr.message : 'SMTP delivery failed';
      console.error('SMTP Email dispatch failure:', smtpErr);
      // Fall through to try Resend if configured, or return error
      if (!resendApiKey || resendApiKey.includes('placeholder')) {
        return {
          success: false,
          clientDelivered: false,
          adminDelivered: false,
          provider: 'smtp',
          error: errMsg,
        };
      }
    }
  }

  // 3. Try Resend REST API if configured
  if (resendApiKey && !resendApiKey.includes('placeholder')) {
    const emailFrom = configuredFrom || 'AsthaPay Technologies <onboarding@resend.dev>';

    try {
      console.log(`[RESEND DISPATCH] Attempting to deliver proposal to: ${client.businessEmail}`);
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: emailFrom,
          to: [client.businessEmail],
          subject,
          text: textContent,
          html: htmlContent,
          attachments: [
            {
              filename: attachmentFilename,
              content: pdfBuffer.toString('base64'),
            },
          ],
          tags: [
            { name: 'proposal_id', value: proposalId },
            { name: 'client_company', value: companySlug },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Resend delivery error response:', data);

        // Check for Resend unverified domain testing policy
        const isTestingRestriction = data.message && (
          data.message.includes('testing emails to your own email address') ||
          data.message.includes('testing email address') ||
          data.message.includes('verify a domain') ||
          data.message.includes('Invalid `to` field')
        );

        if (isTestingRestriction) {
          const match = data.message.match(/\(([^)]+)\)/);
          const authorizedEmail = match ? match[1] : adminNotificationEmail;

          let adminDelivered = false;
          if (authorizedEmail) {
            console.warn(`[RESEND TEST RESTRICTION] Domain not yet verified on Resend. Forwarding lead proposal to admin: ${authorizedEmail}`);

            try {
              const fallbackRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${resendApiKey}`,
                },
                body: JSON.stringify({
                  from: emailFrom,
                  to: [authorizedEmail],
                  subject: `[Lead Alert - Domain Unverified] Proposal for: ${client.fullName} (${client.businessEmail})`,
                  text: `Notice: This proposal was generated for ${client.businessEmail}.\nIt was routed to your admin email (${authorizedEmail}) because your domain is not yet verified on Resend.\nTo deliver directly to customer emails, please verify your domain at resend.com/domains or configure Gmail SMTP in .env.local.\n\n` + textContent,
                  html: `<div style="background:#FEF3C7;border:1px solid #F59E0B;padding:14px 18px;margin-bottom:20px;border-radius:10px;font-family:sans-serif;font-size:13px;color:#92400E;">
                    <strong>Notice:</strong> Lead demo request was submitted for <strong>${client.fullName}</strong> (${client.businessEmail}, ${client.mobileNumber}).<br/>
                    This email was routed to your account owner inbox because domain verification at <a href="https://resend.com/domains" target="_blank" style="color:#B45309;font-weight:bold;">resend.com/domains</a> is pending. To send directly to your customers, configure Gmail SMTP or verify your domain.
                  </div>` + htmlContent,
                  attachments: [
                    {
                      filename: attachmentFilename,
                      content: pdfBuffer.toString('base64'),
                    },
                  ],
                  tags: [
                    { name: 'proposal_id', value: proposalId },
                    { name: 'client_company', value: companySlug },
                    { name: 'original_recipient', value: client.businessEmail.replace(/[^a-zA-Z0-9_-]/g, '_') },
                  ],
                }),
              });

              const fallbackData = await fallbackRes.json();
              if (fallbackRes.ok) {
                adminDelivered = true;
                console.log(`[RESEND NOTIFICATION] Admin received lead alert (ID: ${fallbackData.id})`);
              }
            } catch (fallbackErr) {
              console.error('Resend fallback delivery failed:', fallbackErr);
            }
          }

          return {
            success: false,
            clientDelivered: false,
            adminDelivered,
            provider: 'resend',
            error: 'Resend free sandbox domain restricts delivery: Domain must be verified at resend.com/domains, or Gmail SMTP credentials configured in .env.local.',
            warning: 'Proposal sent to admin owner inbox only due to unverified domain policy.',
          };
        }

        return {
          success: false,
          clientDelivered: false,
          adminDelivered: false,
          provider: 'resend',
          error: data.message || 'Resend delivery failed',
        };
      }

      console.log(`[RESEND SUCCESS] Proposal delivered directly to ${client.businessEmail} (ID: ${data.id})`);
      return {
        success: true,
        clientDelivered: true,
        provider: 'resend',
        messageId: data.id,
      };
    } catch (resendErr: unknown) {
      const errMsg = resendErr instanceof Error ? resendErr.message : 'Resend API network failure';
      console.error('Resend dispatch error:', resendErr);
      return {
        success: false,
        clientDelivered: false,
        adminDelivered: false,
        provider: 'resend',
        error: errMsg,
      };
    }
  }

  // 4. Development / Sandbox Fallback Mode
  console.log(`\n======================================================`);
  console.log(`[EMAIL SANDBOX] Transactional Proposal Dispatch`);
  console.log(`To: ${client.businessEmail}`);
  console.log(`Subject: ${subject}`);
  console.log(`Proposal ID: ${proposalId}`);
  console.log(`Recipient Company: ${client.companyName}`);
  console.log(`Attachment: ${attachmentFilename} (${pdfBuffer.length} bytes)`);
  console.log(`Online Proposal URL: http://localhost:3000/proposals/${proposalId}`);
  console.log(`Download PDF URL: http://localhost:3000/api/proposals/${proposalId}/pdf`);
  console.log(`======================================================\n`);

  return {
    success: true,
    clientDelivered: false,
    adminDelivered: false,
    simulated: true,
    provider: 'sandbox',
    messageId: `sim-${Date.now()}`,
  };
}
