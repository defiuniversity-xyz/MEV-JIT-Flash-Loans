import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { attackCaseStudies } from '../../data/attackCaseStudies';

export default function AttackTimeline() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-defi-border" />

      <div className="space-y-8">
        {attackCaseStudies.map((attack, i) => {
          const isLeft = i % 2 === 0;
          const isExpanded = expanded === attack.id;

          return (
            <div key={attack.id} className={`relative flex items-start ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
              {/* Dot */}
              <div
                className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10 border-2 border-defi-navy"
                style={{ backgroundColor: attack.color }}
              />

              {/* Content */}
              <div className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${isLeft ? 'sm:pr-8' : 'sm:pl-8'}`}>
                <motion.button
                  onClick={() => setExpanded(isExpanded ? null : attack.id)}
                  className="glass rounded-xl p-4 w-full text-left hover:border-defi-blue/30 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-medium text-defi-muted">{attack.date}</span>
                      <h4 className="text-white font-semibold mt-1">{attack.name}</h4>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: attack.color + '20', color: attack.color }}
                        >
                          {attack.type}
                        </span>
                        <span className="text-sm font-bold" style={{ color: attack.color }}>
                          {attack.lossAmount}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      className="text-defi-muted flex-shrink-0 mt-1"
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="glass rounded-xl p-4 mt-2 border-l-2" style={{ borderLeftColor: attack.color }}>
                        <p className="text-sm text-defi-muted mb-4">{attack.description}</p>
                        <div className="space-y-2">
                          {attack.steps.map((step, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <span
                                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: attack.color + '20', color: attack.color }}
                              >
                                {j + 1}
                              </span>
                              <span className="text-sm text-defi-muted">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
