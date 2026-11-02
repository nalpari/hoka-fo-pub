import { InquiryOrderLookup } from '@/app/support/inquiries/new/order-products/_components/InquiryOrderLookup';

/** 직접설정 기간으로 주문상품 조회 화면을 엽니다. (Opens order lookup with the custom date range selected.) */
export default function Page() {
  return <InquiryOrderLookup preview={{ period: 'custom' }} />;
}
