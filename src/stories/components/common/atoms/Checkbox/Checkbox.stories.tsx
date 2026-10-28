import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { Checkbox, type SingleCheckboxProps } from '@/components/common/atoms/Checkbox/Checkbox';

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

export const Error: Story = { args: { 'aria-invalid': true } };

export const ErrorChecked: Story = { args: { 'aria-invalid': true, defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true } };

export const DisabledChecked: Story = { args: { defaultChecked: true, disabled: true } };

export const Filter: Story = { args: { label: '비밀글 제외', variant: 'filter' } };

export const FilterChecked: Story = {
  args: { label: '비밀글 제외', variant: 'filter', defaultChecked: true },
};

export const FilterDisabled: Story = {
  args: { label: '비밀글 제외', variant: 'filter', disabled: true },
};

export const FilterStates: Story = {
  render: () => (
    <Stack alignItems="start" gap="10" style={{ padding: '40px' }}>
      <Checkbox label="비밀글 제외" variant="filter" disabled />
      <Checkbox label="비밀글 제외" variant="filter" defaultChecked />
      <Checkbox label="비밀글 제외" variant="filter" />
    </Stack>
  ),
};

export const Group: Story = {
  render: () => <CheckboxGroupStory />,
};

export const GroupRow: Story = {
  render: () => <CheckboxGroupStory direction="row" />,
};
