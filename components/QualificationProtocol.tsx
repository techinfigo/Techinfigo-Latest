'use client';

import React, { useState, useMemo } from 'react';
import { CheckCircle2, ArrowRight, Zap, Target, TrendingUp, Settings, BarChart3, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QualificationProtocolProps {
  onBookAudit: () => void;
}

const CRITERIA = [
  {
    id: 'spend',
    label: 'Spending ₹2L+/mo',
    description: 'You have a proven product and are already investing in traffic.',
    icon: Zap,
  },
  {
    id: 'profit',
    label: 'Profit Focused',
    description: 'You care about bottom-line margins more than vanity ROAS.',
    icon: Target,
  },
  {
    id: 'orders',
    label: 'Stable Orders',
    description: 'You have consistent sales but your margins feel unstable.',
    icon: BarChart3,
  },
  {
    id: 'predictable',
    label: 'Repeatable Growth',
    description: 'You want a system that works every month, not just by luck.',
    icon: TrendingUp,
  },
  {
    id: 'backend',
    label: 'Backend Ready',
    description: 'You are willing to fix operations to support 10x volume.',
    icon: Settings,
  }
];

export const QualificationProtocol: React.FC<QualificationProtocolProps> = ({ onBookAudit }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleCriteria = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const score = selectedIds.length;
  const progress = (score / CRITERIA.length) * 100;

  const getStatus = () => {
    if (score === 0) return { label: 'Select your current stage', color: 'text-brandDark/40' };
    if (score <= 2) return { label: 'Building Foundation', color: 'text-brandDark/60' };
    if (score <= 4) return { label: 'Growth Potential', color: 'text-brandYellow/80' };
    return { label: 'Ready to Scale', color: 'text-brandYellow' };
  };

  const status = getStatus();

  return (
    <section className="w-full py-16 lg:py-24 px-6 bg-brandBg font-sans relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brandYellow/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brandDark/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold tracking-[0.5em] uppercase text-brandDark/40 block"
          >
            Growth Diagnostic v2.0
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-5xl font-black text-brandDark tracking-tight leading-tight max-w-3xl mx-auto"
          >
            Is Your Brand Ready for <span className="text-brandYellow">Compounding Growth?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brandDark/60 text-sm lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Select the statements that describe your brand today. Our system only works for brands at a specific stage of maturity.
          </motion.p>
        </div>

        {/* Diagnostic Tool Container */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-black/5 overflow-hidden">
          {/* Progress Header */}
          <div className="bg-brandDark p-6 lg:p-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="space-y-1">
                <p className="text-brandYellow text-[10px] font-black uppercase tracking-[0.2em]">Readiness Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl lg:text-5xl font-black">{score}</span>
                  <span className="text-white/40 text-xl font-bold">/ {CRITERIA.length}</span>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[11px] font-black uppercase tracking-widest transition-colors duration-500 ${status.color}`}>
                    {status.label}
                  </span>
                  <span className="text-[11px] font-bold text-white/40">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-brandYellow shadow-[0_0_15px_rgba(252,182,50,0.5)]"
                  ></motion.div>
                </div>
              </div>
            </div>

            {/* Grid of Criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CRITERIA.map((item, idx) => {
                const isSelected = selectedIds.includes(item.id);
                const Icon = item.icon;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => toggleCriteria(item.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-5 rounded-2xl border transition-all duration-300 text-left group ${
                      isSelected 
                        ? 'bg-white/10 border-brandYellow shadow-[inset_0_0_20px_rgba(252,182,50,0.1)]' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-brandYellow text-brandDark' : 'bg-white/5 text-white/40 group-hover:text-white/60'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className={`text-sm font-bold transition-colors ${isSelected ? 'text-white' : 'text-white/60'}`}>
                          {item.label}
                        </h4>
                        <p className="text-[11px] text-white/40 leading-relaxed font-medium">
                          {item.description}
                        </p>
                      </div>
                      <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? 'bg-brandYellow border-brandYellow' : 'border-white/10'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-brandDark" />}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Result / Action Area */}
          <div className="p-8 lg:p-12 bg-white flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <AnimatePresence mode="wait">
                {score >= 4 ? (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-3"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brandYellow/10 text-brandYellow rounded-full text-[10px] font-black uppercase tracking-widest">
                      <Sparkles className="w-3 h-3" />
                      High Compatibility
                    </div>
                    <h3 className="text-2xl font-black text-brandDark tracking-tight">You are ready for the Techinfigo System.</h3>
                    <p className="text-brandDark/60 text-sm font-medium">
                      Your brand has the necessary foundation to support a compounding growth engine. We can help you scale to ₹2Cr/mo and beyond.
                    </p>
                  </motion.div>
                ) : score > 0 ? (
                  <motion.div
                    key="building"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-3"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brandDark/5 text-brandDark/60 rounded-full text-[10px] font-black uppercase tracking-widest">
                      <AlertCircle className="w-3 h-3" />
                      Foundation Stage
                    </div>
                    <h3 className="text-2xl font-black text-brandDark tracking-tight">Focus on the basics first.</h3>
                    <p className="text-brandDark/60 text-sm font-medium">
                      You're on the right track, but scaling now might break your margins. We recommend stabilizing your backend before aggressive growth.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-3"
                  >
                    <h3 className="text-2xl font-black text-brandDark tracking-tight">Where does your brand stand?</h3>
                    <p className="text-brandDark/60 text-sm font-medium">
                      Select the criteria above to see if your brand is currently in a position to scale profitably with our infrastructure.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="shrink-0">
              <motion.button
                onClick={onBookAudit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${
                  score >= 4 
                    ? 'bg-brandDark text-white shadow-[0_20px_40px_rgba(0,0,0,0.2)]' 
                    : 'bg-brandBg text-brandDark border border-black/10'
                }`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {score >= 4 ? 'Apply for Growth Audit' : 'Get Free Strategy'}
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${score >= 4 ? 'text-brandYellow' : ''}`} />
                </span>
                {score >= 4 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-brandYellow/0 via-brandYellow/10 to-brandYellow/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-brandDark/30 text-[10px] font-bold uppercase tracking-[0.3em]">
            Clarity on your stage = better decisions = better growth
          </p>
        </div>
      </div>
    </section>
  );
};
