import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@/shared/components/atoms/Pagination/Pagination';

function InteractivePagination() {
  const [page, setPage] = useState(1);
  return <Pagination total={4} page={page} onChange={setPage} />;
}
const meta = {
  title: 'Atoms/Pagination',
  component: InteractivePagination,
  tags: ['autodocs'],
} satisfies Meta<typeof InteractivePagination>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
