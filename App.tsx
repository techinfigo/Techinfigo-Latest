
import React from 'react';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SystemSection } from './components/SystemSection';
import { ProofSection } from './components/ProofSection';

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-brandBg">
      <Hero />
      <ProblemSection />
      <SystemSection />
      <ProofSection />
    </main>
  );
};

export default App;
