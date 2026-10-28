import { CheckoutPaymentMark } from './CheckoutPaymentMark';
import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Radio } from '@/components/common/atoms/Radio/Radio';

export const paymentMethods = [
  { value: 'kakao', label: '카카오페이' },
  { value: 'naver', label: '네이버페이' },
  { value: 'toss', label: '토스페이' },
  { value: 'card', label: '신용카드' },
  { value: 'samsung', label: '삼성페이' },
  { value: 'payco', label: '페이코' },
] as const;

export type PaymentMethod = (typeof paymentMethods)[number]['value'];

/** 결제 수단 타일과 선택 상태를 표시합니다. (Displays payment method tiles and their selection state.) */
export function CheckoutPaymentMethods({
  payment,
  onPaymentChange,
}: {
  payment: PaymentMethod;
  onPaymentChange: (payment: PaymentMethod) => void;
}) {
  return (
    <Radio<PaymentMethod>
      ariaLabel="결제 수단"
      name="paymentMethod"
      variant="custom"
      value={payment}
      onValueChange={onPaymentChange}
      className={css({ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1!' })}
      optionClassName={css({
        minH: '88px',
        _mobile: { minH: '110px' },
        p: '0',
        bg: 'transparent',
        border: '1px solid var(--colors-black-20)',
        cursor: 'pointer',
        _focusVisible: { outline: '2px solid var(--colors-black-100)', outlineOffset: '2px' },
      })}
      selectedOptionClassName={css({ borderColor: 'black.100!' })}
      options={paymentMethods.map((method) => ({
        value: method.value,
        label: (
          <Stack h="100%" alignItems="center" justifyContent="center" gap="1">
            <CheckoutPaymentMark method={method.value} />
            <Typography variant="body5">{method.label}</Typography>
            <img
              src={`/images/icon/form/radio-${payment === method.value ? 'checked' : 'unchecked'}.svg`}
              alt=""
              width={16}
              height={16}
            />
          </Stack>
        ),
      }))}
    />
  );
}
