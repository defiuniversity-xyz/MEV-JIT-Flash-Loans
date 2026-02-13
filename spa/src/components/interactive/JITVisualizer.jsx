import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { jitSteps } from '../../data/mevJitContent';

export default function JITVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = jitSteps[currentStep];

  const PieChart = ({ passive, jit }) => {
    const total = passive + jit;
    const passivePct = total > 0 ? (passive / total) * 100 : 100;
    const jitPct = total > 0 ? (jit / total) * 100 : 0;
    // SVG pie using stroke-dasharray
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const passiveLen = (passivePct / 100) * circumference;
    const jitLen = (jitPct / 100) * circumference;

    return (
      <div className="flex flex-col items-center gap-3">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Background */}
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#334155" strokeWidth="10" />
          {/* Passive LP */}
          <motion.circle
            cx="60" cy="60" r={radius} fill="none"
            stroke="#3b82f6"
            strokeWidth="10"
            strokeDasharray={`${passiveLen} ${circumference}`}
            strokeDashoffset={0}
            transform="rotate(-90 60 60)"
            animate={{ strokeDasharray: `${passiveLen} ${circumference}` }}
            transition={{ duration: 0.5 }}
          />
          {/* JIT LP */}
          <motion.circle
            cx="60" cy="60" r={radius} fill="none"
            stroke="#f59e0b"
            strokeWidth="10"
            strokeDasharray={`${jitLen} ${circumference}`}
            strokeDashoffset={-passiveLen}
            transform="rotate(-90 60 60)"
            animate={{
              strokeDasharray: `${jitLen} ${circumference}`,
              strokeDashoffset: -passiveLen,
            }}
            transition={{ duration: 0.5 }}
          />
          {/* Center text */}
          <text x="60" y="56" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            {passivePct.toFixed(0)}%
          </text>
          <text x="60" y="72" textAnchor="middle" fill="#94a3b8" fontSize="9">
            Passive LP
          </text>
        </svg>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-defi-blue" />
            <span className="text-defi-muted">Passive LP: {passive}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-defi-amber" />
            <span className="text-defi-muted">JIT Bot: {jit}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-3">
        {jitSteps.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              i === currentStep
                ? 'bg-defi-amber/15 text-defi-amber border-defi-amber/40'
                : 'text-defi-muted border-defi-border hover:text-white'
            }`}
          >
            Tx {i + 1}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
          <p className="text-defi-muted mb-6">{step.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Pie chart */}
            <div className="flex justify-center">
              <PieChart passive={step.passiveLPShare} jit={step.jitLPShare} />
            </div>

            {/* Detail + Block visualization */}
            <div className="space-y-4">
              <div className="bg-defi-navy/50 rounded-xl p-4 border border-defi-border/50">
                <div className="text-xs text-defi-muted mb-2">Block Contents</div>
                <div className="space-y-2">
                  {jitSteps.map((s, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-all ${
                        i <= currentStep
                          ? i === currentStep
                            ? 'bg-defi-amber/15 text-defi-amber border border-defi-amber/30'
                            : 'bg-defi-green/10 text-defi-green'
                          : 'bg-defi-dark text-defi-muted'
                      }`}
                    >
                      <span className="font-mono font-bold">Tx{i + 1}</span>
                      <span>{['Mint Liquidity', 'Swap Executes', 'Burn Liquidity'][i]}</span>
                      {i < currentStep && <span className="ml-auto">✓</span>}
                      {i === currentStep && (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="ml-auto"
                        >
                          ●
                        </motion.span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-defi-muted">{step.detail}</p>
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
          onClick={() => setCurrentStep(Math.min(jitSteps.length - 1, currentStep + 1))}
          disabled={currentStep === jitSteps.length - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-30 text-defi-muted hover:text-white transition-colors"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
