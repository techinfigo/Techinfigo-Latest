import type { Metadata } from 'next';
import CredForm, { Shell } from '../../../components/CredForm';
import { isCrmConfigured } from '../../../lib/crm';
import { isCredRequestId, loadPublic } from '../../../lib/cred-requests';

/** www.techinfigo.com/c/<id>: a client fills the logins we asked for. Private, never indexed. */

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Login details | Techinfigo',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

function Message({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <Shell>
      <div className="text-center pt-10">
        <p className="text-6xl">{emoji}</p>
        <h1 className="mt-4 text-2xl font-black">{title}</h1>
        <p className="mt-3 font-semibold text-brandDark/70">{text}</p>
      </div>
    </Shell>
  );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isCredRequestId(id) || !isCrmConfigured()) return <Message emoji="🔍" title="Link nahi mila" text="Link check kijiye, ya Techinfigo se naya link maangiye." />;
  let req;
  try {
    req = await loadPublic(id);
  } catch (error) {
    console.error('[cred page]', error);
    return <Message emoji="⏳" title="Thodi der baad try karein" text="Abhi ye page khul nahi paaya." />;
  }
  if (!req) return <Message emoji="🔍" title="Link nahi mila" text="Link check kijiye, ya Techinfigo se naya link maangiye." />;
  if (req.state === 'used') return <Message emoji="✅" title="Ye form bhara ja chuka hai" text="Details Techinfigo team ke paas pahunch gayi hain. Kuch badalna ho toh naya link maangiye." />;
  if (req.state === 'expired') return <Message emoji="⌛" title="Ye link expire ho gaya" text="Security ke liye link 7 din mein band ho jaata hai. Techinfigo se naya link maangiye." />;
  return <CredForm id={id} clientName={req.clientName} items={req.items} inviteEmail={req.inviteEmail} />;
}
