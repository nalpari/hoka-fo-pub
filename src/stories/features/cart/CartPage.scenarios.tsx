import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { CartProductSection } from '@/app/cart/_components/CartProductSection';
import { cartPreviewRows, cartPreviewTotal } from '@/app/cart/cart-preview';
import CartPage from '@/app/cart/page';
import CartEmptyPage from '@/app/cart/preview-empty/page';

const meta = {
  title: 'PAGES/장바구니/0. 장바구니 목록',
  component: CartPage,
  parameters: { layout: 'fullscreen' },
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

export const Empty: Story = { render: () => <CartEmptyPage /> };

export const Selection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectAll = canvas.getByRole('checkbox', { name: /전체 상품 선택/ });
    await userEvent.click(selectAll);
    await expect(selectAll).toBeChecked();
    await userEvent.click(selectAll);
    await expect(selectAll).not.toBeChecked();
    const favorite = canvas.queryAllByRole('button', { name: /관심상품/ })[0];
    if (favorite) {
      await userEvent.click(favorite);
      await expect(favorite).toHaveAttribute('aria-pressed', 'true');
    }
    await expect(canvas.getAllByText(/^528,000(?:원)?$/).length).toBeGreaterThan(0);
    const before = canvas.getAllByRole('listitem').length;
    for (const button of canvas.getAllByRole('button', { name: /주문하기/ }))
      await userEvent.click(button);
    const remove = canvas.queryAllByRole('button', { name: /삭제하기|Clifton 11 GTX 삭제/ })[0];
    if (remove) await userEvent.click(remove);
    await expect(canvas.getAllByRole('listitem')).toHaveLength(before);
    await expect(canvas.queryByRole('link', { name: /주문하기/ })).not.toBeInTheDocument();
  },
};

export const Quantity: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const quantity = canvas.getAllByRole('textbox', { name: /수량/ })[0];
    const row = quantity.closest('li')!;
    await userEvent.click(within(row).getByRole('button', { name: /증가/ }));
    await expect(quantity).toHaveValue('2');
    await expect(within(row).getByText('240,000원')).toBeVisible();
    await expect(canvas.getAllByText(/^528,000(?:원)?$/).length).toBeGreaterThan(0);
  },
};

export const MobileSelection: Story = { ...Mobile, play: Selection.play };

export const MobileSoldOut: Story = {
  ...Mobile,
  render: () => (
    <CartProductSection
      rows={cartPreviewRows.map((row, index) => (index === 3 ? { ...row, soldOut: true } : row))}
      total={cartPreviewTotal}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('checkbox')[4]).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(canvas.getByRole('checkbox', { name: /전체 상품 선택/ }));
    await expect(canvas.getByText('(3/4)')).toBeVisible();
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
    await expect(dialog.getByRole('radio', { name: '250mm' })).toBeChecked();
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
    await expect(canvas.getByText('옵션 : Regular / 브라운 / 235 1개')).toBeVisible();
    await userEvent.click(canvas.getAllByRole('button', { name: '옵션변경' })[0]);
    await expect(body.getByRole('radio', { name: '250mm' })).not.toBeChecked();
    await userEvent.keyboard('{Escape}');
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
  },
};

export const MobileLimit: Story = {
  ...MobileSoldOut,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getAllByRole('button', { name: '옵션변경' })[3]);
    await expect(
      within(canvasElement.ownerDocument.body).getByText('구매 수량이 제한된 상품입니다'),
    ).toBeVisible();
  },
};
