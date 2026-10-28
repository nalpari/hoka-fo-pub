import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { Button } from '@/components/common/atoms/Button/Button';
import { Flex } from 'styled-system/jsx';

type RecommendedSearchesProps = { queries: readonly string[]; onSearch: (query: string) => void };

export function RecommendedSearches({ queries, onSearch }: RecommendedSearchesProps) {
  return (
    <ContentSection
      as="section"
      aria-labelledby="recommended-search-title"
      gap={{ base: '6', _mobile: '4' }}
      title="추천 검색어"
      headerProps={{
        titleAs: 'h3',
        titleProps: { web: 'heading8', mo: 'heading5', id: 'recommended-search-title' },
      }}
    >
      <Flex as="ul" flexWrap="wrap" gap="8px 4px" pb="2" listStyleType="none">
        {queries.map((query) => (
          <li key={query}>
            <Button variant="chip" onClick={() => onSearch(query)}>
              {query}
            </Button>
          </li>
        ))}
      </Flex>
    </ContentSection>
  );
}
