import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { protocols } from '../../data/protocolData';

export default function ProtocolCompareCards() {
  const [expanded, setExpanded] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleCompare = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < 2) {
      setSelected([...selected, id]);
    }
  };

  const compareProtos = protocols.filter((p) => selected.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Compare toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => { setCompareMode(!compareMode); setSelected([]); setExpanded(null); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            compareMode
              ? 'bg-defi-blue/20 text-defi-blue border border-defi-blue/40'
              : 'bg-defi-dark text-defi-muted border border-defi-border hover:text-white'
          }`}
        >
          {compareMode ? 'Exit Compare Mode' : 'Compare Protocols'}
        </button>
      </div>

      {compareMode && selected.length < 2 && (
        <p className="text-center text-sm text-defi-muted">
          Select {2 - selected.length} protocol{selected.length === 0 ? 's' : ''} to compare
        </p>
      )}

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {protocols.map((proto) => {
          const isExpanded = expanded === proto.id;
          const isSelected = selected.includes(proto.id);

          return (
            <motion.div
              key={proto.id}
              layout
              className={`glass rounded-xl overflow-hidden transition-all cursor-pointer ${
                isSelected ? 'ring-2' : ''
              }`}
              style={isSelected ? { ringColor: proto.color } : {}}
              onClick={() => {
                if (compareMode) {
                  toggleCompare(proto.id);
                } else {
                  setExpanded(isExpanded ? null : proto.id);
                }
              }}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-bold">{proto.name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
                      style={{ backgroundColor: proto.color + '20', color: proto.color }}>
                      {proto.mechanism}
                    </span>
                  </div>
                  {compareMode ? (
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      isSelected ? 'border-defi-blue bg-defi-blue' : 'border-defi-border'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  ) : (
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                      <ChevronDown className="w-4 h-4 text-defi-muted" />
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-defi-muted">Fee</span>
                    <span className="text-white font-mono">{proto.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-defi-muted">Liquidity</span>
                    <span className="text-white text-right text-xs">{proto.liquiditySource}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-defi-muted">Use Case</span>
                    <span className="text-white text-right text-xs">{proto.primaryUse}</span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && !compareMode && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-defi-border/50 pt-4">
                      <p className="text-sm text-defi-muted mb-3">{proto.description}</p>
                      <ul className="space-y-1.5">
                        {proto.keyFeatures.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-defi-muted">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: proto.color }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Side-by-side comparison */}
      <AnimatePresence>
        {compareMode && selected.length === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 divide-x divide-defi-border">
              {compareProtos.map((proto) => (
                <div key={proto.id} className="p-5">
                  <h4 className="text-white font-bold mb-1">{proto.name}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full inline-block mb-4"
                    style={{ backgroundColor: proto.color + '20', color: proto.color }}>
                    {proto.mechanism}
                  </span>
                  <div className="space-y-3 text-sm">
                    {[
                      ['Fee', proto.fee],
                      ['Liquidity', proto.liquiditySource],
                      ['Use Case', proto.primaryUse],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div className="text-xs text-defi-muted">{label}</div>
                        <div className="text-white font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-defi-muted mt-4 border-t border-defi-border pt-3">
                    {proto.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
