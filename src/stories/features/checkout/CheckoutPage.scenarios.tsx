import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { products } from '@/mocks/products';
import { CheckoutPage } from '@/stories/features/checkout/CheckoutPagePreview';
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
  args: { cart },
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

export const LocalSelections: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: '네이버페이' }));
    await expect(canvas.getByRole('radio', { name: '네이버페이' })).toBeChecked();
    await userEvent.click(canvas.getByRole('checkbox', { name: /주문 내용을 확인/ }));
    await expect(canvas.getByRole('checkbox', { name: /주문 내용을 확인/ })).toBeChecked();
  },
};

export const MobileLocalSelections: Story = {
  parameters: { layout: 'fullscreen' },
  ...Mobile,
  play: LocalSelections.play,
};

export const CouponSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pay = canvas.getByRole('button', { name: /결제하기/ });
    const initialAmount = pay.textContent;
    const trigger = canvas.getByRole('button', { name: '보유 쿠폰 선택' });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(await page.findByRole('option', { name: '[상품쿠폰] 10% 할인 쿠폰' }));
    await expect(pay).toHaveTextContent(initialAmount ?? '');
    await expect(canvas.getByRole('button', { name: '보유 쿠폰 선택' })).toHaveTextContent(
      '[상품쿠폰] 10% 할인 쿠폰',
    );
  },
};

export const MobileCouponSelection: Story = { ...Mobile, play: CouponSelection.play };
