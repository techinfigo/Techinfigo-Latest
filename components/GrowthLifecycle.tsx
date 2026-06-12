'use client';

import React from 'react';
import { Search, FlaskConical, ShieldCheck, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface GrowthLifecycleProps {
  onBookAudit?: () => void;
}

export const GrowthLifecycle: React.FC<GrowthLifecycleProps> = ({ onBookAudit }) => {
  const steps = [
    {
      num: "01",
      title: "Audit (Find Profit Leaks)",
      desc: "We break down your funnel, CAC, MER, and hidden costs to identify exactly where you’re losing money.",
      meaning: "What this means for you: You’ll know exactly where your money is leaking — and why profit isn’t growing.",
      highlight: "No scaling until this is fixed.",
      icon: <Search className="w-6 h-6" />
    },
    {
      num: "02",
      title: "Test (Find What Works)",
      desc: "We run structured creative and offer tests to identify winning combinations — not random experiments.",
      meaning: "What this means for you: You’ll know which creatives, offers, and products actually drive profitable results.",
      highlight: "Data-backed decisions only.",
      icon: <FlaskConical className="w-6 h-6" />
    },
    {
      num: "03",
      title: "Stabilize (Profit Baseline)",
      desc: "We fix your unit economics and bring consistency before increasing spend.",
      meaning: "What this means for you: You’ll have consistent performance instead of unpredictable spikes and drops.",
      highlight: "Consistent profit > random spikes",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      num: "04",
      title: "Scale (Increase Profit)",
      desc: "Once your system is stable, we scale budgets using proven winners — without breaking margins.",
      meaning: "What this means for you: You’ll be able to increase ad spend without breaking your margins.",
      highlight: "Scale without killing profitability",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      num: "05",
      title: "Retain (Maximize LTV)",
      desc: "We optimize backend flows like retention, upsells, and repeat purchases to increase lifetime value.",
      meaning: "What this means for you: You’ll make more profit from the same customers through repeat purchases.",
      highlight: "More profit from same customers",
      icon: <Users className="w-6 h-6" />
    }
  ];

  return (
    <section className="w-full py-32 lg:py-48 px-6 bg-brandBg font-sans relative overflow-hidden">
      {/* Subtle Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-brandDark/[0.02] uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
        The Protocol
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 lg:mb-32 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-brandDark/5 border border-brandDark/10 rounded-full"
          >
            <div className="w-2 h-2 rounded-full bg-brandYellow animate-pulse" />
            <span className="text-[10px] font-black text-brandDark/60 uppercase tracking-[0.4em]">The 5-Step System</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-8xl font-black text-brandDark tracking-tighter leading-[0.85] uppercase"
          >
            A System Built For <br /> 
            <span className="text-brandYellow italic">Contribution Margin.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brandDark/60 text-xl lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed"
          >
            Our Performance Marketing protocol is designed to eliminate guesswork and build scalable, repeatable profit centers for your brand.
          </motion.p>
        </div>

        {/* Roadmap Container */}
        <div className="relative mb-24">
          {/* Desktop Road Line - Refined */}
          <div className="hidden lg:block absolute top-[70px] left-[5%] right-[5%] z-0 h-[2px] bg-brandDark/5">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-brandYellow/30 relative"
            >
              <div className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 rounded-full bg-brandYellow blur-[4px]" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center"
              >
                {/* Step Marker */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-brandDark rounded-3xl shadow-2xl flex items-center justify-center text-white relative z-20 ring-8 lg:ring-[12px] ring-brandBg group-hover:scale-110 group-hover:bg-brandYellow group-hover:text-brandDark transition-all duration-500 mb-8 overflow-hidden">
                  <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                    {step.icon}
                  </div>
                  {/* Decorative Glow */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-[2.5rem] p-8 w-full text-left shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 border-2 border-transparent hover:border-brandYellow/10 flex flex-col space-y-6 group-hover:-translate-y-3 relative overflow-hidden">
                  
                  {/* Ghost Numbering */}
                  <span className="absolute top-4 right-6 text-7xl font-black text-brandDark/5 select-none pointer-events-none group-hover:text-brandYellow/10 transition-colors">
                    {step.num}
                  </span>

                  <div className="space-y-4 relative z-10">
                    <h3 className="text-xl lg:text-2xl font-black text-brandDark tracking-tighter leading-tight uppercase">
                      {step.title}
                    </h3>
                    <div className="space-y-4">
                      <p className="text-brandDark/60 text-sm font-medium leading-relaxed">
                        {step.desc}
                      </p>
                      <p className="text-brandDark/80 text-[12px] font-bold leading-tight italic border-l-2 border-brandYellow/30 pl-4 py-1">
                        {step.meaning}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brandDark/5 w-full relative z-10">
                    <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.3em]">
                      {step.highlight}
                    </span>
                  </div>

                  {/* Hover Glass Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brandYellow/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Differentiation Strip */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="w-full bg-brandDark rounded-[3rem] p-10 lg:p-16 mb-24 relative overflow-hidden group shadow-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brandYellow/5 via-transparent to-brandYellow/5 opacity-50" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex flex-col lg:flex-row items-center gap-10 text-center lg:text-left max-w-4xl">
              <div className="w-16 h-16 rounded-3xl bg-brandYellow/10 border border-brandYellow/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-8 h-8 text-brandYellow" />
              </div>
              <p className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-tight uppercase">
                Most agencies jump to scaling. <br />
                <span className="text-brandYellow italic">We don’t scale until the math makes sense.</span>
              </p>
            </div>
            <button 
              onClick={onBookAudit}
              className="px-8 py-4 bg-white text-brandDark font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-brandYellow transition-all whitespace-nowrap"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Bottom Section: Proof + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Micro-Proof */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[3rem] p-10 lg:p-16 border-2 border-brandDark/5 shadow-2xl space-y-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brandYellow/5 blur-[100px] -mr-32 -mt-32" />
            <div className="space-y-4">
              <p className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Target Metrics</p>
              <h4 className="text-3xl lg:text-4xl font-black text-brandDark tracking-tighter uppercase whitespace-nowrap">
                Protocol Benchmarks:
              </h4>
            </div>
            <ul className="space-y-6">
              {[
                "Target 30–60% contribution lift",
                "Achieve stable blended MER (4.5x+)",
                "Scale only on Unit Econ stability"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-6 group">
                  <div className="w-8 h-8 rounded-xl bg-brandDark text-white flex items-center justify-center shrink-0 shadow-lg group-hover:bg-brandYellow group-hover:text-brandDark transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span className="text-xl lg:text-2xl font-bold text-brandDark/80 tracking-tight">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Button */}
          <div className="flex flex-col items-center lg:items-start space-y-8 lg:space-y-12">
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brandDark/5 text-brandDark/60 rounded-full text-[10px] font-black uppercase tracking-widest">
                <Target className="w-3 h-3" />
                Strategic Protocol
              </div>
              <h4 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-[0.9] uppercase">
                Ready to fix your <br /> <span className="text-brandYellow italic">profit leaks?</span>
              </h4>
              <p className="text-brandDark/60 text-xl lg:text-2xl font-medium max-w-md">
                We’ll map out exactly where your profit is leaking in a 1-on-1 audit.
              </p>
            </div>
            
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-brandYellow/20 rounded-[2rem] blur-xl group-hover:bg-brandYellow/30 transition-all" />
              <button 
                onClick={onBookAudit}
                className="relative w-full py-6 lg:py-8 bg-brandYellow text-brandDark font-black text-sm lg:text-base uppercase tracking-[0.4em] rounded-[2rem] shadow-4xl flex items-center justify-center gap-4 transition-all duration-500 hover:bg-brandDark hover:text-white"
              >
                Get My Free Profit Audit
                <ArrowRight className="w-6 h-6" />
              </button>
              <p className="mt-4 text-center text-[10px] font-black text-brandDark/30 uppercase tracking-[0.4em]">Currently Onboarding: June 2026 Batch (2 Spots Left)</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const Target = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

