import { NextResponse } from 'next/server';
import { findConnection } from '../../../../../lib/crm';
import { intakeExternalLead } from '../../../../../lib/lead-intake';
import { pick, readPayload } from '../../../../../lib/webhook-payload';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Universal lead webhook: https://www.techinfigo.com/api/hooks/in/<token>
 *
 * Each connection made on the CRM's "Integrations & Webhooks" page gets its
 * own secret token. Any tool (Zapier, Make, Pabbly, IndiaMART, WordPress /
 * Elementor, Shopify flows, ...) can send a lead here as JSON, a normal form
 * post, or URL parameters. Common field names are recognised automatically
 * (name / phone / mobile / email / company / city / message, IndiaMART's
 * SENDER_* fields, nested objects, [{name, value}] lists); everything else is
 * kept as "Question: answer" lines so nothing is lost.
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function reply(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: CORS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

/* --------------------------------- routes -------------------------------- */

async function handle(request: Request, token: string) {
  const connection = await findConnection(token, 'webhook').catch((error) => {
    console.error('[hooks/in] lookup failed:', error);
    return undefined;
  });
  if (connection === undefined) return reply({ ok: false, error: 'temporarily unavailable' }, 500);
  if (!connection) return reply({ ok: false, error: 'unknown connection' }, 404);
  if (!connection.enabled) return reply({ ok: false, error: 'connection paused' }, 403);

  const pairs = await readPayload(request);
  const { found, name, answers, isTest } = pick(pairs);

  // A plain visit to the link (some tools check it before saving) stores nothing.
  if (!found.phone && !found.email && !found.name && !found.firstName) {
    return reply({ ok: true, connection: connection.name, stored: false, note: 'No name, phone or email received.' });
  }

  try {
    await intakeExternalLead({
      source: 'webhook',
      sourceName: connection.name,
      statsKey: connection.id,
      name,
      phone: found.phone ?? null,
      email: found.email ?? null,
      businessName: found.company ?? null,
      city: found.city ?? null,
      website: found.website ?? null,
      note: found.message ?? null,
      answers,
      campaign: null,
      adName: null,
      isTest,
    });
  } catch (error) {
    console.error('[hooks/in] CRM write failed:', error);
    return reply({ ok: false }, 500);
  }
  return reply({ ok: true, connection: connection.name, stored: true });
}

type Ctx = { params: Promise<{ token: string }> };

export async function POST(request: Request, ctx: Ctx) {
  return handle(request, (await ctx.params).token);
}

export async function GET(request: Request, ctx: Ctx) {
  return handle(request, (await ctx.params).token);
}
