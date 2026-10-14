import { ShopShell } from '@/shared/ShopShell';
import MyPage from '@/app/mypage/page';
import { MyPageStatusPage, type MyPageStatusKind } from '@/shared/features/mypage/MyPageStatusPage';
import { RunningProfilePage } from '@/shared/features/mypage/RunningProfilePage';
import { NotFoundPage } from '@/shared/features/not-found/NotFoundPage';

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
  'event-entries',
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
        ) : path === '/mypage/running-profile' ? (
          <RunningProfilePage />
        ) : kind ? (
          <MyPageStatusPage kind={kind} />
        ) : (
          <NotFoundPage />
        )}
      </ShopShell>
    );
  };
}
