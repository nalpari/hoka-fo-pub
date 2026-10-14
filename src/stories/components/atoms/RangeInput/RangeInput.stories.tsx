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
        onValueChange={setValue}
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

function RangePairStory() {
  const [value, setValue] = useState<[number, number]>([25, 75]);

  return (
    <div>
      <RangeInput
        max={100}
        onValueChange={setValue}
        thumbAriaLabels={['최소 값', '최대 값']}
        thumbCollisionBehavior="none"
        value={value}
      />
      <output>{value.join(' - ')}</output>
    </div>
  );
}

export const Range: Story = { render: () => <RangePairStory /> };
