import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RangeInput } from '@/shared/components/atoms/RangeInput/RangeInput';

function RangeStory() {
  const [value, setValue] = useState(50);
  return (
    <div>
      <RangeInput
        aria-label="가격 범위"
        max={100}
        onChange={(event) => setValue(Number(event.target.value))}
        value={value}
      />
      <output>{value}</output>
    </div>
  );
}
const meta = {
  title: 'Atoms/RangeInput',
  component: RangeStory,
  tags: ['autodocs'],
} satisfies Meta<typeof RangeStory>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
