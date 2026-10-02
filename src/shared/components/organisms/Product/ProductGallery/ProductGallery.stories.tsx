import type { Meta, StoryObj } from '@storybook/react';
import { ProductGallery } from '@/shared/components/organisms/Product/ProductGallery/ProductGallery';

const meta = {
  title: 'Organisms/Product/ProductGallery',
  component: ProductGallery,
  args: {
    images: ['PRODUCT IMAGE'],
    onOpen: () => undefined,
  },
} satisfies Meta<typeof ProductGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
