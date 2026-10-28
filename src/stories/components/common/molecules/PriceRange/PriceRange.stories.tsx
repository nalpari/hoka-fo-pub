import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PriceRange } from '@/components/catalog/ProductListingPage';

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
