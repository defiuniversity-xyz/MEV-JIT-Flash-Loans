import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';

const steps = [
  {
    title: '1. Flash Borrow',
    description: 'Attacker borrows $200M USDC via flash loan from Aave.',
    tokenPrice: 10,
    poolBalance: 200000000,
    attackerBalance: 200000000,
    protocolHealth: 'Healthy',
    protocolColor: '#10b981',
    chartLabel: 'Token X: $10 (True Price)',
  },
  {
    title: '2. Pump Token Price',
    description: 'Attacker dumps $200M into a thin Token X pool on the target DEX, causing massive slippage.',
    tokenPrice: 500,
    poolBalance: 0,
    attackerBalance: 400000,
    protocolHealth: 'Healthy (Unaware)',
    protocolColor: '#10b981',
    chartLabel: 'Token X: $500 (Manipulated!)',
  },
  {
    title: '3. Exploit Lending Protocol',
    description: 'Attacker deposits Token X as collateral. The protocol reads the manipulated DEX price oracle and values it at $500/token instead of $10.',
    tokenPrice: 500,
    poolBalance: 0,
    attackerBalance: 400000,
    protocolHealth: 'Reading Bad Oracle',
    protocolColor: '#f59e0b',
    chartLabel: 'Oracle reads: $500 ✗',
  },
  {
    title: '4. Borrow Real Assets',
    description: 'Protocol allows borrowing ETH, WBTC against the inflated collateral. Attacker extracts $50M in blue-chip assets.',
    tokenPrice: 500,
    poolBalance: 0,
    attackerBalance: 50000000,
    protocolHealth: 'Under Attack',
    protocolColor: '#f43f5e',
    chartLabel: 'Borrowed: $50M real assets',
  },
  {
    title: '5. Dump & Repay',
    description: 'Attacker sells Token X back (price crashes to ~$10), retrieves USDC, repays flash loan. Keeps $50M in stolen assets.',
    tokenPrice: 10,
    poolBalance: 200000000,
    attackerBalance: 50000000,
    protocolHealth: 'Drained — Bad Debt',
    protocolColor: '#f43f5e',
    chartLabel: 'Token X: $10 (Price restored)',
  },
];

export default function OracleManipulationSim() {
  const [currentStep, setCurrentStep] = useState(0);
  useKeyboardNav(currentStep, setCurrentStep, steps.length - 1);
  const step = steps[currentStep];

  const priceBarHeight = Math.min((step.tokenPrice / 500) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Step progress */}
      <div className="flex items-center justify-center gap-1">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentStep ? 'w-8 bg-defi-red' : i < currentStep ? 'w-4 bg-defi-red/50' : 'w-4 bg-defi-border'
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
        >
          <div className="glass rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-6">
              <AlertTriangle className="w-5 h-5 text-defi-red flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-white">{step.title}</h4>
                <p className="text-sm text-defi-muted mt-1">{step.description}</p>
              </div>
            </div>

            {/* Visual: Price bar + Protocol Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Price visualization */}
              <div className="bg-defi-navy rounded-xl p-4">
                <div className="text-xs text-defi-muted mb-3">Token X Spot Price (DEX Oracle)</div>
                <div className="flex items-end gap-3 h-32">
                  {/* True price bar */}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-full bg-defi-border/30 rounded-t-md relative" style={{ height: '100%' }}>
                      <motion.div
                        className="absolute bottom-0 w-full rounded-t-md"
                        style={{ backgroundColor: step.tokenPrice > 10 ? '#f43f5e' : '#10b981' }}
                        animate={{ height: `${priceBarHeight}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-xs font-mono text-white">${step.tokenPrice}</span>
                  </div>
                  {/* Reference */}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-full bg-defi-border/30 rounded-t-md relative" style={{ height: '100%' }}>
                      <div className="absolute bottom-0 w-full rounded-t-md bg-defi-blue/50" style={{ height: '2%' }} />
                    </div>
                    <span className="text-xs font-mono text-defi-muted">$10 (true)</span>
                  </div>
                </div>
                <p className="text-xs text-defi-muted mt-2 text-center">{step.chartLabel}</p>
              </div>

              {/* Protocol status */}
              <div className="bg-defi-navy rounded-xl p-4">
                <div className="text-xs text-defi-muted mb-3">Lending Protocol Status</div>
                <motion.div
                  className="rounded-lg p-3 border"
                  animate={{
                    borderColor: step.protocolColor + '40',
                    backgroundColor: step.protocolColor + '10',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      className="w-3 h-3 rounded-full"
                      animate={{ backgroundColor: step.protocolColor }}
                    />
                    <span className="text-sm font-medium text-white">{step.protocolHealth}</span>
                  </div>
                  {currentStep >= 4 && (
                    <p className="text-xs text-defi-red">
                      Protocol holds worthless Token X collateral. $50M in real assets stolen.
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
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
