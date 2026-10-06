import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterTabs, type FilterTabsProps } from './FilterTabs';

const options = [
  { label: '전체', value: 'all' },
  { label: '러닝', value: 'running' },
  { label: '트레일', value: 'trail' },
] as const;

function InteractiveFilterTabs({ variant }: Pick<FilterTabsProps, 'variant'>) {
  const [value, setValue] = useState<(typeof options)[number]['value']>('all');

  return (
    <FilterTabs
      ariaLabel="상품 필터"
      onValueChange={setValue}
      options={options}
      value={value}
      variant={variant}
    />
  );
}

const meta = {
  title: 'Atoms/Filter Tabs',
  component: FilterTabs,
  tags: ['autodocs'],
  args: {
    ariaLabel: '상품 필터',
    onValueChange: () => {},
    options: [],
    value: '',
  },
} satisfies Meta<typeof FilterTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <InteractiveFilterTabs variant="default" />,
};

export const Fill: Story = {
  render: () => <InteractiveFilterTabs variant="fill" />,
};
