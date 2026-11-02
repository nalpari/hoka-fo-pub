import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/context/ShopShell';

import { MyPageProductHistory } from '@/components/mypage/MyPageProductHistory';
import { products } from '@/mocks/products';
import { type HistoryItem } from '@/types/mypage-display';
const connectedItems: HistoryItem[] = [
  {
    id: 'restock-request-842',
    product: { ...products[0], name: '외부 상품명', gender: "Women's" },
    liked: false,
    requestedAt: '2027.01.02',
    status: 'waiting',
  },
  {
    id: 'restock-request-913',
    product: { ...products[1], name: '발송된 외부 상품' },
    liked: false,
    requestedAt: '2027.01.03',
    status: 'sent',
  },
];
const meta = {
  title: 'PAGES/마이페이지/3. 재입고 알림 상품/WEB',
  parameters: { layout: 'fullscreen' },
  globals: { viewport: 'hoka1920' },
  args: { initialCount: 2 },
  render: ({ initialCount }) => (
    <ShopShell platform="web">
      <MyPageProductHistory kind="restock-alerts" initialCount={initialCount} />
    </ShopShell>
  ),
} satisfies Meta<{
  initialCount: number;
}>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RestockAlerts: Story = { name: 'Default' };
export const Empty: Story = { name: '빈 목록', args: { initialCount: 0 } };
export const ConnectedLifecycle: Story = {
  name: '재입고 알림 취소 고정 확인',
  render: () => (
    <ShopShell platform="web">
      <MyPageProductHistory kind="restock-alerts" entries={connectedItems} previewCancel />
    </ShopShell>
  ),
};
