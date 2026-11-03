import { type Meta, type StoryObj } from '@storybook/react';
import { ShopShell } from '@/context/ShopShell';

import {
  OrderStatusTracker,
  type OrderStatusItem,
} from '@/app/mypage/orders/_components/OrdersStatus';

const items: OrderStatusItem[] = [
  { label: '전체', count: 3 },
  { label: '결제완료', count: 2 },
  { label: '상품준비중', count: 0 },
  { label: '배송준비\n/ 배송중', count: 0 },
  { label: '배송완료\n/ 구매확정', count: 1 },
];

const meta = {
  title: 'PAGES/주문/주문 현황',
  component: OrderStatusTracker,
  args: { items },
  parameters: { layout: 'fullscreen', nextjs: { appDirectory: true }, platform: 'web' },
  globals: { viewport: 'hoka1600' },
  decorators: [
    (Story, { parameters }) => (
      <ShopShell platform={parameters.platform === 'mobile' ? 'mobile' : 'web'}>
        <Story />
      </ShopShell>
    ),
  ],
} satisfies Meta<typeof OrderStatusTracker>;

export default meta;

type Story = StoryObj<typeof meta>;

/** PC 주문 현황 표시를 확인합니다. (Shows the desktop order status bar.) */
export const Desktop: Story = { name: 'PC', parameters: { platform: 'web' } };

/** 모바일 주문 현황 표시를 확인합니다. (Shows the mobile order status bar.) */
export const Mobile: Story = {
  name: '모바일',
  parameters: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};
