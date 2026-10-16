import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { products } from '@/mocks/products';
import { PlatformProvider } from '@/shared/context/platform';
import { ProductColorSelector } from '@/shared/features/product/ProductColorSelector';

const colors = products.slice(0, 10).map((product) => product.name);

const gallery = products.slice(0, 10).map((product) => product.primaryImage);

function Example({ mobile = false }: { mobile?: boolean }) {
  const [value, setValue] = useState(colors[0]);

  return (
    <PlatformProvider platform={mobile ? 'mobile' : 'web'}>
      <div
        className={mobile ? 'platform-mobile' : undefined}
        style={{ width: mobile ? 375 : 484, maxWidth: '100%' }}
      >
        <ProductColorSelector
          colors={colors}
          gallery={gallery}
          value={value}
          onValueChange={setValue}
        />
      </div>
    </PlatformProvider>
  );
}

const meta = {
  title: 'Features/Product/ColorSelector',
  component: ProductColorSelector,
} satisfies Meta<typeof ProductColorSelector>;

export default meta;

type Story = StoryObj;

const verifyLayout =
  (mobile: boolean): NonNullable<Story['play']> =>
  async ({ canvasElement }) => {
    const group = within(canvasElement).getByRole('radiogroup', { name: '컬러 선택' });
    const options = within(group).getAllByRole('radio');
    const view = canvasElement.ownerDocument.defaultView!;
    const first = options[0].getBoundingClientRect();
    const columns = Math.floor((group.clientWidth + 8) / 88);

    await expect(view.getComputedStyle(group).display).toBe(mobile ? 'flex' : 'grid');
    await expect(view.getComputedStyle(group).columnGap).toBe('8px');
    for (const [index, option] of options.entries()) {
      const bounds = option.getBoundingClientRect();
      await expect(bounds.width).toBe(80);
      await expect(bounds.height).toBe(53);
      if (mobile || index < columns) {
        await expect(Math.abs(bounds.top - first.top)).toBeLessThan(1);
      } else {
        await expect(bounds.top).toBeGreaterThan(first.top);
      }
    }
    if (mobile) {
      await expect(group.scrollWidth).toBeGreaterThan(group.clientWidth);
    } else {
      await expect(group.scrollWidth).toBeLessThanOrEqual(group.clientWidth);
    }
    await userEvent.click(options[1]);
    await expect(options[1]).toHaveAttribute('data-checked');
    await expect(within(canvasElement).getByRole('heading')).toHaveTextContent(colors[1]);
  };

export const Desktop: Story = { render: () => <Example />, play: verifyLayout(false) };

export const Mobile: Story = {
  render: () => <Example mobile />,
  play: verifyLayout(true),
  globals: { viewport: 'hoka375' },
};
