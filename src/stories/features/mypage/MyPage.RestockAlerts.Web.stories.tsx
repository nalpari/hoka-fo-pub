import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { type HistoryItem, MyPageDataContext } from '@/context/MyPageDataContext';
import { ShopShell } from '@/context/ShopShell';

import { MyPageProductHistory } from '@/components/mypage/MyPageProductHistory';
import { products } from '@/mocks/products';

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

function BindingLifecycle() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [pending, setPending] = useState(true);
  const [cancel, setCancel] = useState<{
    resolve: () => void;
    reject: (error: Error) => void;
    id: string;
  } | null>(null);
  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => {
            setItems(connectedItems);
            setPending(false);
          }}
        >
          조회 응답 공급
        </button>
        <button
          type="button"
          onClick={() =>
            setItems([
              {
                ...connectedItems[0],
                id: 'replacement-request-765',
                product: { ...products[0], name: '교체된 상품명' },
              },
            ])
          }
        >
          목록 교체
        </button>
        <button
          type="button"
          disabled={!cancel}
          onClick={() => {
            cancel?.reject(new Error('취소 요청 실패'));
            setCancel(null);
          }}
        >
          취소 실패 응답
        </button>
        <button
          type="button"
          disabled={!cancel}
          onClick={() => {
            if (cancel) {
              setItems((current) => current.filter((item) => item.id !== cancel.id));
              cancel.resolve();
              setCancel(null);
            }
          }}
        >
          취소 성공 응답
        </button>
      </div>
      <MyPageDataContext.Provider
        value={{
          histories: {
            'restock-alerts': {
              items,
              totalCount: items.length,
              hasMore: false,
              pending,
              onQueryChange: fn(),
              onLoadMore: fn(),
              setLiked: fn(),
              cancelRestock: (id) =>
                new Promise<void>((resolve, reject) => setCancel({ resolve, reject, id })),
            },
          },
        }}
      >
        <MyPageProductHistory kind="restock-alerts" />
      </MyPageDataContext.Provider>
    </>
  );
}

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
} satisfies Meta<{ initialCount: number }>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RestockAlerts: Story = { name: 'Default' };

export const Empty: Story = { name: '빈 목록', args: { initialCount: 0 } };

export const ConnectedLifecycle: Story = {
  name: '연결 데이터 교체와 취소 응답',
  render: () => (
    <ShopShell platform="web">
      <BindingLifecycle />
    </ShopShell>
  ),
};
