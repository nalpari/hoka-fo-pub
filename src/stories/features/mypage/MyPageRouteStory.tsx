import { ShopShell } from '@/context/ShopShell';

import MyPage from '@/app/mypage/page';
import { NotFoundPage } from '@/components/not-found/NotFoundPage';
import { RunClubPage } from '@/components/run-club/RunClubPage';
import {
  type MyPageStatusKind,
  MyPageStatusPage,
} from '@/stories/features/mypage/MyPageRoutePreview';

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
