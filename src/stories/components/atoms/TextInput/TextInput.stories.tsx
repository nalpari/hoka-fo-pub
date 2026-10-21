import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { TextInput, type TextInputProps } from '@/shared/components/atoms/TextInput/TextInput';

const meta = {
  title: 'Atoms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: { placeholder: '입력해 주세요.' },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<TextInputProps>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true, value: '입력 불가' } };

export const Clearable: Story = {
  args: { defaultValue: '검색어', clearable: true, 'aria-label': '검색어' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '입력 지우기' }));
    await expect(canvas.getByRole('textbox')).toHaveValue('');
    await expect(canvas.getByRole('textbox')).toHaveFocus();
  },
};

function ControlledTextarea() {
  const [value, setValue] = useState('문의 내용');

  return (
    <TextInput
      multiline
      aria-label="문의 내용"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      clearable
    />
  );
}

export const Textarea: Story = {
  render: () => <ControlledTextarea />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '입력 지우기' }));
    await expect(canvas.getByRole('textbox')).toHaveValue('');
    await userEvent.type(canvas.getByRole('textbox'), '변경된 문의');
    await expect(canvas.getByRole('textbox')).toHaveValue('변경된 문의');
  },
};

export const Compact: Story = {
  args: {
    appearance: 'compact',
    name: 'recipient',
    defaultValue: '홍길동',
    'aria-label': '받는 분',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const input = within(canvasElement).getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, '김호카');
    await expect(input).toHaveValue('김호카');
    await expect(input).toHaveFocus();
  },
};

export const CompactReadOnly: Story = {
  args: { appearance: 'compact', readOnly: true, value: '02157', 'aria-label': '우편번호' },
};
