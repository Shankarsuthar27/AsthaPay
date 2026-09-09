// src/lib/emailService.ts
// Secure Transactional Email Delivery System supporting SMTP (Nodemailer), Resend API, and Sandbox Fallback

import { GeneratedProposal } from '@/types/admin';
import { generateProposalPdfBuffer } from '@/lib/pdfGenerator';
import { getProposalConfig } from '@/lib/proposalConfig';
import { generateProposalPlainText } from '@/lib/proposalPlainText';
import { generateProposalEmailHtml } from '@/lib/proposalEmailTemplate';
import nodemailer from 'nodemailer';

export { generateProposalEmailHtml };

/**
 * Generates an executive, comprehensive plain-text proposal email body
 */
export function generateProposalEmailText(proposal: GeneratedProposal): string {
  return generateProposalPlainText(proposal, getProposalConfig());
}

export interface SendProposalEmailOptions {
  format?: 'plain' | 'html' | 'both';
  sendPdf?: boolean;
}

export interface EmailDispatchResult {
  success: boolean;
  clientDelivered: boolean;
  adminDelivered?: boolean;
  provider: 'smtp' | 'resend' | 'sandbox';
  messageId?: string;
  error?: string;
  warning?: string;
  simulated?: boolean;
}

/**
 * Dispatches personalized proposal to client's business email.
 * Supports pure Plain Text (high inbox deliverability) or Rich HTML.
 * Checks SMTP credentials first, then Resend API, with sandbox fallback.
 */
export async function sendProposalEmail(
  proposal: GeneratedProposal,
  options?: SendProposalEmailOptions
): Promise<EmailDispatchResult> {
  const { client, proposalId } = proposal;
  const companySlug = client.companyName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const attachmentFilename = `${companySlug}-fintech-proposal.pdf`;
  const subject = `Your Personalized FinTech Infrastructure Proposal – ${client.companyName}`;

  const config = getProposalConfig();
  const format: 'plain' | 'html' | 'both' =
    options?.format ||
    (process.env.EMAIL_FORMAT as 'plain' | 'html' | 'both') ||
    config.emailTemplate.format ||
    'plain';

  const isPlainOnly = format === 'plain';

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

      // Build Mail Options - Omit HTML when sending in plain text mode!
      const mailOptions: nodemailer.SendMailOptions = {
        from: smtpFrom,
        to: client.businessEmail,
        subject,
        text: textContent,
        attachments: [
          {
            filename: attachmentFilename,
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ],
      };

      if (!isPlainOnly) {
        mailOptions.html = htmlContent;
      }

      // Dispatch primary proposal to client
      console.log(`[SMTP DISPATCH] Delivering proposal to client: ${client.businessEmail} (Format: ${format.toUpperCase()}) via ${isGmail ? 'Gmail' : emailHost}`);
      const info = await transporter.sendMail(mailOptions);
      console.log(`[SMTP SUCCESS] Proposal delivered to ${client.businessEmail} (Format: ${format}, MessageId: ${info.messageId})`);

      // Dispatch secondary notification to Admin/Sales
      let adminDelivered = false;
      if (adminNotificationEmail && adminNotificationEmail.toLowerCase() !== client.businessEmail.toLowerCase()) {
        try {
          const adminMailOptions: nodemailer.SendMailOptions = {
            from: smtpFrom,
            to: adminNotificationEmail,
            subject: `[Lead Alert] New Demo Request: ${client.companyName} (${client.fullName})`,
            text: `[INBOUND LEAD ALERT]\nA new demo was scheduled by ${client.fullName} (${client.businessEmail}, ${client.mobileNumber}) from ${client.companyName}.\nProposal ${proposalId} was delivered to their inbox in ${format.toUpperCase()} format.\n\n` + textContent,
            attachments: [
              {
                filename: attachmentFilename,
                content: pdfBuffer,
                contentType: 'application/pdf',
              },
            ],
          };

          if (!isPlainOnly) {
            adminMailOptions.html = `<div style="background:#EFF6FF;border:1px solid #BFDBFE;padding:12px 16px;margin-bottom:20px;border-radius:8px;font-family:sans-serif;font-size:13px;color:#1E40AF;">
              <strong>Inbound Lead Notification:</strong> A new live demo was scheduled by <strong>${client.fullName}</strong> (${client.businessEmail}, ${client.mobileNumber}) from <strong>${client.companyName}</strong>. The personalized proposal attached below was delivered to the client in <strong>${format}</strong> format.
            </div>` + htmlContent;
          }

          await transporter.sendMail(adminMailOptions);
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
      console.log(`[RESEND DISPATCH] Attempting to deliver proposal to: ${client.businessEmail} (Format: ${format.toUpperCase()})`);
      const resendPayload: any = {
        from: emailFrom,
        to: [client.businessEmail],
        subject,
        text: textContent,
        attachments: [
          {
            filename: attachmentFilename,
            content: pdfBuffer.toString('base64'),
          },
        ],
        tags: [
          { name: 'proposal_id', value: proposalId },
          { name: 'client_company', value: companySlug },
          { name: 'format', value: format },
        ],
      };

      if (!isPlainOnly) {
        resendPayload.html = htmlContent;
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify(resendPayload),
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
              const fallbackPayload: any = {
                from: emailFrom,
                to: [authorizedEmail],
                subject: `[Lead Alert - Domain Unverified] Proposal for: ${client.fullName} (${client.businessEmail})`,
                text: `Notice: This proposal was generated for ${client.businessEmail}.\nIt was routed to your admin email (${authorizedEmail}) because your domain is not yet verified on Resend.\nDelivery format: ${format.toUpperCase()}.\nTo deliver directly to customer emails, please verify your domain at resend.com/domains or configure Gmail SMTP in .env.local.\n\n` + textContent,
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
                  { name: 'format', value: format },
                ],
              };

              if (!isPlainOnly) {
                fallbackPayload.html = `<div style="background:#FEF3C7;border:1px solid #F59E0B;padding:14px 18px;margin-bottom:20px;border-radius:10px;font-family:sans-serif;font-size:13px;color:#92400E;">
                  <strong>Notice:</strong> Lead demo request was submitted for <strong>${client.fullName}</strong> (${client.businessEmail}, ${client.mobileNumber}).<br/>
                  Delivery format: <strong>${format}</strong>. This email was routed to your account owner inbox because domain verification at <a href="https://resend.com/domains" target="_blank" style="color:#B45309;font-weight:bold;">resend.com/domains</a> is pending.
                </div>` + htmlContent;
              }

              const fallbackRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${resendApiKey}`,
                },
                body: JSON.stringify(fallbackPayload),
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

      console.log(`[RESEND SUCCESS] Proposal delivered directly to ${client.businessEmail} (Format: ${format}, ID: ${data.id})`);
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
  console.log(`Format: ${format.toUpperCase()}`);
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
