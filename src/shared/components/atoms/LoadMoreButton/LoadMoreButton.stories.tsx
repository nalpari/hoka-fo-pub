import type { Meta, StoryObj } from '@storybook/react';
import { LoadMoreButton } from './LoadMoreButton';

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
