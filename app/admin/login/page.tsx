import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  // Only same-origin relative paths are accepted, so a crafted ?next= cannot
  // turn the login page into an open redirect.
  const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : '/admin';

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2">
          <div className="w-10 h-[2px] bg-brandYellow" />
          <h1 className="text-3xl font-black uppercase tracking-tighter">Admin</h1>
          <p className="text-white/40 text-sm font-medium">Lead pipeline. Authorised access only.</p>
        </div>
        <LoginForm next={safeNext} />
      </div>
    </main>
  );
}
