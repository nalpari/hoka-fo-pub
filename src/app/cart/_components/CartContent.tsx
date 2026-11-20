'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

import { CarouselSection } from '@/components/common/molecules/CarouselSection';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { cartPreviewRows } from '@/app/cart/cart-preview';
import { mobileOrderRecommendations, orderRecommendations } from '@/mocks/orderRecommendations';

import { CartOrderActions } from './CartOrderActions';
import { CartProductSection } from './CartProductSection';

/** 장바구니 상품과 주문내역·추천 상품을 배치합니다. (Arranges cart items, order totals, and recommendations.) */
export function CartContent() {
  const platform = usePlatform();
  const recommendations = platform === 'mobile' ? mobileOrderRecommendations : orderRecommendations;
  return (
    <Box as="main" pb={{ base: '96px', _mobile: '72px' }}>
      <Grid
        maxW="1136px"
        mx="auto"
        pt={{ base: '72px', _mobile: '24px' }}
        pb={{ base: '96px', _mobile: '40px' }}
        px={{ base: '0', _mobile: '16px' }}
        gridTemplateColumns={{ base: 'minmax(0, 720px) 360px', _mobile: 'minmax(0, 1fr)' }}
        gap={{ base: '56px', _mobile: '0' }}
      >
        <Stack gap={{ base: '40px', _mobile: '32px' }} minW="0">
          <ContentHeader
            title="장바구니"
            titleAs="h1"
            titleProps={{ web: 'heading6', mo: 'heading5' }}
          />
          <CartProductSection rows={cartPreviewRows} />
        </Stack>
        <CartOrderActions />
      </Grid>
      {/* [ 개발팀 바인딩 ] 추천 상품은 준비된 fixture이며 실제 조회와 로딩·오류 처리는 장바구니 연결 소유자가 담당합니다. */}
      <CarouselSection
        title="추천 상품"
        titleVariant="heading6"
        platform={platform}
        itemCount={recommendations.length}
        desktopCenteredItemCount={5}
        desktopItemGutter={8}
        mobileItemGutter={5}
        slideClassName={css({ w: '161px!', '& > *': { w: '100%' } })}
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
    </Box>
  );
}
