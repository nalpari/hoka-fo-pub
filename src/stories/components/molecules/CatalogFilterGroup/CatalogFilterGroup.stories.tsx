import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CatalogFilterGroup } from '@/shared/components/molecules/CatalogFilterGroup/CatalogFilterGroup';

function InteractiveFilter() {
  const [selected, setSelected] = useState(['Balanced']);
  return (
    <div style={{ width: 280 }}>
      <CatalogFilterGroup
        title="쿠셔닝"
        values={['Balanced', 'Plush', 'Responsive']}
        selected={selected}
        onChange={setSelected}
      />
    </div>
  );
}
const meta = {
  title: 'Molecules/Catalog Filter Group',
  component: InteractiveFilter,
} satisfies Meta<typeof InteractiveFilter>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
