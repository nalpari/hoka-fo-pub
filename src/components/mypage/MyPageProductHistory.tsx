'use client';

/**
 * [ 개발팀 바인딩 ]
 * MyPageDataContext.histories[kind]에 실제 행 id와 상품 Product/liked/requestedAt을 전달합니다.
 * 재입고 목록은 product.name/gender/primaryImage, requestedAt, status(waiting/sent)를 표시합니다. 미연결 PC/MO 시안 차이는 restockPreview에만 둡니다.
 * 찜 변경은 setLiked(행 id, 여부), 재입고 취소는 cancelRestock(신청 id)로 요청합니다. 연결 소유자가 성공 후 최신 items/totalCount/hasMore를 공급하고 오래된 응답을 폐기합니다.
 * 취소 요청 중 중복 확인·닫기를 막고 실패 시 행과 창을 유지해 재시도합니다. 성공한 경우에만 창을 닫습니다. API는 여기서 구현하지 않습니다.
 * wishlistMobilePreview의 Best·280,000원·20%·240,000원은 모바일 미연결 시안 fixture이며 실제 연결 상품에는 적용하지 않습니다.
 * recentPreview의 PC/MO 배지·할인율·찜 선택은 미연결 시안 fixture입니다. 연결된 recent items/liked가 도착하거나 교체되면 최신 props를 그대로 표시하며 fixture 할인율을 덮어씌우지 않습니다.
 */

import Image from 'next/image';

import { useContext, useState } from 'react';
import { type HistoryItem, MyPageDataContext } from '@/context/MyPageDataContext';
import { usePlatform } from '@/context/platform';
import { useBindingQuery } from '@/hooks/useBindingQuery';
import { useRequestAction } from '@/hooks/useRequestAction';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Divider } from '@/components/common/atoms/Divider';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import { type Product, products } from '@/mocks/products';

