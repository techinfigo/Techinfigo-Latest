'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * The sidebar, below the lg breakpoint where a fixed 220px column cannot stay.
 *
 * Collapsed to a trigger that opens a slide-over holding the same nav — not
 * hidden, because a panel you cannot navigate on a phone is worse than a
 * cramped one. `children` is the server-rendered <AdminSidebar />, so this
 * component contributes the modal behaviour and nothing else.
 */

/** Enough for this drawer: it holds links and buttons, nothing custom-tabbable. */
const FOCUSABLE = 'a[href], button:not([disabled])';

export function MobileNav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const pathname = usePathname();

  // Navigating closes the drawer — it is a menu, not a second window.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    // Recomputed per keystroke rather than captured once: what is focusable
    // depends on what is rendered, and the nav re-renders on navigation.
    // getClientRects() rather than offsetParent, which is null inside a fixed
    // ancestor and would empty the list.
    const focusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.getClientRects().length > 0,
      );

    focusable()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      // Focus escaping the panel entirely — a click on the backdrop, say — is
      // treated as "at the edge" so the next Tab lands back inside.
      const outside = !panel.contains(active);

      if (event.shiftKey && (outside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (outside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    }

    // On document, not the panel: Escape has to work even if focus has drifted.
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Focus goes back where it came from on close, however the drawer was closed.
  // Guarded on wasOpen so the first render does not steal focus.
  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        aria-expanded={open}
        aria-controls="admin-drawer"
        className="-mr-2 rounded-lg p-2 text-white/60 transition-colors hover:text-white"
      >
        {/* Built from the same 2px rule the panel uses elsewhere rather than an
            icon dependency — three bars, nothing new imported. */}
        <span className="flex w-5 flex-col gap-[5px]" aria-hidden>
          <span className="h-[2px] w-full bg-current" />
          <span className="h-[2px] w-full bg-current" />
          <span className="h-[2px] w-full bg-current" />
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            ref={panelRef}
            id="admin-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation"
            className="absolute inset-y-0 left-0 w-[220px] max-w-[80%] border-r border-white/20 bg-brandDark"
            // Delegated because `children` is server-rendered markup and a
            // callback cannot cross that boundary. It also covers the case the
            // pathname effect cannot: tapping the section you are already on,
            // which navigates nowhere and would leave the drawer sitting open.
            onClick={(event) => {
              if ((event.target as HTMLElement).closest('a')) setOpen(false);
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
              className="absolute right-0 top-0 z-10 flex h-16 w-12 items-center justify-center text-white/55 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                <path
                  d="M3 3 L13 13 M13 3 L3 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
