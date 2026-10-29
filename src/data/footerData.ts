/**
 * [개발팀 바인딩]
 * footerGroups는 제목/라벨/목적지 표시 데이터입니다. 운영 CMS 링크를 받을 때 label과 to를 함께 변환합니다.
 * 회사/고객센터 정보는 실제 승인된 운영 문구를 사용합니다. 링크 데이터는 사용자별 회원/결제 데이터와 별개입니다.
 */

export type FooterGroup = {
  title: string;
  links: { label: string; to: string }[];
};

export const footerGroups: FooterGroup[] = [
  {
    title: 'Company',
    links: [
      { label: 'Our Story', to: '/' },
      { label: 'Our Impact', to: '/' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Membership', to: '/support/member-benefits' },
      { label: '공지사항', to: '/support/notices' },
      { label: '배송 및 반품 안내', to: '/support' },
      { label: '고객센터', to: '/support' },
      { label: '1:1 문의', to: '/support/inquiries' },
      { label: 'FAQ', to: '/support/faq' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: '사이즈가이드', to: '/support/size-guide' },
      { label: '세탁 및 손질 방법', to: '/support/care' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { label: '매장 찾기', to: '/support/store' },
      { label: '본디', to: '/products?collection=본디' },
      { label: '클리프톤', to: '/products?collection=클리프톤' },
      { label: '스피드고트', to: '/products?collection=스피드고트' },
      { label: '마파테', to: '/products?collection=마파테' },
      { label: '호파라', to: '/products?collection=호파라' },
    ],
  },
];

export const socials = [
  { label: 'Instagram', file: 'instagram.svg' },
  { label: 'YouTube', file: 'youtube.svg' },
  { label: 'X', file: 'x.svg' },
] as const;
