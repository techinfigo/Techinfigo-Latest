'use client';

import React, { useEffect, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { useSiteSettings } from './SiteSettingsProvider';
import { PHOTO_SLOTS, SHOW_SPOTS_KEY, photoUrl, type PhotoSlotId } from '../lib/settings-schema';

/**
 * Real photos uploaded in admin → Website photos. A spot renders nothing until
 * a photo is uploaded, so visitors never see an empty box.
 *
 * The owner can switch on "Show photo spots" in admin (stored in this browser
 * only). Then every empty spot shows as a labelled dashed box, so the layout is
 * visible before any photo exists. Visitors' browsers never have the switch.
 */

/** True when the admin "Show photo spots" switch is on in this browser. */
export function useShowSpots(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    try {
      setOn(window.localStorage.getItem(SHOW_SPOTS_KEY) === '1');
    } catch {
      setOn(false);
    }
  }, []);
  return on;
}

type Photo = { src: string; width: number; height: number; placeholder?: boolean };

export function usePhoto(slot: PhotoSlotId): Photo | null {
  const { photos } = useSiteSettings();
  const spots = useShowSpots();
  const meta = photos?.[slot];
  if (meta) return { src: photoUrl(slot, meta), width: meta.width, height: meta.height };
  if (spots && PHOTO_SLOTS.some((s) => s.id === slot)) return { src: '', width: 4, height: 3, placeholder: true };
  return null;
}

export function SitePhoto({
  slot,
  alt,
  className = '',
  priority = false,
}: {
  slot: PhotoSlotId;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const p = usePhoto(slot);
  if (!p) return null;
  if (p.placeholder) {
    const info = PHOTO_SLOTS.find((s) => s.id === slot);
    if (className.includes('rounded-full')) {
      // Small round spots (avatar): just the icon, the label is in the tooltip.
      return (
        <div className={`${className} flex items-center justify-center border-2 border-dashed border-brandYellow bg-brandYellow/15`} role="img" aria-label={`Photo spot: ${info?.label || slot}`} title={`Photo spot: ${info?.label}`}>
          <ImageIcon className="w-1/3 h-1/3 text-brandYellow" aria-hidden="true" />
        </div>
      );
    }
    return (
      <div
        className={`${className} relative flex flex-col items-center justify-center gap-2 p-4 text-center border-2 border-dashed border-brandYellow bg-brandYellow/10 text-brandDark`}
        role="img"
        aria-label={`Photo spot: ${info?.label || slot}`}
      >
        <ImageIcon className="w-8 h-8 text-brandYellow" aria-hidden="true" />
        <span className="text-xs font-black uppercase tracking-widest bg-brandYellow text-brandDark rounded px-2 py-1">Photo spot</span>
        <span className="text-sm font-black leading-tight bg-white/80 rounded px-2 py-0.5">{info?.label}</span>
        <span className="text-[11px] font-semibold leading-tight bg-white/80 rounded px-2 py-0.5 max-w-[16rem]">{info?.hint}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={p.src}
      alt={alt}
      width={p.width}
      height={p.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  );
}
