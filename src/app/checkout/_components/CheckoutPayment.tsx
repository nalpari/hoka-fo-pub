'use client';

import Image from 'next/image';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { Icon } from '@/components/common/atoms/Icon';
import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

/** 선택한 결제 수단의 안내를 표시합니다. (Displays notices for the selected payment method.) */
function CheckoutPaymentMethodNotice({ label }: { label: string | undefined }) {
  return (
    <Stack gap="1" pt="2">
      {[1, 2, 3].map((index) => (
        <Typography key={index} variant="body5" tone="subtle">
          - {label} 안내사항 {index}
        </Typography>
      ))}
    </Stack>
  );
}

const marks = { naver: 'N pay', toss: 'toss', samsung: 'SAMSUNG pay', payco: 'PAYCO' } as const;

/** 결제 타일의 브랜드 표시 영역을 구성합니다. (Displays the payment tile brand mark.) */
function CheckoutPaymentMark({ method }: { method: PaymentMethod }) {
  return (
    <Box h="4" display="flex" alignItems="center" justifyContent="center" aria-hidden="true">
      {method === 'kakao' ? (
        <Image
          src="/images/checkout/kakaopay.png"
          alt=""
          width={28}
          height={16}
          sizes="28px"
          className={css({ w: '28px', h: '16px', objectFit: 'contain' })}
        />
      ) : method === 'card' ? (
        <Icon name="credit-card-solid" size={16} />
      ) : (
        <Typography
          variant="body5"
          weight="bold"
          className={css({
            color: method === 'payco' ? 'red.100' : method === 'naver' ? '#00a949' : '#2357c9',
          })}
        >
          {marks[method]}
        </Typography>
      )}
    </Box>
  );
}

const paymentMethods = [
  { value: 'kakao', label: '카카오페이' },
  { value: 'naver', label: '네이버페이' },
  { value: 'toss', label: '토스페이' },
  { value: 'card', label: '신용카드' },
  { value: 'samsung', label: '삼성페이' },
  { value: 'payco', label: '페이코' },
] as const;

export type PaymentMethod = (typeof paymentMethods)[number]['value'];

/** 결제 수단 타일과 선택 상태를 표시합니다. (Displays payment method tiles and their selection state.) */
function CheckoutPaymentMethods({
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
            <Icon
              name={`radio-${payment === method.value ? 'checked' : 'unchecked'}`}
              size={16}
              alt=""
            />
          </Stack>
        ),
      }))}
    />
  );
}

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
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading7', mo: 'heading6' } }}
    >
      <CheckoutPaymentMethods payment={payment} onPaymentChange={onPaymentChange} />
      <CheckoutPaymentMethodNotice
        label={paymentMethods.find((method) => method.value === payment)?.label}
      />
    </ContentSection>
  );
}
