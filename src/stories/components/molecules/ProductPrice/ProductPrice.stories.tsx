import type { Meta, StoryObj } from '@storybook/react';
import { ProductPrice } from '@/shared/components/molecules/ProductPrice/ProductPrice';
import { PlatformProvider } from '@/shared/context/platform';

const meta = {
  title: 'Molecules/Product Price',
  component: ProductPrice,
  args: { price: 290000 },
} satisfies Meta<typeof ProductPrice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Discounted: Story = { args: { price: 232000, originalPrice: 290000 } };

export const MobileDiscounted: Story = {
  parameters: { layout: 'fullscreen' },
  args: { price: 232000, originalPrice: 290000 },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <Story />
      </PlatformProvider>
    ),
  ],
};

export const SamePrice: Story = { args: { originalPrice: 290000 } };
