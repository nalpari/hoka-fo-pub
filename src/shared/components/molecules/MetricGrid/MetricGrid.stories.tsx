import type { Meta, StoryObj } from '@storybook/react';
import { MetricGrid } from '@/shared/components/molecules/MetricGrid/MetricGrid';

const meta = {
  title: 'Molecules/MetricGrid',
  component: MetricGrid,
  tags: ['autodocs'],
  args: {
    items: [
      { label: '리워드', value: '2,400P' },
      { label: '쿠폰', value: '3장', detail: '이번 달 만료 1장' },
      { label: '주문', value: '1건' },
    ],
  },
} satisfies Meta<typeof MetricGrid>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Dark: Story = { args: { tone: 'dark' } };
