import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Search, Hammer, Radio, ShieldCheck, ArrowRight } from 'lucide-react';
import { mevSupplyChain } from '../../data/mevJitContent';

const ICONS = { User, Search, Hammer, Radio, ShieldCheck };

export default function MEVSupplyChainFlow() {
  const [activeNode, setActiveNode] = useState(null);
  const [animatingPacket, setAnimatingPacket] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatingPacket((prev) => (prev + 1) % mevSupplyChain.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Flow diagram */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2">
        {mevSupplyChain.map((node, i) => {
          const Icon = ICONS[node.icon] || User;
          const isActive = activeNode === node.id;
          const isAnimating = animatingPacket === i;

          return (
            <div key={node.id} className="flex items-center gap-2 sm:gap-2">
              <motion.button
                onClick={() => setActiveNode(isActive ? null : node.id)}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all min-w-[100px] ${
                  isActive
                    ? 'border-opacity-60 bg-opacity-20'
                    : 'border-defi-border bg-defi-dark hover:border-opacity-40'
                }`}
                style={isActive ? { borderColor: node.color, backgroundColor: node.color + '15' } : {}}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAnimating && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ border: `2px solid ${node.color}` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1 }}
                  />
                )}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: node.color + '20' }}
                >
                  <Icon className="w-5 h-5" style={{ color: node.color }} />
                </div>
                <span className="text-xs font-medium text-white">{node.label}</span>
              </motion.button>

              {i < mevSupplyChain.length - 1 && (
                <div className="hidden sm:flex items-center">
                  <motion.div
                    animate={{
                      opacity: animatingPacket === i ? [0.3, 1, 0.3] : 0.3,
                      x: animatingPacket === i ? [0, 4, 0] : 0,
                    }}
                    transition={{ duration: 1, repeat: animatingPacket === i ? Infinity : 0 }}
                  >
                    <ArrowRight className="w-4 h-4 text-defi-muted" />
                  </motion.div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {activeNode && (() => {
        const node = mevSupplyChain.find((n) => n.id === activeNode);
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-5 border-l-2"
            style={{ borderLeftColor: node.color }}
          >
            <h4 className="text-white font-semibold mb-1">{node.label}</h4>
            <p className="text-sm text-defi-muted mb-2">{node.description}</p>
            <p className="text-xs text-defi-muted">{node.detail}</p>
          </motion.div>
        );
      })()}

      {!activeNode && (
        <p className="text-center text-xs text-defi-muted">
          Click any node to learn about its role in the MEV supply chain
        </p>
      )}
    </div>
  );
}
