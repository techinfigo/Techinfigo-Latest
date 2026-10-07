'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, X } from 'lucide-react';
import { isShortsUrl, youtubeId, type ClientVideo } from '../lib/settings-schema';

/**
 * "Hear it from our clients": YouTube videos chosen in the admin panel
 * (Settings → Client videos). Only thumbnails load with the page; YouTube's
 * player loads when someone clicks, inside a pop-up, so the page stays fast.
 * Up to three videos sit side by side; four or more slide in an endless row
 * like the Google reviews.
 */

type Item = { id: string; title: string; vertical: boolean };

function VideoCard({ v, onOpen, sliding }: { v: Item; onOpen: () => void; sliding: boolean }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Play video${v.title ? `: ${v.title}` : ''}`}
      className={`group text-left shrink-0 ${sliding ? 'w-[300px] sm:w-[380px]' : 'w-full'} focus-visible:outline-2 focus-visible:outline-brandYellow rounded-[2rem]`}
    >
      <span className="relative block aspect-video rounded-[2rem] overflow-hidden bg-brandDark shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className={`absolute inset-0 w-full h-full ${v.vertical ? 'object-contain' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
        />
        <span className="absolute inset-0 bg-brandDark/20 group-hover:bg-brandDark/10 transition-colors" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-16 h-16 rounded-full bg-brandYellow text-brandDark flex items-center justify-center shadow-[0_0_40px_rgba(252,182,50,0.5)] transition-transform duration-300 group-hover:scale-110">
            <Play className="w-6 h-6 ml-1 fill-brandDark" aria-hidden="true" />
          </span>
        </span>
      </span>
      {v.title ? (
        <span className="block mt-4 px-2 text-sm font-bold text-brandDark leading-snug line-clamp-2">{v.title}</span>
      ) : null}
    </button>
  );
}

function VideoModal({ v, onClose }: { v: Item; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-brandDark/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={v.title || 'Client video'}
        className={`relative w-full ${v.vertical ? 'max-w-sm' : 'max-w-4xl'} animate-slide-up`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white hover:text-brandDark transition-colors"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
        <div className={`relative ${v.vertical ? 'aspect-[9/16] max-h-[80vh]' : 'aspect-video'} w-full rounded-2xl overflow-hidden bg-black shadow-2xl`}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={v.title || 'Client video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
        {v.title ? <p className="mt-4 text-center text-white font-bold">{v.title}</p> : null}
      </div>
    </div>,
    document.body,
  );
}

export function ClientVideos({ videos }: { videos: ClientVideo[] }) {
  const items: Item[] = videos
    .map((v) => {
      const id = youtubeId(v.url);
      return id ? { id, title: v.title, vertical: isShortsUrl(v.url) } : null;
    })
    .filter((v): v is Item => v !== null);

  const [open, setOpen] = useState<Item | null>(null);
  const close = useCallback(() => setOpen(null), []);

  if (items.length === 0) return null;
  const sliding = items.length >= 4;
  const repeats = Math.max(1, Math.ceil(6 / items.length));
  const set = Array.from({ length: repeats }, () => items).flat();

  return (
    <section className="py-24 px-6 lg:px-12 bg-brandBg overflow-hidden" aria-labelledby="client-videos-heading">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.4em]">Client Stories</span>
          <h2 id="client-videos-heading" className="text-4xl md:text-5xl font-black text-brandDark tracking-tighter uppercase leading-none">
            Hear It From <br />
            <span className="text-brandDark/30">Our Clients.</span>
          </h2>
        </div>

        {sliding ? (
          <div className={`reviews-marquee-viewport overflow-hidden -mx-6 lg:-mx-12 py-3 ${open ? 'is-paused' : ''}`}>
            <div
              className="reviews-marquee flex w-max"
              style={{ ['--marquee-duration' as string]: `${set.length * 8}s` } as React.CSSProperties}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-6 pr-6" aria-hidden={copy === 1 || undefined} inert={copy === 1 || undefined}>
                  {set.map((v, i) => (
                    <VideoCard key={`${copy}-${i}`} v={v} sliding onOpen={() => setOpen(v)} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={`grid grid-cols-1 gap-8 ${items.length === 2 ? 'md:grid-cols-2' : items.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-3xl'}`}>
            {items.map((v) => (
              <VideoCard key={v.id} v={v} sliding={false} onOpen={() => setOpen(v)} />
            ))}
          </div>
        )}
      </div>
      {open && <VideoModal v={open} onClose={close} />}
    </section>
  );
}
