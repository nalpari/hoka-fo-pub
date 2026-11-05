'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';

import { CarouselSection } from '@/components/common/molecules/CarouselSection';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { cartPreviewRows } from '@/app/cart/cart-preview';
import { OrderPageLayout } from '@/components/orders/OrderPageLayout';
import { products } from '@/mocks/products';

import { CartOrderActions } from './CartOrderActions';
import { CartProductSection } from './CartProductSection';
import { CartSupportInfo } from './CartSupportInfo';

/** 고정 예시 데이터로 장바구니 마크업을 표시합니다. (Displays cart markup with fixed preview data.) */
export function CartContent() {
  const platform = usePlatform();
  return (
    <OrderPageLayout
      title={
        <ContentHeader
          title="장바구니"
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading5' }}
          orientation="horizontal"
          gap="1"
          alignItems="baseline"
          justifyContent="flex-start"
        />
      }
      headerSpacing="none"
      maxWidth="1132px"
    >
      <Stack gap={{ base: '14', _mobile: '8' }} mt={{ base: '6', _mobile: '0' }}>
        <Stack gap="0" pt={{ base: '8', _mobile: '0' }}>
          <CartProductSection rows={cartPreviewRows} />
          <HStack
            display={{ base: 'flex', _mobile: 'none' }}
            justifyContent="center"
            gap="2"
            mt={{ base: '8', _mobile: '0' }}
            py={{ base: '4', _mobile: '0' }}
          >
            <Box w="180px">
              <Button variant="secondary" fullWidth>
                선택상품 주문하기
              </Button>
            </Box>
            <Box w="180px">
              <Button variant="primary" fullWidth>
                전체상품 주문하기
              </Button>
            </Box>
          </HStack>
        </Stack>
        {/* [ 개발팀 바인딩 ] 현재 추천 목록은 공통 products 고정 fixture입니다. 실제 추천 조회와 로딩·오류·빈 결과 처리는 장바구니 데이터 소유자가 담당하며, 준비된 상품 표시 데이터를 ProductCard의 product에 전달합니다. */}
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
        <CartSupportInfo />
        <CartOrderActions />
      </Stack>
    </OrderPageLayout>
  );
}
