'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CAPACITY, CLAIMS } from '../config/site';
import { useSiteSettings } from './SiteSettingsProvider';
import { 
  TrendingUp, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  AlertCircle, 
  TrendingDown, 
  Search, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface QualificationPageProps {
  onNavigate: (page: string) => void;
}

export const QualificationPage: React.FC<QualificationPageProps> = ({ onNavigate }) => {
  const { capacity } = useSiteSettings();
  const greenLights = [
    {
      title: "Profitable Foundation",
      desc: "You are currently doing ₹50L–₹5Cr monthly and have a product that people actually want. We don't fix broken business models; we scale winners.",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      title: "Growth Mindset",
      desc: "You aren't looking for a 'miracle month'. You understand that building a dominant D2C brand requires consistency, testing velocity, and a systems-first approach.",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Strong Unit Economics",
      desc: "You know your COGS and contribution margins. You understand that scale is only healthy if the economics support high-intensity acquisition.",
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      title: "Operational Scalability",
      desc: "Your backend — supply chain, fulfillment, and customer support — is ready to handle 2x–5x volume without collapsing under the pressure of growth.",
      icon: <ShieldCheck className="w-8 h-8" />
    }
  ];

  const redFlags = [
    {
      title: "Short-Term Thinking",
      desc: "If you need a 'miracle month' just to keep the lights on, we aren't the right fit. We build high-performance systems, not gambling strategies.",
      icon: <AlertCircle className="w-8 h-8" />
    },
    {
      title: "Razor-Thin Margins",
      desc: "If your product margins don't allow for scalable acquisition costs, no amount of 'optimization' can fix a broken business model.",
      icon: <TrendingDown className="w-8 h-8" />
    },
    {
      title: "Data Silos",
      desc: "We require full transparency into your numbers. If you aren't ready to share your true contribution margins, we can't optimize for profit.",
      icon: <Search className="w-8 h-8" />
    },
    {
      title: "Fixed Mindsets",
      desc: "Our system thrives on testing new funnels, offers, and creatives. If you are married to 'your way' of doing things, we'll reach a ceiling early.",
      icon: <Zap className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-brandDark font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* 1. HERO SECTION (EDITORIAL & BOLD - MATCHING PROFIT BREAKDOWN) */}
      <section className="relative min-h-[70vh] pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 overflow-hidden flex items-center bg-brandDark">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brandYellow/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 w-full space-y-12 animate-slide-up">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="w-8 lg:w-12 h-[1px] bg-brandYellow"></div>
              <span className="text-[9px] lg:text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">QUALIFICATION PROTOCOL</span>
              <div className="w-8 lg:w-12 h-[1px] bg-brandYellow"></div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase text-white"
            >
              We Don't Work <br />
              With <span className="text-brandYellow italic">Everyone.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/60 text-base sm:text-lg lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed"
            >
              Our growth infrastructure is high-performance and high-intensity. To maintain our accuracy, we only partner with brands that meet our operational and strategic criteria.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-8"
            >
              <button 
                onClick={() => onNavigate('contact')}
                className="group relative px-10 py-6 lg:px-14 lg:py-7 bg-brandYellow text-brandDark font-black text-[10px] lg:text-xs uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all duration-500 shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get My Free Profit Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. GREEN LIGHTS (IDEAL PARTNER) - REDUCED HEIGHT */}
      <section className="py-12 lg:py-24 px-6 lg:px-12 bg-brandDark relative overflow-hidden">
        {/* ... (rest of background same) */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brandYellow/5 rounded-full blur-[160px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-10 lg:mb-16 space-y-4 text-center">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-brandYellow"></div>
              <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Protocol: GREEN_LIGHT</span>
              <div className="w-12 h-[1px] bg-brandYellow"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              The Ideal <br />
              <span className="text-brandYellow italic">Partner.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {greenLights.map((light, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden hover:border-brandYellow/30 transition-all duration-500 shadow-2xl backdrop-blur-xl"
              >
                {/* ... (inner content same but padding reduced) */}
                <div className="p-8 lg:p-12 space-y-8 relative z-10">
                  <div className="flex items-end justify-between">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-brandYellow/10 flex items-center justify-center group-hover:bg-brandYellow group-hover:text-brandDark transition-all duration-500 shadow-[0_0_40px_rgba(255,184,0,0.1)] group-hover:shadow-[0_0_60px_rgba(255,184,0,0.3)]">
                      <div className="text-brandYellow group-hover:text-brandDark transition-colors">
                        {light.icon}
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] font-mono">NODE_0{i + 1}</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-4xl font-black text-white tracking-tighter uppercase group-hover:text-brandYellow transition-colors duration-500">
                      {light.title}
                    </h3>
                    <p className="text-white/50 text-sm lg:text-lg font-medium leading-relaxed group-hover:text-white/80 transition-colors duration-500 max-w-xl">
                      {light.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RED FLAGS (NON-FIT) - REDUCED HEIGHT */}
      <section className="py-12 lg:py-24 px-6 lg:px-12 bg-brandDark border-y border-white/5 relative overflow-hidden">
        {/* ... (background same) */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-10 lg:mb-16 space-y-4 text-center">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-white/20"></div>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Protocol: RED_FLAG</span>
              <div className="w-12 h-[1px] bg-white/20"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              Not A <br />
              <span className="text-white/40 italic">Good Fit.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {redFlags.map((flag, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 lg:p-12 bg-white/[0.01] border border-white/5 rounded-[2rem] lg:rounded-[2.5rem] hover:border-white/10 transition-all duration-500 relative overflow-hidden grayscale hover:grayscale-0"
              >
                <div className="relative z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-brandDark transition-all duration-500">
                      <div className="text-white/40 group-hover:text-brandDark transition-colors">
                        {flag.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-3xl font-black text-white tracking-tighter mb-4 uppercase group-hover:text-white transition-colors">{flag.title}</h3>
                  <p className="text-white/40 text-sm lg:text-lg font-medium leading-relaxed group-hover:text-white/60 transition-colors">{flag.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CULTURE OF NO - REDUCED HEIGHT */}
      <section className="py-12 lg:py-24 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
        {/* ... (content same but reduced py) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brandYellow"></div>
                <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">The Philosophy</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.85] uppercase">
                We Aren't A <br />
                <span className="text-brandYellow italic">"Yes Agency."</span>
              </h2>
              <p className="text-white/50 text-lg lg:text-xl font-medium leading-relaxed max-w-xl">
                Most agencies say yes to any brand with a budget. <span className="text-white font-bold">{CLAIMS.selectivity}</span> That is how we keep an obsessive focus on the partners we already have.
              </p>
            </div>

            <div className="space-y-0 border-y border-white/10 divide-y divide-white/10">
              {[
                { title: "Direct Access", desc: "Senior strategists only. No junior Account Managers.", stat: "0% Juniors" },
                { title: "Capped Partnerships", desc: "Max 2 new brands per quarter to protect quality.", stat: "Lmtd Slot" },
                { title: "Profit First", desc: "Obsession over contribution margin and net profit.", stat: "Net Focus" }
              ].map((item, i) => (
                <div key={i} className="py-6 flex justify-between items-center group cursor-default">
                  <div className="flex gap-6 items-center">
                    <div className="w-8 h-8 rounded-lg bg-brandYellow/10 flex items-center justify-center shrink-0 group-hover:bg-brandYellow group-hover:text-brandDark transition-all duration-300">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-lg lg:text-xl font-black text-white tracking-tight group-hover:text-brandYellow transition-colors">{item.title}</h3>
                      <p className="text-white/40 text-xs lg:text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-[8px] font-black text-white/20 uppercase tracking-widest border border-white/5 px-2 py-0.5 rounded-md group-hover:border-brandYellow/20 group-hover:text-brandYellow/40 transition-colors">
                    {item.stat}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-white/[0.02] rounded-[2.5rem] border border-white/10 flex items-center justify-center p-10 lg:p-16 relative group overflow-hidden backdrop-blur-sm">
              {/* Spinning Ring */}
              <div className="absolute inset-8 border border-brandYellow/10 rounded-full animate-[spin_20s_linear_infinite] group-hover:border-brandYellow/30 transition-colors"></div>
              
              <div className="relative z-10 text-center space-y-6">
                <motion.div 
                  className="w-24 h-24 lg:w-36 lg:h-36 rounded-full bg-brandYellow flex items-center justify-center mx-auto shadow-glow transition-transform duration-700 group-hover:scale-110 relative"
                  whileHover={{ rotate: 10 }}
                >
                  <ShieldCheck className="w-12 h-12 lg:w-20 lg:h-20 text-brandDark" />
                </motion.div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-brandYellow uppercase tracking-[0.5em]">Guarded_Quality</p>
                  <p className="text-2xl lg:text-4xl font-black text-white tracking-tighter uppercase whitespace-nowrap">Full P&amp;L Transparency</p>
                  <p className="text-2xl lg:text-4xl font-black text-brandYellow tracking-tighter uppercase whitespace-nowrap">Or No Engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA - REDUCED HEIGHT */}
      <section className="py-16 lg:py-32 bg-brandDark text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brandYellow/10 to-transparent"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-10">
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-brandYellow animate-pulse">●</span>
              <span className="text-[9px] font-black text-brandYellow uppercase tracking-[0.4em]">Operational Status: OPEN</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase">
              Ready To <br />
              <span className="text-brandYellow italic">Partner?</span>
            </h2>
            <p className="text-white/40 text-base lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              If you meet the criteria and are ready to build a profit-first growth engine, let's talk.
            </p>
          </div>

          <div className="flex flex-col items-center gap-10">
            <button 
              onClick={() => onNavigate('contact')}
              className="group relative px-10 py-6 lg:px-14 lg:py-7 bg-brandYellow text-brandDark font-black text-[10px] lg:text-xs uppercase tracking-[0.5em] rounded-2xl shadow-glow overflow-hidden transition-transform active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3">
                Get My Free Profit Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
            
            {capacity.showScarcity && (
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-lg lg:text-2xl font-black text-white">{String(capacity.slotsOpen).padStart(2, '0')}</span>
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1">Slots Left</span>
                </div>
                <div className="w-[1px] h-10 bg-white/10"></div>
                <div className="flex flex-col items-center">
                  <span className="text-lg lg:text-2xl font-black text-white">{CAPACITY.currentBatch}</span>
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1">Founding Batch</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
