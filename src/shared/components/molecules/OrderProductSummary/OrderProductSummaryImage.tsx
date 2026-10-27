import { css } from 'styled-system/css';
import { square } from 'styled-system/patterns';
import type { OrderProductSummaryProps } from './OrderProductSummary';

/** 주문 상품 이미지의 용도별 크기와 배경을 표시합니다. (Displays an order product image with context-specific sizing and background.) */
export function OrderProductSummaryImage({
  image,
  name,
  variant = 'checkout',
}: Pick<OrderProductSummaryProps, 'image' | 'name' | 'variant'>) {
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
