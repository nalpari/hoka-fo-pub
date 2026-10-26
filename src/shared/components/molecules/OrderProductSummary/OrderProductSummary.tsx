import { OrderProductSummaryImage } from './OrderProductSummaryImage';
import { HStack } from 'styled-system/jsx';
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
  hideAmount,
}: OrderProductSummaryProps) {
  return (
    <HStack
      gap={variant === 'cart' ? { base: '4', _mobile: '0' } : '4'}
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
