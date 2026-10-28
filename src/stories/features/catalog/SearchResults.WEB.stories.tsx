import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './ProductListingPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/공통/0. 검색결과/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SearchResults: Story = { ...scenarios.SearchResults, name: '검색결과' };

export const SearchEmpty: Story = { ...scenarios.SearchEmpty, name: '검색결과 없음' };
