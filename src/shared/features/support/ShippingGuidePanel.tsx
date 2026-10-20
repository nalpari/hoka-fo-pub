import type { ReactNode } from 'react';
import { ShippingReturnsGuidePanel, ShippingReturnsNumberedList } from './ShippingReturnsGuide';

const shippingItems: ReactNode[] = [
  <>
    현재 HOKA는 고객님들의 편의를 위해 전상품을 무료로 배송해드리고 있습니다.
    <br />
    (단, 반품 시 최초 구매건에 대한 배송비 포함하여 반품 배송비 차감)
  </>,
  <>
    결제일로부터 1~5일 이내에 상품이 출고됩니다.
    <br />
    (토, 일 공휴일 제외)
    <br />
    단, 제주도 및 기타 도서산간지역의 경우 또는 택배사의 사정에 따라 1~2일 배송이 지연될 수
    있습니다.
  </>,
  '배송은 본사 물류센터(HOKA 지정업체) 또는 매장에서 발송(HOKA 지정업체) 됩니다.',
  '“마이페이지 > 구매내역 > 주문/배송 조회” 에서 구매하신 상품의 배송 상태를 확인하실 수 있습니다.',
];

export function ShippingGuidePanel() {
  return (
    <ShippingReturnsGuidePanel title="배송 안내">
      <ShippingReturnsNumberedList items={shippingItems} />
    </ShippingReturnsGuidePanel>
  );
}
