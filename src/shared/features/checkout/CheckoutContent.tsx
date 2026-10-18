'use client';

import { useState, type FormEventHandler } from 'react';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CheckoutFields, type PaymentMethod } from '@/shared/features/checkout/CheckoutFields';
import { CheckoutSummary } from '@/shared/features/checkout/CheckoutSummary';
import type { CheckoutRow } from '@/shared/features/checkout/checkout-summary';

const layout = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr 360px', _mobile: '1fr' },
  gap: { base: '60px', _mobile: '10' },
  alignItems: 'start',
});

const done = css({ display: 'grid', justifyItems: 'center', gap: '14px', py: '20' });

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

  if (completed)
    return (
      <section className={done}>
        <Typography as="p" variant="body1" weight="bold">
          주문이 완료되었습니다.
        </Typography>
        <ButtonLink href="/products" variant="primary">
          쇼핑 계속하기
        </ButtonLink>
      </section>
    );
  if (rows.length === 0)
    return (
      <section className={done}>
        <p className={css({ m: '0' })}>주문할 상품이 없습니다.</p>
        <Link href="/products">쇼핑 계속하기</Link>
      </section>
    );
  return (
    <form
      noValidate
      className={layout}
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
        if (Object.values(nextErrors).some(Boolean)) {
          event.preventDefault();
          return;
        }
        onSubmit(event);
      }}
    >
      <CheckoutFields payment={payment} onPaymentChange={onPaymentChange} errors={errors} />
      <CheckoutSummary rows={rows} total={total} />
    </form>
  );
}
