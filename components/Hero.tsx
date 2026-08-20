'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import { Counter } from './Counter';
// PROOF_DISCLAIMER stays hardcoded: it is legal-adjacent wording that has to
// stay accurate to what 'benchmark' means, not a value to be edited casually.
import { PROOF_DISCLAIMER } from '../config/site';
import { useSiteSettings } from './SiteSettingsProvider';

interface HeroProps {
  onBookAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookAudit }) => {
  const { proofMode, targets } = useSiteSettings();

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 lg:pt-32 px-6 lg:px-12 overflow-hidden bg-brandDark border-b border-white/5">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-brandDark"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brandYellow/5 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center z-10 py-12 lg:py-20">
        
        {/* Left Content Column */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-brandYellow/10 border border-brandYellow/30 rounded-full"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brandYellow animate-pulse"></div>
            <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.2em]">
              Profit-First Growth for D2C Brands
            </span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter uppercase"
            >
              Scaling Revenue <br /> 
              is Easy. Scaling <br />
              <span className="text-brandYellow italic">Profit is Hard.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-2xl text-white/80 font-medium max-w-xl leading-relaxed"
            >
              We find the hidden profit leaks in your funnel and build the system to scale your bottom line.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-brandYellow/20 rounded-2xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
              <button 
                onClick={onBookAudit}
                className="relative px-10 py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-3"
              >
                Get My Free Profit Audit
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-6 text-[10px] font-black text-white/30 uppercase tracking-[0.3em] flex items-center gap-3">
              <ShieldCheck className="w-3 h-3 text-brandYellow" />
              No Junior Account Managers. Only Strategists.
            </p>
          </motion.div>
        </div>

        {/* Right Visual Column - Before/After Graphic */}
        <div className="lg:col-span-6 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white/5 border border-white/10 rounded-[3rem] p-8 lg:p-12 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-8 lg:gap-12">
              {/* Before */}
              <div className="space-y-8 relative">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Industry Baseline</span>
                  <p className="text-xl font-black text-white/60 uppercase">The Trap</p>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl lg:text-5xl font-black text-white/40 tracking-tighter strike-through opacity-50 relative">
                    1.8x <br />
                    <span className="text-xs uppercase tracking-widest text-white/20 font-bold block mt-1">Platform MER</span>
                  </div>
                  <div className="text-4xl lg:text-5xl font-black text-red-500/40 tracking-tighter strike-through opacity-50">
                    Net Drain <br />
                    <span className="text-xs uppercase tracking-widest text-white/20 font-bold block mt-1">Margin</span>
                  </div>
                </div>
                <TrendingDown className="w-12 h-12 text-red-500/20 absolute -bottom-4 right-0" />
              </div>

              {/* After */}
              <div className="space-y-8 relative pl-8 border-l border-white/10">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-brandYellow uppercase tracking-widest">Techinfigo System</span>
                  <p className="text-xl font-black text-white uppercase">{proofMode === 'client' ? 'The Result' : 'The Target'}</p>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl lg:text-6xl font-black text-brandYellow tracking-tighter">
                    <Counter value={targets.blendedMer} decimals={1} suffix="x" /> <br />
                    <span className="text-xs uppercase tracking-widest text-white/40 font-bold block mt-1">Blended MER</span>
                  </div>
                  <div className="text-4xl lg:text-6xl font-black text-white tracking-tighter">
                    <Counter value={targets.netProfit} decimals={1} suffix="x" /> <br />
                    <span className="text-xs uppercase tracking-widest text-white/40 font-bold block mt-1">Net Profit</span>
                  </div>
                </div>
                <TrendingUp className="w-12 h-12 text-brandYellow/40 absolute -bottom-4 right-0" />
              </div>
            </div>

            {/* Decorative Connection */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-2/3 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          </motion.div>

          {proofMode !== 'client' && (
            <p className="mt-4 px-2 text-[10px] font-medium text-white/30 leading-relaxed">
              {PROOF_DISCLAIMER}
            </p>
          )}

          {/* Floating Accents */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 px-6 py-3 bg-brandYellow rounded-2xl shadow-2xl z-20"
          >
            <span className="text-[10px] font-black text-brandDark uppercase tracking-widest">+{targets.contributionLift}% Contribution</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

