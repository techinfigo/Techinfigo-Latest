'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Globe, Megaphone, Search, ShoppingBag, Layers, ArrowRight, Sparkles } from 'lucide-react';
import { whatsappUrl } from '../config/site';
import { trackContact } from '../lib/track';

type Plan = {
  name: string;
  price: string;
  unit: string;
  bestFor: string;
  features: string[];
  popular?: boolean;
};

type Tab = {
  id: string;
  label: string;
  icon: React.ReactNode;
  terms: string;
  plans: Plan[];
  extra?: string;
};

/**
 * Package prices shown on the site. Keep these in step with the Google
 * Business Profile and the packages doc so a customer never sees two prices.
 */
const TABS: Tab[] = [
  {
    id: 'website',
    label: 'Website',
    icon: <Globe className="w-4 h-4" aria-hidden="true" />,
    terms: 'One-time payment · 50% to start, 50% before going live',
    plans: [
      {
        name: 'Enquiry Upgrade',
        price: '₹4,999',
        unit: 'one-time',
        bestFor: 'Already have a website',
        features: [
          'Keep your current website',
          'WhatsApp & call buttons on every page',
          'Enquiry forms connected to free CRM',
          'Meta Pixel & Google Analytics setup',
          'Speed & mobile fixes',
        ],
      },
      {
        name: 'Starter',
        price: '₹9,999',
        unit: 'one-time',
        bestFor: 'First website for a small business',
        features: [
          'Up to 5 pages, mobile-friendly',
          'WhatsApp & call buttons',
          'Basic Google Business Profile setup',
          'Enquiries to your email & WhatsApp',
        ],
      },
      {
        name: 'Business',
        price: '₹24,999',
        unit: 'one-time',
        bestFor: 'Businesses that want steady enquiries',
        popular: true,
        features: [
          'Up to 10 pages, content written for you',
          'Full Google Business Profile optimisation',
          'Free CRM with instant enquiry alerts',
          'Monthly enquiry report',
          '30 days support after launch',
        ],
      },
      {
        name: 'Growth',
        price: '₹49,999',
        unit: 'one-time',
        bestFor: 'Businesses ready to run ads',
        features: [
          'Everything in Business',
          'Landing page built for ads',
          'Meta / Google ads setup',
          'Advanced CRM with follow-up reminders',
          'Monthly review call',
        ],
      },
    ],
    extra: 'Also available: Website Redesign from ₹14,999 · Ads Landing Page from ₹4,999 · Care Plan (hosting, updates & CRM) from ₹999/month',
  },
  {
    id: 'social',
    label: 'Social Media & Ads',
    icon: <Megaphone className="w-4 h-4" aria-hidden="true" />,
    terms: 'Monthly · Minimum 3 months · Ad budget paid separately to Meta/Google',
    plans: [
      {
        name: 'Presence',
        price: '₹7,999',
        unit: 'per month',
        bestFor: 'Look active and trustworthy online',
        features: [
          'Instagram & Facebook management',
          '12 posts a month (8 designs + 4 reels)',
          'Profile optimisation',
          '4 Google Business posts',
          'Monthly report',
        ],
      },
      {
        name: 'Leads',
        price: '₹14,999',
        unit: 'per month',
        bestFor: 'Get enquiries from Facebook & Instagram',
        popular: true,
        features: [
          'Everything in Presence',
          'Lead ads or click-to-WhatsApp ads managed',
          'Lead form or landing page',
          'CRM with instant alerts & reminders',
          'Weekly WhatsApp update',
        ],
      },
      {
        name: 'Google Ads',
        price: '₹14,999',
        unit: 'per month',
        bestFor: 'Customers already searching for you',
        features: [
          'Search ads setup & management',
          'Keyword research for Agra customers',
          'Call & form tracking',
          'Monthly report with cost per enquiry',
        ],
      },
      {
        name: 'Growth',
        price: '₹29,999',
        unit: 'per month',
        bestFor: 'Serious growth across channels',
        features: [
          'Everything in Leads',
          '8 reels a month + one shoot day',
          'Meta + Google ads with retargeting',
          'Monthly review call',
        ],
      },
    ],
  },
  {
    id: 'seo',
    label: 'SEO',
    icon: <Search className="w-4 h-4" aria-hidden="true" />,
    terms: 'Monthly · Minimum 6 months · SEO takes time, so no ranking guarantees',
    plans: [
      {
        name: 'Local SEO',
        price: '₹7,999',
        unit: 'per month',
        bestFor: 'Show up on Google Maps in Agra',
        features: [
          'Google Business Profile optimisation',
          'Weekly Google posts & review system',
          'JustDial, IndiaMART & Sulekha listings',
          '2 new service pages a month',
          'Monthly Search Console report',
        ],
      },
      {
        name: 'SEO Growth',
        price: '₹14,999',
        unit: 'per month',
        bestFor: 'Rank your website for more searches',
        popular: true,
        features: [
          'Everything in Local SEO',
          '4 content pieces a month',
          'Technical fixes & schema',
          'Genuine local backlinks',
          'AI search visibility work',
        ],
      },
      {
        name: 'Ecommerce SEO',
        price: '₹19,999',
        unit: 'per month',
        bestFor: 'Online stores and D2C brands',
        features: [
          'Collection & product page optimisation',
          'Buying-guide content',
          'Technical SEO for your store',
          'Monthly report',
        ],
      },
    ],
  },
  {
    id: 'd2c',
    label: 'D2C Brands',
    icon: <ShoppingBag className="w-4 h-4" aria-hidden="true" />,
    terms: 'Monthly · Minimum 3 months · Ad budget paid separately to Meta',
    plans: [
      {
        name: 'D2C Launch',
        price: '₹24,999',
        unit: 'per month',
        bestFor: 'Ad spend up to about ₹1L a month',
        popular: true,
        features: [
          'Pixel & Conversions API setup',
          'Meta sales campaigns, managed weekly',
          '8 new ad creatives a month',
          'Weekly report: sales, cost per purchase, RTO',
        ],
      },
      {
        name: 'D2C Scale',
        price: '₹49,999',
        unit: 'per month',
        bestFor: 'Ad spend of ₹1–5L a month',
        features: [
          'Everything in Launch',
          '15–20 creatives a month',
          'Product page & checkout improvements',
          'WhatsApp retention flows',
          'Profit dashboard (contribution margin)',
        ],
      },
      {
        name: 'Custom',
        price: 'Quote',
        unit: 'on request',
        bestFor: 'Ad spend above ₹5L a month',
        features: [
          'Custom team & creative volume',
          'Full-funnel strategy',
          'Weekly strategy calls',
        ],
      },
    ],
  },
  {
    id: 'bundles',
    label: 'Bundles',
    icon: <Layers className="w-4 h-4" aria-hidden="true" />,
    terms: 'Monthly · Minimum 6 months · Best value',
    plans: [
      {
        name: 'Local Starter',
        price: '₹16,999',
        unit: 'per month',
        bestFor: 'Small businesses getting started',
        features: [
          'Social Media Presence',
          'Local SEO',
          'Care Plan (hosting, updates & CRM)',
        ],
      },
      {
        name: 'Local Growth',
        price: '₹24,999',
        unit: 'per month',
        bestFor: 'Steady enquiries from every channel',
        popular: true,
        features: [
          'Social Media + Lead Ads',
          'Local SEO',
          'Care Plus (weekly Google posts & report)',
        ],
      },
      {
        name: 'Local Dominate',
        price: '₹44,999',
        unit: 'per month',
        bestFor: 'Lead your category in Agra',
        features: [
          'Social Growth (Meta + Google ads)',
          'SEO Growth',
          'Landing pages',
          'Care Plus',
        ],
      },
    ],
    extra: 'Sign any bundle for 6 months: Website Enquiry Upgrade free, or Starter website at half price.',
  },
];

