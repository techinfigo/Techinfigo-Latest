'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Home, Target, Calendar, Receipt, FileText, Bell, Phone, MessageCircle, Mail, PenLine, Clock, ArrowRight, Plus, Search, Check, CreditCard, Download, ExternalLink, Upload, SlidersHorizontal, CalendarRange, Blocks, type LucideIcon } from 'lucide-react';
import { whatsappUrl } from '../../config/site';
import type { PortalPlan, PortalLead, PortalSnapshot, PortalStage } from '../../lib/portal-types';
import { stagesForType, deriveStageName, stageToStatus } from '../../lib/portal-types';

/**
 * The client's dashboard: this month at a glance, the content calendar with
 * Approve / Request change, payments (UPI) and documents. Data is the
 * snapshot the CRM keeps up to date; nothing internal is ever in it.
 */

type Tab = 'home' | 'leads' | 'calendar' | 'payments' | 'docs' | 'apps';

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
const timeAgo = (iso?: string) => {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  if (isNaN(diff) || diff < 0) return 'just now';
  const mins = Math.floor(diff / 60000), hrs = Math.floor(mins / 60), days = Math.floor(hrs / 24), mos = Math.floor(days / 30);
  if (mos >= 1) return `${mos} month${mos > 1 ? 's' : ''} ago`;
  if (days >= 1) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hrs >= 1) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
  if (mins >= 1) return `${mins} min ago`;
  return 'just now';
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

