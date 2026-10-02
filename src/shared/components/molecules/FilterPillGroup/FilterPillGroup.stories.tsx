import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterPillGroup } from '@/shared/components/molecules/FilterPillGroup/FilterPillGroup';

function InteractiveFilterPills() {
  const [selected, setSelected] = useState(['240', '250']);

  return (
    <div style={{ width: 280 }}>
      <FilterPillGroup
        title="신발 사이즈"
        values={['230', '235', '240', '245', '250', '255']}
        selected={selected}
        onChange={setSelected}
      />
    </div>
  );
}

const meta = { title: 'Molecules/Filter Pill Group', component: InteractiveFilterPills } satisfies Meta<
  typeof InteractiveFilterPills
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
};
