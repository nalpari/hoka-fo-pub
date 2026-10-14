import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ShopShell } from '@/shared/ShopApp';

type MyPageStoryArgs = { platform?: 'web' | 'mobile' };

const meta = {
  title: 'PAGES/MYPAGE/Main',
  component: ShopShell,
  parameters: { layout: 'fullscreen' },
  render: ({ platform }) => (
    <MemoryRouter initialEntries={['/mypage']}>
      <ShopShell platform={platform} />
    </MemoryRouter>
  ),
} satisfies Meta<MyPageStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mobile375: Story = {
  name: 'Mobile / 375px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const Desktop1600: Story = {
  name: 'Desktop / 1600px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1600' },
};
