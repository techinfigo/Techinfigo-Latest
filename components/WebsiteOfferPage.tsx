'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  Globe,
  MessageCircle,
  Quote,
  Loader2,
} from 'lucide-react';
import type { SiteContent } from '../lib/content-schema';
import type { ClientVideo } from '../lib/settings-schema';
import { ServiceVisual } from './HowWeWorkVisuals';
import { ClientVideos } from './ClientVideos';
import { HoneypotField } from './HoneypotField';
import { submitLead } from '../lib/submit-lead';
import { whatsappUrl } from '../config/site';
import { trackContact } from '../lib/track';
import { WEBSITE_OFFER_FAQS as FAQS } from '../lib/website-offer';

/**
 * /website-design-agra — the page website ads send people to.
 *
 * One offer (₹9,999 business website), one hook (a free homepage design in
 * 48 hours) and one action (the short form, which lands in the CRM as
 * "website-offer"). Testimonials and portfolio are added in admin → Content →
 * Website offer page; each section stays hidden until it has real entries.
 */

const WA_TEXT = 'Hi Techinfigo, I want a website for my business. Please share the free homepage design offer.';

const INCLUDED = [
  'Up to 5 pages, made for mobile',
  'WhatsApp and call buttons on every page',
  'Domain and hosting for 1 year included',
  'Basic Google Business Profile setup',
  'Every enquiry to your email, WhatsApp and free CRM',
  'Changes until you are happy, before launch',
];

const STEPS = [
  { title: 'Tell us about your business', desc: 'Fill the short form or WhatsApp us. Takes one minute.' },
  { title: 'Free homepage design in 48 hours', desc: 'We design your homepage and send it on WhatsApp. No payment yet.' },
  { title: 'Like it? Pay 50% to start', desc: 'If you don’t like it, you pay nothing. Simple.' },
  { title: 'Your website goes live in 7 days', desc: 'Pay the remaining 50% when it’s ready, before it goes live.' },
];



const BUSINESS_TYPES = ['Shop / showroom', 'Clinic / doctor', 'Coaching / school', 'Restaurant / caterer', 'Hotel / travel', 'Service business', 'Other'];

const INPUT =
  'w-full bg-white border border-brandDark/10 px-4 py-3.5 text-sm font-medium text-brandDark placeholder:text-brandDark/35 focus:ring-2 focus:ring-brandYellow outline-none rounded-xl transition-all';

