import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Code, ArrowRight, Workflow, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { flashLoanLifecycle } from '../../data/flashLoanContent';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';

const ICONS = { Play, ArrowRight, Code, Workflow, CheckCircle };

const EntityBadge = ({ label, state }) => {
  const colors = {
    idle: 'bg-defi-dark text-defi-muted border-defi-border',
    active: 'bg-defi-blue/20 text-defi-blue border-defi-blue/40',
    sending: 'bg-defi-amber/20 text-defi-amber border-defi-amber/40',
    receiving: 'bg-defi-green/20 text-defi-green border-defi-green/40',
    executing: 'bg-defi-purple/20 text-defi-purple border-defi-purple/40',
    waiting: 'bg-defi-dark text-defi-muted border-defi-border opacity-60',
    repaying: 'bg-defi-green/20 text-defi-green border-defi-green/40',
    verifying: 'bg-defi-cyan/20 text-defi-cyan border-defi-cyan/40',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-300 ${colors[state] || colors.idle}`}>
      {label}: {state}
    </span>
  );
};

export default function FlashLoanStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  useKeyboardNav(currentStep, setCurrentStep, flashLoanLifecycle.length - 1);
  const step = flashLoanLifecycle[currentStep];
  const Icon = ICONS[step.icon] || Play;

  return (
    <div className="space-y-6">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2">
        {flashLoanLifecycle.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              i === currentStep
                ? 'bg-defi-blue/20 text-defi-blue border border-defi-blue/40'
                : i < currentStep
                  ? 'bg-defi-green/10 text-defi-green border border-defi-green/30'
                  : 'bg-defi-dark text-defi-muted border border-defi-border'
            }`}
          >
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border border-current">
              {i < currentStep ? '✓' : i + 1}
            </span>
            <span className="hidden sm:inline">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-2xl p-6 sm:p-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-defi-blue/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-defi-blue" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Step {step.step}: {step.title}
              </h3>
              <p className="text-defi-muted leading-relaxed">{step.description}</p>
            </div>
          </div>

          {/* Entity states */}
          <div className="flex flex-wrap gap-2 mb-5">
            <EntityBadge label="Borrower" state={step.entities.user} />
            <EntityBadge label="Lending Pool" state={step.entities.pool} />
            <EntityBadge label="DEXs" state={step.entities.dex} />
          </div>

          {/* Funds indicator */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs text-defi-muted">Funds location:</span>
            <motion.span
              key={step.fundsLocation}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                step.fundsLocation === 'pool'
                  ? 'bg-defi-cyan/20 text-defi-cyan'
                  : step.fundsLocation === 'user'
                    ? 'bg-defi-green/20 text-defi-green'
                    : 'bg-defi-amber/20 text-defi-amber'
              }`}
            >
              {step.fundsLocation === 'pool' ? '🏦 Lending Pool' : step.fundsLocation === 'user' ? '🤖 Borrower Contract' : '🔄 DEX Protocols'}
            </motion.span>
          </div>

          {/* Detail */}
          <div className="bg-defi-navy/50 rounded-xl p-4 border border-defi-border/50">
            <p className="text-sm text-defi-muted leading-relaxed">{step.detail}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          aria-label="Previous step"
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed text-defi-muted hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <span className="text-xs text-defi-muted" aria-live="polite">
          Step {currentStep + 1} of {flashLoanLifecycle.length}
        </span>
        <button
          onClick={() => setCurrentStep(Math.min(flashLoanLifecycle.length - 1, currentStep + 1))}
          disabled={currentStep === flashLoanLifecycle.length - 1}
          aria-label="Next step"
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed text-defi-muted hover:text-white transition-colors"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
