import type { Meta, StoryObj } from '@storybook/react';

import { ProductGallery } from '@/components/common/organisms/Product/ProductGallery/ProductGallery';

const meta = {
  title: 'Organisms/Product/ProductGallery',
  component: ProductGallery,
  args: {
    images: ['/images/products/clifton-11-gtx/gallery-1.png'],
    colorVariants: [],
    onOpen: () => undefined,
  },
} satisfies Meta<typeof ProductGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
