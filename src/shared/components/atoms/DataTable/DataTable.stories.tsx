import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '@/shared/components/atoms/DataTable/DataTable';

const meta = { title: 'Atoms/DataTable', component: DataTable, tags: ['autodocs'] } satisfies Meta<
  typeof DataTable
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <DataTable caption="사이즈 표">
      <thead>
        <tr>
          <th>사이즈</th>
          <th>재고</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>250</th>
          <td>있음</td>
        </tr>
        <tr>
          <th>255</th>
          <td>품절</td>
        </tr>
      </tbody>
    </DataTable>
  ),
};
