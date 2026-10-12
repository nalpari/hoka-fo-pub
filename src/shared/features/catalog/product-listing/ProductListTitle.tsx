import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { Platform } from '@/shared/lib/device';
import { HStack } from 'styled-system/jsx';

type ProductListTitleProps = {
  platform: Platform;
  resultCount: number;
  searchQuery: string;
  title: string;
};

export function ProductListTitle({
  platform,
  resultCount,
  searchQuery,
  title,
}: ProductListTitleProps) {
  return (
    <HStack gap={platform === 'mobile' ? '10px' : '12px'} alignItems={'flex-end'}>
      <Typography variant="heading">
        {searchQuery ? `“${searchQuery}”에 대한 검색결과` : title}
      </Typography>
      <Typography variant="meta">({resultCount})</Typography>
    </HStack>
  );
}
