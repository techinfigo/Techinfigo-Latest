import React, { useState, useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, value, onChange, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-[#fcfcfc] border px-5 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 text-left ${
          isOpen ? 'border-brandYellow ring-2 ring-brandYellow/5' : 'border-[#f0f0f0]'
        }`}
      >
        <span className={selectedOption ? 'text-brandDark' : 'text-brandDark/30'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`w-4 h-4 text-brandDark/30 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brandYellow' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-[100] left-0 right-0 mt-2 bg-white border border-[#f0f0f0] rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors ${
                value === opt.value 
                  ? 'bg-brandYellow text-brandDark' 
                  : 'hover:bg-brandYellow/10 text-brandDark/70 hover:text-brandDark'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface CareersPageProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works' | 'careers') => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    linkedin: '',
    portfolio: '',
    specialization: '',
    experience: '',
    expectedCtc: '',
    pitch: ''
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const roles = [
    { title: "Growth Strategist", focus: "P&L Engineering" },
    { title: "Performance Designer", focus: "Conversion Assets" },
    { title: "Data & Ops Engineer", focus: "Infrastructure" }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-brandBg pt-48 pb-32 px-6 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center space-y-8 animate-slide-up">
          <div className="w-20 h-20 bg-brandYellow rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <svg className="w-10 h-10 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-brandDark tracking-tighter">Profile Logged.</h1>
          <p className="text-brandDark/60 text-lg lg:text-xl max-w-lg mx-auto leading-relaxed">
            Our talent engine is reviewing your credentials. If there is a sync, you will receive a WhatsApp notification within 48 hours.
          </p>
          <button onClick={() => onNavigate('home')} className="inline-block mt-8 text-brandDark font-bold uppercase tracking-widest text-xs border-b-2 border-brandYellow pb-1 transition-all hover:text-brandYellow">
            Return to Command Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Standard Header */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              TALENT MANDATE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              Engineered <br />
              Together.
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              We don't hire 'employees.' We hire engineers who treat growth <br className="hidden lg:block" /> as a high-precision discipline.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Open Positions */}
          <div className="lg:col-span-5 space-y-12 sticky top-32">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.4em] block">
                OPEN POSITIONS
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-brandDark tracking-tighter leading-none">
                Operational <br /> Slots.
              </h2>
              <p className="text-brandDark/60 text-lg font-medium leading-relaxed">
                Current openings in our growth unit. Select a role to apply.
              </p>
            </div>

            <div className="space-y-6">
              {roles.map((role, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    updateField('specialization', role.focus.toLowerCase().includes('strategy') ? 'strategy' : role.focus.toLowerCase().includes('creative') ? 'creative' : 'data');
                    scrollToForm();
                  }}
                  className="group bg-white border border-brandDark/5 p-8 rounded-2xl space-y-4 shadow-sm hover:border-brandYellow/50 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                  
                  <span className="text-[10px] font-bold text-brandDark/20 tracking-[0.4em] uppercase block">SLOT_0{i+1}</span>
                  <h3 className="text-2xl font-bold text-brandDark tracking-tight group-hover:text-brandYellow transition-colors">{role.title}</h3>
                  <p className="text-brandDark/40 font-mono text-xs tracking-widest uppercase">{role.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div ref={formRef} className="lg:col-span-7 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-4xl border border-brandDark/5 space-y-12 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 rounded-bl-[2.5rem] pointer-events-none"></div>
              
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.3em]">INTAKE PROTOCOL</span>
                <h2 className="text-3xl lg:text-4xl font-black text-brandDark tracking-tight">Application Terminal</h2>
                <p className="text-brandDark/50 text-base">Neutral vetting process for high-yield talent.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Identity Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">FULL NAME *</label>
                    <input 
                      required type="text" 
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="e.g. Rahul Sharma" 
                      className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">WORK EMAIL *</label>
                    <input 
                      required type="email" 
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@domain.com" 
                      className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">WHATSAPP *</label>
                    <input 
                      required type="tel" 
                      value={formData.whatsapp}
                      onChange={(e) => updateField('whatsapp', e.target.value)}
                      placeholder="+91 XXXX XXX XXX" 
                      className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">LINKEDIN PROFILE *</label>
                    <input 
                      required type="url" 
                      value={formData.linkedin}
                      onChange={(e) => updateField('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/username" 
                      className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                    />
                  </div>
                </div>

                {/* Professional Scope */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <CustomSelect 
                    label="PRIMARY SPECIALIZATION *"
                    options={[
                      { label: "Growth Strategy & P&L", value: "strategy" },
                      { label: "Media Buying (Meta/Google)", value: "media" },
                      { label: "CRO & Landing Pages", value: "cro" },
                      { label: "Performance Creative", value: "creative" },
                      { label: "Retention & Email Ops", value: "retention" },
                      { label: "Data & Infrastructure", value: "data" }
                    ]}
                    value={formData.specialization}
                    onChange={(val) => updateField('specialization', val)}
                  />
                  <CustomSelect 
                    label="EXPERIENCE (D2C FOCUS) *"
                    options={[
                      { label: "0-2 Years (Associate)", value: "0-2" },
                      { label: "2-5 Years (Strategist)", value: "2-5" },
                      { label: "5+ Years (Expert)", value: "5+" }
                    ]}
                    value={formData.experience}
                    onChange={(val) => updateField('experience', val)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">PORTFOLIO / CASE STUDIES LINK</label>
                    <input 
                      type="url" 
                      value={formData.portfolio}
                      onChange={(e) => updateField('portfolio', e.target.value)}
                      placeholder="Link to your best work" 
                      className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">EXPECTED MONTHLY CTC (INR)</label>
                    <input 
                      type="text" 
                      value={formData.expectedCtc}
                      onChange={(e) => updateField('expectedCtc', e.target.value)}
                      placeholder="e.g. 1,00,000" 
                      className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brandDark/60 uppercase tracking-widest">THE PITCH (TELL US ABOUT A GROWTH WIN) *</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.pitch}
                    onChange={(e) => updateField('pitch', e.target.value)}
                    placeholder="Tell us about a specific variable you moved that led to a significant revenue lift."
                    className="w-full bg-[#fcfcfc] border border-[#f0f0f0] px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-brandYellow outline-none rounded-xl transition-all resize-none"
                  />
                </div>

                <div className="pt-8">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-6 bg-brandDark text-white font-bold text-sm uppercase tracking-[0.4em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-80"
                  >
                    {loading ? (
                      <span className="flex items-center gap-3">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        SYNCING PROFILE...
                      </span>
                    ) : (
                      <>
                        Submit Application
                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};