import { motion } from 'framer-motion';
import { Zap, ChevronDown, BookOpen, Shield, TrendingUp } from 'lucide-react';
import AnimatedCounter from '../layout/AnimatedCounter';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-defi-navy via-defi-navy to-defi-dark" />
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59,130,246,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16,185,129,0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="w-10 h-10 text-defi-blue" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">DeFi Mechanics</span>
            <br />
            <span className="text-white">Decoded</span>
          </h1>

          <p className="text-lg sm:text-xl text-defi-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            Master Flash Loans, MEV, and JIT Liquidity through interactive simulations.
            From atomic arbitrage to oracle manipulation — learn the real strategies
            powering $2 trillion in DeFi volume.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16"
        >
          {[
            { icon: Zap, label: 'Flash Loans', desc: 'Atomic uncollateralized borrowing', color: 'text-defi-blue' },
            { icon: TrendingUp, label: 'MEV & JIT', desc: 'Market microstructure & extraction', color: 'text-defi-amber' },
            { icon: Shield, label: 'Security', desc: 'Attacks, defenses & best practices', color: 'text-defi-red' },
          ].map((item, i) => (
            <div key={i} className="glass rounded-xl p-5 text-left">
              <item.icon className={`w-6 h-6 ${item.color} mb-3`} />
              <h3 className="text-white font-semibold mb-1">{item.label}</h3>
              <p className="text-sm text-defi-muted">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12"
        >
          {[
            { end: 2, prefix: '$', suffix: 'T+', label: 'Flash Loan Volume (2024)', decimals: 0 },
            { end: 13, suffix: '', label: 'Interactive Sections', decimals: 0 },
            { end: 12, suffix: '+', label: 'Hands-On Simulations', decimals: 0 },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter
                end={stat.end}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                duration={1800}
                className="text-2xl sm:text-3xl font-bold text-white font-mono"
              />
              <div className="text-[10px] sm:text-xs text-defi-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-defi-muted uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-defi-muted" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
