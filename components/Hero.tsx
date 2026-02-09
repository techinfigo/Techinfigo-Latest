
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 py-20 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Authority Label */}
        <span className="inline-block px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest uppercase border border-brandDark/20 rounded-full text-brandDark/70">
          Revenue-first growth infrastructure
        </span>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brandDark leading-[1.1] tracking-tight mb-8">
          Build Predictable Growth Systems for Your D2C Brand
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-brandDark/80 max-w-2xl leading-relaxed mb-12">
          Stop gambling on ad accounts. We build the growth infrastructure that drives 
          profitable, sustainable scale for founders doing ₹20L–₹2Cr monthly revenue.
        </p>

        {/* Primary CTA */}
        <button 
          className="bg-brandYellow hover:bg-[#e9a528] text-brandDark font-bold px-10 py-5 rounded-md text-lg transition-colors duration-200 shadow-sm"
          onClick={() => console.log('CTA Clicked: Growth Audit Application')}
        >
          Apply for Free Growth Audit
        </button>
      </div>
    </section>
  );
};
