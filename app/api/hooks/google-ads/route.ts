import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { intakeExternalLead } from '../../../../lib/lead-intake';
import { findConnection } from '../../../../lib/crm';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Google Ads lead form webhook.
 *
 * In Google Ads (Asset -> Lead form -> Lead delivery -> Webhook) set:
 *   URL: https://www.techinfigo.com/api/hooks/google-ads
 *   Key: the key shown on the CRM's Integrations page (or GOOGLE_ADS_WEBHOOK_KEY)
 * Google posts each lead as JSON with that key in `google_key`; anything
 * without a right key, or with a paused key, is refused.
 */

type Column = { column_id?: string; column_name?: string; string_value?: string };
type GooglePayload = {
  google_key?: string;
  is_test?: boolean;
  campaign_id?: number | string;
  user_column_data?: Column[];
};

function envKeyMatches(given: unknown): boolean {
  const expected = process.env.GOOGLE_ADS_WEBHOOK_KEY ?? '';
  if (!expected || typeof given !== 'string') return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as GooglePayload | null;
  if (!body || typeof body.google_key !== 'string') {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  let allowed = envKeyMatches(body.google_key);
  if (!allowed) {
    const connection = await findConnection(body.google_key, 'google-ads').catch(() => null);
    allowed = Boolean(connection?.enabled);
  }
  if (!allowed) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cols = body.user_column_data ?? [];
  const get = (...ids: string[]) =>
    cols.find((c) => c.column_id && ids.includes(c.column_id))?.string_value?.trim() || null;

  const first = get('FIRST_NAME');
  const last = get('LAST_NAME');
  const name = get('FULL_NAME') ?? ([first, last].filter(Boolean).join(' ') || 'Google Ads lead');

  const known = new Set(['FULL_NAME', 'FIRST_NAME', 'LAST_NAME', 'PHONE_NUMBER', 'EMAIL', 'WORK_EMAIL', 'COMPANY_NAME', 'CITY']);
  const answers = cols
    .filter((c) => c.string_value && !(c.column_id && known.has(c.column_id)))
    .map((c) => `${c.column_name || c.column_id || 'Answer'}: ${c.string_value}`);

  try {
    await intakeExternalLead({
      source: 'google-ads-lead-form',
      statsKey: 'google-ads',
      name,
      phone: get('PHONE_NUMBER'),
      email: get('EMAIL', 'WORK_EMAIL'),
      businessName: get('COMPANY_NAME'),
      city: get('CITY'),
      answers,
      campaign: body.campaign_id ? `Campaign ${body.campaign_id}` : null,
      adName: null,
      isTest: Boolean(body.is_test),
    });
  } catch (error) {
    console.error('[hooks/google-ads] CRM write failed:', error);
    // A non-200 makes Google retry, so a temporary outage does not lose the lead.
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({});
}
