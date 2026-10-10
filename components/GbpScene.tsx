import React from 'react';
import { MapPin, Navigation, Phone, Pointer, Search, Star, Globe } from 'lucide-react';
import { PlayInView } from './PlayInView';

/**
 * Google Business Profile, explained in one loop (styles: `.gbp-*` in globals.css).
 * Left: someone searches "sweet shop near me" on Google Maps; nearby shops
 * appear and yours stands out with its rating. Right: your profile opens, they
 * tap Call, then Directions, and the route to your shop draws on the map.
 * Everything in it is sample UI. Fills whatever box it is placed in.
 */

const OTHER_PINS = [
  { left: '24%', top: '30%', cls: 'gbp-pin-a' },
  { left: '80%', top: '62%', cls: 'gbp-pin-b' },
  { left: '40%', top: '70%', cls: 'gbp-pin-c' },
];

export function GbpScene() {
  return (
    <PlayInView>
      <div className="w-full h-full p-3 sm:p-4 grid grid-cols-[52%_1fr] gap-2.5 sm:gap-3 text-left font-sans">
        {/* Left: Google Maps */}
        <div className="rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(0,29,33,0.35)] border border-brandDark/5 p-2 flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 rounded-full border border-brandDark/10 px-2.5 h-[22px] shrink-0">
            <Search className="w-3 h-3 text-brandDark/40 shrink-0" />
            <span className="gbp-typing text-[9.5px] text-brandDark/75 whitespace-nowrap overflow-hidden">sweet shop near me</span>
          </div>
          <div className="relative mt-2 flex-1 rounded-xl overflow-hidden bg-[#eef3ea]">
            {/* Roads */}
            <div className="absolute inset-y-0 left-[45%] w-[7px] bg-white" />
            <div className="absolute inset-x-0 top-[40%] h-[7px] bg-white" />
            <div className="absolute inset-x-0 top-[78%] h-[5px] bg-white/80" />
            <div className="absolute inset-y-0 left-[16%] w-[5px] bg-white/80" />
            <div className="absolute left-[55%] top-[6%] w-[30%] h-[26%] rounded-md bg-[#d9e8d2]" />

            {/* Route to your shop (draws after "Directions") */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="gbp-route absolute inset-0 w-full h-full">
              <polyline
                points="18,84 18,43 47,43 47,36 64,36"
                fill="none"
                stroke="#1a73e8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* The customer */}
            <span className="absolute left-[18%] top-[84%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#1a73e8] border-2 border-white shadow" />

            {/* Other shops */}
            {OTHER_PINS.map((p) => (
              <span key={p.cls} className={`gbp-pin ${p.cls} absolute -translate-x-1/2 -translate-y-full`} style={{ left: p.left, top: p.top }}>
                <MapPin className="w-4 h-4 fill-[#ea4335]/70 text-white" />
              </span>
            ))}

            {/* Your shop */}
            <span className="gbp-pin gbp-pin-you absolute -translate-x-1/2 -translate-y-full z-10" style={{ left: '64%', top: '36%' }}>
              <MapPin className="w-7 h-7 fill-brandYellow text-brandDark" strokeWidth={1.5} />
            </span>
            <span className="gbp-label absolute z-10 rounded-md bg-brandDark text-white text-[8px] font-black px-1.5 py-0.5 whitespace-nowrap" style={{ left: '64%', top: '38%' }}>
              Your Shop <span className="text-brandYellow">★ 4.8</span>
            </span>
          </div>
        </div>

        {/* Right: your Google profile */}
        <div className="gbp-profile relative rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(0,29,33,0.35)] border border-brandDark/5 p-3 flex flex-col min-w-0">
          <p className="text-[11px] font-black text-brandDark leading-tight truncate">Your Shop</p>
          <div className="mt-1 flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className={`gbp-star gbp-star-${i} w-2.5 h-2.5 fill-brandYellow text-brandYellow`} />
            ))}
            <span className="ml-1 text-[8.5px] font-bold text-brandDark/55 whitespace-nowrap">4.8 · 120</span>
          </div>
          <p className="mt-0.5 text-[8.5px] font-bold text-emerald-700">Open now</p>
          <div className="mt-1.5 grid grid-cols-3 gap-1 h-[38px] rounded-md overflow-hidden">
            <div className="rounded-md bg-brandDark/15" />
            <div className="rounded-md bg-brandYellow/40" />
            <div className="rounded-md bg-brandDark/10" />
          </div>
          <div className="relative mt-2 grid grid-cols-3 gap-1">
            <span className="gbp-btn gbp-btn-call rounded-md bg-brandBg py-1 flex flex-col items-center gap-0.5 text-[7px] font-black text-[#1a73e8]">
              <Phone className="w-2.5 h-2.5" /> Call
            </span>
            <span className="gbp-btn gbp-btn-dir rounded-md bg-brandBg py-1 flex flex-col items-center gap-0.5 text-[7px] font-black text-[#1a73e8]">
              <Navigation className="w-2.5 h-2.5" /> Directions
            </span>
            <span className="rounded-md bg-brandBg py-1 flex flex-col items-center gap-0.5 text-[7px] font-black text-[#1a73e8]">
              <Globe className="w-2.5 h-2.5" /> Website
            </span>
            <span className="gbp-finger absolute top-1/2 text-brandDark drop-shadow pointer-events-none">
              <Pointer className="w-4 h-4 fill-white" />
            </span>
          </div>
          <div className="relative mt-auto h-[24px]">
            <span className="gbp-toast gbp-toast-call absolute inset-0 rounded-lg bg-brandDark text-white text-[8.5px] font-black flex items-center justify-center gap-1">
              <Phone className="w-3 h-3 text-brandYellow" /> New call from Maps
            </span>
            <span className="gbp-toast gbp-toast-dir absolute inset-0 rounded-lg bg-emerald-50 text-emerald-800 text-[8.5px] font-black flex items-center justify-center gap-1">
              <Navigation className="w-3 h-3" /> Customer on the way
            </span>
          </div>
        </div>
      </div>
    </PlayInView>
  );
}
