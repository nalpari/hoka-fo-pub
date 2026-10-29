import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { products } from '@/mocks/products';
import { CartPage } from '@/stories/features/cart/CartPagePreview';
import type { CartItem } from '@/types/cart';

const initialCart: CartItem[] = [
  {
    imageSrc: '/images/cart/clifton-preview.png',
    id: products[0].id,
    color: '브라운',
    width: 'Regular',
    size: '235',
    quantity: 1,
  },
  {
    imageSrc: '/images/cart/clifton-preview.png',
    id: products[1].id,
    color: '레드',
    width: 'X-Wide',
    size: '225',
    quantity: 2,
  },
  {
    imageSrc: '/images/cart/clifton-preview.png',
    id: products[2].id,
    color: '화이트',
    width: 'Wide',
    size: '270',
    quantity: 5,
  },
  {
    imageSrc: '/images/cart/clifton-preview.png',
    id: products[3].id,
    color: '옐로우골드',
    width: 'X-Wide',
    size: '250',
    quantity: 4,
  },
];

function CartPreview({ empty = false, soldOut = false }: { empty?: boolean; soldOut?: boolean }) {
  const [cart, setCart] = useState(() =>
    empty
      ? []
      : initialCart.map((item, index) =>
          soldOut && index === 3 ? { ...item, id: products[0].id, size: '300', quantity: 1 } : item,
        ),
  );
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
  title: 'PAGES/장바구니/0. 장바구니 목록',
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

export const MobileSoldOut: Story = {
  ...Mobile,
  render: () => <CartPreview soldOut />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('checkbox')[4]).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(canvas.getByRole('checkbox', { name: /전체 상품 선택/ }));
    await expect(canvas.getByText('전체 (3/4)')).toBeVisible();
    await expect(canvas.getAllByRole('checkbox')[4]).not.toBeChecked();
  },
};

export const MobileOptions: Story = {
  ...Mobile,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getAllByRole('button', { name: '옵션변경' })[0]);
    await expect(
      within(canvasElement.ownerDocument.body).getByRole('dialog', { name: '옵션 변경하기' }),
    ).toBeVisible();
  },
};

export const MobileOptionSave: Story = {
  ...Mobile,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getAllByRole('button', { name: '옵션변경' })[0]);
    const dialog = within(body.getByRole('dialog', { name: '옵션 변경하기' }));
    await userEvent.click(dialog.getByRole('radio', { name: '250mm' }));
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await expect(canvas.getByText('옵션 : Regular / 브라운 / 250 1개')).toBeVisible();
    await expect(canvas.getByText('전체 (2/4)')).toBeVisible();
    await userEvent.click(canvas.getAllByRole('button', { name: '옵션변경' })[0]);
    const reopened = within(body.getByRole('dialog', { name: '옵션 변경하기' }));
    await userEvent.click(reopened.getByRole('radio', { name: '255mm' }));
    await userEvent.click(reopened.getByRole('button', { name: '취소' }));
    await expect(canvas.getByText('옵션 : Regular / 브라운 / 250 1개')).toBeVisible();
  },
};

export const MobileLimit: Story = {
  ...Mobile,
  render: () => <CartPreview soldOut />,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getAllByRole('button', { name: '옵션변경' })[3]);
    await expect(
      within(canvasElement.ownerDocument.body).getByText('구매 수량이 제한된 상품입니다'),
    ).toBeVisible();
  },
};
