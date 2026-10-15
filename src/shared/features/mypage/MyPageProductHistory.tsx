'use client';

import { useState } from 'react';
import { css } from 'styled-system/css';
import { Box, Divider, HStack, Stack } from 'styled-system/jsx';
import { products, type Product } from '@/mocks/products';
import { Button } from '@/shared/components/atoms/Button/Button';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';
import { ProductThumbnail } from '@/shared/components/molecules/ProductThumbnail/ProductThumbnail';
import { MyPageFrame } from './MyPageFrame';

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

const itemGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  columnGap: '2',
  rowGap: '6',
  _mobile: { columnGap: '2', rowGap: '4' },
});

const restockRow = css({ borderBottom: '1px solid var(--colors-black-20)' });

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
  const [items, setItems] = useState(() => Array.from({ length: initialCount }, (_, index) => index));
  const [liked, setLiked] = useState<number[]>(() => kind === 'wishlist' ? items : []);
  const [pendingCancel, setPendingCancel] = useState<number | null>(null);
  const current = config[kind];

  return (
    <MyPageFrame
      activePath={`/mypage/${kind}`}
      breadcrumbs={[{ label: '상품내역', href: '/mypage' }, { label: current.title }]}
    >
      <Stack gap="6">
        {items.length ? (
          <>
            <Box px="4" pt="6">
              <Typography as="h1" web="heading8" mo="heading5">{current.title}</Typography>
            </Box>
            {kind === 'restock-alerts' ? (
              <Stack gap="0">
                {items.map((id) => (
                  <HStack key={id} className={restockRow} alignItems="center" gap="4" px="4" py="6">
                    <Box w="16" h="16" flexShrink="0">
                      <ProductThumbnail alt="클리프톤 9" src={product.primaryImage} />
                    </Box>
                    <Stack flex="1" gap="1">
                      <Typography variant="body4" weight="medium">클리프톤 9</Typography>
                      <HStack gap="1">
                        <Typography variant="body4" tone="tertiary">신청일 :</Typography>
                        <Typography variant="body4" language="en" tone="tertiary">2026.05.22</Typography>
                      </HStack>
                    </Stack>
                    <Button variant="link" size="sm" onClick={() => setPendingCancel(id)}>알림대기</Button>
                  </HStack>
                ))}
              </Stack>
            ) : (
              <div className={itemGrid}>
                {items.map((id) => (
                  <ProductCard
                    key={id}
                    liked={liked.includes(id)}
                    onLikedChange={(active) => {
                      setLiked((currentLiked) => active ? [...currentLiked, id] : currentLiked.filter((item) => item !== id));
                      if (!active && kind === 'wishlist') setItems((currentItems) => currentItems.filter((item) => item !== id));
                    }}
                    options={['promotion', 'like', 'colors']}
                    product={product}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <EmptyState title={current.empty} variant="minimal" />
        )}
        <Box px="4" pb="16">
          <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.20" />
          <Box pt="4" whiteSpace="pre-line">
            <Typography as="p" variant="body4" tone="tertiary">
              {current.note}
            </Typography>
          </Box>
        </Box>
      </Stack>
      <ModalDialog
        closeLabel="재입고 알림 취소창 닫기"
        onOpenChange={(open) => { if (!open) setPendingCancel(null); }}
        open={pendingCancel !== null}
        size="sm"
        title="재입고 알림 취소"
      >
        <Stack gap="6">
          <Typography as="p" variant="body3">재입고 알림 신청을 취소하시겠습니까?</Typography>
          <HStack gap="2">
            <Button fullWidth variant="secondary" size="short" onClick={() => setPendingCancel(null)}>취소</Button>
            <Button fullWidth variant="primary" size="short" onClick={() => {
              setItems((currentItems) => currentItems.filter((item) => item !== pendingCancel));
              setPendingCancel(null);
            }}>확인</Button>
          </HStack>
        </Stack>
      </ModalDialog>
    </MyPageFrame>
  );
}
