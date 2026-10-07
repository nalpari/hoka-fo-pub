import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-system/css';
import { RatingStars, type RatingStarsValue } from './RatingStars';

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
