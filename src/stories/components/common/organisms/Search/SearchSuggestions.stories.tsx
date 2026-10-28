import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchSuggestions } from '@/context/ShopShell';

import { suggestedSearches } from '@/components/common/organisms/Search/searchOverlayData';

const meta = {
  title: 'Organisms/Search/SearchSuggestions',
  component: SearchSuggestions,
  args: {
    recentSearches: ['클리프톤', '본디'],
    suggestedSearches,
    onSearch: () => {},
    onNavigateSearch: () => {},
    onRemoveRecent: () => {},
    onClearRecent: () => {},
  },
  render: function ControlledSuggestions(args) {
    const [recentSearches, setRecentSearches] = useState(args.recentSearches);

    return (
      <SearchSuggestions
        {...args}
        recentSearches={recentSearches}
        onRemoveRecent={(query) =>
          setRecentSearches((items) => items.filter((item) => item !== query))
        }
        onClearRecent={() => setRecentSearches([])}
      />
    );
  },
} satisfies Meta<typeof SearchSuggestions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { recentSearches: [] } };

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  globals: { viewport: { value: 'hoka375', isRotated: false } },
  decorators: [
    (Story) => (
      <div className="platform-mobile">
        <Story />
      </div>
    ),
  ],
};
