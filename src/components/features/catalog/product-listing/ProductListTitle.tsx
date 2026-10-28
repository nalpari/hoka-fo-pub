import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { Platform } from '@/lib/device';
import { HStack } from 'styled-system/jsx';

type ProductListTitleProps = {
  platform: Platform;
  resultCount: number;
  searchQuery: string;
  title: string;
};

/** 상품 목록 제목과 검색 결과 건수를 표시합니다. (Displays the product listing title and result count.) */
export function ProductListTitle({
  platform,
  resultCount,
  searchQuery,
  title,
}: ProductListTitleProps) {
  return (
    <HStack gap={platform === 'mobile' ? '10px' : '12px'} alignItems={'flex-end'}>
      <Typography web="heading7" mo="body1" weight="black">
        {searchQuery ? `“${searchQuery}”에 대한 검색결과` : title}
      </Typography>
      <Typography variant="body5">({resultCount})</Typography>
    </HStack>
  );
}
