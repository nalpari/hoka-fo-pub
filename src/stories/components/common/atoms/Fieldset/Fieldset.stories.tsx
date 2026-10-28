import { type Meta, type StoryObj } from '@storybook/react';
import { TextInput } from '@/components/common/atoms/TextInput/TextInput';
import { Fieldset } from '@/components/catalog/ProductListingPage';

const meta = { title: 'Atoms/Fieldset', component: Fieldset, tags: ['autodocs'] } satisfies Meta<
  typeof Fieldset
>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { legend: '배송 정보', children: <TextInput placeholder="주소를 입력하세요" /> },
};

export const HiddenLegend: Story = {
  args: {
    legend: '검색',
    visuallyHiddenLegend: true,
    children: <TextInput aria-label="검색어" placeholder="검색" />,
  },
};
