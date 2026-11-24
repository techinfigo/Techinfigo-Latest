'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { whatsappUrl } from '../../config/site';
import type { PortalPlan, PortalLead, PortalSnapshot } from '../../lib/portal-types';

/**
 * The client's dashboard: this month at a glance, the content calendar with
 * Approve / Request change, payments (UPI) and documents. Data is the
 * snapshot the CRM keeps up to date; nothing internal is ever in it.
 */

type Tab = 'home' | 'leads' | 'calendar' | 'payments' | 'docs';

const EMOJI: Record<string, string> = { Post: '🖼️', Reel: '🎬', Story: '📱', Ad: '📢', Shoot: '📸', Meeting: '🤝', Other: '📌' };
const CONTENT = ['Post', 'Reel', 'Story', 'Ad'];
const isContent = (k: string) => CONTENT.includes(k);
const pad = (n: number) => String(n).padStart(2, '0');
const keyOf = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
const niceDay = (k: string) => new Date(`${k}T00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
const time12 = (t?: string) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`;
};
export const needsApproval = (p: PortalPlan) => isContent(p.kind) && (p.status === 'Making' || p.status === 'Idea') && !p.changeRequested && !!p.previewUrl;

function badge(p: PortalPlan): { text: string; cls: string } {
  if (p.changeRequested && p.status !== 'Done' && p.status !== 'Approved') return { text: '✏️ Change requested', cls: 'bg-amber-100 text-amber-900' };
  if (p.status === 'Done') return { text: isContent(p.kind) ? '✅ Posted' : '✅ Done', cls: 'bg-emerald-100 text-emerald-900' };
  if (p.status === 'Approved') return { text: '👍 Approved', cls: 'bg-sky-100 text-sky-900' };
  if (needsApproval(p)) return { text: '⏳ Waiting for your approval', cls: 'bg-brandYellow/30 text-brandDark' };
  if (p.status === 'Making') return { text: '🎨 Being made', cls: 'bg-violet-100 text-violet-900' };
  return { text: '🗓️ Planned', cls: 'bg-brandDark/5 text-brandDark/70' };
}

