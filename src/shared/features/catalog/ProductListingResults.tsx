import { useEffect, useRef } from 'react';
import type { Product } from '@/mocks/products';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';
import { Button } from '@/shared/components/atoms/Button/Button';
import {
  ProductCard,
  type ProductCardOption,
} from '@/shared/components/molecules/ProductCard/ProductCard';
import { PromotionCard } from '@/shared/components/molecules/PromotionCard/PromotionCard';
import { CatalogResults } from '@/shared/components/organisms/Catalog/CatalogResults/CatalogResults';
import type { Platform } from '@/shared/lib/device';
import { Box, Grid } from 'styled-system/jsx';
import { css } from 'styled-system/css';

const catalogGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  columnGap: '4',
  rowGap: '12',
  _mobile: { gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '2', rowGap: '10' },
});

const catalogProductCardOptions: readonly ProductCardOption[] = ['promotion', 'like', 'colors'];

const fullWidthPromotion = css({ mt: '10', w: '100%' });

type ProductListingResultsProps = {
  hasMore: boolean;
  onLoadMore: () => void;
  platform: Platform;
  shown: Product[];
  onReset: () => void;
};

export function ProductListingResults({
  hasMore,
  onLoadMore,
  platform,
  shown,
  onReset,
}: ProductListingResultsProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { rootMargin: '240px 0px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, onLoadMore]);

  return (
    <CatalogResults>
      {shown.length ? (
        <>
          <Grid className={catalogGrid}>
            {shown.map((product, index) =>
              index === 5 ? (
                <PromotionCard key="promotion" />
              ) : (
                <ProductCard key={product.id} options={catalogProductCardOptions} product={product} />
              ),
            )}
          </Grid>
          {platform === 'mobile' && (
            <Box className={fullWidthPromotion}>
              <PromotionCard variant="fullWidth" />
            </Box>
          )}
          {hasMore && <Box ref={loadMoreRef} aria-hidden="true" h="1px" />}
        </>
      ) : (
        <EmptyState
          action={<Button onClick={onReset}>필터 초기화</Button>}
          description="선택한 필터를 초기화한 뒤 다시 찾아보세요."
          title="조건에 맞는 상품이 없습니다"
        />
      )}
    </CatalogResults>
  );
}
