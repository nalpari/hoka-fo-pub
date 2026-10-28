import { ShopShell } from '@/context/ShopShell';

import { SystemStatusPage } from '@/components/common/organisms/SystemStatusPage';

import MyPage from '@/app/mypage/page';
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
          <SystemStatusPage status="not-found" />
        )}
      </ShopShell>
    );
  };
}
