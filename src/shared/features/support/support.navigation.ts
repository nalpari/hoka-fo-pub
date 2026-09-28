import type { SidebarNavigationGroup } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';

export const supportNavigation: SidebarNavigationGroup[] = [
  {
    heading: 'NEED HELP',
    items: [
      { label: '고객센터', to: '/support' },
      { label: 'FAQs', to: '/support/faq' },
      { label: '공지사항', to: '/support/notices' },
      { label: '1:1 문의', to: '/support/inquiries' },
      { label: 'A/S 처리현황', to: '/support/after-sales' },
      { label: '매장 찾기', to: '/support/store' },
    ],
  },
  {
    heading: 'INFORMATION',
    items: [
      { label: '온라인 회원 혜택 안내', to: '/support/member-benefits' },
      { label: '통합 마일리지 안내', to: '/support/mileage' },
      { label: '대/단체복 주문 안내', to: '/support/teamwear' },
      { label: '배송 및 반품 안내', to: '/support' },
      { label: '약관', to: '/support/terms' },
    ],
  },
];
