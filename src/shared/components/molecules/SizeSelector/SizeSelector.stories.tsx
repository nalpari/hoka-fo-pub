import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SizeSelector, type SizeSelectorOption } from './SizeSelector';
import { koreanSizes } from './koreanSizes';

const options: SizeSelectorOption[] = koreanSizes.map((value) => ({
  value,
  state:
    value === '225'
      ? 'lowStock'
      : value === '230'
        ? 'soldOut'
        : value === '220'
          ? 'unavailable'
          : 'available',
}));

function Example({
  multiple = false,
  diagonal = false,
}: {
  multiple?: boolean;
  diagonal?: boolean;
}) {
  const [single, setSingle] = useState('240');
  const [selected, setSelected] = useState(['240', '250']);
  const common = {
    options,
    ariaLabel: '사이즈 선택',
    soldOutAppearance: diagonal ? ('diagonal' as const) : ('gray' as const),
  };
  return multiple ? (
    <SizeSelector
      {...common}
      mode="multiple"
      columns={4}
      value={selected}
      onValueChange={setSelected}
    />
  ) : (
    <SizeSelector {...common} mode="single" columns={5} value={single} onValueChange={setSingle} />
  );
}

const meta = {
  title: 'Molecules/SizeSelector',
  component: SizeSelector,
  decorators: [
    (Story) => (
      <div style={{ width: '320px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SizeSelector>;

export default meta;

type Story = StoryObj;

export const Single: Story = { render: () => <Example /> };

export const Multiple: Story = { render: () => <Example multiple /> };

export const Diagonal: Story = { render: () => <Example diagonal /> };

export const MultipleDiagonal: Story = { render: () => <Example multiple diagonal /> };

export const Empty: Story = {
  render: () => (
    <SizeSelector
      mode="single"
      ariaLabel="사이즈 선택"
      options={[]}
      value=""
      onValueChange={() => {}}
    />
  ),
};
