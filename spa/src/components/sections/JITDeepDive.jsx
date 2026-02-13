import SectionWrapper from '../layout/SectionWrapper';
import JITVisualizer from '../interactive/JITVisualizer';
import Tooltip from '../layout/Tooltip';
import { jitMetrics } from '../../data/mevJitContent';
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

      {/* Key Metrics */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-white mb-5 text-center">Empirical Data</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {jitMetrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-4 text-center"
            >
              <div className="text-xl font-bold text-defi-amber font-mono mb-1">{metric.value}</div>
              <div className="text-xs text-white font-medium mb-1">{metric.label}</div>
              <div className="text-[10px] text-defi-muted">{metric.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
