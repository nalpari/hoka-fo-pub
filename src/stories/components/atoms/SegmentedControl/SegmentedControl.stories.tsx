import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from '@/shared/components/atoms/SegmentedControl/SegmentedControl';

function SegmentedStory() {
  const [value, setValue] = useState('all');
  return (
    <SegmentedControl
      ariaLabel="상품 정렬"
      onValueChange={setValue}
      options={[
        { value: 'all', label: '전체' },
        { value: 'new', label: '신상품' },
        { value: 'sale', label: '세일' },
      ]}
      value={value}
    />
  );
}
const meta = {
  title: 'Atoms/SegmentedControl',
  component: SegmentedStory,
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentedStory>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
