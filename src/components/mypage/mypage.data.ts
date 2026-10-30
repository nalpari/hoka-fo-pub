export type MyPageNavGroup = {
  heading: string;
  items: { label: string; to: string }[];
};

export const myPageNavigation: MyPageNavGroup[] = [
  {
    heading: '구매내역',
    items: [
      { label: '주문/배송조회', to: '/mypage/orders' },
      { label: '취소/반품내역', to: '/mypage/returns' },
      { label: '상품리뷰', to: '/mypage/reviews' },
    ],
  },
  {
    heading: '상품내역',
    items: [
      { label: '관심상품', to: '/mypage/wishlist' },
      { label: '최근 본 상품', to: '/mypage/recent' },
      { label: '재입고 알림 상품', to: '/mypage/restock-alerts' },
    ],
  },
  {
    heading: 'MY HOKA',
    items: [
      { label: '회원등급', to: '/mypage/rewards' },
      { label: '쿠폰', to: '/mypage/coupons' },
      { label: '러닝세션 신청내역', to: '/mypage/event-entries' },
    ],
  },
  {
    heading: 'Q&A',
    items: [
      { label: 'FAQs', to: '/support/faq' },
      { label: '1:1 문의', to: '/support/inquiries' },
    ],
  },
  {
    heading: '계정관리',
    items: [
      { label: '회원정보 확인 및 수정', to: '/mypage/profile' },
      { label: '배송지 관리', to: '/mypage/addresses' },
    ],
  },
];

export const memberSummary = {
  name: 'HOKA Runner',
  tier: 'PACE MAKER',
  rewardPoints: 2400,
  coupons: 2,
  nextTierAmount: 126000,
  nextTierOrderCount: 2,
};

export const quickLinks = [
  { label: '주문 / 배송', value: '0', to: '/mypage/orders' },
  { label: '관심상품', value: '0', to: '/mypage/wishlist' },
  { label: '사용 가능 쿠폰', value: '2', to: '/mypage/coupons' },
  { label: 'HOKA 리워드', value: '2,400P', to: '/mypage/rewards' },
];
