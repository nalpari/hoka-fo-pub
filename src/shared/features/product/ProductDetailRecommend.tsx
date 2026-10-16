'use client';

import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { HomeCarouselSection } from '@/shared/components/molecules/HomeCarouselSection/HomeCarouselSection';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';
import { usePlatform } from '@/shared/context/platform';

const styles = {
  mobileRail: css({
    w: '100vw',
    pr: '16px !important',
    overflow: 'visible!',
    '& .swiper-wrapper': { px: '8px' },
  }),
  mobileSlide: css({
    w: 'calc(160px + var(--carousel-item-gutter) + var(--carousel-item-gutter))!',
    '& > *': { w: '100%' },
  }),
};

type ProductDetailRecommendProps = {
  products: Product[];
};

export function ProductDetailRecommend({ products }: ProductDetailRecommendProps) {
  const platform = usePlatform();
  const isWeb = platform === 'web';

  return (
    <Box mt="24" _mobile={{ mt: '10' }}>
      <HomeCarouselSection
        desktopCenteredItemCount={5}
        desktopItemGutter={8}
        itemCount={products.length}
        mobileItemGutter={5}
        platform={platform}
        railClassName={isWeb ? undefined : styles.mobileRail}
        slideClassName={isWeb ? undefined : styles.mobileSlide}
        spacing="compact"
        title="추천 상품"
        titleVariant="heading6"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="showcase" />
        ))}
      </HomeCarouselSection>
    </Box>
  );
}
