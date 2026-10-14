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
      { label: '클리프톤', to: '/products?collection=클리프톤' },
      { label: '아라히', to: '/products?collection=아라히' },
      { label: '가비오타', to: '/products?collection=가비오타' },
      { label: '마하', to: '/products?collection=마하' },
    ],
  },
];

export const socials = [
  { label: 'Instagram', file: 'instagram.svg' },
  { label: 'YouTube', file: 'youtube.svg' },
  { label: 'X', file: 'x.svg' },
] as const;
