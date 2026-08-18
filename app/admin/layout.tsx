import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
  // Belt and braces alongside middleware: the panel must never be indexed.
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-brandDark text-white">{children}</div>;
}
