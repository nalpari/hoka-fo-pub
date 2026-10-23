import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './ProductListingPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/공통/0. 검색결과/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SearchResults: Story = {
  ...scenarios.SearchResults,
  name: '검색결과',
  args: { ...scenarios.SearchResults.args, platform: 'mobile' },
};

export const SearchEmpty: Story = {
  ...scenarios.SearchEmpty,
  name: '검색결과 없음',
  args: { ...scenarios.SearchEmpty.args, platform: 'mobile' },
};
