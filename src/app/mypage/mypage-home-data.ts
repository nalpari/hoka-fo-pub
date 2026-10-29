/**
 * [개발팀 바인딩]
 * orderItems는 미연동 마이페이지의 최근 주문 예시입니다. 운영은 MyPageDataContext.overview.item.orders로 실제 주문 상품/상태/이미지를 전달합니다.
 */

export type MyPageOrderItem = {
  name: string;
  gender: string;
  price: string;
  description: string;
  status: string;
  image: string;
  isNew?: boolean;
};

export const orderItems: MyPageOrderItem[] = [
  {
    name: 'Speedgoat 7 GTX',
    gender: "Men's",
    price: '240,000원',
    description: '데일리 러닝, 워킹',
    status: '배송중',
    image: '/images/mypage/speedgoat-7-gtx.png',
    isNew: true,
  },
  {
    name: 'Clifton 11 GTX',
    gender: "Men's",
    price: '240,000원',
    description: '데일리 러닝, 워킹',
    status: '배송 완료',
    image: '/images/products/clifton-11-gtx/gallery-1.png',
  },
  {
    name: 'Bondi 9',
    gender: "Women's",
    price: '189,000원',
    description: '데일리 러닝',
    status: '배송 완료',
    image: '/images/products/bondi-9/lrmt.png',
  },
  {
    name: 'Clifton 11 GTX',
    gender: "Men's",
    price: '240,000원',
    description: '데일리 러닝, 워킹',
    status: '배송 완료',
    image: '/images/products/clifton-11-gtx/gallery-2.png',
  },
  {
    name: 'Bondi 9',
    gender: "Women's",
    price: '189,000원',
    description: '데일리 러닝',
    status: '배송 완료',
    image: '/images/products/bondi-9/bwht.png',
  },
];

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
      { label: 'FAQs', to: '/support/faq' },
      { label: '1:1 문의', to: '/support/inquiries' },
    ],
  },
  {
    title: '계정관리',
    items: [
      { label: '회원 정보 확인 및 수정', to: '/mypage/profile' },
      { label: '배송지 관리', to: '/mypage/addresses' },
    ],
  },
];
