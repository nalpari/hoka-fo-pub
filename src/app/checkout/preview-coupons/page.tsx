import { CheckoutStatePreview } from '@/app/checkout/_components/CheckoutStatePreview';

/** 보유 쿠폰 조회 시안을 직접 표시합니다. (Displays the coupon lookup design directly.) */
export default function Page() {
  return <CheckoutStatePreview state="coupons" />;
}
