import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { StatePanel } from '@/shared/components/molecules/StatePanel/StatePanel';

const meta = {
  title: 'Molecules/StatePanel',
  component: StatePanel,
  tags: ['autodocs'],
  args: {
    variant: 'empty',
    title: '검색 결과가 없습니다.',
    description: '다른 조건으로 다시 검색해 보세요.',
    action: <Button variant="primary">필터 초기화</Button>,
  },
} satisfies Meta<typeof StatePanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Error: Story = {
  args: {
    variant: 'error',
    title: '문제가 발생했습니다.',
    description: '잠시 후 다시 시도해 주세요.',
  },
};
export const Success: Story = {
  args: { variant: 'success', title: '저장되었습니다.', description: '변경사항이 반영되었습니다.' },
};
