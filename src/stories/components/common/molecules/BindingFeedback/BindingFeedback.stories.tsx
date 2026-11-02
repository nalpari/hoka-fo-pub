import type { Meta, StoryObj } from '@storybook/react';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

const meta = {
  title: 'Molecules/BindingFeedback',
  component: BindingFeedback,
  args: { pending: true },
} satisfies Meta<typeof BindingFeedback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomPendingMessage: Story = {
  args: { pendingMessage: '리뷰를 저장하고 있습니다.' },
};

export const ErrorFirst: Story = { args: { error: '저장하지 못했습니다.', errorFirst: true } };
