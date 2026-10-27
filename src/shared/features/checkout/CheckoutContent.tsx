import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { OrderActionBar } from '@/shared/components/molecules/OrderActionBar/OrderActionBar';
import { CheckoutPaymentNotice } from './CheckoutPaymentNotice';
import { CheckoutAgreement } from './CheckoutAgreement';
import { CheckoutPayment, type PaymentMethod } from './CheckoutPayment';
import { CheckoutShipping, type ShippingErrors } from './CheckoutShipping';
import { CheckoutSummary } from './CheckoutSummary';
import { checkoutShippingFee, type CheckoutRow } from './checkout-summary';

type Props = {
  rows: readonly CheckoutRow[];
  total: number;
  discount: number;
  payment: PaymentMethod;
  errors: ShippingErrors;
  coupon: string;
  maxBenefit: boolean;
  orderAgreed: boolean;
  privacyAgreed: boolean;
  agreementError: boolean;
  onPaymentChange: (payment: PaymentMethod) => void;
  onCouponChange: (coupon: string) => void;
  onMaxBenefitChange: (checked: boolean) => void;
  onOrderAgreedChange: (checked: boolean) => void;
  onPrivacyAgreedChange: (checked: boolean) => void;
};

/** Prepared checkout sections; the form owns validation, consent and coupon state. */
export function CheckoutContent({
  rows,
  total,
  discount,
  payment,
  errors,
  coupon,
  maxBenefit,
  orderAgreed,
  privacyAgreed,
  agreementError,
  onPaymentChange,
  onCouponChange,
  onMaxBenefitChange,
  onOrderAgreedChange,
  onPrivacyAgreedChange,
}: Props) {
  return (
    <Stack gap={{ base: '10', _mobile: '6' }}>
      <CheckoutShipping errors={errors} />
      <CheckoutSummary
        rows={rows}
        total={total}
        discount={discount}
        coupon={coupon}
        maxBenefit={maxBenefit}
        onCouponChange={onCouponChange}
        onMaxBenefitChange={onMaxBenefitChange}
      />
      <CheckoutPayment payment={payment} onPaymentChange={onPaymentChange} />
      <CheckoutPaymentNotice />
      <CheckoutAgreement
        orderAgreed={orderAgreed}
        privacyAgreed={privacyAgreed}
        error={agreementError}
        onOrderAgreedChange={onOrderAgreedChange}
        onPrivacyAgreedChange={onPrivacyAgreedChange}
      />
      <OrderActionBar>
        <Button type="submit" variant="primary" fullWidth>
          {(total - discount + checkoutShippingFee).toLocaleString()}원 결제하기
        </Button>
      </OrderActionBar>
    </Stack>
  );
}
