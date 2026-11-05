import { CheckoutStatePreview } from '@/app/checkout/_components/CheckoutStatePreview';

/** 배송지 변경 모달을 열린 상태로 표시합니다. (Displays checkout with the address change modal open.) */
export default function Page() {
  return <CheckoutStatePreview state="address-change" />;
}
