import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';

const meta = {
  title: 'Atoms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: { placeholder: '입력해 주세요.' },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true, value: '입력 불가' } };
