import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brandBg text-brandDark">
      <h1 className="text-6xl font-black mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link 
        href="/"
        className="px-8 py-4 bg-brandYellow text-brandDark font-black rounded-xl hover:bg-brandDark hover:text-white transition-all"
      >
        Go Home
      </Link>
    </div>
  );
}
