import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const options = [
  { label: '베스트순', value: 'best' },
  { label: '신상품순', value: 'new' },
  { label: '선택 불가', value: 'disabled', disabled: true },
] as const;

function InteractiveRadio() {
  const [value, setValue] = useState<(typeof options)[number]['value']>('best');

  return <Radio ariaLabel="정렬 기준" onValueChange={setValue} options={options} value={value} />;
}

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  args: { ariaLabel: '', onValueChange: () => {}, options: [], value: '' },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <InteractiveRadio />,
};
