import { useState, useEffect, useRef } from 'react';
import { useInView } from '../../hooks/useInView';

/**
 * Animated counting number that triggers on scroll into view.
 * @param {number} end - Target number
 * @param {string} prefix - Text before number (e.g., "$")
 * @param {string} suffix - Text after number (e.g., "%", "×", "T")
 * @param {number} duration - Animation duration in ms
 * @param {number} decimals - Decimal places
 */
export default function AnimatedCounter({
  end,
  prefix = '',
  suffix = '',
  duration = 1500,
  decimals = 0,
  className = '',
}) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * end);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.round(count).toLocaleString('en-US');

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
