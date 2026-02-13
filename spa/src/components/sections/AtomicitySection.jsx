import SectionWrapper from '../layout/SectionWrapper';
import AtomicityVisualizer from '../interactive/AtomicityVisualizer';
import Tooltip from '../layout/Tooltip';
import { Atom } from 'lucide-react';

export default function AtomicitySection() {
  return (
    <SectionWrapper id="atomicity">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-blue/10 text-defi-blue text-xs font-medium mb-4">
          <Atom className="w-3.5 h-3.5" /> Foundation
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          The Principle of Atomicity
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          Flash loans are only possible because of the{' '}
          <Tooltip term="EVM" definition="Ethereum Virtual Machine — the computation engine that executes smart contract code on Ethereum and compatible blockchains.">EVM</Tooltip>&apos;s
          atomic execution model.
          A transaction either <span className="text-white font-medium">fully succeeds</span> or{' '}
          <span className="text-white font-medium">fully reverts</span> — there is no intermediate state.
        </p>
      </div>

      <AtomicityVisualizer />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            title: 'All or Nothing',
            desc: 'Every opcode in the execution trace must succeed. If any step fails, the entire transaction is discarded.',
          },
          {
            title: 'Zero Default Risk',
            desc: 'The lender cannot lose funds. If repayment fails, the loan never existed on the ledger. Risk shifts from credit risk to smart contract risk.',
          },
          {
            title: 'Infinite Leverage',
            desc: 'Any address can borrow hundreds of millions without collateral or KYC. The only cost of failure is the gas fee (~$150).',
          },
        ].map((item, i) => (
          <div key={i} className="glass rounded-xl p-5">
            <h4 className="text-white font-semibold mb-2">{item.title}</h4>
            <p className="text-sm text-defi-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
