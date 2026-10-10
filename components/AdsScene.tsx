import React from 'react';
import { Megaphone, MessageCircle, Pointer, Target } from 'lucide-react';
import { PlayInView } from './PlayInView';

/**
 * Facebook / Instagram / Google ads, explained in one loop (styles: `.ad-*`
 * in globals.css). Left: the ad is shown to people around Agra (target
 * circle, people lighting up). Right: someone taps "Send message" on the ad,
 * WhatsApp leads count up, and the cost per lead is shown.
 * Everything in it is sample UI. Fills whatever box it is placed in.
 */

const PEOPLE = [
  { left: '34%', top: '34%' }, { left: '58%', top: '28%' }, { left: '68%', top: '52%' },
  { left: '44%', top: '62%' }, { left: '28%', top: '54%' }, { left: '54%', top: '44%' },
  { left: '62%', top: '70%' }, { left: '38%', top: '46%' },
];
/** Which of the people above become leads, in order. */
const LEADS = [5, 1, 3, 2];

export function AdsScene() {
  return (
    <PlayInView>
      <div className="w-full h-full p-3 sm:p-4 grid grid-cols-[48%_1fr] gap-2.5 sm:gap-3 text-left font-sans">
        {/* Left: who sees the ad */}
        <div className="rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(0,29,33,0.35)] border border-brandDark/5 p-2 flex flex-col min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="flex items-center gap-1 text-[9px] font-black text-brandDark whitespace-nowrap">
              <Target className="w-3 h-3 text-[#e1306c]" /> Agra + 10 km
            </span>
            <span className="ad-budget rounded-full bg-brandYellow px-1.5 py-0.5 text-[8px] font-black text-brandDark whitespace-nowrap">₹500/day</span>
          </div>
          <div className="relative mt-1.5 flex-1 rounded-xl overflow-hidden bg-[#eef3ea]">
            <div className="absolute inset-y-0 left-[48%] w-[6px] bg-white" />
            <div className="absolute inset-x-0 top-[42%] h-[6px] bg-white" />
            <div className="absolute inset-x-0 top-[80%] h-[4px] bg-white/80" />
            {/* Target circle */}
            <span className="ad-circle absolute left-1/2 top-1/2 w-[86%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#e1306c]/60 bg-[#e1306c]/10" />
            {/* People who see the ad */}
            {PEOPLE.map((p, i) => (
              <span key={i} className={`ad-person ad-person-${i} absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white shadow`} style={{ left: p.left, top: p.top }} />
            ))}
            <span className="ad-reach absolute left-1.5 bottom-1.5 rounded-md bg-brandDark text-white text-[8px] font-black px-1.5 py-0.5 whitespace-nowrap">
              Ad shown to 2,140 people
            </span>
          </div>
        </div>

        {/* Right: the ad, and leads */}
        <div className="relative rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(0,29,33,0.35)] border border-brandDark/5 p-2.5 flex flex-col min-w-0">
          <div className="rounded-xl border border-brandDark/10 overflow-hidden">
            <div className="flex items-center gap-1 px-1.5 py-1">
              <span className="w-4 h-4 rounded-full bg-brandDark text-brandYellow text-[6px] font-black flex items-center justify-center shrink-0">YS</span>
              <span className="text-[8.5px] font-black text-brandDark truncate">Your Shop</span>
              <span className="ml-auto flex items-center gap-0.5 text-[7px] text-brandDark/45 whitespace-nowrap"><Megaphone className="w-2 h-2" /> Sponsored</span>
            </div>
            <div className="h-[38px] bg-brandDark relative overflow-hidden flex items-center justify-center">
              <span className="absolute -right-3 -top-3 w-10 h-10 rounded-full bg-brandYellow/30" />
              <span className="relative text-[9.5px] font-black text-white text-center leading-tight">Festive offer <span className="text-brandYellow">20% off</span></span>
            </div>
            <div className="relative px-1.5 py-1">
              <span className="ad-cta flex items-center justify-center gap-1 rounded-md bg-[#25D366] text-white text-[8.5px] font-black py-1">
                <MessageCircle className="w-2.5 h-2.5" /> Send message
              </span>
              <span className="ad-finger absolute left-1/2 top-1/2 text-brandDark drop-shadow pointer-events-none">
                <Pointer className="w-4 h-4 fill-white" />
              </span>
            </div>
          </div>

          {/* Leads counter */}
          <div className="mt-2 flex items-center gap-2">
            <div className="relative w-8 h-8 shrink-0">
              {[1, 2, 3, 4].map((n) => (
                <span key={n} className={`ad-count ad-count-${n} absolute inset-0 rounded-lg bg-[#25D366] text-white text-[15px] font-black flex items-center justify-center`}>{n}</span>
              ))}
              <span className="ad-count-0 absolute inset-0 rounded-lg bg-brandDark/10 text-brandDark/40 text-[15px] font-black flex items-center justify-center">0</span>
            </div>
            <div className="min-w-0">
              <p className="text-[9.5px] font-black text-brandDark leading-tight">WhatsApp leads</p>
              <div className="mt-0.5 flex -space-x-1">
                {['R', 'A', 'N', 'S'].map((c, i) => (
                  <span key={c} className={`ad-face ad-face-${i} w-4 h-4 rounded-full border border-white bg-brandYellow text-brandDark text-[7px] font-black flex items-center justify-center`}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          <p className="ad-cpl mt-auto rounded-lg bg-emerald-50 text-emerald-800 text-[8.5px] font-black px-1.5 py-1.5 text-center whitespace-nowrap overflow-hidden text-ellipsis">
            ₹340 spent · <span className="text-emerald-900">₹85 per lead</span>
          </p>
        </div>
      </div>
    </PlayInView>
  );
}
