import { useState, useCallback } from 'react';

const STORAGE_KEY = 'defi-academy-progress';

function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set(['hero']);
  } catch {
    return new Set(['hero']);
  }
}

function saveProgress(visited) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visited]));
  } catch {
    // localStorage not available
  }
}

/**
 * Shared progress tracking hook with localStorage persistence.
 * Returns [visitedSections, markVisited, resetProgress]
 */
export function useProgress() {
  const [visited, setVisited] = useState(() => loadProgress());

  const markVisited = useCallback((sectionId) => {
    setVisited((prev) => {
      if (prev.has(sectionId)) return prev;
      const next = new Set([...prev, sectionId]);
      saveProgress(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = new Set(['hero']);
    setVisited(fresh);
    saveProgress(fresh);
  }, []);

  return [visited, markVisited, resetProgress];
}
