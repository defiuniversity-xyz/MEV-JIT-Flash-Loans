import { motion, AnimatePresence } from 'framer-motion';
import { Check, BookOpen, RotateCcw, Clock, Trophy } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import { SECTIONS } from '../../data/constants';

const SECTION_META = {
  hero: { desc: 'Welcome & overview', icon: '🏠', mins: 1 },
  atomicity: { desc: 'EVM execution model — all or nothing', icon: '⚛️', mins: 3 },
  'flash-loan-mechanics': { desc: '5-step flash loan lifecycle', icon: '⚡', mins: 4 },
  'use-cases': { desc: 'Arbitrage, collateral swap, self-liquidation', icon: '💰', mins: 5 },
  attacks: { desc: 'Oracle manipulation & major exploits', icon: '🔴', mins: 5 },
  protocols: { desc: 'Aave, Uniswap, Balancer, dYdX, MakerDAO', icon: '🏛️', mins: 4 },
  mev: { desc: 'MEV supply chain & strategy taxonomy', icon: '👁️', mins: 4 },
  'amm-evolution': { desc: 'V2 uniform → V3 concentrated liquidity', icon: '📊', mins: 3 },
  jit: { desc: 'Just-In-Time liquidity mechanics', icon: '🎯', mins: 4 },
  'jit-paradox': { desc: 'Why more LPs can mean less liquidity', icon: '⚖️', mins: 3 },
  strategies: { desc: 'Sandwich attacks & cross-chain gap', icon: '🥪', mins: 4 },
  future: { desc: 'V4 Hooks, Intents, SUAVE/TEEs', icon: '🚀', mins: 3 },
  security: { desc: 'Reentrancy, TWAP, circuit breakers', icon: '🛡️', mins: 3 },
  quiz: { desc: '10-question knowledge check', icon: '🎓', mins: 5 },
};

const TOTAL_MINS = Object.values(SECTION_META).reduce((sum, m) => sum + m.mins, 0);

export default function CourseSyllabus({ visitedSections, onResetProgress }) {
  const completed = visitedSections.size;
  const total = SECTIONS.length;
  const pct = Math.round((completed / total) * 100);
  const allComplete = completed >= total;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SectionWrapper id="syllabus" label="Course Syllabus">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-blue/10 text-defi-blue text-xs font-medium mb-4">
          <BookOpen className="w-3.5 h-3.5" /> Syllabus
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Course Overview
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto mb-2">
          {total} interactive sections from fundamentals to advanced strategies.
          Click any section to jump directly to it. Your progress is saved automatically.
        </p>
        <p className="text-xs text-defi-muted inline-flex items-center gap-1.5">
          <Clock className="w-3 h-3" /> Estimated total: ~{TOTAL_MINS} minutes
        </p>

        {/* Completion celebration */}
        <AnimatePresence>
          {allComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 glass rounded-xl p-5 max-w-md mx-auto border border-defi-amber/30"
            >
              <Trophy className="w-8 h-8 text-defi-amber mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">Course Complete!</div>
              <p className="text-xs text-defi-muted mt-1">
                You&apos;ve explored all {total} sections. Take the quiz below to test your knowledge.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overall progress */}
        <div className="max-w-md mx-auto mt-6">
          <div className="flex justify-between text-xs text-defi-muted mb-2">
            <span>{completed} of {total} sections explored</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 bg-defi-dark rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${allComplete ? 'bg-defi-amber' : 'bg-gradient-to-r from-defi-blue to-defi-green'}`}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {completed > 1 && (
            <button
              onClick={onResetProgress}
              className="mt-3 text-[10px] text-defi-muted hover:text-defi-red transition-colors inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset progress
            </button>
          )}
        </div>
      </div>

      {/* Section grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
        {SECTIONS.map((section, i) => {
          const meta = SECTION_META[section.id] || { desc: '', icon: '📄', mins: 2 };
          const visited = visitedSections.has(section.id);

          return (
            <motion.button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-start gap-3 p-3.5 rounded-xl text-left transition-all border ${
                visited
                  ? 'border-defi-green/20 bg-defi-green/5 hover:border-defi-green/40'
                  : 'border-defi-border hover:border-defi-blue/30 hover:bg-white/[0.02]'
              }`}
            >
              <span className="text-lg flex-shrink-0 mt-0.5">{meta.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-defi-muted font-mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-medium text-white truncate">{section.label}</span>
                  {visited && <Check className="w-3.5 h-3.5 text-defi-green flex-shrink-0" />}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-defi-muted truncate">{meta.desc}</p>
                  <span className="text-[10px] text-defi-muted/60 flex-shrink-0">~{meta.mins}m</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
