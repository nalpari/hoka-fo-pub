import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
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
  return (
    <ContentSection
      as="section"
      aria-labelledby="recent-search-title"
      gap="6"
      title="최근 검색어"
      headerProps={{
        orientation: 'horizontal',
        gap: '16px',
        css: css.raw({
          justifyContent: 'flex-start',
          _mobile: { justifyContent: 'space-between' },
        }),
        titleAs: 'h3',
        titleProps: { variant: 'body2', weight: 'bold', id: 'recent-search-title' },
        action: recentSearches.length ? (
          <Button variant="link" size="md" onClick={onClear}>
            전체 삭제
          </Button>
        ) : null,
      }}
    >
      {recentSearches.length ? (
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
      ) : (
        <Typography as="p" variant="body4" tone="tertiary">
          최근 검색어 내역이 없습니다.
        </Typography>
      )}
    </ContentSection>
  );
}
