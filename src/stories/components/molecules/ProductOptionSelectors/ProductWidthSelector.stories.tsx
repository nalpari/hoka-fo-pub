import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/shared/context/platform';
import {
  ProductWidthSelector,
  type ProductWidthSelectorProps,
} from '@/shared/components/molecules/ProductOptionSelectors/ProductWidthSelector';

function Example(args: ProductWidthSelectorProps) {
  const [value, setValue] = useState(args.value);
  return (
    <ProductWidthSelector
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
  title: 'Molecules/ProductOptionSelectors/Width',
  component: ProductWidthSelector,
  args: { options: ['Regular', 'Wide', 'X-Wide'], value: 'Regular', onValueChange: fn() },
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
} satisfies Meta<typeof ProductWidthSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Detail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wide = canvas.getByRole('radio', { name: 'Wide' });
    await userEvent.click(wide);
    await expect(wide).toBeChecked();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('radio', { name: 'X-Wide' })).toBeChecked();
  },
};

export const Cart: Story = {
  ...Detail,
  args: { appearance: 'cart' },
  parameters: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const Single: Story = { args: { options: ['Regular'] } };

export const Disabled: Story = { args: { disabled: true } };

export const Empty: Story = { args: { options: [], value: '' } };
