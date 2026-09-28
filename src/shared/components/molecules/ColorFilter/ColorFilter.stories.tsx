import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorFilter } from '@/shared/components/molecules/ColorFilter/ColorFilter';

function InteractiveColorFilter() {
  const [selected, setSelected] = useState<string[]>(['black']);
  return <ColorFilter selected={selected} onChange={setSelected} />;
}
const meta = { title: 'Molecules/Color Filter', component: InteractiveColorFilter } satisfies Meta<
  typeof InteractiveColorFilter
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
