import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { ProductOptionList } from '@/shared/components/molecules/ProductOptionList/ProductOptionList';

function OptionsPreview(args: ComponentProps<typeof ProductOptionList>) {
  const [selectedId, setSelectedId] = useState('black');

  return <ProductOptionList {...args} selectedId={selectedId} onSelect={setSelectedId} />;
}

const meta = {
  title: 'Molecules/ProductOptionList',
  component: ProductOptionList,
  args: {
    layout: 'scroll',
    options: [
      { id: 'black', label: 'Black', image: '/images/cart/clifton-preview.png' },
      { id: 'white', label: 'White', image: '/images/cart/clifton-preview.png' },
    ],
  },
  render: (args) => <OptionsPreview {...args} />,
} satisfies Meta<typeof ProductOptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scroll: Story = {};

export const Grid: Story = { args: { layout: 'grid' } };

export const Preview: Story = { args: { layout: 'preview' } };

export const Cart: Story = {
  args: { layout: 'cart' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Black' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await userEvent.click(canvas.getByRole('button', { name: 'White' }));
    await expect(canvas.getByRole('button', { name: 'White' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(canvas.getByRole('button', { name: 'Black' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  },
};
