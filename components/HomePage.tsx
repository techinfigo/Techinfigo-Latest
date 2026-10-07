'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, MessageCircle, PhoneOff, MapPin, ThumbsDown, MessageSquareX, HelpCircle, type LucideIcon } from 'lucide-react';
import type { SiteContent } from '../lib/content-schema';
import type { ClientVideo } from '../lib/settings-schema';
import { HeroEnquiryStack } from './HowWeWorkVisuals';
import { ServiceCards } from './ServicesPage';
import { WhoWeWorkWith } from './WhoWeWorkWith';
import { ClientVideos } from './ClientVideos';
import { whatsappUrl } from '../config/site';
import { trackContact } from '../lib/track';

/**
 * Home page for local Agra businesses and online brands. The hero text, the
 * yellow strip and the "Sound familiar?" list are editable in admin →
 * Content → Home; the rest reuses the Services, How We Work and About pieces.
 */

const PAIN_ICONS: Record<string, LucideIcon> = {
  'phone-off': PhoneOff,
  'map-pin': MapPin,
  'thumbs-down': ThumbsDown,
  'message-x': MessageSquareX,
  'help-circle': HelpCircle,
};

interface HomePageProps {
  home: SiteContent['home'];
  steps: SiteContent['howItWorks']['steps'];
  pillars: SiteContent['services']['pillars'];
  rating: number | null;
  reviewCount: number | null;
  videos: ClientVideo[];
  /** Server-rendered Google reviews section. */
  reviews: React.ReactNode;
}

export function HomePage({ home, steps, pillars, rating, reviewCount, videos, reviews }: HomePageProps) {
  const router = useRouter();
  const { hero, marquee, painPoints } = home;
  const strip = [marquee.onboarding, marquee.capacityOff, marquee.offer].filter(Boolean);

  return (
    <div className="font-sans">
      {/* 1. Hero */}
      <section className="bg-brandDark pt-32 pb-20 lg:pt-44 lg:pb-28 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center relative">
          <div className="lg:col-span-7 space-y-7">
            {hero.eyebrow ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-white/70 uppercase tracking-[0.2em]">
                <MapPin className="w-3.5 h-3.5 text-brandYellow" aria-hidden="true" /> {hero.eyebrow}
              </span>
            ) : null}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.02] tracking-tighter">
              {hero.headline} <br className="hidden sm:block" />
              <span className="text-brandYellow italic">{hero.headlineAccent}</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/65 font-medium leading-relaxed max-w-2xl">{hero.subhead}</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => router.push('/lead-capture')}
                className="px-9 py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.25em] rounded-xl hover:bg-white transition-all shadow-glow"
              >
                {hero.ctaLabel}
              </button>
              <a
                href={whatsappUrl('Hi Techinfigo, I would like more enquiries for my business.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact('whatsapp', 'home-hero')}
                className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-xl border border-white/15 text-white font-black text-xs uppercase tracking-[0.25em] hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp Us
              </a>
            </div>
            {hero.ctaNote ? <p className="text-white/45 text-sm font-medium">{hero.ctaNote}</p> : null}
          </div>
          <div className="lg:col-span-5">
            <HeroEnquiryStack rating={rating} count={reviewCount} />
          </div>
        </div>
      </section>

      {/* 2. Yellow strip */}
      {strip.length > 0 && (
        <div className="bg-brandYellow py-4 overflow-hidden relative border-y border-brandDark/5" aria-label={strip.join('. ')}>
          <div className="flex whitespace-nowrap animate-marquee" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-4">
                {strip.map((t) => (
                  <React.Fragment key={t}>
                    <span className="text-[11px] font-black text-brandDark uppercase tracking-[0.3em]">{t}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brandDark"></span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Sound familiar? */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none">Sound familiar?</h2>
            <p className="text-brandDark/60 text-lg">Most businesses we meet have at least one of these problems. All of them can be fixed.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {painPoints.map((p) => {
              const Icon = PAIN_ICONS[p.icon] ?? HelpCircle;
              return (
                <div key={p.title} className="rounded-[2rem] bg-brandBg border border-brandDark/5 p-7 space-y-4">
                  <span className="w-12 h-12 rounded-2xl bg-brandDark text-brandYellow flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-black text-brandDark tracking-tight leading-tight">{p.title}</h3>
                  <p className="text-brandDark/60 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
            <Link
              href="/lead-capture"
              className="group rounded-[2rem] bg-brandDark p-7 flex flex-col justify-between gap-6 hover:bg-brandSurface transition-colors"
            >
              <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
                Find out which ones are costing you enquiries.
              </h3>
              <span className="inline-flex items-center gap-2 text-brandYellow text-xs font-black uppercase tracking-widest">
                Free health check <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Services */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-brandBg">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none">What we do</h2>
              <p className="text-brandDark/60 text-lg">Pick one service or combine them. Every package includes a free CRM.</p>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-black text-brandDark underline decoration-brandYellow decoration-2 underline-offset-4">
              All services &amp; prices <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <ServiceCards pillars={pillars} />
        </div>
      </section>

      {/* 5. How it works */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-brandDark">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none">How it works</h2>
            <Link href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-black text-white underline decoration-brandYellow decoration-2 underline-offset-4">
              See how we work <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <ol className={`grid grid-cols-1 md:grid-cols-2 ${steps.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-5`}>
            {steps.map((s) => (
              <li key={s.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7 space-y-4">
                <span className="w-11 h-11 rounded-xl bg-brandYellow text-brandDark font-black flex items-center justify-center">{s.num}</span>
                <h3 className="text-xl font-black text-white tracking-tight">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Who we work with */}
      <WhoWeWorkWith />

      {/* 7. Proof: live Google reviews, then client videos (if added in admin) */}
      {reviews}
      <ClientVideos videos={videos} />

      {/* 8. Call to action */}
      <section className="py-24 lg:py-32 bg-brandDark text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brandYellow/[0.03] blur-[150px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto space-y-8 relative">
          <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-none">
            Ready for more <br />
            <span className="text-brandYellow">enquiries?</span>
          </h2>
          <p className="text-white/60 text-lg">Start with a free health check. No payment, no pressure.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push('/lead-capture')}
              className="px-10 py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-glow"
            >
              Get My Free Health Check
            </button>
            <a
              href={whatsappUrl('Hi Techinfigo, I would like more enquiries for my business.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact('whatsapp', 'home-cta')}
              className="inline-flex items-center gap-2 px-8 py-5 rounded-xl border border-white/15 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
