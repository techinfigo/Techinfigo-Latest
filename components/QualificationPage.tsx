'use client';

import React from 'react';
import { motion } from 'motion/react';
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
      {/* 1. HERO SECTION */}
      <section className="bg-brandDark pt-24 pb-16 lg:pt-40 lg:pb-32 px-6 lg:px-12 relative overflow-hidden flex items-center min-h-[60vh]">
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
              <span className="text-[9px] lg:text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">QUALIFICATION_PROTOCOL_v2.0</span>
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
              className="text-base lg:text-2xl text-white/60 font-medium leading-relaxed max-w-3xl mx-auto"
            >
              Our growth infrastructure is high-performance and high-intensity. <br className="hidden lg:block" /> To maintain our 94% success rate, we only partner with brands <br className="hidden lg:block" /> that meet our operational and strategic criteria.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. GREEN LIGHTS (IDEAL PARTNER) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brandYellow/5 rounded-full blur-[160px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 lg:mb-32 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-brandYellow"></div>
              <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Protocol: GREEN_LIGHT</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              The Ideal <br />
              <span className="text-brandYellow italic">Partner.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {greenLights.map((light, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 lg:p-12 bg-white/5 border border-white/10 rounded-[2.5rem] lg:rounded-[3rem] hover:border-brandYellow/40 transition-all duration-500 shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:bg-brandYellow/10 transition-colors"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-brandYellow/10 flex items-center justify-center mb-10 group-hover:bg-brandYellow group-hover:text-brandDark transition-all duration-500">
                    <div className="text-brandYellow group-hover:text-brandDark transition-colors">
                      {light.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tighter mb-4 uppercase group-hover:text-brandYellow transition-colors">{light.title}</h3>
                  <p className="text-white/60 text-base lg:text-lg font-medium leading-relaxed group-hover:text-white/80 transition-colors">{light.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RED FLAGS (NON-FIT) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark border-y border-white/5 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 lg:mb-32 space-y-6 text-right flex flex-col items-end">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Protocol: RED_FLAG</span>
              <div className="w-12 h-[1px] bg-white/20"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              Not A <br />
              <span className="text-white/40 italic">Good Fit.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {redFlags.map((flag, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 lg:p-12 bg-white/5 border border-white/10 rounded-[2.5rem] lg:rounded-[3rem] hover:border-white/20 transition-all duration-500 shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:bg-white/10 transition-colors"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-10 group-hover:bg-white group-hover:text-brandDark transition-all duration-500">
                    <div className="text-white/40 group-hover:text-brandDark transition-colors">
                      {flag.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tighter mb-4 uppercase group-hover:text-white transition-colors">{flag.title}</h3>
                  <p className="text-white/60 text-base lg:text-lg font-medium leading-relaxed group-hover:text-white/80 transition-colors">{flag.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CULTURE OF NO */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center relative z-10">
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brandYellow"></div>
                <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">The Philosophy</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
                We Aren't A <br />
                <span className="text-brandYellow italic">"Yes Agency."</span>
              </h2>
              <p className="text-white/50 text-xl lg:text-2xl font-medium leading-relaxed max-w-xl">
                Most agencies say yes to any brand with a budget. We decline <span className="text-white font-bold">80% of inquiries</span> so we can maintain an obsessive focus on our existing partners.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { title: "Direct Access", desc: "Senior strategists only. No junior Account Managers." },
                { title: "Capped Partnerships", desc: "Max 2 new brands per quarter to protect quality." },
                { title: "Profit First", desc: "Obsession over contribution margin and net profit." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-8 h-8 rounded-full bg-brandYellow flex items-center justify-center shrink-0 mt-1 shadow-glow">
                    <CheckCircle2 className="w-5 h-5 text-brandDark" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight group-hover:text-brandYellow transition-colors">{item.title}</h3>
                    <p className="text-white/40 text-sm lg:text-base font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center p-12 lg:p-20 relative group overflow-hidden">
              <div className="absolute inset-0 bg-brandYellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 text-center space-y-8">
                <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-brandYellow flex items-center justify-center mx-auto shadow-glow transition-transform duration-700 group-hover:scale-110">
                  <ShieldCheck className="w-16 h-16 lg:w-24 lg:h-24 text-brandDark" />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-brandYellow uppercase tracking-[0.5em]">Guarded_Quality</p>
                  <p className="text-2xl lg:text-4xl font-black text-white tracking-tighter uppercase">94% Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-32 lg:py-64 bg-brandDark text-center relative overflow-hidden border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-16">
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] uppercase">
              Ready To <br />
              <span className="text-brandYellow italic">Partner?</span>
            </h2>
            <p className="text-white/40 text-lg lg:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              If you meet the criteria and are ready to build a profit-first growth engine, let's talk.
            </p>
          </div>

          <div className="flex flex-col items-center gap-10">
            <button 
              onClick={() => onNavigate('contact')}
              className="group relative px-12 py-7 lg:px-16 lg:py-8 bg-brandYellow text-brandDark font-black text-xs lg:text-sm uppercase tracking-[0.5em] rounded-2xl shadow-glow overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                Apply for Growth Audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
            
            <div className="flex items-center gap-6">
              <div className="w-12 lg:w-16 h-[1px] bg-white/10"></div>
              <span className="text-[9px] lg:text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Strict Selection // High Impact</span>
              <div className="w-12 lg:w-16 h-[1px] bg-white/10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
