'use client';

import { Box, Grid, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { type CheckoutRow } from '@/app/checkout/checkout-summary';
import { getCartImage } from '@/mocks/cartDisplay';

type CheckoutProductListProps = { rows: readonly CheckoutRow[] };

function CheckoutProductList({ rows }: CheckoutProductListProps) {
  return (
    <Stack borderTop="1px solid var(--colors-black-100)">
      <Grid
        gridTemplateColumns="minmax(0, 1fr) 70px 100px"
        display={{ base: 'grid', _mobile: 'none' }}
        py="3"
        borderBottom="1px solid var(--colors-black-20)"
      >
        <Typography variant="body5">상품/옵션정보</Typography>
        <Typography variant="body5">수량</Typography>
        <Typography variant="body5">가격</Typography>
      </Grid>
      {rows.map(({ item, product }) => (
        <Grid
          key={`${item.id}-${item.color}-${item.width}-${item.size}`}
          gridTemplateColumns={{ base: 'minmax(0, 1fr) 70px 100px', _mobile: '1fr' }}
          gap="4"
          alignItems="center"
        >
          <OrderProductSummary
            image={getCartImage(item, product.primaryImage ?? '/images/mypage/speedgoat-7-gtx.png')}
            name={product.name}
            optionText={`옵션 : ${item.width} / ${item.color} / ${item.size} / ${item.quantity}개`}
            amount={product.price * item.quantity}
          />
          <Box display={{ _mobile: 'none' }}>
            <Typography variant="body4">{item.quantity}개</Typography>
          </Box>
          <Box display={{ _mobile: 'none' }}>
            <Typography variant="body4">
              {(product.price * item.quantity).toLocaleString()}원
            </Typography>
          </Box>
        </Grid>
      ))}
    </Stack>
  );
}

/** 주문 상품과 할인 및 결제 금액을 표시합니다. (Displays ordered products, discounts, and payment totals.) */
export function CheckoutSummary({ rows }: { rows: readonly CheckoutRow[] }) {
  return (
    <ContentSection
      as="section"
      gap="4"
      title="주문상품 정보 및 할인 적용"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading9', mo: 'heading7' } }}
    >
      <CheckoutProductList rows={rows} />
      <Typography variant="body5" tone="subtle">
        * 상품수량 변경은 상품상세 또는 장바구니에서 하실 수 있습니다.
      </Typography>
    </ContentSection>
  );
}
