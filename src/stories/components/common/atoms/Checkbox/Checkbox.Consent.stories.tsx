import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Checkbox, type SingleCheckboxProps } from '@/components/common/atoms/Checkbox/Checkbox';

function ConsentCheckbox(props: SingleCheckboxProps) {
  return <Checkbox {...props} />;
}

const meta = {
  title: 'Atoms/Checkbox/Consent',
  component: ConsentCheckbox,
  tags: ['autodocs'],
  args: {
    variant: 'consent',
    checked: false,
    onCheckedChange: () => {},
    label: (
      <>
        이용 약관 및 <a href="#privacy">개인정보 보호정책</a>에 동의합니다.
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 613 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<SingleCheckboxProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = { args: { checked: true } };

export const Error: Story = {
  args: { required: true, error: '계속하려면 이용 약관에 동의해 주세요.' },
};

export const Disabled: Story = { args: { disabled: true } };

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

export const Controlled: Story = {
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
};
