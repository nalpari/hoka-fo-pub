import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Stack } from 'styled-system/jsx';

import { Checkbox, type SingleCheckboxProps } from '@/components/common/atoms/Checkbox';

function CheckboxStory(props: SingleCheckboxProps) {
  return <Checkbox {...props} />;
}

function CheckboxGroupStory({ direction = 'column' }: { direction?: 'row' | 'column' }) {
  const [value, setValue] = useState<string[]>(['running', 'walking']);

  return (
    <Checkbox
      ariaLabel="관심 활동"
      direction={direction}
      onValueChange={setValue}
      options={[
        { value: 'running', label: '러닝' },
        { value: 'trail', label: '트레일' },
        { value: 'cycling', label: '사이클링', disabled: true },
        { value: 'walking', label: '워킹', disabled: true },
      ]}
      value={value}
    />
  );
}

const meta = {
  title: 'Atoms/Checkbox',
  component: CheckboxStory,
  tags: ['autodocs'],
  args: { label: '약관에 동의합니다.' },
} satisfies Meta<typeof CheckboxStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const Error: Story = { args: { 'aria-invalid': true } };

export const ErrorChecked: Story = { args: { 'aria-invalid': true, defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true } };

export const DisabledChecked: Story = { args: { defaultChecked: true, disabled: true } };

export const Filter: Story = { args: { label: '비밀글 제외', variant: 'filter' } };

export const FilterChecked: Story = {
  args: { label: '비밀글 제외', variant: 'filter', defaultChecked: true },
};

export const FilterDisabled: Story = {
  args: { label: '비밀글 제외', variant: 'filter', disabled: true },
};

export const FilterStates: Story = {
  render: () => (
    <Stack alignItems="start" gap="10" style={{ padding: '40px' }}>
      <Checkbox label="비밀글 제외" variant="filter" disabled />
      <Checkbox label="비밀글 제외" variant="filter" defaultChecked />
      <Checkbox label="비밀글 제외" variant="filter" />
    </Stack>
  ),
};

export const Group: Story = {
  render: () => <CheckboxGroupStory />,
};

export const GroupRow: Story = {
  render: () => <CheckboxGroupStory direction="row" />,
};

function ControlledTerms() {
  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <Checkbox
        variant="consent"
        checked={checked}
        onCheckedChange={setChecked}
        required
        error={submitted && !checked ? '필수 약관에 동의해 주세요.' : undefined}
        label={
          <>
            필수 약관 동의 <a href="#terms">이용 약관</a>
          </>
        }
      />
      <button type="button" onClick={() => setSubmitted(true)}>
        확인
      </button>
    </>
  );
}

const consentArgs = {
  variant: 'consent',
  checked: false,
  onCheckedChange: () => {},
  label: (
    <>
      이용 약관 및 <a href="#privacy">개인정보 보호정책</a>에 동의합니다.
    </>
  ),
} satisfies NonNullable<Story['args']>;

const consentDecorators: NonNullable<Story['decorators']> = [
  (Story) => (
    <div style={{ maxWidth: 613 }}>
      <Story />
    </div>
  ),
];

export const ConsentDefault: Story = {
  decorators: consentDecorators,
  args: { ...consentArgs },
};

export const ConsentSelected: Story = {
  decorators: consentDecorators,
  args: { ...consentArgs, checked: true },
};

export const ConsentError: Story = {
  decorators: consentDecorators,
  args: { ...consentArgs, required: true, error: '계속하려면 이용 약관에 동의해 주세요.' },
};

export const ConsentDisabled: Story = {
  decorators: consentDecorators,
  args: { ...consentArgs, disabled: true },
};

export const ConsentControlled: Story = {
  decorators: consentDecorators,
  render: () => <ControlledTerms />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '확인' }));
    await expect(canvas.getByRole('alert')).toBeVisible();
    await userEvent.click(canvas.getByRole('checkbox'));
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('link', { name: '이용 약관' }));
    await expect(canvas.getByRole('checkbox')).toBeChecked();
  },
  args: { ...consentArgs },
};
