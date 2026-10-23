import { HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { square } from 'styled-system/patterns';
import {
  OrderProductSummaryContent,
  type OrderProductSummaryContentProps,
} from './OrderProductSummaryContent';

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
}: OrderProductSummaryProps) {
  return (
    <HStack
      gap={variant === 'cart' ? { base: '4', _mobile: '0' } : '4'}
      alignItems={variant === 'cart' ? { base: 'flex-start', _mobile: 'center' } : 'flex-start'}
      py={variant === 'checkout' ? '6' : '0'}
      borderBottom={variant === 'checkout' ? '1px solid var(--colors-black-20)' : '0'}
    >
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
                _mobile: { w: '128px', h: '100px', px: '14px' },
              })
            : square({
                size: { base: variant === 'coupon' ? '88px' : '24', _mobile: '20' },
                display: 'block',
                objectFit: 'contain',
                bg: 'black.10',
              })
        }
      />
      <OrderProductSummaryContent
        name={name}
        optionText={optionText}
        amount={amount}
        gender={gender}
        variant={variant}
      >
        {children}
      </OrderProductSummaryContent>
    </HStack>
  );
}
