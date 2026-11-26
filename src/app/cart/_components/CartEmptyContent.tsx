'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { CarouselSection } from '@/components/common/molecules/CarouselSection';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { mobileOrderRecommendations, orderRecommendations } from '@/mocks/orderRecommendations';

import { CartEmptyState } from './CartEmptyState';

/** 빈 장바구니 안내와 추천 상품 영역을 함께 표시합니다. (Displays the empty cart message with recommended products.) */
export function CartEmptyContent() {
  const platform = usePlatform();
  const recommendations = platform === 'mobile' ? mobileOrderRecommendations : orderRecommendations;

  return (
    <Stack gap={{ base: '96px', _mobile: '72px' }}>
      <CartEmptyState />
      <CarouselSection
        title="추천 상품"
        titleVariant="h4B"
        mobileTitleVariant="h8"
        platform={platform}
        itemCount={recommendations.length}
        desktopCenteredItemCount={5}
        desktopItemGutter={8}
        mobileItemGutter={5}
        slideClassName={css({ w: '160px!', '& > *': { w: '100%' } })}
        className={css({
          '--layout-web-content-inline-space': '144px',
          '--layout-web-content-max-width': '1776px',
          '--layout-mobile-content-inline-space': '32px',
        })}
        spacing="tight"
      >
        {recommendations.map((item) => (
          <ProductCard
            textWeights={{ identity: 'medium' }}
            key={item.id}
            href={item.href}
            product={{
              id: item.id,
              name: item.name,
              gender: item.gender,
              price: item.price,
              primaryImage: item.imageSrc,
            }}
            variant="showcase"
          />
        ))}
      </CarouselSection>
    </Stack>
  );
}
