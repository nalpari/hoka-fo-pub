import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';

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
import { OrdersRoute } from '@/shared/features/orders/OrdersRoute';

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

/** 마이페이지 경로를 해당 기능 화면에 연결합니다. (Routes each account section to its feature screen.) */
export function MyPageStatusPage({ kind }: { kind: MyPageStatusKind }) {
  switch (kind) {
    case 'orders':
      return <OrdersRoute />;
    case 'returns':
      return <OrdersRoute returns />;
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
      <ContentSection
        gap="6"
        title={<>{page.title}</>}
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
      >
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
      </ContentSection>
    </SidebarNavigationLayout>
  );
}
