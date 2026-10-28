import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import {
  ProductColorSelector,
  type ProductColorSelectorProps,
} from '@/components/common/molecules/ProductOptionSelectors/ProductColorSelector';

import { PlatformProvider } from '@/context/platform';

function Example(args: ProductColorSelectorProps) {
  const [value, setValue] = useState(args.value);
  return (
    <ProductColorSelector
      {...args}
      value={value}
      onValueChange={(next) => {
        setValue(next);
        args.onValueChange(next);
      }}
    />
  );
}

const meta = {
  title: 'Molecules/ProductOptionSelectors/Color',
  component: ProductColorSelector,
  args: {
    options: [
      { id: 'Black', label: 'Black', image: '/images/cart/clifton-preview.png' },
      { id: 'White', label: 'White', image: '/images/cart/clifton-preview.png' },
    ],
    value: 'Black',
    onValueChange: fn(),
  },
  render: (args) => <Example {...args} />,
  decorators: [
    (Story, { parameters }) => {
      const platform = parameters.platform === 'mobile' ? 'mobile' : 'web';
      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`} style={{ width: '360px', maxWidth: '100%' }}>
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta<typeof ProductColorSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Detail: Story = {
  play: async ({ canvasElement }) => {
    const white = within(canvasElement).getByRole('radio', { name: 'White' });
    await userEvent.click(white);
    await expect(white).toBeChecked();
  },
};

export const Cart: Story = {
  args: { appearance: 'cart' },
  parameters: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
  play: async ({ canvasElement, args }) => {
    const white = within(canvasElement).getByRole('button', { name: 'White' });
    await userEvent.click(white);
    await expect(args.onValueChange).toHaveBeenCalledWith('White');
    await expect(within(canvasElement).getByText('컬러: White')).toBeVisible();
  },
};

export const Empty: Story = { args: { options: [], value: '' } };
