import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './MyPageDesign.scenarios';

const meta = {
  ...base,
  title: 'PAGES/마이페이지/4. 상품리뷰/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Reviews: Story = { ...scenarios.Reviews, name: 'Default' };

export const ReviewsEmpty: Story = { ...scenarios.ReviewsEmpty, name: '빈 목록' };
