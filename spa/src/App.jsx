import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import AtomicitySection from './components/sections/AtomicitySection';
import FlashLoanMechanics from './components/sections/FlashLoanMechanics';
import FlashLoanUseCases from './components/sections/FlashLoanUseCases';
import FlashLoanAttacks from './components/sections/FlashLoanAttacks';
import ProtocolLandscape from './components/sections/ProtocolLandscape';
import MEVFundamentals from './components/sections/MEVFundamentals';
import AMMEvolution from './components/sections/AMMEvolution';
import JITDeepDive from './components/sections/JITDeepDive';
import JITParadox from './components/sections/JITParadox';
import RealWorldStrategies from './components/sections/RealWorldStrategies';
import FutureOutlook from './components/sections/FutureOutlook';
import SecurityPractices from './components/sections/SecurityPractices';

export default function App() {
  return (
    <div className="min-h-screen bg-defi-navy text-defi-text overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AtomicitySection />
        <FlashLoanMechanics />
        <FlashLoanUseCases />
        <FlashLoanAttacks />
        <ProtocolLandscape />
        <MEVFundamentals />
        <AMMEvolution />
        <JITDeepDive />
        <JITParadox />
        <RealWorldStrategies />
        <FutureOutlook />
        <SecurityPractices />
      </main>
      <Footer />
    </div>
  );
}
