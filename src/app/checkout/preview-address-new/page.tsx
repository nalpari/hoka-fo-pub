import { CheckoutStatePreview } from '@/app/checkout/_components/CheckoutStatePreview';

/** 배송지 추가 팝업을 직접 표시합니다. (Displays the address creation dialog directly.) */
export default function Page() {
  return <CheckoutStatePreview state="address-new" />;
}
