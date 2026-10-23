import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/shared/context/platform';
import {
  ProductSizeSelector,
  type ProductSizeSelectorProps,
} from '@/shared/components/molecules/ProductOptionSelectors/ProductSizeSelector';

function Example(args: ProductSizeSelectorProps) {
  const [value, setValue] = useState(args.value);
  return (
    <ProductSizeSelector
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
  title: 'Molecules/ProductOptionSelectors/Size',
  component: ProductSizeSelector,
  args: {
    options: [
      { value: '240', state: 'available' },
      { value: '245', state: 'soldOut' },
      { value: '250', state: 'lowStock' },
      { value: '255', state: 'unavailable' },
      { value: '260', state: 'available' },
    ],
    value: '240',
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
} satisfies Meta<typeof ProductSizeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Detail: Story = {
  args: { description: '사이즈 추천: 정사이즈' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio', { name: /245/ })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    await expect(canvas.getByRole('radio', { name: /255/ })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    const size = canvas.getByRole('radio', { name: /250/ });
    await userEvent.click(size);
    await expect(size).toBeChecked();
  },
};

export const Cart: Story = {
  ...Detail,
  args: { appearance: 'cart' },
  parameters: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const Error: Story = {
  args: {
    error: '사이즈를 선택해 주세요.',
    value: '',
    action: <a href="/support/size-guide">사이즈 가이드</a>,
  },
};

export const Empty: Story = { args: { options: [], value: '' } };
