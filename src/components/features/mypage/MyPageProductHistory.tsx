'use client';

import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { products, type Product } from '@/mocks/products';
import { EmptyState } from '@/components/common/atoms/EmptyState/EmptyState';
import { MyPageFrame } from './MyPageFrame';
import { MyPageProductHistoryHeading } from './MyPageProductHistoryHeading';
import { MyPageRestockList } from './MyPageRestockList';
import { MyPageProductHistoryGrid } from './MyPageProductHistoryGrid';
import { MyPageProductHistoryNote } from './MyPageProductHistoryNote';
import { MyPageRestockCancelDialog } from './MyPageRestockCancelDialog';

type ProductHistoryKind = 'wishlist' | 'recent' | 'restock-alerts';

const product: Product = {
  ...products[0],
  name: 'Speedgoat 7 GTX',
  gender: "Men's",
  price: 240000,
  promotion: 'New',
  use: 'Trail Running',
  primaryImage: '/images/mypage/speedgoat-7-gtx.png',
  hoverImage: '/images/mypage/speedgoat-7-gtx.png',
  colors: ['black', 'cream', 'blue', 'green', 'brown'],
  colorThumbnails: [1, 2, 3, 4, 5].map((index) => ({
    id: `speedgoat-color-${index}`,
    label: `색상 ${index}`,
    image: `/images/mypage/figma-swatch-${index}.png`,
  })),
};

const config = {
  wishlist: {
    title: '관심상품',
    empty: '관심상품 목록이 비어있습니다',
    note: '* 관심 상품에 담은 시점과 구매 시점의 상품 가격 및 할인 정보가 다를 수 있으니 유의해 주시기 바랍니다.',
  },
  recent: {
    title: '최근 본 상품',
    empty: '최근 본 상품 목록이 비어있습니다',
    note: '* 최근 본 상품은 최근에 본 순서대로 최대 50개까지의 상품을 보여드리며, 14일간 유지됩니다.',
  },
  'restock-alerts': {
    title: '재입고 알림 상품',
    empty: '재입고 알림 상품 목록이 비어있습니다',
    note: '* 품절 상품의 재입고 알림을 신청하면, 재입고 시 카카오톡 알림 메시지로 알려드립니다.\n* 알림 신청은 재입고 알림을 지원하는 품절 상품의 상세 화면에서 할 수 있으며, 알림 대기 중인 신청은 여기서 취소할 수 있습니다.',
  },
} as const;

export function MyPageProductHistory({
  kind,
  initialCount = kind === 'restock-alerts' ? 2 : 6,
}: {
  kind: ProductHistoryKind;
  initialCount?: number;
}) {
  const [items, setItems] = useState(() =>
    Array.from({ length: initialCount }, (_, index) => index),
  );
  const [liked, setLiked] = useState<number[]>(() => (kind === 'wishlist' ? items : []));
  const [pendingCancel, setPendingCancel] = useState<number | null>(null);
  const current = config[kind];

  return (
    <MyPageFrame
      activePath={`/mypage/${kind}`}
      breadcrumbs={[{ label: '상품내역', href: '/mypage' }, { label: current.title }]}
    >
      <Stack gap="6">
        {items.length ? (
          <ContentSection gap="6" header={<MyPageProductHistoryHeading title={current.title} />}>
            {kind === 'restock-alerts' ? (
              <MyPageRestockList
                items={items}
                thumbnail={product.primaryImage}
                onCancelRequest={setPendingCancel}
              />
            ) : (
              <MyPageProductHistoryGrid
                items={items}
                liked={liked}
                product={product}
                onLikedChange={(id, active) => {
                  setLiked((currentLiked) =>
                    active ? [...currentLiked, id] : currentLiked.filter((item) => item !== id),
                  );
                  if (!active && kind === 'wishlist')
                    setItems((currentItems) => currentItems.filter((item) => item !== id));
                }}
              />
            )}
          </ContentSection>
        ) : (
          <EmptyState title={current.empty} variant="minimal" />
        )}
        <MyPageProductHistoryNote note={current.note} />
      </Stack>
      <MyPageRestockCancelDialog
        open={pendingCancel !== null}
        onClose={() => setPendingCancel(null)}
        onConfirm={() => {
          setItems((currentItems) => currentItems.filter((item) => item !== pendingCancel));
          setPendingCancel(null);
        }}
      />
    </MyPageFrame>
  );
}
