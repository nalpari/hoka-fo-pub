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
      { label: '사이즈가이드', to: '/support' },
      { label: '세탁 및 손질 방법', to: '/support' },
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
