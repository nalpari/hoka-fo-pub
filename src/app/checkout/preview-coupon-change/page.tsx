import { CheckoutStatePreview } from '@/app/checkout/_components/CheckoutStatePreview';

/** 쿠폰 변경 확인 얼럿을 바로 표시합니다. (Opens the coupon change confirmation directly.) */
export default function Page() {
  return <CheckoutStatePreview state="coupon-change" />;
}
