import SectionWrapper from '../layout/SectionWrapper';
import OracleManipulationSim from '../interactive/OracleManipulationSim';
import AttackTimeline from '../interactive/AttackTimeline';
import Tooltip from '../layout/Tooltip';
import KeyTakeaways from '../layout/KeyTakeaways';
import { AlertTriangle } from 'lucide-react';

export default function FlashLoanAttacks() {
  return (
    <SectionWrapper id="attacks">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-red/10 text-defi-red text-xs font-medium mb-4">
          <AlertTriangle className="w-3.5 h-3.5" /> The Dark Side
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Flash Loan Attacks
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          By providing virtually unlimited capital to any actor, flash loans amplify the
          severity of any existing vulnerability. A bug that allows stealing $10K with
          personal capital becomes a $100M exploit with a flash loan.
        </p>
      </div>

      {/* Oracle Manipulation */}
      <div className="mb-16">
        <h3 className="text-xl font-bold text-white mb-2">
          <Tooltip term="Oracle" definition="A data feed that brings external information (like asset prices) on-chain. Flash loan attacks often target protocols using simple spot-price oracles instead of TWAP or Chainlink.">Oracle</Tooltip>{' '}
          Manipulation: The Primary Vector
        </h3>
        <p className="text-sm text-defi-muted mb-6">
          The vast majority of flash loan exploits target price oracles. Step through
          the attack to see how temporary price distortion drains lending protocols.
        </p>
        <OracleManipulationSim />
      </div>

      {/* Attack Timeline */}
      <div>
        <h3 className="text-xl font-bold text-white mb-2">
          Major Exploits Timeline
        </h3>
        <p className="text-sm text-defi-muted mb-8">
          From bZx&apos;s $350K wake-up call to Euler&apos;s $197M catastrophe.
          Click any event to see the full attack breakdown.
        </p>
        <AttackTimeline />
      </div>

      <KeyTakeaways items={[
        'Oracle manipulation is the #1 attack vector — protocols using spot prices from a single DEX are vulnerable to temporary price distortion.',
        'Flash loans amplify existing bugs: a $10K exploit becomes $100M+ when the attacker can borrow unlimited capital for free.',
        'Losses escalated from $350K (bZx 2020) to $197M (Euler 2023) as DeFi TVL grew and attack techniques matured.',
        'Emerging threats include cross-chain latency exploits and read-only reentrancy — attacks are evolving beyond simple oracle manipulation.',
      ]} />
    </SectionWrapper>
  );
}
