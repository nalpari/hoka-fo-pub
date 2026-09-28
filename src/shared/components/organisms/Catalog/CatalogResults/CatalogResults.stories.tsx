import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-system/css';
import { CatalogResults } from '@/shared/components/organisms/Catalog/CatalogResults/CatalogResults';
const meta = {
  title: 'Organisms/Catalog/CatalogResults',
  component: CatalogResults,
} satisfies Meta<typeof CatalogResults>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    children: <div className={css({ p: '30px', bg: 'var(--soft)' })}>상품 결과 영역</div>,
  },
};
