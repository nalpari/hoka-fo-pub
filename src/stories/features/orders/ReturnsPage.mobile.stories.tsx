import { type Meta, type StoryObj } from '@storybook/react';
import { ShopShell } from '@/context/ShopShell';

import { OrdersPage } from '@/components/orders/OrdersRoute';

const meta = {
  title: 'PAGES/주문/2. 취소 반품 내역/Mobile',
  component: OrdersPage,
  args: { returns: true, publishingPreview: true },
  parameters: { layout: 'fullscreen', nextjs: { appDirectory: true } },
  globals: { viewport: 'hoka375' },
  decorators: [
    (Story) => (
      <ShopShell platform="mobile">
        <Story />
      </ShopShell>
    ),
  ],
} satisfies Meta<typeof OrdersPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'Default' };

export const Empty: Story = { name: '빈 목록', args: { initialOrders: [] } };
