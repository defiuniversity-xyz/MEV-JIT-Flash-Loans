import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, ArrowRight } from 'lucide-react';

export default function CrossChainGapViz() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="space-y-6">
      {/* Toggle */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowSolution(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
            !showSolution ? 'bg-defi-red/15 text-defi-red border-defi-red/40' : 'text-defi-muted border-defi-border'
          }`}
        >
          The Problem
        </button>
        <button
          onClick={() => setShowSolution(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
            showSolution ? 'bg-defi-green/15 text-defi-green border-defi-green/40' : 'text-defi-muted border-defi-border'
          }`}
        >
          The Solution
        </button>
      </div>

      <div className="glass rounded-2xl p-6">
        {!showSolution ? (
          <div>
            <h4 className="text-lg font-bold text-white mb-4">The Atomicity Gap</h4>
            <p className="text-sm text-defi-muted mb-6">
              Flash loans require atomicity — everything in one transaction block. Cross-chain
              bridging breaks this guarantee because chains are asynchronous state machines.
            </p>

            <div className="relative">
              {/* Ethereum timeline */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-24 text-right">
                  <span className="text-xs font-medium text-defi-blue">Ethereum</span>
                </div>
                <div className="flex-1 relative h-12">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-defi-blue/30" />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 rounded-full bg-defi-blue flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Zap className="w-2.5 h-2.5 text-white" />
                  </motion.div>
                  <div className="absolute top-0 left-0 text-[10px] text-defi-muted">Borrow</div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 w-4 h-4 rounded-full bg-defi-red flex items-center justify-center">
                    <span className="text-white text-[10px]">✗</span>
                  </div>
                  <div className="absolute top-0 right-0 text-[10px] text-defi-red">Repay?</div>
                </div>
              </div>

              {/* Bridge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-24" />
                <div className="flex-1 flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Clock className="w-5 h-5 text-defi-amber" />
                  </motion.div>
                  <span className="text-xs text-defi-amber font-medium">Bridge: 10–60 minutes</span>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                  >
                    <Clock className="w-5 h-5 text-defi-amber" />
                  </motion.div>
                </div>
              </div>

              {/* Solana timeline */}
              <div className="flex items-center gap-2">
                <div className="w-24 text-right">
                  <span className="text-xs font-medium text-defi-purple">Solana</span>
                </div>
                <div className="flex-1 relative h-12">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-defi-purple/30" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-4 h-4 rounded-full bg-defi-purple/40 flex items-center justify-center">
                    <span className="text-white text-[10px]">?</span>
                  </div>
                  <div className="absolute top-0 left-1/3 text-[10px] text-defi-muted">Trade (delayed)</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-lg bg-defi-red/10 border border-defi-red/20 text-sm text-defi-red">
              ✗ Standard flash loans CANNOT work cross-chain. The bridge delay breaks atomicity.
            </div>
          </div>
        ) : (
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Intent-Based Solutions</h4>
            <p className="text-sm text-defi-muted mb-6">
              Protocols like LayerZero V2 and CoW Swap use &quot;Solvers&quot; — entities with
              liquidity on both chains that fill orders instantly using their own funds.
            </p>

            <div className="space-y-4">
              {[
                { step: 1, label: 'User signs an intent', desc: '"I want to arbitrage ETH/USDC across chains"', color: '#3b82f6' },
                { step: 2, label: 'Solvers compete to fill', desc: 'Specialized entities with capital on both chains bid for the order', color: '#f59e0b' },
                { step: 3, label: 'Solver executes instantly', desc: 'Uses local funds on each chain — no bridge wait for the user', color: '#10b981' },
                { step: 4, label: 'Settlement happens later', desc: 'Solver settles the cross-chain bridge in the background', color: '#8b5cf6' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{ backgroundColor: s.color + '20', color: s.color }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{s.label}</div>
                    <div className="text-xs text-defi-muted">{s.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-3 rounded-lg bg-defi-green/10 border border-defi-green/20 text-sm text-defi-green">
              ✓ Simulates cross-chain atomicity without requiring impossible true cross-chain flash loans.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
