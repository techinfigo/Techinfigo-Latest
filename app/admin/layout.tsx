import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
  // Belt and braces alongside middleware: the panel must never be indexed.
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // min-h-screen deliberately: globals.css sets `body { min-height: 100vh }`
  // and this has to match that unit exactly. Measuring the wrapper in dvh
  // instead leaves it shorter than the body whenever browser chrome is
  // showing, and the body is cream — that difference is the white strip.
  //
  // This element is also the admin's ground: it is in normal flow and contains
  // everything, so its background covers the full scroll height whatever the
  // content does.
  return <div className="min-h-screen bg-brandDark text-white">{children}</div>;
}
