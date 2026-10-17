'use client';

import React from 'react';
import { useSiteSettings } from './SiteSettingsProvider';
import { photoUrl, type PhotoSlotId } from '../lib/settings-schema';

/**
 * Real photos uploaded in admin → Website photos. Every spot renders nothing
 * until a photo is uploaded, so pages look exactly as before without one.
 */
export function usePhoto(slot: PhotoSlotId): { src: string; width: number; height: number } | null {
  const { photos } = useSiteSettings();
  const meta = photos?.[slot];
  return meta ? { src: photoUrl(slot, meta), width: meta.width, height: meta.height } : null;
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
