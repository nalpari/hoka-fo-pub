import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorFilter } from '@/shared/components/molecules/ColorFilter/ColorFilter';

const colorOptions = [
  { value: 'black', label: '블랙', hex: '#111111' },
  { value: 'blue', label: '블루', hex: '#357ab7' },
  { value: 'cream', label: '크림', hex: '#f4f3dc' },
];

function InteractiveColorFilter() {
  const [selected, setSelected] = useState<string[]>(['black']);
  return <ColorFilter options={colorOptions} selected={selected} onChange={setSelected} />;
}
const meta = { title: 'Molecules/Color Filter', component: InteractiveColorFilter } satisfies Meta<
  typeof InteractiveColorFilter
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
