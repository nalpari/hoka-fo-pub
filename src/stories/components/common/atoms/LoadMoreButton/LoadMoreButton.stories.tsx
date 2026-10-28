import type { Meta, StoryObj } from '@storybook/react';

import { LoadMoreButton } from '@/components/common/atoms/LoadMoreButton';

const meta = {
  title: 'Atoms/LoadMoreButton',
  component: LoadMoreButton,
  tags: ['autodocs'],
  args: { remaining: 12 },
} satisfies Meta<typeof LoadMoreButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabel: Story = { args: { label: '리뷰 더보기', remaining: 3 } };

export const PageCounter: Story = {
  args: {
    remaining: undefined,
    counter: { current: 1, total: 3 },
    variant: 'secondary',
    size: 'short',
  },
};

export const MyPageCounter: Story = {
  args: {
    ...PageCounter.args,
    fullWidth: true,
    labelProps: { mo: 'ctaKr2' },
    counterProps: { mo: 'body5' },
  },
};
