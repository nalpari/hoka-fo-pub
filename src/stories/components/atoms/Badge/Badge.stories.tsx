import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/shared/components/atoms/Badge/Badge';

const meta = {
  title: 'Atoms/Badge/Round',
  component: Badge,
  tags: ['autodocs'],
  args: { shape: 'round' },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Line: Story = { args: { variant: 'line', children: '결제완료' } };

export const Filled: Story = { args: { variant: 'filled', children: '배송완료' } };

export const FilledTertiary: Story = {
  args: { variant: 'filled', tone: 'tertiary', children: '구매확정' },
};
