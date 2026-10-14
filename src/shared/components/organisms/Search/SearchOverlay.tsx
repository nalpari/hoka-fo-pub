'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchCollectionLinks } from './SearchCollectionLinks';
import { SearchDialog } from './SearchDialog';
import { SearchForm } from './SearchForm';
import { SearchHeader } from './SearchHeader';
import { SearchSuggestions } from './SearchSuggestions';
import { collectionLinks, suggestedSearches } from './searchOverlayData';
import { useRecentSearches } from './useRecentSearches';

type SearchOverlayProps = { onClose: () => void };

/** Global search dialog with persisted recent searches and collection recommendations. */
export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [category, setCategory] = useState('전체');
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } =
    useRecentSearches();
  const router = useRouter();

  const search = (nextQuery = query) => {
    const normalizedQuery = nextQuery.trim();
    if (!normalizedQuery) return;

    addRecentSearch(normalizedQuery);
    router.push(
      `/search?q=${encodeURIComponent(normalizedQuery)}&scope=${encodeURIComponent(category)}`,
    );
    onClose();
  };

  const openCollection = (id: string) => {
    router.push(`/collection/${id}`);
    onClose();
  };

  return (
    <SearchDialog onClose={onClose}>
      <SearchHeader onClose={onClose} />
      <SearchForm
        category={category}
        query={query}
        onCategoryChange={setCategory}
        onQueryChange={setQuery}
        onFocusChange={setIsFocused}
        onSearch={search}
      />
      <SearchCollectionLinks collections={collectionLinks} onSelect={openCollection} />
      {isFocused ? (
        <SearchSuggestions
          recentSearches={recentSearches}
          suggestedSearches={suggestedSearches}
          onSearch={search}
          onRemoveRecent={removeRecentSearch}
          onClearRecent={clearRecentSearches}
        />
      ) : null}
    </SearchDialog>
  );
}
