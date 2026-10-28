import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { CheckoutPage } from '@/stories/features/checkout/CheckoutPagePreview';
import { products } from '@/mocks/products';
import { PlatformProvider } from '@/context/platform';
import type { CartItem } from '@/types/cart';

const cart: CartItem[] = [
  {
    id: products[0].id,
    color: 'Black',
    width: 'Regular',
    size: '250',
    quantity: 3,
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
    await userEvent.click(canvas.getByRole('checkbox', { name: /개인정보 수집/ }));
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
    const trigger = canvas.getByRole('button', { name: '쿠폰 선택' });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(await page.findByRole('option', { name: '[상품쿠폰] 10% 할인 쿠폰' }));
    await expect(canvas.getByRole('button', { name: /결제하기/ })).toHaveTextContent(
      (products[0].price * 3 - Math.floor(products[0].price * 3 * 0.1)).toLocaleString(),
    );
    const maxBenefit = canvas.getByRole('checkbox', { name: '최대 혜택 적용' });
    await userEvent.click(maxBenefit);
    await expect(maxBenefit).toBeChecked();
    await expect(canvas.getByRole('button', { name: '쿠폰 선택' })).toHaveTextContent(
      '[상품쿠폰] 10% 할인 쿠폰',
    );
  },
};

export const MobileCouponSelection: Story = { ...Mobile, play: CouponSelection.play };
