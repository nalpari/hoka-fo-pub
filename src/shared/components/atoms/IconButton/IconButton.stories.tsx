import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { children: '×', 'aria-label': '닫기' },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