function MyPageProductHistoryHeading({
  title,
  wishlist = false,
  recent = false,
  empty = false,
}: {
  title: string;
  wishlist?: boolean;
  recent?: boolean;
  empty?: boolean;
}) {
  if (recent) {
    return (
      <Box
        pb="10"
        borderBottom="2px solid var(--colors-black-100)"
        _mobile={{ px: '4', pb: '0', borderBottom: '0', display: empty ? 'none' : 'block' }}
      >
        <Typography as="h1" web="heading6" mo="heading5">
          {title}
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      px={wishlist ? '0' : '4'}
      pt={wishlist ? '0' : '6'}
      pb={wishlist ? '10' : '0'}
      borderBottom={wishlist ? '2px solid var(--colors-black-100)' : undefined}
      _mobile={wishlist ? { px: '4', pt: '0', pb: '0', borderBottom: '0' } : undefined}
    >
      <Typography as="h1" web={wishlist ? 'heading6' : 'heading8'} mo="heading5">
        {title}
      </Typography>
    </Box>
  );
}

type Props = {
  entries?: readonly HistoryItem[];
  items: readonly string[];
  onCancelRequest: (id: string) => void;
};

const restockPreview = {
  web: {
    name: 'Speedgoat 7 GTX',
    gender: "Men's",
    requestedAt: '2026.10.31',
    statuses: ['waiting', 'sent'],
  },
  mobile: {
    name: '클리프톤 9',
    gender: '',
    requestedAt: '2026.05.22',
    statuses: ['waiting', 'waiting'],
  },
} as const;

function MyPageRestockList({ items, onCancelRequest, entries }: Props) {
  const platform = usePlatform();
  const preview = restockPreview[platform];

  return (
    <Stack gap="0">
      <Grid
        gridTemplateColumns="minmax(0, 1fr) 150px 150px"
        gap="0"
        display={{ base: 'grid', _mobile: 'none' }}
        borderTop="2px solid black"
        borderBottom="1px solid black"
        py="5"
        textAlign="center"
      >
        {['상품정보', '신청일', '상태'].map((label) => (
          <Typography key={label} variant="heading9" language="ko">
            {label}
          </Typography>
        ))}
      </Grid>
      {items.map((id, index) => {
        const entry = entries?.find((item) => item.id === id);
        const name = entries ? entry?.product.name : preview.name;
        const gender = entries ? entry?.product.gender : preview.gender;
        const requestedAt = entries ? entry?.requestedAt : preview.requestedAt;
        // PC/MO 시안의 서로 다른 상태는 미연결 fixture에서만 적용합니다.
        const sent = entries ? entry?.status === 'sent' : preview.statuses[index] === 'sent';
        return (
          <Grid
            key={id}
            gridTemplateColumns={{
              base: 'minmax(0, 1fr) 150px 150px',
              _mobile: 'minmax(0, 1fr) auto',
            }}
            alignItems="center"
            borderBottom="1px solid #E9EAEB"
            gap="0"
            py="8"
            _mobile={{ py: '6', columnGap: '2' }}
          >
            <HStack gap="4" px="6" alignItems="flex-start" _mobile={{ px: '0' }}>
              <Box w="96px" h="96px" flexShrink="0" _mobile={{ w: '64px', h: '64px' }}>
                <Image
                  alt={name ?? ''}
                  src={entry?.product.primaryImage ?? product.primaryImage}
                  width={96}
                  height={96}
                  sizes={platform === 'mobile' ? '64px' : '96px'}
                  className={css({ w: '100%', h: '100%', objectFit: 'cover', bg: '#F7F7F9' })}
                />
              </Box>
              <Stack gap="0" minW="0">
                {gender && <Typography variant="body4">{gender}</Typography>}
                <Typography web="body4" mo="body4" className={css({ fontWeight: 'medium' })}>
                  {name}
                </Typography>
                <Typography
                  variant="body4"
                  tone="tertiary"
                  className={css({ display: 'none', _mobile: { display: 'block', mt: '6px' } })}
                >
                  신청일 : {requestedAt}
                </Typography>
              </Stack>
            </HStack>
            <Typography
              variant="body3"
              tone="subtle"
              className={css({ textAlign: 'center', _mobile: { display: 'none' } })}
            >
              {requestedAt}
            </Typography>
            <Box textAlign="center" _mobile={{ alignSelf: 'center' }}>
              {sent ? (
                <Typography variant="body3" tone="subtle">
                  발송완료
                </Typography>
              ) : (
                <button
                  type="button"
                  aria-label={`${name} 재입고 알림 취소`}
                  onClick={() => onCancelRequest(id)}
                  className={css({
                    border: '0',
                    bg: 'transparent',
                    p: '0',
                    cursor: 'pointer',
                    _focusVisible: { outline: '2px solid', outlineOffset: '4px' },
                  })}
                >
                  <Typography
                    web="body3"
                    mo="body4"
                    language="ko"
                    className={css({ _mobile: { color: '#777777' } })}
                  >
                    알림대기
                  </Typography>
                </button>
              )}
            </Box>
          </Grid>
        );
      })}
    </Stack>
  );
}

type MyPageProductHistoryGridProps = {
  recent?: boolean;
  wishlist?: boolean;
  entries?: readonly HistoryItem[];
  items: readonly string[];
  liked: readonly string[];
  product: Product;
  onLikedChange: (id: string, active: boolean) => void;
};

function MyPageProductHistoryGrid({
  recent = false,
  wishlist = false,
  entries,
  items,
  liked,
  product,
  onLikedChange,
}: MyPageProductHistoryGridProps) {
  const platform = usePlatform();
  return (
    <Grid
      gridTemplateColumns={{
        base: recent ? 'repeat(3, minmax(0, 260px))' : 'repeat(3, minmax(0, 1fr))',
        _mobile: 'repeat(2, minmax(0, 1fr))',
      }}
      px={wishlist ? '4' : '0'}
      justifyContent={recent ? 'center' : undefined}
      columnGap={wishlist || recent ? '4' : '2'}
      rowGap={wishlist || recent ? '12' : '6'}
      _mobile={{ px: '0', columnGap: '2', rowGap: wishlist || recent ? '10' : '4' }}
    >
      {items.map((id) => (
        <ProductCard
          key={id}
          variant={wishlist || recent ? 'history' : 'listing'}
          promotionTone={recent && !entries ? recentPreview[platform].promotionTone : undefined}
          discountLabel={
            (recent || wishlist) && !entries && platform === 'mobile'
              ? recent
                ? recentPreview.mobile.discountLabel
                : wishlistMobilePreview.discountLabel
              : undefined
          }
          activityLabels={(wishlist || recent) && !entries ? ['데일리 러닝', '워킹'] : undefined}
          liked={liked.includes(id)}
          onLikedChange={(active) => onLikedChange(id, active)}
          options={['promotion', 'like', 'colors']}
          product={
            entries?.find((entry) => entry.id === id)?.product ??
            (recent
              ? recentPreview[platform].product
              : wishlist && platform === 'mobile'
                ? wishlistMobilePreview.product
                : product)
          }
        />
      ))}
    </Grid>
  );
}

function MyPageProductHistoryNote({
  note,
  wishlist = false,
  recent = false,
  empty = false,
}: {
  note: string;
  wishlist?: boolean;
  recent?: boolean;
  empty?: boolean;
}) {
  if (recent) {
    return (
      <Box
        borderTop="1px solid var(--colors-black-10)"
        mt={empty ? '-16px' : undefined}
        pt="4"
        _mobile={{
          mt: '0',
          mx: '4',
          pt: empty ? '4' : '0',
          borderTop: empty ? '1px solid var(--colors-black-10)' : '0',
        }}
      >
        <Typography as="p" variant="body5" tone="tertiary">
          {note}
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      px={wishlist ? '0' : '4'}
      pb={wishlist ? '0' : '16'}
      _mobile={wishlist ? { px: '4', display: empty ? 'none' : 'block' } : undefined}
    >
      <Divider />
      <Box pt="4" whiteSpace="pre-line">
        <Typography as="p" variant={wishlist ? 'body5' : 'body4'} tone="tertiary">
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

const wishlistMobilePreview = {
  product: { ...product, promotion: 'Best', originalPrice: 280000 } satisfies Product,
  discountLabel: '20%',
} as const;

// 화면 시안의 플랫폼별 표시 fixture이며 연결된 상품·찜 데이터에는 적용하지 않습니다.
const recentPreview = {
  web: { product, promotionTone: 'error', likedIds: ['0', '1', '2', '3', '4', '5'] },
  mobile: {
    promotionTone: 'brand',
    discountLabel: '20%',
    product: { ...product, promotion: 'Best', originalPrice: 280000 } as Product,
    likedIds: ['3', '4'],
  },
} as const;

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
  const platform = usePlatform();
  const request = useRequestAction();
  useBindingQuery(binding?.onQueryChange, {});
  const [demoItems, setItems] = useState(() =>
    Array.from({ length: initialCount }, (_, index) => String(index)),
  );
  const items = binding ? binding.items.map((item) => item.id) : demoItems;
  const [demoLiked, setLiked] = useState<string[]>(() => (kind === 'wishlist' ? demoItems : []));
  const [recentLiked, setRecentLiked] = useState<Record<string, boolean>>({});
  const liked = binding
    ? binding.items.filter((entry) => entry.liked).map((entry) => entry.id)
    : kind === 'recent'
      ? items.filter(
          (id) =>
            recentLiked[id] ?? recentPreview[platform].likedIds.some((likedId) => likedId === id),
        )
      : demoLiked;
  const [pendingCancel, setPendingCancel] = useState<string | null>(null);
  const current = config[kind];
  const restock = kind === 'restock-alerts';
  const restockNote =
    '* 품절 상품의 재입고 알림을 신청하면, 재입고 시 카카오톡 알림 메세지로 알려드립니다.\n* 알림 신청은 재입고 알림을 지원하는 품절 상품의 상세 화면에서 할 수 있으며, 알림 대기 중인 신청은 여기서 취소할 수 있습니다.';

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
      <Stack
        gap={restock ? '0' : '8'}
        mx={kind === 'wishlist' || kind === 'recent' ? { _mobile: '-16px' } : undefined}
        _mobile={
          kind === 'recent'
            ? {
                gap: items.length ? '6' : '0',
                pb: items.length ? '2' : '0',
                mt: items.length ? '0' : '-24px',
              }
            : kind === 'wishlist'
              ? { gap: '6', pb: '2' }
              : undefined
        }
      >
        {kind === 'recent' && (
          <MyPageProductHistoryHeading title={current.title} recent empty={!items.length} />
        )}
        {kind === 'wishlist' && <MyPageProductHistoryHeading title={current.title} wishlist />}
        {restock && (items.length > 0 || !(binding?.pending || binding?.error)) && (
          <ContentHeader
            title={current.title}
            titleAs="h1"
            titleProps={{ web: 'heading6', mo: 'heading5' }}
            pb="10"
            borderBottom={items.length ? undefined : '2px solid black'}
            _mobile={{
              pb: '0',
              mb: items.length ? '6' : '0',
              display: items.length ? 'flex' : 'none',
            }}
          />
        )}
        {restock ? (
          items.length ? (
            <MyPageRestockList
              entries={binding?.items}
              items={items}
              onCancelRequest={setPendingCancel}
            />
          ) : binding?.pending || binding?.error ? null : (
            <Box
              role="status"
              textAlign="center"
              py="240px"
              mt="8"
              _mobile={{ py: '96px', mt: '0' }}
            >
              <Typography as="p" web="body3" mo="body4" tone="subtle">
                {current.empty}.
              </Typography>
            </Box>
          )
        ) : items.length ? (
          <ContentSection
            gap={kind === 'wishlist' ? '8' : '6'}
            footer={
              kind === 'wishlist' ? (
                <MyPageProductHistoryNote note={current.note} wishlist />
              ) : undefined
            }
            header={
              kind === 'wishlist' || kind === 'recent' ? null : (
                <MyPageProductHistoryHeading title={current.title} />
              )
            }
          >
            <MyPageProductHistoryGrid
              recent={kind === 'recent'}
              wishlist={kind === 'wishlist'}
              entries={binding?.items}
              items={items}
              liked={liked}
              product={product}
              onLikedChange={(id, active) => {
                if (binding) {
                  void request.run(() => binding.setLiked(id, active));
                  return;
                }
                if (kind === 'recent') {
                  setRecentLiked((currentLiked) => ({ ...currentLiked, [id]: active }));
                  return;
                }
                setLiked((currentLiked) =>
                  active ? [...currentLiked, id] : currentLiked.filter((item) => item !== id),
                );
                if (!active && kind === 'wishlist')
                  setItems((currentItems) => currentItems.filter((item) => item !== id));
              }}
            />
          </ContentSection>
        ) : binding?.pending || binding?.error ? null : kind === 'recent' ? (
          <Box py="240px" textAlign="center" _mobile={{ py: '24', px: '4' }}>
            <Typography as="p" variant="body4" className={css({ color: '#4D4D4D' })}>
              {current.empty}
            </Typography>
          </Box>
        ) : kind === 'wishlist' ? (
          <Box py="240px" textAlign="center" _mobile={{ py: '24', px: '4' }}>
            <Typography as="p" variant="body4" className={css({ color: '#4D4D4D' })}>
              {current.empty}.
            </Typography>
          </Box>
        ) : (
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
        {restock ? (
          <Box
            mt="4"
            pt={items.length ? '0' : '4'}
            borderTop={items.length ? undefined : '1px solid #E9EAEB'}
            whiteSpace="pre-line"
            _mobile={{ pt: items.length ? '0' : '4', pb: items.length ? '2' : '4' }}
          >
            {items.length > 0 && (
              <Typography
                as="p"
                variant="body5"
                tone="tertiary"
                className={css({ _mobile: { display: 'none' } })}
              >
                {config.recent.note}
              </Typography>
            )}
            <Typography
              as="p"
              variant="body5"
              tone="tertiary"
              className={css({
                display: items.length ? 'none' : 'block',
                _mobile: { display: 'block' },
              })}
            >
              {restockNote}
            </Typography>
          </Box>
        ) : kind === 'wishlist' && items.length > 0 ? null : (
          <MyPageProductHistoryNote
            recent={kind === 'recent'}
            note={current.note}
            wishlist={kind === 'wishlist'}
            empty={!items.length}
          />
        )}
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
