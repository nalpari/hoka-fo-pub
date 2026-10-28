import { ShopShell } from '@/context/ShopShell';
import MyPage from '@/app/mypage/page';
import {
  MyPageStatusPage,
  type MyPageStatusKind,
} from '@/stories/features/mypage/MyPageRoutePreview';
import { RunClubPage } from '@/components/run-club/RunClubPage';
import { NotFoundPage } from '@/components/not-found/NotFoundPage';

const kinds = [
  'orders',
  'returns',
  'wishlist',
  'recent',
  'reviews',
  'rewards',
  'coupons',
  'referral',
  'profile',
  'addresses',
  'payment-methods',
  'restock-alerts',
  'member-activity',
  'refund-account',
] satisfies MyPageStatusKind[];

export function createMyPageStory(path: string) {
  return function MyPageRouteStory() {
    const kind = kinds.find((value) => path === `/mypage/${value}`);
    return (
      <ShopShell>
        {path === '/mypage' ? (
          <MyPage />
        ) : path === '/mypage/event-entries' ? (
          <RunClubPage />
        ) : kind ? (
          <MyPageStatusPage kind={kind} />
        ) : (
          <NotFoundPage />
        )}
      </ShopShell>
    );
  };
}
