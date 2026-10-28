import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Wishlist } from '@/components/common/atoms/Wishlist';

function WishlistStory() {
  const [active, setActive] = useState(false);

  return <Wishlist active={active} ariaLabel="관심상품" onActiveChange={setActive} />;
}

const meta = {
  title: 'Atoms/Wishlist',
  component: WishlistStory,
  tags: ['autodocs'],
} satisfies Meta<typeof WishlistStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function LabelledWishlistStory() {
  const [active, setActive] = useState(false);

  return (
    <Wishlist
      active={active}
      ariaLabel="관심상품"
      label="관심상품"
      iconSize="12px"
      onActiveChange={setActive}
    />
  );
}

export const Labelled: Story = {
  render: () => <LabelledWishlistStory />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: '관심상품' });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  },
};
