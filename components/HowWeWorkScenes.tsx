import React from 'react';
import {
  Camera,
  Check,
  Globe,
  Lightbulb,
  MapPin,
  Megaphone,
  MessageCircle,
  Rocket,
  Search,
  X,
} from 'lucide-react';
import { PlayInView } from './PlayInView';

/**
 * Animated pictures for the four steps on How We Work (styles: `.hw1-*` …
 * `.hw4-*` in globals.css). Same idea as the service cards: two panels, one
 * short story per step, looping while on screen. All names and numbers are
 * sample UI.
 */

const panel = 'rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(0,29,33,0.35)] border border-brandDark/5 p-3 sm:p-4 flex flex-col min-w-0';
const title = 'text-[10px] sm:text-[11px] font-black text-brandDark uppercase tracking-wider';
const wrap = 'w-full max-w-lg h-[260px] grid gap-3 text-left font-sans';

/** Progress ring, `pct` of the circle filled via the given animation class. */
function Ring({ cls, children }: { cls: string; children: React.ReactNode }) {
  return (
    <div className="relative w-[84px] h-[84px] shrink-0">
      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
        <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(0,29,33,0.08)" strokeWidth="3.5" />
        <circle className={cls} cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="butt" pathLength={100} strokeDasharray="100" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/* 1. Free health check: we check each channel, then send a report. */
export function HealthCheckScene() {
  const rows = [
    { label: 'Website', Icon: Globe, ok: false },
    { label: 'Google profile', Icon: MapPin, ok: false },
    { label: 'Instagram', Icon: Camera, ok: true },
    { label: 'Ads', Icon: Megaphone, ok: false },
  ];
  const fixes = ['Add a WhatsApp button', 'Add Google photos', 'Track ad enquiries'];
  return (
    <PlayInView>
      <div className={`${wrap} grid-cols-[46%_1fr]`}>
        <div className={panel}>
          <p className={title}>Checking your business</p>
          <ul className="mt-3 flex-1 flex flex-col justify-between">
            {rows.map((r, i) => (
              <li key={r.label} className="flex items-center gap-2 min-w-0">
                <span className="w-7 h-7 rounded-lg bg-brandBg text-brandDark flex items-center justify-center shrink-0">
                  <r.Icon className="w-3.5 h-3.5" />
                </span>
                <span className="flex-1 text-[10.5px] font-bold text-brandDark truncate">{r.label}</span>
                <span className="relative w-5 h-5 shrink-0">
                  <span className={`hw1-spin hw1-spin-${i} absolute inset-0 rounded-full border-2 border-brandDark/15 border-t-brandYellow`} />
                  <span className={`hw1-res hw1-res-${i} absolute inset-0 rounded-full flex items-center justify-center ${r.ok ? 'bg-emerald-500' : 'bg-red-500'} text-white`}>
                    {r.ok ? <Check className="w-3 h-3" strokeWidth={4} /> : <X className="w-3 h-3" strokeWidth={4} />}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={panel}>
          <p className={title}>Your health check</p>
          <div className="mt-2 flex items-center gap-3">
            <div className="text-red-500"><Ring cls="hw1-ring"><span className="hw1-score text-[17px] font-black text-brandDark">38</span></Ring></div>
            <p className="hw1-score text-[10px] font-bold text-brandDark/60 leading-snug">out of 100<br /><span className="text-red-600">Losing enquiries</span></p>
          </div>
          <ul className="mt-2 space-y-1">
            {fixes.map((f, i) => (
              <li key={f} className={`hw1-fix hw1-fix-${i} flex items-center gap-1.5 text-[10px] font-semibold text-brandDark`}>
                <span className="w-4 h-4 rounded-full bg-brandYellow text-brandDark text-[8px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                <span className="truncate">{f}</span>
              </li>
            ))}
          </ul>
          <p className="hw1-sent mt-auto rounded-lg bg-[#25D366] text-white text-[9.5px] font-black py-1.5 flex items-center justify-center gap-1">
            <MessageCircle className="w-3 h-3" /> Sent to you on WhatsApp
          </p>
        </div>
      </div>
    </PlayInView>
  );
}

/* 2. Fix the basics: each problem flips to fixed, the score climbs. */
export function FixBasicsScene() {
  const items = ['WhatsApp & call buttons', 'Google profile photos', 'Fast on mobile', 'Every form tracked'];
  return (
    <PlayInView>
      <div className={`${wrap} grid-cols-[54%_1fr]`}>
        <div className={panel}>
          <p className={title}>Fixing the basics</p>
          <ul className="mt-3 flex-1 flex flex-col justify-between">
            {items.map((t, i) => (
              <li key={t} className={`hw2-row hw2-row-${i} flex items-center gap-2 rounded-lg px-2 py-1.5 min-w-0`}>
                <span className="relative w-5 h-5 shrink-0">
                  <span className={`hw2-x hw2-x-${i} absolute inset-0 rounded-full bg-red-500 text-white flex items-center justify-center`}><X className="w-3 h-3" strokeWidth={4} /></span>
                  <span className={`hw2-ok hw2-ok-${i} absolute inset-0 rounded-full bg-emerald-500 text-white flex items-center justify-center`}><Check className="w-3 h-3" strokeWidth={4} /></span>
                </span>
                <span className="text-[10.5px] font-bold text-brandDark truncate">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${panel} items-center text-center`}>
          <p className={title}>Health score</p>
          <div className="mt-3 text-emerald-500">
            <Ring cls="hw2-ring">
              <span className="relative w-10 h-6">
                <span className="hw2-n hw2-n-0 absolute inset-0 text-[18px] font-black text-red-500">38</span>
                <span className="hw2-n hw2-n-1 absolute inset-0 text-[18px] font-black text-amber-500">65</span>
                <span className="hw2-n hw2-n-2 absolute inset-0 text-[18px] font-black text-emerald-600">92</span>
              </span>
            </Ring>
          </div>
          <p className="hw2-ready mt-auto w-full rounded-lg bg-brandDark text-brandYellow text-[9.5px] font-black py-1.5 flex items-center justify-center gap-1">
            <Rocket className="w-3 h-3" /> Ready for enquiries
          </p>
        </div>
      </div>
    </PlayInView>
  );
}

/* 3. Bring enquiries: ads, Google and social each send enquiries in. */
export function BringEnquiriesScene() {
  const sources = [
    { label: 'Ads', Icon: Megaphone, tone: 'bg-[#1a73e8]' },
    { label: 'Google', Icon: Search, tone: 'bg-[#ea4335]' },
    { label: 'Social', Icon: Camera, tone: 'bg-[#e1306c]' },
  ];
  const leads = [
    { name: 'Riya', from: 'Ad' },
    { name: 'Amit', from: 'Google' },
    { name: 'Neha', from: 'Instagram' },
    { name: 'Sunil', from: 'Ad' },
  ];
  return (
    <PlayInView>
      <div className={`${wrap} grid-cols-[48%_1fr]`}>
        <div className={panel}>
          <p className={title}>Where they come from</p>
          <ul className="mt-3 flex-1 flex flex-col justify-around">
            {sources.map((s, i) => (
              <li key={s.label} className="flex items-center gap-2 min-w-0">
                <span className={`w-8 h-8 rounded-xl ${s.tone} text-white flex items-center justify-center shrink-0`}>
                  <s.Icon className="w-4 h-4" />
                </span>
                <span className="text-[10.5px] font-black text-brandDark w-11 shrink-0">{s.label}</span>
                <span className="relative flex-1 h-0.5 border-t-2 border-dashed border-brandDark/15">
                  <span className={`hw3-dot hw3-dot-${i} absolute -top-[5px] w-2 h-2 rounded-full ${s.tone}`} />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={panel}>
          <div className="flex items-baseline justify-between">
            <p className={title}>Enquiries</p>
            <span className="relative w-7 h-5 text-right">
              {[0, 1, 2, 3, 4].map((n) => (
                <span key={n} className={`hw3-c hw3-c-${n} absolute inset-0 text-[15px] font-black ${n ? 'text-emerald-600' : 'text-brandDark/30'}`}>{n}</span>
              ))}
            </span>
          </div>
          <ul className="mt-2 space-y-1.5">
            {leads.map((l, i) => (
              <li key={l.name} className={`hw3-lead hw3-lead-${i} flex items-center gap-1.5 rounded-lg bg-brandBg px-2 py-1 min-w-0`}>
                <span className="w-5 h-5 rounded-full bg-brandDark text-brandYellow text-[8px] font-black flex items-center justify-center shrink-0">{l.name[0]}</span>
                <span className="flex-1 text-[10px] font-black text-brandDark truncate">{l.name}</span>
                <span className="text-[8.5px] font-bold text-brandDark/50">{l.from}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PlayInView>
  );
}

/* 4. Track & improve: leads move to Won, we see what worked, budget follows. */
export function TrackImproveScene() {
  const leads = [
    { name: 'Riya S.', steps: ['New', 'Follow up', 'Won'] },
    { name: 'Amit K.', steps: ['New', 'Follow up', 'Follow up'] },
    { name: 'Neha P.', steps: ['New', 'New', 'Won'] },
  ];
  const tone: Record<string, string> = {
    New: 'bg-brandYellow/30 text-brandDark',
    'Follow up': 'bg-sky-100 text-sky-800',
    Won: 'bg-emerald-100 text-emerald-800',
  };
  const bars = [
    { label: 'Ads', h: 55 },
    { label: 'Google', h: 92 },
    { label: 'Social', h: 38 },
  ];
  return (
    <PlayInView>
      <div className={`${wrap} grid-cols-[52%_1fr]`}>
        <div className={panel}>
          <p className={title}>Your CRM</p>
          <ul className="mt-2 flex-1 flex flex-col justify-around">
            {leads.map((l, i) => (
              <li key={l.name} className="flex items-center gap-2 min-w-0">
                <span className="hidden sm:flex w-6 h-6 rounded-full bg-brandDark text-white text-[9px] font-black items-center justify-center shrink-0">{l.name[0]}</span>
                <span className="flex-1 text-[10.5px] font-black text-brandDark truncate">{l.name}</span>
                <span className="relative w-[50px] sm:w-[58px] h-[18px] shrink-0">
                  {l.steps.map((s, k) => (
                    <span key={k} className={`hw4-st hw4-st-${i}-${k} absolute inset-0 rounded-full text-[7.5px] sm:text-[8.5px] font-black flex items-center justify-center whitespace-nowrap ${tone[s]}`}>{s}</span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={panel}>
          <p className={title}>What worked</p>
          <div className="mt-2 flex-1 flex items-end gap-2 min-h-[70px]">
            {bars.map((b, i) => (
              <div key={b.label} className="flex-1 h-full flex flex-col items-center justify-end gap-1">
                <div className={`hw4-bar hw4-bar-${i} w-full rounded-t-md ${i === 1 ? 'bg-brandYellow' : 'bg-brandDark/15'}`} style={{ height: `${b.h}%` }} />
                <span className="text-[8.5px] font-bold text-brandDark/60">{b.label}</span>
              </div>
            ))}
          </div>
          <p className="hw4-tip mt-2 rounded-lg bg-brandDark text-white text-[9px] font-bold px-2 py-1.5 flex items-center gap-1 leading-tight">
            <Lightbulb className="w-3 h-3 text-brandYellow shrink-0" /> More budget → Google
          </p>
        </div>
      </div>
    </PlayInView>
  );
}

const STEP_SCENES = [HealthCheckScene, FixBasicsScene, BringEnquiriesScene, TrackImproveScene];

/** The animated picture for step `index`, or null beyond the four. */
export function StepScene({ index }: { index: number }) {
  const Scene = STEP_SCENES[index];
  return Scene ? <Scene /> : null;
}
