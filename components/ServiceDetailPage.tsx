'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import { SERVICES, getService, type Service } from '../lib/services';
import { TABS } from './PricingTabs';
import { ServiceVisual } from './HowWeWorkVisuals';
import { whatsappUrl } from '../config/site';
import { trackContact } from '../lib/track';

/**
 * /services/<slug>: one service in plain language. Packages come straight from
 * the price table (components/PricingTabs.tsx), so prices never disagree.
 */

interface ServiceDetailPageProps {
  serviceId: string;
  onNavigate: (page: string, serviceId?: string) => void;
}

function plansFor(service: Service) {
  const tab = TABS.find((t) => t.id === service.pricing.tab);
  if (!tab) return { terms: '', plans: [] as typeof TABS[number]['plans'] };
  const plans = tab.plans.filter((p) => !service.pricing.plans || service.pricing.plans.includes(p.name));
  return { terms: tab.terms, plans };
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, onNavigate }) => {
  const service = getService(serviceId) ?? SERVICES[0];
  const { terms, plans } = plansFor(service);
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Header */}
      <section className="bg-brandDark pt-28 pb-16 lg:pt-36 lg:pb-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All services
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tighter">{service.title}</h1>
            <p className="text-base lg:text-xl text-white/65 font-medium leading-relaxed max-w-2xl">{service.intro}</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => onNavigate('lead-capture')}
                className="px-8 py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.25em] rounded-xl hover:bg-white transition-all shadow-glow"
              >
                Get My Free Health Check
              </button>
              <a
                href={whatsappUrl(service.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact('whatsapp', `service-${service.slug}`)}
                className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-xl border border-white/15 text-white font-black text-xs uppercase tracking-[0.25em] hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp Us
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center" aria-hidden="true">
            <ServiceVisual slug={service.slug} />
          </div>
        </div>
      </section>

      {/* Is it for you / what we do */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">Is this for you?</h2>
            <ul className="space-y-4">
              {service.forWho.map((t) => (
                <li key={t} className="flex gap-4 items-start text-lg text-brandDark/80 font-medium">
                  <span className="mt-1 w-6 h-6 rounded-full bg-brandDark text-brandYellow flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">What we do</h2>
            <ul className="space-y-4">
              {service.includes.map((t) => (
                <li key={t} className="flex gap-4 items-start text-lg text-brandDark/80 font-medium">
                  <span className="mt-1 w-6 h-6 rounded-full bg-brandYellow text-brandDark flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Packages */}
      {plans.length > 0 && (
        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-brandDark">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="space-y-3 text-center">
              <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tighter">Packages</h2>
              {terms && <p className="text-white/50 text-sm">{terms}</p>}
            </div>
            <div
              className={`grid grid-cols-1 gap-6 ${
                plans.length >= 4 ? 'md:grid-cols-2 xl:grid-cols-4' : plans.length === 3 ? 'md:grid-cols-3' : plans.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'max-w-md mx-auto'
              }`}
            >
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`flex flex-col rounded-[2rem] p-7 space-y-5 ${
                    plan.popular ? 'bg-brandYellow text-brandDark' : 'bg-white/5 border border-white/10 text-white'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-lg font-black">{plan.name}</p>
                    <p className={`text-sm ${plan.popular ? 'text-brandDark/70' : 'text-white/60'}`}>{plan.bestFor}</p>
                  </div>
                  <p>
                    <span className="text-4xl font-black tracking-tighter">{plan.price}</span>{' '}
                    <span className={`text-sm ${plan.popular ? 'text-brandDark/70' : 'text-white/50'}`}>{plan.unit}</span>
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2 items-start text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.popular ? 'text-brandDark' : 'text-brandYellow'}`} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappUrl(`Hi Techinfigo, I'm interested in the ${plan.name} package. Please share details.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContact('whatsapp', `service-${service.slug}-${plan.name}`)}
                    className={`text-center py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${
                      plan.popular ? 'bg-brandDark text-white hover:bg-brandDark/90' : 'bg-white text-brandDark hover:bg-brandYellow'
                    }`}
                  >
                    Ask about this
                  </a>
                </div>
              ))}
            </div>
            {service.pricingNote && <p className="text-center text-white/50 text-sm">{service.pricingNote}</p>}
            {service.slug === 'website' && (
              <p className="text-center text-sm">
                <Link href="/website-design-agra" className="font-black text-brandYellow underline decoration-2 underline-offset-4 hover:text-white">
                  Business website in Agra for ₹9,999, with a free homepage design first →
                </Link>
              </p>
            )}
            <p className="text-center text-white/70 text-sm font-semibold">Every package includes a free CRM to track your enquiries.</p>
          </div>
        </section>
      )}

      {/* Other services */}
      <section className="py-20 lg:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-2xl lg:text-3xl font-black text-brandDark tracking-tight">Other services</h2>
          <div className="flex flex-wrap gap-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="px-5 py-3 rounded-full bg-white border border-brandDark/10 text-brandDark text-sm font-bold hover:border-brandYellow hover:bg-brandYellow/10 transition-colors"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
