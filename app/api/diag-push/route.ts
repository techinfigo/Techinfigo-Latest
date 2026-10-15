import { NextResponse } from 'next/server';

/** TEMPORARY: reports why the alert routes fail on the live server. Shares no keys or data. */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const clean = (e: unknown) =>
  String((e as Error)?.stack || e)
    .replace(/-----BEGIN[\s\S]*?-----END[^-]*-----/g, '[key]')
    .slice(0, 600);

export async function GET() {
  const out: Record<string, string> = {};
  const step = async (name: string, fn: () => Promise<unknown>) => {
    try {
      const r = await fn();
      out[name] = `ok ${typeof r === 'string' ? r : ''}`.trim();
    } catch (e) {
      out[name] = `FAIL: ${clean(e)}`;
    }
  };
  out.node = process.version;
  out.env = ['CRM_FIREBASE_PROJECT_ID', 'CRM_FIREBASE_CLIENT_EMAIL', 'CRM_FIREBASE_PRIVATE_KEY', 'CRM_ALERT_EMAILS', 'CRON_SECRET']
    .map((k) => `${k}=${process.env[k] ? 'set' : 'missing'}`)
    .join(' ');
  await step('import web-push', async () => (await import('web-push')).default ? 'loaded' : 'no default');
  await step('import lib/crm', async () => ((await import('../../../lib/crm')).isCrmConfigured() ? 'configured' : 'not configured'));
  await step('firestore read', async () => {
    const { crmDb } = await import('../../../lib/crm');
    const snap = await crmDb().collection('pushTokens').limit(5).get();
    return `${snap.size} device(s)`;
  });
  await step('import lib/crm-push', async () => 'loaded' + ((await import('../../../lib/crm-push')) ? '' : ''));
  await step('push keys', async () => {
    const { getVapidKeys } = await import('../../../lib/crm-push');
    const k = await getVapidKeys();
    return `public key length ${k.publicKey.length}`;
  });
  await step('import lib/crm-reminders', async () => 'loaded' + ((await import('../../../lib/crm-reminders')) ? '' : ''));
  return NextResponse.json(out, { headers: { 'Cache-Control': 'no-store' } });
}
