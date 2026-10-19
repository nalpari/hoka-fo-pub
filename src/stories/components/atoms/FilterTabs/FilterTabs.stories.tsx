import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterTabs, type FilterTabsProps } from '@/shared/components/atoms/FilterTabs/FilterTabs';
import { PlatformProvider } from '@/shared/context/platform';

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

const faqOptions = [
  '전체',
  '상품정보',
  '교환/반품/환불',
  '주문/결제',
  '배송',
  '회원/멤버십',
  'AS/품질',
  '매장/이벤트',
] as const;

function InteractiveLineTabs() {
  const [value, setValue] = useState<(typeof faqOptions)[number]>('전체');

  return (
    <FilterTabs
      ariaLabel="FAQ 카테고리"
      onValueChange={setValue}
      options={faqOptions.map((label) => ({ label, value: label }))}
      value={value}
      variant="line"
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
