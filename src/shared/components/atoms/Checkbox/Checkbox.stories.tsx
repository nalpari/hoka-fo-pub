import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: '약관에 동의합니다.' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
