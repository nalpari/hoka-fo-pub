import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/shared/ShopShell';
import ProductPage from '@/app/products/[id]/page';

const meta = {
  title: 'PAGES/상품/1. 상품상세',
  component: ShopShell,
  args: { children: <ProductPage /> },
  parameters: {
    nextjs: { navigation: { pathname: '/products/shoe-1', segments: [['id', 'shoe-1']] } },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ShopShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Width3840: Story = {
  name: '3840px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka3840' },
};

export const Width2560: Story = {
  name: '2560px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka2560' },
};

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
  parameters: { layout: 'fullscreen' },
  name: '768px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka768' },
};

export const Width375: Story = {
  parameters: { layout: 'fullscreen' },
  name: '375px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};
