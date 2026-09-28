import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { products } from '@/mocks/products';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';

const meta = {
  title: 'Molecules/Product Card',
  component: ProductCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: 280 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ProductCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { product: products[1] } };
export const ComingSoon: Story = { args: { product: products[0] } };
export const Comparable: Story = {
  args: { product: products[1], compareSelected: true, onCompare: () => undefined },
};
