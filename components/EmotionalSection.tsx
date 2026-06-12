'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Wallet, AlertCircle } from 'lucide-react';

export const EmotionalSection: React.FC = () => {
  return (
    <section className="w-full py-12 lg:py-16 px-6 bg-brandDark text-white relative overflow-hidden">
      {/* Subtle Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
        The Reality
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-25 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-brandYellow/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full"
          >
            <AlertCircle className="w-3.5 h-3.5 text-brandYellow" />
            <span className="text-[9px] font-black text-brandYellow uppercase tracking-[0.3em]">The Harsh Reality</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center text-left">
            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl lg:text-6xl font-black tracking-tighter leading-[0.95] uppercase"
              >
                Revenue is Rising, <br />
                But Your Bank <br />
                <span className="text-brandYellow italic">Account is Flat.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-white/80 text-base lg:text-lg font-medium max-w-xl leading-relaxed"
              >
                Scaling your top-line is a technical task. Scaling your bottom-line is a strategic one. Most founders scale right into a deficit because they chase vanity metrics.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative flex items-start gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all backdrop-blur-md"
              >
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/30 shrink-0">
                  <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">The Revenue Trap</h3>
                  <p className="text-white/70 text-sm font-medium leading-relaxed">
                    By the time you pay Meta, Shopify, Logistics, and COGS—there's almost nothing left for the founder.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group relative flex items-start gap-6 p-6 rounded-3xl bg-brandYellow/10 border border-brandYellow/20 hover:bg-brandYellow/15 hover:border-brandYellow/30 transition-all backdrop-blur-md"
              >
                <div className="w-12 h-12 bg-brandYellow/20 rounded-xl flex items-center justify-center border border-brandYellow/30 shrink-0">
                  <Wallet className="w-5 h-5 text-brandYellow" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase tracking-tight text-brandYellow">The Profit Fix</h3>
                  <p className="text-white/90 text-sm font-medium leading-relaxed">
                    We re-engineer your growth around <span className="text-white font-black underline decoration-brandYellow decoration-2 underline-offset-4">Contribution Margin</span>. Build a sustainable asset.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
