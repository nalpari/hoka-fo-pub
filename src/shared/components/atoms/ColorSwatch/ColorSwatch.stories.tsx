import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorSwatch } from '@/shared/components/atoms/ColorSwatch/ColorSwatch';

function SwatchStory() {
  const [selected, setSelected] = useState('black');
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {[
        ['black', '#111'],
        ['blue', '#0082ca'],
        ['beige', '#eed49e'],
      ].map(([name, color]) => (
        <ColorSwatch
          aria-label={name}
          color={color}
          key={name}
          onClick={() => setSelected(name)}
          selected={selected === name}
        />
      ))}
    </div>
  );
}
const meta = {
  title: 'Atoms/ColorSwatch',
  component: SwatchStory,
  tags: ['autodocs'],
} satisfies Meta<typeof SwatchStory>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Selectable: Story = {};
