'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Starts the small CSS animations inside a drawing (see `.sv-*` in
 * globals.css) only while it is on screen, so off-screen cards cost nothing.
 *
 * The wrapper is `display: contents`, so it never changes the drawing's
 * layout; the observer watches the drawing itself.
 */
export function PlayInView({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const target = ref.current?.firstElementChild;
    if (!target || typeof IntersectionObserver === 'undefined') {
      setPlay(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setPlay(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="contents" data-play={play ? 'true' : 'false'}>
      {children}
    </div>
  );
}
