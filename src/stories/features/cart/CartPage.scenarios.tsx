import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { products } from '@/mocks/products';
import { PlatformProvider } from '@/shared/context/platform';
import { CartPage } from '@/shared/features/cart/CartPage';
import type { CartItem } from '@/shared/types/cart';

const initialCart: CartItem[] = [
  { id: products[0].id, color: '브라운', width: 'Regular', size: '235', quantity: 1 },
  { id: products[1].id, color: '레드', width: 'X-Wide', size: '225', quantity: 2 },
  { id: products[2].id, color: '화이트', width: 'Wide', size: '270', quantity: 5 },
  { id: products[3].id, color: '옐로우골드', width: 'X-Wide', size: '250', quantity: 4 },
];

function CartPreview({ empty = false }: { empty?: boolean }) {
  const [cart, setCart] = useState(empty ? [] : initialCart);
  const updateQuantity = (item: CartItem, quantity: number) =>
    setCart((previous) =>
      previous.map((current) => (current === item ? { ...current, quantity } : current)),
    );
  const remove = (item: CartItem) =>
    setCart((previous) => previous.filter((current) => current !== item));
  return (
    <CartPage
      cart={cart}
      onQuantityChange={updateQuantity}
      onRemove={remove}
      onOptionsChange={(item, next) =>
        setCart((previous) => previous.map((current) => (current === item ? next : current)))
      }
    />
  );
}

const meta = {
  title: 'PAGES/Cart',
  component: CartPage,
  args: { cart: initialCart, onQuantityChange: fn(), onRemove: fn() },
  parameters: { layout: 'fullscreen' },
  render: () => <CartPreview />,
  decorators: [
    (Story, context) => {
      const platform = context.parameters.platform === 'mobile' ? 'mobile' : 'web';
      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`}>
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta<typeof CartPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Web: Story = {};

export const Mobile: Story = {
  globals: { viewport: 'hoka375' },
  parameters: { layout: 'fullscreen', platform: 'mobile' },
};

export const Empty: Story = { render: () => <CartPreview empty /> };

export const Selection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('checkbox', { name: /전체 상품 선택/ }));
    await expect(canvas.getByRole('checkbox', { name: /전체 상품 선택/ })).toBeChecked();
    await expect(canvas.getByRole('link', { name: '주문하기' })).toBeVisible();
    const favorite = canvas.getAllByRole('button', { name: /관심상품/ })[0];
    await userEvent.click(favorite);
    await expect(favorite).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(canvas.getByRole('checkbox', { name: /전체 상품 선택/ }));
    await expect(canvas.getByRole('button', { name: '주문하기' })).toBeDisabled();
  },
};

export const MobileSelection: Story = { ...Mobile, play: Selection.play };
