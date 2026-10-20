import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './ProductListingPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/PRODUCTS/List/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Width768: Story = { ...scenarios.Width768, name: '768px' };

export const Width375: Story = { ...scenarios.Width375, name: '375px' };
