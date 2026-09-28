import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Fieldset } from '@/shared/components/atoms/Fieldset/Fieldset';

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
