import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Flex } from 'styled-system/jsx';
import { css } from 'styled-system/css';

type RecommendedSearchesProps = { queries: readonly string[]; onSearch: (query: string) => void };

export function RecommendedSearches({ queries, onSearch }: RecommendedSearchesProps) {
  return (
    <ContentSection
      as="section"
      aria-labelledby="recommended-search-title"
      gap="6"
      title="추천 검색어"
      headerProps={{
        titleAs: 'h3',
        titleProps: { variant: 'body2', weight: 'bold', id: 'recommended-search-title' },
      }}
    >
      <Flex as="ul" flexWrap="wrap" gap="4px" p="0" mb="0" listStyleType="none">
        {queries.map((query) => (
          <li key={query}>
            <button
              onClick={() => onSearch(query)}
              className={css({
                border: '0',
                borderRadius: '999px',
                px: '14px',
                py: '10px',
                bg: 'black.20',
                cursor: 'pointer',
                _hover: { bg: 'black.10' },
              })}
            >
              <Typography variant="body5">{query}</Typography>
            </button>
          </li>
        ))}
      </Flex>
    </ContentSection>
  );
}
