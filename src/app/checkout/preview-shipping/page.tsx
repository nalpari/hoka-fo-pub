import { CheckoutStatePreview } from '@/app/checkout/_components/CheckoutStatePreview';

/** 지정한 디자인 상태를 직접 표시합니다. (Displays the specified design state directly.) */
export default function Page() {
  return <CheckoutStatePreview state="shipping" />;
}
