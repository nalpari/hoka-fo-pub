'use client';

import { useState, type FormEventHandler } from 'react';
import Link from 'next/link';
import { Box, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import {
  CheckoutPayment,
  CheckoutShipping,
  type PaymentMethod,
} from '@/shared/features/checkout/CheckoutFields';
import { CheckoutSummary } from '@/shared/features/checkout/CheckoutSummary';
import type { CheckoutRow } from '@/shared/features/checkout/checkout-summary';

const checkoutButton = css({
  position: { base: 'static', _mobile: 'fixed' },
  bottom: '0',
  left: '0',
  right: '0',
  zIndex: '2',
  bg: 'white',
  borderTop: { base: '0', _mobile: '1px solid var(--colors-black-20)' },
  px: { base: '0', _mobile: '4' },
  pt: { base: '0', _mobile: '4' },
  pb: { base: '0', _mobile: '8' },
});

type CheckoutContentProps = {
  completed: boolean;
  rows: readonly CheckoutRow[];
  total: number;
  payment: PaymentMethod;
  onPaymentChange: (payment: PaymentMethod) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function CheckoutContent({
  completed,
  rows,
  total,
  payment,
  onPaymentChange,
  onSubmit,
}: CheckoutContentProps) {
  const [errors, setErrors] = useState<Partial<Record<'name' | 'phone' | 'address', string>>>({});
  const [agreed, setAgreed] = useState(false);

  if (completed)
    return (
      <Stack as="section" alignItems="center" gap="4" py="20">
        <Typography as="p" web="heading7" mo="heading7">
          주문이 완료되었습니다.
        </Typography>
        <ButtonLink href="/products" variant="primary">
          쇼핑 계속하기
        </ButtonLink>
      </Stack>
    );

  if (rows.length === 0)
    return (
      <Stack as="section" alignItems="center" gap="4" py="20">
        <Typography as="p" web="body3" mo="body3">
          주문할 상품이 없습니다.
        </Typography>
        <Link href="/cart">장바구니로 돌아가기</Link>
      </Stack>
    );

  return (
    <form
      noValidate
      onInput={(event) => {
        const input = event.target as HTMLInputElement;
        if (input.value.trim()) setErrors((previous) => ({ ...previous, [input.name]: undefined }));
      }}
      onSubmit={(event) => {
        const data = new FormData(event.currentTarget);
        const nextErrors = {
          name: String(data.get('name') ?? '').trim() ? '' : '받는 분을 입력해 주세요.',
          phone: String(data.get('phone') ?? '').trim() ? '' : '연락처를 입력해 주세요.',
          address: String(data.get('address') ?? '').trim() ? '' : '주소를 입력해 주세요.',
        };
        setErrors(nextErrors);
        if (Object.values(nextErrors).some(Boolean) || !agreed) {
          event.preventDefault();
          return;
        }
        onSubmit(event);
      }}
    >
      <Stack gap={{ base: '10', _mobile: '6' }}>
        <CheckoutShipping errors={errors} />
        <CheckoutSummary rows={rows} total={total} />
        <CheckoutPayment payment={payment} onPaymentChange={onPaymentChange} />
        <Stack gap="2" pt="4" borderTop="1px solid var(--colors-black-20)">
          <Typography web="body5" mo="body5" tone="subtle">
            아래 [결제하기] 버튼을 클릭하면 선택한 결제방법에 맞는 결제 창이 나타납니다.
          </Typography>
          <Typography web="body5" mo="body5" tone="subtle">
            결제 창을 통해 입력되는 고객님의 정보는 안전하게 암호화되어 전송됩니다.
          </Typography>
          <Typography web="body5" mo="body5" tone="subtle">
            결제 신청 시 승인 진행에 다소 시간이 소요될 수 있으므로 결과 화면이 나타날 때까지 기다려
            주십시오.
          </Typography>
        </Stack>
        <Checkbox
          checked={agreed}
          onCheckedChange={setAgreed}
          label={
            <Typography web="body4" mo="body4">
              주문 내용을 확인하였으며 결제에 동의합니다.
            </Typography>
          }
        />
        <Box className={checkoutButton}>
          <Button type="submit" variant="primary" fullWidth>
            {total.toLocaleString()}원 결제하기
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
