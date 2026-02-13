import SectionWrapper from '../layout/SectionWrapper';
import FlashLoanStepper from '../interactive/FlashLoanStepper';
import { Zap } from 'lucide-react';

export default function FlashLoanMechanics() {
  return (
    <SectionWrapper id="flash-loan-mechanics">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-blue/10 text-defi-blue text-xs font-medium mb-4">
          <Zap className="w-3.5 h-3.5" /> Core Mechanics
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Flash Loan Lifecycle
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          A flash loan executes in 5 stages within a single transaction block.
          Step through each phase to see how funds flow between the lending pool,
          your contract, and DeFi protocols.
        </p>
      </div>

      <FlashLoanStepper />

      <div className="mt-10 glass rounded-xl p-5 border border-defi-amber/20">
        <h4 className="text-defi-amber font-semibold text-sm mb-2">💡 Key Insight</h4>
        <p className="text-sm text-defi-muted">
          The entire lifecycle — borrow, execute, repay — happens in a single transaction
          (one block, ~12 seconds on Ethereum). The lending pool is technically insolvent for
          microseconds during Step 2, but the EVM&apos;s atomicity guarantees funds are returned or the
          transaction never existed. This shifts risk from <span className="text-white">credit risk</span> to{' '}
          <span className="text-white">smart contract risk</span>.
        </p>
      </div>
    </SectionWrapper>
  );
}
