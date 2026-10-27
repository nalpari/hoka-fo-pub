import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { CheckoutRow } from '@/shared/features/checkout/checkout-summary';
import { CheckoutProductList } from './CheckoutProductList';
import { CheckoutDiscountSummary } from './CheckoutDiscountSummary';

/** 주문 상품과 할인 및 결제 금액을 표시합니다. (Displays ordered products, discounts, and payment totals.) */
export function CheckoutSummary({
  rows,
  total,
  discount = 0,
  coupon,
  maxBenefit,
  onCouponChange,
  onMaxBenefitChange,
}: {
  rows: readonly CheckoutRow[];
  total: number;
  discount?: number;
  coupon: string;
  maxBenefit: boolean;
  onCouponChange: (coupon: string) => void;
  onMaxBenefitChange: (checked: boolean) => void;
}) {
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
      <CheckoutDiscountSummary
        total={total}
        discount={discount}
        itemCount={rows.reduce((count, { item }) => count + item.quantity, 0)}
        coupon={coupon}
        maxBenefit={maxBenefit}
        onCouponChange={onCouponChange}
        onMaxBenefitChange={onMaxBenefitChange}
      />
    </ContentSection>
  );
}
