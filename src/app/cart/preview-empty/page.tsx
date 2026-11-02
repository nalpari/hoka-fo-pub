import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { CartEmptyState } from '@/app/cart/_components/CartEmptyState';
import { OrderPageLayout } from '@/components/orders/OrderPageLayout';

/** 빈 장바구니 마크업을 바로 확인합니다. (Displays the empty cart markup directly.) */
export default function Page() {
  return (
    <OrderPageLayout
      title={
        <ContentHeader
          title="장바구니"
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading5' }}
          orientation="horizontal"
          gap="1"
          alignItems="baseline"
          justifyContent="flex-start"
        />
      }
    >
      <CartEmptyState />
    </OrderPageLayout>
  );
}
