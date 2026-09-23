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

export interface GenericEmailPayload {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string; // Buffer or base64 string
    contentType?: string;
  }>;
}

/**
 * Normalizes email address sender format.
 * Strips accidental internal quotation marks while keeping RFC compliant display format:
 * e.g. 'Asthasoft Technologies <sales@asthasoftindia.com>'
 */
function getNormalizedFrom(configuredFrom?: string, fallback = 'Asthasoft Technologies <sales@asthasoftindia.com>'): string {
  if (!configuredFrom) return fallback;
  const cleaned = configuredFrom.trim();
  // Remove wrapping quotes if present
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    return cleaned.slice(1, -1).trim();
  }
  return cleaned;
}

/**
 * Universal email dispatcher for arbitrary system alerts, inquiries, and customer confirmations.
 * Tries SMTP first (if configured), then Resend API, with sandbox fallback.
 */
export async function sendEmail(payload: GenericEmailPayload): Promise<EmailDispatchResult> {
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = process.env.EMAIL_PORT;
  const emailUser = process.env.EMAIL_USER;
  const rawEmailPassword = process.env.EMAIL_PASSWORD;
  const emailService = process.env.EMAIL_SERVICE;
  const configuredFrom = process.env.EMAIL_FROM;
  const resendApiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;

  const defaultFrom = getNormalizedFrom(configuredFrom, 'Asthasoft Technologies <sales@asthasoftindia.com>');
  const from = payload.from || defaultFrom;
  const recipients = Array.isArray(payload.to) ? payload.to : [payload.to];
  const plainText = payload.text || (payload.html ? payload.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '');

  // 1. Try SMTP if configured
  if ((emailHost || emailService) && emailUser && rawEmailPassword && !emailHost?.includes('placeholder')) {
    try {
      const isGmail = emailService === 'gmail' || emailHost?.toLowerCase().includes('gmail');
      const cleanPassword = rawEmailPassword.replace(/\s+/g, '');
      const port = emailPort ? parseInt(emailPort, 10) : (isGmail ? 465 : 587);

      const transporter = isGmail
        ? nodemailer.createTransport({
            service: 'gmail',
            auth: { user: emailUser, pass: cleanPassword },
            tls: { rejectUnauthorized: false },
          })
        : nodemailer.createTransport({
            host: emailHost,
            port,
            secure: port === 465,
            auth: { user: emailUser, pass: cleanPassword },
            tls: { rejectUnauthorized: false },
          });

      const smtpFrom = from.includes('onboarding@resend.dev') ? `AsthaPay <${emailUser}>` : from;

      const mailOptions: nodemailer.SendMailOptions = {
        from: smtpFrom,
        to: recipients.join(', '),
        subject: payload.subject,
        text: plainText,
        html: payload.html,
        replyTo: payload.replyTo,
        attachments: payload.attachments?.map((att) => ({
          filename: att.filename,
          content: typeof att.content === 'string' ? Buffer.from(att.content, 'base64') : att.content,
          contentType: att.contentType,
        })),
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`[SMTP SUCCESS] Generic email delivered to ${recipients.join(', ')} (MessageId: ${info.messageId})`);
      return {
        success: true,
        clientDelivered: true,
        provider: 'smtp',
        messageId: info.messageId,
      };
    } catch (smtpErr: unknown) {
      console.error('SMTP generic dispatch failure:', smtpErr);
      if (!resendApiKey || resendApiKey.includes('placeholder')) {
        return {
          success: false,
          clientDelivered: false,
          provider: 'smtp',
          error: smtpErr instanceof Error ? smtpErr.message : 'SMTP delivery failed',
        };
      }
    }
  }

  // 2. Try Resend REST API if configured
  if (resendApiKey && !resendApiKey.includes('placeholder')) {
    try {
      const resendPayload: any = {
        from,
        to: recipients,
        subject: payload.subject,
        text: plainText,
        html: payload.html,
        reply_to: payload.replyTo,
      };

      if (payload.attachments && payload.attachments.length > 0) {
        resendPayload.attachments = payload.attachments.map((att) => ({
          filename: att.filename,
          content: typeof att.content === 'string' ? att.content : att.content.toString('base64'),
        }));
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
        console.error('Resend generic email delivery error response:', data);
        return {
          success: false,
          clientDelivered: false,
          provider: 'resend',
          error: data.message || 'Resend delivery failed',
        };
      }

      console.log(`[RESEND SUCCESS] Generic email delivered to ${recipients.join(', ')} (ID: ${data.id})`);
      return {
        success: true,
        clientDelivered: true,
        provider: 'resend',
        messageId: data.id,
      };
    } catch (resendErr: unknown) {
      console.error('Resend generic email error:', resendErr);
      return {
        success: false,
        clientDelivered: false,
        provider: 'resend',
        error: resendErr instanceof Error ? resendErr.message : 'Resend API network failure',
      };
    }
  }

  // 3. Fallback Sandbox
  console.log(`[EMAIL SANDBOX] Generic email simulated to ${recipients.join(', ')}: ${payload.subject}`);
  return {
    success: true,
    clientDelivered: false,
    simulated: true,
    provider: 'sandbox',
    messageId: `sim-${Date.now()}`,
  };
}

