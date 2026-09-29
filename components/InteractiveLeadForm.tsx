'use client';

import React, { useState } from 'react';
import { whatsappUrl } from '../config/site';
import { trackContact } from '../lib/track';
import { submitLead } from '../lib/submit-lead';
import { motion } from 'motion/react';
import {
  Check,
  Zap,
  Globe,
  User,
  Phone,
  Layout,
  Search,
  Megaphone,
  Wrench,
  Instagram,
  ShoppingCart,
  Target,
  BarChart3,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { Footer } from './Footer';

interface InteractiveLeadFormProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onBookAudit: () => void;
}

/** What a visitor can ask for. Plain words a shop owner would use. */
const NEEDS: { id: string; icon: React.ReactNode }[] = [
  { id: 'New website', icon: <Layout className="w-5 h-5" /> },
  { id: 'Fix my current website', icon: <Wrench className="w-5 h-5" /> },
  { id: 'More enquiries from ads', icon: <Megaphone className="w-5 h-5" /> },
  { id: 'Show up on Google', icon: <Search className="w-5 h-5" /> },
  { id: 'Social media', icon: <Instagram className="w-5 h-5" /> },
  { id: 'Online store / D2C', icon: <ShoppingCart className="w-5 h-5" /> },
];

const inputClass =
  'w-full bg-[#fcfcfc] border-2 border-[#d8d8d8] px-6 py-5 pl-14 text-sm font-bold focus:ring-4 focus:ring-brandYellow/10 focus:border-brandYellow outline-none rounded-2xl transition-all group-hover:border-brandDark/20 placeholder:text-brandDark/30';

const labelClass = 'text-[11px] font-bold text-brandDark/60 uppercase tracking-[0.2em] ml-1';

/**
 * The free health check form: one short screen. Anything more detailed
 * (budget, numbers, timeline) is asked later on WhatsApp.
 */
