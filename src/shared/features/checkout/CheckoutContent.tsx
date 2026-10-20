'use client';
import { OrderActionBar } from '@/shared/components/molecules/OrderActionBar/OrderActionBar';

import { CouponDialog } from './CouponDialog';
import { CheckoutComplete } from './CheckoutComplete';
import { CheckoutPaymentNotice } from './CheckoutPaymentNotice';
import { useState, type FormEventHandler } from 'react';
import Link from 'next/link';
import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { CheckoutAgreement } from './CheckoutAgreement';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CheckoutPayment, type PaymentMethod } from './CheckoutPayment';
import { CheckoutShipping } from './CheckoutShipping';
import { CheckoutSummary } from '@/shared/features/checkout/CheckoutSummary';
import type { CheckoutRow } from '@/shared/features/checkout/checkout-summary';

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
      <Stack gap={{ base: '10', _mobile: '6' }}>
        <CheckoutShipping errors={errors} />
        <CheckoutSummary
          rows={rows}
          total={total}
          discount={discount}
          onCoupons={() => setCouponOpen(true)}
        />
        <CouponDialog
          open={couponOpen}
          onOpenChange={setCouponOpen}
          rows={rows}
          total={total}
          onApply={setDiscount}
        />
        <CheckoutPayment payment={payment} onPaymentChange={onPaymentChange} />
        <CheckoutPaymentNotice />
        <CheckoutAgreement
          agreed={agreed}
          error={agreementError}
          onAgreedChange={(checked) => {
            setAgreed(checked);
            setAgreementError(false);
          }}
        />
        <OrderActionBar>
          <Button type="submit" variant="primary" fullWidth>
            {(total - discount).toLocaleString()}원 결제하기
          </Button>
        </OrderActionBar>
      </Stack>
    </form>
  );
}
