import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox, type SingleCheckboxProps } from '@/shared/components/atoms/Checkbox/Checkbox';

function CheckboxStory(props: SingleCheckboxProps) {
  return <Checkbox {...props} />;
}

function CheckboxGroupStory({ direction = 'column' }: { direction?: 'row' | 'column' }) {
  const [value, setValue] = useState<string[]>(['running', 'walking']);

  return (
    <Checkbox
      ariaLabel="관심 활동"
      direction={direction}
      onValueChange={setValue}
      options={[
        { value: 'running', label: '러닝' },
        { value: 'trail', label: '트레일' },
        { value: 'cycling', label: '사이클링', disabled: true },
        { value: 'walking', label: '워킹', disabled: true },
      ]}
      value={value}
    />
  );
}

const meta = {
  title: 'Atoms/Checkbox',
  component: CheckboxStory,
  tags: ['autodocs'],
  args: { label: '약관에 동의합니다.' },
} satisfies Meta<typeof CheckboxStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };

export const Group: Story = {
  render: () => <CheckboxGroupStory />,
};

export const GroupRow: Story = {
  render: () => <CheckboxGroupStory direction="row" />,
};
