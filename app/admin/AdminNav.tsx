'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignOutButton } from './SignOutButton';

/**
 * The signed-in panel's header.
 *
 * Rendered by app/admin/(panel)/layout.tsx, not app/admin/layout.tsx: the outer
 * layout also wraps /admin/login, and a nav bar with a sign-out button has no
 * business on the page you land on when you are signed out. The (panel) group
 * is exactly the set of pages that are past the auth gate.
 */

const TABS = [
  { href: '/admin', label: 'Leads' },
  { href: '/admin/settings', label: 'Settings' },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <span className="w-6 h-[2px] bg-brandYellow" aria-hidden />
          <div className="flex items-center gap-1">
            {TABS.map((tab) => {
              // /admin is a prefix of every other tab, so it only counts as
              // active on an exact match; the rest match their whole subtree.
              const active =
                tab.href === '/admin' ? pathname === '/admin' : pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                    active ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
        <SignOutButton />
      </div>
    </nav>
  );
}
