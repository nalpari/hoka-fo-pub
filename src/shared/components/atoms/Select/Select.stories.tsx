import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@/shared/components/atoms/Select/Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <option value="recommended">추천순</option>
        <option value="price-low">낮은 가격순</option>
      </>
    ),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
