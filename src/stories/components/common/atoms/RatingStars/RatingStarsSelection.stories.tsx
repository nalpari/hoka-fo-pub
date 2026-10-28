import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import {
  RatingStars,
  type RatingStarsSelectionProps,
  type RatingValue,
} from '@/components/common/atoms/RatingStars';

function ControlledRating(args: RatingStarsSelectionProps) {
  const [value, setValue] = useState(args.value);
  return (
    <RatingStars
      {...args}
      value={value}
      onValueChange={(next: RatingValue) => {
        setValue(next);
        args.onValueChange(next);
      }}
    />
  );
}

const meta = {
  title: 'Atoms/RatingStars/Selection',
  component: RatingStars,
  args: { ariaLabel: '상품 만족도', value: 0, onValueChange: fn() },
  render: (args) => <ControlledRating {...args} />,
  tags: ['autodocs'],
} satisfies Meta<RatingStarsSelectionProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = { args: { value: 4 } };

export const Disabled: Story = {
  args: { value: 3, disabled: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio', { name: '3점' })).toBeChecked();
    await expect(canvas.getByRole('radio', { name: '4점' })).toBeDisabled();
    await userEvent.click(canvas.getByRole('radio', { name: '4점' }));
    await expect(args.onValueChange).not.toHaveBeenCalled();
  },
};

export const KeyboardSelection: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getAllByRole('radio').every((radio) => radio.getAttribute('aria-checked') === 'false'),
    ).toBe(true);
    await userEvent.click(canvas.getByRole('radio', { name: '3점' }));
    await expect(canvas.getByRole('radio', { name: '3점' })).toBeChecked();
    await expect(args.onValueChange).toHaveBeenLastCalledWith(3);
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('radio', { name: '4점' })).toBeChecked();
    await expect(canvas.getByRole('radio', { name: '4점' })).toHaveFocus();
    await expect(args.onValueChange).toHaveBeenLastCalledWith(4);
    await userEvent.keyboard('{ArrowLeft}');
    await expect(canvas.getByRole('radio', { name: '3점' })).toBeChecked();
  },
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  ...KeyboardSelection,
  globals: { viewport: 'hoka375' },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile">
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
};
