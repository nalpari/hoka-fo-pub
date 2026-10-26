'use client';

import { useState } from 'react';
import { usePlatform } from '@/shared/context/platform';
import { css } from 'styled-system/css';
import { products } from '@/mocks/products';
import { FilterTabs, type FilterTabOption } from '@/shared/components/atoms/FilterTabs/FilterTabs';
import { HomeCarouselSection } from '@/shared/components/molecules/HomeCarouselSection/HomeCarouselSection';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';
import { bestSellerTabs } from './homeContent';
import { createHomeCarouselPreviewItems } from './homeCarouselPreview';
import { Box } from 'styled-system/jsx';

const thumbnailRatio = css.raw({
  '& .image': { h: 'auto!', aspectRatio: '3 / 4!' },
});

const desktopRail = css(thumbnailRatio);

const mobileRail = css(thumbnailRatio, {
  w: '100vw',
  pr: '16px !important',
  overflow: 'visible!',
  '& .swiper-wrapper': { px: '8px' },
});

const mobileSlide = css({
  // Scale the 375px design's 160px card and 5px side gutters together.
  w: 'calc(42.66666666666667vw + 1.3333333333333333vw + 1.3333333333333333vw)!',
  px: '1.3333333333333333vw!',
  '& > *': { w: '100%!' },
});

type BestSellerTab = (typeof bestSellerTabs)[number];

const bestSellerFilterTabs: readonly FilterTabOption<BestSellerTab>[] = bestSellerTabs.map(
  (tab) => ({
    label: tab,
    value: tab,
  }),
);

const getBestSellerProducts = (tab: BestSellerTab) => {
  if (tab === '전체') return products.slice(0, 12);
  if (tab === '로드 러닝')
    return products.filter((product) => product.category === '러닝').slice(0, 12);
  if (tab === '트레일 러닝')
    return products.filter((product) => product.category === '트레일').slice(0, 12);
  if (tab === '라이프스타일') {
    return products.filter((product) => product.category === '라이프스타일').slice(0, 12);
  }
  if (tab === '하이킹') return products.filter((product) => product.width === 'Wide').slice(0, 12);
  if (tab === '워킹') return products.filter((product) => product.use === 'Walking').slice(0, 12);
  return products.filter((product) => product.category === '리커버리').slice(0, 12);
};

export function HomeBestSellerSection() {
  const platform = usePlatform();
  const isWeb = platform === 'web';
  const [selectedTab, setSelectedTab] = useState<BestSellerTab>('전체');
  const bestSellerProducts = createHomeCarouselPreviewItems(getBestSellerProducts(selectedTab));

  return (
    <HomeCarouselSection
      beforeViewport={
        <Box  pl="0" pb="10" _mobile={{ pl: '4', pb: '4' }}>
          <FilterTabs
            ariaLabel="베스트셀러 카테고리 필터"
            onValueChange={setSelectedTab}
            options={bestSellerFilterTabs}
            value={selectedTab}
            variant="fill"
          />
        </Box>
      }
      desktopCenteredItemCount={5}
      desktopItemGutter={8}
      itemCount={bestSellerProducts.length}
      mobileItemGutter={5}
      platform={platform}
      railClassName={isWeb ? desktopRail : mobileRail}
      slideClassName={isWeb ? undefined : mobileSlide}
      spacing="compact"
      title="Best sellers"
      viewportKey={selectedTab}
    >
      {bestSellerProducts.map((product, index) => (
        <ProductCard key={`${product.id}-${index}`} product={product} variant="showcase" />
      ))}
    </HomeCarouselSection>
  );
}