export const PricingTabs: React.FC = () => {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  const cols =
    tab.plans.length >= 4 ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3';

  const choose = (plan: Plan) => {
    trackContact('whatsapp', `pricing-${tab.id}-${plan.name}`);
    window.open(
      whatsappUrl(`Hi Techinfigo, I'm interested in the ${plan.name} package (${tab.label}). Please share details.`),
      '_blank',
    );
  };

  return (
    <section id="pricing" className="py-24 px-6 lg:px-12 bg-[#001d21] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-brandYellow/5 rounded-full blur-[120px] -mr-20 -mt-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <span className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.4em]">Clear Pricing</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Pick Your <span className="text-brandYellow">Package.</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg font-medium max-w-2xl mx-auto">
            Choose a service to see its packages. Every package includes a free CRM, so every call, WhatsApp and form enquiry is tracked.
          </p>
        </div>

        {/* Tabs */}
        <div className="-mx-6 px-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div role="tablist" aria-label="Service packages" className="mx-auto flex w-max gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl">
            {TABS.map((t) => {
              const selected = t.id === active;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setActive(t.id)}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${
                    selected ? 'text-brandDark' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="pricing-tab-pill"
                      className="absolute inset-0 bg-[#fcb632] rounded-xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {t.icon}
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs font-bold text-white/50 uppercase tracking-widest">{tab.terms}</p>

        {/* Plans */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`grid grid-cols-1 ${cols} gap-6 items-stretch`}
          >
            {tab.plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular
                    ? 'bg-white text-brandDark border-[#fcb632] shadow-[0_0_50px_rgba(252,182,50,0.25)]'
                    : 'bg-white/5 text-white border-white/10 hover:border-brandYellow/40'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 px-3 py-1 bg-[#fcb632] text-brandDark rounded-full text-[11px] font-black uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-black uppercase tracking-tight">{plan.name}</h3>
                <p className={`mt-1 text-sm font-medium ${plan.popular ? 'text-brandDark/60' : 'text-white/50'}`}>
                  {plan.bestFor}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  {plan.price !== 'Quote' && (
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${plan.popular ? 'text-brandDark/50' : 'text-white/40'}`}>
                      From
                    </span>
                  )}
                  <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                </div>
                <p className={`text-[11px] font-bold uppercase tracking-widest ${plan.popular ? 'text-brandDark/50' : 'text-white/40'}`}>
                  {plan.unit}
                </p>

                <div className={`my-6 h-px ${plan.popular ? 'bg-brandDark/10' : 'bg-white/10'}`} />

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-medium leading-snug">
                      <span className={`mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${plan.popular ? 'bg-brandDark text-[#fcb632]' : 'bg-[#fcb632]/15 text-[#fcb632]'}`}>
                        <Check className="w-3 h-3" aria-hidden="true" />
                      </span>
                      <span className={plan.popular ? 'text-brandDark/80' : 'text-white/80'}>{f}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-sm font-bold leading-snug">
                    <span className={`mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${plan.popular ? 'bg-brandDark text-[#fcb632]' : 'bg-[#fcb632]/15 text-[#fcb632]'}`}>
                      <Check className="w-3 h-3" aria-hidden="true" />
                    </span>
                    <span className={plan.popular ? 'text-brandDark' : 'text-[#fcb632]'}>Free CRM included</span>
                  </li>
                </ul>

                <button
                  onClick={() => choose(plan)}
                  aria-label={`Get the ${plan.name} package on WhatsApp`}
                  className={`mt-8 w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 ${
                    plan.popular
                      ? 'bg-[#fcb632] text-brandDark hover:scale-[1.03]'
                      : 'bg-white/10 text-white border border-white/10 hover:bg-[#fcb632] hover:text-brandDark'
                  }`}
                >
                  {plan.price === 'Quote' ? 'Ask for a Quote' : 'Get This Package'}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {tab.extra && (
          <p className="text-center text-sm font-medium text-white/60 max-w-3xl mx-auto">{tab.extra}</p>
        )}
      </div>
    </section>
  );
};
