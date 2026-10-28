import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/shared/ShopShell';
import { OrdersPage } from '@/shared/features/orders/OrdersPage';

const meta = {
  title: 'PAGES/장바구니/1. 주문하기/주문내역/WEB',
  component: OrdersPage,
  parameters: { layout: 'fullscreen', nextjs: { appDirectory: true }, platform: 'web' },
  globals: { viewport: 'hoka1600' },
  decorators: [
    (Story) => (
      <ShopShell platform="web">
        <Story />
      </ShopShell>
    ),
  ],
} satisfies Meta<typeof OrdersPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { name: '주문 배송 조회' };
