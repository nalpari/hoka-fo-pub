import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { FormField } from './FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Select } from '@/shared/components/atoms/Select/Select';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faUser, faCircleQuestion } from '@/shared/icons/fontAwesome';

const meta = {
  title: 'Atoms/FormField',
  component: FormField,
  tags: ['autodocs'],
  args: {
    htmlFor: 'field-example',
    label: '이름',
    children: <TextInput id="field-example" placeholder="이름을 입력해 주세요" />,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 343 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Boxed: Story = {
  args: {
    variant: 'boxed',
    required: true,
    info: '필드 도움말',
    hint: 'HOKA의 개인정보 보호정책에 대한 자세한 내용을 확인하세요.',
    children: (
      <TextInput
        placeholder="텍스트를 입력해주세요"
        startIcon={<Icon fontAwesomeIcon={faUser} size="16px" />}
        clearable
      />
    ),
  },
};

export const BoxedSelect: Story = {
  args: {
    variant: 'boxed',
    label: '국적',
    required: true,
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

export const Password: Story = {
  args: {
    variant: 'boxed',
    label: '비밀번호',
    required: true,
    info: '비밀번호 도움말',
    children: (
      <TextInput type="password" defaultValue="password123" placeholder="비밀번호를 입력해주세요" />
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/비밀번호/, { selector: 'input' });
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 보기' }));
    await expect(input).toHaveAttribute('type', 'text');
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 숨기기' }));
    await expect(input).toHaveAttribute('type', 'password');
  },
};

export const Phone: Story = {
  args: {
    variant: 'boxed',
    label: '휴대폰 번호',
    required: true,
    children: (
      <TextInput
        type="tel"
        inputMode="numeric"
        placeholder="Example: 33333333333"
        endIcon={<Icon fontAwesomeIcon={faCircleQuestion} size="16px" />}
      />
    ),
  },
};

export const Error: Story = {
  args: {
    variant: 'boxed',
    required: true,
    hint: '입력 도움말',
    error: '이 메시지는 레이블과 관련된 오류 정보를 보여줍니다.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription(
      '입력 도움말 이 메시지는 레이블과 관련된 오류 정보를 보여줍니다.',
    );
    await userEvent.click(canvas.getByText('이름', { selector: 'label', exact: false }));
    await expect(input).toHaveFocus();
  },
};

export const Disabled: Story = { args: { variant: 'boxed', disabled: true } };

export const Textarea: Story = {
  args: {
    variant: 'boxed',
    label: '문의 내용',
    children: <TextInput multiline placeholder="문의 내용을 입력해주세요" />,
  },
};

function ControlledField() {
  const [value, setValue] = useState('초기 입력값');

  return (
    <>
      <FormField variant="boxed" htmlFor="controlled-name" label="이름">
        <TextInput value={value} onChange={(event) => setValue(event.target.value)} clearable />
      </FormField>
      <output>{value || '비어 있음'}</output>
      <button type="button" onClick={() => setValue('외부 입력값')}>
        외부 값 변경
      </button>
    </>
  );
}

export const Controlled: Story = {
  render: () => <ControlledField />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '입력 지우기' }));
    await expect(canvas.getByRole('textbox')).toHaveValue('');
    await expect(canvas.getByRole('textbox')).toHaveFocus();
    await expect(canvas.getByText('비어 있음')).toBeVisible();
    await userEvent.type(canvas.getByRole('textbox'), '호카');
    await expect(canvas.getByRole('textbox')).toHaveValue('호카');
    await userEvent.click(canvas.getByRole('button', { name: '외부 값 변경' }));
    await expect(canvas.getByRole('textbox')).toHaveValue('외부 입력값');
  },
};
