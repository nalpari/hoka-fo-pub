import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { SegmentedControl } from '@/shared/components/atoms/SegmentedControl/SegmentedControl';
import { css } from 'styled-system/css';

function SegmentedStory({ unstyled = false, fullWidth = false }) {
  const [value, setValue] = useState('all');
  return (
    <SegmentedControl
      ariaLabel="상품 정렬"
      onValueChange={setValue}
      unstyled={unstyled}
      fullWidth={fullWidth}
      className={unstyled ? css({ display: 'flex', gap: '2', overflowX: 'auto' }) : undefined}
      itemClassName={
        unstyled
          ? (_, selected) =>
              css({
                flexShrink: '0',
                px: '3',
                py: '2',
                border: '1px solid',
                borderRadius: 'full',
                bg: selected ? 'var(--color-black-100)' : 'var(--color-white-000)',
                color: selected ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
              })
          : undefined
      }
      options={[
        { value: 'all', label: '전체' },
        { value: 'new', label: '신상품' },
        { value: 'sale', label: '세일' },
        { value: 'disabled', label: '품절', disabled: true },
      ]}
      value={value}
    />
  );
}

const meta = {
  title: 'Atoms/SegmentedControl',
  component: SegmentedStory,
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentedStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullWidth: Story = { args: { fullWidth: true } };

export const CustomPresentation: Story = {
  args: { unstyled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const all = canvas.getByRole('button', { name: '전체' });
    const next = canvas.getByRole('button', { name: '신상품' });
    await expect(all).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(next);
    await expect(next).toHaveAttribute('aria-pressed', 'true');
    await expect(all).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(next);
    await expect(next).toHaveAttribute('aria-pressed', 'true');
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', { name: '세일' })).toHaveFocus();
    await expect(canvas.getByRole('button', { name: '품절' })).toBeDisabled();
  },
};

function EmptyValueStory() {
  const [value, setValue] = useState('new');
  return (
    <SegmentedControl
      ariaLabel="빈 문자열 선택값"
      value={value}
      onValueChange={setValue}
      options={[
        { value: '', label: '전체' },
        { value: 'new', label: '신상품' },
      ]}
    />
  );
}

export const EmptyStringValue: Story = {
  render: () => <EmptyValueStory />,
  play: async ({ canvasElement }) => {
    const all = within(canvasElement).getByRole('button', { name: '전체' });
    await userEvent.click(all);
    await expect(all).toHaveAttribute('aria-pressed', 'true');
  },
};
