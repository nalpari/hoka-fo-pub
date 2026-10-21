import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Button } from '@/shared/components/atoms/Button/Button';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { RecentSearchItem } from './RecentSearchItem';

type RecentSearchesProps = {
  recentSearches: readonly string[];
  onNavigateSearch: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
};

export function RecentSearches({
  recentSearches,
  onNavigateSearch,
  onRemove,
  onClear,
}: RecentSearchesProps) {
  if (recentSearches.length === 0) return null;

  return (
    <ContentSection
      as="section"
      flex="1"
      aria-labelledby="recent-search-title"
      gap={{ base: '6', _mobile: '4' }}
      title="최근 검색어"
      headerProps={{
        orientation: 'horizontal',
        gap: '16px',
        css: css.raw({
          justifyContent: 'flex-start',
          _mobile: { justifyContent: 'space-between' },
        }),
        titleAs: 'h3',
        titleProps: { web: 'heading8', mo: 'heading5', id: 'recent-search-title' },
        action: (
          <Button variant="link" size="md" onClick={onClear}>
            전체 삭제
          </Button>
        ),
      }}
    >
      <Stack as="ul" gap="12px" m="0" p="0" listStyleType="none">
        {recentSearches.map((recent) => (
          <RecentSearchItem
            key={recent}
            query={recent}
            onNavigateSearch={onNavigateSearch}
            onRemove={onRemove}
          />
        ))}
      </Stack>
    </ContentSection>
  );
}
