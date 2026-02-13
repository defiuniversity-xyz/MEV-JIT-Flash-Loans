import { motion } from 'framer-motion';
import { Check, BookOpen } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import { SECTIONS } from '../../data/constants';

const SECTION_META = {
  hero: { desc: 'Welcome & overview', icon: '🏠' },
  atomicity: { desc: 'EVM execution model — all or nothing', icon: '⚛️' },
  'flash-loan-mechanics': { desc: '5-step flash loan lifecycle', icon: '⚡' },
  'use-cases': { desc: 'Arbitrage, collateral swap, self-liquidation', icon: '💰' },
  attacks: { desc: 'Oracle manipulation & major exploits', icon: '🔴' },
  protocols: { desc: 'Aave, Uniswap, Balancer, dYdX, MakerDAO', icon: '🏛️' },
  mev: { desc: 'MEV supply chain & strategy taxonomy', icon: '👁️' },
  'amm-evolution': { desc: 'V2 uniform → V3 concentrated liquidity', icon: '📊' },
  jit: { desc: 'Just-In-Time liquidity mechanics', icon: '🎯' },
  'jit-paradox': { desc: 'Why more LPs can mean less liquidity', icon: '⚖️' },
  strategies: { desc: 'Sandwich attacks & cross-chain gap', icon: '🥪' },
  future: { desc: 'V4 Hooks, Intents, SUAVE/TEEs', icon: '🚀' },
  security: { desc: 'Reentrancy, TWAP, circuit breakers', icon: '🛡️' },
  quiz: { desc: '10-question knowledge check', icon: '🎓' },
};

export default function CourseSyllabus({ visitedSections }) {
  const completed = visitedSections.size;
  const total = SECTIONS.length;
  const pct = Math.round((completed / total) * 100);

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
        <p className="text-defi-muted max-w-2xl mx-auto mb-6">
          14 interactive sections from fundamentals to advanced strategies.
          Click any section to jump directly to it. Your progress is saved automatically.
        </p>

        {/* Overall progress */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-xs text-defi-muted mb-2">
            <span>{completed} of {total} sections explored</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 bg-defi-dark rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-defi-blue to-defi-green rounded-full"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Section grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
        {SECTIONS.map((section, i) => {
          const meta = SECTION_META[section.id] || { desc: '', icon: '📄' };
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
                <p className="text-xs text-defi-muted mt-0.5 line-clamp-1">{meta.desc}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
