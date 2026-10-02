import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PriceRange } from '@/shared/components/molecules/PriceRange/PriceRange';

function InteractivePriceRange() {
  const [value, setValue] = useState<[number, number]>([129000, 159000]);
  return <PriceRange value={value} onChange={setValue} />;
}
const meta = { title: 'Molecules/Price Range', component: InteractivePriceRange } satisfies Meta<
  typeof InteractivePriceRange
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
