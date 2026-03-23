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
  MinusCircle
} from 'lucide-react';

interface ProfitBreakdownPageProps {
  onNavigate: (page: string) => void;
}

export const ProfitBreakdownPage: React.FC<ProfitBreakdownPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#001d21] text-white font-sans selection:bg-brandYellow selection:text-brandDark">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 lg:pt-40 lg:pb-32 px-6 lg:px-12 overflow-hidden flex items-center">
        {/* Background Glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
              Where Your <span className="text-brandYellow italic">Profit</span> <br />
              Is Actually Going
            </h1>
            
            <p className="text-white/60 text-base lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
              Most D2C brands think they have an ads problem. <br className="hidden lg:block" />
              In reality, they have a <span className="text-white font-bold">profit leak problem.</span>
            </p>
            
            <div className="pt-8">
              <button 
                onClick={() => onNavigate('contact')}
                className="group relative px-12 py-6 bg-brandYellow text-brandDark font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(252,182,50,0.25)] overflow-hidden"
              >
                <span className="relative z-10">Find My Profit Leaks</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </div>
          </motion.div>

          {/* 2. TRANSPARENCY STATEMENT */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="pt-12 lg:pt-20 flex flex-col items-center gap-4"
          >
            <div className="h-px w-24 bg-white/10"></div>
            <p className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] max-w-md">
              We don’t show fake case studies. <br />
              We show real patterns we consistently see across D2C brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. TYPICAL D2C SCENARIO (BEFORE) */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-brandDark border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full">
                <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest">SCENARIO_A // THE_STATUS_QUO</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none uppercase">
                What Most D2C <br />
                Brands Look Like
              </h2>
              
              <p className="text-white/50 text-lg lg:text-xl font-medium leading-relaxed max-w-xl">
                On the surface, everything looks fine. But profit is barely moving despite high revenue and "good" ROAS.
              </p>
            </div>

            <div className="relative">
              <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 lg:p-12 space-y-8 shadow-2xl backdrop-blur-md">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">AD_SPEND</p>
                    <p className="text-2xl lg:text-3xl font-black text-white tracking-tight">₹10–12L<span className="text-xs text-white/40 ml-1">/mo</span></p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">ROAS</p>
                    <p className="text-2xl lg:text-3xl font-black text-emerald-500 tracking-tight">4–5x</p>
                  </div>
                </div>

                <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-white/80">Actual Profit</p>
                    <p className="text-xl font-black text-red-500">₹1–1.5L</p>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[15%] bg-red-500 opacity-60"></div>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    "Heavy discounts to drive volume",
                    "High return rates (RTO/COD issues)",
                    "No clarity on real product-level margins",
                    "Scaling spend only increases complexity, not profit"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm font-medium">
                      <MinusCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Decorative nodes */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT’S ACTUALLY GOING WRONG */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-[#001d21]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[10px] font-mono font-bold text-brandYellow uppercase tracking-[0.4em]">DIAGNOSTIC_REPORT</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase">Where Profit Gets Lost</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: "High CAC Eating Margins", desc: "Acquisition costs are rising while customer value remains stagnant." },
              { title: "Backend Revenue Ignored", desc: "AOV and retention flows aren't optimized to capture repeat value." },
              { title: "Scaling Before Stability", desc: "Increasing spend on a broken funnel only accelerates losses." },
              { title: "Hidden Operational Costs", desc: "Shipping, COD fees, and RTOs aren't factored into ad decisions." },
              { title: "Wrong Product Decisions", desc: "Scaling low-margin products instead of high-contribution winners." },
              { title: "Discount Dependency", desc: "Training customers to only buy when there's a heavy sale." }
            ].map((point, i) => (
              <div key={i} className="p-8 bg-white/[0.02] border border-white/10 rounded-3xl group hover:border-brandYellow/40 transition-all duration-500">
                <div className="w-10 h-10 rounded-xl bg-brandYellow/10 flex items-center justify-center mb-6 group-hover:bg-brandYellow transition-colors duration-500">
                  <TrendingDown className="w-5 h-5 text-brandYellow group-hover:text-brandDark transition-colors" />
                </div>
                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{point.title}</h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VISUAL FLOW */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-brandDark relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[10px] font-mono font-bold text-brandYellow uppercase tracking-[0.4em]">THE_LEAK_MAP</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase">The Profit Pipeline</h2>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4">
            {/* Flow Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 hidden lg:block -translate-y-1/2"></div>
            
            {[
              { label: "AD_SPEND", val: "₹10L", color: "text-white" },
              { label: "REVENUE", val: "₹50L", color: "text-emerald-500" },
              { label: "COSTS", val: "₹48.5L", color: "text-red-500", leak: true },
              { label: "PROFIT", val: "₹1.5L", color: "text-brandYellow" }
            ].map((node, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-4 w-full lg:w-1/4">
                <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-brandDark border-2 ${node.leak ? 'border-red-500 animate-pulse' : 'border-white/10'} flex items-center justify-center shadow-2xl relative`}>
                  <p className={`text-lg lg:text-xl font-black ${node.color}`}>{node.val}</p>
                  {node.leak && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="px-3 py-1 bg-red-500 text-white text-[9px] font-black uppercase rounded-full">MAJOR_LEAK_DETECTED</span>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{node.label}</p>
                </div>
                {i < 3 && (
                  <div className="lg:hidden">
                    <ChevronRight className="w-6 h-6 text-white/10 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AFTER FIXING THE SYSTEM (TRANSFORMATION) */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-[#001d21] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fcb6320a_0%,_transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="bg-brandYellow/5 border-2 border-brandYellow/20 rounded-[3rem] p-8 lg:p-12 space-y-8 shadow-[0_0_60px_rgba(252,182,50,0.1)] backdrop-blur-md">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-brandYellow uppercase tracking-widest">AD_SPEND</p>
                    <p className="text-2xl lg:text-3xl font-black text-white tracking-tight">₹10–12L<span className="text-xs text-white/40 ml-1">/mo</span></p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-brandYellow uppercase tracking-widest">CAC_STATUS</p>
                    <p className="text-2xl lg:text-3xl font-black text-emerald-500 tracking-tight">OPTIMIZED</p>
                  </div>
                </div>

                <div className="p-6 bg-brandYellow/10 border border-brandYellow/20 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-white/80">Monthly Profit Potential</p>
                    <p className="text-3xl lg:text-4xl font-black text-brandYellow">₹4–6L</p>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      whileInView={{ width: "60%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-brandYellow"
                    />
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    "Lower CAC through creative velocity",
                    "Improved AOV & backend revenue flows",
                    "Stable, predictable scaling guardrails",
                    "Unit-economic focused decision making"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80 text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4 text-brandYellow shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-brandYellow/10 border border-brandYellow/20 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5 text-brandYellow" />
                  <span className="text-[10px] font-mono font-bold text-brandYellow uppercase tracking-widest">SCENARIO_B // THE_ENGINE_WAY</span>
                </div>
                
                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none uppercase">
                  What Changes When <br />
                  You Fix The System
                </h2>
                
                <p className="text-white/60 text-lg lg:text-xl font-medium leading-relaxed max-w-xl">
                  We don't just spend more. We spend smarter. By fixing the leaks, we unlock profit that was already there.
                </p>
              </div>

              <div className="p-8 bg-white/[0.02] border border-white/10 rounded-3xl">
                <p className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-tight">
                  Profit improves <span className="text-brandYellow italic">2–4x</span> <br />
                  — without increasing ad spend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHAT WE TYPICALLY FIX */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-brandDark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold text-brandYellow uppercase tracking-[0.4em]">THE_AUDIT_PROTOCOL</span>
                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase">What We Focus On</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Funnel Breakdown",
                  "Profit Leak Identification",
                  "CAC vs Margin Mismatch",
                  "Backend Revenue Ops",
                  "Scaling Readiness",
                  "Unit Economic Audit"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-brandYellow"></div>
                    <span className="text-xs font-bold text-white/70 uppercase tracking-widest">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. SAMPLE AUDIT PREVIEW */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 lg:p-14 space-y-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brandYellow/10 blur-3xl rounded-full -mr-20 -mt-20"></div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight uppercase">What your audit <br /> will include:</h3>
                  <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Protocol: FULL_DIAGNOSTIC</p>
                </div>

                <div className="space-y-6">
                  {[
                    { title: "Funnel Analysis", icon: Search, desc: "A deep dive into every step of your customer journey." },
                    { title: "Profit Leak Report", icon: BarChart3, desc: "Identifying exactly where margins are being eroded." },
                    { title: "Scaling Roadmap", icon: Zap, desc: "A clear, step-by-step plan to profitable expansion." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-brandYellow/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-brandYellow" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-white uppercase tracking-tight">{item.title}</h4>
                        <p className="text-white/40 text-xs font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Confidential & Data-Backed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA SECTION */}
      <section className="py-24 lg:py-40 bg-[#001d21] relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#fcb63220_0%,_transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-none uppercase">
              Want to Know Where <br />
              Your <span className="text-brandYellow italic">Profit</span> Is Leaking?
            </h2>
            <p className="text-white/40 text-lg lg:text-xl font-medium max-w-xl mx-auto leading-relaxed">
              We’ll break it down clearly — no fluff, no pressure. Just a clear view of your business numbers.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <button 
              onClick={() => onNavigate('contact')}
              className="group relative px-14 py-7 bg-brandYellow text-brandDark font-black text-[11px] uppercase tracking-[0.5em] rounded-2xl hover:bg-white transition-all duration-700 shadow-[0_0_50px_rgba(252,182,50,0.25)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Show Me My Profit Gaps
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
            </button>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/10"></div>
              <span className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-[0.4em]">Takes 15 Minutes // Saves Lakhs</span>
              <div className="w-12 h-[1px] bg-white/10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
