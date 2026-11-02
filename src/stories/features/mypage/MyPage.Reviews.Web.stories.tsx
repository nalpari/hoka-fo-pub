import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/context/ShopShell';

import { ReviewStatePreview } from '@/app/mypage/reviews/_components/ReviewStatePreview';

const meta = {
  title: 'PAGES/마이페이지/4. 상품리뷰/WEB',
  component: ReviewStatePreview,
  globals: { viewport: 'hoka1600' },
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <ShopShell platform="web">
      <ReviewStatePreview {...args} />
    </ShopShell>
  ),
} satisfies Meta<typeof ReviewStatePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReadyList: Story = { name: '작성 가능한 리뷰 목록', args: { state: 'ready-list' } };

export const ReadyEmpty: Story = { name: '작성 가능한 리뷰 목록 없음', args: { state: 'empty' } };

export const WrittenList: Story = { name: '내가 작성한 리뷰', args: { state: 'written-list' } };
