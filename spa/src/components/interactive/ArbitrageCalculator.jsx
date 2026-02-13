import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check, X, TrendingUp, TrendingDown } from 'lucide-react';

function InputField({ label, value, onChange, prefix = '', suffix = '', min = 0 }) {
  return (
    <div>
      <label className="block text-xs text-defi-muted mb-1.5">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-defi-muted text-sm">{prefix}</span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          className={`w-full bg-defi-navy border border-defi-border rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-defi-blue transition-colors ${prefix ? 'pl-7' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-defi-muted text-xs">{suffix}</span>
        )}
      </div>
    </div>
  );
}

export default function ArbitrageCalculator() {
  const [borrowAmount, setBorrowAmount] = useState(2000000);
  const [priceA, setPriceA] = useState(3000);
  const [priceB, setPriceB] = useState(3020);
  const [flashFee, setFlashFee] = useState(0.05);
  const [gasCost, setGasCost] = useState(150);

  const results = useMemo(() => {
    const fee = borrowAmount * (flashFee / 100);
    const tokensReceived = borrowAmount / priceA;
    const grossProceeds = tokensReceived * priceB;
    const netProfit = grossProceeds - borrowAmount - fee - gasCost;
    const profitable = netProfit > 0;
    const spreadPct = ((priceB - priceA) / priceA) * 100;
    const roi = (netProfit / borrowAmount) * 100;

    return { fee, tokensReceived, grossProceeds, netProfit, profitable, spreadPct, roi };
  }, [borrowAmount, priceA, priceB, flashFee, gasCost]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Inputs */}
      <div className="glass rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="w-5 h-5 text-defi-blue" />
          <h4 className="text-white font-semibold">Parameters</h4>
        </div>

        <InputField
          label="Flash Loan Amount (USDC)"
          value={borrowAmount}
          onChange={setBorrowAmount}
          prefix="$"
        />
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Exchange A Price ($/ETH)"
            value={priceA}
            onChange={setPriceA}
            prefix="$"
            suffix="buy"
          />
          <InputField
            label="Exchange B Price ($/ETH)"
            value={priceB}
            onChange={setPriceB}
            prefix="$"
            suffix="sell"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Flash Loan Fee (%)"
            value={flashFee}
            onChange={setFlashFee}
            suffix="%"
          />
          <InputField
            label="Gas Cost (USD)"
            value={gasCost}
            onChange={setGasCost}
            prefix="$"
          />
        </div>

        <div className="text-xs text-defi-muted pt-2 border-t border-defi-border">
          Spread: <span className="text-white font-mono">{results.spreadPct.toFixed(3)}%</span>
          {' · '}
          Tokens: <span className="text-white font-mono">{results.tokensReceived.toFixed(4)} ETH</span>
        </div>
      </div>

      {/* Results */}
      <div className={`glass rounded-xl p-6 border ${results.profitable ? 'border-defi-green/30' : 'border-defi-red/30'} transition-colors`}>
        <div className="flex items-center gap-2 mb-4">
          {results.profitable ? (
            <TrendingUp className="w-5 h-5 text-defi-green" />
          ) : (
            <TrendingDown className="w-5 h-5 text-defi-red" />
          )}
          <h4 className="text-white font-semibold">Results</h4>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Gross Proceeds', value: results.grossProceeds, color: 'text-white' },
            { label: 'Repay Principal', value: -borrowAmount, color: 'text-defi-muted' },
            { label: `Flash Loan Fee (${flashFee}%)`, value: -results.fee, color: 'text-defi-muted' },
            { label: 'Gas Cost', value: -gasCost, color: 'text-defi-muted' },
          ].map((row, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-defi-muted">{row.label}</span>
              <span className={`font-mono ${row.color}`}>
                {row.value < 0 ? '−' : ''}${Math.abs(row.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          ))}

          <div className="border-t border-defi-border pt-3">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Net Profit</span>
              <motion.span
                key={results.netProfit.toFixed(2)}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className={`text-lg font-bold font-mono ${results.profitable ? 'text-defi-green' : 'text-defi-red'}`}
              >
                {results.netProfit < 0 ? '−' : '+'}${Math.abs(results.netProfit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.span>
            </div>
            {results.profitable && (
              <div className="text-xs text-defi-muted mt-1">
                ROI: <span className="text-defi-green font-mono">{results.roi.toFixed(4)}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Status banner */}
        <motion.div
          key={results.profitable ? 'profit' : 'revert'}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-sm font-medium ${
            results.profitable
              ? 'bg-defi-green/10 text-defi-green border border-defi-green/20'
              : 'bg-defi-red/10 text-defi-red border border-defi-red/20'
          }`}
        >
          {results.profitable ? (
            <>
              <Check className="w-4 h-4" />
              Transaction Succeeds — Profit captured atomically
            </>
          ) : (
            <>
              <X className="w-4 h-4" />
              Transaction Reverts — Only gas fee lost (~${gasCost})
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
