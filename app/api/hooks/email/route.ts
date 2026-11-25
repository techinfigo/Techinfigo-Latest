import { NextResponse } from 'next/server';
import { findConnection } from '../../../../lib/crm';
import { intakeExternalLead } from '../../../../lib/lead-intake';
import { pick } from '../../../../lib/webhook-payload';
import { detectPlatform, emailToPairs, readInboundEmail, tokenFromAddress } from '../../../../lib/email-intake';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Email-to-lead: https://www.techinfigo.com/api/hooks/email
 *
 * A client's lead-notification emails (IndiaMART, JustDial, 99acres,
 * MagicBricks, Housing, Sulekha, TradeIndia, ...) are forwarded to
 *   leads+<token>@techinfigo.com
 * An inbound-mail service posts the email here; we find the client by the
 * token, pull out name / phone / email / message, and store it as a lead so it
 * shows up in that client's portal with the right source label.
 */

function reply(body: unknown, status = 200) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const mail = await readInboundEmail(request).catch((error) => {
    console.error('[hooks/email] read failed:', error);
    return null;
  });
  if (!mail) return reply({ ok: false, error: 'bad email' }, 400);

  // Which client? The forwarding address carries their token; a ?token= wins.
  const token = new URL(request.url).searchParams.get('token')?.trim() || tokenFromAddress(mail.to);
  if (!token) return reply({ ok: false, error: 'no client token in address' }, 400);

  const connection = await findConnection(token, 'webhook').catch((error) => {
    console.error('[hooks/email] lookup failed:', error);
    return undefined;
  });
  if (connection === undefined) return reply({ ok: false, error: 'temporarily unavailable' }, 500);
  if (!connection) return reply({ ok: false, error: 'unknown connection' }, 404);
  if (!connection.enabled) return reply({ ok: false, error: 'connection paused' }, 403);

  const platform = detectPlatform(mail.from, mail.subject);
  const pairs = emailToPairs(mail.text);
  const { found, name, answers } = pick(pairs);

  if (!found.phone && !found.email && !found.name && !found.firstName) {
    return reply({ ok: true, connection: connection.name, stored: false, note: 'No name, phone or email found in the email.' });
  }

  try {
    await intakeExternalLead({
      source: 'webhook',
      sourceName: platform,
      statsKey: connection.id,
      clientId: connection.clientId ?? null,
      name,
      phone: found.phone ?? null,
      email: found.email ?? null,
      businessName: found.company ?? null,
      city: found.city ?? null,
      website: found.website ?? null,
      note: found.message ?? (mail.subject || null),
      answers,
      campaign: null,
      adName: null,
      isTest: false,
    });
  } catch (error) {
    console.error('[hooks/email] CRM write failed:', error);
    return reply({ ok: false }, 500);
  }
  return reply({ ok: true, connection: connection.name, source: platform, stored: true });
}
