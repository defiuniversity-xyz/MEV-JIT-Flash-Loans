import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tooltip({ term, definition, children }) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span className="border-b border-dotted border-defi-muted cursor-help">
        {children || term}
      </span>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-lg bg-defi-dark border border-defi-border shadow-xl z-50 pointer-events-none"
          >
            <div className="text-xs font-semibold text-defi-blue mb-1">{term}</div>
            <div className="text-xs text-defi-muted leading-relaxed">{definition}</div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-defi-dark border-r border-b border-defi-border rotate-45 -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
