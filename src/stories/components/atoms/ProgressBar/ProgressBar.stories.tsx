import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '@/shared/components/atoms/ProgressBar/ProgressBar';

const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: { label: '프로필 완성도', max: 100, value: 60 },
  parameters: {
    docs: {
      description: { component: '진행 중인 작업 또는 완성도를 표시합니다.' },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InProgress: Story = {};

export const Complete: Story = { args: { value: 100 } };

export const Empty: Story = { args: { value: 0 } };
