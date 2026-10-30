import AddressesPage from '@/app/mypage/addresses/page';
import CouponsPage from '@/app/mypage/coupons/page';
import OrdersPage from '@/app/mypage/orders/page';
import ProfilePage from '@/app/mypage/profile/page';
import RecentPage from '@/app/mypage/recent/page';
import RestockAlertsPage from '@/app/mypage/restock-alerts/page';
import ReturnsPage from '@/app/mypage/returns/page';
import ReviewsPage from '@/app/mypage/reviews/page';
import RewardsPage from '@/app/mypage/rewards/page';
import WishlistPage from '@/app/mypage/wishlist/page';

const routes = {
  orders: OrdersPage,
  returns: ReturnsPage,
  wishlist: WishlistPage,
  recent: RecentPage,
  rewards: RewardsPage,
  coupons: CouponsPage,
  profile: ProfilePage,
  reviews: ReviewsPage,
  addresses: AddressesPage,
  'restock-alerts': RestockAlertsPage,
};

export type MyPageStatusKind = keyof typeof routes;

/** 스토리에서 실제 마이페이지 경로 구현을 선택합니다. (Selects the actual account route implementation for a story.) */
export function MyPageStatusPage({ kind }: { kind: MyPageStatusKind }) {
  const Route = routes[kind];
  return <Route />;
}
