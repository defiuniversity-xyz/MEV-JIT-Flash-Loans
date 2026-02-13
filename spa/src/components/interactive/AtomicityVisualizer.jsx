import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Check, X } from 'lucide-react';

const STATE_A = {
  poolBalance: '10,000 ETH',
  userBalance: '0 ETH',
  status: 'Pre-Transaction',
};

const STATE_B_SUCCESS = {
  poolBalance: '10,000.5 ETH',
  userBalance: '12,181 USDC profit',
  status: 'Transaction Confirmed',
};

const STATE_B_FAIL = {
  poolBalance: '10,000 ETH',
  userBalance: '0 ETH (−$150 gas)',
  status: 'Transaction Reverted',
};

export default function AtomicityVisualizer() {
  const [mode, setMode] = useState('idle'); // idle | running | success | reverted
  const [scenario, setScenario] = useState('success'); // success | fail

  const run = () => {
    setMode('running');
    setTimeout(() => {
      setMode(scenario === 'success' ? 'success' : 'reverted');
    }, 2000);
  };

  const reset = () => setMode('idle');

  const currentState =
    mode === 'success' ? STATE_B_SUCCESS : mode === 'reverted' ? STATE_B_FAIL : STATE_A;

  const borderColor =
    mode === 'success'
      ? 'border-defi-green'
      : mode === 'reverted'
        ? 'border-defi-red'
        : 'border-defi-border';

  return (
    <div className="space-y-6">
      {/* Scenario Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className="text-sm text-defi-muted">Scenario:</span>
        <button
          onClick={() => { setScenario('success'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            scenario === 'success'
              ? 'bg-defi-green/20 text-defi-green border border-defi-green/40'
              : 'bg-defi-dark text-defi-muted border border-defi-border hover:border-defi-green/40'
          }`}
        >
          Profitable Strategy
        </button>
        <button
          onClick={() => { setScenario('fail'); reset(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            scenario === 'fail'
              ? 'bg-defi-red/20 text-defi-red border border-defi-red/40'
              : 'bg-defi-dark text-defi-muted border border-defi-border hover:border-defi-red/40'
          }`}
        >
          Unprofitable Strategy
        </button>
      </div>

      {/* State Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* State A */}
        <div className={`glass rounded-xl p-5 border ${mode === 'idle' ? 'border-defi-blue' : 'border-defi-border'} transition-colors`}>
          <h4 className="text-xs uppercase tracking-wider text-defi-muted mb-3">State A (Before)</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-defi-muted">Pool:</span>
              <span className="text-white font-mono">{STATE_A.poolBalance}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-defi-muted">User:</span>
              <span className="text-white font-mono">{STATE_A.userBalance}</span>
            </div>
          </div>
        </div>

        {/* Arrow / Running indicator */}
        <div className="flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {mode === 'idle' && (
              <motion.button
                key="play"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={run}
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-defi-blue text-white font-medium text-sm hover:bg-defi-blue/80 transition-colors"
              >
                <Play className="w-4 h-4" /> Execute Transaction
              </motion.button>
            )}
            {mode === 'running' && (
              <motion.div
                key="running"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <motion.div
                  className="w-10 h-10 border-2 border-defi-blue border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
                <span className="text-xs text-defi-blue">Processing...</span>
              </motion.div>
            )}
            {(mode === 'success' || mode === 'reverted') && (
              <motion.button
                key="reset"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-defi-border text-defi-muted text-sm hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* State B */}
        <motion.div
          className={`glass rounded-xl p-5 border transition-colors ${borderColor}`}
          animate={
            mode === 'success'
              ? { boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }
              : mode === 'reverted'
                ? { boxShadow: '0 0 20px rgba(244, 63, 94, 0.2)' }
                : { boxShadow: '0 0 0px transparent' }
          }
        >
          <h4 className="text-xs uppercase tracking-wider text-defi-muted mb-3">
            {mode === 'reverted' ? 'State A (Reverted!)' : 'State B (After)'}
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-defi-muted">Pool:</span>
              <span className="text-white font-mono">{currentState.poolBalance}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-defi-muted">User:</span>
              <span className={`font-mono ${mode === 'success' ? 'text-defi-green' : mode === 'reverted' ? 'text-defi-red' : 'text-white'}`}>
                {currentState.userBalance}
              </span>
            </div>
          </div>
          {(mode === 'success' || mode === 'reverted') && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${mode === 'success' ? 'text-defi-green' : 'text-defi-red'}`}
            >
              {mode === 'success' ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
              {currentState.status}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {mode === 'reverted' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-xl p-4 border border-defi-red/30 mt-2">
              <p className="text-sm text-defi-muted">
                <span className="text-defi-red font-semibold">REVERT:</span>{' '}
                The EVM discards all pending state changes. The loan never happened on the immutable ledger.
                The borrower only loses the gas fee (~$150). The lending pool&apos;s funds never left in finalized state.
              </p>
            </div>
          </motion.div>
        )}
        {mode === 'success' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-xl p-4 border border-defi-green/30 mt-2">
              <p className="text-sm text-defi-muted">
                <span className="text-defi-green font-semibold">SUCCESS:</span>{' '}
                The pool received its principal + 0.05% fee. The borrower kept the arbitrage profit.
                Both parties benefit. The blockchain moves from State A to State B — permanently.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
