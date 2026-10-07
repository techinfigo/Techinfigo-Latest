'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { DEFAULT_CONTENT } from '../config/content';
import { whatsappUrl } from '../config/site';
import { trackContact } from '../lib/track';
import type { SiteContent } from '../lib/content-schema';

/**
 * "How We Work": the one process page. It replaces /system and
 * /profit-breakdown (both now redirect here), in plain language for local
 * businesses and D2C brands alike. No invented numbers: every promise here is
 * one the agency already makes elsewhere (free CRM, founder-led, 24h reply,
 * no guaranteed figures).
 */

interface HowItWorksPageProps {
  /** Editable copy (admin → Content → How it works). Defaults to what shipped. */
  steps?: SiteContent['howItWorks']['steps'];
  onNavigate: (page: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigate,
  steps = DEFAULT_CONTENT.howItWorks.steps,
}) => {
  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* 1. Header */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              How We Work
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              Simple Steps. <br />
              <span className="text-brandYellow italic">Every Enquiry Tracked.</span>
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              Whether you run a shop in Agra or sell online, we follow the same four steps, and you can{' '}
              <span className="text-white">see what every rupee brings back</span>.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The problem / what we do differently */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <span className="text-[11px] font-black text-brandYellow uppercase tracking-[0.5em] block">The Problem</span>
                <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none">
                  Spending on marketing, <br />
                  <span className="text-brandDark/25">but no idea what works?</span>
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  { title: 'A website that brings no calls', desc: 'It looks fine, but nobody enquires from it.' },
                  { title: 'Ads that get likes, not customers', desc: 'Money goes out every month with nothing to show for it.' },
                  { title: 'Enquiries lost on WhatsApp', desc: 'Leads come in, but no one follows up on time.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-6 items-start">
                    <div className="w-10 h-10 rounded-full border border-brandDark/10 flex items-center justify-center shrink-0">
                      <span className="text-brandDark/30 font-black text-xs">✕</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-brandDark">{item.title}</h3>
                      <p className="text-brandDark/50 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-brandDark rounded-[4rem] p-10 lg:p-20 shadow-4xl relative overflow-hidden">
                <div className="relative z-10 space-y-14">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.5em] block">The Fix</span>
                    <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">What we do differently.</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-10">
                    {[
                      { title: 'Fix the basics first', desc: 'No point spending on ads until your website, Google profile and WhatsApp are ready to turn visitors into enquiries.' },
                      { title: 'One goal: enquiries and sales', desc: 'We judge our work by the calls, messages and orders you get, not by likes or views.' },
                      { title: 'Every lead tracked', desc: 'Each enquiry lands in your free CRM, so nothing is missed and you see exactly where it came from.' },
                    ].map((item, i) => (
                      <div key={item.title} className="flex gap-8">
                        <div className="text-2xl font-black text-brandYellow font-mono">{i + 1}.</div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold text-white uppercase tracking-tight">{item.title}</h4>
                          <p className="text-white/55 text-base leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The steps (editable in admin → Content → How it works) */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-[#fcfcfc] border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 mb-16 lg:mb-24">
            <span className="text-[11px] font-black text-brandYellow uppercase tracking-[0.5em] block">The Steps</span>
            <h2 className="text-5xl lg:text-7xl font-black text-brandDark tracking-tighter">How it works.</h2>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${steps.length >= 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-px bg-brandDark/5 border border-brandDark/5 overflow-hidden rounded-[3rem]`}
          >
            {steps.map((step, i) => (
              <div key={i} className="bg-white p-10 lg:p-12 space-y-10 hover:bg-[#fffcf5] transition-colors duration-500 group">
                <span className="text-5xl lg:text-6xl font-black text-brandDark/10 group-hover:text-brandYellow/40 transition-colors font-mono block">
                  {step.num}
                </span>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-brandDark tracking-tight uppercase">{step.title}</h3>
                  <p className="text-brandDark/55 text-sm font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What you get every month + note for online brands */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-brandDark relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-6">
              <span className="text-brandYellow font-mono text-[11px] font-black tracking-[0.4em] uppercase">Every Month</span>
              <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">
                What you <br /> get from us.
              </h2>
            </div>

            <div className="space-y-8">
              {[
                { title: 'A simple report', sub: 'Enquiries, sales and spend, in plain words' },
                { title: 'Updates on WhatsApp', sub: 'No long meetings, no jargon' },
                { title: 'Talk to the founder', sub: 'You work directly with Sachin' },
                { title: 'Your free CRM', sub: 'Every lead in one place' },
              ].map((m) => (
                <div key={m.title} className="flex items-center gap-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-brandYellow shrink-0"></div>
                  <div className="space-y-0.5">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{m.title}</h3>
                    <p className="text-white/40 text-sm font-bold tracking-widest uppercase">{m.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-brandSurface rounded-[4rem] p-10 lg:p-16 border border-white/5 space-y-8 relative shadow-glow">
              <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Sell Online? (D2C)</span>
              <p className="text-3xl font-black text-white tracking-tighter leading-tight uppercase">
                We track profit, not just sales.
              </p>
              <p className="text-white/55 text-base leading-relaxed">
                For online brands we also watch what each order really costs you, how many customers buy again, and what is left after ad spend. Then we fix the leaks before spending more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Promises we already make */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-24 space-y-4">
            <span className="text-[11px] font-black text-brandYellow uppercase tracking-[0.5em] block">Our Promise</span>
            <h2 className="text-4xl lg:text-7xl font-black text-brandDark tracking-tighter leading-tight">Honest by default.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { title: 'No fake promises', desc: 'We never promise exact numbers. We show you real results every month.' },
              { title: 'Founder-led', desc: 'You speak to Sachin, the founder. No call centre, no junior handoffs.' },
              { title: 'Reply within 24 hours', desc: 'Questions on WhatsApp get a reply the same or next working day.' },
              { title: 'Free CRM included', desc: 'Every client gets a CRM to track enquiries and follow-ups, at no extra cost.' },
            ].map((pillar) => (
              <div key={pillar.title} className="border-l-4 border-brandYellow pl-8 py-4 space-y-4">
                <h3 className="text-2xl font-black text-brandDark uppercase tracking-tight">{pillar.title}</h3>
                <p className="text-brandDark/60 text-lg leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to action */}
      <section className="py-24 lg:py-40 bg-brandDark text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brandYellow/[0.03] blur-[150px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-10">
          <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-none">
            Ready to <br />
            <span className="text-brandYellow">get started?</span>
          </h2>
          <p className="text-white/60 text-lg">Start with a free health check. No payment, no pressure.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('lead-capture')}
              className="px-12 py-6 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-glow"
            >
              Get My Free Health Check
            </button>
            <a
              href={whatsappUrl('Hi Techinfigo, I would like to know how you can help my business.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact('whatsapp', 'how-we-work')}
              className="inline-flex items-center gap-2 px-8 py-6 rounded-xl border border-white/15 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
