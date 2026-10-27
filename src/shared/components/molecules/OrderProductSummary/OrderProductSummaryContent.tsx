import type { ReactNode } from 'react';
import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type OrderProductSummaryContentProps = {
  name: string;
  optionText: string;
  amount: number;
  gender?: string;
  variant?: 'cart' | 'checkout' | 'coupon';
  children?: ReactNode;
  hideAmount?: boolean;
};

/** 주문 상품의 텍스트 정보와 추가 콘텐츠를 표시합니다. (Displays order product text information and additional content.) */
export function OrderProductSummaryContent({
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
