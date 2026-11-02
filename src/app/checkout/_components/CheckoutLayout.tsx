'use client';

import { type ReactNode } from 'react';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { OrderPageLayout } from '@/components/orders/OrderPageLayout';

/** 주문서와 완료 화면의 제목 프레임을 구성합니다. (Composes checkout and completion title frames.) */
export function CheckoutLayout({
  completed,
  children,
}: {
  completed: boolean;
  children: ReactNode;
}) {
  return (
    <OrderPageLayout
      title={
        completed ? null : (
          /** 주문/결제 페이지 제목 */
          <ContentHeader
            title="주문/결제"
            titleAs="h1"
            titleProps={{ web: 'heading6', mo: 'heading5' }}
          />
        )
      }
      maxWidth={completed ? 'none' : undefined}
      paddingX={completed ? { base: '72px', _mobile: '16px' } : undefined}
    >
      {children}
    </OrderPageLayout>
  );
}
