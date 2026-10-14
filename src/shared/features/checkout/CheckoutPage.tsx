'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StepIndicator } from '@/shared/components/molecules/StepIndicator/StepIndicator';
import { products } from '@/mocks/products';
import type { CartItem } from '@/shared/types/cart';
import { css } from 'styled-system/css';

const page = css({
  maxW: '1100px',
  mx: 'auto',
  pt: { base: '62px', _mobile: '38px' },
  px: { base: '0', _mobile: '4' },
  pb: { base: '110px', _mobile: '62px' },
});

const titleRow = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: '10',
});

const layout = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr 360px', _mobile: '1fr' },
  gap: { base: '60px', _mobile: '10' },
  alignItems: 'start',
});

const section = css({ display: 'grid', gap: '4', mb: '10' });

const summary = css({ display: 'grid', gap: '3', p: '26px', bg: 'var(--color-black-10)' });

const summaryRow = css({ display: 'flex', justifyContent: 'space-between', gap: '4' });

const done = css({ display: 'grid', justifyItems: 'center', gap: '14px', py: '20' });

const paymentMethods = [
  { value: 'card', label: '신용/체크카드' },
  { value: 'transfer', label: '계좌이체' },
] as const;

type PaymentMethod = (typeof paymentMethods)[number]['value'];

type Props = {
  cart: CartItem[];
  onComplete: () => void;
};

const stepItems = [{ label: '장바구니' }, { label: '주문/결제' }, { label: '주문완료' }];

export function CheckoutPage({ cart, onComplete }: Props) {
  const [payment, setPayment] = useState<PaymentMethod>('card');
  const [completed, setCompleted] = useState(false);

  const rows = cart.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ item, product }] : [];
  });
  const total = rows.reduce((sum, { item, product }) => sum + product.price * item.quantity, 0);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCompleted(true);
    onComplete();
  };

  return (
    <main className={page}>
      <header className={titleRow}>
        <h1 className={css({ m: '0', fontSize: '32' })}>{completed ? '주문완료' : '주문/결제'}</h1>
        <StepIndicator
          ariaLabel="주문 진행 단계"
          current={completed ? 3 : 2}
          items={stepItems}
          mobileHidden
        />
      </header>
      {completed ? (
        <section className={done}>
          <Typography as="p" variant="body1" weight="bold">
            주문이 완료되었습니다.
          </Typography>
          <ButtonLink href="/products" variant="primary">
            쇼핑 계속하기
          </ButtonLink>
        </section>
      ) : rows.length === 0 ? (
        <section className={done}>
          <p className={css({ m: '0' })}>주문할 상품이 없습니다.</p>
          <Link href="/products">쇼핑 계속하기</Link>
        </section>
      ) : (
        <form className={layout} onSubmit={submit}>
          <div>
            <section className={section}>
              <Typography as="h2" variant="body1" weight="bold">
                배송 정보
              </Typography>
              <FormField variant="boxed" htmlFor="checkout-name" label="받는 분" required>
                <TextInput id="checkout-name" name="name" autoComplete="name" required />
              </FormField>
              <FormField variant="boxed" htmlFor="checkout-phone" label="연락처" required>
                <TextInput
                  id="checkout-phone"
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  required
                />
              </FormField>
              <FormField variant="boxed" htmlFor="checkout-address" label="주소" required>
                <TextInput
                  id="checkout-address"
                  name="address"
                  autoComplete="street-address"
                  required
                />
              </FormField>
            </section>
            <section className={section}>
              <Typography as="h2" variant="body1" weight="bold">
                결제 수단
              </Typography>
              <Radio
                ariaLabel="결제 수단"
                onValueChange={setPayment}
                options={paymentMethods}
                value={payment}
              />
            </section>
          </div>
          <aside className={summary}>
            <Typography as="h2" variant="body1" weight="bold">
              주문 상품
            </Typography>
            {rows.map(({ item, product }) => (
              <div
                className={summaryRow}
                key={`${item.id}-${item.color}-${item.width}-${item.size}`}
              >
                <span>
                  {product.name}
                  <Typography
                    as="small"
                    variant="body4"
                    tone="tertiary"
                    className={css({ display: 'block' })}
                  >
                    {item.color} / {item.width} / {item.size} · {item.quantity}개
                  </Typography>
                </span>
                <b>{(product.price * item.quantity).toLocaleString()}원</b>
              </div>
            ))}
            <div className={summaryRow}>
              <span>배송비</span>
              <b>0원</b>
            </div>
            <div className={summaryRow}>
              <strong>총 결제금액</strong>
              <strong className={css({ color: 'var(--color-red-80)' })}>
                {total.toLocaleString()}원
              </strong>
            </div>
            <Button type="submit" variant="primary" fullWidth>
              결제하기
            </Button>
          </aside>
        </form>
      )}
    </main>
  );
}
