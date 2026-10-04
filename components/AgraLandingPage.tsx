
'use client';

import React, { useState, useEffect } from 'react';
import { whatsappUrl } from '../config/site';
import { trackContact } from '../lib/track';
import { PricingTabs } from './PricingTabs';
import { 
  Zap, 
  Target, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Globe, 
  Smartphone, 
  Search, 
  Facebook, 
  ShoppingCart, 
  ChevronDown,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users
} from 'lucide-react';

/** Google Maps place of the Techinfigo Business Profile (Sanjay Place). */
const GBP_PLACE_ID = 'ChIJd-bZWwl3dDkRj4H5YdWtwPM';
const OFFICE_ADDRESS = 'Office no. 03, Second Floor, Block no. 25, Cloth Market, Sanjay Place, Civil Lines, Agra, Uttar Pradesh 282002';
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent('TECHINFIGO - Digital Marketing Agency, Sanjay Place, Agra')}&z=16&output=embed`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('TECHINFIGO - Digital Marketing Agency')}&destination_place_id=${GBP_PLACE_ID}`;

interface AgraLandingPageProps {
  onNavigate: (page: string) => void;
  onBookAudit: () => void;
}

export const AgraLandingPage: React.FC<AgraLandingPageProps> = ({ onNavigate, onBookAudit }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsStickyVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Facebook & Instagram Ads",
      desc: "Stop burning cash on 'boost posts'. Lead ads and click-to-WhatsApp campaigns that bring real enquiries, not just likes. Every lead lands in your free CRM.",
      icon: <Facebook className="w-6 h-6" />,
    },
    {
      title: "Google Ads",
      desc: "Reach people at the exact moment they search for your service in Agra. Every call and form enquiry is tracked, so you see what each one costs.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      title: "Website Development",
      desc: "Fast, mobile-friendly websites with WhatsApp and call buttons on every page. Already have a website? We upgrade it to bring enquiries instead of rebuilding it.",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "Ecommerce (D2C) Growth",
      desc: "Taking your Agra-based brand to customers across India, from store improvements to Meta sales campaigns for leather, handicraft and food brands.",
      icon: <ShoppingCart className="w-6 h-6" />,
    },
    {
      title: "SEO & Google Business Profile",
      desc: "Show up when Agra customers search for your service on Google and Maps, with an optimised Google profile, reviews and pages built for local search.",
      icon: <TrendingUp className="w-6 h-6" />,
    }
  ];

  const faqs = [
    {
      q: "How much does digital marketing cost in Agra?",
      a: "Our starting prices: Website Enquiry Upgrade from ₹4,999, Website Development from ₹9,999, Social Media Marketing and Local SEO from ₹7,999 a month, and Facebook & Instagram Ads from ₹14,999 a month (ad budget separate). The exact quote comes after a free website health check."
    },
    {
      q: "How soon can I see results for my Agra business?",
      a: "Paid ads usually start bringing enquiries within the first 2–4 weeks, once campaigns are tested. SEO and Google profile work takes 3–6 months. We never promise exact numbers, but every enquiry is tracked in your free CRM, so you can see what is working."
    },
    {
      q: "What is the free CRM?",
      a: "Every client gets a simple dashboard where each call, WhatsApp and form enquiry is recorded in one place, with an alert on your phone. You always know how many enquiries came in and from where. It is included in every package at no extra cost."
    },
    {
      q: "Do you work with local shops and businesses in Agra?",
      a: "Yes. We work with shops, showrooms, clinics, coaching centres, hotels and restaurants, and with Agra brands that sell online."
    }
  ];

  return (
    <div className="bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      
      {/* Sticky CTA for Mobile/Desktop */}
      <div 
        className={`fixed bottom-20 left-0 right-0 z-[100] px-6 md:hidden transition-transform duration-500 ${isStickyVisible ? 'translate-y-0' : 'translate-y-32'}`}
      >
        <button 
          onClick={onBookAudit}
          className="w-full bg-[#fcb632] text-brandDark py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3"
        >
          <Zap className="w-5 h-5 fill-current" />
          Get Free Health Check
        </button>
      </div>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[75vh] flex items-center pt-24 pb-12 px-6 lg:px-12 overflow-hidden bg-[#001d21]">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brandYellow/5 rounded-full blur-[120px] -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-brandYellow/5 rounded-full blur-[100px] -ml-10 -mb-10"></div>
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <MapPin className="w-4 h-4 text-brandYellow" aria-hidden="true" />
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Serving Agra Businesses</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase">
              Websites & Marketing <br/>
              <span className="text-brandYellow">for Agra Businesses</span> <br/>
              With Every <br/>
              Enquiry Tracked.
            </h1>
            
            <p className="text-base md:text-lg text-white/60 font-medium leading-relaxed max-w-xl">
              We build websites that bring enquiries and run your Google profile, social media and ads. Every client gets a free CRM, so you see every call, WhatsApp and form enquiry in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button 
                onClick={onBookAudit}
                aria-label="Get Free Website Health Check"
                className="w-full sm:w-auto px-8 py-4 bg-[#fcb632] text-brandDark font-black text-sm uppercase tracking-[0.3em] rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(252,182,50,0.3)]"
              >
                Get Free Health Check
              </button>
              <button 
                onClick={() => { trackContact('whatsapp', 'agra'); window.open(whatsappUrl(), '_blank'); }}
                aria-label="Talk to Expert on WhatsApp"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 font-black text-sm uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
                Talk to Expert
              </button>
            </div>

            <div className="flex items-center gap-8 pt-6 border-t border-white/5">
              <div className="space-y-1">
                <p className="text-xl font-black text-white">Free</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">CRM Included</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-black text-white">24h</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Response Time</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-black text-white">Agra</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Local Office</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative z-10 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-white uppercase tracking-widest">What Every Client Gets</p>
                  <div className="w-2 h-2 rounded-full bg-brandYellow animate-pulse" aria-hidden="true"></div>
                </div>
                
                {[
                  { label: "Enquiry Dashboard", time: "Calls, WhatsApp & forms in one place", val: "Free CRM" },
                  { label: "Instant Alerts", time: "Know the moment an enquiry arrives", val: "On Your Phone" },
                  { label: "Monthly Report", time: "Enquiries, cost & what changes next", val: "Every Month" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">{item.label}</p>
                      <p className="text-[10px] text-white/40 uppercase font-bold">{item.time}</p>
                    </div>
                    <p className="text-xs font-black text-brandYellow">{item.val}</p>
                  </div>
                ))}
                
                <div className="pt-2">
                  <div className="w-full h-24 bg-brandYellow/10 rounded-2xl border border-brandYellow/20 flex items-center justify-center">
                    <BarChart3 className="w-10 h-10 text-brandYellow opacity-50" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brandYellow/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brandYellow/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM AGITATION */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.4em]">The Reality Check</span>
                <h2 className="text-4xl md:text-5xl font-black text-brandDark tracking-tighter uppercase leading-none">
                  Is Your Marketing <br/>
                  <span className="text-brandDark/30">Actually Working?</span>
                </h2>
              </div>
              
              <div className="space-y-6">
                {[
                  "Not getting enough qualified leads from Agra's local market?",
                  "Running Facebook Ads but not seeing footfall in your Sanjay Place showroom?",
                  "Website looks good but doesn't rank for 'Best Services in Agra'?",
                  "Wasting money on generic agencies that don't understand the Agra consumer?"
                ].map((pain, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-brandDark/5 flex items-center justify-center shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-brandDark/20"></div>
                    </div>
                    <p className="text-lg font-medium text-brandDark/70">{pain}</p>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-brandDark text-white rounded-[2.5rem] space-y-4">
                <p className="text-xl font-bold italic">"We fix the root problem, not just run ads."</p>
                <p className="text-white/40 text-sm">We focus on enquiries and sales, not likes and followers.</p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-brandBg rounded-[3rem] overflow-hidden border border-brandDark/20 flex items-center justify-center p-12 shadow-inner">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-brandYellow rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Zap className="w-10 h-10 text-brandDark" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-black text-brandDark uppercase tracking-tight">The Growth Engine</h3>
                  <p className="text-brandDark/40 font-medium">We check your website, Google profile and social pages to find where enquiries are being lost.</p>
                  <button 
                    onClick={onBookAudit}
                    aria-label="Get a Free Website Health Check"
                    className="text-brandDark font-black text-xs uppercase tracking-widest border-b-2 border-brandYellow pb-1 hover:text-brandYellow transition-colors"
                  >
                    Get Free Health Check
                  </button>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 bg-white shadow-2xl p-4 rounded-2xl border border-brandDark/20 animate-bounce-subtle">
                <p className="text-[10px] font-black uppercase text-brandDark/40">Health Check</p>
                <p className="text-lg font-black text-brandDark">Free</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section className="py-24 px-6 lg:px-12 bg-brandBg">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.4em]">Our Expertise</span>
            <h2 className="text-4xl md:text-6xl font-black text-brandDark tracking-tighter uppercase">
              Full-Stack <br className="md:hidden"/> Growth Services.
            </h2>
            <p className="text-brandDark/40 text-lg font-medium max-w-2xl mx-auto">
              Tailored solutions for businesses in Agra looking to dominate their market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div 
                key={i}
                className="bg-white p-10 rounded-[2.5rem] border border-brandDark/20 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.1)] hover:border-brandYellow/40 transition-all duration-500 group hover:-translate-y-3"
              >
                <div className="w-14 h-14 bg-brandDark/5 rounded-2xl flex items-center justify-center text-brandDark group-hover:bg-brandYellow transition-colors duration-500 mb-8 shadow-inner border border-brandDark/5">
                  <span aria-hidden="true">{service.icon}</span>
                </div>
                <h3 className="text-2xl font-black text-brandDark uppercase tracking-tight mb-4 leading-tight">
                  {service.title}
                </h3>
                <p className="text-brandDark/60 text-sm leading-relaxed font-medium mb-8">
                  {service.desc}
                </p>
                <button
                  onClick={() => {
                    trackContact('whatsapp', `agra-service-${service.title}`);
                    window.open(whatsappUrl(`Hi Techinfigo, I would like to know more about ${service.title} for my business.`), '_blank');
                  }}
                  aria-label={`Ask about ${service.title} on WhatsApp`}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brandDark group-hover:text-brandYellow transition-colors"
                >
                  Ask About This
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="py-24 px-6 lg:px-12 bg-[#001d21] text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brandYellow/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.4em]">The Techinfigo Edge</span>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                  Why Agra Brands <br/>
                  <span className="text-white/30">Trust Us.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Data-Driven Strategy", desc: "We don't guess. We use real-time data to pivot and scale.", icon: <BarChart3 className="w-5 h-5" /> },
                  { title: "ROI Focused", desc: "Vanity metrics don't pay bills. We focus on your bottom line.", icon: <TrendingUp className="w-5 h-5" /> },
                  { title: "Clear Packages", desc: "Fixed starting prices, with a plan built around your business.", icon: <Target className="w-5 h-5" /> },
                  { title: "Transparent Reporting", desc: "Your free CRM shows every enquiry, so you know exactly what your money brings.", icon: <ShieldCheck className="w-5 h-5" /> }
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brandYellow">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 space-y-10">
              <div className="text-center space-y-2">
                <p className="text-4xl font-black text-brandYellow">Free CRM</p>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">With Every Package</p>
              </div>
              <div className="h-px bg-white/10 w-full"></div>
              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <p className="text-sm font-black uppercase text-white tracking-widest">Founder-Led</p>
                  <p className="text-base font-medium text-white/60 italic">
                    "You work directly with Sachin, the founder. I handle every project personally, so I take on a limited number each month."
                  </p>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brandYellow/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-brandYellow" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black uppercase text-white">Full Transparency</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Accountability First</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PROCESS */}
      <section className="py-24 px-6 lg:px-12 bg-brandBg/50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.4em]">Your Growth Plan</span>
            <h2 className="text-4xl md:text-6xl font-black text-brandDark tracking-tighter uppercase leading-none">
              How We <br className="md:hidden"/> Work.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-brandDark/10 -translate-y-1/2 z-0"></div>
            
            {[
              { step: "01", title: "Free Health Check", desc: "We check your website, Google profile and social pages and show you 3 things costing you enquiries.", icon: <Search className="w-6 h-6" /> },
              { step: "02", title: "Clear Plan & Price", desc: "You get a simple plan with a fixed price. No hidden costs, and ad budget is always separate.", icon: <Target className="w-6 h-6" /> },
              { step: "03", title: "Build & Track", desc: "We build and run it, and every call, WhatsApp and form enquiry lands in your free CRM.", icon: <Zap className="w-6 h-6" /> }
            ].map((item, i) => (
              <div key={i} className="relative z-10 bg-white p-8 rounded-[2.5rem] border border-brandDark/20 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-brandYellow/30 transition-all duration-300 text-center space-y-6">
                <div className="w-16 h-16 bg-brandDark text-white rounded-2xl flex items-center justify-center mx-auto text-xl font-black shadow-xl">
                  {item.step}
                </div>
                <h3 className="text-2xl font-black text-brandDark uppercase tracking-tight leading-none">{item.title}</h3>
                <p className="text-brandDark/60 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5B: PACKAGES */}
      <PricingTabs />

      {/* SECTION 6: LOCAL TRUST */}
      <section className="py-24 px-6 lg:px-12 bg-brandBg overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.4em]">Agra's Growth Partner</span>
              <h2 className="text-4xl md:text-5xl font-black text-brandDark tracking-tighter uppercase leading-none">
                Helping Agra <br/>
                <span className="text-brandDark/30">Brands Dominate.</span>
              </h2>
            </div>
            <p className="text-lg text-brandDark/70 font-medium leading-relaxed">
              We're based in Sanjay Place and work with businesses across Agra, from the commercial hubs to Dayalbagh and Kamla Nagar. Meet us in person, or talk to us on WhatsApp. 
            </p>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brandYellow shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-2">
                <address className="not-italic text-sm font-semibold text-brandDark leading-relaxed">
                  Techinfigo - Digital Marketing Agency<br />
                  {OFFICE_ADDRESS}
                </address>
                <a
                  href={DIRECTIONS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brandDark underline decoration-brandYellow decoration-2 underline-offset-4 hover:text-brandDark/70"
                >
                  Get directions <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {["Sanjay Place", "Sikandra", "Kamla Nagar", "Dayalbagh", "Fatehabad Road", "Shahganj", "Raja Ki Mandi"].map((loc, i) => (
                <span key={i} className="px-4 py-2 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest border border-brandDark/5 text-brandDark/40">
                  {loc}
                </span>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="aspect-video bg-brandDark/5 rounded-[3rem] border border-brandDark/5 overflow-hidden relative">
              <iframe
                src={MAP_EMBED}
                title="Techinfigo office on Google Maps, Sanjay Place, Agra"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
              />
            </div>
            {/* Floating stats */}
            <div className="absolute -bottom-6 -right-6 bg-brandYellow p-6 rounded-2xl shadow-2xl">
              <p className="text-[10px] font-black uppercase text-brandDark/60">Based In</p>
              <p className="text-2xl font-black text-brandDark">Sanjay Place</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: STRONG CTA */}
      <section className="py-24 px-6 lg:px-12 bg-[#001d21] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            Stop Wasting Money <br/>
            <span className="text-brandYellow">On Marketing That <br /> Doesn't Work.</span>
          </h2>
          <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto">
            Get a free website health check and see exactly what is stopping your enquiries. No charge, no pressure.
          </p>
          <div className="pt-6">
            <button 
              onClick={onBookAudit}
              aria-label="Get My Free Website Health Check"
              className="px-12 py-6 bg-[#fcb632] text-brandDark font-black text-xl uppercase tracking-[0.3em] rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_50px_rgba(252,182,50,0.4)]"
            >
              Get My Free Health Check
            </button>
          </div>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">Or WhatsApp us on +91 95573 38487</p>
        </div>
      </section>

      {/* SECTION 8: FAQ */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.4em]">Common Questions</span>
            <h2 className="text-4xl font-black text-brandDark tracking-tighter uppercase">FAQ.</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-brandDark/20 rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-brandDark/[0.01] transition-colors"
                >
                  <span className="text-sm font-black uppercase tracking-tight text-brandDark">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-brandDark/40 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-brandYellow' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ${activeFaq === i ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="p-6 pt-0 text-brandDark/60 text-sm font-medium leading-relaxed border-t border-brandDark/5">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
