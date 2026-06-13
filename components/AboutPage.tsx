'use client';

import React from 'react';
import Image from 'next/image';
import { Target, ShieldCheck, Users, ArrowRight, Zap, CheckCircle2, MessageSquare, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      
      {/* 1. Hero Section */}
      <section className="bg-brandDark pt-24 pb-16 lg:pt-40 lg:pb-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brandYellow/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:space-y-12"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <div className="w-2 h-2 rounded-full bg-brandYellow animate-pulse" />
              <span className="text-[10px] lg:text-[11px] font-black text-white/60 uppercase tracking-[0.4em]">The Techinfigo Mission</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter max-w-6xl uppercase">
              Built by a Founder, <br />
              <span className="text-brandYellow italic">For Founders</span> Who Are Tired of Vanity Metrics.
            </h1>
            
            <p className="text-lg lg:text-2xl text-white/50 font-medium leading-relaxed max-w-3xl">
              I watched too many D2C brands scale their top-line while their bank balance stayed zero. Techinfigo was created to flip that script.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Who I Am Section */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-3xl border border-brandDark/10">
                <Image 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                  alt="Sachin Bauddh" 
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brandYellow rounded-full -z-10 blur-2xl opacity-20"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Founder Identity</span>
                <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter uppercase">Sachin Bauddh</h2>
                <div className="w-20 h-1.5 bg-brandYellow"></div>
              </div>
              
              <div className="space-y-6 text-lg lg:text-xl font-medium text-brandDark/70 leading-relaxed">
                <p>
                  As an entrepreneur first and a consultant second, I've spent years in the deep end of D2C operations. My focus isn't on "vibe" marketing or creative awards—it's on the ruthless reality of unit economics.
                </p>
                <p>
                  I built Techinfigo as a response to the "billing-first" agency model. We operate as your extended growth infrastructure, where every decision is filtered through the lens of contribution margin and compounding profitability.
                </p>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <div className="px-6 py-3 bg-brandDark text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl">
                  Lead Strategist
                </div>
                <div className="px-6 py-3 bg-brandBg text-brandDark/50 rounded-xl text-xs font-black uppercase tracking-widest border border-brandDark/5">
                  Agra, IN
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Why I Started Section */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-brandDark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">The Genesis</span>
            <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase">
              Truth over <br />
              <span className="text-brandYellow italic">Revenue.</span>
            </h2>
          </motion.div>
          
          <div className="space-y-8 text-xl lg:text-2xl font-medium text-white/50 leading-relaxed italic">
            <p className="border-l-4 border-brandYellow pl-8 text-left">
              "I started Techinfigo after watching a client do ₹1Cr in a month and still struggle to pay his vendors. The agency was celebrating a 4x ROAS, but the founder was burning cash on shipping, returns, and inventory holding costs."
            </p>
            <p className="text-lg lg:text-xl not-italic text-white/40 text-left pl-8 max-w-2xl">
              That's when I realized: most agencies aren't partners; they're ad-spend leeches. Scaling is easy if you don't care about the bottom line. I wanted to build something that cares about the bank balance as much as the founder does.
            </p>
          </div>
        </div>
      </section>

      {/* 4. What Makes Us Different */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 lg:mb-24 space-y-4">
            <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Proprietary Edge</span>
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter uppercase whitespace-nowrap">The Anti-Agency Protocol.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "CM Focus",
                label: "Profit First",
                desc: "We report on Contribution Margin, not just platform ROAS. If it doesn't leave profit in your account, we don't count it as a win.",
                icon: <Zap className="w-8 h-8 text-brandYellow" />
              },
              {
                title: "Agra Core",
                label: "Heart of Bharat",
                desc: "Based in Agra, we work with D2C brands across India. We combine deep technical expertise with a grounded understanding of the Indian consumer.",
                icon: <Target className="w-8 h-8 text-brandYellow" />
              },
              {
                title: "Limited Roster",
                label: "High Intensity",
                desc: "We are not a high-volume agency. We maintain a strictly limited roster to ensure partner-level execution on every account.",
                icon: <ShieldCheck className="w-8 h-8 text-brandYellow" />
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-brandBg/50 rounded-[2.5rem] p-10 space-y-8 border border-brandDark/5 hover:bg-brandDark hover:text-white transition-all duration-700 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brandDark text-brandYellow flex items-center justify-center group-hover:bg-brandYellow group-hover:text-brandDark transition-all duration-500 shadow-xl">
                  {card.icon}
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-brandYellow uppercase tracking-[0.3em]">{card.label}</p>
                    <h3 className="text-2xl font-black tracking-tight uppercase">{card.title}</h3>
                  </div>
                  <p className="text-sm font-medium opacity-60 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Who We Work With */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-brandBg border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Ideal Partners</span>
                <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none uppercase">
                  Whom We <br />
                  <span className="text-brandYellow italic">Empower.</span>
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-brandDark/5 flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-brandYellow/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-brandYellow" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-brandDark uppercase tracking-tight">Core D2C Segment</h3>
                    <p className="text-brandDark/50 font-medium">Brands doing ₹20L–₹2Cr/month seeking a systematic protocol to scale their contribution margin.</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-brandDark/5 flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-brandDark/10 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-brandDark" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-brandDark uppercase tracking-tight">Select General Clients</h3>
                    <p className="text-brandDark/50 font-medium">Established businesses looking for needle-moving results in CRO, SEO, or Retention marketing.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6">
              <div className="bg-brandDark rounded-[3rem] p-10 lg:p-14 space-y-10 shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brandYellow/10 blur-[100px] -mr-32 -mt-32" />
                <h3 className="text-3xl font-black text-white tracking-tight uppercase leading-tight relative z-10">
                  We are not <br /> for everyone.
                </h3>
                <ul className="space-y-6 relative z-10">
                  {[
                    "No vanity-metric chasers",
                    "No 'bill-me-for-output' mentality",
                    "No short-term thinking",
                    "No fixed mindset"
                  ].map((text, i) => (
                    <li key={i} className="flex gap-4 items-center text-white/40">
                      <CheckCircle2 className="w-5 h-5 text-brandYellow" />
                      <span className="text-lg font-bold tracking-tight uppercase">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Closing Statement */}
      <section className="py-24 lg:py-40 bg-white relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-7xl font-black text-brandDark tracking-tighter leading-none uppercase">
              Ready to leave <br />
              the <span className="text-brandYellow italic">typical</span> behind?
            </h2>
            <p className="text-brandDark/40 text-lg lg:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              If you value truth over vanity and profit over volume, we should talk. We're currently reviewing founding partner applications.
            </p>
          </motion.div>

          <div className="flex flex-col items-center space-y-12">
            <button 
              onClick={() => onNavigate('contact')}
              className="group relative px-14 py-6 bg-brandDark text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-glow flex items-center gap-4"
            >
              Apply for Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="space-y-4 pt-10 border-t border-brandDark/5 w-full max-w-xs">
              <div className="flex flex-col items-center gap-2">
                <p className="font-black text-brandDark tracking-tighter text-xl uppercase italic">Sachin Bauddh</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[9px] font-black text-brandDark/40 uppercase tracking-widest">Founder, Techinfigo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};