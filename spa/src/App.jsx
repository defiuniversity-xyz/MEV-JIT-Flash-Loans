import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import AtomicitySection from './components/sections/AtomicitySection';
import FlashLoanMechanics from './components/sections/FlashLoanMechanics';

// Lazy load heavier sections that are below the fold
const FlashLoanUseCases = lazy(() => import('./components/sections/FlashLoanUseCases'));
const FlashLoanAttacks = lazy(() => import('./components/sections/FlashLoanAttacks'));
const ProtocolLandscape = lazy(() => import('./components/sections/ProtocolLandscape'));
const MEVFundamentals = lazy(() => import('./components/sections/MEVFundamentals'));
const AMMEvolution = lazy(() => import('./components/sections/AMMEvolution'));
const JITDeepDive = lazy(() => import('./components/sections/JITDeepDive'));
const JITParadox = lazy(() => import('./components/sections/JITParadox'));
const RealWorldStrategies = lazy(() => import('./components/sections/RealWorldStrategies'));
const FutureOutlook = lazy(() => import('./components/sections/FutureOutlook'));
const SecurityPractices = lazy(() => import('./components/sections/SecurityPractices'));

function SectionFallback() {
  return (
    <div className="py-28 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-defi-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-defi-navy text-defi-text overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AtomicitySection />
        <FlashLoanMechanics />
        <Suspense fallback={<SectionFallback />}>
          <FlashLoanUseCases />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FlashLoanAttacks />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProtocolLandscape />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <MEVFundamentals />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AMMEvolution />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <JITDeepDive />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <JITParadox />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <RealWorldStrategies />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FutureOutlook />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SecurityPractices />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
