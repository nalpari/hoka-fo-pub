'use client';

/**
 * [개발팀 바인딩]
 * MyPageDataContext.histories[kind]에 실제 행 id와 상품 Product/liked/requestedAt을 전달합니다.
 * 찜 변경은 setLiked(행 id, 여부), 재입고 취소는 cancelRestock(신청 id)로 요청합니다. 성공 후 최신 items를 공급하고 실패 시 reject합니다.
 */

import { useContext } from 'react';
import { useState } from 'react';
import { type HistoryItem, MyPageDataContext } from '@/context/MyPageDataContext';
import { useBindingQuery } from '@/hooks/useBindingQuery';
import { useRequestAction } from '@/hooks/useRequestAction';

import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Divider } from '@/components/common/atoms/Divider';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';
import { ProductThumbnail } from '@/components/common/molecules/ProductThumbnail';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import { type Product, products } from '@/mocks/products';

function MyPageProductHistoryHeading({ title }: { title: string }) {
  return (
    <Box px="4" pt="6">
      <Typography as="h1" web="heading8" mo="heading5">
        {title}
      </Typography>
    </Box>
  );
}

type Props = {
  entries?: readonly HistoryItem[];
  items: readonly string[];
  thumbnail: string;
  onCancelRequest: (id: string) => void;
};

function MyPageRestockList({ items, thumbnail, onCancelRequest, entries }: Props) {
  return (
    <Stack gap="0">
      {items.map((id) => (
        <HStack
          key={id}
          borderBottom="1px solid var(--colors-black-20)"
          alignItems="center"
          gap="4"
          px="4"
          py="6"
        >
          <Box w="16" h="16" flexShrink="0">
            <ProductThumbnail
              alt={entries?.find((entry) => entry.id === id)?.product.name ?? '클리프톤 9'}
              src={entries?.find((entry) => entry.id === id)?.product.primaryImage ?? thumbnail}
            />
          </Box>
          <Stack flex="1" gap="1">
            <Typography variant="body4" weight="medium">
              {entries?.find((entry) => entry.id === id)?.product.name ?? '클리프톤 9'}
            </Typography>
            <HStack gap="1">
              <Typography variant="body4" tone="tertiary">
                신청일 :
              </Typography>
              <Typography variant="body4" language="en" tone="tertiary">
                {entries?.find((entry) => entry.id === id)?.requestedAt ?? '2026.05.22'}
              </Typography>
            </HStack>
          </Stack>
          <Button variant="link" size="sm" onClick={() => onCancelRequest(id)}>
            알림대기
          </Button>
        </HStack>
      ))}
    </Stack>
  );
}

type MyPageProductHistoryGridProps = {
  entries?: readonly HistoryItem[];
  items: readonly string[];
  liked: readonly string[];
  product: Product;
  onLikedChange: (id: string, active: boolean) => void;
};

function MyPageProductHistoryGrid({
  entries,
  items,
  liked,
  product,
  onLikedChange,
}: MyPageProductHistoryGridProps) {
  return (
    <Grid
      gridTemplateColumns="repeat(2, minmax(0, 1fr))"
      columnGap="2"
      rowGap="6"
      _mobile={{ columnGap: '2', rowGap: '4' }}
    >
      {items.map((id) => (
        <ProductCard
          key={id}
          liked={liked.includes(id)}
          onLikedChange={(active) => onLikedChange(id, active)}
          options={['promotion', 'like', 'colors']}
          product={entries?.find((entry) => entry.id === id)?.product ?? product}
        />
      ))}
    </Grid>
  );
}

function MyPageProductHistoryNote({ note }: { note: string }) {
  return (
    <Box px="4" pb="16">
      <Divider />
      <Box pt="4" whiteSpace="pre-line">
        <Typography as="p" variant="body4" tone="tertiary">
          {note}
        </Typography>
      </Box>
    </Box>
  );
}

