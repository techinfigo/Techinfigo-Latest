import React from 'react';
import { Check, Store, ShoppingBag } from 'lucide-react';

/** Local Agra businesses and online (D2C) brands: who Techinfigo works with. Used on About and Home. */
export function WhoWeWorkWith() {
  return (
<section className="py-20 lg:py-32 px-6 lg:px-12 bg-brandBg border-y border-brandDark/5">
      <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
        <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter max-w-3xl">Who we work with</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {[
            {
              icon: <Store className="w-6 h-6" aria-hidden="true" />,
              title: 'Local businesses in Agra',
              text: 'Shops, showrooms, clinics, coaching centres, hotels and restaurants that want more calls and walk-ins.',
              points: ['Website and Google profile', 'Social media and local ads', 'Enquiries tracked in a free CRM'],
              dark: true,
            },
            {
              icon: <ShoppingBag className="w-6 h-6" aria-hidden="true" />,
              title: 'Online brands (D2C)',
              text: 'Brands across India selling on their own website or Shopify that want profitable growth, not just more orders.',
              points: ['Meta sales campaigns and creatives', 'Product page and checkout fixes', 'Repeat-purchase flows on WhatsApp'],
              dark: false,
            },
          ].map((c) => (
            <div
              key={c.title}
              className={`rounded-[2.5rem] p-8 lg:p-12 space-y-6 ${c.dark ? 'bg-brandDark text-white' : 'bg-white text-brandDark border border-brandDark/5'}`}
            >
              <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.dark ? 'bg-brandYellow text-brandDark' : 'bg-brandDark text-brandYellow'}`}>
                {c.icon}
              </span>
              <h3 className="text-2xl lg:text-3xl font-black tracking-tight">{c.title}</h3>
              <p className={`text-lg leading-relaxed ${c.dark ? 'text-white/65' : 'text-brandDark/65'}`}>{c.text}</p>
              <ul className="space-y-3">
                {c.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-semibold">
                    <Check className="w-4 h-4 text-brandYellow shrink-0" aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
