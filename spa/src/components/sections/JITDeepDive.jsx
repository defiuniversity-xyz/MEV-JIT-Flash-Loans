import SectionWrapper from '../layout/SectionWrapper';
import JITVisualizer from '../interactive/JITVisualizer';
import Tooltip from '../layout/Tooltip';
import KeyTakeaways from '../layout/KeyTakeaways';
import AnimatedCounter from '../layout/AnimatedCounter';
// jitMetrics data is now inlined in the animated counters below
import { motion } from 'framer-motion';
import { Crosshair } from 'lucide-react';

export default function JITDeepDive() {
  return (
    <SectionWrapper id="jit">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-amber/10 text-defi-amber text-xs font-medium mb-4">
          <Crosshair className="w-3.5 h-3.5" /> Advanced MEV
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Just-In-Time Liquidity
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          JIT is a high-frequency market-making operation compressed into a single block.
          A{' '}
          <Tooltip term="Searcher" definition="An algorithmic trader who scans the mempool for MEV opportunities like arbitrage, sandwich attacks, and JIT liquidity. They submit transaction 'bundles' to block builders.">searcher</Tooltip>{' '}
          mints liquidity before a swap, captures the fees, and burns it after —
          all within ~12 seconds.
        </p>
      </div>

      <JITVisualizer />

      {/* Key Metrics with animated counters */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-white mb-5 text-center">Empirical Data</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { end: 269, suffix: '×', label: 'Avg. Liquidity Multiplier', desc: 'swap volume required' },
            { end: 0.007, suffix: '%', label: 'Avg. ROI per Attack', desc: 'razor-thin margins', decimals: 3 },
            { end: 85, suffix: '%', prefix: '~', label: 'Fee Dilution', desc: 'passive LP loss per JIT block' },
            { end: 92, suffix: '%', label: 'Dominant Bot Share', desc: 'single address (0xa57…6CF)' },
            { end: 1, suffix: '%', prefix: '<', label: 'Total V3 Liquidity', desc: 'niche sniper strategy' },
            { end: 0.139, suffix: '%', label: 'Avg. Price Improvement', desc: '13.9 bps for targeted traders', decimals: 3 },
          ].map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-4 text-center"
            >
              <AnimatedCounter
                end={metric.end}
                prefix={metric.prefix}
                suffix={metric.suffix}
                decimals={metric.decimals || 0}
                duration={1500}
                className="text-xl font-bold text-defi-amber font-mono"
              />
              <div className="text-xs text-white font-medium mt-1 mb-1">{metric.label}</div>
              <div className="text-[10px] text-defi-muted">{metric.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <KeyTakeaways items={[
        'JIT is a "whale\'s game" — requires 269× the swap volume in liquidity and razor-thin 0.007% ROI per transaction.',
        'A single bot address captured 92% of all JIT profit, showing extreme centralization of this strategy.',
        'Passive LPs lose ~85% of fee revenue on blocks where JIT occurs — but traders get 0.139% better execution.',
        'JIT accounts for less than 1% of total V3 liquidity but has disproportionate impact on high-volume pools.',
      ]} />
    </SectionWrapper>
  );
}