type MyPageRestockCancelDialogProps = {
  pending?: boolean;
  error?: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function MyPageRestockCancelDialog({
  open,
  onClose,
  onConfirm,
  pending,
  error,
}: MyPageRestockCancelDialogProps) {
  return (
    <ModalDialog
      closeLabel="재입고 알림 취소창 닫기"
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !pending) onClose();
      }}
      open={open}
      size="sm"
      title="재입고 알림 취소"
      actions={{
        kind: 'confirm',
        onConfirm: onConfirm,
        fullWidth: false,
        confirmDisabled: pending,
      }}
    >
      <BindingFeedback pending={pending} error={error} />
      <Typography as="p" variant="body3">
        재입고 알림 신청을 취소하시겠습니까?
      </Typography>
    </ModalDialog>
  );
}

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

/** 계정의 상품 내역과 목록 상태를 구성합니다 (Displays the my page product history composition). */
export function MyPageProductHistory({
  kind,
  initialCount = kind === 'restock-alerts' ? 2 : 6,
}: {
  kind: ProductHistoryKind;
  initialCount?: number;
}) {
  const binding = useContext(MyPageDataContext).histories?.[kind];
  const request = useRequestAction();
  useBindingQuery(binding?.onQueryChange, {});
  const [demoItems, setItems] = useState(() =>
    Array.from({ length: initialCount }, (_, index) => String(index)),
  );
  const items = binding ? binding.items.map((item) => item.id) : demoItems;
  const [demoLiked, setLiked] = useState<string[]>(() => (kind === 'wishlist' ? demoItems : []));
  const liked = binding
    ? binding.items.filter((entry) => entry.liked).map((entry) => entry.id)
    : demoLiked;
  const [pendingCancel, setPendingCancel] = useState<string | null>(null);
  const current = config[kind];

  return (
    <MyPageFrame
      activePath={`/mypage/${kind}`}
      breadcrumbs={[{ label: '상품내역', href: '/mypage' }, { label: current.title }]}
    >
      <BindingFeedback
        {...binding}
        pending={binding?.pending || request.pending}
        error={binding?.error || request.error}
      />
      <Stack gap="6">
        {items.length ? (
          <ContentSection gap="6" header={<MyPageProductHistoryHeading title={current.title} />}>
            {kind === 'restock-alerts' ? (
              <MyPageRestockList
                entries={binding?.items}
                items={items}
                thumbnail={product.primaryImage}
                onCancelRequest={setPendingCancel}
              />
            ) : (
              <MyPageProductHistoryGrid
                entries={binding?.items}
                items={items}
                liked={liked}
                product={product}
                onLikedChange={(id, active) => {
                  if (binding) {
                    void request.run(() => binding.setLiked(id, active));
                    return;
                  }
                  setLiked((currentLiked) =>
                    active ? [...currentLiked, id] : currentLiked.filter((item) => item !== id),
                  );
                  if (!active && kind === 'wishlist')
                    setItems((currentItems) => currentItems.filter((item) => item !== id));
                }}
              />
            )}
          </ContentSection>
        ) : binding?.pending || binding?.error ? null : (
          <EmptyState title={current.empty} variant="minimal" />
        )}
        {binding?.hasMore && (
          <Button
            disabled={binding.pending || request.pending}
            onClick={() => {
              void request.run(binding.onLoadMore);
            }}
          >
            더보기
          </Button>
        )}
        <MyPageProductHistoryNote note={current.note} />
      </Stack>
      <MyPageRestockCancelDialog
        pending={request.pending}
        error={request.error}
        open={pendingCancel !== null}
        onClose={() => setPendingCancel(null)}
        onConfirm={() => {
          if (binding && pendingCancel !== null) {
            void request.run(async () => {
              await binding.cancelRestock(pendingCancel);
              setPendingCancel(null);
            });
            return;
          }
          setItems((currentItems) => currentItems.filter((item) => item !== pendingCancel));
          setPendingCancel(null);
        }}
      />
    </MyPageFrame>
  );
}
