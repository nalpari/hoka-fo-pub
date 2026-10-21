'use client';

import { useState, type FormEventHandler } from 'react';
import Link from 'next/link';
import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CheckoutComplete } from './CheckoutComplete';
import { CheckoutContent } from './CheckoutContent';
import type { PaymentMethod } from './CheckoutPayment';
import type { CheckoutRow } from './checkout-summary';

type CheckoutFormProps = {
  completed: boolean;
  rows: readonly CheckoutRow[];
  total: number;
  payment: PaymentMethod;
  onPaymentChange: (payment: PaymentMethod) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function CheckoutForm({
  completed,
  rows,
  total,
  payment,
  onPaymentChange,
  onSubmit,
}: CheckoutFormProps) {
  const [errors, setErrors] = useState<Partial<Record<'name' | 'phone' | 'address', string>>>({});
  const [couponOpen, setCouponOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [agreementError, setAgreementError] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (completed) return <CheckoutComplete />;

  if (rows.length === 0)
    return (
      <Stack as="section" alignItems="center" gap="4" py="20">
        <Typography as="p" variant="body3">
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
        setAgreementError(!agreed);
        if (Object.values(nextErrors).some(Boolean) || !agreed) {
          event.preventDefault();
          return;
        }
        onSubmit(event);
      }}
    >
      <CheckoutContent
        rows={rows}
        total={total}
        discount={discount}
        payment={payment}
        errors={errors}
        couponOpen={couponOpen}
        agreed={agreed}
        agreementError={agreementError}
        onPaymentChange={onPaymentChange}
        onCoupons={() => setCouponOpen(true)}
        onCouponOpenChange={setCouponOpen}
        onDiscountChange={setDiscount}
        onAgreedChange={(checked) => {
          setAgreed(checked);
          setAgreementError(false);
        }}
      />
    </form>
  );
}
