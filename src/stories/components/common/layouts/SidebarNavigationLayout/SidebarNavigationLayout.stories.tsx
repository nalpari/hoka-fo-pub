import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/context/platform';

import { SidebarNavigationLayout } from '@/components/common/layouts/SidebarNavigationLayout';

const meta = {
  title: 'Layouts/SidebarNavigationLayout',
  component: SidebarNavigationLayout,
  args: {
    title: 'MY HOKA',
    titleTo: '/mypage',
    activePath: '/mypage/orders',
    groups: [
      {
        heading: '쇼핑 정보',
        items: [
          { label: '주문 배송 내역', to: '/mypage/orders' },
          { label: '취소 내역', to: '/mypage/cancellations' },
        ],
      },
    ],
    children: <section aria-label="본문">페이지 콘텐츠</section>,
  },
} satisfies Meta<typeof SidebarNavigationLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile">
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
};

export const HiddenMobile: Story = { ...Mobile, args: { mobileNavigation: 'hidden' } };

export const NoMobileSpacing: Story = { ...Mobile, args: { mobileSpacing: 'none' } };

export const Support = {
  args: {
    appearance: 'support',
    title: 'SUPPORT',
    titleTo: '/support',
    activePath: '/support/faq',
    groups: [
      {
        heading: '고객센터',
        items: [
          { label: 'FAQs', to: '/support/faq' },
          { label: '공지사항', to: '/support/notices' },
        ],
      },
    ],
    breadcrumbItems: [{ label: 'Home', href: '/' }, { label: 'FAQs' }],
  },
} satisfies Story;

export const SupportWithoutBreadcrumb: Story = {
  args: { ...Support.args, appearance: 'support', breadcrumbItems: [] },
};

export const SupportMobile: Story = { ...Mobile, args: { ...Support.args } };
