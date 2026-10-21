import { Flex, Stack } from 'styled-system/jsx';
import { RecentSearches } from './RecentSearches';
import { RecommendedSearches } from './RecommendedSearches';
import { PopularSearches } from './PopularSearches';
import { popularSearches } from './searchOverlayData';

type SearchSuggestionsProps = {
  recentSearches: readonly string[];
  suggestedSearches: readonly string[];
  onSearch: (query: string) => void;
  onNavigateSearch: (query: string) => void;
  onRemoveRecent: (query: string) => void;
  onClearRecent: () => void;
};

export function SearchSuggestions({
  recentSearches,
  suggestedSearches,
  onSearch,
  onNavigateSearch,
  onRemoveRecent,
  onClearRecent,
}: SearchSuggestionsProps) {
  const hasRecentSearches = recentSearches.length > 0;

  return (
    <Flex
      gap="0"
      p="32px"
      _mobile={{ flexDirection: 'column', gap: '32px', px: '16px', py: '16px' }}
    >
      {hasRecentSearches && (
        <RecentSearches
          recentSearches={recentSearches}
          onNavigateSearch={onNavigateSearch}
          onRemove={onRemoveRecent}
          onClear={onClearRecent}
        />
      )}
      <Stack flex="1" gap="32px">
        <RecommendedSearches queries={suggestedSearches} onSearch={onSearch} />
        <PopularSearches queries={popularSearches} onNavigateSearch={onNavigateSearch} />
      </Stack>
    </Flex>
  );
}
