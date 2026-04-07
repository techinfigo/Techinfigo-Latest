'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  TrendingDown, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  BarChart3, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  MinusCircle,
  TestTube,
  Users
} from 'lucide-react';

interface ProfitBreakdownPageProps {
  onNavigate: (page: string) => void;
}

export const ProfitBreakdownPage: React.FC<ProfitBreakdownPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brandBg text-brandDark font-sans selection:bg-brandYellow selection:text-brandDark">
      
      {/* 1. HERO SECTION (EDITORIAL & BOLD) */}
      <section className="relative min-h-screen pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 overflow-hidden flex items-center bg-brandDark">
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
              <span className="text-[9px] lg:text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">The Profit Diagnostic</span>
              <div className="w-8 lg:w-12 h-[1px] bg-brandYellow"></div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase text-white"
            >
              Where Your <span className="text-brandYellow italic">Profit</span> <br />
              Is Actually Going.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/60 text-base sm:text-lg lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed"
            >
              Most D2C brands think they have an ads problem. <br className="hidden lg:block" />
              In reality, they have a <span className="text-white font-bold underline decoration-brandYellow underline-offset-8 decoration-2">profit leak problem.</span>
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
                  Find My Profit Leaks <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </motion.div>
          </div>

          {/* 2. TRANSPARENCY STATEMENT */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="pt-20 flex flex-col items-center gap-6"
          >
            <div className="h-px w-24 bg-white/10"></div>
            <p className="text-[9px] lg:text-[11px] font-bold text-white/30 uppercase tracking-[0.5em] max-w-md leading-loose">
              We don’t show fake case studies. <br />
              We show real patterns we consistently see across D2C brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. TYPICAL D2C SCENARIO (THE BRUTAL REALITY) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandBg border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
            <div className="space-y-12 lg:sticky lg:top-32">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-brandYellow"></div>
                  <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Scenario_A // The Status Quo</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase text-brandDark">
                  The Illusion <br />
                  Of Growth.
                </h2>
                
                <p className="text-brandDark/60 text-base lg:text-xl font-medium leading-relaxed max-w-xl">
                  On the surface, everything looks fine. But profit is barely moving despite high revenue and "good" ROAS.
                </p>
              </div>

              <div className="p-8 bg-rose-500/5 border border-rose-500/10 rounded-3xl space-y-4">
                <div className="flex items-center gap-3 text-rose-500">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-widest">Efficiency Leak Detected</span>
                </div>
                <p className="text-brandDark/40 text-sm font-medium">Scaling spend in this state only accelerates losses.</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white border border-brandDark/5 rounded-[2.5rem] lg:rounded-[3rem] p-8 lg:p-16 space-y-12 shadow-2xl">
                <div className="grid grid-cols-2 gap-8 lg:gap-12">
                  <div className="space-y-2">
                    <p className="text-[9px] lg:text-[10px] font-black text-brandDark/30 uppercase tracking-widest">AD_SPEND</p>
                    <p className="text-2xl lg:text-4xl font-black text-brandDark tracking-tighter">₹10–12L<span className="text-xs text-brandDark/30 ml-1">/mo</span></p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] lg:text-[10px] font-black text-brandDark/30 uppercase tracking-widest">ROAS</p>
                    <p className="text-2xl lg:text-4xl font-black text-emerald-600 tracking-tighter">4.5x</p>
                  </div>
                </div>

                <div className="p-8 bg-brandDark text-white rounded-3xl space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full"></div>
                  <div className="relative z-10 flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[9px] lg:text-[10px] font-black text-white/40 uppercase tracking-widest">ACTUAL_NET_PROFIT</p>
                      <p className="text-3xl lg:text-4xl font-black text-rose-500 tracking-tighter">₹1.2L</p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-rose-500/50" />
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative z-10">
                    <motion.div 
                      initial={{ width: "0%" }}
                      whileInView={{ width: "12%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-rose-500"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] font-black text-brandDark/30 uppercase tracking-widest">The Profit Killers</p>
                  <ul className="space-y-5">
                    {[
                      "Heavy discounts to drive volume",
                      "High return rates (RTO/COD issues)",
                      "No clarity on real product-level margins",
                      "Scaling spend only increases complexity"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-brandDark/60 text-sm lg:text-base font-bold">
                        <MinusCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHERE PROFIT GETS LOST (CLEAN GRID) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brandYellow"></div>
                <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Diagnostic_Report</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-none uppercase">
                Where Your <br />
                <span className="text-brandYellow italic">Margin</span> Bleeds.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden">
            {[
              { title: "High CAC Eating Margins", desc: "Acquisition costs are rising while customer value remains stagnant." },
              { title: "Backend Revenue Ignored", desc: "AOV and retention flows aren't optimized to capture repeat value." },
              { title: "Scaling Before Stability", desc: "Increasing spend on a broken funnel only accelerates losses." },
              { title: "Hidden Operational Costs", desc: "Shipping, COD fees, and RTOs aren't factored into ad decisions." },
              { title: "Wrong Product Decisions", desc: "Scaling low-margin products instead of high-contribution winners." },
              { title: "Discount Dependency", desc: "Training customers to only buy when there's a heavy sale." }
            ].map((point, i) => (
              <div key={i} className="p-10 lg:p-14 bg-brandDark hover:bg-white/5 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-8 group-hover:bg-rose-500 transition-all duration-500">
                  <TrendingDown className="w-6 h-6 text-rose-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-white mb-4 uppercase tracking-tight leading-none group-hover:text-rose-500 transition-colors">{point.title}</h3>
                <p className="text-white/40 text-sm lg:text-base font-medium leading-relaxed group-hover:text-white/60 transition-colors">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE PIPELINE (CLEAN FLOW) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandBg relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 lg:mb-32 space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-brandDark/20"></div>
              <span className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.4em]">The Leak Map</span>
              <div className="w-12 h-[1px] bg-brandDark/20"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-none uppercase text-brandDark">The Profit Pipeline</h2>
            <p className="text-brandDark/40 text-[10px] lg:text-sm font-bold uppercase tracking-[0.3em]">
              Each step builds on the previous one — skipping a step breaks profitability.
            </p>
          </div>

          <div className="relative flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">
            {/* Flow Line (Desktop) */}
            <div className="absolute top-[48px] left-0 w-full h-px bg-brandDark/5 hidden lg:block"></div>
            
            {[
              { step: "Step 1", label: "Audit", summary: "Find where money is leaking", icon: Search },
              { step: "Step 2", label: "Test", summary: "Identify what actually works", icon: TestTube },
              { step: "Step 3", label: "Stabilize", summary: "Make performance consistent", icon: ShieldCheck },
              { step: "Step 4", label: "Scale", summary: "Increase spend safely", icon: TrendingUp },
              { step: "Step 5", label: "Retain", summary: "Maximize customer value", icon: Users }
            ].map((node, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-8 w-full lg:w-1/5 group">
                <div className="flex flex-col items-center space-y-4">
                  <span className="text-[10px] font-black text-brandYellow uppercase tracking-widest">
                    {node.step}
                  </span>
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white border border-brandDark/5 flex items-center justify-center shadow-xl group-hover:border-brandYellow group-hover:shadow-2xl transition-all duration-500">
                    <node.icon className="w-8 h-8 lg:w-10 lg:h-10 text-brandDark/20 group-hover:text-brandYellow transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl lg:text-2xl font-black text-brandDark uppercase tracking-tighter group-hover:text-brandYellow transition-colors">
                    {node.label}
                  </h3>
                  <p className="text-brandDark/40 text-[10px] lg:text-xs font-bold uppercase tracking-widest leading-tight max-w-[140px] mx-auto">
                    {node.summary}
                  </p>
                </div>

                {i < 4 && (
                  <div className="lg:hidden">
                    <ArrowRight className="w-6 h-6 text-brandYellow rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-32 p-10 lg:p-16 bg-brandDark rounded-[2.5rem] lg:rounded-[3rem] text-center space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            <div className="space-y-4 relative z-10">
              <p className="text-brandYellow text-[10px] lg:text-xs font-black uppercase tracking-[0.4em]">
                This isn’t a checklist — it’s a sequence.
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
                You don’t scale blindly. <br />
                <span className="text-brandYellow italic">You scale with clarity and control.</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE TRANSFORMATION (EDITORIAL COMPARISON) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="bg-brandBg border border-brandDark/5 rounded-[2.5rem] lg:rounded-[3rem] p-8 lg:p-16 space-y-12 shadow-2xl">
                <div className="grid grid-cols-2 gap-8 lg:gap-12">
                  <div className="space-y-2">
                    <p className="text-[9px] lg:text-[10px] font-black text-brandDark/30 uppercase tracking-widest">AD_SPEND</p>
                    <p className="text-2xl lg:text-4xl font-black text-brandDark tracking-tighter">₹10–12L<span className="text-xs text-brandDark/30 ml-1">/mo</span></p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] lg:text-[10px] font-black text-brandDark/30 uppercase tracking-widest">CAC_STATUS</p>
                    <p className="text-2xl lg:text-4xl font-black text-emerald-600 tracking-tighter">OPTIMIZED</p>
                  </div>
                </div>

                <div className="p-8 lg:p-10 bg-brandYellow text-brandDark rounded-3xl space-y-6 relative overflow-hidden shadow-2xl">
                  <div className="relative z-10 flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[9px] lg:text-[10px] font-black text-brandDark/40 uppercase tracking-widest">MONTHLY_PROFIT_POTENTIAL</p>
                      <p className="text-3xl lg:text-5xl font-black tracking-tighter">₹4–6L</p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-brandDark/20" />
                  </div>
                  <div className="h-2 w-full bg-brandDark/5 rounded-full overflow-hidden relative z-10">
                    <motion.div 
                      initial={{ width: "0%" }}
                      whileInView={{ width: "65%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-brandDark"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] font-black text-brandDark/30 uppercase tracking-widest">The Growth Engine</p>
                  <ul className="space-y-5">
                    {[
                      "Lower CAC through creative velocity",
                      "Improved AOV & backend revenue flows",
                      "Stable, predictable scaling guardrails",
                      "Unit-economic focused decision making"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-brandDark/80 text-sm lg:text-base font-bold">
                        <CheckCircle2 className="w-5 h-5 text-brandYellow shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-brandYellow"></div>
                  <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Scenario_B // The Engine Way</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-brandDark">
                  The System <br />
                  <span className="text-brandYellow italic">Optimized.</span>
                </h2>
                
                <p className="text-brandDark/60 text-base lg:text-xl font-medium leading-relaxed max-w-xl">
                  We don't just spend more. We spend smarter. By fixing the leaks, we unlock profit that was already there.
                </p>
              </div>

              <div className="p-8 lg:p-10 bg-brandDark text-white rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl">
                <p className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter leading-tight uppercase">
                  Profit improves <span className="text-brandYellow italic">2–4x</span> <br />
                  <span className="text-white/30">— without increasing ad spend.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE FOCUS (CLEAN LIST) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandBg border-t border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-brandYellow"></div>
                  <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">The Audit Protocol</span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter uppercase text-brandDark">What We Focus On</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {[
                  "Funnel Breakdown",
                  "Profit Leak Identification",
                  "CAC vs Margin Mismatch",
                  "Backend Revenue Ops",
                  "Scaling Readiness",
                  "Unit Economic Audit"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 lg:p-6 bg-white border border-brandDark/5 rounded-2xl group hover:border-brandYellow transition-all duration-500">
                    <div className="w-2 h-2 rounded-full bg-brandYellow"></div>
                    <span className="text-[10px] lg:text-xs font-black text-brandDark/60 uppercase tracking-widest group-hover:text-brandDark transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. SAMPLE AUDIT PREVIEW (EDITORIAL CARD) */}
            <div className="relative">
              <div className="bg-brandDark text-white rounded-[2.5rem] lg:rounded-[3rem] p-10 lg:p-20 space-y-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-brandYellow/5 blur-[120px] rounded-full -mr-40 -mt-40"></div>
                
                <div className="space-y-4 relative z-10">
                  <h3 className="text-2xl lg:text-4xl font-black tracking-tight uppercase leading-none">What your audit <br /> will include:</h3>
                  <p className="text-brandYellow text-[10px] font-black uppercase tracking-[0.4em]">Protocol: FULL_DIAGNOSTIC</p>
                </div>

                <div className="space-y-10 relative z-10">
                  {[
                    { title: "Funnel Analysis", icon: Search, desc: "A deep dive into every step of your customer journey." },
                    { title: "Profit Leak Report", icon: BarChart3, desc: "Identifying exactly where margins are being eroded." },
                    { title: "Scaling Roadmap", icon: Zap, desc: "A clear, step-by-step plan to profitable expansion." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 lg:gap-8 group/item">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:border-brandYellow transition-colors">
                        <item.icon className="w-6 h-6 lg:w-7 lg:h-7 text-brandYellow" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg lg:text-xl font-black uppercase tracking-tight">{item.title}</h4>
                        <p className="text-white/40 text-xs lg:text-sm font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-10 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-4">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Confidential & Data-Backed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA SECTION (CLEAN & IMPACTFUL) */}
      <section className="py-32 lg:py-64 bg-brandDark relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fcb6320a_0%,_transparent_70%)]"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-16">
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] uppercase">
              Want to Know Where <br />
              Your <span className="text-brandYellow italic">Profit</span> Is Leaking?
            </h2>
            <p className="text-white/40 text-lg lg:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              We’ll break it down clearly — no fluff, no pressure. Just a clear view of your business numbers.
            </p>
          </div>

          <div className="flex flex-col items-center gap-10">
            <button 
              onClick={() => onNavigate('contact')}
              className="group relative px-12 py-7 lg:px-16 lg:py-8 bg-brandYellow text-brandDark font-black text-xs lg:text-sm uppercase tracking-[0.5em] rounded-2xl hover:bg-white transition-all duration-500 shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                Show Me My Profit Gaps
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
            
            <div className="flex items-center gap-6">
              <div className="w-12 lg:w-16 h-[1px] bg-white/10"></div>
              <span className="text-[9px] lg:text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Takes 15 Minutes // Saves Lakhs</span>
              <div className="w-12 lg:w-16 h-[1px] bg-white/10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
