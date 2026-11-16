'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { CarouselSection } from '@/components/common/molecules/CarouselSection';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { products } from '@/mocks/products';

import { CartEmptyState } from './CartEmptyState';

/** 빈 장바구니 안내와 추천 상품 영역을 함께 표시합니다. (Displays the empty cart message with recommended products.) */
export function CartEmptyContent() {
  const platform = usePlatform();

  return (
    <Stack gap={{ base: '18', _mobile: '18' }}>
      <CartEmptyState />
      <CarouselSection
        title="추천 상품"
        titleVariant={platform === 'mobile' ? 'heading6' : 'heading7'}
        platform={platform}
        itemCount={products.length}
        desktopCenteredItemCount={4}
        desktopItemGutter={8}
        mobileItemGutter={5}
        slideClassName={css({ w: '160px!', '& > *': { w: '100%' } })}
        className={css({
          '--layout-web-content-inline-space': '0px',
          '--layout-mobile-content-inline-space': '0px',
        })}
        spacing="tight"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="showcase" />
        ))}
      </CarouselSection>
    </Stack>
  );
}
