import type { ReactNode } from 'react';
import type { Product } from '@/mocks/products';
import { ProductListingResults } from '@/components/features/catalog/ProductListingResults';
import type { Platform } from '@/lib/device';
import { Box, Grid } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import { BottomSheet } from '@/components/common/layouts/BottomSheet/BottomSheet';

type ProductListingContentProps = {
  filterDrawerOpen: boolean;
  filterPanel: ReactNode;
  mobileResultCount: number;
  onFilterDrawerOpenChange: (open: boolean) => void;
  onLoadMore: () => void;
  onMobileFilterApply: () => void;
  onReset: () => void;
  platform: Platform;
  result: Product[];
  shown: Product[];
};

/** 상품 필터와 목록을 구성하고 고정 영역 또는 시트로 배치합니다. (Composes shared product filters in a sticky area or bottom sheet.) */
export function ProductListingContent({
  filterDrawerOpen,
  filterPanel,
  mobileResultCount,
  onFilterDrawerOpenChange,
  onLoadMore,
  onMobileFilterApply,
  onReset,
  platform,
  result,
  shown,
}: ProductListingContentProps) {
  return (
    <>
      <Grid
        gridTemplateColumns="clamp(252px, 22%, 337px) minmax(0, 1fr)"
        gap="clamp(20px, 3.2%, 48px)"
        _mobile={{
          display: 'block',
        }}
      >
        {platform === 'web' && (
          <Box
            position="sticky"
            top="calc(var(--layout-site-header-height) + var(--content-layout-header-height))"
            alignSelf="start"
            maxH="calc(100dvh - var(--layout-site-header-height) - var(--content-layout-header-height))"
            overflowX="hidden"
            overflowY="auto"
            scrollbar="hidden"
          >
            {filterPanel}
          </Box>
        )}
        <ProductListingResults
          hasMore={shown.length < result.length}
          onLoadMore={onLoadMore}
          onReset={onReset}
          platform={platform}
          shown={shown}
        />
      </Grid>
      {platform === 'mobile' && filterDrawerOpen && (
        <BottomSheet
          ariaLabel="상품 필터"
          footer={
            <Button onClick={onMobileFilterApply} variant="primary">
              필터 적용하기 ({mobileResultCount})
            </Button>
          }
          onClose={() => onFilterDrawerOpenChange(false)}
          title="필터"
        >
          {filterPanel}
        </BottomSheet>
      )}
    </>
  );
}
