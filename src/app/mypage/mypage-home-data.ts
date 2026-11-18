export const menuSections = [
  {
    title: '구매내역',
    items: [
      { label: '주문 / 배송조회', to: '/mypage/orders' },
      { label: '취소 / 반품내역', to: '/mypage/returns' },
      { label: '상품리뷰', to: '/mypage/reviews' },
    ],
  },
  {
    title: '상품내역',
    items: [
      { label: '관심상품', to: '/mypage/wishlist' },
      { label: '최근 본 상품', to: '/mypage/recent' },
      { label: '재입고 알림 상품', to: '/mypage/restock-alerts' },
    ],
  },
  {
    title: 'MY HOKA',
    items: [
      { label: '회원등급', to: '/mypage/rewards' },
      { label: '쿠폰', to: '/mypage/coupons' },
      { label: '러닝세션 신청내역', to: '/mypage/event-entries' },
    ],
  },
  {
    title: 'Q&A',
    items: [
      { label: 'FAQs', to: '/support/faq?from=mypage' },
      { label: '1:1 문의', to: '/support/inquiries?from=mypage' },
    ],
  },
  {
    title: '계정관리',
    items: [
      { label: '회원 정보 관리', to: '/mypage/profile' },
      { label: '배송지 관리', to: '/mypage/addresses' },
    ],
  },
];
