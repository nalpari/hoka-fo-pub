'use client';

import { useState, type FormEventHandler } from 'react';
import Link from 'next/link';
import { Stack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { CheckoutComplete } from './CheckoutComplete';
import { CheckoutContent } from './CheckoutContent';
import type { PaymentMethod } from './CheckoutPayment';
import type { CheckoutRow } from './checkout-summary';
import { getCheckoutCouponDiscount, getMaximumCheckoutCoupon } from './checkout-coupons';

type CheckoutFormProps = {
  completed: boolean;
  rows: readonly CheckoutRow[];
  total: number;
  payment: PaymentMethod;
  onPaymentChange: (payment: PaymentMethod) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

/** 결제 입력과 제출 검증 상태를 관리합니다. (Manages checkout inputs and submission validation state.) */
export function CheckoutForm({
  completed,
  rows,
  total,
  payment,
  onPaymentChange,
  onSubmit,
}: CheckoutFormProps) {
  const [errors, setErrors] = useState<Partial<Record<'name' | 'phone' | 'address', string>>>({});
  const [coupon, setCoupon] = useState('none');
  const [maxBenefit, setMaxBenefit] = useState(false);
  const discount = getCheckoutCouponDiscount(coupon, rows, total);
  const [agreementError, setAgreementError] = useState(false);
  const [orderAgreed, setOrderAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

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
        const missingAgreement = !orderAgreed || !privacyAgreed;
        setAgreementError(missingAgreement);
        if (Object.values(nextErrors).some(Boolean) || missingAgreement) {
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
        coupon={coupon}
        maxBenefit={maxBenefit}
        orderAgreed={orderAgreed}
        privacyAgreed={privacyAgreed}
        agreementError={agreementError}
        onPaymentChange={onPaymentChange}
        onCouponChange={(value) => {
          setCoupon(value);
          setMaxBenefit(false);
        }}
        onMaxBenefitChange={(checked) => {
          setMaxBenefit(checked);
          if (checked) setCoupon(getMaximumCheckoutCoupon(rows, total));
        }}
        onOrderAgreedChange={(checked) => {
          setOrderAgreed(checked);
          if (checked && privacyAgreed) setAgreementError(false);
        }}
        onPrivacyAgreedChange={(checked) => {
          setPrivacyAgreed(checked);
          if (checked && orderAgreed) setAgreementError(false);
        }}
      />
    </form>
  );
}
