import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '@/shared/components/atoms/Dropdown/Dropdown';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faUser } from '@/shared/icons/fontAwesome';

const options = [
  { label: '대한민국', value: 'ko' },
  { label: 'United States', value: 'en' },
] as const;

function ControlledDropdown() {
  const [value, setValue] = useState('ko');

  return (
    <Dropdown ariaLabel="국가 선택" onValueChange={setValue} options={options} value={value} />
  );
}

const meta = {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: { ariaLabel: '국가 선택', defaultValue: 'ko', options },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = { render: () => <ControlledDropdown /> };

export const Disabled: Story = { args: { disabled: true } };

export const Field: Story = {
  args: {
    label: '국가',
    required: true,
    placeholder: '메뉴를 선택해주세요',
    defaultValue: undefined,
    info: '국가 선택 도움말',
  },
};

export const Error: Story = { args: { label: '국가', error: '메뉴를 선택해 주세요.' } };

export const LongList: Story = {
  args: {
    label: '번호',
    defaultValue: undefined,
    options: Array.from({ length: 20 }, (_, i) => ({ value: String(i), label: '항목 ' + (i + 1) })),
  },
};

export const IconList: Story = {
  args: {
    label: '사용자',
    options: options.map((option) => ({
      ...option,
      prefix: <Icon fontAwesomeIcon={faUser} size="16px" />,
    })),
  },
};

export const ImageList: Story = {
  args: {
    label: '국가',
    defaultValue: 'en',
    options: [
      {
        value: 'en',
        label: 'United States',
        prefix: <Icon src="/images/flag/us.svg" size="16px" />,
      },
      { value: 'jp', label: 'Japan', prefix: <Icon src="/images/flag/jp.svg" size="16px" /> },
    ],
  },
};

function ControlledField() {
  const [value, setValue] = useState('');

  return (
    <>
      <Dropdown
        ariaLabel="국가"
        label="국가"
        placeholder="메뉴를 선택해주세요"
        options={options}
        value={value}
        onValueChange={setValue}
      />
      <button type="button" onClick={() => setValue('en')}>
        외부 값 변경
      </button>
    </>
  );
}

export const FieldInteraction: Story = {
  render: () => <ControlledField />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '외부 값 변경' }));
    await expect(canvas.getByRole('combobox')).toHaveTextContent('United States');
    await userEvent.click(canvas.getByRole('combobox'));
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole('option', { name: '대한민국' }));
    await expect(canvas.getByRole('combobox')).toHaveTextContent('대한민국');
    await expect(canvas.getByRole('combobox')).toHaveFocus();
  },
};
