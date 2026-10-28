import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/context/platform';

import { Badge } from '@/components/common/atoms/Badge';

const meta = {
  title: 'Atoms/Badge/Round',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Line: Story = { args: { variant: 'line', children: '결제완료' } };

export const Filled: Story = { args: { variant: 'filled', children: '배송완료' } };

export const FilledTertiary: Story = {
  args: { variant: 'filled', tone: 'tertiary', children: '구매확정' },
};

export const ComingSoon: Story = { args: { status: 'COMING' } };

export const InStock: Story = { args: { status: 'IN_STOCK' } };

export const Promotion: Story = { args: { promotion: 'Best' } };

export const MultiplePromotions: Story = {
  args: { promotion: ['Best', 'New', 'Exclusive'], weight: 'medium' },
};

export const EmptyPromotions: Story = { args: { promotion: [] } };

export const RunClubRoad: Story = { args: { runClubCategory: 'Road' } };

export const RunClubTrail: Story = { args: { runClubCategory: 'Trail' } };

export const RunClubRoadMobile: Story = {
  ...RunClubRoad,
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

export const RunClubTrailMobile: Story = { ...RunClubRoadMobile, args: RunClubTrail.args };
