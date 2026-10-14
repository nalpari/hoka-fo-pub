import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
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

export const Desktop: Story = { render: () => <Example /> };

export const Mobile: Story = { render: () => <Example mobile /> };
