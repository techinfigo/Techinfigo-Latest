'use client';

import React from 'react';
import { Check, X, MessageCircle } from 'lucide-react';
import { DEFAULT_CONTENT } from '../config/content';
import type { SiteContent } from '../lib/content-schema';
import { whatsappUrl } from '../config/site';
import { trackContact } from '../lib/track';

/**
 * Who We Fit: an honest good-fit / not-a-fit list for local businesses and
 * online brands. Both lists are editable in admin → Content → Qualification.
 * No revenue gates, no "spots left" counters.
 */

interface QualificationPageProps {
  greenLights?: SiteContent['qualification']['greenLights'];
  redFlags?: SiteContent['qualification']['redFlags'];
  onNavigate: (page: string) => void;
}

export const QualificationPage: React.FC<QualificationPageProps> = ({
  onNavigate,
  greenLights = DEFAULT_CONTENT.qualification.greenLights,
  redFlags = DEFAULT_CONTENT.qualification.redFlags,
}) => {
  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Header */}
      <section className="bg-brandDark pt-28 pb-16 lg:pt-36 lg:pb-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-5 relative">
          <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">Who We Fit</span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter max-w-4xl">
            Are we a good fit? <br />
            <span className="text-brandYellow italic">Here’s an honest list.</span>
          </h1>
          <p className="text-base lg:text-xl text-white/65 font-medium leading-relaxed max-w-2xl">
            Whether you run a local business in Agra or sell online across India, we work best with people who want steady enquiries and are ready to follow up on them.
          </p>
        </div>
      </section>

      {/* Good fit / not a fit */}
      <section className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="rounded-[2.5rem] bg-white border border-brandDark/5 p-8 lg:p-12 space-y-8 shadow-[0_10px_40px_-20px_rgba(0,29,33,0.2)]">
            <h2 className="text-3xl lg:text-4xl font-black text-brandDark tracking-tighter">We’re a good fit if…</h2>
            <ul className="space-y-7">
              {greenLights.map((g) => (
                <li key={g.title} className="flex gap-4">
                  <span className="mt-0.5 w-8 h-8 rounded-full bg-brandYellow text-brandDark flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-brandDark">{g.title}</h3>
                    <p className="text-brandDark/60 leading-relaxed">{g.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2.5rem] bg-brandDark p-8 lg:p-12 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tighter">We’re not the right fit if…</h2>
            <ul className="space-y-7">
              {redFlags.map((r) => (
                <li key={r.title} className="flex gap-4">
                  <span className="mt-0.5 w-8 h-8 rounded-full bg-white/10 text-white/80 flex items-center justify-center shrink-0">
                    <X className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-white">{r.title}</h3>
                    <p className="text-white/60 leading-relaxed">{r.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-white text-center px-6 border-t border-brandDark/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none">Sounds like you?</h2>
          <p className="text-brandDark/60 text-lg">Start with a free health check. We’ll be honest if we’re not the right people for the job.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('lead-capture')}
              className="px-10 py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-brandDark hover:text-white transition-all shadow-glow"
            >
              Get My Free Health Check
            </button>
            <a
              href={whatsappUrl('Hi Techinfigo, I would like to check if you can help my business.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact('whatsapp', 'who-we-fit')}
              className="inline-flex items-center gap-2 px-8 py-5 rounded-xl border border-brandDark/15 text-brandDark font-black text-xs uppercase tracking-[0.3em] hover:bg-brandBg transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
