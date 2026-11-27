'use client';

import Image from 'next/image';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

const styles = {
  notice: css({ whiteSpace: 'pre-line' }),
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

const paymentNotices: Record<PaymentMethod, readonly string[]> = {
  kakao: [
    '카카오톡앱에 카드나 카카오머니를 등록하여 결제비밀번호 또는 지문인증 등으로 결제할 수 있는 간편결제 서비스입니다.',
    '카카오페이에서 제공하는 카드사별 무이자, 할인혜택을 받을 수 있습니다.',
  ],
  naver: [
    '브라우저 AI 확장프로그램 사용 시 네이버페이 결제가 정상적으로 진행되지 않을 수 있습니다.\n확장프로그램을 비활성화하거나 다른 결제수단을 이용해 주세요.',
    '네이버페이는 네이버ID로 별도 앱 설치 없이 신용카드 또는 은행계좌 정보를 등록하여 네이버페이 비밀번호로 결제할 수 있는 간편결제 서비스입니다.',
    '주문 변경 시 카드사 혜택 및 할부 적용 여부는 해당 카드사 정책에 따라 변경될 수 있습니다.',
    '네이버페이에서 제공하는 카드사별 무이자, 할인혜택을 받을 수 있습니다.',
  ],
  toss: [
    '토스는 비밀번호 혹은 지문인식 등의 간단한 방법으로 결제할 수 있는 간편 결제 서비스입니다.',
    '토스에서 제공되는 카드사별 무이자, 할인혜택을 받을 수 있습니다.',
    '단 한번의 인증으로 소유한 여러 계좌를 한번에 관리할 수 있습니다.',
    '결제에 사용할 은행계좌는 휴대폰명의자와 일치해야합니다.',
    '토스머니 잔액 부족 시 자동 충전 후 결제됩니다.취소 시 토스머니로 환불됩니다.',
  ],
  samsung: [
    '삼성페이 간편결제는 삼성에서 운영하는 온 / 오프라인 통합 간편결제 서비스입니다.',
    '일부 카드사별 제휴 서비스는 카드 상품에 따라 지원 여부가 상이하므로, 카드사 고객센터에 문의하시기 바랍니다.',
  ],
  payco: [
    'PAYCO는 온/오프라인 쇼핑은 물론 송금, 멤버십 적립까지 가능한 통합서비스입니다.',
    'PAYCO에서 제공하는 카드사별 무이자, 할인혜택을 받을 수 있습니다.',
  ],
  card: [],
};

/** 선택한 결제 수단의 안내를 표시합니다. (Displays notices for the selected payment method.) */
function CheckoutPaymentMethodNotice({ method }: { method: PaymentMethod }) {
  const notices = paymentNotices[method];
  if (!notices.length) return null;

  return (
    <Stack gap="1" pt="2">
      {notices.map((notice) => (
        <Typography key={notice} as="p" variant="b8" tone="subtle" className={styles.notice}>
          * {notice}
        </Typography>
      ))}
    </Stack>
  );
}

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
            <Typography variant="b6M">{method.label}</Typography>
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
        titleProps: { web: 'h8', mo: 'h8' },
        className: css({ pb: { base: '8px', _mobile: '0' } }),
      }}
    >
      <CheckoutPaymentMethods payment={payment} onPaymentChange={onPaymentChange} />
      <CheckoutPaymentMethodNotice method={payment} />
    </ContentSection>
  );
}
