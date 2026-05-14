'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  TestTube, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Check,
  BarChart3,
  Zap
} from 'lucide-react';

interface SystemPageProps {
  onNavigate: (page: string) => void;
}

export const SystemPage: React.FC<SystemPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      id: 'audit',
      num: '01',
      title: 'Profit Audit (The Diagnostic)',
      icon: <Search className="w-6 h-6" />,
      explain: 'A deep-dive into your unit economics, CAC, and MER to find exactly where profit is leaking.',
      meaning: 'Outcome: A clear map of your structural leaks and a plan to plug them.',
      highlight: 'PROTOCOL: LEAK_DETECTION'
    },
    {
      id: 'test',
      num: '02',
      title: 'Rapid Testing (The Validation)',
      icon: <TestTube className="w-6 h-6" />,
      explain: 'Structured creative and offer testing to find what actually drives profitable scale.',
      meaning: 'Outcome: Data-backed creative and offer winners that maintain margins.',
      highlight: 'PROTOCOL: DATA_VALIDATION'
    },
    {
      id: 'stabilize',
      num: '03',
      title: 'Stabilization (The Baseline)',
      icon: <ShieldCheck className="w-6 h-6" />,
      explain: 'Fixing backend flows and unit economics to ensure every sale is a profitable one.',
      meaning: 'Outcome: A stable, predictable baseline that doesn’t break under pressure.',
      highlight: 'PROTOCOL: MARGIN_PROTECTION'
    },
    {
      id: 'scale',
      num: '04',
      title: 'Aggressive Scale (The Engine)',
      icon: <TrendingUp className="w-6 h-6" />,
      explain: 'Scaling budgets only after the system is stable — without killing your ROAS.',
      meaning: 'Outcome: Predictable growth that increases profit, not just top-line revenue.',
      highlight: 'PROTOCOL: PROFIT_SCALING'
    },
    {
      id: 'retain',
      num: '05',
      title: 'LTV Optimization (The Compounder)',
      icon: <Users className="w-6 h-6" />,
      explain: 'Maximizing repeat purchases and AOV through advanced retention architecture.',
      meaning: 'Outcome: Higher customer value and long-term sustainable profitability.',
      highlight: 'PROTOCOL: LTV_MAXIMIZATION'
    }
  ];

  return (
    <div className="bg-brandDark text-white font-sans">
      {/* 1. HERO SECTION (EDITORIAL & BOLD) */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-6 lg:px-12 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brandYellow/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 w-full space-y-12">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="w-8 lg:w-12 h-[1px] bg-brandYellow"></div>
              <span className="text-[9px] lg:text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">The Architecture of Scale</span>
              <div className="w-8 lg:w-12 h-[1px] bg-brandYellow"></div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase text-white"
            >
              Built to Scale <br />
              <span className="text-brandYellow italic">Profitable</span> Growth.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/60 text-base sm:text-lg lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed"
            >
              Most brands scale blindly and lose margins. Our proprietary architecture ensures you grow predictably, sustainably, and with healthy profit.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-12"
            >
              <button 
                onClick={() => onNavigate('contact')}
                className="group relative px-10 py-6 lg:px-14 lg:py-7 bg-brandYellow text-brandDark font-black text-[10px] lg:text-xs uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all duration-500 shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Initiate Profit Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE CORE PROBLEM (EDITORIAL GRID) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-brandYellow"></div>
                  <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Diagnostic_Report</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-none uppercase text-white">
                  Why Most Brands <br />
                  <span className="text-brandYellow italic">Struggle</span> To Scale.
                </h2>
                
                <p className="text-white/60 text-base lg:text-xl font-medium max-w-xl leading-relaxed">
                  Scaling a broken system only accelerates losses. We identify the structural leaks before we ever touch the "scale" button.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "AD_SPEND", issue: "Scaling without fixing profit", code: "ERR_01" },
                  { label: "METRICS", issue: "No clarity on real MER/CAC", code: "ERR_02" },
                  { label: "CREATIVE", issue: "Creative burnout & fatigue", code: "ERR_03" },
                  { label: "BACKEND", issue: "AOV & Retention ignored", code: "ERR_04" }
                ].map((point, i) => (
                  <div key={i} className="p-8 bg-white/[0.02] border border-white/10 rounded-3xl group hover:border-brandYellow/40 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                      <span className="text-[10px] font-mono font-bold text-white">{point.code}</span>
                    </div>
                    <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest mb-4">{point.label}</p>
                    <p className="text-lg lg:text-xl text-white/90 font-black leading-tight group-hover:text-white transition-colors">{point.issue}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] lg:rounded-[3rem] p-10 lg:p-14 space-y-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brandYellow/50 via-brandYellow/50 to-brandYellow/50"></div>
                
                <div className="flex justify-between items-center border-b border-white/10 pb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-brandYellow animate-pulse"></div>
                    <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest">System_Error_Log</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/30">v4.0_AUDIT</span>
                </div>
                
                <div className="space-y-10">
                  {[
                    { label: "PROFIT_LEAKAGE", val: 85, color: "bg-brandYellow", status: "CRITICAL" },
                    { label: "SPEND_WASTE", val: 95, color: "bg-brandYellow", status: "HIGH" },
                    { label: "RETENTION_GAP", val: 70, color: "bg-brandYellow", status: "WARNING" }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest block">{stat.label}</span>
                          <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded ${stat.status === 'CRITICAL' ? 'bg-brandYellow/10 text-brandYellow' : stat.status === 'HIGH' ? 'bg-brandYellow/10 text-brandYellow' : 'bg-brandYellow/10 text-brandYellow'}`}>
                            {stat.status}
                          </span>
                        </div>
                        <span className="text-2xl lg:text-3xl font-black text-white/80 tracking-tighter">{stat.val}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${stat.val}%` }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                          className={`h-full ${stat.color} opacity-60`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6">
                  <div className="p-6 bg-brandYellow/5 border border-brandYellow/10 rounded-2xl flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-brandYellow shrink-0 mt-0.5" />
                    <p className="text-[10px] lg:text-xs font-mono text-brandYellow/80 uppercase tracking-widest leading-relaxed">
                      CRITICAL: Scaling budget in current state will result in negative contribution margin. Fix leaks before deployment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SYSTEM OVERVIEW (EDITORIAL PIPELINE) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
        
        <div className="max-w-7xl mx-auto space-y-32 relative z-10">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-brandYellow"></div>
              <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">The Architecture</span>
              <div className="w-12 h-[1px] bg-brandYellow"></div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-8xl font-black tracking-tighter leading-none uppercase text-white">
              Turn Ad Spend Into <br />
              <span className="text-brandYellow italic">Predictable Profit.</span>
            </h2>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] space-y-8 group hover:border-brandYellow/40 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-brandYellow/10 flex items-center justify-center group-hover:bg-brandYellow transition-colors duration-500">
                  {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8 text-brandYellow group-hover:text-brandDark transition-colors" })}
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-brandYellow tracking-widest uppercase">Phase_0{step.num}</span>
                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-none text-white">{step.title.split('(')[0]}</h3>
                  </div>
                  <p className="text-white/60 text-sm font-medium leading-relaxed">{step.explain}</p>
                </div>
                
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] font-black text-brandYellow uppercase tracking-widest">{step.highlight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REAL SCENARIO COMPARISON (EDITORIAL) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32 relative z-10">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-brandYellow"></div>
              <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">The Impact</span>
              <div className="w-12 h-[1px] bg-brandYellow"></div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-8xl font-black tracking-tighter leading-none uppercase text-white">
              The Power of a <br />
              <span className="text-brandYellow italic">Fixed System.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 relative items-stretch">
            {/* Visual Flow Arrow (Desktop) */}
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 bg-brandYellow rounded-full items-center justify-center shadow-2xl">
              <ArrowRight className="w-10 h-10 text-brandDark" />
            </div>

            {/* LEFT SIDE (BEFORE) */}
            <div className="lg:pr-20 space-y-12 opacity-40 grayscale transition-all duration-700 hover:opacity-60 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">STATUS_QUO</span>
                </div>
                <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white leading-none">Before Fixing <br /> the System</h3>
              </div>

              <ul className="space-y-8">
                {[
                  { label: "Ad Spend", val: "₹10–12L/month" },
                  { label: "ROAS", val: "4–5x (looks good)" },
                  { label: "Actual Profit", val: "₹1–1.5L", highlight: true },
                  { label: "Performance", val: "High CAC and unstable" },
                  { label: "Clarity", val: "No clarity on real margins" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-6">
                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    <p className="text-xl lg:text-2xl font-medium text-white/60">
                      {item.highlight ? (
                        <span className="text-brandYellow font-black">{item.val}</span>
                      ) : (
                        <span>{item.val}</span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT SIDE (AFTER) */}
            <div className="lg:pl-20 space-y-12 bg-white/[0.03] border border-brandYellow/20 p-12 lg:p-24 rounded-[3rem] shadow-2xl relative overflow-hidden group flex flex-col justify-center">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-brandYellow/10 blur-[120px] rounded-full group-hover:bg-brandYellow/20 transition-all duration-700"></div>
              
              <div className="space-y-6 relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-brandYellow/10 border border-brandYellow/20 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-brandYellow animate-pulse"></div>
                  <span className="text-[10px] font-mono font-bold text-brandYellow uppercase tracking-widest">SYSTEM_DEPLOYED</span>
                </div>
                <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white leading-none">After Fixing <br /> the System</h3>
              </div>

              <ul className="space-y-8 relative z-10">
                {[
                  { val: "Same ad spend maintained" },
                  { val: "₹4–6L monthly profit potential", highlight: true },
                  { val: "Lower CAC and better margins" },
                  { val: "Improved AOV and backend revenue" },
                  { val: "Stable, predictable growth" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-6">
                    <CheckCircle2 className="w-8 h-8 text-brandYellow shrink-0" />
                    <p className={`text-xl lg:text-2xl font-black ${item.highlight ? 'text-brandYellow' : 'text-white/90'}`}>
                      {item.val}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEEP BREAKDOWN (EDITORIAL TIMELINE) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-32">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-brandYellow"></div>
              <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">The Protocol</span>
              <div className="w-12 h-[1px] bg-brandYellow"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-8xl font-black tracking-tighter uppercase leading-none text-white">
              The 5-Phase <br />
              <span className="text-brandYellow italic">Deployment.</span>
            </h2>
          </div>

          <div className="space-y-24">
            {steps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-1">
                  <span className="text-4xl lg:text-6xl font-black text-white/10 tracking-tighter">0{step.num}</span>
                </div>
                <div className="lg:col-span-11 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white group-hover:text-brandYellow transition-colors">
                      {step.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-1.5 bg-brandYellow/10 border border-brandYellow/20 rounded-full">
                        <span className="text-[10px] font-mono font-bold text-brandYellow uppercase tracking-widest">{step.highlight}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <p className="text-xl lg:text-2xl text-white/60 font-medium leading-relaxed">
                      {step.explain}
                    </p>
                    <div className="p-8 bg-white/[0.02] border border-white/10 rounded-[2rem]">
                      <p className="text-sm lg:text-base text-brandYellow font-bold uppercase tracking-widest mb-4">The Outcome</p>
                      <p className="text-lg text-white/80 font-medium leading-relaxed italic">
                        {step.meaning}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHAT MAKES THIS DIFFERENT (EDITORIAL) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-white text-brandDark overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-brandDark"></div>
                  <span className="text-[10px] font-black text-brandDark uppercase tracking-[0.4em]">The Edge</span>
                </div>
                <h2 className="text-4xl lg:text-7xl font-black tracking-tighter leading-none uppercase text-brandDark">
                  Why This <br />
                  <span className="text-brandYellow italic">Works</span> Better.
                </h2>
                <p className="text-xl lg:text-2xl text-brandDark/70 font-medium leading-relaxed">
                  Most agencies focus on spend. We focus on the <span className="text-brandDark font-black underline decoration-brandYellow decoration-4 underline-offset-8">contribution margin.</span>
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-8">
              {[
                { title: "Profit-First Architecture", desc: "We don't care about vanity ROAS. we care about the actual cash staying in your bank account after all costs." },
                { title: "Full-Funnel Integrity", desc: "We align your creative, landing pages, and backend flows into a single, high-converting profit engine." },
                { title: "Data-Backed Certainty", desc: "Every decision is made using our proprietary diagnostic tools, not a 'gut feeling' from an account manager." },
                { title: "Sustainable Scaling", desc: "We build systems that can handle 10x volume without breaking your unit economics or customer experience." }
              ].map((item, i) => (
                <div key={i} className="p-10 lg:p-16 bg-brandDark/5 rounded-[3rem] space-y-6 group hover:bg-brandDark transition-all duration-700">
                  <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-brandDark group-hover:text-brandYellow transition-colors">{item.title}</h3>
                  <p className="text-lg lg:text-xl text-brandDark/60 group-hover:text-white/60 font-medium leading-relaxed transition-colors">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA (EDITORIAL & HIGH CONVERSION) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#fcb6320a_0%,_transparent_70%)]"></div>
        
        <div className="max-w-6xl mx-auto text-center space-y-16 relative z-10">
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-brandYellow"></div>
              <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Final Step</span>
              <div className="w-12 h-[1px] bg-brandYellow"></div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] uppercase">
              Stop Guessing. <br />
              Start <span className="text-brandYellow italic">Scaling.</span>
            </h2>
            
            <p className="text-white/60 text-xl lg:text-3xl max-w-3xl mx-auto font-medium leading-relaxed">
              In 15 minutes, we’ll show you exactly where your profit is leaking and how to fix it.
            </p>
          </div>

          <div className="pt-12">
            <button 
              onClick={() => onNavigate('contact')}
              className="group relative px-12 py-8 lg:px-20 lg:py-10 bg-brandYellow text-brandDark font-black text-xs lg:text-sm uppercase tracking-[0.6em] rounded-[2rem] hover:bg-white transition-all duration-500 shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                Initiate Profit Audit <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>

          <div className="pt-12 flex flex-col items-center gap-6">
            <div className="h-px w-24 bg-white/10"></div>
            <p className="text-[10px] lg:text-xs font-black text-white/30 uppercase tracking-[0.5em]">
              Limited Availability // High-Intent Brands Only
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
