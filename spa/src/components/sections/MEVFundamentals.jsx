import { motion } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import MEVSupplyChainFlow from '../interactive/MEVSupplyChainFlow';
import Tooltip from '../layout/Tooltip';
import KeyTakeaways from '../layout/KeyTakeaways';
import { mevStrategies } from '../../data/mevJitContent';
import { Eye } from 'lucide-react';

export default function MEVFundamentals() {
  return (
    <SectionWrapper id="mev">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-amber/10 text-defi-amber text-xs font-medium mb-4">
          <Eye className="w-3.5 h-3.5" /> Market Microstructure
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Maximal Extractable Value (MEV)
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          MEV is the profit extracted from block production by including, excluding, or
          reordering transactions. It&apos;s powered by the transparency of the blockchain{' '}
          <Tooltip term="Mempool" definition="The memory pool — a waiting area where unconfirmed transactions sit before being included in a block. Visible to all network participants, making it a hunting ground for MEV searchers.">mempool</Tooltip>{' '}
          where pending transactions are visible to all.
        </p>
      </div>

      {/* Supply Chain Flow */}
      <div className="mb-14">
        <h3 className="text-lg font-semibold text-white mb-2 text-center">The MEV Supply Chain</h3>
        <p className="text-sm text-defi-muted mb-6 text-center">
          A specialized pipeline from user transaction to block inclusion
        </p>
        <MEVSupplyChainFlow />
      </div>

      {/* Strategy taxonomy */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-6 text-center">Strategy Taxonomy</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mevStrategies.map((strat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold">{strat.name}</h4>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: strat.impactColor + '20', color: strat.impactColor }}
                >
                  {strat.impact}
                </span>
              </div>
              <p className="text-sm text-defi-muted mb-2">{strat.mechanism}</p>
              <div className="text-xs text-defi-muted">
                <span className="font-medium text-white">Target:</span> {strat.target}
              </div>
              <p className="text-xs text-defi-muted mt-1.5 italic">{strat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <KeyTakeaways items={[
        'MEV is extracted by reordering, including, or excluding transactions within a block — it\'s a tax on blockchain transparency.',
        'The supply chain is industrialized: Users → Searchers → Builders → Relayers → Validators, each specializing in their role.',
        'Not all MEV is harmful: arbitrage enforces price efficiency, while sandwich attacks are purely predatory.',
        'Flashbots and PBS (Proposer-Builder Separation) formalized MEV extraction to reduce network congestion.',
      ]} />
    </SectionWrapper>
  );
}
