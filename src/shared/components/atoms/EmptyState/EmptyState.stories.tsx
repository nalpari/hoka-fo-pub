import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';

const meta = {
  title: 'Atoms/Empty State',
  component: EmptyState,
  tags: ['autodocs'],
  args: { title: '표시할 내용이 없습니다.', description: '조건을 변경하거나 다시 시도해 주세요.' },
  parameters: {
    docs: {
      description: { component: '검색 결과나 목록이 비어 있을 때 사용하는 안내 상태입니다.' },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const WithAction: Story = { args: { action: <Button>다시 시도</Button> } };

export const Minimal: Story = {
  args: { title: '등록된 문의글이 없습니다.', variant: 'minimal' },
};
