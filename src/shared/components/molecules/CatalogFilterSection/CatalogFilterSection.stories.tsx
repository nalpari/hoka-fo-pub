import type { Meta, StoryObj } from '@storybook/react';
import { CatalogFilterSection } from '@/shared/components/molecules/CatalogFilterSection/CatalogFilterSection';

const meta = {
  title: 'Molecules/Catalog Filter Section',
  component: CatalogFilterSection,
} satisfies Meta<typeof CatalogFilterSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { title: '쿠셔닝', children: <p>필터 콘텐츠</p> } };
