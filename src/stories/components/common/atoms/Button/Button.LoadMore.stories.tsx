import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Button, ButtonLink } from '@/components/common/atoms/Button';

const meta = {
  title: 'Atoms/Button/LoadMore',
  component: Button,
  tags: ['autodocs'],
  args: { loadMore: { remaining: 12 } },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: '더보기 (12) ⌄' });
    await expect(button).not.toHaveAttribute('loadmore');
  },
};

export const CustomLabel: Story = {
  args: { loadMore: { label: '리뷰 더보기', remaining: 3 } },
};

export const PageCounter: Story = {
  args: {
    loadMore: { counter: { current: 1, total: 3 } },
    variant: 'secondary',
    size: 'short',
  },
};

export const MyPageCounter: Story = {
  args: {
    variant: 'secondary',
    size: 'short',
    fullWidth: true,
    loadMore: {
      counter: { current: 1, total: 3 },
      labelProps: { mo: 'ctaKr2' },
      counterProps: { mo: 'body5' },
    },
  },
};

export const ZeroRemaining: Story = { args: { loadMore: { remaining: 0 } } };

export const Disabled: Story = { args: { disabled: true } };

export const Loading: Story = { args: { loading: true } };

export const CounterLink: Story = {
  render: () => (
    <ButtonLink
      href="/support/faq"
      variant="secondary"
      size="short"
      loadMore={{ label: '전체보기', counter: { current: 1, total: 3 } }}
    />
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole('link', { name: '전체보기 (1/3)' }),
    ).toHaveAttribute('href', '/support/faq');
  },
};

function CounterExample() {
  const [current, setCurrent] = useState(1);
  return (
    <Button
      loadMore={{ counter: { current, total: 3 } }}
      disabled={current === 3}
      onClick={() => setCurrent((value) => value + 1)}
    />
  );
}

export const ControlledCounter: Story = {
  render: () => <CounterExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '더보기 (1/3)' }));
    await userEvent.click(canvas.getByRole('button', { name: '더보기 (2/3)' }));
    await expect(canvas.getByRole('button', { name: '더보기 (3/3)' })).toBeDisabled();
  },
};
