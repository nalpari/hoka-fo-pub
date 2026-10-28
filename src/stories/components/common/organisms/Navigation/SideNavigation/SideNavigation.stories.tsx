import type { Meta, StoryObj } from '@storybook/react';

import { SideNavigation } from '@/components/common/layouts/SidebarNavigationLayout';

import { supportNavigation } from '@/app/support/support.navigation';

const meta = {
  title: 'Organisms/Navigation/SideNavigation',
  component: SideNavigation,
  tags: ['autodocs'],
  args: {
    title: 'SUPPORT',
    titleTo: '/support',
    activePath: '/support/faq',
    groups: [
      {
        heading: 'HELP',
        items: [
          { label: '고객센터', to: '/support' },
          { label: 'FAQ', to: '/support/faq' },
        ],
      },
      { heading: 'INFORMATION', items: [{ label: '약관', to: '/support/terms' }] },
    ],
  },
} satisfies Meta<typeof SideNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};

export const SupportDesktop: Story = {
  args: {
    appearance: 'support',
    title: '고객센터',
    activePath: '/support',
    groups: supportNavigation,
  },
};

export const MobileHidden: Story = {
  parameters: { layout: 'fullscreen' },
  args: { mobileNavigation: 'hidden' },
};
