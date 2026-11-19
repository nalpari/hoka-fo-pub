'use client';

import Image from 'next/image';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

const styles = {
  paymentImage: css({
    w: '60px',
    maxW: 'none',
    display: 'block',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  }),
  paymentGroup: css({
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
    _mobile: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
    gap: { base: '8px!', _mobile: '4px!' },
  }),
  paymentOption: css({
    minH: '80px',
    _mobile: { minH: '85px' },
    p: '0',
    bg: 'transparent',
    border: '1px solid var(--color-border-tertiary)',
    cursor: 'pointer',
    _focusVisible: { outline: '2px solid var(--colors-black-100)', outlineOffset: '2px' },
  }),
};

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

/** 결제 타일의 원본 브랜드 이미지를 표시합니다. (Displays the original payment brand artwork.) */
function CheckoutPaymentMark({ method }: { method: PaymentMethod }) {
  const mobile = usePlatform() === 'mobile';
  const height = method === 'toss' ? 30 : method === 'card' ? 18 : 14;
  return (
    <Box h="14px" w="60px" pos="relative" aria-hidden="true">
      <Image
        src={`/images/checkout/payment-${mobile ? 'mobile-' : ''}${method}.png`}
        alt=""
        width={60}
        height={height}
        sizes="60px"
        className={styles.paymentImage}
      />
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
      className={styles.paymentGroup}
      optionClassName={styles.paymentOption}
      selectedOptionClassName={css({ borderColor: 'black.100!' })}
      options={paymentMethods.map((method) => ({
        value: method.value,
        label: (
          <Stack
            h="100%"
            alignItems={{ base: 'flex-start', _mobile: 'center' }}
            justifyContent="center"
            gap={{ base: '4px', _mobile: '10px' }}
            pos="relative"
            pl={{ base: '16px', _mobile: '0' }}
          >
            <CheckoutPaymentMark method={method.value} />
            <Typography variant="body4">{method.label}</Typography>
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
      gap={{ base: '16px', _mobile: '12px' }}
      title="결제 정보"
      headerProps={{
        titleAs: 'h2',
        titleProps: { web: 'heading7', mo: 'heading6' },
        className: css({ pb: { base: '8px', _mobile: '0' } }),
      }}
    >
      <CheckoutPaymentMethods payment={payment} onPaymentChange={onPaymentChange} />
      <CheckoutPaymentMethodNotice
        label={paymentMethods.find((method) => method.value === payment)?.label}
      />
    </ContentSection>
  );
}
