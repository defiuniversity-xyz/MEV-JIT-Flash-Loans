import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Repeat, Shield, RefreshCw } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import ArbitrageCalculator from '../interactive/ArbitrageCalculator';
import { useCases } from '../../data/flashLoanContent';

const ICONS = { TrendingUp, Repeat, Shield, RefreshCw };

export default function FlashLoanUseCases() {
  const [activeTab, setActiveTab] = useState('arbitrage');
  const activeCase = useCases.find((u) => u.id === activeTab);
  const Icon = ICONS[activeCase.icon] || TrendingUp;

  return (
    <SectionWrapper id="use-cases">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-green/10 text-defi-green text-xs font-medium mb-4">
          <TrendingUp className="w-3.5 h-3.5" /> Use Cases
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Constructive Applications
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          Flash loans serve as a capital efficiency multiplier, enabling the market
          to self-correct without requiring intermediaries to hoard idle capital.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {useCases.map((uc) => {
          const TabIcon = ICONS[uc.icon] || TrendingUp;
          return (
            <button
              key={uc.id}
              onClick={() => setActiveTab(uc.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === uc.id
                  ? 'text-white border'
                  : 'text-defi-muted border border-transparent hover:text-white hover:bg-white/5'
              }`}
              style={activeTab === uc.id ? { borderColor: uc.color + '66', backgroundColor: uc.color + '15' } : {}}
            >
              <TabIcon className="w-4 h-4" style={activeTab === uc.id ? { color: uc.color } : {}} />
              {uc.title}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass rounded-2xl p-6 sm:p-8 mb-6">
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: activeCase.color + '20' }}
              >
                <Icon className="w-6 h-6" style={{ color: activeCase.color }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{activeCase.title}</h3>
                <p className="text-sm text-defi-muted">{activeCase.subtitle}</p>
              </div>
            </div>
            <p className="text-defi-muted leading-relaxed mb-6">{activeCase.description}</p>

            {/* Example box */}
            <div className="bg-defi-navy/50 rounded-xl p-5 border border-defi-border/50">
              <h4 className="text-sm font-semibold text-white mb-3">{activeCase.example.title || 'Example'}</h4>
              <div className="space-y-2">
                {Object.entries(activeCase.example)
                  .filter(([k]) => k !== 'title')
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center text-sm">
                      <span className="text-defi-muted capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Show calculator only for arbitrage */}
          {activeTab === 'arbitrage' && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 text-center">
                💰 Interactive Arbitrage Calculator
              </h4>
              <ArbitrageCalculator />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
