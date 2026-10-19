'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { usePlatform } from '@/shared/context/platform';
import { SearchDialog } from './SearchDialog';
import { SearchForm } from './SearchForm';
import { SearchHeader } from './SearchHeader';
import { SearchSuggestions } from './SearchSuggestions';
import { autocompleteSearches, suggestedSearches } from './searchOverlayData';
import { useRecentSearches } from './useRecentSearches';

type SearchOverlayProps = {
  onClose: () => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  error?: string;
  onErrorChange?: (error: string) => void;
};

/** Search suggestions use local preview data; submission preserves the search results route. */
export function SearchOverlay({
  onClose,
  query: externalQuery,
  onQueryChange,
  error: externalError,
  onErrorChange,
}: SearchOverlayProps) {
  const [localQuery, setLocalQuery] = useState('');
  const [localError, setLocalError] = useState('');
  const error = externalError ?? localError;
  const setError = (value: string) => {
    setLocalError(value);
    onErrorChange?.(value);
  };
  const query = externalQuery ?? localQuery;
  const normalized = query.trim();
  const platform = usePlatform();
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } =
    useRecentSearches();
  const router = useRouter();
  const matches = [...new Set(autocompleteSearches)]
    .filter((item) => item.toLowerCase().includes(normalized.toLowerCase()))
    .slice(0, platform === 'mobile' ? 3 : 9);
  const showMatches = normalized.length > 0 && matches.length > 0 && !error;
  const changeQuery = (value: string) => {
    setError('');
    setLocalQuery(value);
    onQueryChange?.(value);
  };
  const search = (nextQuery = query) => {
    const value = nextQuery.trim();
    if (!value) {
      setError('검색어를 입력해주세요.');
      return;
    }
    addRecentSearch(value);
    router.push('/search?q=' + encodeURIComponent(value) + '&scope=' + encodeURIComponent('전체'));
    onClose();
  };

  return (
    <SearchDialog onClose={onClose} compact={showMatches}>
      <SearchHeader onClose={onClose} />
      <SearchForm query={query} onQueryChange={changeQuery} onSearch={search} error={error} />
      {showMatches ? (
        <Stack
          as="ul"
          aria-label="자동완성 검색어"
          gap="16px"
          m="0"
          px="48px"
          py="32px"
          listStyleType="none"
          _mobile={{ px: '16px', pt: '16px', pb: '0' }}
        >
          {matches.map((match) => {
            const index = match.toLowerCase().indexOf(normalized.toLowerCase());
            return (
              <li key={match}>
                <button
                  onClick={() => search(match)}
                  className={css({
                    p: '0',
                    border: '0',
                    bg: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                  })}
                >
                  <Typography variant="body4">
                    {match.slice(0, index)}
                    <Box as="mark" bg="transparent" color="blue.100">
                      {match.slice(index, index + normalized.length)}
                    </Box>
                    {match.slice(index + normalized.length)}
                  </Typography>
                </button>
              </li>
            );
          })}
        </Stack>
      ) : null}
      {!showMatches || platform === 'mobile' ? (
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