export default function PortalApp({ data, syncedAt }: { data: PortalSnapshot; syncedAt: number }) {
  const [tab, setTab] = useState<Tab>('home');
  const [plans, setPlans] = useState<PortalPlan[]>(data.plans);
  const [menu, setMenu] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);
  const todayKey = keyOf(new Date());
  const monthKey = todayKey.slice(0, 7);

  const month = plans.filter((p) => p.date.startsWith(monthKey));
  const content = month.filter((p) => isContent(p.kind));
  const posted = content.filter((p) => p.status === 'Done').length;
  const waiting = plans.filter(needsApproval);
  const upcoming = plans.filter((p) => !isContent(p.kind) && p.date >= todayKey && p.status !== 'Done').sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || ''))).slice(0, 3);
  const dueInvoices = data.invoices.filter((i) => i.due > 0.5).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const totalDue = dueInvoices.reduce((a, i) => a + i.due, 0);
  const [leads, setLeads] = useState<PortalLead[]>(data.leads || []);
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const leadStats = {
    total: leads.length,
    newC: newLeads,
    contacted: leads.filter((l) => l.status === 'Contacted').length,
    converted: leads.filter((l) => l.status === 'Converted').length,
    thisMonth: leads.filter((l) => (l.at || '').startsWith(monthKey)).length,
  };
  const convRate = leadStats.total ? Math.round((leadStats.converted / leadStats.total) * 100) : 0;

  const onLeadAct = async (id: string, patch: { status?: PortalLead['status']; note?: string }) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    await fetch('/api/portal/act', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: id, status: patch.status || '', note: patch.note || '' }),
    }).catch(() => 0);
  };

  const onAddLead = async (name: string, phone: string, note: string) => {
    const tempId = `plead-${Date.now()}`;
    setLeads((ls) => [{ id: tempId, name: name || 'Lead', phone, source: 'Added by you', status: 'New', note, at: new Date().toISOString() }, ...ls]);
    await fetch('/api/portal/act', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newLead: { name, phone, note } }),
    }).catch(() => 0);
  };

  const logout = async () => {
    await fetch('/api/portal/logout', { method: 'POST' }).catch(() => 0);
    window.location.reload();
  };

  const [alertsOn, setAlertsOn] = useState(false);
  const [alertsBusy, setAlertsBusy] = useState(false);
  useEffect(() => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration('/portal-sw.js').then((r) => r?.pushManager.getSubscription()).then((sub) => setAlertsOn(!!sub)).catch(() => 0);
    }
  }, []);
  const enableAlerts = async () => {
    const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const installed = typeof window !== 'undefined' && (window.matchMedia('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone === true);
    if (isIOS && !installed) {
      alert('iPhone par alerts ke liye: niche Share button (⬆️) dabayein → "Add to Home Screen" → phir is app ko khol kar alerts on karein.');
      return;
    }
    if (typeof Notification === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      alert('Is browser mein alerts support nahi hai. Chrome ya Safari (iPhone par Home Screen par add karke) try karein.');
      return;
    }
    setAlertsBusy(true);
    try {
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') { setAlertsBusy(false); return; }
      const reg = await navigator.serviceWorker.register('/portal-sw.js');
      await navigator.serviceWorker.ready;
      const keyRes = await fetch('/api/portal/push').then((r) => r.json());
      if (!keyRes.ok) throw new Error('no key');
      const b64 = keyRes.publicKey.replace(/-/g, '+').replace(/_/g, '/');
      const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
      const raw = atob(padded);
      const appKey = new Uint8Array([...raw].map((c) => c.charCodeAt(0)));
      const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: appKey });
      const r = await fetch('/api/portal/push', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sub }) }).then((x) => x.json());
      setAlertsOn(!!r.ok);
    } catch (e) {
      console.error(e);
      alert('Alerts on nahi ho paye. Dobara try karein.');
    } finally {
      setAlertsBusy(false);
    }
  };

  const onAct = (id: string, patch: Partial<PortalPlan>) => setPlans((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const tabs: { t: Tab; icon: string; label: string; count?: number }[] = [
    { t: 'home', icon: '🏠', label: 'Home' },
    { t: 'leads', icon: '🎯', label: 'Leads', count: newLeads },
    { t: 'calendar', icon: '📅', label: 'Calendar', count: waiting.length },
    { t: 'payments', icon: '🧾', label: 'Payments', count: dueInvoices.length },
    { t: 'docs', icon: '📄', label: 'Documents' },
  ];

  return (
    <div className="min-h-[100svh] bg-brandBg text-brandDark pb-24 sm:pb-10">
      <header className="sticky top-0 z-20 bg-brandDark text-brandBg shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/proposal-logo.png" alt="" width={34} height={34} className="w-8 h-8 rounded-xl bg-brandSurface ring-1 ring-brandBg/10 p-1.5" />
          <div className="min-w-0">
            <p className="font-black text-sm leading-tight truncate">{data.business || 'Your dashboard'}</p>
            <p className="text-[11px] font-semibold text-brandBg/45 leading-tight">by Techinfigo</p>
          </div>
          <nav className="hidden sm:flex ml-6 gap-1">
            {tabs.map((x) => (
              <button key={x.t} type="button" onClick={() => setTab(x.t)} className={`relative px-3.5 py-2 rounded-xl text-sm font-bold transition ${tab === x.t ? 'bg-brandYellow text-brandDark' : 'text-brandBg/70 hover:bg-brandBg/10'}`}>
                {x.label}
                {x.count ? <span className={`ml-1.5 inline-grid place-items-center min-w-5 h-5 px-1 rounded-full text-[11px] ${tab === x.t ? 'bg-brandDark text-brandYellow' : 'bg-brandYellow text-brandDark'}`}>{x.count}</span> : null}
              </button>
            ))}
          </nav>
          <div className="ml-auto relative">
            <button type="button" onClick={() => setMenu((m) => !m)} className="w-9 h-9 rounded-full bg-brandYellow text-brandDark font-black ring-1 ring-brandBg/10" aria-label="Account menu">
              {(data.person || data.business || 'C').charAt(0).toUpperCase()}
            </button>
            {menu && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-brandDark/10 shadow-3xl p-2 text-sm font-semibold">
                {!alertsOn && (
                  <button type="button" disabled={alertsBusy} onClick={() => { enableAlerts(); setMenu(false); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-brandDark/5">🔔 Turn on lead alerts</button>
                )}
                {alertsOn && <p className="px-3 py-2 text-xs text-emerald-600 font-bold">🔔 Lead alerts on</p>}
                <button type="button" onClick={() => { setPwOpen(true); setMenu(false); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-brandDark/5">🔑 Change password</button>
                <a href={whatsappUrl(`Namaste, ${data.business} ke baare mein baat karni hai.`)} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-xl hover:bg-brandDark/5">💬 WhatsApp Techinfigo</a>
                <button type="button" onClick={logout} className="w-full text-left px-3 py-2 rounded-xl hover:bg-brandDark/5 text-red-600">↩️ Log out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-5 sm:pt-6">
        {tab === 'home' && (
          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-[28px] bg-brandDark text-brandBg p-6 sm:p-8 shadow-xl">
              <div aria-hidden className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-brandYellow/15 blur-[90px]" />
              <p className="text-xs font-bold uppercase tracking-widest text-brandYellow">{new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight">Namaste{data.person ? ` ${data.person.split(' ')[0]}` : ''} 👋</h1>
              <p className="mt-1.5 font-medium text-brandBg/60">Here&apos;s everything happening with your growth, at a glance.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Stat n={content.length} label="Planned this month" />
              <Stat n={posted} label="Posted" good />
              <Stat n={waiting.length} label="Need your OK" warn={waiting.length > 0} />
            </div>
            {leadStats.total > 0 && (
              <button type="button" onClick={() => setTab('leads')} className="text-left rounded-3xl bg-brandDark text-brandBg p-5">
                <div className="flex items-center justify-between">
                  <p className="font-black text-lg">🎯 Your leads</p>
                  <span className="text-sm font-bold text-brandYellow">See all 👉</span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                  <div><p className="text-2xl font-black">{leadStats.total}</p><p className="text-[10px] font-bold text-brandBg/60 uppercase">Total</p></div>
                  <div><p className="text-2xl font-black text-brandYellow">{leadStats.newC}</p><p className="text-[10px] font-bold text-brandBg/60 uppercase">New</p></div>
                  <div><p className="text-2xl font-black">{leadStats.contacted}</p><p className="text-[10px] font-bold text-brandBg/60 uppercase">Contacted</p></div>
                  <div><p className="text-2xl font-black text-emerald-400">{leadStats.converted}</p><p className="text-[10px] font-bold text-brandBg/60 uppercase">Converted</p></div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-bold">Conversion rate</span>
                  <span className="font-black text-emerald-400">{convRate}%</span>
                </div>
                <div className="mt-1.5 h-2.5 rounded-full bg-brandBg/15 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: `${convRate}%` }} />
                </div>
                {leadStats.newC > 0 && <p className="mt-3 text-sm font-semibold text-brandYellow">⏳ {leadStats.newC} {leadStats.newC === 1 ? 'lead' : 'leads'} waiting — call now!</p>}
              </button>
            )}
            {!alertsOn && leadStats.total > 0 && (
              <button type="button" disabled={alertsBusy} onClick={enableAlerts} className="text-left rounded-3xl bg-brandYellow/20 border-2 border-brandYellow p-5">
                <p className="font-black">🔔 Naye lead ka turant alert paayein</p>
                <p className="mt-1 text-sm font-semibold text-brandDark/70">Jaise hi naya lead aaye, aapke phone par notification aa jayega — turant call kar sakein.</p>
                <p className="mt-3 inline-block rounded-xl bg-brandDark text-white text-sm font-bold px-4 py-2">{alertsBusy ? 'On kar rahe hain…' : 'Turn on alerts'}</p>
              </button>
            )}
            {content.length > 0 && (
              <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-5">
                <div className="flex justify-between text-sm font-bold">
                  <span>Content progress</span>
                  <span>{Math.round((posted / content.length) * 100)}%</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-brandDark/10 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(posted / content.length) * 100}%` }} />
                </div>
              </div>
            )}
            {waiting.length > 0 && (
              <button type="button" onClick={() => setTab('calendar')} className="text-left rounded-3xl bg-brandYellow/25 border-2 border-brandYellow p-5">
                <p className="text-lg font-black">⏳ {waiting.length} {waiting.length === 1 ? 'design needs' : 'designs need'} your approval</p>
                <p className="mt-1 font-semibold text-brandDark/70">{waiting.slice(0, 3).map((p) => p.title).join(' · ')}</p>
                <p className="mt-3 inline-block rounded-xl bg-brandDark text-white text-sm font-bold px-4 py-2">Review now 👉</p>
              </button>
            )}
            {newLeads > 0 && (
              <button type="button" onClick={() => setTab('leads')} className="text-left rounded-3xl bg-emerald-50 border-2 border-emerald-400 p-5">
                <p className="text-lg font-black">🎯 {newLeads} new {newLeads === 1 ? 'lead' : 'leads'} to call</p>
                <p className="mt-1 font-semibold text-brandDark/70">Naye leads aaye hain — jaldi call karein, warna chale jayenge.</p>
                <p className="mt-3 inline-block rounded-xl bg-emerald-600 text-white text-sm font-bold px-4 py-2">See leads 👉</p>
              </button>
            )}
            {dueInvoices.length > 0 && (
              <button type="button" onClick={() => setTab('payments')} className="text-left rounded-3xl bg-white border-2 border-brandDark/10 p-5">
                <p className="text-sm font-bold text-brandDark/60">Payment due</p>
                <p className="text-2xl font-black">{inr(totalDue)}</p>
                <p className="text-sm font-semibold text-brandDark/60">Next due {niceDay(dueInvoices[0].dueDate)}</p>
              </button>
            )}
            {upcoming.length > 0 && (
              <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-5">
                <p className="font-black">Coming up</p>
                <ul className="mt-2 grid gap-2">
                  {upcoming.map((p) => (
                    <li key={p.id} className="flex items-center gap-3">
                      <span className="text-2xl">{EMOJI[p.kind] || '📌'}</span>
                      <div>
                        <p className="font-bold">{p.title}</p>
                        <p className="text-sm text-brandDark/60">
                          {niceDay(p.date)}
                          {p.time ? ` · ${time12(p.time)}` : ''}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.services.length > 0 && (
              <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-5">
                <p className="font-black">Your plan with us</p>
                <ul className="mt-2 grid gap-1.5">
                  {data.services.map((s, i) => (
                    <li key={i} className="flex justify-between gap-3 text-sm">
                      <span className="font-semibold">{s.name}</span>
                      <span className="font-bold whitespace-nowrap">
                        {inr(s.cost)}
                        <span className="text-brandDark/50 font-semibold">{/month/i.test(s.billingType) ? '/mo' : ' one-time'}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tab === 'leads' && <LeadsTab leads={leads} onAct={onLeadAct} onAddLead={onAddLead} />}
        {tab === 'calendar' && <CalendarTab plans={plans} todayKey={todayKey} onAct={onAct} />}
        {tab === 'payments' && <PaymentsTab data={data} />}
        {tab === 'docs' && <DocsTab data={data} />}

        <p className="mt-8 text-center text-xs text-brandDark/40">
          Updated {syncedAt ? new Date(syncedAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) : 'soon'} · Questions?{' '}
          <a className="underline font-bold" href={whatsappUrl(`Namaste, ${data.business} ke baare mein baat karni hai.`)} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </p>
      </main>

      {/* Phone tab bar */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-brandDark/10 grid grid-cols-5">
        {tabs.map((x) => (
          <button key={x.t} type="button" onClick={() => setTab(x.t)} className={`relative py-2.5 text-[11px] font-bold flex flex-col items-center gap-0.5 ${tab === x.t ? 'text-brandDark' : 'text-brandDark/45'}`}>
            <span className="text-xl leading-none">{x.icon}</span>
            {x.label}
            {x.count ? <span className="absolute top-1.5 right-[22%] min-w-5 h-5 px-1 grid place-items-center rounded-full bg-brandYellow text-brandDark text-[11px]">{x.count}</span> : null}
            {tab === x.t && <span className="absolute top-0 inset-x-6 h-1 rounded-b bg-brandYellow" />}
          </button>
        ))}
      </nav>

      {pwOpen && <PasswordDialog onClose={() => setPwOpen(false)} />}
    </div>
  );
}

function Stat({ n, label, good, warn }: { n: number; label: string; good?: boolean; warn?: boolean }) {
  return (
    <div className={`rounded-2xl p-3 text-center border-2 ${warn ? 'bg-brandYellow/25 border-brandYellow' : 'bg-white border-brandDark/10'}`}>
      <p className={`text-3xl font-black ${good ? 'text-emerald-600' : ''}`}>{n}</p>
      <p className="text-[11px] font-bold text-brandDark/60 leading-tight">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------ leads */

function leadBadge(status: PortalLead['status']): { text: string; cls: string } {
  if (status === 'Converted') return { text: '✅ Converted', cls: 'bg-emerald-100 text-emerald-900' };
  if (status === 'Contacted') return { text: '📞 Contacted', cls: 'bg-sky-100 text-sky-900' };
  if (status === 'Lost') return { text: '✖️ Lost', cls: 'bg-brandDark/10 text-brandDark/60' };
  return { text: '🆕 New', cls: 'bg-brandYellow/40 text-brandDark' };
}

function LeadsTab({ leads, onAct, onAddLead }: { leads: PortalLead[]; onAct: (id: string, patch: { status?: PortalLead['status']; note?: string }) => void; onAddLead: (name: string, phone: string, note: string) => void }) {
  const [adding, setAdding] = useState(false);
  const [nm, setNm] = useState('');
  const [ph, setPh] = useState('');
  const [nt, setNt] = useState('');
  const submitAdd = () => {
    if (!nm.trim() && !ph.trim()) return;
    onAddLead(nm.trim(), ph.trim(), nt.trim());
    setNm(''); setPh(''); setNt(''); setAdding(false);
  };
  const [filter, setFilter] = useState<'all' | PortalLead['status']>('all');
  const [noteFor, setNoteFor] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const order: Record<PortalLead['status'], number> = { New: 0, Contacted: 1, Converted: 2, Lost: 3 };
  const sorted = [...leads].sort((a, b) => (order[a.status] - order[b.status]) || (b.at || '').localeCompare(a.at || ''));
  const shown = filter === 'all' ? sorted : sorted.filter((l) => l.status === filter);
  const newCount = leads.filter((l) => l.status === 'New').length;
  const wonCount = leads.filter((l) => l.status === 'Converted').length;
  const daysAgo = (at?: string) => (at ? Math.floor((Date.now() - new Date(at).getTime()) / 86400000) : 0);
  const filters: { k: 'all' | PortalLead['status']; label: string; n: number }[] = [
    { k: 'all', label: 'All', n: leads.length },
    { k: 'New', label: 'New', n: newCount },
    { k: 'Contacted', label: 'Contacted', n: leads.filter((l) => l.status === 'Contacted').length },
    { k: 'Converted', label: 'Converted', n: wonCount },
  ];

  if (leads.length === 0) {
    return (
      <div className="grid gap-4">
        {!adding ? (
          <>
            <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-8 text-center">
              <p className="text-5xl">🎯</p>
              <p className="mt-3 text-lg font-black">No leads yet</p>
              <p className="mt-1 font-semibold text-brandDark/60">Jaise hi aapke ads ya website se koi enquiry aayegi, woh yahan dikhegi. Ya khud se add karein:</p>
            </div>
            <button type="button" onClick={() => setAdding(true)} className="w-full rounded-2xl border-2 border-dashed border-brandDark/20 text-brandDark/70 font-bold py-3 hover:bg-brandDark/5">+ Add a lead (walk-in / phone call)</button>
          </>
        ) : (
          <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-4 grid gap-2">
            <input value={nm} onChange={(e) => setNm(e.target.value)} placeholder="Name" className="rounded-xl border-2 border-brandDark/10 px-3 py-2 text-sm font-semibold" />
            <input value={ph} onChange={(e) => setPh(e.target.value)} placeholder="Phone number" inputMode="tel" className="rounded-xl border-2 border-brandDark/10 px-3 py-2 text-sm font-semibold" />
            <input value={nt} onChange={(e) => setNt(e.target.value)} placeholder="Note (optional)" className="rounded-xl border-2 border-brandDark/10 px-3 py-2 text-sm" />
            <div className="flex gap-2">
              <button type="button" onClick={submitAdd} className="rounded-xl bg-brandDark text-white text-sm font-bold px-4 py-2">Add lead</button>
              <button type="button" onClick={() => setAdding(false)} className="rounded-xl bg-brandDark/5 text-brandDark/60 text-sm font-bold px-4 py-2">Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const addBox = (
    <div>
      {!adding ? (
        <button type="button" onClick={() => setAdding(true)} className="w-full rounded-2xl border-2 border-dashed border-brandDark/20 text-brandDark/70 font-bold py-3 hover:bg-brandDark/5">+ Add a lead (walk-in / phone call)</button>
      ) : (
        <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-4 grid gap-2">
          <input value={nm} onChange={(e) => setNm(e.target.value)} placeholder="Name" className="rounded-xl border-2 border-brandDark/10 px-3 py-2 text-sm font-semibold" />
          <input value={ph} onChange={(e) => setPh(e.target.value)} placeholder="Phone number" inputMode="tel" className="rounded-xl border-2 border-brandDark/10 px-3 py-2 text-sm font-semibold" />
          <input value={nt} onChange={(e) => setNt(e.target.value)} placeholder="Note (optional)" className="rounded-xl border-2 border-brandDark/10 px-3 py-2 text-sm" />
          <div className="flex gap-2">
            <button type="button" onClick={submitAdd} className="rounded-xl bg-brandDark text-white text-sm font-bold px-4 py-2">Add lead</button>
            <button type="button" onClick={() => setAdding(false)} className="rounded-xl bg-brandDark/5 text-brandDark/60 text-sm font-bold px-4 py-2">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="grid gap-4">
      {addBox}
      <div className="grid grid-cols-3 gap-3">
        <Stat n={leads.length} label="Total leads" />
        <Stat n={newCount} label="New to call" warn={newCount > 0} />
        <Stat n={wonCount} label="Converted" good />
      </div>
      <div className="rounded-2xl bg-white border-2 border-brandDark/10 p-4 flex items-center justify-between">
        <span className="font-bold text-brandDark/70">Conversion rate</span>
        <span className="text-xl font-black text-emerald-600">{leads.length ? Math.round((wonCount / leads.length) * 100) : 0}%</span>
      </div>
      {(() => {
        const bySource: Record<string, number> = {};
        leads.forEach((l) => { const k = l.source || 'Other'; bySource[k] = (bySource[k] || 0) + 1; });
        const rows = Object.entries(bySource).sort((a, b) => b[1] - a[1]).slice(0, 6);
        if (rows.length < 2) return null;
        const max = rows[0][1] || 1;
        return (
          <div className="rounded-2xl bg-white border-2 border-brandDark/10 p-4">
            <p className="font-black text-brandDark/70 mb-2">Where your leads come from</p>
            <ul className="grid gap-2">
              {rows.map(([src, n]) => (
                <li key={src} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brandDark/60 w-28 truncate">{src}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-brandDark/5 overflow-hidden">
                    <div className="h-full rounded-full bg-brandYellow" style={{ width: `${Math.round((n / max) * 100)}%` }} />
                  </div>
                  <span className="text-xs font-black w-6 text-right">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })()}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f.k} type="button" onClick={() => setFilter(f.k)} className={`rounded-full px-3 py-1.5 text-sm font-bold border-2 ${filter === f.k ? 'bg-brandDark text-white border-brandDark' : 'bg-white text-brandDark/60 border-brandDark/10'}`}>
            {f.label} {f.n > 0 && <span className={filter === f.k ? 'text-brandYellow' : 'text-brandDark/40'}>{f.n}</span>}
          </button>
        ))}
      </div>
      <ul className="grid gap-3">
        {shown.map((l) => {
          const b = leadBadge(l.status);
          const digits = (l.phone || '').replace(/[^0-9]/g, '');
          return (
            <li key={l.id} className="rounded-3xl bg-white border-2 border-brandDark/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-black truncate">{l.name}</p>
                  <p className="text-sm font-semibold text-brandDark/60">
                    {l.source ? `${l.source}` : 'Enquiry'}
                    {l.at ? ` · ${new Date(l.at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : ''}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${b.cls}`}>{b.text}</span>
              </div>
              {l.status === 'New' && daysAgo(l.at) >= 1 && (
                <p className="mt-2 inline-block rounded-lg bg-red-100 text-red-800 text-xs font-bold px-2 py-1">⏰ {daysAgo(l.at)} {daysAgo(l.at) === 1 ? 'din' : 'din'} purana — aaj hi call karein!</p>
              )}
              {l.note && <p className="mt-2 text-sm text-brandDark/70">{l.note}</p>}
              {(l.phone || l.email) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {l.phone && (
                    <a href={`tel:${l.phone}`} className="rounded-xl bg-brandDark text-white text-sm font-bold px-4 py-2">📞 Call</a>
                  )}
                  {digits && (
                    <a href={`https://wa.me/${digits.length === 10 ? '91' + digits : digits}`} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-emerald-500 text-white text-sm font-bold px-4 py-2">💬 WhatsApp</a>
                  )}
                  {l.email && (
                    <a href={`mailto:${l.email}`} className="rounded-xl bg-white border-2 border-brandDark/15 text-brandDark text-sm font-bold px-4 py-2">✉️ Email</a>
                  )}
                </div>
              )}
              {l.status !== 'Converted' && l.status !== 'Lost' && (
                <div className="mt-3 flex flex-wrap gap-2 border-t border-brandDark/5 pt-3">
                  <span className="text-xs font-bold text-brandDark/50 self-center">Update:</span>
                  {l.status === 'New' && (
                    <button type="button" onClick={() => onAct(l.id, { status: 'Contacted' })} className="rounded-xl bg-sky-100 text-sky-900 text-sm font-bold px-3 py-1.5">📞 Mark Contacted</button>
                  )}
                  <button type="button" onClick={() => onAct(l.id, { status: 'Converted' })} className="rounded-xl bg-emerald-100 text-emerald-900 text-sm font-bold px-3 py-1.5">✅ Converted</button>
                  <button type="button" onClick={() => onAct(l.id, { status: 'Lost' })} className="rounded-xl bg-brandDark/5 text-brandDark/60 text-sm font-bold px-3 py-1.5">✖️ Lost</button>
                  <button type="button" onClick={() => { setNoteFor(noteFor === l.id ? null : l.id); setNoteText(l.note || ''); }} className="rounded-xl bg-white border-2 border-brandDark/15 text-brandDark/70 text-sm font-bold px-3 py-1.5">📝 Note</button>
                </div>
              )}
              {noteFor === l.id && (
                <div className="mt-2 flex gap-2">
                  <input value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="e.g. Called — call back Friday" className="flex-1 rounded-xl border-2 border-brandDark/10 px-3 py-2 text-sm" />
                  <button type="button" onClick={() => { onAct(l.id, { note: noteText.trim() }); setNoteFor(null); }} className="rounded-xl bg-brandDark text-white text-sm font-bold px-3 py-2">Save</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------ calendar */

function CalendarTab({ plans, todayKey, onAct }: { plans: PortalPlan[]; todayKey: string; onAct: (id: string, patch: Partial<PortalPlan>) => void }) {
  const [month, setMonth] = useState(() => todayKey.slice(0, 7));
  const [filter, setFilter] = useState<'all' | 'approve'>(() => (plans.some(needsApproval) ? 'approve' : 'all'));
  const [y, m] = month.split('-').map(Number);
  const label = new Date(y, m - 1, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  const shift = (n: number) => {
    const d = new Date(y, m - 1 + n, 1);
    setMonth(`${d.getFullYear()}-${pad(d.getMonth() + 1)}`);
  };
  const list = useMemo(
    () =>
      (filter === 'approve' ? plans.filter(needsApproval) : plans.filter((p) => p.date.startsWith(month))).sort((a, b) => (a.date + (a.time || '99')).localeCompare(b.date + (b.time || '99'))),
    [plans, month, filter],
  );
  const byDay = new Map<string, PortalPlan[]>();
  list.forEach((p) => byDay.set(p.date, [...(byDay.get(p.date) || []), p]));
  const waitingCount = plans.filter(needsApproval).length;

  return (
    <div className="grid gap-4">
      <div className="flex gap-2">
        <button type="button" onClick={() => setFilter('approve')} className={`flex-1 rounded-xl py-2.5 text-sm font-bold border-2 ${filter === 'approve' ? 'bg-brandDark text-white border-brandDark' : 'border-brandDark/15'}`}>
          ⏳ Need your OK ({waitingCount})
        </button>
        <button type="button" onClick={() => setFilter('all')} className={`flex-1 rounded-xl py-2.5 text-sm font-bold border-2 ${filter === 'all' ? 'bg-brandDark text-white border-brandDark' : 'border-brandDark/15'}`}>
          📅 Full calendar
        </button>
      </div>
      {filter === 'all' && (
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => shift(-1)} className="w-10 h-10 rounded-full border-2 border-brandDark/15 font-black" aria-label="Previous month">‹</button>
          <p className="text-lg font-black">{label}</p>
          <button type="button" onClick={() => shift(1)} className="w-10 h-10 rounded-full border-2 border-brandDark/15 font-black" aria-label="Next month">›</button>
        </div>
      )}
      {list.length === 0 && (
        <p className="rounded-3xl bg-white border-2 border-brandDark/10 p-6 text-center font-semibold text-brandDark/60">
          {filter === 'approve' ? '🎉 Nothing waiting. All caught up!' : 'Nothing planned this month yet.'}
        </p>
      )}
      {[...byDay.entries()].map(([d, items]) => (
        <section key={d}>
          <p className={`mb-2 text-sm font-black ${d === todayKey ? 'text-emerald-700' : 'text-brandDark/60'}`}>
            {niceDay(d)}
            {d === todayKey ? ' · Today' : ''}
          </p>
          <div className="grid gap-3">
            {items.map((p) => (
              <PlanCard key={p.id} p={p} onAct={onAct} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function PlanCard({ p, onAct }: { p: PortalPlan; onAct: (id: string, patch: Partial<PortalPlan>) => void }) {
  const [mode, setMode] = useState<'idle' | 'change'>('idle');
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const b = badge(p);
  const canAct = isContent(p.kind) && (p.status === 'Idea' || p.status === 'Making');

  const send = async (action: 'approve' | 'change') => {
    if (action === 'change' && !comment.trim()) return setError('Kya change chahiye, likhiye.');
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/portal/act', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ planId: p.id, action, comment: comment.trim() }) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        onAct(p.id, action === 'approve' ? { status: 'Approved', changeRequested: undefined, clientComment: comment.trim() || undefined } : { changeRequested: true, clientComment: comment.trim() });
        setMode('idle');
        setComment('');
      } else if (res.status === 401) window.location.reload();
      else setError(json.error || 'Nahi ho paya. Dobara try karein.');
    } catch {
      setError('Internet check karke dobara try karein.');
    }
    setBusy(false);
  };

  return (
    <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-4">
      <div className="flex items-start gap-3">
        <span className="text-3xl leading-none mt-0.5">{EMOJI[p.kind] || '📌'}</span>
        <div className="flex-1 min-w-0">
          <p className="font-black leading-snug">{p.title}</p>
          <p className="text-sm text-brandDark/60">
            {p.kind}
            {p.platforms.length && isContent(p.kind) ? ` · ${p.platforms.join(', ')}` : ''}
            {p.time ? ` · ${time12(p.time)}` : ''}
          </p>
          <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${b.cls}`}>{b.text}</span>
        </div>
      </div>
      {p.clientComment && (
        <p className="mt-3 rounded-xl bg-brandBg px-3 py-2 text-sm">
          <b>Your note:</b> {p.clientComment}
        </p>
      )}
      {(p.previewUrl || canAct) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {p.previewUrl && (
            <a href={p.previewUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border-2 border-brandDark/15 px-4 py-2 text-sm font-bold">
              👀 See design
            </a>
          )}
          {canAct && mode === 'idle' && (
            <>
              <button type="button" disabled={busy} onClick={() => send('approve')} className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-bold disabled:opacity-50">
                {busy ? '…' : '✅ Approve'}
              </button>
              <button type="button" disabled={busy} onClick={() => setMode('change')} className="rounded-xl bg-brandYellow px-4 py-2 text-sm font-bold">
                ✏️ Request change
              </button>
            </>
          )}
        </div>
      )}
      {mode === 'change' && (
        <div className="mt-3 grid gap-2">
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} maxLength={500} placeholder="Jaise: text bada karo, offer ₹999 likho, photo badlo…" className="w-full rounded-xl border-2 border-brandDark/15 px-3 py-2 font-semibold outline-none focus:border-brandYellow" />
          <div className="flex gap-2">
            <button type="button" disabled={busy} onClick={() => send('change')} className="rounded-xl bg-brandDark text-white px-4 py-2 text-sm font-bold disabled:opacity-50">
              {busy ? 'Sending…' : 'Send to team'}
            </button>
            <button type="button" onClick={() => setMode('idle')} className="rounded-xl border-2 border-brandDark/15 px-4 py-2 text-sm font-bold">
              Cancel
            </button>
          </div>
        </div>
      )}
      {error && <p className="mt-2 text-sm font-bold text-red-600">{error}</p>}
    </div>
  );
}

/* ------------------------------------------------------------ payments */

function PaymentsTab({ data }: { data: PortalSnapshot }) {
  const list = [...data.invoices].sort((a, b) => b.issueDate.localeCompare(a.issueDate));
  const upi = (amount: number, number: string) =>
    `upi://pay?pa=${encodeURIComponent(data.upiId)}&pn=${encodeURIComponent('Techinfigo')}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(`Invoice ${number}`)}`;
  return (
    <div className="grid gap-3">
      <h2 className="text-2xl font-black">Payments</h2>
      {list.length === 0 && <p className="rounded-3xl bg-white border-2 border-brandDark/10 p-6 text-center font-semibold text-brandDark/60">No invoices yet.</p>}
      {list.map((i) => {
        const paid = i.due <= 0.5;
        return (
          <div key={i.id} className="rounded-3xl bg-white border-2 border-brandDark/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-black">Invoice {i.number}</p>
                <p className="text-sm text-brandDark/60">
                  {i.issueDate ? niceDay(i.issueDate) : ''}
                  {!paid && i.dueDate ? ` · due ${niceDay(i.dueDate)}` : ''}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${paid ? 'bg-emerald-100 text-emerald-900' : i.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-brandYellow/30'}`}>
                {paid ? '✅ Paid' : i.status === 'Overdue' ? '⚠️ Overdue' : '⏳ Due'}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-brandBg py-2">
                <p className="text-[11px] font-bold text-brandDark/50">Total</p>
                <p className="font-black">{inr(i.total)}</p>
              </div>
              <div className="rounded-xl bg-brandBg py-2">
                <p className="text-[11px] font-bold text-brandDark/50">Paid</p>
                <p className="font-black text-emerald-700">{inr(i.paid)}</p>
              </div>
              <div className="rounded-xl bg-brandBg py-2">
                <p className="text-[11px] font-bold text-brandDark/50">Due</p>
                <p className="font-black">{inr(i.due)}</p>
              </div>
            </div>
            {!paid && data.upiId && (
              <a href={upi(i.due, i.number)} className="mt-3 block w-full rounded-2xl bg-brandYellow py-3 text-center font-black">
                Pay {inr(i.due)} via UPI
              </a>
            )}
          </div>
        );
      })}
      {data.upiId && <p className="text-center text-xs text-brandDark/50">UPI ID: {data.upiId} · Payment ke baad screenshot WhatsApp kar dijiye 🙏</p>}
    </div>
  );
}

/* ------------------------------------------------------------ documents */

function DocsTab({ data }: { data: PortalSnapshot }) {
  return (
    <div className="grid gap-3">
      <h2 className="text-2xl font-black">Documents</h2>
      {data.docs.length === 0 && <p className="rounded-3xl bg-white border-2 border-brandDark/10 p-6 text-center font-semibold text-brandDark/60">No documents yet.</p>}
      {data.docs.map((d, i) => (
        <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-3xl bg-white border-2 border-brandDark/10 p-4">
          <span className="text-3xl">📄</span>
          <div className="flex-1">
            <p className="font-black">{d.title}</p>
            {d.date && <p className="text-sm text-brandDark/60">{niceDay(d.date)}</p>}
          </div>
          <span className="font-black">↗</span>
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ password */

function PasswordDialog({ onClose }: { onClose: () => void }) {
  const [old, setOld] = useState('');
  const [next, setNext] = useState('');
  const [msg, setMsg] = useState('');
  const [ok, setOk] = useState(false);
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/portal/password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ old, next }) }).catch(() => null);
    const json = (await res?.json().catch(() => ({}))) as { ok?: boolean; error?: string } | undefined;
    if (res?.ok && json?.ok) {
      setOk(true);
      setMsg('Password badal gaya ✅');
    } else setMsg(json?.error || 'Nahi ho paya.');
  };
  const input = 'mt-1 w-full rounded-xl border-2 border-brandDark/15 px-4 py-3 font-semibold outline-none focus:border-brandYellow';
  return (
    <div className="fixed inset-0 z-30 bg-black/40 grid place-items-center p-4" onClick={onClose}>
      <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-3xl bg-white p-5 grid gap-3">
        <p className="text-xl font-black">🔑 Change password</p>
        <label className="text-sm font-bold">
          Current password
          <input type="password" value={old} onChange={(e) => setOld(e.target.value)} autoComplete="current-password" className={input} />
        </label>
        <label className="text-sm font-bold">
          New password (6+ letters)
          <input type="password" value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" className={input} />
        </label>
        {msg && <p className={`text-sm font-bold ${ok ? 'text-emerald-700' : 'text-red-600'}`}>{msg}</p>}
        <div className="flex gap-2">
          {!ok && (
            <button type="submit" className="flex-1 rounded-xl bg-brandYellow py-3 font-black">
              Save
            </button>
          )}
          <button type="button" onClick={onClose} className="flex-1 rounded-xl border-2 border-brandDark/15 py-3 font-bold">
            {ok ? 'Done' : 'Cancel'}
          </button>
        </div>
      </form>
    </div>
  );
}
