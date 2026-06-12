'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Wallet, AlertCircle } from 'lucide-react';

export const EmotionalSection: React.FC = () => {
  return (
    <section className="w-full py-20 lg:py-32 px-6 bg-brandDark text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-brandYellow/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
          >
            <AlertCircle className="w-4 h-4 text-brandYellow" />
            <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">The Harsh Reality</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase"
          >
            Revenue is Rising, <br />
            But Your Bank <br />
            <span className="text-brandYellow italic">Account is Flat.</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 text-left"
          >
            <div className="space-y-6 p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-400 rotate-180" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">The Revenue Trap</h3>
              <p className="text-white/80 text-lg font-medium leading-relaxed">
                Platform dashboards show record sales, but by the time you pay Meta, Shopify, Logistics, and COGS—there's almost nothing left for the founder.
              </p>
            </div>

            <div className="space-y-6 p-8 rounded-[2rem] bg-brandYellow/5 border border-brandYellow/20 backdrop-blur-sm">
              <div className="w-12 h-12 bg-brandYellow/10 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-brandYellow" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-brandYellow">The Profit Fix</h3>
              <p className="text-white text-lg font-medium leading-relaxed">
                We re-engineer your growth around <span className="text-white font-black underline decoration-brandYellow decoration-2 underline-offset-4">Contribution Margin</span>. We stop renting customers and start building a sustainable, profitable asset.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
