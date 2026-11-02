import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { Stack } from 'styled-system/jsx';

import { CartHeading } from '@/app/cart/_components/CartHeading';
import { CartOrderActions } from '@/app/cart/_components/CartOrderActions';
import { CartProductSection } from '@/app/cart/_components/CartProductSection';
import { cartPreviewRows } from '@/app/cart/cart-preview';
import CartPage from '@/app/cart/page';
import CartEmptyPage from '@/app/cart/preview-empty/page';
import CartLimitPreviewPage from '@/app/cart/preview-limit/page';
import CartOptionsPreviewPage from '@/app/cart/preview-options/page';
import { OrderPageLayout } from '@/components/orders/OrderPageLayout';

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

export const OptionsOpen: Story = { render: () => <CartOptionsPreviewPage /> };

export const LimitOpen: Story = { render: () => <CartLimitPreviewPage /> };

export const Selection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectAll = canvas.getAllByRole('checkbox', { name: /전체 상품 선택/ })[0];
    const firstItem = canvas
      .getAllByRole('checkbox')
      .find((checkbox) => checkbox.getAttribute('aria-label') !== '전체 상품 선택')!;

    await userEvent.click(firstItem);
    await expect(firstItem).toBeChecked();
    await expect(canvas.getByText('(1/4)')).toBeVisible();

    await userEvent.click(selectAll);
    await expect(selectAll).toBeChecked();
    await expect(canvas.getByText('(3/4)')).toBeVisible();

    await userEvent.click(selectAll);
    await expect(selectAll).not.toBeChecked();
    await expect(canvas.getByText('(0/4)')).toBeVisible();
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
    await expect(canvas.getAllByText(/^3,350,000(?:원)?$/).length).toBeGreaterThan(0);
  },
};

export const MobileSelection: Story = { ...Mobile, play: Selection.play };

export const MobileSelected: Story = {
  ...Mobile,
  render: () => (
    <OrderPageLayout title={<CartHeading itemCount={cartPreviewRows.length} />}>
      <Stack gap="10" pb="12">
        <CartProductSection
          rows={cartPreviewRows.map((row) => ({
            ...row,
            initialSelected: !row.soldOut,
          }))}
        />
        <CartOrderActions selectedPreview />
      </Stack>
    </OrderPageLayout>
  ),
};

export const MobileSoldOut: Story = {
  ...Mobile,
  render: () => <CartProductSection rows={cartPreviewRows} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('checkbox')[4]).toHaveAttribute('aria-disabled', 'true');
    await expect(canvas.getByText('(0/4)')).toBeVisible();
    await expect(canvas.getAllByRole('checkbox')[4]).not.toBeChecked();
  },
};
