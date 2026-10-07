import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Wishlist } from './Wishlist';

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
