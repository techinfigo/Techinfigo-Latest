'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_SECTIONS, isSectionActive } from './nav-sections';

/**
 * The section list — the sidebar's whole reason for being a client component.
 *
 * The active section is derived from usePathname, and nothing else in the shell
 * needs the browser, so this is kept as thin as it can be: the mark, the
 * sign-out zone, the "View site" link and the layout around them all stay on
 * the server. Matching lives in nav-sections.ts so this file holds markup only.
 */
export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin sections" className="flex-1 overflow-y-auto py-4 pr-3 space-y-1">
      {ADMIN_SECTIONS.map((section) => {
        const active = isSectionActive(pathname, section);
        return (
          <Link
            key={section.href}
            href={section.href}
            // Never colour-only: aria-current gives assistive tech the same
            // signal the yellow rail gives everyone else.
            aria-current={active ? 'page' : undefined}
            className={`flex items-center rounded-r-lg border-l-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
              active
                ? 'border-brandYellow bg-white/[0.06] text-brandYellow'
                : 'border-transparent text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
