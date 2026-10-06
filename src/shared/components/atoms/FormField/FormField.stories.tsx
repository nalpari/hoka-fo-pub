import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Select } from '@/shared/components/atoms/Select/Select';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const meta = {
  title: 'Atoms/FormField',
  component: FormField,
  args: {
    htmlFor: 'field-example',
    label: <Typography variant="authCaption">* 이름</Typography>,
    children: <TextInput id="field-example" placeholder="이름을 입력해 주세요" />,
  },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Boxed: Story = { args: { variant: 'boxed' } };

export const BoxedSelect: Story = {
  args: {
    variant: 'boxed',
    label: <Typography variant="authCaption">* 국적</Typography>,
    children: (
      <Select id="field-example">
        <option>내국인</option>
        <option>외국인</option>
      </Select>
    ),
  },
};

export const Mobile: Story = {
  ...Boxed,
  decorators: [
    (Story) => (
      <div className="platform-mobile" style={{ width: 343 }}>
        <Story />
      </div>
    ),
  ],
};
