import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import { solidityCode } from '../../data/flashLoanContent';
import { ShieldCheck, Check, Lock, Eye, Timer, Zap } from 'lucide-react';

const practices = [
  {
    icon: Lock,
    title: 'Reentrancy Guards',
    description:
      'Because the lender calls into the borrower\'s contract, execution flow is handed over. A malicious actor can try to re-enter the lender before the first call finishes.',
    defense: 'All flash loan functions must use nonReentrant modifiers (OpenZeppelin ReentrancyGuard).',
    critical: true,
  },
  {
    icon: ShieldCheck,
    title: 'Access Control on Callbacks',
    description:
      'If onFlashLoan() is public and unprotected, an attacker can call it with fake data. The contract might execute trades using its own funds, draining its balance.',
    defense: 'Verify msg.sender is the trusted lender AND initiator is address(this). See code example below.',
    critical: true,
  },
  {
    icon: Eye,
    title: 'TWAP Oracles (Not Spot Price)',
    description:
      'Spot price oracles are trivially manipulable with flash loan capital. A single massive buy can distort the price for one block.',
    defense: 'Use Time-Weighted Average Price (TWAP) or Chainlink feeds. To manipulate a TWAP, an attacker would need to sustain manipulation over many blocks — impossible with single-block flash loans.',
    critical: true,
  },
  {
    icon: Timer,
    title: 'Circuit Breakers',
    description:
      'Even with TWAP oracles, extreme market movements can create exploitable conditions.',
    defense: 'Automated checks that pause the contract if suspicious volatility is detected (e.g., if an asset drops >10% in a single block, pause all borrowing). Standard security practice in 2026.',
    critical: false,
  },
];

// Simple syntax highlighting for Solidity
function highlightSolidity(code) {
  const keywords = ['import', 'contract', 'function', 'external', 'override', 'returns', 'require', 'return', 'address', 'uint256', 'bytes', 'calldata', 'is'];
  const types = ['IERC3156FlashBorrower', 'IERC20', 'bytes32'];

  return code.split('\n').map((line, i) => {
    let highlighted = line
      .replace(/(\/\/.+)/g, '<span class="code-comment">$1</span>')
      .replace(/(".*?")/g, '<span class="code-string">$1</span>')
      .replace(/\b(keccak256)\b/g, '<span class="code-function">$1</span>');

    keywords.forEach((kw) => {
      highlighted = highlighted.replace(
        new RegExp(`\\b(${kw})\\b`, 'g'),
        '<span class="code-keyword">$1</span>'
      );
    });

    types.forEach((t) => {
      highlighted = highlighted.replace(
        new RegExp(`\\b(${t})\\b`, 'g'),
        '<span class="code-type">$1</span>'
      );
    });

    return (
      <div key={i} className="flex">
        <span className="text-defi-border w-8 text-right mr-4 select-none flex-shrink-0">
          {i + 1}
        </span>
        <span dangerouslySetInnerHTML={{ __html: highlighted }} />
      </div>
    );
  });
}

export default function SecurityPractices() {
  const [checked, setChecked] = useState({});

  const toggle = (idx) => setChecked({ ...checked, [idx]: !checked[idx] });

  return (
    <SectionWrapper id="security">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-defi-green/10 text-defi-green text-xs font-medium mb-4">
          <ShieldCheck className="w-3.5 h-3.5" /> Defense
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Security Best Practices
        </h2>
        <p className="text-defi-muted max-w-2xl mx-auto">
          Building flash-loan resistant protocols requires defense-in-depth.
          Check off each practice as you review it.
        </p>
      </div>

      {/* Checklist */}
      <div className="space-y-4 mb-10">
        {practices.map((practice, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`glass rounded-xl p-5 cursor-pointer transition-all ${
              checked[i] ? 'border border-defi-green/30' : ''
            }`}
            onClick={() => toggle(i)}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                checked[i] ? 'bg-defi-green border-defi-green' : 'border-defi-border'
              }`}>
                {checked[i] && <Check className="w-4 h-4 text-white" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <practice.icon className="w-4 h-4 text-defi-blue" />
                  <h4 className="text-white font-semibold text-sm">{practice.title}</h4>
                  {practice.critical && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-defi-red/20 text-defi-red font-medium">
                      CRITICAL
                    </span>
                  )}
                </div>
                <p className="text-sm text-defi-muted mb-2">{practice.description}</p>
                <p className="text-xs text-defi-green">
                  <span className="font-medium">Defense:</span> {practice.defense}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Code example */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">
          EIP-3156 Flash Loan Receiver (Solidity)
        </h3>
        <p className="text-sm text-defi-muted mb-4">
          The standard interface for a secure flash loan receiver contract. Note the access
          control checks on lines 9 and 12.
        </p>
        <div className="code-block text-sm leading-relaxed">
          {highlightSolidity(solidityCode)}
        </div>
      </div>
    </SectionWrapper>
  );
}
