export const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'atomicity', label: 'Atomicity' },
  { id: 'flash-loan-mechanics', label: 'Flash Loans' },
  { id: 'use-cases', label: 'Use Cases' },
  { id: 'attacks', label: 'Attacks' },
  { id: 'protocols', label: 'Protocols' },
  { id: 'mev', label: 'MEV' },
  { id: 'amm-evolution', label: 'AMMs' },
  { id: 'jit', label: 'JIT Liquidity' },
  { id: 'jit-paradox', label: 'JIT Paradox' },
  { id: 'strategies', label: 'Strategies' },
  { id: 'future', label: 'Future' },
  { id: 'security', label: 'Security' },
  { id: 'quiz', label: 'Quiz' },
];

export const COLORS = {
  blue: '#3b82f6',
  cyan: '#06b6d4',
  green: '#10b981',
  red: '#f43f5e',
  amber: '#f59e0b',
  purple: '#8b5cf6',
  navy: '#0f172a',
  dark: '#1e293b',
  border: '#334155',
  text: '#e2e8f0',
  muted: '#94a3b8',
};

export const ANIMATION_VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
};
