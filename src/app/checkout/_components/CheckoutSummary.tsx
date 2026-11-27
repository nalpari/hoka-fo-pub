'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';

import { dataListRecipe } from '@/components/common/atoms/DataList.recipe';
import { Typography } from '@/components/common/atoms/Typography';

import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { type CheckoutRow } from '@/app/checkout/checkout-summary';
import { formatProductOptions } from '@/lib/formatProductOptions';
import { getCartImage } from '@/mocks/cartDisplay';

/** 주문 상품의 준비된 수량·정상가·판매가를 표시합니다. (Displays prepared checkout quantities, original prices, and selling prices.) */
export function CheckoutSummary({ rows }: { rows: readonly CheckoutRow[] }) {
  const mobile = usePlatform() === 'mobile';
  return (
    <ContentSection
      as="section"
      gap="24px"
      title="주문상품 정보 및 할인 적용"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'h8B', mo: 'h8' } }}
    >
      <Stack
        gap="0"
        borderTop={{
          base: '2px solid var(--color-black-20)',
          _mobile: '1px solid var(--color-black-20)',
        }}
        className={dataListRecipe({ top: 'unchanged', headerTypography: 'heading' }).root}
      >
        {!mobile ? (
          <Grid
            gridTemplateColumns="minmax(0, 1fr) 158px 200px"
            data-list-header
            className={dataListRecipe().header}
          >
            {['상품/옵션정보', '수량', '가격'].map((label) => (
              <span key={label} data-list-cell>
                {label}
              </span>
            ))}
          </Grid>
        ) : null}
        {rows.map(({ item, product, amount, originalAmount }) => (
          <Grid
            key={item.id}
            data-list-item
            gridTemplateColumns={{ base: 'minmax(0, 1fr) 158px 200px', _mobile: '1fr' }}
            rowGap="0"
            py={{ base: '32px', _mobile: '24px' }}
            alignItems="center"
          >
            <OrderProductSummary
              variant="history"
              imageSize={{ web: 96, mobile: 80 }}
              image={getCartImage(item, product.primaryImage ?? '/images/cart/speedgoat-black.png')}
              {...(mobile
                ? {
                    content: (
                      <Stack gap="4px" minW="0">
                        <Typography variant="b6M">{product.name}</Typography>
                        <Typography variant="b8" tone="subtle">
                          {formatProductOptions(item, item.quantity)}
                        </Typography>
                        {originalAmount ? (
                          <Typography
                            variant="b8"
                            tone="subtle"
                            className={css({ textDecoration: 'line-through' })}
                          >
                            {originalAmount.toLocaleString()}원
                          </Typography>
                        ) : null}
                        <Typography variant="b6M">{amount.toLocaleString()}원</Typography>
                      </Stack>
                    ),
                  }
                : { optionText: formatProductOptions(item), hideAmount: true })}
              name={product.name}
            />
            {!mobile ? (
              <>
                <Typography variant="b6" className={css({ textAlign: 'center' })}>
                  {item.quantity}개
                </Typography>
                <Stack gap="0" alignItems="flex-end" pr="24px">
                  {originalAmount ? (
                    <Typography
                      variant="b6"
                      tone="subtle"
                      className={css({ textDecoration: 'line-through' })}
                    >
                      {originalAmount.toLocaleString()}원
                    </Typography>
                  ) : null}
                  <Typography variant="b6M">{amount.toLocaleString()}원</Typography>
                </Stack>
              </>
            ) : null}
          </Grid>
        ))}
      </Stack>
      <Typography variant="b8" tone="subtle">
        * 상품수량 변경은 상품상세 또는 장바구니에서 하실 수 있습니다.
      </Typography>
    </ContentSection>
  );
}
