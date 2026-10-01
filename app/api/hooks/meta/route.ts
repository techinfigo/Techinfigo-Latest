import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { intakeExternalLead } from '../../../../lib/lead-intake';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Facebook & Instagram lead ads webhook.
 *
 * Meta app -> Webhooks -> Page -> subscribe to "leadgen" with:
 *   Callback URL: https://www.techinfigo.com/api/hooks/meta
 *   Verify token: the value of META_VERIFY_TOKEN
 * and subscribe the Facebook Page to the app.
 *
 * Meta signs every POST with the app secret (X-Hub-Signature-256); unsigned or
 * wrongly signed requests are refused. The webhook only carries the lead's id,
 * so the details are fetched from the Graph API with META_PAGE_ACCESS_TOKEN.
 */

const GRAPH = 'https://graph.facebook.com/v21.0';

/** Meta checks the URL once when you add the webhook. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = process.env.META_VERIFY_TOKEN ?? '';
  if (
    token &&
    url.searchParams.get('hub.mode') === 'subscribe' &&
    url.searchParams.get('hub.verify_token') === token
  ) {
    return new NextResponse(url.searchParams.get('hub.challenge') ?? '', { status: 200 });
  }
  return new NextResponse('forbidden', { status: 403 });
}

function signatureValid(raw: string, header: string | null): boolean {
  const secret = process.env.META_APP_SECRET ?? '';
  if (!secret || !header?.startsWith('sha256=')) return false;
  const expected = Buffer.from(`sha256=${createHmac('sha256', secret).update(raw).digest('hex')}`);
  const given = Buffer.from(header);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

type LeadField = { name: string; values?: string[] };
type GraphLead = {
  field_data?: LeadField[];
  ad_name?: string;
  campaign_name?: string;
  is_organic?: boolean;
};

async function fetchLead(leadId: string): Promise<GraphLead | null> {
  const token = process.env.META_PAGE_ACCESS_TOKEN ?? '';
  if (!token) return null;
  const params = new URLSearchParams({
    access_token: token,
    fields: 'field_data,ad_name,campaign_name,is_organic',
  });
  const response = await fetch(`${GRAPH}/${encodeURIComponent(leadId)}?${params}`, {
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    console.error('[hooks/meta] lead fetch failed:', response.status, await response.text().catch(() => ''));
    return null;
  }
  return (await response.json()) as GraphLead;
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (!signatureValid(raw, request.headers.get('x-hub-signature-256'))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body: { entry?: { changes?: { field?: string; value?: { leadgen_id?: string } }[] }[] };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const leadIds = (body.entry ?? [])
    .flatMap((e) => e.changes ?? [])
    .filter((c) => c.field === 'leadgen' && c.value?.leadgen_id)
    .map((c) => c.value!.leadgen_id!);

  let failed = false;
  for (const leadId of leadIds) {
    try {
      const lead = await fetchLead(leadId);
      if (!lead) {
        failed = true;
        continue;
      }
      const fields = lead.field_data ?? [];
      const get = (...names: string[]) =>
        fields.find((f) => names.includes(f.name))?.values?.[0]?.trim() || null;

      const known = new Set(['full_name', 'first_name', 'last_name', 'phone_number', 'email', 'company_name', 'city']);
      const answers = fields
        .filter((f) => !known.has(f.name) && f.values?.length)
        .map((f) => `${f.name.replace(/_/g, ' ')}: ${f.values!.join(', ')}`);

      const name =
        get('full_name') ?? ([get('first_name'), get('last_name')].filter(Boolean).join(' ') || 'Meta lead');

      await intakeExternalLead({
        source: 'meta-lead-ads',
        name,
        phone: get('phone_number'),
        email: get('email'),
        businessName: get('company_name'),
        city: get('city'),
        answers,
        campaign: lead.campaign_name ?? null,
        adName: lead.ad_name ?? null,
        // Leads from Meta's testing tool arrive with no ad attached.
        isTest: !lead.ad_name && !lead.campaign_name && lead.is_organic !== true,
      });
    } catch (error) {
      failed = true;
      console.error('[hooks/meta] intake failed:', error);
    }
  }

  // Non-200 makes Meta retry later, so a temporary failure does not lose leads.
  return failed ? NextResponse.json({ ok: false }, { status: 500 }) : NextResponse.json({ ok: true });
}
