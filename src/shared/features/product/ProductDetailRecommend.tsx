'use client';

import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { HomeCarouselSection } from '@/shared/components/molecules/HomeCarouselSection/HomeCarouselSection';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';
import { usePlatform } from '@/shared/context/platform';

const styles = {
  mobileSlide: css({
    w: 'calc(160px + var(--carousel-item-gutter) + var(--carousel-item-gutter))!',
    '& > *': { w: '100%' },
  }),
};

type ProductDetailRecommendProps = {
  products: Product[];
  title?: string;
};

export function ProductDetailRecommend({
  products,
  title = '추천 상품',
}: ProductDetailRecommendProps) {
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
        mobileRail="bleed"
        slideClassName={isWeb ? undefined : styles.mobileSlide}
        spacing="compact"
        title={title}
        titleVariant="heading6"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="showcase" />
        ))}
      </HomeCarouselSection>
    </Box>
  );
}
