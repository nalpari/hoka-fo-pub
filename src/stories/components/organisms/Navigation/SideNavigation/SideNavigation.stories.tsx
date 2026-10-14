import type { Meta, StoryObj } from '@storybook/react';
import { SideNavigation } from '@/shared/components/organisms/Navigation/SideNavigation/SideNavigation';

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
export const MobileHidden: Story = { args: { mobileNavigation: 'hidden' } };
