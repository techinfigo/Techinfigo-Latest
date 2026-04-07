'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AgraLandingPage } from './AgraLandingPage';

export const AgraLandingPageWrapper: React.FC = () => {
  const router = useRouter();

  const handleBookAudit = () => {
    router.push('/lead-capture');
  };

  return (
    <div>
      <AgraLandingPage 
        onNavigate={(page) => router.push(`/${page}`)} 
        onBookAudit={handleBookAudit}
      />
    </div>
  );
};
