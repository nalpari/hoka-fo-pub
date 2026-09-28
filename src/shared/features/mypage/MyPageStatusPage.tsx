import { css } from 'styled-system/css';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';
import { AccountDataList } from '@/shared/components/organisms/Account/AccountDataList';
import { AccountMetricPanel } from '@/shared/components/organisms/Account/AccountMetricPanel';
import { CouponManager } from '@/shared/components/organisms/MyPage/CouponManager';
import { ReviewManager } from '@/shared/components/organisms/MyPage/ReviewManager';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { myPageNavigation } from '@/shared/features/mypage/mypage.data';
import { products } from '@/mocks/products';

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
  | 'event-entries'
  | 'member-activity'
  | 'refund-account';

const content: Record<
  MyPageStatusKind,
  { title: string; description: string; action: string; href: string }
> = {
  orders: {
    title: '주문 / 배송',
    description: '최근 6개월의 주문과 배송 현황을 확인할 수 있습니다.',
    action: '상품 보러가기',
    href: '/products',
  },
  returns: {
    title: '취소 / 반품',
    description: '취소와 반품 요청의 처리 현황을 확인할 수 있습니다.',
    action: '주문 내역 보기',
    href: '/mypage/orders',
  },
  wishlist: {
    title: '관심상품',
    description: '마음에 드는 제품을 저장해 두면 빠르게 다시 확인할 수 있습니다.',
    action: '상품 보러가기',
    href: '/products',
  },
  recent: {
    title: '최근 본 상품',
    description: '최근 확인한 제품이 여기에 표시됩니다.',
    action: '상품 둘러보기',
    href: '/products',
  },
  rewards: {
    title: 'HOKA 리워드',
    description: '구매와 활동으로 적립한 리워드를 확인할 수 있습니다.',
    action: '멤버십 혜택 보기',
    href: '/mypage',
  },
  coupons: {
    title: '쿠폰',
    description: '주문 시 사용할 수 있는 혜택을 관리하세요.',
    action: '쇼핑 계속하기',
    href: '/products',
  },
  referral: {
    title: '친구 추천',
    description: '친구와 함께 달릴수록 더 많은 리워드를 받을 수 있습니다.',
    action: '멤버십 혜택 보기',
    href: '/mypage',
  },
  profile: {
    title: '회원정보',
    description: '계정과 연락처 정보를 안전하게 관리합니다.',
    action: '마이페이지로',
    href: '/mypage',
  },
  reviews: {
    title: '리뷰',
    description: '구매한 제품의 리뷰를 작성하고 관리할 수 있습니다.',
    action: '주문 내역 보기',
    href: '/mypage/orders',
  },
  addresses: {
    title: '배송지 관리',
    description: '자주 사용하는 배송지를 추가하고 관리합니다.',
    action: '주문 내역 보기',
    href: '/mypage/orders',
  },
  'payment-methods': {
    title: '결제수단 관리',
    description: '저장된 결제수단을 안전하게 관리합니다.',
    action: '마이페이지로',
    href: '/mypage',
  },
  'restock-alerts': {
    title: '재입고 알림 상품',
    description: '품절된 관심 제품의 재입고 알림을 관리합니다.',
    action: '상품 둘러보기',
    href: '/products',
  },
  'event-entries': {
    title: '이벤트 · 대회 신청',
    description: '이벤트 응모와 러닝 대회 신청 내역을 확인합니다.',
    action: '이벤트 보기',
    href: '/explore',
  },
  'member-activity': {
    title: '멤버십 활동 내역',
    description: '멤버십 혜택과 활동으로 발생한 리워드 내역입니다.',
    action: '리워드 보기',
    href: '/mypage/rewards',
  },
  'refund-account': {
    title: '환불계좌 관리',
    description: '취소 및 반품 환불을 받을 계좌를 관리합니다.',
    action: '주문 내역 보기',
    href: '/mypage/orders',
  },
};

const header = css({
  mb: '28px',
  pb: '20px',
  borderBottom: '2px solid #111',
  '& small': { color: '#0082ca', fontSize: '11px', fontWeight: '700', letterSpacing: '.08em' },
  '& h1': { m: '9px 0', fontSize: '30px' },
  '& p': { m: '0', color: '#666', fontSize: '13px' },
});

const productGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '18px',
  _mobile: { gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' },
});

export function MyPageStatusPage({ kind }: { kind: MyPageStatusKind }) {
  const item = content[kind];
  const activePath = `/mypage/${kind}`;
  const couponItems = [
    {
      id: 'welcome',
      name: 'WELCOME RUNNER',
      benefit: '10% 할인',
      condition: '50,000원 이상 구매 시',
      expiresAt: '2026.10.17까지',
      category: '상품 할인' as const,
    },
    {
      id: 'member',
      name: 'HOKA MEMBERS',
      benefit: '20,000원 할인',
      condition: '150,000원 이상 구매 시',
      expiresAt: '2026.10.31까지',
      category: '상품 할인' as const,
    },
    {
      id: 'delivery',
      name: 'RUNNER DELIVERY',
      benefit: '무료 배송',
      condition: '조건 없이 사용 가능',
      expiresAt: '2026.11.15까지',
      category: '배송 할인' as const,
    },
  ];
  const profileRows = [
    { label: '이름', value: 'HOKA Runner' },
    { label: '이메일', value: 'runner@hoka.example' },
    { label: '휴대폰 번호', value: '010-****-2026' },
    { label: '마케팅 수신', value: '이메일 · SMS 수신 동의', status: '수정' },
  ];
  const addressRows = [
    { label: '기본 배송지', value: '서울특별시 강남구 러너스 로드 20', status: '기본' },
  ];
  const activityRows =
    kind === 'orders'
      ? [{ label: '2026.09.12', value: 'Mach 6 · Black / 250', status: '배송 완료' }]
      : kind === 'returns'
        ? [{ label: '2026.08.28', value: 'Clifton 10 · 교환 요청', status: '처리 완료' }]
        : kind === 'reviews'
          ? [{ label: 'Mach 6', value: '리뷰를 작성하고 1,000P 받기', status: '작성하기' }]
          : kind === 'payment-methods'
            ? [{ label: '기본 결제수단', value: '등록된 결제수단이 없습니다.', status: '등록' }]
            : kind === 'restock-alerts'
              ? [{ label: 'Mafate Speed 4 · 250', value: 'Black / White', status: '알림 켜짐' }]
              : kind === 'event-entries'
                ? [
                    {
                      label: 'HOKA Trail Day',
                      value: '2026.10.04 · 서울 성수',
                      status: '신청 완료',
                    },
                  ]
                : kind === 'member-activity'
                  ? [{ label: '2026.09.12', value: '포토 리뷰 작성', status: '+1,000P' }]
                  : kind === 'refund-account'
                    ? [{ label: '환불계좌', value: '등록된 환불계좌가 없습니다.', status: '등록' }]
                    : [];
  return (
    <SidebarNavigationLayout
      activePath={activePath}
      groups={myPageNavigation}
      title="MY HOKA"
      titleTo="/mypage"
    >
      <header className={header}>
        <small>MY HOKA</small>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
      </header>
      {kind === 'coupons' ? (
        <CouponManager coupons={couponItems} />
      ) : (
        <>
          {kind === 'rewards' ? (
            <AccountMetricPanel
              metrics={[
                { label: '사용 가능 리워드', value: '2,400P' },
                { label: '이번 달 적립', value: '0P' },
                { label: '다음 등급까지', value: '126,000원' },
              ]}
            />
          ) : null}
          {kind === 'referral' ? (
            <AccountMetricPanel
              tone="dark"
              metrics={[
                { label: '나의 추천 코드', value: 'HOKA-2026' },
                { label: '추천 완료', value: '0명' },
                { label: '적립 리워드', value: '0P' },
              ]}
            />
          ) : null}
          {kind === 'profile' ? <AccountDataList rows={profileRows} /> : null}
          {kind === 'reviews' ? <ReviewManager /> : null}
          {kind === 'addresses' ? <AccountDataList rows={addressRows} /> : null}
          {[
            'orders',
            'returns',
            'payment-methods',
            'restock-alerts',
            'event-entries',
            'member-activity',
            'refund-account',
          ].includes(kind) ? (
            <AccountDataList rows={activityRows} />
          ) : null}
          {['wishlist', 'recent'].includes(kind) ? (
            <section className={productGrid}>
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          ) : null}
        </>
      )}
    </SidebarNavigationLayout>
  );
}
