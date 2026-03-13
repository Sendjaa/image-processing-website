'use client';

import { useState, useCallback } from 'react';

export interface HistoryState {
  data: string;
  timestamp: number;
}

const MAX_HISTORY = 50;

export function useHistory<T extends string>(initialState: T) {
  const [history, setHistory] = useState<HistoryState[]>([
    { data: initialState, timestamp: Date.now() },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const push = useCallback((data: T) => {
    setHistory((prev) => {
      const lastIndex = prev.length - 1;
      // Remove any future states if we're not at the end
      const newHistory = prev.slice(0, lastIndex + 1);

      // Add new state
      newHistory.push({ data, timestamp: Date.now() });

      // Limit history size
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }

      return newHistory;
    });

    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex > MAX_HISTORY - 1 ? MAX_HISTORY - 1 : newIndex;
    });
  }, []);

  const undo = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const redo = useCallback(() => {
    setCurrentIndex((prev) => (prev < history.length - 1 ? prev + 1 : history.length - 1));
  }, [history.length]);

  const reset = useCallback((newState: T) => {
    setHistory([{ data: newState, timestamp: Date.now() }]);
    setCurrentIndex(0);
  }, []);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;
  const current = history[currentIndex]?.data || initialState;

  return {
    history,
    currentIndex,
    push,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
    current,
  };
}
