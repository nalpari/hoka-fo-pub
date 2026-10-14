import { css } from 'styled-system/css';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const section = css({ display: 'grid', gap: '4', mb: '10' });

const paymentMethods = [
  { value: 'card', label: '신용/체크카드' },
  { value: 'transfer', label: '계좌이체' },
] as const;

export type PaymentMethod = (typeof paymentMethods)[number]['value'];

export function CheckoutFields({
  payment,
  onPaymentChange,
}: {
  payment: PaymentMethod;
  onPaymentChange: (payment: PaymentMethod) => void;
}) {
  return (
    <div>
      <section className={section}>
        <Typography as="h2" variant="body1" weight="bold">
          배송 정보
        </Typography>
        <FormField variant="boxed" htmlFor="checkout-name" label="받는 분" required>
          <TextInput id="checkout-name" name="name" autoComplete="name" required />
        </FormField>
        <FormField variant="boxed" htmlFor="checkout-phone" label="연락처" required>
          <TextInput id="checkout-phone" name="phone" autoComplete="tel" type="tel" required />
        </FormField>
        <FormField variant="boxed" htmlFor="checkout-address" label="주소" required>
          <TextInput id="checkout-address" name="address" autoComplete="street-address" required />
        </FormField>
      </section>
      <section className={section}>
        <Typography as="h2" variant="body1" weight="bold">
          결제 수단
        </Typography>
        <Radio
          ariaLabel="결제 수단"
          onValueChange={onPaymentChange}
          options={paymentMethods}
          value={payment}
        />
      </section>
    </div>
  );
}
