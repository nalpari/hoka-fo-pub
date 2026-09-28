import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberStepper } from '@/shared/components/atoms/NumberStepper/NumberStepper';

function StepperStory() {
  const [value, setValue] = useState(1);
  return <NumberStepper max={5} min={1} onChange={setValue} value={value} />;
}
const meta = {
  title: 'Atoms/NumberStepper',
  component: StepperStory,
  tags: ['autodocs'],
} satisfies Meta<typeof StepperStory>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Bounded: Story = {};
