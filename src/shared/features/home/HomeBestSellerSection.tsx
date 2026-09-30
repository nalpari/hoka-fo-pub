'use client';

import { useState } from 'react';
import { usePlatform } from '@/shared/context/platform';
import { css } from 'styled-system/css';
import { products } from '@/mocks/products';
import { FilterTabs, type FilterTabOption } from '@/shared/components/atoms/FilterTabs/FilterTabs';
import { HomeCarouselSection } from '@/shared/components/molecules/HomeCarouselSection/HomeCarouselSection';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';
import { bestSellerTabs } from './homeContent';

const webRail = css({ w: '100%' });

const mobileRail = css({
  w: '100vw',
  overflow: 'visible!',
  '& .swiper-wrapper': { px: '11px' },
});

const webSlide = css({
  w: 'calc((100% - 64px) / 5 + 16px)!',
  '&:first-child, &:last-child': { w: 'calc((100% - 64px) / 5 + 8px)!' },
});

const mobileSlide = css({
  w: 'calc(40vw + var(--carousel-item-gutter) + var(--carousel-item-gutter))!',
  '&:last-child': {
    w: 'calc(40vw + var(--carousel-item-gutter) + var(--carousel-item-gutter) + 11px)!',
  },
});

type BestSellerTab = (typeof bestSellerTabs)[number];

const bestSellerFilterTabs: readonly FilterTabOption<BestSellerTab>[] = bestSellerTabs.map(
  (tab) => ({
    label: tab,
    value: tab,
  }),
);

const getBestSellerProducts = (tab: BestSellerTab) => {
  if (tab === '전체') return products.slice(0, 6);
  if (tab === '로드 러닝')
    return products.filter((product) => product.category === '러닝').slice(0, 6);
  if (tab === '트레일 러닝')
    return products.filter((product) => product.category === '트레일').slice(0, 6);
  if (tab === '라이프스타일') {
    return products.filter((product) => product.category === '라이프스타일').slice(0, 6);
  }
  if (tab === '하이킹') return products.filter((product) => product.width === 'Wide').slice(0, 6);
  return products.filter((product) => product.use === 'Walking').slice(0, 6);
};

export function HomeBestSellerSection() {
  const platform = usePlatform();
  const isWeb = platform === 'web';
  const [selectedTab, setSelectedTab] = useState<BestSellerTab>('전체');
  const bestSellerProducts = getBestSellerProducts(selectedTab);

  return (
    <HomeCarouselSection
      beforeViewport={
        <FilterTabs
          ariaLabel="베스트셀러 카테고리 필터"
          onValueChange={setSelectedTab}
          options={bestSellerFilterTabs}
          value={selectedTab}
        />
      }
      desktopCenteredItemCount={5}
      desktopItemGutter={8}
      itemCount={bestSellerProducts.length}
      key={selectedTab}
      mobileItemGutter={5}
      platform={platform}
      railClassName={isWeb ? webRail : mobileRail}
      slideClassName={isWeb ? webSlide : mobileSlide}
      spacing="compact"
      title="Best sellers"
    >
      {bestSellerProducts.map((product) => (
        <ProductCard key={product.id} product={product} variant="showcase" />
      ))}
    </HomeCarouselSection>
  );
}
