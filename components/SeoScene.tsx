import React from 'react';
import { Check, Search, TrendingUp } from 'lucide-react';
import { PlayInView } from './PlayInView';

/**
 * SEO, explained in one loop (styles: `.seo-*` in globals.css).
 * Left: the SEO work gets ticked off one by one. Right: with each bit of work,
 * "your website" climbs the Google results from #4 to #1, then visitors go up.
 * Everything in it is sample UI. Fills whatever box it is placed in.
 */

const WORK = ['Keywords', 'Page content', 'Google profile', 'Site speed', 'Backlinks'];

/** Rows are 30px apart; position n sits at (n - 1) * 30px. */
const ROW = 'absolute inset-x-0 top-0 h-[26px] rounded-lg flex items-center gap-2 px-2';

function Competitor({ cls, w }: { cls: string; w: string }) {
  return (
    <div className={`${ROW} ${cls} bg-brandBg`}>
      <span className="w-3.5 h-3.5 rounded-full bg-brandDark/10 shrink-0" />
      <span className={`h-1.5 rounded bg-[#1a0dab]/20 ${w}`} />
    </div>
  );
}

export function SeoScene() {
  return (
    <PlayInView>
      <div className="w-full h-full p-3 sm:p-4 grid grid-cols-[42%_1fr] gap-2.5 sm:gap-3 text-left font-sans">
        {/* Left: the work */}
        <div className="rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(0,29,33,0.35)] border border-brandDark/5 p-3 flex flex-col min-w-0">
          <p className="text-[10px] font-black text-brandDark uppercase tracking-wider">Our SEO work</p>
          <ul className="mt-2 flex-1 flex flex-col justify-between">
            {WORK.map((w, i) => (
              <li key={w} className="flex items-center gap-1.5 min-w-0">
                <span className="relative w-4 h-4 rounded-full border-2 border-brandDark/15 shrink-0">
                  <span className={`seo-tick seo-tick-${i} absolute -inset-[2px] rounded-full bg-emerald-500 text-white flex items-center justify-center`}>
                    <Check className="w-2.5 h-2.5" strokeWidth={4} />
                  </span>
                </span>
                <span className="text-[9.5px] sm:text-[10px] font-semibold text-brandDark/75 leading-tight truncate">{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Google results */}
        <div className="relative rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(0,29,33,0.35)] border border-brandDark/5 p-3 flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 rounded-full border border-brandDark/10 px-2.5 h-[22px] shrink-0">
            <Search className="w-3 h-3 text-brandDark/40 shrink-0" />
            <span className="text-[9.5px] text-brandDark/70 truncate">dentist in Agra</span>
          </div>

          <div className="mt-2 flex gap-1.5">
            {/* Position numbers */}
            <div className="flex flex-col w-3 shrink-0">
              {[1, 2, 3, 4].map((n) => (
                <span key={n} className="h-[30px] flex items-start pt-[7px] text-[9px] font-black text-brandDark/30">{n}</span>
              ))}
            </div>
            <div className="relative flex-1 h-[116px] min-w-0">
              <Competitor cls="seo-c1" w="w-3/4" />
              <Competitor cls="seo-c2" w="w-2/3" />
              <Competitor cls="seo-c3" w="w-4/5" />
              <div className={`${ROW} seo-you bg-brandYellow/25 border border-brandYellow z-10`}>
                <span className="w-3.5 h-3.5 rounded-full bg-brandDark text-brandYellow text-[7px] font-black flex items-center justify-center shrink-0">Y</span>
                <span className="text-[9.5px] font-black text-brandDark truncate">Your website</span>
              </div>
            </div>
          </div>

          {/* Visitors line */}
          <div className="mt-auto flex items-end gap-2 h-[30px]">
            <div className="flex items-center gap-1 text-[9px] font-black text-emerald-700 shrink-0">
              <TrendingUp className="w-3 h-3" /> Visitors
            </div>
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="seo-line flex-1 h-full overflow-visible">
              <polyline
                points="0,27 18,25 34,22 50,20 64,14 78,10 100,3"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <span className="seo-badge absolute -top-2 -right-2 px-2 py-1 rounded-full bg-brandDark text-brandYellow text-[9px] font-black shadow-lg whitespace-nowrap">
            #1 on Google
          </span>
        </div>
      </div>
    </PlayInView>
  );
}
