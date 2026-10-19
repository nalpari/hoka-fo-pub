import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { CheckoutPage } from '@/shared/features/checkout/CheckoutPage';
import { products } from '@/mocks/products';
import { PlatformProvider } from '@/shared/context/platform';
import type { CartItem } from '@/shared/types/cart';

const cart: CartItem[] = [
  {
    id: products[0].id,
    color: 'Black',
    width: 'Regular',
    size: '250',
    quantity: 2,
  },
];

const meta = {
  title: 'PAGES/Checkout',
  tags: ['form-audit'],
  component: CheckoutPage,
  args: { cart, onComplete: fn() },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, { parameters }) => {
      const platform = parameters.platform === 'mobile' ? 'mobile' : 'web';
      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`}>
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta<typeof CheckoutPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Web: Story = {};

export const Empty: Story = { args: { cart: [] } };

export const Mobile: Story = {
  globals: { viewport: 'hoka375' },
  parameters: { platform: 'mobile' },
};

export const MobileEmpty: Story = { ...Mobile, args: { cart: [] } };

function CheckoutClearingCart({ onComplete }: { onComplete: () => void }) {
  const [items, setItems] = useState(cart);
  return (
    <CheckoutPage
      cart={items}
      onComplete={() => {
        setItems([]);
        onComplete();
      }}
    />
  );
}

export const CompleteOrder: Story = {
  render: (args) => <CheckoutClearingCart onComplete={args.onComplete} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /결제하기/ }));
    await expect(canvas.getByRole('heading', { name: '주문/결제' })).toBeVisible();
    await expect(args.onComplete).not.toHaveBeenCalled();
    await userEvent.click(canvas.getByRole('radio', { name: '네이버페이' }));
    await expect(canvas.getByRole('radio', { name: '네이버페이' })).toBeChecked();
    await userEvent.click(canvas.getByRole('checkbox', { name: /주문 내용을 확인/ }));
    await userEvent.click(canvas.getByRole('button', { name: /결제하기/ }));
    await expect(canvas.getByRole('heading', { name: '주문완료' })).toBeVisible();
    await expect(canvas.getByText('주문이 완료되었습니다.')).toBeVisible();
    await expect(args.onComplete).toHaveBeenCalledTimes(1);
  },
};

export const MobileCompleteOrder: Story = {
  ...Mobile,
  render: CompleteOrder.render,
  play: CompleteOrder.play,
};
