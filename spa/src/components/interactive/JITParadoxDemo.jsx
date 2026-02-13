import { useState } from 'react';
import { motion } from 'framer-motion';
import { jitParadoxData } from '../../data/mevJitContent';

function MetricBar({ label, value, max, color, suffix = '%' }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-defi-muted">{label}</span>
        <span className="text-white font-mono">{value}{suffix}</span>
      </div>
      <div className="h-2 bg-defi-navy rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

export default function JITParadoxDemo() {
  const [jitActive, setJitActive] = useState(true);
  const data = jitActive ? jitParadoxData.withJIT : jitParadoxData.withoutJIT;

  return (
    <div className="space-y-6">
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={`text-sm font-medium ${!jitActive ? 'text-defi-blue' : 'text-defi-muted'}`}>
          JIT Inactive
        </span>
        <button
          onClick={() => setJitActive(!jitActive)}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            jitActive ? 'bg-defi-amber' : 'bg-defi-border'
          }`}
        >
          <motion.div
            className="absolute top-1 w-5 h-5 rounded-full bg-white"
            animate={{ left: jitActive ? '30px' : '4px' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
        <span className={`text-sm font-medium ${jitActive ? 'text-defi-amber' : 'text-defi-muted'}`}>
          JIT Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trader Impact */}
        <div className={`glass rounded-xl p-6 border transition-colors ${jitActive ? 'border-defi-green/30' : 'border-defi-border'}`}>
          <h4 className="text-white font-semibold mb-4">Trader Experience</h4>
          <div className="space-y-4">
            <MetricBar
              label="Large Trade Slippage"
              value={data.largeTradeSlippage}
              max={0.5}
              color={data.largeTradeSlippage < 0.15 ? '#10b981' : '#f59e0b'}
            />
            <MetricBar
              label="Small Trade Slippage"
              value={data.smallTradeSlippage}
              max={0.5}
              color={data.smallTradeSlippage > 0.3 ? '#f43f5e' : '#10b981'}
            />
            <div className="pt-2 border-t border-defi-border">
              <p className="text-xs text-defi-muted">
                <span className="font-medium text-white">Price Improvement:</span>{' '}
                {data.traderBenefit}
              </p>
            </div>
          </div>
        </div>

        {/* LP Impact */}
        <div className={`glass rounded-xl p-6 border transition-colors ${jitActive ? 'border-defi-red/30' : 'border-defi-border'}`}>
          <h4 className="text-white font-semibold mb-4">LP Revenue Distribution</h4>
          <div className="space-y-4">
            <MetricBar
              label="Passive LP Revenue"
              value={data.passiveLPRevenue}
              max={100}
              color={data.passiveLPRevenue < 50 ? '#f43f5e' : '#3b82f6'}
            />
            <MetricBar
              label="JIT Bot Revenue"
              value={data.jitLPRevenue}
              max={100}
              color="#f59e0b"
            />
            <div className="pt-2 border-t border-defi-border">
              <p className="text-xs text-defi-muted">
                <span className="font-medium text-white">LP Impact:</span>{' '}
                {data.lpImpact}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pool depth description */}
      <motion.div
        key={jitActive ? 'active' : 'inactive'}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass rounded-xl p-5 border ${jitActive ? 'border-defi-amber/30' : 'border-defi-blue/30'}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${jitActive ? 'bg-defi-amber' : 'bg-defi-blue'}`} />
          <h4 className="text-sm font-semibold text-white">Pool Depth</h4>
        </div>
        <p className="text-sm text-defi-muted">{data.poolDepth}</p>
        {jitActive && (
          <p className="text-xs text-defi-red mt-2">
            ⚠ The Paradox: Excellent execution for whales, but passive LPs withdraw →
            pool becomes &quot;hollow&quot; → retail traders face worse slippage than if JIT never existed.
          </p>
        )}
      </motion.div>
    </div>
  );
}
