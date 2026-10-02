import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '@/shared/components/atoms/Dropdown/Dropdown';

const options = [
  { label: '대한민국', value: 'ko' },
  { label: 'United States', value: 'en' },
] as const;

function ControlledDropdown() {
  const [value, setValue] = useState('ko');

  return <Dropdown ariaLabel="국가 선택" onValueChange={setValue} options={options} value={value} />;
}

const meta = {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: { ariaLabel: '국가 선택', defaultValue: 'ko', options },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = { render: () => <ControlledDropdown /> };

export const Disabled: Story = { args: { disabled: true } };
