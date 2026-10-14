import type { Meta, StoryObj } from '@storybook/react';
import { ProductDetailSections } from '@/shared/components/organisms/Product/ProductDetailSections/ProductDetailSections';

const meta = {
  title: 'Organisms/Product/ProductDetailSections',
  component: ProductDetailSections,
} satisfies Meta<typeof ProductDetailSections>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutSizeGuide: Story = { args: { hasSizeGuide: false } };
