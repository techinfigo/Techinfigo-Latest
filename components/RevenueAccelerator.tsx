import React from 'react';
import { Check, ArrowRight, ShieldCheck, Zap, BarChart3, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface RevenueAcceleratorProps {
  onBookAudit?: () => void;
}

export const RevenueAccelerator: React.FC<RevenueAcceleratorProps> = ({ onBookAudit }) => {
  return (
    <section className="w-full py-24 lg:py-48 px-6 bg-gradient-to-b from-[#001d21] to-[#000d0e] font-sans relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#facc15 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Subtle Glow Behind CTA Area */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brandYellow/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* 1. MAIN HEADLINE */}
        <div className="space-y-6 mb-12 animate-slide-up">
          <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95]">
            Still Scaling Without <br className="hidden md:block" />
            Knowing Your Real Profit?
          </h2>
          <h3 className="text-2xl lg:text-4xl font-black text-brandYellow tracking-tight">
            Let’s Fix That — Before You Spend Another ₹1
          </h3>
        </div>

        {/* 2. SUBTEXT */}
        <div className="max-w-2xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-white/60 text-lg lg:text-xl font-medium leading-relaxed">
            In the next 15–20 minutes, we’ll break down exactly where your money is leaking — 
            and what’s stopping your brand from scaling profitably.
          </p>
        </div>

        {/* 3. VALUE BULLETS & PREVIEW BOX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left: Value Bullets */}
          <div className="lg:col-span-7 space-y-6 text-left animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {[
              "Identify hidden profit leaks in your funnel",
              "See what’s actually making you money (not just ROAS)",
              "Get clarity on CAC, MER & real margins",
              "Walk away with actionable insights (even if we don’t work together)"
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-4 group">
                <div className="w-6 h-6 rounded-full bg-brandYellow/10 flex items-center justify-center shrink-0 mt-1 group-hover:bg-brandYellow/20 transition-colors">
                  <Check className="w-4 h-4 text-brandYellow" />
                </div>
                <span className="text-white/80 text-lg font-bold group-hover:text-white transition-colors">{bullet}</span>
              </div>
            ))}
          </div>

          {/* Right: Preview Box */}
          <div className="lg:col-span-5 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-left space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 blur-2xl rounded-full -mr-16 -mt-16"></div>
              
              <h4 className="text-brandYellow text-[10px] font-black uppercase tracking-[0.3em]">What you’ll get in the audit:</h4>
              
              <div className="space-y-4">
                {[
                  { label: "Funnel breakdown", icon: Search },
                  { label: "Profit leak report", icon: BarChart3 },
                  { label: "Scaling roadmap", icon: Zap }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <item.icon className="w-5 h-5 text-white/40" />
                    <span className="text-white font-bold text-sm tracking-wide">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. RISK REVERSAL */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="inline-block bg-brandYellow/10 border border-brandYellow/20 px-6 py-3 rounded-full">
            <p className="text-brandYellow font-black text-sm uppercase tracking-widest flex items-center gap-3">
              <ShieldCheck className="w-5 h-5" />
              “If we can’t find improvement opportunities, we won’t pitch you anything.”
            </p>
          </div>
        </div>

        {/* 5. URGENCY & CTA */}
        <div className="space-y-10 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="space-y-2">
            <p className="text-white font-black text-xl tracking-tight">
              Only 10 D2C brands onboarded per month
            </p>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
              Slots fill fast due to hands-on involvement
            </p>
          </div>

          <div className="relative inline-block">
            {/* Pulsing Glow Effect */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-brandYellow blur-2xl rounded-xl"
            />
            
            <button 
              onClick={onBookAudit}
              className="group relative px-16 py-8 bg-brandYellow text-brandDark font-black text-sm uppercase tracking-[0.4em] rounded-xl hover:bg-white transition-all shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                Get My Free Profit Audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>

          <div className="space-y-6">
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em]">
              No spam. No sales pressure. Just clarity.
            </p>
            
            <div className="pt-8 border-t border-white/5">
              <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">
                Trusted by growing D2C brands across India
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};