export default function PortalApp({ data, syncedAt, webhookToken, businessType = 'general', stages }: { data: PortalSnapshot; syncedAt: number; webhookToken?: string; businessType?: string; stages?: PortalStage[] }) {
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
  const stageList: PortalStage[] = stages && stages.length ? stages : stagesForType(businessType);
  const newLeads = leads.filter((l) => l.status === 'New Lead').length;
  const leadStats = {
    total: leads.length,
    newC: newLeads,
    contacted: leads.filter((l) => l.status === 'Contacted').length,
    converted: leads.filter((l) => l.status === 'Closed Won').length,
    thisMonth: leads.filter((l) => (l.at || '').startsWith(monthKey)).length,
  };
  const convRate = leadStats.total ? Math.round((leadStats.converted / leadStats.total) * 100) : 0;
  // Dashboard: who needs calling today = new leads + follow-ups due today or overdue.
  const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);
  const followDue = leads.filter((l) => l.nextFollowUp && new Date(l.nextFollowUp).getTime() <= todayEnd.getTime() && l.status !== 'Closed Won' && l.status !== 'Closed Lost').length;
  const callToday = newLeads + followDue;
  // Worked leads with no next step = the leak. New leads already count in callToday.
  const noStep = leads.filter((l) => l.status !== 'New Lead' && l.status !== 'Closed Won' && l.status !== 'Closed Lost' && !l.nextFollowUp).length;
  const recentLeads = [...leads].sort((a, b) => {
    const pa = a.status === 'New Lead' ? 0 : 1, pb = b.status === 'New Lead' ? 0 : 1;
    return (pa - pb) || (b.at || '').localeCompare(a.at || '');
  }).slice(0, 4);

  const approvePlan = async (id: string) => {
    setPlans((ps) => ps.map((p) => (p.id === id ? { ...p, status: 'Approved', changeRequested: undefined } : p)));
    await fetch('/api/portal/act', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ planId: id, action: 'approve' }) }).catch(() => 0);
  };

  const onAddLead = async (name: string, phone: string, note: string) => {
    const tempId = `plead-${Date.now()}`;
    setLeads((ls) => [{ id: tempId, name: name || 'Lead', phone, source: 'Added by you', status: 'New Lead', note, at: new Date().toISOString() }, ...ls]);
    await fetch('/api/portal/act', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newLead: { name, phone, note } }),
    }).catch(() => 0);
  };

  const onLeadFollowUp = async (id: string, fu: { next: string; type: string; note: string }) => {
    setLeads((ls) => ls.map((l) => {
      if (l.id !== id) return l;
      const next = { ...l };
      if (fu.next) next.nextFollowUp = fu.next;
      if (fu.note) {
        next.activity = [{ type: fu.type || 'Other', note: fu.note, at: new Date().toISOString() }, ...(l.activity || [])].slice(0, 20);
        if (next.status === 'New Lead') next.status = 'Contacted';
      }
      return next;
    }));
    await fetch('/api/portal/act', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: id, followUp: fu }),
    }).catch(() => 0);
  };

  const onLeadStage = async (id: string, stageName: string) => {
    const idx = stageList.findIndex((s) => s.name === stageName);
    const mapped = idx >= 0 ? stageToStatus(stageList[idx], idx) : undefined;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, stage: stageName, ...(mapped ? { status: mapped } : {}) } : l)));
    await fetch('/api/portal/act', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ leadId: id, stage: stageName }) }).catch(() => 0);
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

  const tabs: { t: Tab; Icon: LucideIcon; label: string; count?: number }[] = [
    { t: 'home', Icon: Home, label: 'Home' },
    { t: 'leads', Icon: Target, label: 'Leads', count: newLeads },
    { t: 'calendar', Icon: Calendar, label: 'Calendar', count: waiting.length },
    { t: 'payments', Icon: Receipt, label: 'Payments', count: dueInvoices.length },
    { t: 'docs', Icon: FileText, label: 'Documents' },
    { t: 'apps', Icon: Blocks, label: 'Connect' },
  ];

  return (
    <div className="min-h-[100svh] bg-brandBg text-brandDark">
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden sm:flex sticky top-0 h-screen w-60 shrink-0 flex-col bg-brandDark text-brandBg p-5">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/proposal-logo.png" alt="" width={36} height={36} className="w-9 h-9 rounded-xl bg-brandSurface ring-1 ring-brandBg/10 p-1.5" />
            <div className="min-w-0">
              <p className="font-black text-sm leading-tight truncate">{data.business || 'Your dashboard'}</p>
              <p className="text-[11px] font-semibold text-brandBg/40 leading-tight">by Techinfigo</p>
            </div>
          </div>
          <nav className="mt-7 grid gap-1">
            {tabs.map((x) => (
              <button key={x.t} type="button" onClick={() => setTab(x.t)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition ${tab === x.t ? 'bg-brandYellow text-brandDark' : 'text-brandBg/70 hover:bg-brandBg/10'}`}>
                <x.Icon className="w-[18px] h-[18px]" strokeWidth={2.4} />{x.label}
                {x.count ? <span className={`ml-auto inline-grid place-items-center min-w-5 h-5 px-1 rounded-full text-[11px] ${tab === x.t ? 'bg-brandDark text-brandYellow' : 'bg-brandYellow text-brandDark'}`}>{x.count}</span> : null}
              </button>
            ))}
          </nav>
          <div className="mt-auto grid gap-3">
            {!alertsOn && (
              <div className="rounded-2xl bg-brandSurface/70 ring-1 ring-brandBg/10 p-3.5">
                <p className="flex items-center gap-1.5 text-xs font-bold text-brandYellow"><Bell className="w-3.5 h-3.5" strokeWidth={2.4} /> Lead alerts</p>
                <p className="text-[11px] text-brandBg/50 mt-1 leading-snug">Get a phone buzz the second a new lead arrives.</p>
                <button type="button" disabled={alertsBusy} onClick={enableAlerts} className="mt-2.5 w-full rounded-lg bg-brandYellow text-brandDark text-xs font-black py-2 disabled:opacity-50">{alertsBusy ? 'Turning on…' : 'Turn on'}</button>
              </div>
            )}
            {alertsOn && <p className="flex items-center gap-1.5 rounded-xl bg-brandSurface/70 px-3 py-2 text-xs font-bold text-emerald-400"><Bell className="w-3.5 h-3.5" strokeWidth={2.4} /> Lead alerts on</p>}
            <div className="relative flex items-center gap-2 border-t border-brandBg/10 pt-3">
              <div className="w-9 h-9 rounded-full bg-brandYellow text-brandDark grid place-items-center font-black">{(data.person || data.business || 'C').charAt(0).toUpperCase()}</div>
              <p className="min-w-0 flex-1 text-xs font-bold truncate">{data.person || data.business}</p>
              <button type="button" onClick={() => setMenu((m) => !m)} className="text-brandBg/50 hover:text-brandBg px-1 text-lg leading-none" aria-label="Account menu">⋯</button>
              {menu && (
                <div className="absolute bottom-12 right-0 w-52 rounded-2xl bg-brandSurface ring-1 ring-brandBg/10 shadow-3xl p-2 text-sm font-semibold grid gap-0.5">
                  <button type="button" onClick={() => { setPwOpen(true); setMenu(false); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-brandBg/10">🔑 Change password</button>
                  <a href={whatsappUrl(`Namaste, ${data.business} ke baare mein baat karni hai.`)} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-xl hover:bg-brandBg/10">💬 WhatsApp Techinfigo</a>
                  <button type="button" onClick={logout} className="w-full text-left px-3 py-2 rounded-xl hover:bg-brandBg/10 text-red-400">↩️ Log out</button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex-1 min-w-0 pb-24 sm:pb-8">
          {/* Mobile top bar */}
          <header className="sm:hidden sticky top-0 z-20 bg-brandDark text-brandBg shadow-lg">
            <div className="px-4 py-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/proposal-logo.png" alt="" width={34} height={34} className="w-8 h-8 rounded-xl bg-brandSurface ring-1 ring-brandBg/10 p-1.5" />
              <div className="min-w-0">
                <p className="font-black text-sm leading-tight truncate">{data.business || 'Your dashboard'}</p>
                <p className="text-[11px] font-semibold text-brandBg/45 leading-tight">by Techinfigo</p>
              </div>
              <div className="ml-auto relative">
                <button type="button" onClick={() => setMenu((m) => !m)} className="w-9 h-9 rounded-full bg-brandYellow text-brandDark font-black" aria-label="Account menu">{(data.person || data.business || 'C').charAt(0).toUpperCase()}</button>
                {menu && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-brandDark/10 shadow-3xl p-2 text-sm font-semibold z-30">
                    {!alertsOn && (<button type="button" disabled={alertsBusy} onClick={() => { enableAlerts(); setMenu(false); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-brandDark/5">🔔 Turn on lead alerts</button>)}
                    {alertsOn && <p className="px-3 py-2 text-xs text-emerald-600 font-bold">🔔 Lead alerts on</p>}
                    <button type="button" onClick={() => { setPwOpen(true); setMenu(false); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-brandDark/5">🔑 Change password</button>
                    <a href={whatsappUrl(`Namaste, ${data.business} ke baare mein baat karni hai.`)} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-xl hover:bg-brandDark/5">💬 WhatsApp Techinfigo</a>
                    <button type="button" onClick={logout} className="w-full text-left px-3 py-2 rounded-xl hover:bg-brandDark/5 text-red-600">↩️ Log out</button>
                  </div>
                )}
              </div>
            </div>
          </header>

      <main className="w-full px-4 sm:px-8 pt-5 sm:pt-7">
        {tab === 'home' && (
          <div className="grid gap-4">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-[28px] bg-brandDark text-brandBg p-6 sm:p-8 shadow-xl">
              <div aria-hidden className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-brandYellow/15 blur-[90px]" />
              <p className="text-xs font-bold uppercase tracking-widest text-brandYellow">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight">Namaste{data.person ? ` ${data.person.split(' ')[0]}` : ''} 👋</h1>
              <p className="mt-1.5 font-medium text-brandBg/60">Here&apos;s everything happening with your growth, at a glance.</p>
            </div>

            {/* Call Today band */}
            {callToday > 0 && (
              <button type="button" onClick={() => setTab('leads')} className="rounded-[24px] bg-brandYellow text-brandDark p-5 sm:p-6 text-left flex items-center gap-4 shadow-glow">
                <span className="grid place-items-center h-12 w-12 rounded-2xl bg-brandDark/10 shrink-0"><Phone className="w-6 h-6" strokeWidth={2.4} /></span>
                <div className="flex-1 min-w-0">
                  <p className="text-xl font-black leading-tight">{callToday} {callToday === 1 ? 'lead needs' : 'leads need'} you today</p>
                  <p className="text-sm font-semibold text-brandDark/70">{newLeads} new to call{followDue > 0 ? ` + ${followDue} follow-up${followDue === 1 ? '' : 's'} due` : ''} — fastest reply wins the customer.</p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-brandDark text-white font-black px-5 py-3 shrink-0">Open leads <ArrowRight className="w-4 h-4" strokeWidth={2.6} /></span>
              </button>
            )}

            {/* No-next-step nudge: never leave a worked lead open */}
            {noStep > 0 && (
              <button type="button" onClick={() => setTab('leads')} className="rounded-[24px] bg-rose-50 border-2 border-rose-200 text-rose-900 p-5 text-left flex items-center gap-4">
                <span className="grid place-items-center h-11 w-11 rounded-2xl bg-rose-100 text-rose-600 shrink-0"><Clock className="w-5 h-5" strokeWidth={2.4} /></span>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-black leading-tight">{noStep} lead{noStep === 1 ? '' : 's'} with no next step</p>
                  <p className="text-sm font-semibold text-rose-800/80">Set a follow-up date so they don&apos;t slip away. Har lead ka agla step hona chahiye.</p>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0 text-rose-400" strokeWidth={2.6} />
              </button>
            )}

            {/* KPI row */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
              <KpiCard n={leadStats.total} label="Total leads" />
              <KpiCard n={leadStats.newC} label="New to call" tone="yellow" />
              <KpiCard n={leadStats.converted} label="Won" tone="emerald" />
              <KpiCard n={`${convRate}%`} label="Conversion" />
              <KpiCard n={followDue} label="Follow-ups today" tone={followDue > 0 ? 'yellow' : undefined} />
              <KpiCard n={inr(totalDue)} label="Payment due" />
            </div>

            {leadStats.total === 0 && content.length === 0 && (
              <div className="rounded-[24px] bg-white border-2 border-dashed border-brandDark/15 p-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-brandDark/5 grid place-items-center text-brandDark/40"><Target className="w-8 h-8" strokeWidth={2} /></div>
                <p className="mt-4 text-lg font-black">Your dashboard is ready</p>
                <p className="mt-1 font-medium text-brandDark/55 max-w-md mx-auto">As soon as leads come from your ads, website or walk-ins, they&apos;ll show here — ready to call. Aapka pehla lead jald aa raha hai!</p>
              </div>
            )}

            <div className="grid lg:grid-cols-5 gap-5 items-start">
              {/* Left column (wider) */}
              <div className="lg:col-span-3 grid gap-5">
                {recentLeads.length > 0 && (
                  <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-5 shadow-card">
                    <div className="flex items-center justify-between">
                      <p className="font-black">Recent leads</p>
                      <button type="button" onClick={() => setTab('leads')} className="text-sm font-bold text-brandDark/50 hover:text-brandDark inline-flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.6} /></button>
                    </div>
                    <div className="mt-2">
                      {recentLeads.map((l) => {
                        const bdg = stageBadge(stageList, l.stage || deriveStageName(l.status, stageList));
                        const digits = (l.phone || '').replace(/[^0-9]/g, '');
                        const wa = digits.length === 10 ? '91' + digits : digits;
                        return (
                          <div key={l.id} className="flex items-center gap-3 py-2.5 border-b border-brandDark/[0.06] last:border-none">
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-sm truncate">{l.name}</p>
                              <p className="text-xs text-brandDark/45">{l.source || 'Enquiry'}{l.at ? ` · ${new Date(l.at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : ''}</p>
                            </div>
                            <span className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${bdg.cls}`}><span className={`h-1.5 w-1.5 rounded-full ${bdg.dot}`} />{bdg.text}</span>
                            {l.phone && <a href={`tel:${l.phone}`} title="Call" className="grid place-items-center h-8 w-8 rounded-lg bg-brandDark text-white shrink-0"><Phone className="w-4 h-4" strokeWidth={2.4} /></a>}
                            {digits && <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="grid place-items-center h-8 w-8 rounded-lg bg-emerald-500 text-white shrink-0"><MessageCircle className="w-4 h-4" strokeWidth={2.4} /></a>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {waiting.length > 0 && (
                  <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-5 shadow-card">
                    <div className="flex items-center justify-between">
                      <p className="font-black">Designs need your approval</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-brandYellow/30 px-2.5 py-1 text-[11px] font-bold"><Clock className="w-3 h-3" strokeWidth={2.4} /> {waiting.length} waiting</span>
                    </div>
                    <div className="mt-2">
                      {waiting.slice(0, 4).map((p) => (
                        <div key={p.id} className="flex items-center gap-3 py-2.5 border-b border-brandDark/[0.06] last:border-none">
                          <span className="grid place-items-center h-11 w-11 rounded-xl bg-gradient-to-br from-brandSurface to-brandDark text-lg shrink-0">{EMOJI[p.kind] || '📌'}</span>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-sm truncate">{p.title}</p>
                            <p className="text-xs text-brandDark/45">{p.kind}{p.platforms.length ? ` · ${p.platforms.join(', ')}` : ''}</p>
                          </div>
                          <button type="button" onClick={() => approvePlan(p.id)} className="inline-flex items-center gap-1 rounded-xl bg-brandYellow text-brandDark text-sm font-bold px-3 py-1.5 shrink-0"><Check className="w-4 h-4" strokeWidth={2.6} /> Approve</button>
                          <button type="button" onClick={() => setTab('calendar')} className="inline-flex items-center gap-1 rounded-xl bg-white border-2 border-brandDark/15 text-brandDark text-sm font-bold px-3 py-1.5 shrink-0"><PenLine className="w-4 h-4" strokeWidth={2.4} /> Change</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right column */}
              <div className="lg:col-span-2 grid gap-5">
                {totalDue > 0.5 && (
                  <button type="button" onClick={() => setTab('payments')} className="text-left relative overflow-hidden rounded-3xl bg-brandDark text-brandBg p-5 shadow-xl">
                    <div aria-hidden className="pointer-events-none absolute -top-12 -right-8 h-40 w-40 rounded-full bg-brandYellow/15 blur-[70px]" />
                    <p className="relative text-xs font-bold uppercase tracking-wider text-brandYellow/90">Payment due</p>
                    <p className="relative mt-1 text-3xl font-black">{inr(totalDue)}</p>
                    {dueInvoices[0] && <p className="relative text-sm text-brandBg/50">Invoice {dueInvoices[0].number} · due {niceDay(dueInvoices[0].dueDate)}</p>}
                    <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-xl bg-brandYellow text-brandDark font-black px-4 py-2 text-sm"><CreditCard className="w-4 h-4" strokeWidth={2.4} /> Pay with UPI</span>
                  </button>
                )}
                {content.length > 0 && (
                  <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-5 shadow-card">
                    <p className="font-black">Content progress</p>
                    <div className="flex justify-between text-sm font-bold mt-2 text-brandDark/60">
                      <span>{posted} of {content.length} posted this month</span>
                      <span>{Math.round((posted / content.length) * 100)}%</span>
                    </div>
                    <div className="mt-2 h-3 rounded-full bg-brandDark/10 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(posted / content.length) * 100}%` }} />
                    </div>
                  </div>
                )}
                {upcoming.length > 0 && (
                  <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-5 shadow-card">
                    <p className="font-black">Coming up</p>
                    <ul className="mt-2 grid gap-2">
                      {upcoming.map((p) => (
                        <li key={p.id} className="flex items-center gap-3">
                          <span className="grid place-items-center h-9 w-9 rounded-xl bg-brandYellow/20 text-base">{EMOJI[p.kind] || '📌'}</span>
                          <div>
                            <p className="font-bold text-sm">{p.title}</p>
                            <p className="text-xs text-brandDark/50">{niceDay(p.date)}{p.time ? ` · ${time12(p.time)}` : ''}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.services.length > 0 && (
                  <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-5 shadow-card">
                    <p className="font-black">Your plan</p>
                    <ul className="mt-2 grid gap-1.5">
                      {data.services.map((s, i) => (
                        <li key={i} className="flex justify-between gap-3 text-sm py-1 border-b border-brandDark/[0.05] last:border-none">
                          <span className="font-semibold text-brandDark/70">{s.name}</span>
                          <span className="font-bold whitespace-nowrap">{inr(s.cost)}<span className="text-brandDark/45 font-semibold">{/month/i.test(s.billingType) ? '/mo' : ''}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!alertsOn && leadStats.total > 0 && (
                  <button type="button" disabled={alertsBusy} onClick={enableAlerts} className="text-left rounded-3xl bg-brandYellow/20 border-2 border-brandYellow p-5">
                    <p className="flex items-center gap-2 font-black"><Bell className="w-5 h-5" strokeWidth={2.4} /> Lead alerts on your phone</p>
                    <p className="mt-1 text-sm font-semibold text-brandDark/70">Jaise hi naya lead aaye, turant notification — turant call karein.</p>
                    <p className="mt-3 inline-block rounded-xl bg-brandDark text-white text-sm font-bold px-4 py-2">{alertsBusy ? 'On kar rahe hain…' : 'Turn on alerts'}</p>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === 'leads' && <LeadsTab leads={leads} stages={stageList} onStage={onLeadStage} onAddLead={onAddLead} onFollowUp={onLeadFollowUp} />}
        {tab === 'calendar' && <CalendarTab plans={plans} todayKey={todayKey} onAct={onAct} />}
        {tab === 'payments' && <PaymentsTab data={data} />}
        {tab === 'docs' && <DocsTab data={data} />}
        {tab === 'apps' && <IntegrationsTab data={data} webhookToken={webhookToken} />}

        <p className="mt-8 text-center text-xs text-brandDark/40">
          Updated {syncedAt ? new Date(syncedAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) : 'soon'} · Questions?{' '}
          <a className="underline font-bold" href={whatsappUrl(`Namaste, ${data.business} ke baare mein baat karni hai.`)} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </p>
      </main>
        </div>
      </div>

      {/* Phone tab bar */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-brandDark/10 grid grid-cols-6">
        {tabs.map((x) => (
          <button key={x.t} type="button" onClick={() => setTab(x.t)} className={`relative py-2.5 text-[11px] font-bold flex flex-col items-center gap-0.5 ${tab === x.t ? 'text-brandDark' : 'text-brandDark/45'}`}>
            <x.Icon className="w-5 h-5" strokeWidth={2.4} />
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

function KpiCard({ n, label, tone }: { n: number | string; label: string; tone?: 'yellow' | 'emerald' }) {
  const color = tone === 'yellow' ? 'text-brandYellow' : tone === 'emerald' ? 'text-emerald-600' : 'text-brandDark';
  return (
    <div className="rounded-2xl bg-white border border-brandDark/[0.08] p-5 shadow-card">
      <p className={`text-3xl font-black leading-none ${color}`}>{n}</p>
      <p className="mt-1.5 text-sm font-semibold text-brandDark/45">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------ leads */

// Colour a stage by its position (open stages cycle a palette; won/lost fixed).
const STAGE_PALETTE: { cls: string; dot: string }[] = [
  { cls: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
  { cls: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  { cls: 'bg-violet-100 text-violet-800', dot: 'bg-violet-500' },
  { cls: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500' },
  { cls: 'bg-sky-100 text-sky-800', dot: 'bg-sky-500' },
  { cls: 'bg-teal-100 text-teal-800', dot: 'bg-teal-500' },
];
const WON_C = { cls: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' };
const LOST_C = { cls: 'bg-rose-100 text-rose-700', dot: 'bg-rose-400' };
function stageBadge(stages: PortalStage[], name: string): { text: string; cls: string; dot: string } {
  const i = stages.findIndex((s) => s.name === name);
  const st = i >= 0 ? stages[i] : undefined;
  if (st?.kind === 'won') return { text: name, ...WON_C };
  if (st?.kind === 'lost') return { text: name, ...LOST_C };
  const oi = stages.filter((s) => s.kind === 'open').findIndex((s) => s.name === name);
  const pal = STAGE_PALETTE[(oi >= 0 ? oi : i >= 0 ? i : 0) % STAGE_PALETTE.length];
  return { text: name || 'New', ...pal };
}

function LeadsTab({ leads, stages, onStage, onAddLead, onFollowUp }: { leads: PortalLead[]; stages: PortalStage[]; onStage: (id: string, stageName: string) => void; onAddLead: (name: string, phone: string, note: string) => void; onFollowUp: (id: string, fu: { next: string; type: string; note: string }) => void }) {
  const stageName = (l: PortalLead): string => l.stage || deriveStageName(l.status, stages);
  const [adding, setAdding] = useState(false);
  const [nm, setNm] = useState('');
  const [ph, setPh] = useState('');
  const [nt, setNt] = useState('');
  const submitAdd = () => {
    if (!nm.trim() && !ph.trim()) return;
    onAddLead(nm.trim(), ph.trim(), nt.trim());
    setNm(''); setPh(''); setNt(''); setAdding(false);
  };
  const [q, setQ] = useState('');
  const [view, setView] = useState<'list' | 'pipeline'>('list');
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [stageF, setStageF] = useState<Set<string>>(new Set());
  const [sourceF, setSourceF] = useState<Set<string>>(new Set());
  const [fromD, setFromD] = useState('');
  const [toD, setToD] = useState('');
  const [menu, setMenu] = useState<'none' | 'dates' | 'filters'>('none');
  const fileRef = useRef<HTMLInputElement>(null);
  // Follow-up / activity editor
  const [fuFor, setFuFor] = useState<string | null>(null);
  const [fuType, setFuType] = useState('Call');
  const [fuNote, setFuNote] = useState('');
  const [fuNext, setFuNext] = useState('');
  const stageIdx = (name: string) => { const i = stages.findIndex((s) => s.name === name); return i < 0 ? 99 : i; };
  // Leads with a pending follow-up float to the top, soonest first — like the CRM.
  const sorted = [...leads].sort((a, b) => {
    const ap = !!a.nextFollowUp, bp = !!b.nextFollowUp;
    if (ap && bp) return new Date(a.nextFollowUp!).getTime() - new Date(b.nextFollowUp!).getTime();
    if (ap) return -1;
    if (bp) return 1;
    return (stageIdx(stageName(a)) - stageIdx(stageName(b))) || (b.at || '').localeCompare(a.at || '');
  });
  const ql = q.trim().toLowerCase();
  const base = sorted.filter((l) => {
    const okQ = !ql || (l.name || '').toLowerCase().includes(ql) || (l.company || '').toLowerCase().includes(ql) || (l.phone || '').toLowerCase().includes(ql) || (l.source || '').toLowerCase().includes(ql) || (l.email || '').toLowerCase().includes(ql);
    const okSrc = sourceF.size === 0 || (l.source ? sourceF.has(l.source) : false);
    const day = (l.at || '').slice(0, 10);
    const okDate = (!fromD || day >= fromD) && (!toD || day <= toD);
    return okQ && okSrc && okDate;
  });
  const searched = base; // pipeline shows all stages (filtered by search/source/date)
  const shown = stageF.size === 0 ? base : base.filter((l) => stageF.has(stageName(l)));
  const newCount = leads.filter((l) => l.status === 'New Lead').length;
  const wonCount = leads.filter((l) => l.status === 'Closed Won').length;
  const daysAgo = (at?: string) => (at ? Math.floor((Date.now() - new Date(at).getTime()) / 86400000) : 0);
  const isSameDay = (s?: string) => {
    if (!s) return false;
    const d = new Date(s), n = new Date();
    return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
  };
  const fuState = (l: PortalLead): 'today' | 'overdue' | 'upcoming' | null => {
    if (!l.nextFollowUp) return null;
    if (isSameDay(l.nextFollowUp)) return 'today';
    return new Date(l.nextFollowUp).getTime() < Date.now() ? 'overdue' : 'upcoming';
  };
  // One place for the urgency colours: overdue = red (missed!), today = amber, later = calm.
  type FuTone = { pill: string; accent: string; row: string; card: string };
  const fuTone = (fs: ReturnType<typeof fuState>): FuTone =>
    fs === 'overdue'
      ? { pill: 'bg-rose-100 text-rose-700', accent: 'border-l-rose-500', row: 'bg-rose-50/60 hover:bg-rose-50', card: 'border-rose-300' }
      : fs === 'today'
        ? { pill: 'bg-amber-100 text-amber-800', accent: 'border-l-amber-400', row: 'bg-amber-50/50 hover:bg-amber-50', card: 'border-amber-300' }
        : { pill: 'bg-brandDark/[0.06] text-brandDark/60', accent: 'border-l-transparent', row: 'hover:bg-brandYellow/[0.05]', card: 'border-brandDark/10' };
  const isOpenLead = (l: PortalLead) => l.status !== 'Closed Won' && l.status !== 'Closed Lost';
  const needsStep = (l: PortalLead) => isOpenLead(l) && !l.nextFollowUp;
  const fuLabel = (s?: string) => (s ? new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + (new Date(s).getHours() ? ', ' + new Date(s).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }) : '') : '');
  const toLocalInput = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
  };
  const openFu = (l: PortalLead) => {
    if (fuFor === l.id) { setFuFor(null); return; }
    setFuFor(l.id); setFuType('Call'); setFuNote(''); setFuNext(toLocalInput(l.nextFollowUp));
  };
  const quickNext = (days: number, hour: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(hour, 0, 0, 0);
    setFuNext(toLocalInput(d.toISOString()));
  };
  const saveFu = (id: string) => {
    if (!fuNote.trim() && !fuNext) { setFuFor(null); return; }
    onFollowUp(id, { next: fuNext ? new Date(fuNext).toISOString() : '', type: fuType, note: fuNote.trim() });
    setFuFor(null);
  };
  const actTypes = ['Call', 'WhatsApp', 'Visit', 'Other'];
  const sourceList = Array.from(new Set(leads.map((l) => l.source).filter(Boolean))) as string[];
  const activeFilters = stageF.size + sourceF.size + (fromD || toD ? 1 : 0);
  const toggleStage = (s: string) => setStageF((prev) => { const n = new Set(prev); if (n.has(s)) n.delete(s); else n.add(s); return n; });
  const toggleSource = (s: string) => setSourceF((prev) => { const n = new Set(prev); if (n.has(s)) n.delete(s); else n.add(s); return n; });
  const clearFilters = () => { setStageF(new Set()); setSourceF(new Set()); setFromD(''); setToD(''); };
  const exportCsv = () => {
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const head = ['Name', 'Brand', 'Phone', 'Email', 'Source', 'Stage', 'Next follow-up', 'Added', 'Latest note'];
    const rows = shown.map((l) => [l.name, l.company || '', l.phone || '', l.email || '', l.source || '', stageName(l), l.nextFollowUp || '', l.at || '', (l.activity && l.activity[0]?.note) || l.note || ''].map(esc).join(','));
    const csv = [head.map(esc).join(','), ...rows].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a'); a.href = url; a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  };
  const importCsv = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = String(e.target?.result || '').split(/\r?\n/).filter((x) => x.trim());
      if (!lines.length) return;
      const split = (line: string) => { const out: string[] = []; let cur = '', inq = false; for (let i = 0; i < line.length; i++) { const c = line[i]; if (c === '"') { if (inq && line[i + 1] === '"') { cur += '"'; i++; } else inq = !inq; } else if (c === ',' && !inq) { out.push(cur); cur = ''; } else cur += c; } out.push(cur); return out; };
      const start = /name|phone|mobile/i.test(lines[0]) ? 1 : 0;
      let count = 0;
      for (let i = start; i < lines.length && count < 200; i++) {
        const c = split(lines[i]).map((x) => x.trim());
        const name = c[0] || '', phone = c[1] || '', note = c[2] || '';
        if (!name && !phone) continue;
        onAddLead(name, phone, note); count++;
      }
      alert(`${count} lead${count === 1 ? '' : 's'} add ho gaye.\n(CSV format: Name, Phone, Note)`);
    };
    reader.readAsText(file);
  };
  // Compact stage dropdown used in the list + mobile cards.
  const StageSelect = ({ l, size }: { l: PortalLead; size?: 'sm' }) => {
    const cur = stageName(l);
    const b = stageBadge(stages, cur);
    return (
      <select
        value={cur}
        onChange={(e) => onStage(l.id, e.target.value)}
        className={`appearance-none cursor-pointer rounded-full border-2 border-transparent font-bold ${b.cls} ${size === 'sm' ? 'text-[11px] px-2.5 py-1' : 'text-xs px-3 py-1.5'}`}
      >
        {stages.map((s) => <option key={s.name} value={s.name} className="bg-white text-brandDark">{s.name}</option>)}
      </select>
    );
  };

  // Shared follow-up / activity editor (used in the table, cards and pipeline).
  const fuEditor = (id: string) => (
    <div className="rounded-xl bg-brandBg/60 border-2 border-brandDark/10 p-3 grid gap-2.5">
      <div className="flex flex-wrap gap-1.5">
        {actTypes.map((t) => (
          <button key={t} type="button" onClick={() => setFuType(t)} className={`rounded-full px-3 py-1 text-xs font-bold border-2 transition ${fuType === t ? 'bg-brandDark text-white border-brandDark' : 'bg-white text-brandDark/60 border-brandDark/10'}`}>{t}</button>
        ))}
      </div>
      <input value={fuNote} onChange={(e) => setFuNote(e.target.value)} placeholder="What happened? e.g. Called — interested, wants price" className="rounded-lg border-2 border-brandDark/10 px-3 py-2 text-sm" />
      <div className="flex flex-wrap items-center gap-1.5">
        <label className="text-xs font-bold text-brandDark/50 mr-0.5">Remind me:</label>
        {([['Today 6pm', 0, 18], ['Tomorrow', 1, 10], ['In 3 days', 3, 10], ['Next week', 7, 10]] as [string, number, number][]).map(([lbl, d, h]) => (
          <button key={lbl} type="button" onClick={() => quickNext(d, h)} className="rounded-full bg-white border-2 border-brandDark/10 px-2.5 py-1 text-xs font-bold text-brandDark/70 hover:border-brandYellow">{lbl}</button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-xs font-bold text-brandDark/50">Next follow-up:</label>
        <input type="datetime-local" value={fuNext} onChange={(e) => setFuNext(e.target.value)} className="rounded-lg border-2 border-brandDark/10 px-3 py-1.5 text-sm font-semibold" />
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => setFuFor(null)} className="rounded-lg bg-brandDark/5 text-brandDark/60 text-sm font-bold px-3 py-1.5">Cancel</button>
          <button type="button" onClick={() => saveFu(id)} className="rounded-lg bg-brandDark text-white text-sm font-bold px-4 py-1.5">Save</button>
        </div>
      </div>
    </div>
  );

  if (leads.length === 0) {
    return (
      <div className="grid gap-4">
        {!adding ? (
          <>
            <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-brandDark/5 grid place-items-center text-brandDark/40"><Target className="w-8 h-8" strokeWidth={2} /></div>
              <p className="mt-3 text-lg font-black">No leads yet</p>
              <p className="mt-1 font-semibold text-brandDark/60">Jaise hi aapke ads ya website se koi enquiry aayegi, woh yahan dikhegi. Ya khud se add karein:</p>
            </div>
            <button type="button" onClick={() => setAdding(true)} className="w-full inline-flex items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-brandDark/20 text-brandDark/70 font-bold py-3 hover:bg-brandDark/5"><Plus className="w-4 h-4" strokeWidth={2.6} /> Add a lead (walk-in / phone call)</button>
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

  return (
    <div className="grid gap-4">
      {/* Toolbar: search · date range · filters · view toggle · import · export · add — like the CRM */}
      <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) importCsv(f); if (e.target) e.target.value = ''; }} />
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brandDark/40" strokeWidth={2.4} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, brand, phone, email…" className="w-full rounded-2xl bg-white border-2 border-brandDark/10 pl-10 pr-4 py-2.5 text-sm font-semibold outline-none focus:border-brandYellow transition" />
        </div>
        {/* Date range */}
        <div className="relative">
          <button type="button" onClick={() => setMenu((m) => (m === 'dates' ? 'none' : 'dates'))} className={`inline-flex items-center gap-1.5 rounded-2xl bg-white border-2 px-3.5 py-2.5 text-sm font-bold transition ${fromD || toD ? 'border-brandYellow text-brandDark' : 'border-brandDark/10 text-brandDark/70'}`}><CalendarRange className="w-4 h-4" strokeWidth={2.2} /> Date Range</button>
          {menu === 'dates' && (
            <div className="absolute right-0 z-30 mt-2 w-64 rounded-2xl bg-white border-2 border-brandDark/10 shadow-3xl p-3 grid gap-2">
              <label className="text-xs font-bold text-brandDark/55">From<input type="date" value={fromD} onChange={(e) => setFromD(e.target.value)} className="mt-1 w-full rounded-lg border-2 border-brandDark/10 px-2 py-1.5 text-sm font-semibold" /></label>
              <label className="text-xs font-bold text-brandDark/55">To<input type="date" value={toD} onChange={(e) => setToD(e.target.value)} className="mt-1 w-full rounded-lg border-2 border-brandDark/10 px-2 py-1.5 text-sm font-semibold" /></label>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => { setFromD(''); setToD(''); }} className="flex-1 rounded-lg bg-brandDark/5 text-brandDark/60 text-sm font-bold py-1.5">Clear</button>
                <button type="button" onClick={() => setMenu('none')} className="flex-1 rounded-lg bg-brandDark text-white text-sm font-bold py-1.5">Done</button>
              </div>
            </div>
          )}
        </div>
        {/* Filters */}
        <div className="relative">
          <button type="button" onClick={() => setMenu((m) => (m === 'filters' ? 'none' : 'filters'))} className={`inline-flex items-center gap-1.5 rounded-2xl bg-white border-2 px-3.5 py-2.5 text-sm font-bold transition ${activeFilters > 0 ? 'border-brandYellow text-brandDark' : 'border-brandDark/10 text-brandDark/70'}`}><SlidersHorizontal className="w-4 h-4" strokeWidth={2.2} /> Filters{activeFilters > 0 ? ` (${activeFilters})` : ''}</button>
          {menu === 'filters' && (
            <div className="absolute right-0 z-30 mt-2 w-64 rounded-2xl bg-white border-2 border-brandDark/10 shadow-3xl p-3 grid gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-brandDark/45 mb-1.5">Stage</p>
                <div className="grid gap-1">
                  {stages.map((s) => (
                    <label key={s.name} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                      <input type="checkbox" checked={stageF.has(s.name)} onChange={() => toggleStage(s.name)} className="accent-brandDark" /> {s.name}
                      <span className="ml-auto text-brandDark/40">{leads.filter((l) => stageName(l) === s.name).length}</span>
                    </label>
                  ))}
                </div>
              </div>
              {sourceList.length > 0 && (
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-brandDark/45 mb-1.5">Source</p>
                  <div className="grid gap-1 max-h-32 overflow-y-auto">
                    {sourceList.map((s) => (
                      <label key={s} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                        <input type="checkbox" checked={sourceF.has(s)} onChange={() => toggleSource(s)} className="accent-brandDark" /> <span className="truncate">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <button type="button" onClick={clearFilters} className="flex-1 rounded-lg bg-brandDark/5 text-brandDark/60 text-sm font-bold py-1.5">Clear all</button>
                <button type="button" onClick={() => setMenu('none')} className="flex-1 rounded-lg bg-brandDark text-white text-sm font-bold py-1.5">Done</button>
              </div>
            </div>
          )}
        </div>
        {/* List / Pipeline */}
        <div className="flex items-center rounded-2xl bg-white border-2 border-brandDark/10 p-1">
          <button type="button" onClick={() => setView('list')} className={`rounded-xl px-3 py-1.5 text-sm font-bold transition ${view === 'list' ? 'bg-brandDark text-white' : 'text-brandDark/55'}`}>List</button>
          <button type="button" onClick={() => setView('pipeline')} className={`rounded-xl px-3 py-1.5 text-sm font-bold transition ${view === 'pipeline' ? 'bg-brandDark text-white' : 'text-brandDark/55'}`}>Pipeline</button>
        </div>
        {/* Import / Export */}
        <button type="button" onClick={() => fileRef.current?.click()} title="Import leads from CSV" className="inline-flex items-center gap-1.5 rounded-2xl bg-white border-2 border-brandDark/10 text-brandDark/70 font-bold px-3.5 py-2.5 text-sm"><Upload className="w-4 h-4" strokeWidth={2.2} /> Import</button>
        <button type="button" onClick={exportCsv} title="Export leads to CSV" className="inline-flex items-center gap-1.5 rounded-2xl bg-white border-2 border-brandDark/10 text-brandDark/70 font-bold px-3.5 py-2.5 text-sm"><Download className="w-4 h-4" strokeWidth={2.2} /> Export</button>
        {/* Add */}
        <button type="button" onClick={() => setAdding((a) => !a)} className="inline-flex items-center gap-1.5 rounded-2xl bg-brandYellow text-brandDark font-black px-4 py-2.5 text-sm shadow-glow"><Plus className="w-4 h-4" strokeWidth={2.6} /> Add New Lead</button>
      </div>
      {adding && (
        <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-4 grid gap-2 sm:grid-cols-3">
          <input value={nm} onChange={(e) => setNm(e.target.value)} placeholder="Name" className="rounded-xl border-2 border-brandDark/10 px-3 py-2 text-sm font-semibold" />
          <input value={ph} onChange={(e) => setPh(e.target.value)} placeholder="Phone number" inputMode="tel" className="rounded-xl border-2 border-brandDark/10 px-3 py-2 text-sm font-semibold" />
          <input value={nt} onChange={(e) => setNt(e.target.value)} placeholder="Note (optional)" className="rounded-xl border-2 border-brandDark/10 px-3 py-2 text-sm" />
          <div className="flex gap-2 sm:col-span-3">
            <button type="button" onClick={submitAdd} className="rounded-xl bg-brandDark text-white text-sm font-bold px-4 py-2">Add lead</button>
            <button type="button" onClick={() => setAdding(false)} className="rounded-xl bg-brandDark/5 text-brandDark/60 text-sm font-bold px-4 py-2">Cancel</button>
          </div>
        </div>
      )}
      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard n={leads.length} label="Total leads" />
        <KpiCard n={newCount} label="New to call" tone="yellow" />
        <KpiCard n={wonCount} label="Converted" tone="emerald" />
        <KpiCard n={`${leads.length ? Math.round((wonCount / leads.length) * 100) : 0}%`} label="Conversion rate" />
      </div>
      {activeFilters > 0 && (
        <div className="flex items-center gap-2 text-xs font-bold text-brandDark/50">
          <span>Showing {shown.length} of {leads.length}</span>
          <button type="button" onClick={clearFilters} className="rounded-full bg-brandDark/5 px-2.5 py-1 hover:bg-brandDark/10">Clear filters ✕</button>
        </div>
      )}
      {view === 'list' && (
      <>
      <ul className="md:hidden grid gap-3">
        {shown.map((l) => {
          const b = stageBadge(stages, stageName(l));
          const digits = (l.phone || '').replace(/[^0-9]/g, '');
          const fs = fuState(l);
          const last = l.activity && l.activity[0];
          return (
            <li key={l.id} className={`rounded-3xl bg-white border-2 p-4 ${fuTone(fs).card}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-black truncate">{l.name}</p>
                  {l.company && <p className="text-sm font-semibold text-brandDark/60 truncate">{l.company}</p>}
                  <p className="text-xs font-semibold text-brandDark/45">
                    {l.source ? `${l.source}` : 'Enquiry'}
                    {l.at ? ` · ${new Date(l.at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : ''}
                  </p>
                </div>
                <span className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${b.cls}`}><span className={`h-1.5 w-1.5 rounded-full ${b.dot}`} />{b.text}</span>
              </div>
              {fs && (
                <button type="button" onClick={() => openFu(l)} className={`mt-2 inline-flex items-center gap-1.5 rounded-lg text-xs font-bold px-2 py-1 ${fuTone(fs).pill}`}><Clock className="w-3.5 h-3.5" strokeWidth={2.4} /> {fs === 'today' ? 'Follow-up today' : fs === 'overdue' ? 'Follow-up overdue' : `Next: ${fuLabel(l.nextFollowUp)}`}</button>
              )}
              {!fs && l.status === 'New Lead' && daysAgo(l.at) >= 1 && (
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-rose-100 text-rose-800 text-xs font-bold px-2 py-1"><Clock className="w-3.5 h-3.5" strokeWidth={2.4} /> {daysAgo(l.at)} din purana — aaj hi call karein!</p>
              )}
              {needsStep(l) && !(l.status === 'New Lead' && daysAgo(l.at) >= 1) && (
                <button type="button" onClick={() => openFu(l)} className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-amber-100 text-amber-800 ring-1 ring-amber-300 text-xs font-bold px-2 py-1"><Clock className="w-3.5 h-3.5" strokeWidth={2.4} /> Set next step</button>
              )}
              {last ? <p className="mt-2 text-sm text-brandDark/70"><span className="font-bold">{last.type}:</span> {last.note}</p> : l.note ? <p className="mt-2 text-sm text-brandDark/70">{l.note}</p> : null}
              {(l.phone || l.email) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {l.phone && (
                    <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1.5 rounded-xl bg-brandDark text-white text-sm font-bold px-4 py-2"><Phone className="w-4 h-4" strokeWidth={2.4} /> Call</a>
                  )}
                  {digits && (
                    <a href={`https://wa.me/${digits.length === 10 ? '91' + digits : digits}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 text-white text-sm font-bold px-4 py-2"><MessageCircle className="w-4 h-4" strokeWidth={2.4} /> WhatsApp</a>
                  )}
                  {l.email && (
                    <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1.5 rounded-xl bg-white border-2 border-brandDark/15 text-brandDark text-sm font-bold px-4 py-2"><Mail className="w-4 h-4" strokeWidth={2.4} /> Email</a>
                  )}
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-brandDark/5 pt-3">
                <span className="text-xs font-bold text-brandDark/50">Stage:</span>
                <StageSelect l={l} />
                <button type="button" onClick={() => openFu(l)} className="ml-auto inline-flex items-center gap-1.5 rounded-xl bg-white border-2 border-brandDark/15 text-brandDark/70 text-sm font-bold px-3 py-1.5"><PenLine className="w-4 h-4" strokeWidth={2.4} /> Log / Follow-up</button>
              </div>
              {fuFor === l.id && <div className="mt-2.5">{fuEditor(l.id)}</div>}
            </li>
          );
        })}
      </ul>

      {/* Desktop: CRM-style table */}
      <div className="hidden md:block overflow-hidden rounded-2xl border-2 border-brandDark/10 bg-white shadow-card">
        <table className="min-w-full">
          <thead className="bg-brandDark/[0.03] border-b-2 border-brandDark/10">
            <tr className="text-left text-[11px] font-black uppercase tracking-wider text-brandDark/45">
              <th className="px-4 py-3">Name &amp; Brand</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Latest activity</th>
              <th className="px-4 py-3">Next follow-up</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brandDark/5">
            {shown.map((l) => {
              const digits = (l.phone || '').replace(/[^0-9]/g, '');
              const wa = digits.length === 10 ? '91' + digits : digits;
              const fs = fuState(l);
              const last = l.activity && l.activity[0];
              const ActIcon = last?.type === 'Call' ? Phone : last?.type === 'WhatsApp' ? MessageCircle : last?.type === 'Email' ? Mail : PenLine;
              const tone = fuTone(fs);
              const accent = `border-l-[3px] ${tone.accent}`;
              const rowBg = tone.row;
              return (
                <React.Fragment key={l.id}>
                  <tr className={`${rowBg} transition-colors align-top`}>
                    {/* Name & Brand */}
                    <td className={`px-4 py-3 ${accent}`}>
                      <p className="font-black text-sm text-brandDark">{l.name}</p>
                      {l.company && <p className="text-xs font-semibold text-brandDark/60">{l.company}</p>}
                      {l.phone && <p className="text-[11px] font-semibold text-brandDark/40 tabular-nums">{l.phone}</p>}
                      <p className="text-[10px] font-semibold text-brandDark/30">{l.at ? new Date(l.at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</p>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3"><StageSelect l={l} size="sm" /></td>
                    {/* Latest activity */}
                    <td className="px-4 py-3">
                      {last ? (
                        <div className="max-w-[260px]">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-brandDark/70">
                            <ActIcon className="w-3.5 h-3.5" strokeWidth={2.4} />
                            <span>{last.type}</span>
                            <span className="rounded bg-brandDark/5 px-1.5 py-0.5 text-[10px] font-semibold text-brandDark/45">{timeAgo(last.at)}</span>
                          </div>
                          <div className="mt-1 rounded-lg bg-brandDark/[0.03] border border-brandDark/[0.06] px-2 py-1.5">
                            <p className="line-clamp-2 text-xs italic text-brandDark/70" title={last.note}>&ldquo;{last.note}&rdquo;</p>
                          </div>
                        </div>
                      ) : l.note ? (
                        <p className="max-w-[240px] truncate text-xs italic text-brandDark/55" title={l.note}>&ldquo;{l.note}&rdquo;</p>
                      ) : <span className="text-brandDark/30 text-xs italic">No activity logged</span>}
                    </td>
                    {/* Next follow-up */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      {l.nextFollowUp ? (
                        <button type="button" onClick={() => openFu(l)} title="Reschedule" className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-black uppercase tracking-wide ${tone.pill}`}>
                          {fs === 'today' ? 'Today' : fs === 'overdue' ? `Overdue (${new Date(l.nextFollowUp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })})` : fuLabel(l.nextFollowUp)}
                        </button>
                      ) : isOpenLead(l) ? (
                        <button type="button" onClick={() => openFu(l)} title="Set next step" className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-black uppercase tracking-wide bg-amber-100 text-amber-800 ring-1 ring-amber-300 hover:bg-amber-200"><Clock className="w-3 h-3" strokeWidth={2.6} /> Set step</button>
                      ) : <span className="text-brandDark/25 text-sm">—</span>}
                    </td>
                    {/* Source */}
                    <td className="px-4 py-3 text-sm font-semibold text-brandDark/70 whitespace-nowrap">{l.source || 'Enquiry'}</td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {l.phone && <a href={`tel:${l.phone}`} title="Call" className="grid place-items-center h-8 w-8 rounded-lg bg-brandDark text-white hover:brightness-110 transition"><Phone className="w-4 h-4" strokeWidth={2.4} /></a>}
                        {digits && <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="grid place-items-center h-8 w-8 rounded-lg bg-emerald-500 text-white hover:brightness-110 transition"><MessageCircle className="w-4 h-4" strokeWidth={2.4} /></a>}
                        {l.email && <a href={`mailto:${l.email}`} title="Email" className="grid place-items-center h-8 w-8 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 transition"><Mail className="w-4 h-4" strokeWidth={2.4} /></a>}
                        <button type="button" onClick={() => openFu(l)} title="Log / Follow-up" className={`grid place-items-center h-8 w-8 rounded-lg border-2 transition ${fuFor === l.id ? 'bg-brandDark text-white border-brandDark' : 'bg-violet-100 text-violet-700 border-transparent hover:bg-violet-200'}`}><PenLine className="w-4 h-4" strokeWidth={2.4} /></button>
                      </div>
                    </td>
                  </tr>
                  {fuFor === l.id && (
                    <tr className={rowBg}>
                      <td colSpan={6} className="px-4 pb-3 pt-0">{fuEditor(l.id)}</td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {shown.length === 0 && (
        <div className="rounded-2xl bg-white border-2 border-dashed border-brandDark/15 p-8 text-center text-sm font-semibold text-brandDark/50">
          {ql ? `No leads match "${q}".` : 'No leads in this filter.'}
        </div>
      )}
      </>
      )}

      {/* Pipeline (Kanban) view */}
      {view === 'pipeline' && (
        <div className="overflow-x-auto pb-2 -mx-1 px-1">
          <div className="flex gap-4 min-w-max">
            {stages.map((st) => {
              const col = searched.filter((l) => stageName(l) === st.name);
              const bb = stageBadge(stages, st.name);
              return (
                <div
                  key={st.name}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(st.name); }}
                  onDragLeave={() => setDragOver((d) => (d === st.name ? null : d))}
                  onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData('leadId'); if (id) onStage(id, st.name); setDragOver(null); }}
                  className={`w-[280px] shrink-0 rounded-2xl p-3 transition ${dragOver === st.name ? 'bg-brandYellow/15 ring-2 ring-brandYellow' : 'bg-brandDark/[0.03]'}`}
                >
                  <div className="flex items-center justify-between px-1 pb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-sm font-black text-brandDark/70"><span className={`h-2 w-2 rounded-full ${bb.dot}`} />{st.name}</span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-brandDark/55">{col.length}</span>
                  </div>
                  <div className="grid gap-2">
                    {col.map((l) => {
                      const digits = (l.phone || '').replace(/[^0-9]/g, '');
                      const wa = digits.length === 10 ? '91' + digits : digits;
                      const fs = fuState(l);
                      return (
                        <div key={l.id} draggable onDragStart={(e) => e.dataTransfer.setData('leadId', l.id)} className="rounded-xl bg-white border-2 border-brandDark/10 p-3 cursor-grab active:cursor-grabbing shadow-sm">
                          <p className="font-black text-sm truncate">{l.name}</p>
                          {l.phone && <p className="text-xs font-semibold text-brandDark/50 tabular-nums">{l.phone}</p>}
                          <p className="text-[11px] font-semibold text-brandDark/40 mt-0.5">{l.source || 'Enquiry'}</p>
                          {fs ? <p className={`mt-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${fuTone(fs).pill}`}><Clock className="w-3 h-3" strokeWidth={2.4} /> {fs === 'today' ? 'Today' : fs === 'overdue' ? 'Overdue' : fuLabel(l.nextFollowUp)}</p> : needsStep(l) ? <button type="button" onClick={() => openFu(l)} className="mt-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 ring-1 ring-amber-300"><Clock className="w-3 h-3" strokeWidth={2.4} /> Set step</button> : null}
                          <div className="mt-2 flex gap-1.5">
                            {l.phone && <a href={`tel:${l.phone}`} title="Call" className="grid place-items-center h-7 w-7 rounded-lg bg-brandDark text-white"><Phone className="w-3.5 h-3.5" strokeWidth={2.4} /></a>}
                            {digits && <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="grid place-items-center h-7 w-7 rounded-lg bg-emerald-500 text-white"><MessageCircle className="w-3.5 h-3.5" strokeWidth={2.4} /></a>}
                            <button type="button" onClick={() => openFu(l)} title="Log / Follow-up" className="grid place-items-center h-7 w-7 rounded-lg bg-white border-2 border-brandDark/15 text-brandDark/70"><PenLine className="w-3.5 h-3.5" strokeWidth={2.4} /></button>
                          </div>
                          {fuFor === l.id && <div className="mt-2">{fuEditor(l.id)}</div>}
                        </div>
                      );
                    })}
                    {col.length === 0 && <p className="text-xs text-brandDark/30 text-center py-6">—</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
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
  const waitingCount = plans.filter(needsApproval).length;

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5">
          <button type="button" onClick={() => shift(-1)} className="w-10 h-10 rounded-xl bg-white border-2 border-brandDark/10 font-black" aria-label="Previous month">‹</button>
          <button type="button" onClick={() => shift(1)} className="w-10 h-10 rounded-xl bg-white border-2 border-brandDark/10 font-black" aria-label="Next month">›</button>
        </div>
        <h2 className="text-xl font-black">{filter === 'approve' ? 'Needs your approval' : label}</h2>
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => setFilter('approve')} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold border-2 ${filter === 'approve' ? 'bg-brandDark text-white border-brandDark' : waitingCount > 0 ? 'bg-brandYellow/25 border-brandYellow text-brandDark' : 'bg-white border-brandDark/10 text-brandDark/60'}`}><Clock className="w-3.5 h-3.5" strokeWidth={2.4} /> Needs approval {waitingCount}</button>
          <button type="button" onClick={() => setFilter('all')} className={`rounded-full px-3.5 py-1.5 text-sm font-bold border-2 ${filter === 'all' ? 'bg-brandDark text-white border-brandDark' : 'bg-white border-brandDark/10 text-brandDark/60'}`}>All {plans.filter((p) => p.date.startsWith(month)).length}</button>
        </div>
      </div>
      {list.length === 0 && (
        <p className="rounded-3xl bg-white border-2 border-brandDark/10 p-6 text-center font-semibold text-brandDark/60">
          {filter === 'approve' ? '🎉 Nothing waiting. All caught up!' : 'Nothing planned this month yet.'}
        </p>
      )}
      <div className="grid gap-3">
        {list.map((p) => (
          <PlanCard key={p.id} p={p} todayKey={todayKey} onAct={onAct} />
        ))}
      </div>
    </div>
  );
}

function PlanCard({ p, todayKey, onAct }: { p: PortalPlan; todayKey: string; onAct: (id: string, patch: Partial<PortalPlan>) => void }) {
  const [mode, setMode] = useState<'idle' | 'change'>('idle');
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const b = badge(p);
  const canAct = isContent(p.kind) && (p.status === 'Idea' || p.status === 'Making');
  const need = needsApproval(p);
  const d = new Date(`${p.date}T00:00`);
  const dayNum = d.getDate();
  const wd = d.toLocaleDateString('en-IN', { weekday: 'short' });
  const isToday = p.date === todayKey;

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
    <div className={`rounded-2xl border-2 p-4 ${need ? 'bg-brandYellow/[0.06] border-brandYellow' : 'bg-white border-brandDark/10'}`}>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="w-11 text-center shrink-0">
          <p className={`text-xl font-black leading-none ${isToday ? 'text-emerald-600' : ''}`}>{dayNum}</p>
          <p className="text-[10px] font-bold text-brandDark/45 uppercase mt-0.5">{isToday ? 'Today' : wd}</p>
        </div>
        <span className="grid place-items-center h-14 w-14 rounded-xl bg-gradient-to-br from-brandSurface to-brandDark text-2xl shrink-0">{EMOJI[p.kind] || '📌'}</span>
        <div className="flex-1 min-w-[150px]">
          <p className="font-black leading-snug">{p.title}</p>
          <p className="text-xs text-brandDark/50">
            {p.kind}
            {p.platforms.length && isContent(p.kind) ? ` · ${p.platforms.join(', ')}` : ''}
            {p.time ? ` · ${time12(p.time)}` : ''}
          </p>
          <span className={`mt-1.5 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${b.cls}`}>{b.text}</span>
        </div>
        <div className="flex flex-wrap gap-2 ml-auto">
          {p.previewUrl && (
            <a href={p.previewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-white border-2 border-brandDark/15 px-3.5 py-2 text-sm font-bold"><ExternalLink className="w-4 h-4" strokeWidth={2.4} /> See design</a>
          )}
          {canAct && mode === 'idle' && (
            <>
              <button type="button" disabled={busy} onClick={() => send('approve')} className="inline-flex items-center gap-1.5 rounded-xl bg-brandYellow text-brandDark px-4 py-2 text-sm font-bold disabled:opacity-50"><Check className="w-4 h-4" strokeWidth={2.6} /> {busy ? '…' : 'Approve'}</button>
              <button type="button" disabled={busy} onClick={() => setMode('change')} className="inline-flex items-center gap-1.5 rounded-xl bg-white border-2 border-brandDark/15 text-brandDark px-4 py-2 text-sm font-bold"><PenLine className="w-4 h-4" strokeWidth={2.4} /> Request change</button>
            </>
          )}
        </div>
      </div>
      {p.clientComment && (
        <p className="mt-3 rounded-xl bg-brandBg px-3 py-2 text-sm">
          <b>Your note:</b> {p.clientComment}
        </p>
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
  const totalBilled = data.invoices.reduce((a, i) => a + i.total, 0);
  const totalPaid = data.invoices.reduce((a, i) => a + i.paid, 0);
  const totalDue = data.invoices.reduce((a, i) => a + Math.max(0, i.due), 0);
  const upi = (amount: number, number: string) =>
    `upi://pay?pa=${encodeURIComponent(data.upiId)}&pn=${encodeURIComponent('Techinfigo')}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(`Invoice ${number}`)}`;
  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-black">Payments</h2>
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white border-2 border-brandDark/10 p-4"><p className="text-xs font-bold text-brandDark/50">Total billed</p><p className="text-2xl font-black mt-0.5">{inr(totalBilled)}</p></div>
        <div className="rounded-2xl bg-emerald-100 p-4"><p className="text-xs font-bold text-emerald-700">Paid</p><p className="text-2xl font-black text-emerald-700 mt-0.5">{inr(totalPaid)}</p></div>
        <div className="rounded-2xl bg-brandDark text-brandBg p-4"><p className="text-xs font-bold text-brandYellow">Due now</p><p className="text-2xl font-black mt-0.5">{inr(totalDue)}</p></div>
      </div>
      {list.length === 0 && <p className="rounded-3xl bg-white border-2 border-brandDark/10 p-6 text-center font-semibold text-brandDark/60">No invoices yet.</p>}
      <div className="grid gap-3">
        {list.map((i) => {
          const paid = i.due <= 0.5;
          return (
            <div key={i.id} className={`rounded-2xl border-2 p-4 flex flex-wrap items-center gap-4 ${paid ? 'bg-white border-brandDark/10' : 'bg-red-50/40 border-red-200'}`}>
              <div className="flex-1 min-w-[180px]">
                <p className="font-black text-sm">Invoice {i.number}</p>
                <p className="text-xs text-brandDark/50">{i.issueDate ? (paid ? `Paid · ${niceDay(i.issueDate)}` : niceDay(i.issueDate)) : ''}{!paid && i.dueDate ? ` · due ${niceDay(i.dueDate)}` : ''}</p>
              </div>
              <p className="font-black text-lg whitespace-nowrap">{inr(i.total)}</p>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${paid ? 'bg-emerald-100 text-emerald-800' : i.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-brandYellow/30 text-brandDark'}`}>
                {paid ? <><Check className="w-3.5 h-3.5" strokeWidth={2.6} /> Paid</> : <><span className="h-1.5 w-1.5 rounded-full bg-current" /> {i.status === 'Overdue' ? 'Overdue' : 'Due'}</>}
              </span>
              {!paid && data.upiId && (
                <a href={upi(i.due, i.number)} className="inline-flex items-center gap-1.5 rounded-xl bg-brandYellow text-brandDark font-black px-4 py-2.5 text-sm"><CreditCard className="w-4 h-4" strokeWidth={2.4} /> Pay with UPI</a>
              )}
            </div>
          );
        })}
      </div>
      {data.upiId && <p className="text-center text-xs text-brandDark/50">UPI ID: <b>{data.upiId}</b> · Payment ke baad screenshot WhatsApp kar dijiye 🙏</p>}
    </div>
  );
}

/* ------------------------------------------------------------ documents */

function DocsTab({ data }: { data: PortalSnapshot }) {
  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-black">Documents</h2>
      {data.docs.length === 0 && <p className="rounded-3xl bg-white border-2 border-brandDark/10 p-6 text-center font-semibold text-brandDark/60">No documents yet. Proposals, agreements and reports will show here.</p>}
      <div className="grid gap-3">
        {data.docs.map((d, i) => (
          <div key={i} className="flex items-center gap-4 rounded-2xl bg-white border-2 border-brandDark/10 p-4">
            <span className="grid place-items-center h-11 w-11 rounded-xl bg-brandYellow/20 text-brandDark shrink-0"><FileText className="w-5 h-5" strokeWidth={2.2} /></span>
            <div className="flex-1 min-w-0">
              <p className="font-black text-sm truncate">{d.title}</p>
              {d.date && <p className="text-xs text-brandDark/50">{niceDay(d.date)}</p>}
            </div>
            <a href={d.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-brandDark text-white text-sm font-bold px-4 py-2 shrink-0"><ExternalLink className="w-4 h-4" strokeWidth={2.4} /> View</a>
            <a href={d.url} download target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-white border-2 border-brandDark/15 text-brandDark/70 text-sm font-bold px-3 py-2 shrink-0"><Download className="w-4 h-4" strokeWidth={2.4} /></a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ integrations */

function IntegrationsTab({ data, webhookToken }: { data: PortalSnapshot; webhookToken?: string }) {
  const [copied, setCopied] = useState(false);
  const [copiedMail, setCopiedMail] = useState(false);
  const hookUrl = webhookToken ? `https://www.techinfigo.com/api/hooks/in/${webhookToken}` : '';
  const leadEmail = webhookToken ? `leads+${webhookToken}@techinfigo.com` : '';
  const copy = async () => { try { await navigator.clipboard.writeText(hookUrl); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ } };
  const copyMail = async () => { try { await navigator.clipboard.writeText(leadEmail); setCopiedMail(true); setTimeout(() => setCopiedMail(false), 1500); } catch { /* ignore */ } };
  const apps: { name: string; desc: string; badge: string }[] = [
    { name: 'Instagram', desc: 'Let us post, run ads and pull insights from your Instagram.', badge: 'IG' },
    { name: 'Google Business Profile', desc: 'Manage reviews and Google Maps posts.', badge: 'G' },
    { name: 'WhatsApp Business', desc: 'Auto-reply and chat with leads in one place.', badge: 'W' },
  ];
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-2xl font-black">Capture leads &amp; connect accounts</h2>
        <p className="text-sm font-medium text-brandDark/55">Send every enquiry from your website and ads straight into your Leads — automatically.</p>
      </div>

      {/* Lead capture webhook */}
      <div className="rounded-3xl bg-brandDark text-brandBg p-5 sm:p-6 shadow-xl">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brandYellow"><Blocks className="w-4 h-4" strokeWidth={2.4} /> Your lead-capture link (webhook)</p>
        <p className="mt-1.5 font-medium text-brandBg/60 text-sm">Paste this link into your website form tool or your Meta Lead Ads (via Zapier). Every new lead lands here on its own.</p>
        {hookUrl ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <code className="flex-1 min-w-0 truncate rounded-xl bg-brandSurface/80 ring-1 ring-brandBg/10 px-3 py-2.5 text-sm text-brandBg">{hookUrl}</code>
            <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-xl bg-brandYellow text-brandDark font-black px-4 py-2.5 text-sm shrink-0">{copied ? <><Check className="w-4 h-4" strokeWidth={2.6} /> Copied</> : <><Download className="w-4 h-4" strokeWidth={2.4} /> Copy link</>}</button>
          </div>
        ) : (
          <p className="mt-3 rounded-xl bg-brandSurface/80 px-3 py-2.5 text-sm text-brandBg/70">Your link is being set up — refresh in a moment, or <a className="underline font-bold" href={whatsappUrl('Namaste, mujhe apna lead-capture webhook link chahiye.')} target="_blank" rel="noopener noreferrer">WhatsApp us</a>.</p>
        )}
      </div>

      {/* How to use it */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white border-2 border-brandDark/10 p-4">
          <p className="flex items-center gap-2 font-black"><span className="grid place-items-center h-8 w-8 rounded-lg bg-brandDark text-brandYellow text-sm">🌐</span> Website form</p>
          <p className="mt-2 text-sm text-brandDark/60">In your form tool (WordPress, Elementor, Shopify, etc.) add a <b>Webhook</b> action and paste the link above. Send <b>name</b>, <b>phone</b>, <b>email</b>.</p>
        </div>
        <div className="rounded-2xl bg-white border-2 border-brandDark/10 p-4">
          <p className="flex items-center gap-2 font-black"><span className="grid place-items-center h-8 w-8 rounded-lg bg-brandDark text-brandYellow text-sm">f</span> Meta (FB / Instagram) ads</p>
          <p className="mt-2 text-sm text-brandDark/60">In <b>Zapier</b>: Facebook Lead Ads → <b>Webhooks POST</b> → paste the link above. Your ad leads arrive here instantly. Need help? <a className="font-bold underline" href={whatsappUrl('Namaste, Meta ads ko mere portal se connect karna hai.')} target="_blank" rel="noopener noreferrer">WhatsApp us</a>.</p>
        </div>
      </div>

      {/* Listing-site leads by email */}
      <div className="rounded-3xl bg-white border-2 border-brandDark/10 p-5 sm:p-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brandDark/45"><Mail className="w-4 h-4" strokeWidth={2.4} /> Leads from IndiaMART, JustDial, 99acres, MagicBricks</p>
        <p className="mt-1.5 font-medium text-brandDark/60 text-sm">These sites email you every lead. Forward those emails to the address below and each one becomes a lead here automatically — name, phone and all.</p>
        {leadEmail ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <code className="flex-1 min-w-0 truncate rounded-xl bg-brandDark/5 ring-1 ring-brandDark/10 px-3 py-2.5 text-sm text-brandDark">{leadEmail}</code>
            <button type="button" onClick={copyMail} className="inline-flex items-center gap-1.5 rounded-xl bg-brandYellow text-brandDark font-black px-4 py-2.5 text-sm shrink-0">{copiedMail ? <><Check className="w-4 h-4" strokeWidth={2.6} /> Copied</> : <><Download className="w-4 h-4" strokeWidth={2.4} /> Copy address</>}</button>
          </div>
        ) : (
          <p className="mt-3 rounded-xl bg-brandDark/5 px-3 py-2.5 text-sm text-brandDark/60">Being set up — refresh in a moment.</p>
        )}
        <p className="mt-3 text-xs text-brandDark/55">Set your lead email to auto-forward here, or add this address as a lead/CC recipient in your IndiaMART, JustDial, 99acres or MagicBricks account. Want us to set it up? <a className="font-bold underline" href={whatsappUrl('Namaste, mujhe listing-site leads (IndiaMART/JustDial/99acres/MagicBricks) portal se connect karni hain.')} target="_blank" rel="noopener noreferrer">WhatsApp us</a>.</p>
      </div>

      {/* Other accounts */}
      <div>
        <p className="font-black text-sm text-brandDark/70 mb-2">Connect your accounts (we set these up for you)</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {apps.map((a) => (
            <div key={a.name} className="rounded-2xl bg-white border-2 border-brandDark/10 p-4 flex items-center gap-4">
              <span className="grid place-items-center h-11 w-11 rounded-xl bg-brandDark text-brandYellow font-black text-sm shrink-0">{a.badge}</span>
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm">{a.name}</p>
                <p className="text-xs text-brandDark/55">{a.desc}</p>
              </div>
              <a href={whatsappUrl(`Namaste, main apne ${a.name} ko ${data.business || 'portal'} se connect karna chahta hoon.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-brandYellow text-brandDark text-sm font-bold px-4 py-2 shrink-0"><Plus className="w-4 h-4" strokeWidth={2.6} /> Connect</a>
            </div>
          ))}
        </div>
      </div>
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
