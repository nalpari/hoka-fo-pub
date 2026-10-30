import { RouteContent } from '@/app/mypage/coupons/_components/CouponManagement';

/** 보유 쿠폰이 없는 고정 상태를 표시합니다. (Displays the fixed empty coupon state.) */
export default function Page() {
  return <RouteContent preview="empty" />;
}
