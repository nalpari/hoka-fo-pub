import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { RecentSearchItem } from './RecentSearchItem';

type RecentSearchesProps = {
  recentSearches: readonly string[];
  onSearch: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
};

export function RecentSearches({
  recentSearches,
  onSearch,
  onRemove,
  onClear,
}: RecentSearchesProps) {
  return (
    <Box as="section" aria-labelledby="recent-search-title">
      <HStack gap="16px" mb="24px" _mobile={{ justifyContent: 'space-between' }}>
        <Typography as="h3" variant="body2" weight="bold" id="recent-search-title">
          최근 검색어
        </Typography>
        {recentSearches.length ? (
          <Button variant="link" size="md" onClick={onClear}>
            전체 삭제
          </Button>
        ) : null}
      </HStack>
      {recentSearches.length ? (
        <Stack as="ul" gap="12px" m="0" p="0" listStyleType="none">
          {recentSearches.map((recent) => (
            <RecentSearchItem key={recent} query={recent} onSearch={onSearch} onRemove={onRemove} />
          ))}
        </Stack>
      ) : (
        <Typography as="p" variant="body4" tone="tertiary">
          최근 검색어 내역이 없습니다.
        </Typography>
      )}
    </Box>
  );
}
