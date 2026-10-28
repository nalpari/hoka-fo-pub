import { CheckoutPaymentMethodNotice } from './CheckoutPaymentMethodNotice';
import type { PaymentMethod } from './CheckoutPaymentMethods';
import { CheckoutPaymentMethods, paymentMethods } from './CheckoutPaymentMethods';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';

export type { PaymentMethod } from './CheckoutPaymentMethods';

/** 결제 수단을 선택 가능한 타일로 표시합니다. (Displays selectable payment method tiles.) */
export function CheckoutPayment({
  payment,
  onPaymentChange,
}: {
  payment: PaymentMethod;
  onPaymentChange: (payment: PaymentMethod) => void;
}) {
  return (
    <ContentSection
      as="section"
      gap="4"
      title="결제 정보"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading9', mo: 'heading7' } }}
    >
      <CheckoutPaymentMethods payment={payment} onPaymentChange={onPaymentChange} />
      <CheckoutPaymentMethodNotice
        label={paymentMethods.find((method) => method.value === payment)?.label}
      />
    </ContentSection>
  );
}
