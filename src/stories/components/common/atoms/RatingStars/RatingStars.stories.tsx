import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { css } from 'styled-system/css';

import {
  RatingStars,
  type RatingStarsSelectionProps,
  type RatingStarsValue,
  type RatingValue,
} from '@/components/common/atoms/RatingStars';

const stack = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '3',
});

const row = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
});

const values: RatingStarsValue[] = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const meta = {
  title: 'Atoms/RatingStars',
  component: RatingStars,
  tags: ['autodocs'],
  args: {
    value: 4.5,
  },
} satisfies Meta<typeof RatingStars>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllRatings: Story = {
  render: () => (
    <div className={stack}>
      {values.map((value) => (
        <div className={row} key={value}>
          <RatingStars value={value} />
          <span>{value}</span>
        </div>
      ))}
    </div>
  ),
};

export const InheritedColor: Story = {
  render: () => (
    <div className={css({ color: 'blue.100' })}>
      <RatingStars value={4.5} size="32px" />
    </div>
  ),
};

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

const selectionDefaults = {
  args: { ariaLabel: '상품 만족도', value: 0, onValueChange: fn() },
  render: (args) => <ControlledRating {...args} />,
} satisfies Meta<RatingStarsSelectionProps>;

type SelectionStory = StoryObj<typeof selectionDefaults>;

export const SelectionDefault: SelectionStory = {
  ...selectionDefaults,
  args: { ...selectionDefaults.args },
};

export const SelectionSelected: SelectionStory = {
  ...selectionDefaults,
  args: { ...selectionDefaults.args, value: 4 },
};

export const SelectionDisabled: SelectionStory = {
  ...selectionDefaults,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio', { name: '3점' })).toBeChecked();
    await expect(canvas.getByRole('radio', { name: '4점' })).toBeDisabled();
    await userEvent.click(canvas.getByRole('radio', { name: '4점' }));
    await expect(args.onValueChange).not.toHaveBeenCalled();
  },
  args: { ...selectionDefaults.args, value: 3, disabled: true },
};

export const SelectionKeyboardSelection: SelectionStory = {
  ...selectionDefaults,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getAllByRole('radio').every((radio) => radio.getAttribute('aria-checked') === 'false'),
    ).toBe(true);
    await userEvent.click(canvas.getByRole('radio', { name: '3점' }));
    await expect(canvas.getByRole('radio', { name: '3점' })).toBeChecked();
    await expect(args.onValueChange).toHaveBeenLastCalledWith(3);
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(canvas.getByRole('radio', { name: '4점' })).toBeChecked());
    await expect(canvas.getByRole('radio', { name: '4점' })).toHaveFocus();
    await expect(args.onValueChange).toHaveBeenLastCalledWith(4);
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(canvas.getByRole('radio', { name: '3점' })).toBeChecked());
  },
  args: { ...selectionDefaults.args },
};

export const SelectionMobile: SelectionStory = {
  ...selectionDefaults,
  ...SelectionKeyboardSelection,
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
  args: { ...selectionDefaults.args },
  parameters: { layout: 'fullscreen' },
};
