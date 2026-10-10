import React from 'react';
import { Bell, Star, TrendingUp } from 'lucide-react';
import { PlayInView } from './PlayInView';

/**
 * Home page hero picture: an example growth dashboard (styles: `.hd-*` in
 * globals.css). The enquiries chart climbs month by month, the sources fill
 * in, "+38% this month" appears and a new enquiry pops in. Marked "Example";
 * the Google rating badge shows the real rating when we have it.
 */

const SOURCES = [
  { label: 'Google', pct: 42, cls: 'bg-[#ea4335]' },
  { label: 'Ads', pct: 28, cls: 'bg-[#1a73e8]' },
  { label: 'Instagram', pct: 18, cls: 'bg-[#e1306c]' },
  { label: 'Website', pct: 12, cls: 'bg-brandYellow' },
];

const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
/** Chart points in a 0-100 box (y grows downward). */
const POINTS = [
  [0, 82],
  [20, 74],
  [40, 66],
  [60, 50],
  [80, 34],
  [100, 12],
];
const LINE = POINTS.map(([x, y]) => `${x},${y}`).join(' ');
const AREA = `0,100 ${LINE} 100,100`;

export function HeroDashboard({ rating, count }: { rating: number | null; count: number | null }) {
  return (
    <PlayInView>
      <div className="relative w-full max-w-md lg:max-w-[30rem] mx-auto lg:mx-0 pt-12 sm:pt-6 pb-10" aria-hidden="true">
        {/* Dashboard card */}
        <div className="hd-card relative rounded-[1.75rem] bg-white p-5 sm:p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] text-left">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-black uppercase tracking-wider text-brandDark/50">Your business · Sep</p>
            <span className="rounded-full bg-brandBg px-2 py-0.5 text-[9px] font-bold text-brandDark/50">Example</span>
          </div>

          <div className="mt-2 flex items-end gap-3">
            <div className="relative h-[44px] w-[74px]">
              <span className="hd-n hd-n-0 absolute inset-0 text-[40px] leading-none font-black text-brandDark">48</span>
              <span className="hd-n hd-n-1 absolute inset-0 text-[40px] leading-none font-black text-brandDark">62</span>
              <span className="hd-n hd-n-2 absolute inset-0 text-[40px] leading-none font-black text-brandDark">76</span>
            </div>
            <div className="pb-1">
              <p className="text-[12px] font-bold text-brandDark/60 leading-tight">enquiries</p>
              <span className="hd-up mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-800">
                <TrendingUp className="w-3 h-3" /> +38% this month
              </span>
            </div>
          </div>

          {/* Chart */}
          <div className="relative mt-4 h-[110px] lg:h-[130px]">
            {[25, 50, 75].map((y) => (
              <div key={y} className="absolute inset-x-0 border-t border-dashed border-brandDark/10" style={{ top: `${y}%` }} />
            ))}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="hd-chart absolute inset-0 w-full h-full overflow-visible">
              <defs>
                <linearGradient id="hd-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#fcb632" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#fcb632" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={AREA} fill="url(#hd-fill)" />
              <polyline points={LINE} fill="none" stroke="#fcb632" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
            {/* End dot */}
            <span className="hd-dot absolute right-0 top-[12%] w-3 h-3 -mr-1.5 -mt-1.5 rounded-full bg-brandDark border-2 border-brandYellow" />
          </div>
          <div className="mt-1.5 flex justify-between">
            {MONTHS.map((m) => (
              <span key={m} className="text-[9px] font-bold text-brandDark/40">{m}</span>
            ))}
          </div>

          {/* Sources */}
          <p className="mt-4 text-[10px] font-black uppercase tracking-wider text-brandDark/50">Where they came from</p>
          <div className="mt-2 flex h-3 rounded-full overflow-hidden bg-brandDark/5">
            {SOURCES.map((s, i) => (
              <span key={s.label} className={`hd-src hd-src-${i} h-full ${s.cls}`} style={{ width: `${s.pct}%` }} />
            ))}
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1">
            {SOURCES.map((s, i) => (
              <span key={s.label} className={`hd-lbl hd-lbl-${i} flex items-center gap-1 text-[9.5px] font-bold text-brandDark/70 whitespace-nowrap`}>
                <span className={`w-2 h-2 rounded-full ${s.cls}`} /> {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Google rating (real numbers when available) */}
        <div className="hd-rating absolute left-0 sm:-left-8 top-0 sm:-top-1 rounded-2xl bg-brandYellow px-4 py-3 shadow-glow flex items-center gap-2.5">
          <span className="text-2xl font-black text-brandDark leading-none">{rating ? rating.toFixed(1) : '★'}</span>
          <span>
            <span className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-3 h-3 fill-brandDark text-brandDark" />
              ))}
            </span>
            <span className="block text-[10px] font-bold text-brandDark/80 whitespace-nowrap">
              {count ? `${count} Google reviews` : 'Rated on Google'}
            </span>
          </span>
        </div>

        {/* New enquiry */}
        <div className="hd-toast absolute -right-2 sm:-right-6 bottom-0 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </span>
          <span>
            <span className="block text-[11px] font-black text-brandDark leading-tight">New enquiry · Ritu</span>
            <span className="block text-[10px] text-brandDark/55 leading-tight">from Google search</span>
          </span>
        </div>
      </div>
    </PlayInView>
  );
}
