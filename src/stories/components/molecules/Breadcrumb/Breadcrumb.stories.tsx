import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProductDetail: Story = {
  args: {
    items: [{ label: 'HOME', href: '/' }, { label: '상품', href: '/products' }, { label: '러닝' }],
  },
};
