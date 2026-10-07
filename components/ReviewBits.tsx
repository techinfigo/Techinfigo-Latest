import React from 'react';
import { Star } from 'lucide-react';

/** Small pieces shared by the Google reviews section and its pop-up. */

export const GoogleWordmark = () => (
  <span className="font-bold tracking-tight" aria-label="Google">
    <span className="text-[#4285F4]">G</span>
    <span className="text-[#EA4335]">o</span>
    <span className="text-[#FBBC05]">o</span>
    <span className="text-[#4285F4]">g</span>
    <span className="text-[#34A853]">l</span>
    <span className="text-[#EA4335]">e</span>
  </span>
);

export const Stars = ({ value, size = 'w-4 h-4' }: { value: number; size?: string }) => (
  <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`${size} ${i <= Math.round(value) ? 'fill-brandYellow text-brandYellow' : 'fill-brandDark/10 text-brandDark/10'}`}
        aria-hidden="true"
      />
    ))}
  </span>
);
