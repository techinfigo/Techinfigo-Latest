import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Search, TestTube, ShieldCheck, TrendingUp, Users } from 'lucide-react';

interface SystemPageProps {
  onNavigate: (page: string) => void;
}

export const SystemPage: React.FC<SystemPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      id: 'audit',
      num: '01',
      title: 'Step 1: Identify Profit Leaks',
      icon: <Search className="w-6 h-6 text-brandYellow" />,
      explain: 'We break down your funnel, CAC, MER, and hidden costs.',
      highlight: 'No scaling until this is fixed'
    },
    {
      id: 'test',
      num: '02',
      title: 'Step 2: Find What Actually Works',
      icon: <TestTube className="w-6 h-6 text-brandYellow" />,
      explain: 'We test creatives, offers, and funnels systematically.'
    },
    {
      id: 'stabilize',
      num: '03',
      title: 'Step 3: Build a Profit Baseline',
      icon: <ShieldCheck className="w-6 h-6 text-brandYellow" />,
      explain: 'We bring consistency before scaling.'
    },
    {
      id: 'scale',
      num: '04',
      title: 'Step 4: Scale Without Breaking Margins',
      icon: <TrendingUp className="w-6 h-6 text-brandYellow" />,
      explain: 'We increase budgets only when system is stable.'
    },
    {
      id: 'retain',
      num: '05',
      title: 'Step 5: Maximize Customer Value',
      icon: <Users className="w-6 h-6 text-brandYellow" />,
      explain: 'We improve LTV through retention & backend optimization.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#001d21] text-white font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* 1. HERO SECTION (OPTIMIZED) */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 px-6 lg:px-12 overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Glow & Grid (Recipe 1) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 w-full space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-brandYellow/10 border border-brandYellow/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-brandYellow animate-pulse"></div>
                <span className="text-[10px] font-mono font-bold text-brandYellow uppercase tracking-[0.3em]">System_Deployment // Active</span>
              </div>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-brandYellow/30 to-transparent"></div>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-black tracking-[-0.03em] leading-[0.9] uppercase text-white">
              A System Built to Scale <br />
              <span className="text-brandYellow italic">Profitable</span> Growth <br />
              <span className="text-white/20 text-2xl lg:text-4xl">— Not Just Revenue</span>
            </h1>
            
            <p className="text-white/60 text-sm lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Most brands scale blindly and lose margins. Our proprietary architecture ensures you grow predictably, sustainably, and with healthy profit.
            </p>
            
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('contact')}
                className="group relative px-12 py-6 bg-brandYellow text-brandDark font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(252,182,50,0.25)] overflow-hidden"
              >
                <span className="relative z-10">Initiate Profit Audit</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
              
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest">Growth_Engine_v4.0</span>
                </div>
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Protocol: STABLE_RELEASE</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE CORE PROBLEM (OPTIMIZED - THEME BASED) */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-brandDark border-y border-white/5 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/5 hidden lg:block"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-white/5 hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest">Diagnostic_Report // Critical_Inefficiency</span>
                </div>
                
                <h2 className="text-4xl lg:text-6xl font-black tracking-[-0.03em] leading-[1] uppercase text-white">
                  Why Most D2C Brands <br />
                  <span className="text-brandYellow italic">Struggle</span> To Scale
                </h2>
                
                <p className="text-white/60 text-base lg:text-lg font-medium max-w-xl leading-relaxed">
                  Scaling a broken system only accelerates losses. We identify the structural leaks before we ever touch the "scale" button.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "AD_SPEND", issue: "Scaling without fixing profit", code: "ERR_01" },
                  { label: "METRICS", issue: "No clarity on real MER/CAC", code: "ERR_02" },
                  { label: "CREATIVE", issue: "Creative burnout & fatigue", code: "ERR_03" },
                  { label: "BACKEND", issue: "AOV & Retention ignored", code: "ERR_04" }
                ].map((point, i) => (
                  <div key={i} className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl group hover:border-brandYellow/40 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                      <span className="text-[10px] font-mono font-bold text-white">{point.code}</span>
                    </div>
                    <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest mb-3">{point.label}</p>
                    <p className="text-base lg:text-lg text-white/90 font-bold leading-tight group-hover:text-white transition-colors">{point.issue}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-8 border-t border-white/10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brandDark bg-white/10 flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale opacity-50" />
                    </div>
                  ))}
                </div>
                <p className="text-[11px] lg:text-sm font-bold text-brandYellow uppercase tracking-[0.2em] max-w-[180px] leading-relaxed">
                  "More traffic doesn't fix a broken system."
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 space-y-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500/50 via-brandYellow/50 to-emerald-500/50"></div>
                
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest">System_Error_Log</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/30">v4.0_AUDIT</span>
                </div>
                
                <div className="space-y-8">
                  {[
                    { label: "PROFIT_LEAKAGE", val: 85, color: "bg-red-500", status: "CRITICAL" },
                    { label: "SPEND_WASTE", val: 95, color: "bg-brandYellow", status: "HIGH" },
                    { label: "RETENTION_GAP", val: 70, color: "bg-orange-500", status: "WARNING" }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest block">{stat.label}</span>
                          <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded ${stat.status === 'CRITICAL' ? 'bg-red-500/10 text-red-500' : stat.status === 'HIGH' ? 'bg-brandYellow/10 text-brandYellow' : 'bg-orange-500/10 text-orange-500'}`}>
                            {stat.status}
                          </span>
                        </div>
                        <span className="text-2xl font-black text-white/80 tracking-tighter">{stat.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
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
                
                <div className="pt-4">
                  <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-mono text-red-500/80 uppercase tracking-widest leading-relaxed">
                      CRITICAL: Scaling budget in current state will result in negative contribution margin. Fix leaks before deployment.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative nodes */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brandYellow/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>      {/* 3. SYSTEM OVERVIEW (GROWTH PIPELINE) */}
      <section className="py-12 lg:py-24 px-6 lg:px-12 bg-[#001d21] relative overflow-hidden border-b border-white/5">
        {/* Subtle Blueprint Grid */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brandYellow/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto space-y-20 relative z-10">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-[1px] w-8 bg-brandYellow/30"></div>
              <span className="text-[10px] font-mono font-bold text-brandYellow uppercase tracking-[0.4em]">Growth_Architecture // v4.0</span>
              <div className="h-[1px] w-8 bg-brandYellow/30"></div>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black tracking-[-0.03em] leading-[1] uppercase text-white">
              The <span className="text-brandYellow italic">Profit</span> Pipeline
            </h2>
            
            <p className="text-white/70 text-sm lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Our proprietary 5-step deployment sequence designed to transform revenue into predictable, scalable profit.
            </p>
          </div>
 
          <div className="relative">
            {/* Main Flow Line (Animated) */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden lg:block -translate-y-1/2">
              <motion.div 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-brandYellow/0 via-brandYellow/40 to-brandYellow/0"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
              {steps.map((step, i) => (
                <motion.div 
                  key={step.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`space-y-8 group relative ${i % 2 !== 0 ? 'lg:pt-16' : 'lg:pb-16'}`}
                >
                  {/* Step Indicator */}
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative">
                      {/* Outer Ring */}
                      <div className="absolute -inset-4 border border-white/5 rounded-full group-hover:border-brandYellow/20 transition-colors duration-700"></div>
                      
                      {/* Main Icon Container */}
                      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[#002a2f] border border-white/10 flex items-center justify-center relative z-10 group-hover:border-brandYellow/50 transition-all duration-500 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {React.cloneElement(step.icon as React.ReactElement, { className: "w-8 h-8 lg:w-10 lg:h-10 text-brandYellow/40 group-hover:text-brandYellow transition-all duration-500 group-hover:scale-110" })}
                        
                        {/* Number Badge */}
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-brandYellow text-brandDark rounded-full flex items-center justify-center text-[10px] font-black border-4 border-[#001d21]">
                          0{step.num}
                        </div>
                      </div>

                      {/* Connection Dots (Vertical) */}
                      <div className={`absolute left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-brandYellow/40 to-transparent hidden lg:block ${i % 2 !== 0 ? '-top-12' : '-bottom-12'}`}></div>
                    </div>
                    
                    <div className="space-y-3 max-w-[200px]">
                      <div className="space-y-1">
                        <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter text-white group-hover:text-brandYellow transition-colors duration-500 leading-none">
                          {step.id}
                        </h3>
                        <p className="text-[10px] font-mono text-brandYellow/90 font-bold uppercase tracking-widest">
                          {step.title.split(':')[1]?.trim() || step.title}
                        </p>
                      </div>
                      
                      <div className="h-px w-8 bg-white/10 mx-auto group-hover:w-16 transition-all duration-500"></div>
                      
                      <p className="text-[11px] text-white/80 font-medium leading-relaxed group-hover:text-white transition-colors">
                        {step.explain.split('.')[0]}.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* System Status Bar */}
          <div className="pt-12 flex justify-center">
            <div className="px-8 py-4 bg-white/[0.02] border border-white/5 rounded-full flex items-center gap-8 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest">Pipeline_Active</span>
              </div>
              <div className="w-px h-4 bg-white/10"></div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest">Efficiency:</span>
                <span className="text-[9px] font-mono text-brandYellow font-bold uppercase tracking-widest">98.4%</span>
              </div>
              <div className="w-px h-4 bg-white/10"></div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest">Protocol:</span>
                <span className="text-[9px] font-mono text-white/90 font-bold uppercase tracking-widest">MAX_PROFIT_v4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEEP BREAKDOWN (STAGGERED TIMELINE) (OPTIMIZED) */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-white/5 relative overflow-hidden border-b border-white/5">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-1.5 bg-brandYellow/10 border border-brandYellow/20 rounded-full">
              <span className="text-[10px] font-mono font-bold text-brandYellow uppercase tracking-widest text-center">System_Architecture // Deep_Dive</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-[-0.02em] uppercase leading-tight text-white">
              The <span className="text-brandYellow">5-Phase</span> Deployment
            </h2>
          </div>

          <div className="relative space-y-12">
            {/* Vertical Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden lg:block -translate-x-1/2"></div>
            
            {steps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-0 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Content Card */}
                <div className="w-full lg:w-[45%] group">
                  <div className="p-10 rounded-[2.5rem] bg-[#002a2f]/40 border border-white/10 hover:border-brandYellow/40 transition-all duration-500 relative overflow-hidden backdrop-blur-sm">
                    <div className="space-y-6 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-brandYellow/10 border border-brandYellow/20 flex items-center justify-center">
                          {React.cloneElement(step.icon as React.ReactElement, { className: "w-6 h-6 text-brandYellow" })}
                        </div>
                        <span className="text-[11px] font-mono font-bold text-brandYellow/70 uppercase tracking-widest">Phase_0{step.num}</span>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-white/90 group-hover:text-brandYellow transition-colors">{step.id}</h3>
                        <p className="text-sm lg:text-base text-white/70 font-medium leading-relaxed group-hover:text-white transition-colors">
                          {step.explain}
                        </p>
                      </div>

                      {step.highlight && (
                        <div className="pt-6 flex items-center gap-3">
                          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-widest">
                            {step.highlight}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-brandYellow/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl"></div>
                  </div>
                </div>

                {/* Center Node */}
                <div className="relative z-10 hidden lg:block">
                  <div className="w-14 h-14 rounded-full bg-brandDark border-4 border-white/10 flex items-center justify-center group-hover:border-brandYellow/50 transition-all duration-500 shadow-xl">
                    <div className="w-3 h-3 rounded-full bg-brandYellow animate-pulse"></div>
                  </div>
                </div>

                {/* Spacer for Staggered Layout */}
                <div className="hidden lg:block lg:w-[45%]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT MAKES THIS DIFFERENT (OPTIMIZED) */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-white text-brandDark overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              <div className="inline-block px-4 py-1.5 bg-brandDark text-white rounded-full">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Competitive_Edge // v1.0</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black tracking-[-0.03em] leading-[1] uppercase text-brandDark">
                Why This <br />
                <span className="text-brandYellow italic">System</span> Works
              </h2>
              <p className="text-lg lg:text-xl text-brandDark/70 font-medium leading-relaxed max-w-md">
                We aren't just another agency running ads. We are growth partners who treat your bank balance as our primary KPI.
              </p>
              
              <div className="pt-8 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brandDark/20"></div>
                <span className="text-[10px] font-mono font-bold text-brandDark/40 uppercase tracking-widest">Protocol: PROFIT_FIRST</span>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-brandDark/10 border border-brandDark/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              {[
                { title: "Profit First", desc: "We optimize for contribution margin, not just ROAS or vanity metrics." },
                { title: "Full Funnel", desc: "We fix the backend (AOV, LTV) before we scale the frontend spend." },
                { title: "Data Driven", desc: "Every decision is backed by real-time MER and CAC diagnostic data." },
                { title: "Creative Ops", desc: "Systematic creative testing that identifies winners before they burn out." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 lg:p-12 space-y-6 group hover:bg-brandYellow transition-colors duration-700">
                  <span className="text-5xl lg:text-7xl font-black text-brandDark/5 group-hover:text-brandDark/10 transition-colors">0{i + 1}</span>
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-none">{item.title}</h3>
                    <p className="text-base lg:text-lg text-brandDark/60 group-hover:text-brandDark font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA (OPTIMIZED) */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-[#001d21] relative overflow-hidden">
        {/* Atmospheric Glow (Recipe 7) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#fcb6320a_0%,_transparent_70%)]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brandYellow/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/10 rounded-[3rem] lg:rounded-[4rem] p-10 lg:p-20 text-center space-y-10 relative overflow-hidden backdrop-blur-md shadow-2xl">
          {/* Top Scanline Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brandYellow/40 to-transparent"></div>
          
          <div className="space-y-6 relative z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-[0.3em]">System_Ready_For_Deployment</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Version: 4.0.0</span>
                <div className="w-1 h-1 rounded-full bg-white/10"></div>
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Build: STABLE_RELEASE</span>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-[-0.03em] leading-[1.1] uppercase">
              Install <br />
              <span className="text-brandYellow italic">The Profit Engine</span>
            </h2>
            
            <p className="text-white/60 text-base lg:text-xl max-w-xl mx-auto font-medium leading-relaxed">
              Stop guessing. Start scaling. Get a clear roadmap to profitable growth and predictable margins.
            </p>
          </div>

          <div className="relative z-10 pt-4 space-y-10">
            <div className="flex flex-col items-center gap-8">
              <button 
                onClick={() => onNavigate('contact')}
                className="group relative px-14 py-7 bg-brandYellow text-brandDark font-black text-[11px] uppercase tracking-[0.5em] rounded-2xl hover:bg-white transition-all duration-700 shadow-[0_0_50px_rgba(252,182,50,0.25)] overflow-hidden scale-100 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Initiate Profit Audit</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
              </button>
              
              <div className="flex flex-wrap items-center justify-center gap-8">
                {[
                  { label: "Free_Diagnostic", icon: <Search className="w-3 h-3" /> },
                  { label: "30_Min_Strategy", icon: <TrendingUp className="w-3 h-3" /> },
                  { label: "Zero_Commitment", icon: <ShieldCheck className="w-3 h-3" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="text-brandYellow opacity-40">{item.icon}</div>
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-10 border-t border-white/10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
              <div className="flex items-center gap-4">
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Availability:</p>
                <p className="text-[10px] font-mono text-white/80 font-bold uppercase tracking-widest">Q2 2024 Slots Opening</p>
              </div>
              <div className="hidden lg:block w-px h-5 bg-white/10"></div>
              <div className="flex items-center gap-4">
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Queue:</p>
                <p className="text-[10px] font-mono text-white/80 font-bold uppercase tracking-widest">3 Brands In Onboarding</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
