import { notFound } from 'next/navigation';

import { OrdersPage } from '@/app/mypage/orders/_components/OrdersPage';
import { orderPreviews } from '@/app/mypage/orders/orderPreviews';
import { previewOrders } from '@/components/orders/orders.data';
/** 주문 관련 확인창과 신청 마크업을 직접 표시합니다. (Displays prepared order dialogs and claim forms directly.) */
export default async function Page({
  params,
}: {
  params: Promise<{
    preview: string;
  }>;
}) {
  const { preview } = await params;
  const entry = orderPreviews.find((item) => item.href.endsWith('/' + preview));
  if (!entry) notFound();
  if (entry.state === 'cancel' || entry.state === 'return')
    return (
      <OrdersPage
        initialOrders={[previewOrders[entry.state === 'return' ? 2 : 0]]}
        initialClaimKind={entry.state}
      />
    );
  return <OrdersPage initialOrders={[previewOrders[0]]} initialOverlay={entry.state} />;
}
