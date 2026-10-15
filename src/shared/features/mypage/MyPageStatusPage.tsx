import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { AccountDataList } from '@/shared/components/organisms/Account/AccountDataList';
import { AccountMetricPanel } from '@/shared/components/organisms/Account/AccountMetricPanel';
import { MyPageAddresses } from './MyPageAddresses';
import { MyPageCoupons } from './MyPageCoupons';
import { MyPageProductHistory } from './MyPageProductHistory';
import { MyPageProfile } from './MyPageProfile';
import { MyPageReviews } from './MyPageReviews';
import { MyPageRewards } from './MyPageRewards';
import { myPageNavigation } from './mypage.data';

export type MyPageStatusKind =
  | 'orders'
  | 'returns'
  | 'wishlist'
  | 'recent'
  | 'rewards'
  | 'coupons'
  | 'referral'
  | 'profile'
  | 'reviews'
  | 'addresses'
  | 'payment-methods'
  | 'restock-alerts'
  | 'member-activity'
  | 'refund-account';

const remainingPages = {
  orders: {
    title: '주문 / 배송',
    rows: [{ label: '2026.09.12', value: 'Mach 6 · Black / 250', status: '배송 완료' }],
  },
  returns: {
    title: '취소 / 반품',
    rows: [{ label: '2026.08.28', value: 'Clifton 10 · 교환 요청', status: '처리 완료' }],
  },
  referral: { title: '친구 추천', rows: [] },
  'payment-methods': {
    title: '결제수단 관리',
    rows: [{ label: '기본 결제수단', value: '등록된 결제수단이 없습니다.', status: '등록' }],
  },
  'member-activity': {
    title: '멤버십 활동 내역',
    rows: [{ label: '2026.09.12', value: '포토 리뷰 작성', status: '+1,000P' }],
  },
  'refund-account': {
    title: '환불계좌 관리',
    rows: [{ label: '환불계좌', value: '등록된 환불계좌가 없습니다.', status: '등록' }],
  },
} as const;

export function MyPageStatusPage({ kind }: { kind: MyPageStatusKind }) {
  switch (kind) {
    case 'reviews':
      return <MyPageReviews />;
    case 'rewards':
      return <MyPageRewards />;
    case 'coupons':
      return <MyPageCoupons />;
    case 'profile':
      return <MyPageProfile />;
    case 'addresses':
      return <MyPageAddresses />;
    case 'wishlist':
    case 'recent':
    case 'restock-alerts':
      return <MyPageProductHistory kind={kind} />;
  }

  const page = remainingPages[kind];

  return (
    <SidebarNavigationLayout
      activePath={`/mypage/${kind}`}
      groups={myPageNavigation}
      title="MY HOKA"
      titleTo="/mypage"
    >
      <Stack gap="6">
        <Typography as="h1" web="heading8" mo="heading5">
          {page.title}
        </Typography>
        {kind === 'referral' ? (
          <AccountMetricPanel
            tone="dark"
            metrics={[
              { label: '나의 추천 코드', value: 'HOKA-2026' },
              { label: '추천 완료', value: '0명' },
              { label: '적립 리워드', value: '0P' },
            ]}
          />
        ) : (
          <AccountDataList rows={[...page.rows]} />
        )}
      </Stack>
    </SidebarNavigationLayout>
  );
}
