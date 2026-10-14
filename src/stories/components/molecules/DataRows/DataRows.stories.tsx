import type { Meta, StoryObj } from '@storybook/react';
import { DataRows } from '@/shared/components/molecules/DataRows/DataRows';

const meta = {
  title: 'Molecules/DataRows',
  component: DataRows,
  tags: ['autodocs'],
  args: { rows: [{ label: '2026.09.12', value: 'Mach 6 · Black / 250', meta: '배송 완료' }] },
} satisfies Meta<typeof DataRows>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Empty: Story = { args: { rows: [], emptyMessage: '주문 내역이 없습니다.' } };
