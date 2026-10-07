import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-system/css';
import { IconBrand, iconBrandVariants } from './IconBrand';

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(9rem, 1fr))',
  gap: '4',
});

const item = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  color: 'black.100',
  fontSize: 'sm',
});

const meta = {
  title: 'Atoms/IconBrand',
  component: IconBrand,
  tags: ['autodocs'],
  args: {
    variant: 'waterproof',
  },
} satisfies Meta<typeof IconBrand>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className={grid}>
      {iconBrandVariants.map((variant) => (
        <div key={variant} className={item}>
          <IconBrand variant={variant} />
          <span>{variant}</span>
        </div>
      ))}
    </div>
  ),
};

export const InheritedColor: Story = {
  render: () => (
    <div className={css({ color: 'blue.100' })}>
      <IconBrand variant="waterproof" size="48px" title="Waterproof" />
    </div>
  ),
};
