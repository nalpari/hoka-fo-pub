import type { Meta, StoryObj } from '@storybook/react';
import { products } from '@/mocks/products';
import { ProductCardPreview } from '@/shared/components/molecules/ProductCard/ProductCardPreview';
import { PlatformProvider } from '@/shared/context/platform';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';

const meta = {
  title: 'Molecules/Product Card',
  component: ProductCard,
  decorators: [
    (Story) => (
      <>
        <div style={{ maxWidth: 280 }}>
          <Story />
        </div>
      </>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { product: products[1] } };

export const ComingSoon: Story = { args: { product: products[0] } };

export const Discounted: Story = {
  args: { product: products.find((product) => product.id === 'shoe-3')! },
};

export const HoverPreview: Story = {
  args: { product: products[0] },
  render: ({ product }) => (
    <div style={{ position: 'relative', minHeight: 850, margin: 16 }}>
      <ProductCardPreview product={product} />
    </div>
  ),
};

export const Mobile: Story = {
  args: { product: products[0] },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <Story />
      </PlatformProvider>
    ),
  ],
};
