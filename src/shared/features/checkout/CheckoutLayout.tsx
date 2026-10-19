import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { OrderPageLayout } from '@/shared/components/layouts/OrderPageLayout/OrderPageLayout';

export function CheckoutLayout({
  completed,
  children,
}: {
  completed: boolean;
  children: ReactNode;
}) {
  return (
    <OrderPageLayout
      step={completed ? 3 : 2}
      title={
        <Typography as="h1" variant="pageTitle" className={css({ m: '0' })}>
          {completed ? '주문완료' : '주문/결제'}
        </Typography>
      }
    >
      {children}
    </OrderPageLayout>
  );
}
