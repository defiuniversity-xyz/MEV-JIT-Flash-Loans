import { useEffect } from 'react';

/**
 * Hook for keyboard arrow key navigation in stepper components.
 * @param {number} currentStep - Current step index
 * @param {function} setStep - Step setter function
 * @param {number} maxStep - Maximum step index (length - 1)
 * @param {boolean} active - Whether this stepper is currently in view
 */
export function useKeyboardNav(currentStep, setStep, maxStep, active = true) {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setStep((prev) => Math.min(maxStep, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setStep((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, setStep, maxStep, active]);
}
