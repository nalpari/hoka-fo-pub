import { useState } from 'react';

const storageKey = 'hoka-recent-searches';

const readRecentSearches = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]');
    return Array.isArray(stored)
      ? stored.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
};

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState(readRecentSearches);

  const persistRecentSearches = (next: string[]) => {
    setRecentSearches(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const addRecentSearch = (query: string) => {
    persistRecentSearches([query, ...recentSearches.filter((item) => item !== query)].slice(0, 10));
  };

  const removeRecentSearch = (query: string) => {
    persistRecentSearches(recentSearches.filter((item) => item !== query));
  };

  const clearRecentSearches = () => persistRecentSearches([]);

  return { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches };
}
