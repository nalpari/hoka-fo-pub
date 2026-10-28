// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type OrderProductSummaryProps as ImportedOrderProductSummaryProps } from '@/components/common/molecules/OrderProductSummary/OrderProductSummary';
import { type ReactNode } from 'react';
/** 주문 상품 이미지의 용도별 크기와 배경을 표시합니다. (Displays an order product image with context-specific sizing and background.) */
declare function OrderProductSummaryImage({
  image,
  name,
  variant,
}: Pick<
  ImportedOrderProductSummaryProps,
  'image' | 'name' | 'variant'
>): import('react').JSX.Element;
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
declare function OrderProductSummaryContent({
  name,
  optionText,
  amount,
  gender,
  variant,
  children,
  hideAmount,
}: OrderProductSummaryContentProps): import('react').JSX.Element;
export type OrderProductSummaryProps = OrderProductSummaryContentProps & {
  image: string;
};
/** 주문 상품 정보를 표시하고 선택과 금액 계산은 호출자가 담당합니다. (Displays prepared order product information.) */
export declare function OrderProductSummary({
  image,
  name,
  optionText,
  amount,
  gender,
  variant,
  children,
  hideAmount,
}: OrderProductSummaryProps): import('react').JSX.Element;
export {
  OrderProductSummaryImage,
  OrderProductSummaryContent,
  type OrderProductSummaryContentProps,
};
