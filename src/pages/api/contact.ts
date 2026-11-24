import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { site } from '../../portfolio/config';

/**
 * Contact form → email to you, plus a short confirmation email to the visitor,
 * both sent through your Gmail account.
 *
 * Needs two environment variables (set them in Vercel → Project → Settings →
 * Environment Variables, and in a local .env.local file for testing; never commit them):
 *   GMAIL_USER          the Gmail address that sends the mail, e.g. attique.dev@gmail.com
 *   GMAIL_APP_PASSWORD  a Google App Password for that account (16 letters)
 */

type Result = { success: true } | { success: false; error: string };

const MAX = { name: 100, email: 200, service: 100, budget: 100, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Light protection against spam bursts (per server instance).
const recent = new Map<string, number[]>();
function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch] as string);
}

/**
 * Confirmation email for the visitor, in their language. It deliberately does NOT repeat
 * what they typed, so the form can't be abused to send someone else's text from your Gmail.
 */
const CONFIRM = {
  en: {
    subject: 'Thank you for your message',
    hi: (n: string) => (n ? `Hi ${n},` : 'Hi,'),
    body: [
      'Thank you for getting in touch. Your message has been received.',
      'I will reply within 24 hours. If it is urgent, you can also reach me on WhatsApp.',
    ],
    bye: 'Best regards,',
  },
  it: {
    subject: 'Grazie per il tuo messaggio',
    hi: (n: string) => (n ? `Ciao ${n},` : 'Ciao,'),
    body: [
      'Grazie per avermi contattato. Ho ricevuto il tuo messaggio.',
      'Ti risponderò entro 24 ore. Se è urgente, puoi scrivermi anche su WhatsApp.',
    ],
    bye: 'Cordiali saluti,',
  },
  nl: {
    subject: 'Bedankt voor je bericht',
    hi: (n: string) => (n ? `Hoi ${n},` : 'Hoi,'),
    body: [
      'Bedankt voor je bericht. Ik heb het goed ontvangen.',
      'Ik reageer binnen 24 uur. Is het dringend? Stuur me dan ook een bericht via WhatsApp.',
    ],
    bye: 'Met vriendelijke groet,',
  },
  fr: {
    subject: 'Merci pour votre message',
    hi: (n: string) => (n ? `Bonjour ${n},` : 'Bonjour,'),
    body: [
      'Merci de m’avoir contacté. Votre message a bien été reçu.',
      'Je vous réponds sous 24 heures. En cas d’urgence, vous pouvez aussi m’écrire sur WhatsApp.',
    ],
    bye: 'Bien cordialement,',
  },
  de: {
    subject: 'Vielen Dank für Ihre Nachricht',
    hi: (n: string) => (n ? `Hallo ${n},` : 'Hallo,'),
    body: [
      'Vielen Dank für Ihre Nachricht. Sie ist bei mir angekommen.',
      'Ich antworte innerhalb von 24 Stunden. Wenn es dringend ist, erreichen Sie mich auch per WhatsApp.',
    ],
    bye: 'Mit freundlichen Grüßen,',
  },
} as const;
type ConfirmLocale = keyof typeof CONFIRM;

/** First name for the greeting, or '' when it looks like a link or junk (keeps spam text out). */
function greetingName(name: string): string {
  const first = name.split(/\s+/)[0] ?? '';
  return first.length <= 30 && !/[/:@.<>]|www|http/i.test(first) ? first : '';
}

function confirmationEmail(locale: ConfirmLocale, name: string) {
  const t = CONFIRM[locale];
  const n = greetingName(name);
  const wa = `https://wa.me/${site.whatsapp}`;
  const text = [t.hi(n), '', ...t.body, `WhatsApp: ${wa}`, '', t.bye, site.fullName, site.url].join('\n');
  const html = `
    <p>${escapeHtml(t.hi(n))}</p>
    ${t.body.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
    <p><a href="${wa}">WhatsApp</a> · <a href="${site.url}">${site.url.replace(/^https?:\/\//, '')}</a></p>
    <p>${escapeHtml(t.bye)}<br><strong>${escapeHtml(site.fullName)}</strong></p>`;
  return { subject: t.subject, text, html };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Result>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: a hidden checkbox real visitors never tick; bots often do. Pretend success, send nothing.
  if (body.botcheck === true || body.botcheck === 'on') {
    console.warn('Contact form: hidden spam checkbox was ticked, message ignored.');
    return res.status(200).json({ success: true });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const service = clean(body.service, MAX.service);
  const budget = clean(body.budget, MAX.budget);
  const message = clean(body.message, MAX.message);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, error: 'Please fill in your name, a valid email and a message.' });
  }

  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown').split(',')[0].trim();
  if (tooManyRequests(ip)) {
    return res.status(429).json({ success: false, error: 'Too many messages. Please try again later.' });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error('Contact form: GMAIL_USER or GMAIL_APP_PASSWORD is not set.');
    return res.status(500).json({ success: false, error: 'Email is not configured.' });
  }

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Service', service || '-'],
    ['Budget', budget || '-'],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message}`;
  const html = `
    <h2 style="margin:0 0 12px">New inquiry from your portfolio</h2>
    <table cellpadding="4" style="border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join('')}
    </table>
    <p style="white-space:pre-wrap;margin-top:16px">${escapeHtml(message)}</p>`;

  try {
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
    const info = await transporter.sendMail({
      from: `"Portfolio contact form" <${user}>`,
      to: site.email,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `New inquiry: ${service || 'Project'} — ${name}`,
      text,
      html,
    });
    console.log('Contact form: email sent', { to: site.email, accepted: info.accepted, rejected: info.rejected, messageId: info.messageId });

    // Confirmation to the visitor. A failure here is only logged: your copy already went out.
    const locale: ConfirmLocale = typeof body.locale === 'string' && body.locale in CONFIRM ? (body.locale as ConfirmLocale) : 'en';
    const confirm = confirmationEmail(locale, name);
    try {
      const sent = await transporter.sendMail({
        from: `"${site.fullName}" <${user}>`,
        to: email,
        replyTo: site.email,
        subject: confirm.subject,
        text: confirm.text,
        html: confirm.html,
      });
      console.log('Contact form: confirmation sent to visitor', { accepted: sent.accepted, rejected: sent.rejected });
    } catch (err) {
      console.error('Contact form: confirmation to visitor failed', err);
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form: sending failed', err);
    return res.status(502).json({ success: false, error: 'The message could not be sent.' });
  }
}
