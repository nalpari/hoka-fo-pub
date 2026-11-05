import { InquiryFormStatePreview } from '@/app/support/inquiries/new/_components/InquiryFormStatePreview';

/** 주문 상품 조회 모달을 열린 상태로 표시합니다. (Displays the order product lookup dialog open.) */
export default function Page() {
  return <InquiryFormStatePreview state="order-lookup" lookupPreview={{ period: 'custom' }} />;
}
