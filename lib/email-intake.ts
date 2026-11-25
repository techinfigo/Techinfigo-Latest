import type { Pair } from './webhook-payload';

/**
 * Email-to-lead: turns a lead-notification email (IndiaMART, JustDial,
 * 99acres, MagicBricks, or any portal that emails leads) into the same
 * key/value pairs the universal webhook understands.
 *
 * The lead email is forwarded to  leads+<token>@techinfigo.com , an inbound
 * mail service (SendGrid Inbound Parse / Cloudflare Email Worker / Mailgun)
 * posts it to /api/hooks/email, and we pull out name / phone / email / message.
 * NODE RUNTIME ONLY.
 */

export type InboundEmail = { to: string; from: string; subject: string; text: string };

/** Reads the email from whatever the inbound-mail service sends (form or JSON). */
export async function readInboundEmail(request: Request): Promise<InboundEmail> {
  const type = request.headers.get('content-type') ?? '';
  const raw = await request.text();
  const bag: Record<string, string> = {};

  const put = (k: string, v: unknown) => {
    const key = k.toLowerCase();
    const val = typeof v === 'string' ? v : v == null ? '' : String(v);
    if (val && !bag[key]) bag[key] = val;
  };

  if (type.includes('application/json')) {
    try {
      const j = JSON.parse(raw) as Record<string, unknown>;
      for (const [k, v] of Object.entries(j)) put(k, v);
      // Cloudflare / custom shapes: { envelope: { to, from }, ... }
      const env = j.envelope as Record<string, unknown> | undefined;
      if (env) {
        put('to', Array.isArray(env.to) ? env.to[0] : env.to);
        put('from', env.from);
      }
    } catch {
      /* fall through */
    }
  } else if (type.includes('multipart/form-data') || type.includes('application/x-www-form-urlencoded')) {
    const form = await new Response(raw, { headers: { 'content-type': type } }).formData().catch(() => null);
    form?.forEach((v, k) => typeof v === 'string' && put(k, v));
  }

  // Service field names differ: SendGrid (to/from/subject/text/html), Mailgun
  // (recipient/sender/body-plain), plus our own JSON.
  const to = bag['to'] || bag['recipient'] || bag['envelope_to'] || '';
  const from = bag['from'] || bag['sender'] || '';
  const subject = bag['subject'] || '';
  const text = bag['text'] || bag['body-plain'] || bag['plain'] || bag['body'] || stripHtml(bag['html'] || bag['body-html'] || '');
  return { to, from, subject, text };
}

/** Pull the client token out of  leads+<token>@techinfigo.com  (or the bare local part). */
export function tokenFromAddress(to: string): string | null {
  const addr = (to.match(/[<\s]?([^<>\s,;]+@[^<>\s,;]+)/)?.[1] || to).toLowerCase();
  const local = addr.split('@')[0] || '';
  const plus = local.split('+')[1];
  const t = (plus || local).replace(/[^a-z0-9]/g, '');
  return t && t !== 'leads' && t.length >= 6 ? t : null;
}

/** Name the platform from the sender address or subject, for the lead's source label. */
export function detectPlatform(from: string, subject: string): string {
  const hay = `${from} ${subject}`.toLowerCase();
  if (hay.includes('indiamart')) return 'IndiaMART';
  if (hay.includes('justdial') || hay.includes('jdmart') || hay.includes('just dial')) return 'JustDial';
  if (hay.includes('99acres')) return '99acres';
  if (hay.includes('magicbricks')) return 'MagicBricks';
  if (hay.includes('housing.com') || hay.includes('housing ')) return 'Housing.com';
  if (hay.includes('sulekha')) return 'Sulekha';
  if (hay.includes('tradeindia')) return 'TradeIndia';
  return 'Email lead';
}

/** Lines like "Name: Rahul" / "Mobile No. - 98xxxx" become key/value pairs. */
export function emailToPairs(text: string): Pair[] {
  const pairs: Pair[] = [];
  const clean = text.replace(/\r/g, '').replace(/ /g, ' ');
  for (const line of clean.split('\n')) {
    const m = line.match(/^\s*([A-Za-z][A-Za-z0-9 ._/&'-]{0,40}?)\s*[:\-–]\s*(.+?)\s*$/);
    if (m) {
      const key = m[1].trim();
      const value = m[2].trim();
      if (value && value.length <= 300) pairs.push({ key, value });
    }
    if (pairs.length > 60) break;
  }

  // Fallbacks when the mail is not neatly labelled: grab an Indian mobile and
  // an email from anywhere in the body.
  const flat = clean.replace(/\n/g, ' ');
  if (!pairs.some((p) => /mobile|phone|contact|whatsapp|number|^tel/i.test(p.key))) {
    const ph = flat.match(/(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}/);
    if (ph) pairs.push({ key: 'phone', value: ph[0].trim() });
  }
  if (!pairs.some((p) => /email|mail/i.test(p.key))) {
    const em = flat.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
    if (em && !/techinfigo\.com$/i.test(em[0])) pairs.push({ key: 'email', value: em[0] });
  }
  return pairs;
}

function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|tr|li|h[1-6])>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/[ \t]+/g, ' ')
    .trim();
}
