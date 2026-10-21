import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Radio } from '@/shared/components/atoms/Radio/Radio';

const paymentMethods = [
  { value: 'kakao', label: '카카오페이' },
  { value: 'naver', label: '네이버페이' },
  { value: 'toss', label: '토스페이' },
  { value: 'card', label: '신용카드' },
  { value: 'samsung', label: '삼성페이' },
  { value: 'payco', label: '페이코' },
] as const;

export type PaymentMethod = (typeof paymentMethods)[number]['value'];

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
      <Radio<PaymentMethod>
        ariaLabel="결제 수단"
        name="paymentMethod"
        variant="custom"
        value={payment}
        onValueChange={onPaymentChange}
        className={css({ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1!' })}
        optionClassName={css({
          minH: '56px',
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
              {method.value === 'kakao' ? (
                <img
                  src="/images/checkout/kakaopay.png"
                  alt=""
                  className={css({ w: '28px', h: '16px', objectFit: 'contain' })}
                />
              ) : null}
              <Typography variant="body5">{method.label}</Typography>
            </Stack>
          ),
        }))}
      />
      <Stack gap="1" pt="2">
        {[1, 2, 3].map((index) => (
          <Typography key={index} variant="body5" tone="subtle">
            - {paymentMethods.find((method) => method.value === payment)?.label} 안내사항 {index}
          </Typography>
        ))}
      </Stack>
    </ContentSection>
  );
}
