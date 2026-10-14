import type { Meta, StoryObj } from '@storybook/react';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';

const meta = {
  title: 'Atoms/StatusMessage',
  component: StatusMessage,
  args: { children: '요청이 완료되었습니다.' },
} satisfies Meta<typeof StatusMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = { args: { tone: 'success' } };

export const Error: Story = { args: { children: '입력한 값을 확인해 주세요.', tone: 'error' } };
