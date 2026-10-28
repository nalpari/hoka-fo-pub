import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '@/components/common/atoms/Typography/Typography';

import { PlatformProvider } from '@/context/platform';

const meta = {
  title: 'Atoms/Typography/Product Listing Title',
  component: Typography,
  tags: ['autodocs'],
  args: { as: 'h1', web: 'heading7', mo: 'body1', weight: 'black', children: '남성 러닝화' },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  render: (args) => (
    <div className="platform-web">
      <PlatformProvider platform="web">
        <Typography {...args} />
      </PlatformProvider>
    </div>
  ),
};

export const Mobile: Story = {
  render: (args) => (
    <div className="platform-mobile">
      <PlatformProvider platform="mobile">
        <Typography {...args} />
      </PlatformProvider>
    </div>
  ),
};
