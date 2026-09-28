import type { Meta, StoryObj } from '@storybook/react';
import { FilterPillGroup } from '@/shared/components/molecules/FilterPillGroup/FilterPillGroup';
const meta = { title: 'Molecules/Filter Pill Group', component: FilterPillGroup } satisfies Meta<
  typeof FilterPillGroup
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { title: '신발 사이즈', values: ['230', '235', '240', '245', '250', '255'] },
};
