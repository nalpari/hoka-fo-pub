import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { FormActionGroup } from '@/components/common/molecules/FormActionGroup';

const onSubmit = fn();

const meta = {
  title: 'Molecules/FormActionGroup',
  component: FormActionGroup,
  tags: ['autodocs'],
  args: { submitLabel: '변경사항 저장', onCancel: fn() },
  render: (args) => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <FormActionGroup {...args} />
    </form>
  ),
  beforeEach: () => {
    onSubmit.mockClear();
  },
} satisfies Meta<typeof FormActionGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '취소' }));
    await expect(args.onCancel).toHaveBeenCalled();
    await expect(onSubmit).not.toHaveBeenCalled();
    await userEvent.click(canvas.getByRole('button', { name: '변경사항 저장' }));
    await expect(onSubmit).toHaveBeenCalledTimes(1);
  },
};

export const Short: Story = { args: { size: 'short' } };

export const DisabledSubmit: Story = { args: { disabled: true } };