/**
 * Dispatches personalized proposal to client's business email.
 * Defaults to delivering both Rich HTML and Plain Text fallback for maximum deliverability.
 * Also dispatches instant inbound lead notification to Admin/Sales inbox with proposal PDF attached.
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
  // Default to 'both' to guarantee rich HTML design with clean plain-text fallback
  const format: 'plain' | 'html' | 'both' =
    options?.format ||
    (process.env.EMAIL_FORMAT as 'plain' | 'html' | 'both') ||
    config.emailTemplate.format ||
    'both';

  const includeHtml = format === 'html' || format === 'both';
  const includeText = format === 'plain' || format === 'both';

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

  const normalizedFrom = getNormalizedFrom(configuredFrom, 'Asthasoft Technologies <sales@asthasoftindia.com>');

  // 2. Try SMTP if configured (Host or Service + User + Password present)
  if ((emailHost || emailService) && emailUser && rawEmailPassword && !emailHost?.includes('placeholder')) {
    try {
      const isGmail = emailService === 'gmail' || emailHost?.toLowerCase().includes('gmail');
      const cleanPassword = rawEmailPassword.replace(/\s+/g, '');
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

      const smtpFrom = configuredFrom && !configuredFrom.includes('onboarding@resend.dev')
        ? normalizedFrom
        : `AsthaPay Technologies <${emailUser}>`;

      const mailOptions: nodemailer.SendMailOptions = {
        from: smtpFrom,
        to: client.businessEmail,
        subject,
        attachments: [
          {
            filename: attachmentFilename,
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ],
      };

      if (includeText) {
        mailOptions.text = textContent;
      }
      if (includeHtml) {
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

          if (includeHtml) {
            adminMailOptions.html = `<div style="background:#EFF6FF;border:1px solid #BFDBFE;padding:16px 20px;margin-bottom:20px;border-radius:10px;font-family:sans-serif;font-size:13px;color:#1E40AF;">
              <h3 style="margin:0 0 10px 0;font-size:16px;color:#1E3A8A;">🚀 Inbound FinTech Demo Scheduled</h3>
              <p style="margin:0 0 8px 0;">A visitor requested a demo and their personalized proposal was dispatched:</p>
              <ul style="margin:0;padding-left:20px;line-height:1.7;">
                <li><strong>Contact Name:</strong> ${client.fullName}</li>
                <li><strong>Company:</strong> ${client.companyName}</li>
                <li><strong>Business Email:</strong> <a href="mailto:${client.businessEmail}" style="color:#2563EB;">${client.businessEmail}</a></li>
                <li><strong>Mobile Number:</strong> <a href="tel:${client.mobileNumber}" style="color:#2563EB;">${client.mobileNumber}</a></li>
                <li><strong>Partnership Model:</strong> ${proposal.requirements?.partnershipModel || 'White-Label'}</li>
                <li><strong>Retail Network:</strong> ${proposal.requirements?.retailNetwork || 'Not specified'}</li>
                <li><strong>Selected Services:</strong> ${(proposal.requirements?.selectedServices || []).join(', ')}</li>
              </ul>
              <div style="margin-top:14px;padding-top:10px;border-top:1px solid #BFDBFE;font-size:12px;">
                Personalized proposal PDF attached. <a href="http://localhost:3000/proposals/${proposalId}" target="_blank" style="color:#2563EB;font-weight:bold;">View Interactive Proposal &rarr;</a>
              </div>
            </div>` + htmlContent;
          }

          await transporter.sendMail(adminMailOptions);
          adminDelivered = true;
          console.log(`[SMTP SUCCESS] Admin alert dispatched to ${adminNotificationEmail}`);
        } catch (adminErr) {
          console.warn('[SMTP WARNING] Admin lead alert skipped:', adminErr);
        }
      } else if (adminNotificationEmail && adminNotificationEmail.toLowerCase() === client.businessEmail.toLowerCase()) {
        adminDelivered = true;
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
    const emailFrom = normalizedFrom;

    try {
      console.log(`[RESEND DISPATCH] Attempting to deliver proposal to: ${client.businessEmail} (Format: ${format.toUpperCase()})`);
      const resendPayload: any = {
        from: emailFrom,
        to: [client.businessEmail],
        subject,
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

      if (includeText) {
        resendPayload.text = textContent;
      }
      if (includeHtml) {
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

              if (includeText) {
                fallbackPayload.text = `Notice: This proposal was generated for ${client.businessEmail}.\nIt was routed to your admin email (${authorizedEmail}) because your domain is not yet verified on Resend.\nDelivery format: ${format.toUpperCase()}.\nTo deliver directly to customer emails, please verify your domain at resend.com/domains or configure Gmail SMTP in .env.local.\n\n` + textContent;
              }
              if (includeHtml) {
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

      // Dispatch secondary notification to Admin/Sales via Resend
      let adminDelivered = false;
      if (adminNotificationEmail && adminNotificationEmail.toLowerCase() !== client.businessEmail.toLowerCase()) {
        try {
          const adminPayload: any = {
            from: emailFrom,
            to: [adminNotificationEmail],
            subject: `[Lead Alert] New Demo Request: ${client.companyName} (${client.fullName})`,
            text: `[INBOUND LEAD ALERT]\nA new demo was scheduled by ${client.fullName} (${client.businessEmail}, ${client.mobileNumber}) from ${client.companyName}.\nProposal ${proposalId} was delivered to their inbox.\n\n` + textContent,
            attachments: [
              {
                filename: attachmentFilename,
                content: pdfBuffer.toString('base64'),
              },
            ],
            tags: [
              { name: 'type', value: 'admin_lead_alert' },
              { name: 'proposal_id', value: proposalId },
              { name: 'client_company', value: companySlug },
            ],
          };

          if (includeHtml) {
            adminPayload.html = `<div style="background:#EFF6FF;border:1px solid #BFDBFE;padding:16px 20px;margin-bottom:20px;border-radius:10px;font-family:sans-serif;font-size:13px;color:#1E40AF;">
              <h3 style="margin:0 0 10px 0;font-size:16px;color:#1E3A8A;">🚀 Inbound FinTech Demo Scheduled</h3>
              <p style="margin:0 0 8px 0;">A visitor requested a live demo and their proposal PDF was dispatched:</p>
              <ul style="margin:0;padding-left:20px;line-height:1.7;">
                <li><strong>Contact Name:</strong> ${client.fullName}</li>
                <li><strong>Company:</strong> ${client.companyName}</li>
                <li><strong>Business Email:</strong> <a href="mailto:${client.businessEmail}" style="color:#2563EB;">${client.businessEmail}</a></li>
                <li><strong>Mobile Number:</strong> <a href="tel:${client.mobileNumber}" style="color:#2563EB;">${client.mobileNumber}</a></li>
                <li><strong>Partnership Model:</strong> ${proposal.requirements?.partnershipModel || 'White-Label'}</li>
                <li><strong>Retail Network:</strong> ${proposal.requirements?.retailNetwork || 'Not specified'}</li>
                <li><strong>Selected Services:</strong> ${(proposal.requirements?.selectedServices || []).join(', ')}</li>
              </ul>
              <div style="margin-top:14px;padding-top:10px;border-top:1px solid #BFDBFE;font-size:12px;">
                Personalized proposal PDF attached below. <a href="http://localhost:3000/proposals/${proposalId}" target="_blank" style="color:#2563EB;font-weight:bold;">View Interactive Proposal &rarr;</a>
              </div>
            </div>` + htmlContent;
          }

          const adminRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify(adminPayload),
          });
          const adminData = await adminRes.json();
          if (adminRes.ok) {
            adminDelivered = true;
            console.log(`[RESEND SUCCESS] Admin alert dispatched to ${adminNotificationEmail} (ID: ${adminData.id})`);
          } else {
            console.warn('[RESEND WARNING] Admin lead alert skipped:', adminData);
          }
        } catch (adminErr) {
          console.warn('[RESEND WARNING] Admin lead alert dispatch error:', adminErr);
        }
      } else if (adminNotificationEmail && adminNotificationEmail.toLowerCase() === client.businessEmail.toLowerCase()) {
        adminDelivered = true;
      }

      return {
        success: true,
        clientDelivered: true,
        adminDelivered,
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