function OfferForm({ id }: { id?: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [business, setBusiness] = useState('');
  const [type, setType] = useState('');
  const [hasSite, setHasSite] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    const result = await submitLead({
      sourceForm: 'website-offer',
      name,
      phone,
      brandName: business,
      message: 'Free homepage design request (₹9,999 website offer).',
      extra: { businessType: type, alreadyHasWebsite: hasSite },
    });
    setState(result.ok ? 'done' : 'error');
  }

  if (state === 'done') {
    return (
      <div id={id} className="rounded-[2rem] bg-white p-7 lg:p-8 space-y-5 shadow-2xl text-center">
        <span className="mx-auto w-14 h-14 rounded-full bg-brandYellow text-brandDark flex items-center justify-center">
          <Check className="w-6 h-6" aria-hidden="true" />
        </span>
        <h3 className="text-2xl font-black text-brandDark tracking-tight">Thank you, {name.split(' ')[0] || 'we got it'}!</h3>
        <p className="text-brandDark/65">We’ll WhatsApp you within 24 hours to understand your business, then send your free homepage design within 48 hours.</p>
        <a
          href={whatsappUrl(WA_TEXT)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact('whatsapp', 'website-offer-thanks')}
          className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#25D366] text-white font-black text-xs uppercase tracking-[0.2em]"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" /> Can’t wait? WhatsApp us now
        </a>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={onSubmit} className="relative rounded-[2rem] bg-white p-7 lg:p-8 space-y-4 shadow-2xl">
      <HoneypotField />
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-brandDark tracking-tight leading-tight">Get your free homepage design</h2>
        <p className="text-sm text-brandDark/55">Ready in 48 hours. No payment needed.</p>
      </div>
      <label className="block">
        <span className="sr-only">Your name</span>
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" className={INPUT} />
      </label>
      <label className="block">
        <span className="sr-only">WhatsApp number</span>
        <input
          required
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="WhatsApp number"
          autoComplete="tel"
          pattern="[0-9+\s\-]{10,15}"
          title="Enter a 10-digit mobile number"
          className={INPUT}
        />
      </label>
      <label className="block">
        <span className="sr-only">Business name</span>
        <input required value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Business name" autoComplete="organization" className={INPUT} />
      </label>
      <label className="block">
        <span className="sr-only">Type of business</span>
        <select required value={type} onChange={(e) => setType(e.target.value)} className={`${INPUT} ${type ? '' : 'text-brandDark/35'}`}>
          <option value="" disabled>Type of business</option>
          {BUSINESS_TYPES.map((t) => (
            <option key={t} value={t} className="text-brandDark">{t}</option>
          ))}
        </select>
      </label>
      <fieldset className="space-y-2">
        <legend className="text-xs font-bold text-brandDark/60 mb-2">Do you have a website now?</legend>
        <div className="grid grid-cols-2 gap-2">
          {['No', 'Yes'].map((v) => (
            <label
              key={v}
              className={`cursor-pointer text-center py-3 rounded-xl border text-sm font-bold transition-colors ${
                hasSite === v ? 'border-brandYellow bg-brandYellow/15 text-brandDark' : 'border-brandDark/10 text-brandDark/60 hover:border-brandDark/25'
              }`}
            >
              <input type="radio" name="hasSite" value={v} required checked={hasSite === v} onChange={() => setHasSite(v)} className="sr-only" />
              {v}
            </label>
          ))}
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={state === 'sending'}
        className="w-full py-4 rounded-xl bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.25em] hover:bg-brandDark hover:text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {state === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : null}
        Send me my free design
      </button>
      {state === 'error' ? (
        <p className="text-sm text-red-600 text-center" role="alert">
          Something went wrong. Please{' '}
          <a href={whatsappUrl(WA_TEXT)} target="_blank" rel="noopener noreferrer" className="underline font-bold">WhatsApp us</a> instead.
        </p>
      ) : (
        <p className="text-[11px] text-brandDark/45 text-center">We reply on WhatsApp within 24 hours. No spam.</p>
      )}
    </form>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl bg-white border border-brandDark/5 p-6 open:shadow-sm">
      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-black text-brandDark text-lg">
        {q}
        <ChevronDown className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <p className="mt-3 text-brandDark/65 leading-relaxed">{a}</p>
    </details>
  );
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function WebsiteOfferPage({
  content,
  videos,
  reviews,
}: {
  content: SiteContent['websiteOffer'];
  videos: ClientVideo[];
  reviews: React.ReactNode;
}) {
  const { testimonials, portfolio } = content;
  const strip = ['Free homepage design in 48 hours', 'Live in 7 days', 'Domain + hosting for 1 year included', 'Free CRM for your enquiries'];

  return (
    <div className="font-sans">
      {/* Hero + form */}
      <section className="bg-brandDark pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative">
          <div className="lg:col-span-7 space-y-7">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-white/70 uppercase tracking-[0.2em]">
              <Globe className="w-3.5 h-3.5 text-brandYellow" aria-hidden="true" /> Website Design in Agra
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.02] tracking-tighter">
              A website that brings calls. <span className="text-brandYellow italic">₹9,999.</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/65 font-medium leading-relaxed max-w-2xl">
              Mobile-friendly, with WhatsApp and call buttons, domain and hosting for 1 year, and a free CRM for every enquiry. Live in 7 days.
            </p>
            <div className="rounded-2xl border border-brandYellow/30 bg-brandYellow/10 p-5 max-w-xl">
              <p className="text-white font-bold leading-relaxed">
                <span className="text-brandYellow">See your new homepage design free in 48 hours.</span> Pay only if you like it.
              </p>
            </div>
            <a
              href={whatsappUrl(WA_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact('whatsapp', 'website-offer-hero')}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold text-sm underline decoration-brandYellow decoration-2 underline-offset-4"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> Prefer WhatsApp? Message us
            </a>
          </div>
          <div className="lg:col-span-5">
            <OfferForm id="get-design" />
          </div>
        </div>
      </section>

      {/* Yellow strip */}
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

      {/* What you get */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-7">
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none">
              Everything for <br /> <span className="text-brandYellow">₹9,999.</span>
            </h2>
            <ul className="space-y-3.5">
              {INCLUDED.map((t) => (
                <li key={t} className="flex items-start gap-3 text-brandDark font-semibold text-lg">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-brandYellow text-brandDark flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="text-brandDark/55 text-sm">One-time payment: 50% to start, 50% before going live.</p>
          </div>
          <div className="rounded-[3rem] bg-brandBg border border-brandDark/5 min-h-[340px] p-6 sm:p-12 flex items-center justify-center overflow-hidden" aria-hidden="true">
            <ServiceVisual slug="website" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link href="/services/website" className="group rounded-[2rem] bg-brandBg border border-brandDark/5 p-7 flex items-center justify-between gap-6 hover:border-brandYellow transition-colors">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-brandDark/45">Already have a website?</p>
              <p className="text-xl font-black text-brandDark mt-1">Fix it from ₹4,999</p>
            </div>
            <ArrowRight className="w-5 h-5 text-brandDark group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <Link href="/services/website" className="group rounded-[2rem] bg-brandBg border border-brandDark/5 p-7 flex items-center justify-between gap-6 hover:border-brandYellow transition-colors">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-brandDark/45">Need a bigger website?</p>
              <p className="text-xl font-black text-brandDark mt-1">Business & Growth from ₹24,999</p>
            </div>
            <ArrowRight className="w-5 h-5 text-brandDark group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Portfolio */}
      {portfolio.length > 0 && (
        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-brandBg">
          <div className="max-w-7xl mx-auto space-y-12">
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none">Websites we built</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[2rem] bg-white border border-brandDark/5 overflow-hidden shadow-[0_10px_40px_-20px_rgba(0,29,33,0.25)] hover:-translate-y-1 transition-all"
                >
                  <div className="bg-brandDark/5 px-4 py-2.5 flex items-center gap-2 border-b border-brandDark/5">
                    <span className="w-2.5 h-2.5 rounded-full bg-brandDark/15"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-brandDark/15"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-brandDark/15"></span>
                    <span className="ml-2 text-[11px] text-brandDark/45 font-medium truncate">{hostOf(p.url)}</span>
                  </div>
                  <div className="relative aspect-[16/10] bg-brandBg overflow-hidden">
                    {/* Shown if the live preview cannot load. */}
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-brandDark/35" aria-hidden="true">
                      <Globe className="w-8 h-8" />
                      <span className="text-sm font-bold">{hostOf(p.url)}</span>
                    </span>
                    {/* Live screenshot of the client's site. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(p.url)}?w=800&h=500`}
                      alt={`${p.name || hostOf(p.url)} website`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      className="relative w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-black text-brandDark text-lg truncate">{p.name || hostOf(p.url)}</p>
                      {p.type ? <p className="text-sm text-brandDark/55 truncate">{p.type}</p> : null}
                    </div>
                    <ExternalLink className="w-4 h-4 text-brandDark/40 group-hover:text-brandYellow shrink-0" aria-hidden="true" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto space-y-12">
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none">What our clients say</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {testimonials.map((t, i) => (
                <figure key={i} className="break-inside-avoid rounded-[2rem] bg-brandBg border border-brandDark/5 p-7 space-y-5">
                  <Quote className="w-7 h-7 text-brandYellow" aria-hidden="true" />
                  <blockquote className="text-brandDark/80 leading-relaxed">{t.quote}</blockquote>
                  <figcaption className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-brandDark text-brandYellow font-black flex items-center justify-center shrink-0">
                      {(t.name || t.business || '?').trim().charAt(0).toUpperCase()}
                    </span>
                    <span className="min-w-0">
                      {t.name ? <span className="block font-black text-brandDark">{t.name}</span> : null}
                      {t.business ? <span className="block text-sm text-brandDark/55">{t.business}</span> : null}
                      {t.link ? (
                        <a href={t.link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-brandDark underline decoration-brandYellow underline-offset-2">
                          {hostOf(t.link)}
                        </a>
                      ) : null}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client videos (Settings → Client videos), then live Google reviews */}
      <ClientVideos videos={videos} />
      {reviews}

      {/* How it works */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-brandDark">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none">How it works</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7 space-y-4">
                <span className="w-11 h-11 rounded-xl bg-brandYellow text-brandDark font-black flex items-center justify-center">0{i + 1}</span>
                <h3 className="text-xl font-black text-white tracking-tight">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-brandBg">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl lg:text-5xl font-black text-brandDark tracking-tighter leading-none text-center">Questions</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <Faq key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 bg-brandDark text-center px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-8 relative">
          <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-none">
            See your website <br /> <span className="text-brandYellow">before you pay.</span>
          </h2>
          <p className="text-white/60 text-lg">Free homepage design in 48 hours. Pay only if you like it.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#get-design"
              className="px-10 py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-glow"
            >
              Get My Free Design
            </a>
            <a
              href={whatsappUrl(WA_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact('whatsapp', 'website-offer-cta')}
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
