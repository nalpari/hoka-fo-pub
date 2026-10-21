import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { OrderActionBar } from '@/shared/components/molecules/OrderActionBar/OrderActionBar';
import { CouponDialog } from './CouponDialog';
import { CheckoutPaymentNotice } from './CheckoutPaymentNotice';
import { CheckoutAgreement } from './CheckoutAgreement';
import { CheckoutPayment, type PaymentMethod } from './CheckoutPayment';
import { CheckoutShipping, type ShippingErrors } from './CheckoutShipping';
import { CheckoutSummary } from './CheckoutSummary';
import type { CheckoutRow } from './checkout-summary';

type Props = {
  rows: readonly CheckoutRow[];
  total: number;
  discount: number;
  payment: PaymentMethod;
  errors: ShippingErrors;
  couponOpen: boolean;
  agreed: boolean;
  agreementError: boolean;
  onPaymentChange: (payment: PaymentMethod) => void;
  onCoupons: () => void;
  onCouponOpenChange: (open: boolean) => void;
  onDiscountChange: (discount: number) => void;
  onAgreedChange: (checked: boolean) => void;
};

/** Prepared checkout sections; the form owns validation, consent and coupon state. */
export function CheckoutContent({
  rows,
  total,
  discount,
  payment,
  errors,
  couponOpen,
  agreed,
  agreementError,
  onPaymentChange,
  onCoupons,
  onCouponOpenChange,
  onDiscountChange,
  onAgreedChange,
}: Props) {
  return (
    <Stack gap={{ base: '10', _mobile: '6' }}>
      <CheckoutShipping errors={errors} />
      <CheckoutSummary rows={rows} total={total} discount={discount} onCoupons={onCoupons} />
      <CouponDialog
        open={couponOpen}
        onOpenChange={onCouponOpenChange}
        rows={rows}
        total={total}
        onApply={onDiscountChange}
      />
      <CheckoutPayment payment={payment} onPaymentChange={onPaymentChange} />
      <CheckoutPaymentNotice />
      <CheckoutAgreement agreed={agreed} error={agreementError} onAgreedChange={onAgreedChange} />
      <OrderActionBar>
        <Button type="submit" variant="primary" fullWidth>
          {(total - discount).toLocaleString()}원 결제하기
        </Button>
      </OrderActionBar>
    </Stack>
  );
}
