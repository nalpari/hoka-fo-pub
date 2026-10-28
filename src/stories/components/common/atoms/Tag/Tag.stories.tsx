import { type Meta, type StoryObj } from '@storybook/react';

import { Tag } from '@/components/catalog/ProductListingPage';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  args: { children: '러닝' },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Removable: Story = { args: { onDelete: () => {} } };
