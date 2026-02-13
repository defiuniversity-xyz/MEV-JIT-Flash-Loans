import { motion } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import { Rocket, Code, Lock, Brain } from 'lucide-react';

const futures = [
  {
    icon: Code,
    title: 'Uniswap V4 Hooks',
    subtitle: 'LiquidityPenaltyHook',
    color: '#FF007A',
    description:
      'V4 introduces programmable "Hooks" — custom smart contracts that run at key lifecycle points (beforeSwap, afterAddLiquidity). The LiquidityPenaltyHook tracks block.number when liquidity is added and penalizes removal within N blocks.',
    mechanism:
      'If removeLiquidity is called within 1-5 blocks of addition, the hook confiscates earned fees or charges a withdrawal tax. This destroys JIT\'s risk-free nature by forcing searchers to hold inventory across multiple blocks — exposing them to real market risk.',
    impact: 'Transforms JIT bots from "fee snipers" into actual short-term market makers who must model inventory risk.',
  },
  {
    icon: Brain,
    title: 'Intent-Based Architectures',
    subtitle: 'CoW Swap & UniswapX',
    color: '#3b82f6',
    description:
      'Instead of submitting transactions to the public mempool (which triggers JIT and sandwiches), users sign "intents" — statements of desired outcomes. Specialized Solvers compete to fill these orders.',
    mechanism:
      'CoW Swap uses batch auctions and Coincidence of Wants (CoW) to match buyers with sellers peer-to-peer, never touching AMM liquidity. UniswapX uses Dutch auctions where Solvers bid for the right to fill orders.',
    impact: 'AMMs become reserves of last resort. Primary execution for large flow happens in Solver-mediated auctions, neutralizing JIT entirely.',
  },
  {
    icon: Lock,
    title: 'SUAVE & TEEs',
    subtitle: 'Privacy-Aware MEV',
    color: '#10b981',
    description:
      'Flashbots\' SUAVE (Single Unified Auction for Value Expression) uses Trusted Execution Environments (TEEs) to create encrypted, confidential transactions.',
    mechanism:
      'Users submit encrypted Confidential Compute Requests. Searchers bid to provide JIT in a blind auction without seeing trade details. Users can set conditions: "I authorize JIT IF it improves my price by >0.1%."',
    impact: 'Transforms JIT from an adversarial attack into a negotiated service. The user explicitly invites JIT for better execution — privacy prevents sandwiching.',
  },
];

export default function FutureOutlook() {
  return (
    <SectionWrapper id="future">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-green/10 text-defi-green text-xs font-medium mb-4">
          <Rocket className="w-3.5 h-3.5" /> Evolution
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          The Future of DeFi
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          The industry is moving toward a bifurcated market: &quot;toxic&quot; MEV mitigated through
          privacy and protocol penalties, &quot;benign&quot; JIT formalized into a competitive market
          for guaranteed execution quality.
        </p>
      </div>

      <div className="space-y-6">
        {futures.map((future, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 sm:p-8 border-l-2"
            style={{ borderLeftColor: future.color }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: future.color + '20' }}
              >
                <future.icon className="w-6 h-6" style={{ color: future.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white">{future.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: future.color + '20', color: future.color }}>
                    {future.subtitle}
                  </span>
                </div>
                <p className="text-sm text-defi-muted mb-4">{future.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-defi-navy/50 rounded-xl p-4 border border-defi-border/50">
                    <h4 className="text-xs font-semibold text-white mb-1.5">Mechanism</h4>
                    <p className="text-xs text-defi-muted">{future.mechanism}</p>
                  </div>
                  <div className="bg-defi-navy/50 rounded-xl p-4 border border-defi-border/50">
                    <h4 className="text-xs font-semibold text-white mb-1.5">Impact</h4>
                    <p className="text-xs text-defi-muted">{future.impact}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
