import { css } from 'styled-system/css';
import { square } from 'styled-system/patterns';
import type { OrderProductSummaryProps as ImportedOrderProductSummaryProps } from '@/types/component-contracts/components-common-molecules-OrderProductSummary-OrderProductSummary';
import { type ReactNode } from 'react';
import { Stack, HStack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';

/** 주문 상품 이미지의 용도별 크기와 배경을 표시합니다. (Displays an order product image with context-specific sizing and background.) */
function OrderProductSummaryImage({
  image,
  name,
  variant = 'checkout',
}: Pick<ImportedOrderProductSummaryProps, 'image' | 'name' | 'variant'>) {
  return (
    <img
      src={image}
      alt={name}
      className={
        variant === 'cart'
          ? css({
              w: '24',
              h: '24',
              flexShrink: '0',
              display: 'block',
              objectFit: 'contain',
              bg: 'black.10',
              _mobile: { w: '96px', h: '96px' },
            })
          : square({
              size: { base: variant === 'coupon' ? '88px' : '24', _mobile: '20' },
              display: 'block',
              objectFit: 'contain',
              bg: 'black.10',
            })
      }
    />
  );
}

type OrderProductSummaryContentProps = {
  name: string;
  optionText: string;
  amount: number;
  gender?: string;
  variant?: 'cart' | 'checkout' | 'coupon';
  children?: ReactNode;
  hideAmount?: boolean;
};

/** 주문 상품의 텍스트 정보와 추가 콘텐츠를 표시합니다. (Displays order product text information and additional content.) */
function OrderProductSummaryContent({
  name,
  optionText,
  amount,
  gender,
  variant = 'checkout',
  children,
  hideAmount = false,
}: OrderProductSummaryContentProps) {
  return (
    <Stack minW="0" flex="1" gap={variant === 'cart' ? { base: '1', _mobile: '1' } : '1'}>
      <Stack gap="0.5">
        {gender ? (
          <Typography web="body5" mo={variant === 'cart' ? 'body4' : 'body5'} weight="medium">
            {gender}
          </Typography>
        ) : null}
        <Typography
          variant="body4"
          weight="medium"
          className={variant === 'cart' ? css({ lineClamp: 2 }) : undefined}
        >
          {name}
        </Typography>
      </Stack>
      <Typography
        web="body5"
        mo={variant === 'cart' ? 'body4' : 'body5'}
        tone={variant === 'coupon' ? undefined : 'subtle'}
      >
        {optionText}
      </Typography>
      {!hideAmount ? (
        <Typography variant="body4" weight={variant === 'coupon' ? undefined : 'medium'}>
          {amount.toLocaleString()}원
        </Typography>
      ) : null}
      {children}
    </Stack>
  );
}

export type OrderProductSummaryProps = OrderProductSummaryContentProps & {
  image: string;
};

/** 주문 상품 정보를 표시하고 선택과 금액 계산은 호출자가 담당합니다. (Displays prepared order product information.) */
export function OrderProductSummary({
  image,
  name,
  optionText,
  amount,
  gender,
  variant = 'checkout',
  children,
  hideAmount,
}: OrderProductSummaryProps) {
  return (
    <HStack
      gap={variant === 'cart' ? { base: '4', _mobile: '4' } : '4'}
      alignItems={variant === 'cart' ? { base: 'flex-start', _mobile: 'center' } : 'flex-start'}
      py={variant === 'checkout' ? '6' : '0'}
      borderBottom={variant === 'checkout' ? '1px solid var(--colors-black-20)' : '0'}
    >
      <OrderProductSummaryImage image={image} name={name} variant={variant} />
      <OrderProductSummaryContent
        name={name}
        optionText={optionText}
        amount={amount}
        gender={gender}
        variant={variant}
        hideAmount={hideAmount}
      >
        {children}
      </OrderProductSummaryContent>
    </HStack>
  );
}

export { OrderProductSummaryContent };
