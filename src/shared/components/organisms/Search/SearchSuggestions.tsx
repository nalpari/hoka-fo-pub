import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Box, Grid, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { RecentSearches } from './RecentSearches';
import { RecommendedSearches } from './RecommendedSearches';
import { SearchKeywordButton } from './SearchKeywordButton';
import { popularSearches } from './searchOverlayData';

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
    <Grid
      gridTemplateColumns="1fr 1fr"
      gap="48px"
      p="32px"
      _mobile={{ gridTemplateColumns: '1fr', gap: '40px', px: '16px', py: '40px' }}
    >
      <RecentSearches
        recentSearches={recentSearches}
        onSearch={onSearch}
        onRemove={onRemoveRecent}
        onClear={onClearRecent}
      />
      <Stack gap="40px">
        <RecommendedSearches queries={suggestedSearches} onSearch={onSearch} />
        <ContentSection
          as="section"
          aria-labelledby="popular-search-title"
          gap="6"
          title="인기 검색어"
          headerProps={{
            titleAs: 'h3',
            titleProps: { variant: 'body2', weight: 'bold', id: 'popular-search-title' },
          }}
        >
          <Box
            as="ol"

            mb="0"
            p="0"
            display="grid"
            gridAutoFlow="column"
            gridTemplateRows="repeat(5, auto)"
            gridTemplateColumns="1fr 1fr"
            gap="12px 24px"
            listStyleType="none"
          >
            {popularSearches.map((query, index) => (
              <li
                key={query}
                className={css({ display: 'flex', alignItems: 'center', gap: '16px' })}
              >
                <Typography variant="body4" className={css({ minW: '12px' })}>
                  {index + 1}
                </Typography>
                <SearchKeywordButton query={query} onSearch={onSearch} />
              </li>
            ))}
          </Box>
        </ContentSection>
      </Stack>
    </Grid>
  );
}
