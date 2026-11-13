import { CheckoutStatePreview } from '@/app/checkout/_components/CheckoutStatePreview';

/** 배송지 수정 팝업을 직접 표시합니다. (Displays the address editing dialog directly.) */
export default function Page() {
  return <CheckoutStatePreview state="address-edit" />;
}
