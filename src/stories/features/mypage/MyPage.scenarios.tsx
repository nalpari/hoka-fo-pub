import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/shared/ShopShell';
import MyPage from '@/app/mypage/page';

type MyPageStoryArgs = { platform?: 'web' | 'mobile' };

const meta = {
  title: 'PAGES/마이페이지/0. 마이페이지 메인',
  parameters: { nextjs: { navigation: { pathname: '/mypage' } }, layout: 'fullscreen' },
  render: ({ platform }) => (
    <ShopShell platform={platform}>
      <MyPage />
    </ShopShell>
  ),
} satisfies Meta<MyPageStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mobile375: Story = {
  parameters: { layout: 'fullscreen' },
  name: 'Mobile / 375px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const Desktop1600: Story = {
  name: 'Desktop / 1600px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1600' },
};
