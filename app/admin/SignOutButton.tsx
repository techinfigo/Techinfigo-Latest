'use client';

import { useRouter } from 'next/navigation';

/**
 * `className` is appended, not substituted: the sidebar passes w-full to fill
 * its zone, and the button keeps its own type and colour either way.
 */
export function SignOutButton({ className = '' }: { className?: string }) {
  const router = useRouter();

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      className={`px-4 py-2 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white hover:border-white/30 transition-colors ${className}`}
    >
      Sign out
    </button>
  );
}
