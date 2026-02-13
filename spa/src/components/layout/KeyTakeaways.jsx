import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export default function KeyTakeaways({ items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-10 glass rounded-2xl p-6 border border-defi-blue/20"
    >
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-defi-blue" />
        <h4 className="text-white font-semibold text-sm">Key Takeaways</h4>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-defi-muted">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-defi-blue flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
