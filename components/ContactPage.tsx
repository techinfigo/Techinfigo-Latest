
import React, { useState } from 'react';

interface ContactPageProps {
  onBack: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brandDark flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center space-y-8 py-20">
          <div className="w-24 h-24 bg-brandYellow rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(252,182,50,0.3)]">
            <svg className="w-12 h-12 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">Application Logged.</h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-lg mx-auto">
            Our audit engine has received your parameters. A senior strategist will be in touch via WhatsApp within 24 hours.
          </p>
          <button 
            onClick={onBack}
            className="inline-block mt-8 text-brandYellow font-bold uppercase tracking-[0.4em] text-xs border-b border-brandYellow pb-1 hover:text-white hover:border-white transition-colors"
          >
            Return to Command Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandBg flex flex-col lg:flex-row pt-32">
      {/* Left Panel: Strategic Information */}
      <div className="w-full lg:w-[40%] bg-white border-r border-brandDark/5 p-12 lg:p-24 flex flex-col justify-between">
        <div className="space-y-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-brandDark/40 hover:text-brandDark transition-colors group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Abort & Return</span>
          </button>

          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold text-brandDark tracking-tighter leading-[0.9]">
              The Growth <br /> <span className="text-brandDark/20">Audit.</span>
            </h1>
            <p className="text-brandDark/60 text-lg leading-relaxed max-w-sm">
              An exhaustive technical review of your current conversion loops, attribution integrity, and scaling bottlenecks.
            </p>
          </div>

          <div className="space-y-10 pt-8">
            {[
              { id: '01', title: 'Data Ingestion', desc: 'We verify your tracking & attribution nodes.' },
              { id: '02', title: 'P&L Stress Test', desc: 'Auditing unit economics for scale readiness.' },
              { id: '03', title: 'Mandate Review', desc: 'Final alignment check with our execution team.' }
            ].map((step) => (
              <div key={step.id} className="flex gap-6 items-start">
                <span className="text-sm font-mono font-bold text-brandYellow">{step.id}</span>
                <div>
                  <h4 className="font-bold text-brandDark text-sm uppercase tracking-widest mb-1">{step.title}</h4>
                  <p className="text-sm text-brandDark/40 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12 border-t border-brandDark/5">
          <p className="text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.4em]">
            Strictly for brands doing ₹50L+ monthly revenue
          </p>
        </div>
      </div>

      {/* Right Panel: The Input Form */}
      <div className="w-full lg:w-[60%] bg-brandDark p-12 lg:p-24 flex items-center justify-center relative overflow-hidden">
        {/* Subtle Tech Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

        <div className="max-w-xl w-full relative z-10">
          <div className="mb-12">
            <span className="text-[10px] font-mono text-brandYellow tracking-[0.5em] uppercase mb-4 block">System_Input_Required</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Founder Information Protocol</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">FLD_01: Founder Name</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-brandYellow transition-colors" placeholder="Full legal name" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">FLD_02: Brand Name</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-brandYellow transition-colors" placeholder="Registered brand entity" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">FLD_03: Official Website</label>
              <input required type="url" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-brandYellow transition-colors" placeholder="https://yourbrand.com" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">FLD_04: Monthly Revenue (INR)</label>
                <select required className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-brandYellow transition-colors appearance-none cursor-pointer">
                  <option value="" className="bg-brandDark">Select Bracket</option>
                  <option value="50-100" className="bg-brandDark">₹50L - ₹1Cr</option>
                  <option value="100-500" className="bg-brandDark">₹1Cr - ₹5Cr</option>
                  <option value="500+" className="bg-brandDark">₹5Cr+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">FLD_05: WhatsApp Contact</label>
                <input required type="tel" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-brandYellow transition-colors" placeholder="+91 ..." />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">FLD_06: Scaling Objective</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:outline-none focus:border-brandYellow transition-colors resize-none" placeholder="What is your primary bottleneck right now?"></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-6 font-bold text-[11px] uppercase tracking-[0.5em] transition-all duration-500 shadow-2xl ${loading ? 'bg-brandYellow/40 cursor-not-allowed text-brandDark/50' : 'bg-brandYellow text-brandDark hover:bg-white hover:scale-[1.01]'}`}
            >
              {loading ? 'Initializing Audit Engine...' : 'Submit Audit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
