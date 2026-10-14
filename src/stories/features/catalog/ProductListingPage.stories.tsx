import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ShopShell } from '@/shared/ShopApp';
import { getProductListingRoute } from '@/shared/features/catalog/productListingIaRoute';

type ProductListingStoryArgs = {
  listing?: string;
  platform?: 'web' | 'mobile';
};

const meta = {
  title: 'PAGES/PRODUCTS/List',
  component: ShopShell,
  decorators: [
    (Story, context) => (
      <MemoryRouter
        initialEntries={[
          getProductListingRoute(context.args.listing) ?? context.parameters.route ?? '/products',
        ]}
      >
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    listing: {
      control: false,
      description: 'IA 구조도에서 전달하는 상품 목록 필터 키',
    },
  },
  parameters: { layout: 'fullscreen' },
  render: ({ platform }) => <ShopShell platform={platform} />,
} satisfies Meta<ProductListingStoryArgs>;

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

export const MenTrailRunning: Story = {
  name: 'Men / 트레일 러닝',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1600' },
  parameters: { route: '/products?gender=men&activity=trail-running' },
};
