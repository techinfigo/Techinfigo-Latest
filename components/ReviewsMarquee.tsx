'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, X } from 'lucide-react';
import type { GoogleReview } from '../lib/google-reviews';
import { GOOGLE_REVIEWS_URL } from '../lib/google-reviews';
import { GoogleWordmark, Stars } from './ReviewBits';

/**
 * Endless sliding row of Google reviews. Clicking a review opens it in a
 * pop-up with the full text; the row pauses while the pop-up is open.
 */

function Avatar({ r, size }: { r: GoogleReview; size: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'w-12 h-12 text-base' : 'w-9 h-9 text-sm';
  return r.photo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={r.photo}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      className={`${cls} rounded-full object-cover bg-brandDark/10 shrink-0`}
    />
  ) : (
    <span className={`${cls} rounded-full bg-brandDark text-white font-bold flex items-center justify-center shrink-0`}>
      {r.author.charAt(0).toUpperCase()}
    </span>
  );
}

function ReviewCard({ r, onOpen, hidden }: { r: GoogleReview; onOpen: () => void; hidden?: boolean }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      tabIndex={hidden ? -1 : undefined}
      aria-label={`Read ${r.author}'s full review`}
      className="group text-left flex flex-col w-[300px] sm:w-[360px] shrink-0 bg-brandBg rounded-[2rem] p-7 border border-brandDark/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-brandYellow"
    >
      <span className="flex items-center justify-between gap-3 w-full">
        <Stars value={r.rating} />
        <span className="text-[11px] font-semibold text-brandDark/40">{r.when}</span>
      </span>
      <span className="mt-4 flex-1 text-sm text-brandDark/75 font-medium leading-relaxed line-clamp-[7]">“{r.text}”</span>
      <span className="mt-6 flex items-center gap-3 w-full">
        <Avatar r={r} size="sm" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-brandDark truncate">{r.author}</span>
          <span className="block text-[11px] text-brandDark/50">
            Review on <GoogleWordmark />
          </span>
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-brandDark/40 group-hover:text-brandDark transition-colors">
          Read
        </span>
      </span>
    </button>
  );
}

function ReviewModal({ r, onClose }: { r: GoogleReview; onClose: () => void }) {
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
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-brandDark/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-author"
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-[2rem] p-8 shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-brandBg flex items-center justify-center text-brandDark hover:bg-brandDark hover:text-white transition-colors"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-4 pr-10">
          <Avatar r={r} size="lg" />
          <div className="min-w-0">
            <p id="review-modal-author" className="font-bold text-brandDark truncate">
              {r.author}
            </p>
            <p className="text-xs text-brandDark/50">
              Review on <GoogleWordmark /> · {r.when}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Stars value={r.rating} size="w-5 h-5" />
        </div>
        <p className="mt-4 text-base text-brandDark/80 font-medium leading-relaxed whitespace-pre-line">“{r.text}”</p>

        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brandDark underline decoration-brandYellow decoration-2 underline-offset-4 hover:text-brandDark/70"
        >
          See all reviews on Google <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </div>,
    document.body,
  );
}

/**
 * One "set" is the reviews repeated until it is wider than any screen; the
 * track holds the set twice and is moved in JS, so it loops seamlessly AND
 * can be grabbed: drag (or swipe) left/right to go back or forward, let go and
 * it glides, then keeps sliding on its own. Hovering pauses it on desktop.
 * A drag never counts as a click, so it does not open the pop-up.
 */
export function ReviewsMarquee({ reviews }: { reviews: GoogleReview[] }) {
  const [open, setOpen] = useState<GoogleReview | null>(null);
  const [dragging, setDragging] = useState(false);
  const close = useCallback(() => setOpen(null), []);
  const repeats = Math.max(1, Math.ceil(8 / reviews.length));
  const set = Array.from({ length: repeats }, () => reviews).flat();
  /** Seconds for one full set to pass by on its own. */
  const loopSeconds = set.length * 7;

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    offset: 0,
    hovering: false,
    drag: null as null | { id: number; x: number; offset: number; lastX: number; lastT: number; moved: boolean },
    velocity: 0, // px per ms, from a released drag
    suppressClick: false,
  });
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const st = state.current;
      const width = setRef.current?.offsetWidth ?? 0;
      if (width > 0 && !st.drag) {
        if (Math.abs(st.velocity) > 0.02) {
          // Glide after a flick, slowing down.
          st.offset += st.velocity * dt;
          st.velocity *= Math.pow(0.94, dt / 16);
        } else if (!reduce && !st.hovering && !openRef.current) {
          st.offset += (width / (loopSeconds * 1000)) * dt;
        }
      }
      if (width > 0) {
        st.offset = ((st.offset % width) + width) % width;
        if (trackRef.current) trackRef.current.style.transform = `translate3d(${-st.offset}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loopSeconds]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const st = state.current;
    st.velocity = 0;
    st.drag = { id: e.pointerId, x: e.clientX, offset: st.offset, lastX: e.clientX, lastT: performance.now(), moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = state.current.drag;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      setDragging(true);
      viewportRef.current?.setPointerCapture(e.pointerId);
    }
    if (!d.moved) return;
    const now = performance.now();
    const v = -(e.clientX - d.lastX) / Math.max(now - d.lastT, 1);
    state.current.velocity = v;
    d.lastX = e.clientX;
    d.lastT = now;
    state.current.offset = d.offset - dx;
  };
  const endDrag = (e: React.PointerEvent) => {
    const st = state.current;
    const d = st.drag;
    if (!d || d.id !== e.pointerId) return;
    if (d.moved) {
      // Swallow only the click that this drag itself produces.
      st.suppressClick = true;
      window.setTimeout(() => { st.suppressClick = false; }, 60);
      // Keep a little of the flick speed for the glide.
      st.velocity = Math.max(-3, Math.min(3, st.velocity));
      if (performance.now() - d.lastT > 80) st.velocity = 0;
    } else {
      st.velocity = 0;
    }
    st.drag = null;
    setDragging(false);
    if (viewportRef.current?.hasPointerCapture(e.pointerId)) viewportRef.current.releasePointerCapture(e.pointerId);
  };

  return (
    <>
      <div
        ref={viewportRef}
        className={`reviews-drag-viewport overflow-hidden -mx-6 lg:-mx-12 py-3 select-none touch-pan-y ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') state.current.hovering = true; }}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse') state.current.hovering = false; }}
        onClickCapture={(e) => {
          if (state.current.suppressClick) {
            state.current.suppressClick = false;
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              ref={copy === 0 ? setRef : undefined}
              className="flex gap-6 pr-6 items-stretch"
              aria-hidden={copy === 1 || undefined}
            >
              {/* The second copy is only there for the seamless loop: hidden
                  from screen readers and the Tab key, but still clickable. */}
              {set.map((r, i) => (
                <ReviewCard key={`${copy}-${i}`} r={r} hidden={copy === 1} onOpen={() => setOpen(r)} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] font-semibold text-brandDark/40">Drag to see more reviews</p>
      {open && <ReviewModal r={open} onClose={close} />}
    </>
  );
}
