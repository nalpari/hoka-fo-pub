import { type Meta, type StoryObj } from '@storybook/react';

import { ProductGender } from '@/components/common/molecules/ProductCard/ProductCard';

const meta = {
  title: 'Atoms/ProductGender',
  component: ProductGender,
  args: { gender: "Women's" },
} satisfies Meta<typeof ProductGender>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Listing: Story = {};

export const Showcase: Story = { args: { gender: 'All Gender', variant: 'showcase' } };
