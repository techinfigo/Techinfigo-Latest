import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import PortalApp from '../../components/portal/PortalApp';
import PortalLogin from '../../components/portal/PortalLogin';
import { isCrmConfigured } from '../../lib/crm';
import { PORTAL_COOKIE, readPortal } from '../../lib/portal';

/** www.techinfigo.com/portal: each client's own dashboard. Private, never indexed. */

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Techinfigo Client Portal',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
  manifest: '/portal.webmanifest',
  appleWebApp: { capable: true, title: 'Techinfigo', statusBarStyle: 'black-translucent' },
  icons: { apple: '/proposal-logo.png' },
};

export const viewport = { themeColor: '#001d21' };

export default async function Page() {
  const token = (await cookies()).get(PORTAL_COOKIE)?.value;
  const session = isCrmConfigured() ? await readPortal(token) : null;
  if (!session) return <PortalLogin />;
  return <PortalApp data={session.snapshot} syncedAt={session.syncedAt} webhookToken={session.webhookToken} businessType={session.businessType} stages={session.stages} />;
}
