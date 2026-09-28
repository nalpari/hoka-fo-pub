import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup } from '@/shared/components/atoms/CheckboxGroup/CheckboxGroup';

function CheckboxGroupStory() {
  const [value, setValue] = useState<string[]>(['running']);
  return (
    <CheckboxGroup
      ariaLabel="관심 활동"
      onValueChange={setValue}
      options={[
        { value: 'running', label: '러닝' },
        { value: 'trail', label: '트레일' },
        { value: 'walking', label: '워킹', disabled: true },
      ]}
      value={value}
    />
  );
}
const meta = {
  title: 'Atoms/CheckboxGroup',
  component: CheckboxGroupStory,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxGroupStory>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
