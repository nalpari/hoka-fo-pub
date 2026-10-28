import OrdersPage from '@/app/mypage/orders/page';
import ReturnsPage from '@/app/mypage/returns/page';
import WishlistPage from '@/app/mypage/wishlist/page';
import RecentPage from '@/app/mypage/recent/page';
import RewardsPage from '@/app/mypage/rewards/page';
import CouponsPage from '@/app/mypage/coupons/page';
import ReferralPage from '@/app/mypage/referral/page';
import ProfilePage from '@/app/mypage/profile/page';
import ReviewsPage from '@/app/mypage/reviews/page';
import AddressesPage from '@/app/mypage/addresses/page';
import PaymentMethodsPage from '@/app/mypage/payment-methods/page';
import RestockAlertsPage from '@/app/mypage/restock-alerts/page';
import MemberActivityPage from '@/app/mypage/member-activity/page';
import RefundAccountPage from '@/app/mypage/refund-account/page';

const routes = {
  orders: OrdersPage,
  returns: ReturnsPage,
  wishlist: WishlistPage,
  recent: RecentPage,
  rewards: RewardsPage,
  coupons: CouponsPage,
  referral: ReferralPage,
  profile: ProfilePage,
  reviews: ReviewsPage,
  addresses: AddressesPage,
  'payment-methods': PaymentMethodsPage,
  'restock-alerts': RestockAlertsPage,
  'member-activity': MemberActivityPage,
  'refund-account': RefundAccountPage,
};

export type MyPageStatusKind = keyof typeof routes;

/** 스토리에서 실제 마이페이지 경로 구현을 선택합니다. (Selects the actual account route implementation for a story.) */
export function MyPageStatusPage({ kind }: { kind: MyPageStatusKind }) {
  const Route = routes[kind];
  return <Route />;
}
