'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { DEFAULT_CONTENT } from '../config/content';
import type { SiteContent } from '../lib/content-schema';
import { SERVICES, getService } from '../lib/services';
import { TABS, PricingTabs } from './PricingTabs';
import { ServiceCardScene, ServiceVisual, TrackVisual, hasCardScene } from './HowWeWorkVisuals';
import { whatsappUrl } from '../config/site';
import { trackContact } from '../lib/track';

/**
 * /services: the six services in plain language, each with its picture and
 * real starting price, then the full package table. Card titles and lines are
 * editable in admin → Content → Services; the slugs (and so the links) are set
 * in code.
 */

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

/** The six service cards (picture, title, line, real "from" price). Used on /services and the home page. */
export function ServiceCards({
  pillars = DEFAULT_CONTENT.services.pillars,
}: {
  pillars?: ReadonlyArray<SiteContent['services']['pillars'][number]>;
}) {
  // Admin copy wins for title/line; anything missing falls back to the service data.
  const cards = SERVICES.map((s) => {
    const edited = pillars.find((p) => p.slug === s.slug);
    return { ...s, title: edited?.title || s.title, short: edited?.desc || s.short };
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((s) => {
            const from = startingPrice(s.slug);
            return (
              <Link
                key={s.slug}
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
          })}
        </div>
  );
}

interface ServicesPageProps {
  pillars?: SiteContent['services']['pillars'];
  onNavigate: (page: string, serviceId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ pillars = DEFAULT_CONTENT.services.pillars, onNavigate }) => {

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Header */}
      <section className="bg-brandDark pt-28 pb-16 lg:pt-36 lg:pb-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6">
          <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">Our Services</span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-4xl">
            Everything you need <br />
            <span className="text-brandYellow italic">for more enquiries.</span>
          </h1>
          <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-2xl">
            Pick one service or combine them. Every package comes with a <span className="text-white">free CRM</span> to track your enquiries.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <ServiceCards pillars={pillars} />
        </div>
      </section>

      {/* Free CRM */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none">
              A free CRM with <br /> every package.
            </h2>
            <p className="text-brandDark/60 text-lg leading-relaxed max-w-md">
              Every enquiry from your website, ads, Google and social lands in one place, with where it came from. No more leads lost on WhatsApp.
            </p>
            <ul className="space-y-3">
              {['Instant alert for every new enquiry', 'Follow-up reminders', 'See which channel brings customers'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-brandDark font-semibold">
                  <span className="w-6 h-6 rounded-full bg-brandYellow text-brandDark flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[3rem] bg-brandBg border border-brandDark/5 min-h-[320px] p-6 sm:p-12 flex items-center justify-center">
            <TrackVisual />
          </div>
        </div>
      </section>

      {/* All packages and prices */}
      <PricingTabs />

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-brandBg text-center px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none">Not sure where to start?</h2>
          <p className="text-brandDark/60 text-lg">Get a free health check. We’ll tell you which service would help your business most.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('lead-capture')}
              className="px-10 py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-brandDark hover:text-white transition-all shadow-glow"
            >
              Get My Free Health Check
            </button>
            <a
              href={whatsappUrl('Hi Techinfigo, I would like to know which service suits my business.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact('whatsapp', 'services')}
              className="inline-flex items-center gap-2 px-8 py-5 rounded-xl border border-brandDark/15 text-brandDark font-black text-xs uppercase tracking-[0.3em] hover:bg-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
