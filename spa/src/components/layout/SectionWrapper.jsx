import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { ANIMATION_VARIANTS } from '../../data/constants';

export default function SectionWrapper({ id, children, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section id={id} ref={ref} className={`relative py-20 sm:py-28 ${className}`}>
      <motion.div
        variants={ANIMATION_VARIANTS.fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}
