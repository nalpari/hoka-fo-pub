import { type Meta, type StoryObj } from '@storybook/react';

import { CatalogFilterPanel, CatalogFilterSection } from '@/components/catalog/ProductListingPage';

const meta = {
  title: 'Organisms/Catalog/CatalogFilterPanel',
  component: CatalogFilterPanel,
} satisfies Meta<typeof CatalogFilterPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onReset: () => undefined,
    children: <CatalogFilterSection title="쿠셔닝">필터 옵션</CatalogFilterSection>,
  },
};
