import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { RecentSearches } from './RecentSearches';
import { RecommendedSearches } from './RecommendedSearches';

const suggestions = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  minH: '250px',
  border: '1px solid var(--color-black-20)',
  borderTop: '0',
  _mobile: { gridTemplateColumns: '1fr' },
  '& section': { p: '4' },
  '& header': { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  '& h3': { m: '0' },
  '& header button': {
    border: '0',
    p: '0',
    bg: 'transparent',
    color: 'var(--color-black-40)',
  },
  '& ul, & ol': { m: '22px 0 0', p: '0', listStyle: 'none' },
  '& li': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minH: '26px',
    fontSize: '14' /* 기존 13px */,
  },
  '& p': {
    display: 'grid',
    minH: '158px',
    m: '0',
    placeItems: 'center',
    color: 'var(--color-text-tertiary)',
    textAlign: 'center',
  },
});

type SearchSuggestionsProps = {
  recentSearches: readonly string[];
  suggestedSearches: readonly string[];
  onSearch: (query: string) => void;
  onRemoveRecent: (query: string) => void;
  onClearRecent: () => void;
};

export function SearchSuggestions({
  recentSearches,
  suggestedSearches,
  onSearch,
  onRemoveRecent,
  onClearRecent,
}: SearchSuggestionsProps) {
  return (
    <Box className={suggestions}>
      <RecentSearches
        recentSearches={recentSearches}
        onSearch={onSearch}
        onRemove={onRemoveRecent}
        onClear={onClearRecent}
      />
      <RecommendedSearches queries={suggestedSearches} onSearch={onSearch} />
    </Box>
  );
}
