import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Stack } from 'styled-system/jsx';

import { Radio } from '@/components/common/atoms/Radio';

const options = [
  { label: '베스트순', value: 'best' },
  { label: '신상품순', value: 'new' },
  { label: '선택 불가', value: 'disabled', disabled: true },
] as const;

function InteractiveRadio() {
  const [value, setValue] = useState<(typeof options)[number]['value']>('best');

  return <Radio ariaLabel="정렬 기준" onValueChange={setValue} options={options} value={value} />;
}

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  args: { ariaLabel: '', onValueChange: () => {}, options: [], value: '' },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <InteractiveRadio />,
};

function LabeledRadio() {
  const [value, setValue] = useState('yes');
  return (
    <Radio
      label={'마케팅 정보\n수신 동의'}
      multilineLabel
      ariaLabel="수신 동의"
      name="preference"
      value={value}
      onValueChange={setValue}
      options={[
        { value: 'yes', label: '수신' },
        { value: 'no', label: '수신안함' },
      ]}
    />
  );
}

export const Labeled: Story = {
  render: () => <LabeledRadio />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const decline = canvas.getByRole('radio', { name: '수신안함' });
    await userEvent.click(decline);
    await expect(decline).toBeChecked();
    await userEvent.keyboard('{ArrowLeft}');
    await expect(canvas.getByRole('radio', { name: /^수신$/ })).toBeChecked();
  },
};

export const FigmaStates: Story = {
  render: () => (
    <Stack gap="6">
      <Radio ariaLabel="선택 가능 상태" onValueChange={() => {}} options={options} value="best" />
      <Radio
        ariaLabel="비활성 상태"
        disabled
        onValueChange={() => {}}
        options={options}
        value="best"
      />
    </Stack>
  ),
};
