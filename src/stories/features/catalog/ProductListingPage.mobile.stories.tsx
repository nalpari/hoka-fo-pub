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

export const SearchResults: Story = {
  ...scenarios.SearchResults,
  args: { ...scenarios.SearchResults.args, platform: 'mobile' },
};

export const SearchEmpty: Story = {
  ...scenarios.SearchEmpty,
  args: { ...scenarios.SearchEmpty.args, platform: 'mobile' },
};
