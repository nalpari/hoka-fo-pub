import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/shared/ShopShell';
import ProductPage from '@/app/products/[id]/page';

const meta = {
  title: 'PAGES/PRODUCTS/Detail',
  component: ShopShell,
  args: { children: <ProductPage /> },
  parameters: {
    nextjs: { navigation: { pathname: '/products/shoe-1', segments: [['id', 'shoe-1']] } },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ShopShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Width1920: Story = {
  name: '1920px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1920' },
};

export const Width1600: Story = {
  name: '1600px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1600' },
};

export const Width1200: Story = {
  name: '1200px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1200' },
};

export const Width768: Story = {
  name: '768px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka768' },
};

export const Width375: Story = {
  name: '375px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};
