import SectionWrapper from '../layout/SectionWrapper';
import ProtocolCompareCards from '../interactive/ProtocolCompareCards';
import { Layers } from 'lucide-react';

export default function ProtocolLandscape() {
  return (
    <SectionWrapper id="protocols">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-purple/10 text-defi-purple text-xs font-medium mb-4">
          <Layers className="w-3.5 h-3.5" /> Ecosystem
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          The Protocol Landscape
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          Five major protocols dominate flash loan provision. Each competes on fee
          structure, liquidity depth, and gas efficiency. Click to expand, or enter
          compare mode to evaluate side-by-side.
        </p>
      </div>

      <ProtocolCompareCards />
    </SectionWrapper>
  );
}
