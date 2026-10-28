import { ReadonlyURLSearchParams, useSearchParams } from '@storybook/nextjs-vite/navigation.mock';
import type { Meta, StoryObj } from '@storybook/react';

import { getProductListingRoute } from '@/components/catalog/productListingIaRoute';
import { ProductListingPage } from '@/components/catalog/ProductListingPage';
import { ShopShell } from '@/context/ShopShell';

type ProductListingStoryArgs = {
  listing?: string;
  platform?: 'web' | 'mobile';
  searchQuery?: string;
};

const meta = {
  title: 'PAGES/상품/0. 상품목록',
  decorators: [
    (Story, context) => {
      const route =
        getProductListingRoute(context.args.listing) ?? context.parameters.route ?? '/products';
      const url = new URL(route, 'http://localhost');
      useSearchParams.mockReturnValue(new ReadonlyURLSearchParams(url.search));
      return <Story />;
    },
  ],
  beforeEach: () => () => useSearchParams.mockRestore(),
  argTypes: {
    listing: {
      control: false,
      description: 'IA 구조도에서 전달하는 상품 목록 필터 키',
    },
  },
  parameters: { nextjs: { navigation: { pathname: '/products' } }, layout: 'fullscreen' },
  render: ({ platform, searchQuery }) => (
    <ShopShell platform={platform}>
      <ProductListingPage searchQuery={searchQuery} />
    </ShopShell>
  ),
} satisfies Meta<ProductListingStoryArgs>;

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

export const MenTrailRunning: Story = {
  name: 'Men / 트레일 러닝',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1600' },
  parameters: { route: '/products?gender=men&activity=trail-running' },
};

export const SearchResults: Story = {
  args: { platform: 'web', searchQuery: 'Clifton' },
  parameters: { route: '/search?q=Clifton', nextjs: { navigation: { pathname: '/search' } } },
};

export const SearchEmpty: Story = {
  args: { platform: 'web', searchQuery: 'G45678' },
  parameters: { route: '/search?q=G45678', nextjs: { navigation: { pathname: '/search' } } },
};
