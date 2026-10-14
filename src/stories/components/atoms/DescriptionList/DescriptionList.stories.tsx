import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionList } from '@/shared/components/atoms/DescriptionList/DescriptionList';

const meta = {
  title: 'Atoms/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
  args: {
    labelWidth: '80px',
    items: [
      { term: '배송비', description: '무료' },
      { term: '도착 예정', description: '평균 3일 이내' },
    ],
  },
} satisfies Meta<typeof DescriptionList>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
