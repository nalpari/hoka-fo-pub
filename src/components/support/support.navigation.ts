import type { SidebarNavigationGroup } from '@/components/common/layouts/SidebarNavigationLayout';

export const supportNavigation: SidebarNavigationGroup[] = [
  {
    heading: 'NEED HELP',
    items: [
      { label: '고객센터', to: '/support' },
      { label: 'FAQs', to: '/support/faq' },
      { label: '공지사항', to: '/support/notices' },
      { label: '1:1 문의', to: '/support/inquiries' },
      { label: '매장 찾기', to: '/support/store' },
    ],
  },
  {
    heading: 'INFORMATION',
    items: [
      { label: '온라인 회원등급 안내', to: '/support/member-benefits' },
      { label: '배송 및 반품안내', to: '/support/after-sales' },
      { label: '세탁 및 손질 방법 안내', to: '/support/care' },
      { label: '약관', to: '/support/terms' },
      { label: '사이즈 가이드', to: '/support/size-guide' },
    ],
  },
];
