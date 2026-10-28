import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/common/atoms/Button';

import { AmountRow } from '@/components/common/molecules/AmountRow';

const meta = {
  title: 'Molecules/AmountRow',
  component: AmountRow,
  tags: ['autodocs'],
  args: { label: '총 상품금액', amount: 189000 },
} satisfies Meta<typeof AmountRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Discount: Story = { args: { label: '할인 금액', amount: 18900, discount: true } };

export const Emphasis: Story = {
  args: { label: '결제예정금액', emphasis: true, px: '4', py: '5', bg: 'black.10' },
};

export const WithAction: Story = {
  args: {
    action: (
      <Button variant="link" size="sm">
        쿠폰 변경
      </Button>
    ),
  },
};