export const InteractiveLeadForm: React.FC<InteractiveLeadFormProps> = ({ onBack, onNavigate, onBookAudit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);

  const toggleNeed = (id: string) =>
    setNeeds((current) => (current.includes(id) ? current.filter((n) => n !== id) : [...current, id]));

  const canSubmit = Boolean(fullName.trim() && phone.trim() && businessName.trim() && needs.length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setSubmitError(false);

    submitLead({
      sourceForm: 'health-check',
      name: fullName,
      phone,
      brandName: businessName,
      website,
      extra: { needs },
    }).then((result) => {
      setLoading(false);
      if (result.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Never show success for a lead that did not arrive.
        setSubmitError(true);
      }
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brandBg flex flex-col font-sans">
        <div className="flex-grow flex items-center justify-center px-6 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-12 max-w-3xl mx-auto"
          >
            {/* Success Header */}
            <div className="space-y-4">
              <div className="w-20 h-20 bg-brandYellow rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-brandYellow/20">
                <Check className="w-10 h-10 text-brandDark" strokeWidth={3} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-brandDark">
                REQUEST RECEIVED.
              </h2>
              <p className="text-brandDark/60 text-lg font-medium max-w-xl mx-auto">
                Thank you! I'll personally review your business and WhatsApp you within 24 hours.
              </p>
            </div>

            {/* The 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "I Review", desc: "Your website, Google profile and social pages.", icon: <BarChart3 className="w-6 h-6" /> },
                { title: "Find the Gaps", desc: "The 3 things costing you enquiries.", icon: <Zap className="w-6 h-6" /> },
                { title: "Share on WhatsApp", desc: "Clear findings and fixes, with no obligation.", icon: <Target className="w-6 h-6" /> }
              ].map((card, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] border border-brandDark/5 shadow-xl space-y-4 text-left relative overflow-hidden group hover:border-brandYellow/50 transition-colors">
                  <div className="w-12 h-12 bg-brandDark/5 rounded-2xl flex items-center justify-center text-brandDark group-hover:bg-brandYellow transition-colors">
                    {card.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black uppercase text-sm tracking-tight">{card.title}</h3>
                    <p className="text-brandDark/40 text-xs leading-relaxed font-medium">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Action */}
            <div className="space-y-8 pt-4">
              <div className="space-y-4">
                <button 
                  onClick={() => { trackContact('whatsapp', 'interactive-form-book-call'); window.open(whatsappUrl('Hi Techinfigo, I just requested a free health check for my business.'), '_blank'); }}
                  className="w-full md:w-auto px-12 py-6 bg-[#fcb632] text-brandDark font-black text-lg uppercase tracking-[0.2em] rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-brandYellow/30"
                >
                  Chat on WhatsApp Now
                </button>
                
                <div className="flex flex-col items-center gap-4">
                  <a 
                    href={whatsappUrl()}
                    onClick={() => trackContact('whatsapp', 'interactive-form')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brandDark/60 hover:text-brandDark font-bold text-sm flex items-center gap-2 transition-colors"
                  >
                    Want faster response? <span className="text-[#25D366] underline">Chat on WhatsApp</span>
                  </a>
                  
                  <p className="text-brandYellow text-[11px] font-black uppercase tracking-[0.3em] animate-pulse">
                    I'll WhatsApp you within 24 hours
                  </p>
                </div>
              </div>

              {/* Value Reminder */}
              <div className="bg-brandDark/5 rounded-[2.5rem] p-8 space-y-6 border border-brandDark/5">
                <p className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.4em]">Your health check includes:</p>
                <div className="flex flex-wrap justify-center gap-8">
                  {[
                    "3 issues costing enquiries",
                    "How to fix each one",
                    "Honest recommendation"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brandYellow"></div>
                      <span className="text-xs font-black uppercase tracking-tight text-brandDark">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={onBack}
                className="text-brandDark/40 hover:text-brandDark font-black text-[10px] uppercase tracking-[0.4em] transition-colors"
              >
                Go Back to Home
              </button>
            </div>
          </motion.div>
        </div>
        <Footer onNavigate={onNavigate} onBookAudit={onBookAudit} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandBg font-sans">
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 lg:pt-36 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-20">
          {/* Left Sidebar: Context */}
          <aside className="lg:col-span-4 space-y-8 animate-slide-up">
            <div className="bg-[#001d21] rounded-[2.5rem] p-8 lg:p-10 space-y-10 shadow-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
              
              <div className="space-y-2 relative z-10">
                <p className="text-brandYellow text-[10px] font-bold uppercase tracking-[0.3em]">What You Get</p>
                <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-none">Free Health <br/> Check</h2>
              </div>

              <div className="space-y-6 relative z-10">
                {[
                  { title: "Honest Review", desc: "I check your website, Google profile and social pages.", icon: <Layout className="w-5 h-5" /> },
                  { title: "3 Clear Fixes", desc: "The 3 things costing you enquiries, and how to fix each one.", icon: <BarChart3 className="w-5 h-5" /> },
                  { title: "Founder-Led", desc: "You talk directly with Sachin, the founder. No call centre.", icon: <Zap className="w-5 h-5" /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brandYellow group-hover:text-brandDark transition-all duration-500">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-white font-black uppercase text-sm tracking-tight">{item.title}</h3>
                      <p className="text-white/40 text-xs leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-brandYellow/20 flex items-center justify-center text-brandYellow">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest">Your Privacy</p>
                    <p className="text-[11px] font-medium text-white/50">Your details stay private and are never shared or sold.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main: One-Screen Form */}
          <main className="lg:col-span-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-px bg-brandYellow"></span>
                  <p className="text-brandYellow text-[11px] font-black uppercase tracking-[0.4em]">Free Health Check</p>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-brandDark tracking-tight uppercase leading-none">
                  Tell Us About <br className="sm:hidden" /> Your Business
                </h1>
                <p className="text-brandDark/60 text-sm font-medium">Takes 20 seconds. I'll WhatsApp you within 24 hours.</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'circOut' }}
                className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-[0_32px_90px_rgba(0,29,33,0.24),0_10px_28px_rgba(0,29,33,0.12)] border border-brandDark/15 relative overflow-hidden"
              >

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="hc-name" className={labelClass}>Your Name *</label>
                      <div className="relative group">
                        <input
                          id="hc-name"
                          required
                          type="text"
                          autoComplete="name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className={inputClass}
                        />
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/30 group-focus-within:text-brandYellow transition-colors" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="hc-phone" className={labelClass}>WhatsApp Number *</label>
                      <div className="relative group">
                        <input
                          id="hc-phone"
                          required
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98XXX XXXXX"
                          className={inputClass}
                        />
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/30 group-focus-within:text-brandYellow transition-colors" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="hc-business" className={labelClass}>Business Name *</label>
                      <div className="relative group">
                        <input
                          id="hc-business"
                          required
                          type="text"
                          autoComplete="organization"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="e.g. Sharma Sweets"
                          className={inputClass}
                        />
                        <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/30 group-focus-within:text-brandYellow transition-colors" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="hc-website" className={labelClass}>Website or Instagram (Optional)</label>
                      <div className="relative group">
                        <input
                          id="hc-website"
                          type="text"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="If you have one"
                          className={inputClass}
                        />
                        <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brandDark/30 group-focus-within:text-brandYellow transition-colors" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <fieldset className="space-y-3">
                    <legend className={labelClass}>What Do You Need? * <span className="normal-case tracking-normal font-medium text-brandDark/40">(tap one or more)</span></legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3">
                      {NEEDS.map((need) => {
                        const selected = needs.includes(need.id);
                        return (
                          <button
                            key={need.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => toggleNeed(need.id)}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 text-left text-sm font-bold transition-all ${
                              selected
                                ? 'border-brandYellow bg-brandYellow/10 text-brandDark'
                                : 'border-[#d8d8d8] text-brandDark/70 hover:border-brandDark/20'
                            }`}
                          >
                            <span className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${selected ? 'bg-brandYellow text-brandDark' : 'bg-brandDark/5 text-brandDark/50'}`}>
                              {selected ? <Check className="w-5 h-5" strokeWidth={3} /> : need.icon}
                            </span>
                            {need.id}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {submitError && (
                    <p role="alert" className="text-sm font-medium text-red-600">
                      Something went wrong sending your details. Please try again, or{' '}
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackContact('whatsapp', 'health-check-error')}
                        className="underline font-bold"
                      >
                        message us on WhatsApp
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !canSubmit}
                    className="w-full py-6 bg-[#fcb632] text-brandDark font-black text-sm uppercase tracking-[0.3em] rounded-[1.5rem] hover:bg-brandDark hover:text-white transition-all duration-500 shadow-2xl shadow-brandYellow/20 flex items-center justify-center gap-4 group disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : (
                      <>
                        Get My Free Health Check
                        <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" fill="currentColor" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] font-bold text-brandDark/40 uppercase tracking-[0.2em]">
                    No payment needed. Completely free.
                  </p>
                </form>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
      <Footer onNavigate={onNavigate} onBookAudit={onBookAudit} />
    </div>
  );
};
