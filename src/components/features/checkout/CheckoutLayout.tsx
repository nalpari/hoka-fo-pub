import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { OrderPageLayout } from '@/components/common/layouts/OrderPageLayout/OrderPageLayout';

/** 주문서와 완료 화면의 제목 및 단계 골격을 구성합니다. (Composes checkout and completion headings and progress.) */
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
        <ContentHeader
          title={completed ? '주문완료' : '주문/결제'}
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading5' }}
          className={css({ _mobile: completed ? { display: 'none' } : {} })}
        />
      }
    >
      {children}
    </OrderPageLayout>
  );
}
