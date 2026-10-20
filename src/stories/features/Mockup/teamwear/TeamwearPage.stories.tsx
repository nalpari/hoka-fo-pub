import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/shared/ShopShell';
import { TeamwearPage } from '@/shared/Mockup/teamwear/TeamwearPage';

const meta = {
  title: 'Mockup/Teamwear',
  component: TeamwearPage,
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/support' } } },
} satisfies Meta<typeof TeamwearPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  render: () => (
    <ShopShell platform="web">
      <TeamwearPage />
    </ShopShell>
  ),
  globals: { viewport: 'hoka1600' },
};

export const Mobile375: Story = {
  render: () => (
    <ShopShell platform="mobile">
      <TeamwearPage />
    </ShopShell>
  ),
  globals: { viewport: 'hoka375' },
};
