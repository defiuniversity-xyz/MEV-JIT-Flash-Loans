import SectionWrapper from '../layout/SectionWrapper';
import SandwichAttackSim from '../interactive/SandwichAttackSim';
import CrossChainGapViz from '../interactive/CrossChainGapViz';
import { Target } from 'lucide-react';

export default function RealWorldStrategies() {
  return (
    <SectionWrapper id="strategies">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-amber/10 text-defi-amber text-xs font-medium mb-4">
          <Target className="w-3.5 h-3.5" /> Strategies
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Real-World Strategies
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          From predatory sandwich attacks to the challenge of cross-chain execution —
          understand the strategies that shape DeFi markets.
        </p>
      </div>

      {/* Sandwich Attack */}
      <div className="mb-16">
        <h3 className="text-xl font-bold text-white mb-2">The Sandwich Attack</h3>
        <p className="text-sm text-defi-muted mb-6">
          A searcher spots your pending buy order in the mempool, buys before you (front-run),
          lets your trade push the price higher, then sells (back-run). Step through to see
          exactly how it works.
        </p>
        <SandwichAttackSim />
      </div>

      {/* Cross-Chain */}
      <div>
        <h3 className="text-xl font-bold text-white mb-2">The Cross-Chain Atomicity Gap</h3>
        <p className="text-sm text-defi-muted mb-6">
          Flash loans require everything in one block. Cross-chain bridges take minutes.
          See why standard flash loans can&apos;t cross chains — and how Intent-based systems solve it.
        </p>
        <CrossChainGapViz />
      </div>
    </SectionWrapper>
  );
}
