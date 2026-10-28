import type { Meta, StoryObj } from '@storybook/react';
import { CatalogFilterSection } from '@/components/common/molecules/CatalogFilterSection/CatalogFilterSection';
import { CatalogFilterPanel } from '@/components/common/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanel';

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
