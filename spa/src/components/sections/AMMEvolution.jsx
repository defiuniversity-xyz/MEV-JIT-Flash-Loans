import SectionWrapper from '../layout/SectionWrapper';
import LiquidityCurveViz from '../interactive/LiquidityCurveViz';
import Tooltip from '../layout/Tooltip';
import { BarChart3 } from 'lucide-react';

export default function AMMEvolution() {
  return (
    <SectionWrapper id="amm-evolution">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-cyan/10 text-defi-cyan text-xs font-medium mb-4">
          <BarChart3 className="w-3.5 h-3.5" /> AMM Design
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          From Uniform to Concentrated Liquidity
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          Uniswap V2 spread liquidity uniformly across all prices — most capital sat idle.
          V3 introduced{' '}
          <Tooltip term="Ticks" definition="Discrete price points in Uniswap V3 defined by the formula p(i) = 1.0001^i. LPs concentrate capital within specific tick ranges instead of across all prices.">
            &quot;ticks&quot;
          </Tooltip>{' '}
          allowing LPs to concentrate capital in narrow ranges, dramatically
          improving efficiency but enabling JIT liquidity attacks.
        </p>
      </div>

      <LiquidityCurveViz />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="glass rounded-xl p-5 border-l-2 border-l-defi-blue">
          <h4 className="text-white font-semibold mb-2">V2: Simple & Robust</h4>
          <p className="text-sm text-defi-muted">
            Liquidity distributed across all prices (0 → ∞). Only a tiny fraction is &quot;active&quot;
            near the current price. Capital inefficient, but resilient — no management required.
            Democratized market making for passive LPs.
          </p>
        </div>
        <div className="glass rounded-xl p-5 border-l-2 border-l-defi-green">
          <h4 className="text-white font-semibold mb-2">V3: Efficient & Vulnerable</h4>
          <p className="text-sm text-defi-muted">
            LPs choose specific price ranges (&quot;ticks&quot;). Capital is up to 4000× more efficient.
            But concentrated liquidity is ephemeral — it can be injected for a single block
            and withdrawn immediately. This is the genesis of JIT liquidity.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
