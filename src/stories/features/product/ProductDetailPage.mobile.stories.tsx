import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './ProductDetailPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/상품/1. 상품상세/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Width768: Story = { ...scenarios.Width768, name: '768px' };

export const Width375: Story = { ...scenarios.Width375, name: '375px' };
