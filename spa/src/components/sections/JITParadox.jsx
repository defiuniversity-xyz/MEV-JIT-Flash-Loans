import SectionWrapper from '../layout/SectionWrapper';
import JITParadoxDemo from '../interactive/JITParadoxDemo';
import { Scale } from 'lucide-react';

export default function JITParadox() {
  return (
    <SectionWrapper id="jit-paradox">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-red/10 text-defi-red text-xs font-medium mb-4">
          <Scale className="w-3.5 h-3.5" /> The Paradox
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          The JIT Paradox
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          More liquidity providers can mean <span className="text-white font-medium">less liquidity</span>.
          JIT bots cherry-pick the most profitable trades, starving passive LPs.
          Toggle JIT on and off to see the systemic impact.
        </p>
      </div>

      <JITParadoxDemo />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="glass rounded-xl p-5">
          <h4 className="text-defi-green font-semibold text-sm mb-2">Strategic Complements (Optimistic)</h4>
          <p className="text-sm text-defi-muted">
            If JIT improves prices enough to attract massive new volume, the spillover
            could benefit passive LPs. More total volume = more leftover fees. This requires
            volume to be <span className="text-white">highly elastic</span> to execution quality.
          </p>
        </div>
        <div className="glass rounded-xl p-5">
          <h4 className="text-defi-red font-semibold text-sm mb-2">Strategic Substitutes (The Paradox)</h4>
          <p className="text-sm text-defi-muted">
            If volume is inelastic, JIT simply cannibalizes existing revenue. Passive LPs
            can&apos;t cover impermanent loss from toxic flow → they withdraw → pool hollows out →
            <span className="text-white"> retail traders suffer worse execution</span>.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
