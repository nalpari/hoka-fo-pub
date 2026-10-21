import type { ReactNode } from 'react';
import { HStack, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { square } from 'styled-system/patterns';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type OrderProductSummaryProps = {
  image: string;
  name: string;
  optionText: string;
  amount: number;
  gender?: string;
  variant?: 'cart' | 'checkout' | 'coupon';
  children?: ReactNode;
};

/** Prepared order-product information; selection, pricing rules and actions stay with the caller. */
export function OrderProductSummary({
  image,
  name,
  optionText,
  amount,
  gender,
  variant = 'checkout',
  children,
}: OrderProductSummaryProps) {
  return (
    <HStack
      gap="4"
      alignItems={variant === 'cart' ? { base: 'flex-start', _mobile: 'center' } : 'flex-start'}
      py={variant === 'checkout' ? '6' : '0'}
      borderBottom={variant === 'checkout' ? '1px solid var(--colors-black-20)' : '0'}
    >
      <img
        src={image}
        alt={name}
        className={square({
          size: { base: variant === 'coupon' ? '88px' : '24', _mobile: '20' },
          display: 'block',
          objectFit: 'contain',
          bg: 'black.10',
        })}
      />
      <Stack minW="0" flex="1" gap="1">
        {gender ? <Typography variant="body5">{gender}</Typography> : null}
        <Typography
          variant="body4"
          weight="semibold"
          className={variant === 'cart' ? css({ lineClamp: 2 }) : undefined}
        >
          {name}
        </Typography>
        <Typography variant="body5" tone={variant === 'coupon' ? undefined : 'subtle'}>
          {optionText}
        </Typography>
        <Typography variant="body4" weight={variant === 'coupon' ? undefined : 'semibold'}>
          {amount.toLocaleString()}원
        </Typography>
        {children}
      </Stack>
    </HStack>
  );
}
