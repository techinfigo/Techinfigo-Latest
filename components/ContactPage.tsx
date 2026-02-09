
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
      <div className="min-h-screen bg-brandDark flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-brandYellow rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <svg className="w-10 h-10 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tighter">Application Logged.</h1>
          <p className="text-white/60 text-lg lg:text-xl max-w-lg mx-auto">
            Our audit engine has received your parameters. A senior strategist will be in touch via WhatsApp within 24 hours.
          </p>
          <button onClick={onBack} className="inline-block mt-8 text-brandYellow font-bold uppercase tracking-widest text-xs border-b border-brandYellow pb-1">
            Return to Command Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandBg flex flex-col lg:flex-row pt-20 lg:pt-32">
      <div className="w-full lg:w-[40%] bg-white border-r border-brandDark/5 p-8 lg:p-24 flex flex-col justify-between">
        <div className="space-y-12">
          <button onClick={onBack} className="flex items-center gap-3 text-brandDark/40 hover:text-brandDark uppercase text-[9px] font-bold tracking-widest">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Abort & Return
          </button>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-7xl font-bold text-brandDark tracking-tighter leading-tight">Growth <span className="text-brandDark/20">Audit.</span></h1>
            <p className="text-brandDark/60 text-base leading-relaxed">Forensic review of conversion loops, attribution integrity, and scaling bottlenecks.</p>
          </div>
          <div className="space-y-8 pt-4">
            {['Data Ingestion', 'P&L Stress Test', 'Mandate Review'].map((title, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-xs font-mono font-bold text-brandYellow">0{i+1}</span>
                <h4 className="font-bold text-brandDark text-xs uppercase tracking-widest">{title}</h4>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-12 text-[9px] font-bold text-brandDark/30 uppercase tracking-widest">₹50L+ Monthly Revenue Required</p>
      </div>

      <div className="w-full lg:w-[60%] bg-brandDark p-8 lg:p-24 flex items-center justify-center relative">
        <form onSubmit={handleSubmit} className="max-w-xl w-full space-y-6 lg:space-y-8 relative z-10">
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Founder Name</label>
            <input required type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-brandYellow outline-none transition-colors" placeholder="Full name" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Official Website</label>
            <input required type="url" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-brandYellow outline-none transition-colors" placeholder="https://..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Monthly Revenue</label>
              <select required className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-brandYellow outline-none appearance-none">
                <option value="" className="bg-brandDark">Select Bracket</option>
                <option value="50-100" className="bg-brandDark">₹50L - ₹1Cr</option>
                <option value="100+" className="bg-brandDark">₹1Cr+</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest">WhatsApp</label>
              <input required type="tel" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-brandYellow outline-none transition-colors" placeholder="+91..." />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full py-5 lg:py-6 font-bold text-[10px] uppercase tracking-[0.4em] bg-brandYellow text-brandDark hover:bg-white transition-all">
            {loading ? 'Processing...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};
