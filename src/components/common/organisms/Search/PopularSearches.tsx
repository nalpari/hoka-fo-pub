import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { SearchKeywordButton } from './SearchKeywordButton';
import { css } from 'styled-system/css';
import { Grid, HStack } from 'styled-system/jsx';

type PopularSearchesProps = {
  queries: readonly string[];
  onNavigateSearch: (query: string) => void;
};

export function PopularSearches({ queries, onNavigateSearch }: PopularSearchesProps) {
  return (
    <ContentSection
      as="section"
      aria-labelledby="popular-search-title"
      gap={{ base: '6', _mobile: '4' }}
      title="인기 검색어"
      headerProps={{
        titleAs: 'h3',
        titleProps: { web: 'heading8', mo: 'heading5', id: 'popular-search-title' },
      }}
    >
      <Grid
        as="ol"
        gridAutoFlow="column"
        gridTemplateRows="repeat(5, auto)"
        gridTemplateColumns="1fr 1fr"
        listStyleType="none"
        gap="12px 16px"
        _mobile={{ gap: '16px', py: '8px' }}
      >
        {queries.map((query, index) => (
          <HStack as="li" key={query} alignItems="center" gap="1">
            <Typography variant="body3" weight="medium" className={css({ minW: '20px' })}>
              {index + 1}
            </Typography>
            <SearchKeywordButton query={query} onNavigateSearch={onNavigateSearch} />
          </HStack>
        ))}
      </Grid>
    </ContentSection>
  );
}
