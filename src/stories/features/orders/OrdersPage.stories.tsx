import { type Meta, type StoryObj } from '@storybook/react';
import { ShopShell } from '@/context/ShopShell';

import { previewOrders } from '@/components/orders/orders.data';
import { OrdersPage } from '@/app/mypage/orders/_components/OrdersPage';
const meta = {
  title: 'PAGES/주문/1. 주문 배송 조회/WEB',
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
export const Default: Story = { name: 'Default' };
export const Empty: Story = {
  name: '빈 목록',
  args: { initialOrders: [] },
};
export const OrderDetail: Story = {
  name: '주문 상세',
  args: { initialOrders: [previewOrders[3]], initialView: 'detail' },
};
export const CancelDetail: Story = {
  name: '취소 상세',
  args: { initialOrders: [previewOrders[3]], initialView: 'claim' },
};
export const ReturnDetail: Story = {
  name: '반품 상세',
  args: {
    initialOrders: [{ ...previewOrders[3], claims: [...previewOrders[3].claims].reverse() }],
    initialView: 'claim',
  },
};
export const CancelApplication: Story = {
  name: '주문 취소 신청',
  args: { initialClaimKind: 'cancel' },
};
export const ReturnApplication: Story = {
  name: '환불(반품) 신청',
  args: { initialOrders: [previewOrders[2]], initialClaimKind: 'return' },
};
