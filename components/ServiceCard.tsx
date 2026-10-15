'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getService, type Service } from '../lib/services';
import { TABS } from './PricingTabs';
import { ServiceCardScene, ServiceVisual, hasCardScene } from './HowWeWorkVisuals';

/** Lowest numeric price among the plans a service shows, e.g. "₹4,999". */
export function startingPrice(slug: string): { price: string; unit: string } | null {
  const service = getService(slug);
  if (!service) return null;
  const tab = TABS.find((t) => t.id === service.pricing.tab);
  if (!tab) return null;
  const plans = tab.plans.filter((p) => !service.pricing.plans || service.pricing.plans.includes(p.name));
  const priced = plans
    .map((p) => ({ p, n: Number(p.price.replace(/[^\d]/g, '')) }))
    .filter((x) => x.n > 0)
    .sort((a, b) => a.n - b.n)[0];
  return priced ? { price: priced.p.price, unit: priced.p.unit } : null;
}

/** One service card (picture, title, line, real "from" price), linking to its page. */
export function ServiceCard({ s }: { s: Pick<Service, 'slug' | 'title' | 'short'> }) {
  const from = startingPrice(s.slug);
  return (
    <Link
      href={`/services/${s.slug}`}
      className="group flex flex-col rounded-[2.5rem] bg-white border border-brandDark/5 shadow-[0_10px_40px_-20px_rgba(0,29,33,0.25)] overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,29,33,0.35)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brandYellow"
    >
      <div className="h-60 bg-brandBg flex items-center justify-center overflow-hidden" aria-hidden="true">
        {hasCardScene(s.slug) ? (
          <div className="w-full h-full pointer-events-none">
            <ServiceCardScene slug={s.slug} />
          </div>
        ) : (
          <div className="scale-[0.72] origin-center pointer-events-none">
            <ServiceVisual slug={s.slug} />
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col p-7 lg:p-8 space-y-3">
        <h2 className="text-2xl font-black text-brandDark tracking-tight leading-tight">{s.title}</h2>
        <p className="text-brandDark/60 text-sm leading-relaxed flex-1">{s.short}</p>
        <div className="flex items-center justify-between pt-3">
          {from ? (
            <p className="text-sm text-brandDark/60">
              From <span className="font-black text-brandDark">{from.price}</span>{' '}
              <span className="text-xs">{from.unit}</span>
            </p>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-brandDark group-hover:text-brandYellow transition-colors">
            Details <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
