import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { FilterTabs, type FilterTabsProps } from '@/components/common/atoms/FilterTabs/FilterTabs';

import { PlatformProvider } from '@/context/platform';

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

const lineOptions = ['탭타이틀1', '탭타이틀2', '탭타이틀3'] as const;
const twoLineOptions = lineOptions.slice(0, 2);

function InteractiveLineTabs({
  options = lineOptions,
  variant = 'line',
}: Pick<FilterTabsProps, 'variant'> & { options?: readonly string[] }) {
  const [value, setValue] = useState<string>(options[0]);

  return (
    <FilterTabs
      ariaLabel="탭 메뉴"
      onValueChange={setValue}
      options={options.map((label) => ({ label, value: label }))}
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

export const Line: Story = {
  render: () => <InteractiveLineTabs />,
};

export const LineTwoTabs: Story = {
  render: () => <InteractiveLineTabs options={twoLineOptions} />,
};

export const Outline: Story = {
  render: () => <InteractiveLineTabs variant="outline" />,
};

export const LineMobile: Story = {
  parameters: { layout: 'fullscreen' },
  globals: { viewport: 'hoka375' },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile">
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
  render: () => <InteractiveLineTabs />,
};

export const PlainMobile: Story = {
  ...LineMobile,
  render: () => <InteractiveFilterTabs variant="plain" />,
};

export const OutlineMobile: Story = {
  ...LineMobile,
  render: () => <InteractiveLineTabs variant="outline" />,
};
