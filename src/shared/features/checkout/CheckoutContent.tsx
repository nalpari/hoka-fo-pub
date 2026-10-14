import type { FormEventHandler } from 'react';
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
    <form className={layout} onSubmit={onSubmit}>
      <CheckoutFields payment={payment} onPaymentChange={onPaymentChange} />
      <CheckoutSummary rows={rows} total={total} />
    </form>
  );
}
