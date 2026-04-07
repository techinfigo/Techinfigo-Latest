
'use client';

import React, { useState, useEffect } from 'react';
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
      desc: "Stop burning cash on 'boost posts'. We build high-ROAS funnels that turn Agra's social users into paying customers.",
      icon: <Facebook className="w-6 h-6" />,
      keyword: "ads agency agra"
    },
    {
      title: "Google Ads (PPC)",
      desc: "Get found by people actively searching for your services in Agra. High-intent traffic that converts into immediate leads.",
      icon: <Search className="w-6 h-6" />,
      keyword: "ppc services agra"
    },
    {
      title: "Website Development",
      desc: "A slow website is a profit killer. We build lightning-fast, conversion-optimized websites for Agra businesses.",
      icon: <Globe className="w-6 h-6" />,
      keyword: "web development agra"
    },
    {
      title: "Ecommerce (D2C) Growth",
      desc: "Scaling your Agra-based brand to a national level. We handle everything from CAC optimization to LTV growth.",
      icon: <ShoppingCart className="w-6 h-6" />,
      keyword: "ecommerce growth agra"
    },
    {
      title: "SEO Services",
      desc: "Dominate the local search results. We help you rank #1 on Google for keywords your Agra customers are using.",
      icon: <TrendingUp className="w-6 h-6" />,
      keyword: "seo services agra"
    }
  ];

  const faqs = [
    {
      q: "How much does digital marketing cost in Agra?",
      a: "Our pricing is performance-linked. We don't have 'packages'. We build custom growth plans based on your revenue goals and current stage. We ensure every rupee spent generates a positive ROI."
    },
    {
      q: "How soon can I see results?",
      a: "For Paid Ads (FB/Google), you can see leads within 48-72 hours. For SEO and organic growth, it typically takes 3-6 months to see significant ranking shifts. We focus on 'quick wins' while building long-term assets."
    },
    {
      q: "Do you work with small businesses in Agra?",
      a: "Yes. We work with ambitious local businesses in Agra that are ready to scale. Whether you are a local showroom, a service provider, or an emerging D2C brand, we have a strategy for your budget."
    }
  ];

  return (
    <div className="bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      
      {/* Sticky CTA for Mobile/Desktop */}
      <div 
        className={`fixed bottom-6 left-0 right-0 z-[100] px-6 md:hidden transition-transform duration-500 ${isStickyVisible ? 'translate-y-0' : 'translate-y-32'}`}
      >
        <button 
          onClick={onBookAudit}
          className="w-full bg-[#fcb632] text-brandDark py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3"
        >
          <Zap className="w-5 h-5 fill-current" />
          Get Free Audit
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
              Digital Marketing <br/>
              <span className="text-brandYellow">Agency in Agra</span> <br/>
              That Actually Grows <br/>
              Your Business.
            </h1>
            
            <p className="text-base md:text-lg text-white/60 font-medium leading-relaxed max-w-xl">
              Stop settling for vanity metrics. We build performance-focused strategies that drive real leads, sales, and profit for brands in Agra.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button 
                onClick={onBookAudit}
                aria-label="Get Free Growth Audit"
                className="w-full sm:w-auto px-8 py-4 bg-[#fcb632] text-brandDark font-black text-sm uppercase tracking-[0.3em] rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(252,182,50,0.3)]"
              >
                Get Free Growth Audit
              </button>
              <button 
                onClick={() => window.open('https://wa.me/yournumber', '_blank')}
                aria-label="Talk to Expert on WhatsApp"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 font-black text-sm uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
                Talk to Expert
              </button>
            </div>

            <div className="flex items-center gap-8 pt-6 border-t border-white/5">
              <div className="space-y-1">
                <p className="text-xl font-black text-white">100%</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">ROI Focused</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-black text-white">24h</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Response Time</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-black text-white">Agra</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Local Expertise</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative z-10 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-white uppercase tracking-widest">Live Growth Feed</p>
                  <div className="w-2 h-2 rounded-full bg-brandYellow animate-pulse" aria-hidden="true"></div>
                </div>
                
                {[
                  { label: "New Lead Captured", time: "2 mins ago", val: "+₹45k Potential" },
                  { label: "ROAS Optimized", time: "15 mins ago", val: "4.2x ROAS" },
                  { label: "SEO Ranking #1", time: "1 hour ago", val: "Agra Local" }
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
                  "Not getting enough qualified leads in Agra?",
                  "Ads running but not giving profitable results?",
                  "Website looks good but doesn't convert visitors?",
                  "Wasting money on agencies that only talk about 'reach'?"
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
                <p className="text-white/40 text-sm">Most agencies in Agra focus on vanity metrics. We focus on your P&L.</p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-brandBg rounded-[3rem] overflow-hidden border border-brandDark/20 flex items-center justify-center p-12 shadow-inner">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-brandYellow rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Zap className="w-10 h-10 text-brandDark" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-black text-brandDark uppercase tracking-tight">The Growth Engine</h3>
                  <p className="text-brandDark/40 font-medium">We audit your entire funnel to find where the money is leaking.</p>
                  <button 
                    onClick={onBookAudit}
                    aria-label="See How Our Growth Engine Works"
                    className="text-brandDark font-black text-xs uppercase tracking-widest border-b-2 border-brandYellow pb-1 hover:text-brandYellow transition-colors"
                  >
                    See How It Works
                  </button>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 bg-white shadow-2xl p-4 rounded-2xl border border-brandDark/20 animate-bounce-subtle">
                <p className="text-[10px] font-black uppercase text-brandDark/40">Efficiency</p>
                <p className="text-lg font-black text-brandDark">+42%</p>
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
                  onClick={onBookAudit}
                  aria-label={`Get ${service.title} Plan`}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brandDark group-hover:text-brandYellow transition-colors"
                >
                  Get {service.title.split(' ')[0]} Plan
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <p className="mt-4 text-[9px] font-bold text-brandDark/10 uppercase tracking-widest">{service.keyword}</p>
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
                  { title: "Custom Growth Plans", desc: "No generic packages. Every Agra business gets a unique roadmap.", icon: <Target className="w-5 h-5" /> },
                  { title: "Transparent Reporting", desc: "Real-time dashboards so you know exactly where your money goes.", icon: <ShieldCheck className="w-5 h-5" /> }
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
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 space-y-10">
              <div className="text-center space-y-2">
                <p className="text-4xl font-black text-brandYellow">₹50Cr+</p>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Revenue Generated for Clients</p>
              </div>
              <div className="h-px bg-white/10 w-full"></div>
              <div className="space-y-6">
                <p className="text-sm font-medium text-white/60 text-center italic">
                  "Techinfigo transformed our local Agra store into a national brand. Our online sales grew by 300% in just 6 months."
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brandYellow/20"></div>
                  <div className="text-left">
                    <p className="text-xs font-black uppercase text-white">Local Agra Founder</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Retail Sector</p>
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
            <span className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.4em]">The Roadmap</span>
            <h2 className="text-4xl md:text-6xl font-black text-brandDark tracking-tighter uppercase">
              3 Steps to <br className="md:hidden"/> Scale.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-brandDark/10 -translate-y-1/2 z-0"></div>
            
            {[
              { step: "01", title: "Free Audit", desc: "We analyze your current digital presence and identify profit leaks.", icon: <Search className="w-6 h-6" /> },
              { step: "02", title: "Strategy Plan", desc: "We build a custom growth roadmap with clear KPIs and timelines.", icon: <Target className="w-6 h-6" /> },
              { step: "03", title: "Execution & Growth", desc: "Our team deploys and optimizes, driving real-time results.", icon: <Zap className="w-6 h-6" /> }
            ].map((item, i) => (
              <div key={i} className="relative z-10 bg-white p-8 rounded-[2.5rem] border border-brandDark/20 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-brandYellow/30 transition-all duration-300 text-center space-y-6">
                <div className="w-16 h-16 bg-brandDark text-white rounded-2xl flex items-center justify-center mx-auto text-xl font-black shadow-xl">
                  {item.step}
                </div>
                <h3 className="text-2xl font-black text-brandDark uppercase tracking-tight">{item.title}</h3>
                <p className="text-brandDark/60 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: LOCAL TRUST */}
      <section className="py-24 px-6 lg:px-12 bg-brandBg overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.4em]">Agra's Growth Partner</span>
              <h2 className="text-4xl md:text-5xl font-black text-brandDark tracking-tighter uppercase leading-none">
                Helping Agra <br/>
                <span className="text-brandDark/30">Businesses Win.</span>
              </h2>
            </div>
            <p className="text-lg text-brandDark/70 font-medium leading-relaxed">
              Agra is a unique market. From the bustling markets of Sanjay Place to the emerging tech hubs, we understand the local consumer behavior better than anyone else. We don't just provide digital marketing; we provide local market dominance.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Sanjay Place", "Civil Lines", "Kamla Nagar", "Dayalbagh", "Fatehabad Road"].map((loc, i) => (
                <span key={i} className="px-4 py-2 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest border border-brandDark/5 text-brandDark/40">
                  {loc}
                </span>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="aspect-video bg-brandDark/5 rounded-[3rem] border border-brandDark/5 overflow-hidden flex items-center justify-center relative">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                alt="Agra Office" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="text-center space-y-4 relative z-10">
                <MapPin className="w-12 h-12 text-brandYellow mx-auto" aria-hidden="true" />
                <p className="text-xs font-black uppercase text-brandDark/40 tracking-widest">Agra Operations Center</p>
                <p className="text-sm font-bold text-brandDark">Serving Clients Across Agra & Beyond</p>
              </div>
            </div>
            {/* Floating stats */}
            <div className="absolute -bottom-6 -right-6 bg-brandYellow p-6 rounded-2xl shadow-2xl">
              <p className="text-[10px] font-black uppercase text-brandDark/60">Local Clients</p>
              <p className="text-2xl font-black text-brandDark">50+</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: STRONG CTA */}
      <section className="py-24 px-6 lg:px-12 bg-[#001d21] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            Stop Wasting Money <br/>
            <span className="text-brandYellow">On Marketing That <br/> Doesn't Work.</span>
          </h2>
          <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto">
            Get a free growth audit and see exactly what’s holding your business back in the Agra market. No strings attached.
          </p>
          <div className="pt-6">
            <button 
              onClick={onBookAudit}
              aria-label="Get Your Free Strategy Plan Now"
              className="px-12 py-6 bg-[#fcb632] text-brandDark font-black text-xl uppercase tracking-[0.3em] rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_50px_rgba(252,182,50,0.4)]"
            >
              Get Free Strategy Plan
            </button>
          </div>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">Limited Slots Available for Agra Businesses This Month</p>
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
