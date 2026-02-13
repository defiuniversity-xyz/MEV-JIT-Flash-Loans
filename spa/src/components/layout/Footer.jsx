import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-defi-border bg-defi-navy py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-defi-muted">
            <Zap className="w-4 h-4 text-defi-blue" />
            <span className="text-sm font-medium">DeFi Academy</span>
          </div>
          <p className="text-xs text-defi-muted text-center">
            Interactive learning platform built from research on Flash Loans, MEV, and JIT Liquidity.
            Content sourced from peer-reviewed DeFi research (2024–2026).
          </p>
        </div>
      </div>
    </footer>
  );
}
