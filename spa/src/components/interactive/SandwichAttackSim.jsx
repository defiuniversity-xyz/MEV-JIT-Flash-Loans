import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';

const steps = [
  {
    title: 'Mempool: Pending Transaction',
    description: 'A user submits a large buy order for ETH. The transaction sits in the public mempool, visible to all searchers.',
    price: 3000,
    mempoolTxs: [
      { label: 'Victim: Buy 100 ETH', type: 'victim', status: 'pending' },
    ],
    profit: 0,
  },
  {
    title: 'Front-Run: Searcher Buys First',
    description: 'The searcher\'s bot detects the pending order. It flash borrows capital and buys ETH before the victim, pushing the price up.',
    price: 3015,
    mempoolTxs: [
      { label: 'Attacker: Buy 200 ETH', type: 'attacker', status: 'confirmed' },
      { label: 'Victim: Buy 100 ETH', type: 'victim', status: 'pending' },
    ],
    profit: 0,
  },
  {
    title: 'Victim Trade: Worse Execution',
    description: 'The victim\'s trade executes at the now-higher price ($3,015 instead of $3,000). They receive less ETH than expected — $1,500 in slippage.',
    price: 3030,
    mempoolTxs: [
      { label: 'Attacker: Buy 200 ETH ✓', type: 'attacker', status: 'confirmed' },
      { label: 'Victim: Buy 100 ETH ✓ ($3,015!)', type: 'victim', status: 'confirmed' },
    ],
    profit: 0,
  },
  {
    title: 'Back-Run: Searcher Sells',
    description: 'Immediately after, the searcher sells their ETH at the elevated price, capturing the price impact as profit. Flash loan is repaid.',
    price: 3005,
    mempoolTxs: [
      { label: 'Attacker: Buy 200 ETH ✓', type: 'attacker', status: 'confirmed' },
      { label: 'Victim: Buy 100 ETH ✓', type: 'victim', status: 'confirmed' },
      { label: 'Attacker: Sell 200 ETH ✓', type: 'attacker', status: 'confirmed' },
    ],
    profit: 3000,
  },
];

export default function SandwichAttackSim() {
  const [currentStep, setCurrentStep] = useState(0);
  useKeyboardNav(currentStep, setCurrentStep, steps.length - 1);
  const step = steps[currentStep];

  const priceRange = { min: 2990, max: 3040 };
  const pricePct = ((step.price - priceRange.min) / (priceRange.max - priceRange.min)) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-1">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentStep ? 'w-8 bg-defi-amber' : i < currentStep ? 'w-4 bg-defi-amber/50' : 'w-4 bg-defi-border'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
          <p className="text-sm text-defi-muted mb-5">{step.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price indicator */}
            <div className="bg-defi-navy rounded-xl p-4">
              <div className="text-xs text-defi-muted mb-2">ETH Spot Price</div>
              <div className="relative h-6 bg-defi-border/30 rounded-full mb-2">
                <motion.div
                  className="absolute top-0 h-6 rounded-full bg-gradient-to-r from-defi-blue to-defi-amber"
                  animate={{ width: `${pricePct}%` }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="absolute top-0 h-6 w-6 rounded-full bg-white border-2 border-defi-amber flex items-center justify-center"
                  animate={{ left: `calc(${pricePct}% - 12px)` }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-[8px] font-bold text-defi-navy">$</span>
                </motion.div>
              </div>
              <div className="flex justify-between text-xs text-defi-muted">
                <span>${priceRange.min}</span>
                <motion.span
                  key={step.price}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-white font-mono font-bold"
                >
                  ${step.price}
                </motion.span>
                <span>${priceRange.max}</span>
              </div>
            </div>

            {/* Mempool view */}
            <div className="bg-defi-navy rounded-xl p-4">
              <div className="text-xs text-defi-muted mb-2">Block Transaction Order</div>
              <div className="space-y-2">
                {step.mempoolTxs.map((tx, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
                      tx.type === 'attacker'
                        ? 'bg-defi-red/10 text-defi-red border border-defi-red/20'
                        : tx.status === 'confirmed'
                          ? 'bg-defi-amber/10 text-defi-amber border border-defi-amber/20'
                          : 'bg-defi-blue/10 text-defi-blue border border-defi-blue/20'
                    }`}
                  >
                    <span className="font-mono">#{i + 1}</span>
                    <span>{tx.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {currentStep === steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-lg bg-defi-red/10 border border-defi-red/20"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-semibold text-defi-red">Victim&apos;s Loss (Extra Slippage)</span>
                  <p className="text-xs text-defi-muted mt-1">Paid $3,015/ETH instead of $3,000</p>
                </div>
                <span className="text-lg font-bold text-defi-red font-mono">−$1,500</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-defi-red/20">
                <span className="text-sm font-semibold text-defi-amber">Searcher Profit</span>
                <span className="text-lg font-bold text-defi-amber font-mono">+$3,000</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-30 text-defi-muted hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-30 text-defi-muted hover:text-white transition-colors"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
