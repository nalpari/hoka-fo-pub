'use client';

import { css } from 'styled-system/css';
import type { Product } from '@/mocks/products';
import { HomeCarouselSection } from '@/shared/components/molecules/HomeCarouselSection/HomeCarouselSection';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';
import { usePlatform } from '@/shared/context/platform';

const styles = {
  root: css({
    minW: '0',
    mt: '16',
    _mobile: { mt: '10' },
  }),
  fullBleed: css({ w: '100vw', mx: 'calc(50% - 50vw)' }),
  webRail: css({ w: '100%' }),
  mobileRail: css({
    w: '100vw',
    pr: '16px !important',
    overflow: 'visible!',
    '& .swiper-wrapper': { px: '8px' },
  }),
  webSlide: css({
    w: 'calc((100% - 64px) / 5 + 16px)!',
    '&:first-child, &:last-child': { w: 'calc((100% - 64px) / 5 + 8px)!' },
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
    <div className={styles.root}>
      <div className={styles.fullBleed}>
        <HomeCarouselSection
          desktopCenteredItemCount={5}
          desktopItemGutter={8}
          itemCount={products.length}
          mobileItemGutter={5}
          platform={platform}
          railClassName={isWeb ? styles.webRail : styles.mobileRail}
          slideClassName={isWeb ? styles.webSlide : styles.mobileSlide}
          spacing="compact"
          title="추천 상품"
          titleVariant="heading6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="showcase" />
          ))}
        </HomeCarouselSection>
      </div>
    </div>
  );
}
