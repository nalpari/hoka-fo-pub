import { ShopShell } from '@/context/ShopShell';

import { SystemStatusPage } from '@/components/common/organisms/SystemStatusPage';

import EntryPage from '@/app/mypage/event-entries/page';
import MyPage from '@/app/mypage/page';
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
] satisfies MyPageStatusKind[];

export function createMyPageStory(path: string) {
  return function MyPageRouteStory() {
    const kind = kinds.find((value) => path === `/mypage/${value}`);
    return (
      <ShopShell>
        {path === '/mypage' ? (
          <MyPage />
        ) : path === '/mypage/event-entries' ? (
          <EntryPage />
        ) : kind ? (
          <MyPageStatusPage kind={kind} />
        ) : (
          <SystemStatusPage status="not-found" />
        )}
      </ShopShell>
    );
  };
}
