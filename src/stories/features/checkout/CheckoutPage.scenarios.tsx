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
  title: 'PAGES/주문/0. 주문서',
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
  parameters: { layout: 'fullscreen', platform: 'mobile' },
};

export const MobileEmpty: Story = {
  parameters: { layout: 'fullscreen' },
  ...Mobile,
  args: { cart: [] },
};

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
    await expect(canvas.getByRole('heading', { level: 1, hidden: true })).toBeInTheDocument();
    await expect(canvas.getByText('구매해 주셔서 감사합니다.')).toBeVisible();
    await expect(args.onComplete).toHaveBeenCalledTimes(1);
  },
};

export const MobileCompleteOrder: Story = {
  parameters: { layout: 'fullscreen' },
  ...Mobile,
  render: CompleteOrder.render,
  play: CompleteOrder.play,
};

export const CouponSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '조회하기' }));
    const dialog = within(await page.findByRole('dialog', { name: '보유 쿠폰 조회' }));
    const trigger = dialog.getByRole('button', { name: /사용 가능 쿠폰/ });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(dialog.getByRole('radio', { name: '[상품쿠폰] 10% 할인 쿠폰' }));
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(dialog.getByRole('radio', { name: '[상품쿠폰] 10% 할인 쿠폰' })).toBeChecked();
    await userEvent.click(dialog.getByRole('button', { name: '쿠폰 적용하기' }));
    await expect(canvas.getByRole('button', { name: /결제하기/ })).toHaveTextContent(
      (products[0].price * 2 - Math.floor(products[0].price * 2 * 0.1)).toLocaleString(),
    );
  },
};

export const MobileCouponSelection: Story = { ...Mobile, play: CouponSelection.play };
