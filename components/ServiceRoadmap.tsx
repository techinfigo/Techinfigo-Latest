'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Flag } from 'lucide-react';
import { DEFAULT_CONTENT } from '../config/content';
import type { SiteContent } from '../lib/content-schema';
import { SERVICES } from '../lib/services';
import { ServiceCard } from './ServiceCard';

/**
 * /services as a growth roadmap: a winding road runs down the page and each
 * service is a numbered stop on it, with a plain "why this step" line beside it.
 * Desktop: cards alternate left/right of the road. Phones: a straight road on
 * the left, cards on the right. The road fills in as you scroll.
 */

const STEPS: Record<string, { step: string; why: string }> = {
  website: { step: 'Get found online', why: 'Your shop that never closes: a fast website where customers call or WhatsApp you in one tap.' },
  'google-business-profile': { step: 'Show up on Maps', why: 'When people nearby search for what you sell, they see you, your reviews and your call button first.' },
  'social-media': { step: 'Look active & trusted', why: 'Regular posts and reels so people who check you on Instagram see a busy, real business.' },
  ads: { step: 'Bring enquiries now', why: 'Ads in your area that send calls and WhatsApp messages this week, not someday.' },
  seo: { step: 'Grow free traffic', why: 'Climb Google month by month, so enquiries keep coming without paying for every click.' },
  d2c: { step: 'Scale up', why: 'Selling online across India? Better product pages, Meta ads and repeat orders, tracked against profit.' },
};

type Pt = { x: number; y: number };

function useIsDesktop() {
  const [desk, setDesk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => setDesk(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return desk;
}

/** Smooth road through the stops; on desktop it swings side to side between them. */
function roadPath(points: Pt[], swing: number, endY: number): string {
  if (points.length === 0) return '';
  const [first] = points;
  let d = `M ${first.x} ${Math.max(0, first.y - 70)} L ${first.x} ${first.y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const h = b.y - a.y;
    const side = i % 2 === 0 ? 1 : -1;
    d += ` C ${a.x + swing * side} ${a.y + h * 0.3}, ${b.x + swing * side} ${b.y - h * 0.3}, ${b.x} ${b.y}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${endY}`;
  return d;
}

export function ServiceRoadmap({
  pillars = DEFAULT_CONTENT.services.pillars,
}: {
  pillars?: ReadonlyArray<SiteContent['services']['pillars'][number]>;
}) {
  const desktop = useIsDesktop();
  const wrapRef = useRef<HTMLDivElement>(null);
  const stopRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const flagRef = useRef<HTMLSpanElement>(null);
  const [geo, setGeo] = useState<{ w: number; h: number; d: string }>({ w: 0, h: 0, d: '' });
  const [progress, setProgress] = useState(0);

  const cards = SERVICES.map((s) => {
    const edited = pillars.find((p) => p.slug === s.slug);
    return { ...s, title: edited?.title || s.title, short: edited?.desc || s.short };
  });

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const box = wrap.getBoundingClientRect();
    const centre = (el: Element | null): Pt | null => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
    };
    const pts = stopRefs.current.map(centre).filter((p): p is Pt => !!p);
    const flag = centre(flagRef.current);
    setGeo({ w: box.width, h: box.height, d: roadPath(pts, desktop ? 70 : 0, flag ? flag.y : box.height) });
  }, [desktop]);

  useLayoutEffect(() => {
    measure();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [measure]);

  // Fill the road as the reader scrolls past it.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const r = wrap.getBoundingClientRect();
        const seen = window.innerHeight * 0.65 - r.top;
        setProgress(Math.min(1, Math.max(0, seen / r.height)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const roadW = desktop ? 30 : 16;

  return (
    <div ref={wrapRef} className="relative">
      {/* The road */}
      {geo.d && (
        <svg className="absolute inset-0 pointer-events-none" width={geo.w} height={geo.h} aria-hidden="true">
          <path d={geo.d} fill="none" stroke="#001d21" strokeOpacity={0.08} strokeWidth={roadW} strokeLinecap="round" strokeLinejoin="round" />
          <path
            d={geo.d}
            fill="none"
            stroke="#001d21"
            strokeWidth={roadW}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - progress}
          />
          <path
            d={geo.d}
            fill="none"
            stroke="#fcb632"
            strokeWidth={desktop ? 3 : 2}
            strokeDasharray={desktop ? '14 12' : '8 8'}
            strokeLinecap="round"
            opacity={0.9}
          />
        </svg>
      )}

      <ol className="relative space-y-14 lg:space-y-6">
        {cards.map((s, i) => {
          const info = STEPS[s.slug] ?? { step: s.title, why: s.short };
          const cardLeft = i % 2 === 0;
          const reached = progress > 0 && (i + 0.5) / (cards.length + 0.5) <= progress + 0.02;
          const stop = (
            <span
              ref={(el) => {
                stopRefs.current[i] = el;
              }}
              className={`relative z-10 flex items-center justify-center rounded-full font-black transition-all duration-500 w-10 h-10 text-base lg:w-14 lg:h-14 lg:text-xl ring-4 lg:ring-8 ring-brandBg ${
                reached ? 'bg-brandYellow text-brandDark scale-100' : 'bg-white text-brandDark/40 scale-90 border-2 border-brandDark/10'
              }`}
            >
              {i + 1}
            </span>
          );
          const label = (
            <div className={`space-y-2 ${desktop ? (cardLeft ? 'text-left' : 'text-right') : ''}`}>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brandYellow">Step {i + 1}</p>
              <p className="text-2xl lg:text-4xl font-black text-brandDark tracking-tight leading-tight">{info.step}</p>
              <p className={`text-brandDark/60 text-sm lg:text-base leading-relaxed max-w-sm ${desktop && !cardLeft ? 'ml-auto' : ''}`}>{info.why}</p>
            </div>
          );
          const card = (
            <div className="w-full max-w-md">
              <ServiceCard s={s} />
            </div>
          );

          return desktop ? (
            <li key={s.slug} className="grid grid-cols-[1fr_200px_1fr] items-center">
              <div className="flex justify-end">{cardLeft ? card : label}</div>
              <div className="flex justify-center">{stop}</div>
              <div className="flex justify-start">{cardLeft ? label : card}</div>
            </li>
          ) : (
            <li key={s.slug} className="grid grid-cols-[40px_1fr] gap-x-4">
              <div className="flex justify-center pt-1">{stop}</div>
              <div className="space-y-5">
                {label}
                {card}
              </div>
            </li>
          );
        })}

        {/* Finish */}
        <li className={desktop ? 'grid grid-cols-[1fr_200px_1fr] items-center pt-10' : 'grid grid-cols-[40px_1fr] gap-x-4 items-center pt-2'}>
          {desktop && <div />}
          <div className="flex justify-center">
            <span
              ref={flagRef}
              className={`relative z-10 flex items-center justify-center rounded-full ring-4 lg:ring-8 ring-brandBg transition-colors duration-500 w-10 h-10 lg:w-16 lg:h-16 ${
                progress > 0.97 ? 'bg-brandYellow text-brandDark' : 'bg-brandDark text-brandYellow'
              }`}
            >
              <Flag className="w-5 h-5 lg:w-7 lg:h-7" aria-hidden="true" />
            </span>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brandYellow">Destination</p>
            <p className="text-2xl lg:text-4xl font-black text-brandDark tracking-tight">More enquiries, every month.</p>
            <p className="text-brandDark/60 text-sm lg:text-base mt-1">Start at any stop. Most local businesses begin with steps 1 and 2.</p>
          </div>
        </li>
      </ol>
    </div>
  );
}
