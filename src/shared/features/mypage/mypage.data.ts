export type MyPageNavGroup = {
  heading: string;
  items: { label: string; to: string }[];
};

export const myPageNavigation: MyPageNavGroup[] = [
  {
    heading: '쇼핑',
    items: [
      { label: '주문 / 배송', to: '/mypage/orders' },
      { label: '취소 / 반품', to: '/mypage/returns' },
      { label: '관심상품', to: '/mypage/wishlist' },
      { label: '최근 본 상품', to: '/mypage/recent' },
      { label: '리뷰', to: '/mypage/reviews' },
      { label: '재입고 알림', to: '/mypage/restock-alerts' },
      { label: '이벤트 · 대회 신청', to: '/mypage/event-entries' },
    ],
  },
  {
    heading: 'HOKA MEMBERS',
    items: [
      { label: '멤버십 혜택', to: '/mypage' },
      { label: '쿠폰', to: '/mypage/coupons' },
      { label: 'HOKA 리워드', to: '/mypage/rewards' },
      { label: '친구 추천', to: '/mypage/referral' },
      { label: '멤버십 활동 내역', to: '/mypage/member-activity' },
      { label: '러닝 프로필', to: '/mypage/running-profile' },
    ],
  },
  {
    heading: '계정 관리',
    items: [
      { label: '회원정보', to: '/mypage/profile' },
      { label: '배송지 관리', to: '/mypage/addresses' },
      { label: '결제수단 관리', to: '/mypage/payment-methods' },
      { label: '환불계좌 관리', to: '/mypage/refund-account' },
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

export const profileQuestions = [
  {
    id: 'goal',
    title: '러닝의 가장 중요한 목표는 무엇인가요?',
    options: ['일상 속 편안함', '꾸준한 거리 향상', '레이스 기록 단축'],
  },
  {
    id: 'surface',
    title: '주로 어느 지면을 달리나요?',
    options: ['로드', '트레일', '둘 다'],
  },
  {
    id: 'cushion',
    title: '선호하는 착화감을 선택해 주세요.',
    options: ['부드러운 쿠셔닝', '균형 잡힌 반응성', '빠르고 단단한 추진감'],
  },
];
