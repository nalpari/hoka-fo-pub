'use client';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 마이페이지 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Divider } from '@/components/common/atoms/Divider';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import { type Product, products } from '@/mocks/products';
import { type HistoryItem } from '@/types/mypage-display';
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
        py="20px"
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
            borderBottom="1px solid token(colors.black.20)"
            gap="0"
            py="32px"
            _mobile={{ py: '24px', columnGap: '8px' }}
          >
            <Box px="24px" _mobile={{ px: '0' }} minW="0">
              <OrderProductSummary
                variant="cart"
                name={name ?? ''}
                image={entry?.product.primaryImage ?? product.primaryImage}
                imageSize={{ web: 96, mobile: 64 }}
                content={
                  <Stack gap="0" minW="0">
                    {gender && <Typography variant="body4">{gender}</Typography>}
                    <Typography variant="body4" className={css({ fontWeight: 'medium' })}>
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
                }
              />
            </Box>
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
                <Button
                  variant="unstyled"
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
                    className={css({ _mobile: { color: 'black.50' } })}
                  >
                    알림대기
                  </Typography>
                </Button>
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
      px={wishlist ? '16px' : '0'}
      justifyContent={recent ? 'center' : undefined}
      columnGap={wishlist || recent ? '16px' : '8px'}
      rowGap={wishlist || recent ? '48px' : '24px'}
      _mobile={{ px: '0', columnGap: '8px', rowGap: wishlist || recent ? '40px' : '16px' }}
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
        pt="16px"
        _mobile={{
          mt: '0',
          mx: '16px',
          pt: empty ? '16px' : '0',
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
      px={wishlist ? '0' : '16px'}
      pb={wishlist ? '0' : '64px'}
      _mobile={wishlist ? { px: '16px', display: empty ? 'none' : 'block' } : undefined}
    >
      <Divider />
      <Box pt="16px" whiteSpace="pre-line">
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
  entries,
  previewCancel = false,
}: {
  kind: ProductHistoryKind;
  initialCount?: number;
  entries?: readonly HistoryItem[];
  previewCancel?: boolean;
}) {
  const platform = usePlatform();
  const [demoItems] = useState(() =>
    Array.from({ length: initialCount }, (_, index) => String(index)),
  );
  const items = entries ? entries.map((item) => item.id) : demoItems;
  const [demoLiked, setLiked] = useState<string[]>(() => (kind === 'wishlist' ? demoItems : []));
  const [recentLiked, setRecentLiked] = useState<Record<string, boolean>>({});
  const liked =
    kind === 'recent'
      ? items.filter(
          (id) =>
            recentLiked[id] ?? recentPreview[platform].likedIds.some((likedId) => likedId === id),
        )
      : demoLiked;
  const [pendingCancel, setPendingCancel] = useState<string | null>(
    previewCancel ? (items[0] ?? null) : null,
  );
  const current = config[kind];
  const restock = kind === 'restock-alerts';
  const restockNote =
    '* 품절 상품의 재입고 알림을 신청하면, 재입고 시 카카오톡 알림 메세지로 알려드립니다.\n* 알림 신청은 재입고 알림을 지원하는 품절 상품의 상세 화면에서 할 수 있으며, 알림 대기 중인 신청은 여기서 취소할 수 있습니다.';
  return (
    <MyPageFrame
      activePath={`/mypage/${kind}`}
      breadcrumbs={[{ label: '상품내역', href: '/mypage' }, { label: current.title }]}
    >
      <Stack
        gap={restock || !items.length ? '0' : '32px'}
        mx={
          items.length > 0 && (kind === 'wishlist' || kind === 'recent')
            ? { _mobile: '-16px' }
            : undefined
        }
        _mobile={
          kind === 'recent'
            ? {
                gap: items.length ? '24px' : '0',
                pb: items.length ? '8px' : '0',
                mt: items.length ? '0' : '-24px',
              }
            : kind === 'wishlist'
              ? { gap: '24px', pb: '8px' }
              : undefined
        }
      >
        {!restock && (
          <ContentHeader
            title={current.title}
            titleAs="h1"
            titleProps={{ web: 'heading6', mo: 'heading5' }}
            gap="0"
            pb="40px"
            borderBottom="2px solid var(--colors-black-100)"
            _mobile={{
              px: items.length ? '16px' : '0',
              pt: '0',
              pb: '0',
              borderBottom: '0',
              display: kind === 'recent' && !items.length ? 'none' : undefined,
            }}
          />
        )}
        {restock && (
          <ContentHeader
            title={current.title}
            titleAs="h1"
            titleProps={{ web: 'heading6', mo: 'heading5' }}
            pb="40px"
            borderBottom={items.length ? undefined : '2px solid black'}
            _mobile={{
              pb: '0',
              mb: items.length ? '24px' : '0',
              display: items.length ? 'flex' : 'none',
            }}
          />
        )}
        {!items.length ? (
          <EmptyState
            variant="page"
            role="status"
            title={`${current.empty}${kind === 'recent' || (kind === 'wishlist' && platform === 'web') ? '' : '.'}`}
            description={
              restock
                ? restockNote.replace(/^\* /gm, '').replace(/\n/g, ' ')
                : current.note.replace(/^\* /, '')
            }
            titleProps={{ as: 'p', web: 'headingKr7', mo: 'headingKr5' }}
            descriptionProps={{
              web: 'body3',
              mo: 'body4',
            }}
            layoutProps={css.raw({
              minH: '795px',
              pt: '160px',
              pb: '0',
              justifyContent: 'flex-start',
              _mobile:
                kind === 'wishlist'
                  ? {
                      minH: 'calc(100svh - var(--layout-site-header-height) - 156px)',
                      pt: '200px',
                      pb: '0',
                    }
                  : {
                      minH: 'calc(100svh - var(--layout-site-header-height) - 106px)',
                      py: '0',
                      justifyContent: 'center',
                      ...(restock ? { mt: '-24px' } : {}),
                    },
            })}
          />
        ) : restock ? (
          <MyPageRestockList entries={entries} items={items} onCancelRequest={setPendingCancel} />
        ) : (
          <ContentSection
            gap={kind === 'wishlist' ? '32px' : '24px'}
            footer={
              kind === 'wishlist' ? (
                <MyPageProductHistoryNote note={current.note} wishlist />
              ) : undefined
            }
            header={null}
          >
            <MyPageProductHistoryGrid
              entries={entries}
              recent={kind === 'recent'}
              wishlist={kind === 'wishlist'}
              items={items}
              liked={liked}
              product={product}
              onLikedChange={(id, active) => {
                if (kind === 'recent') {
                  setRecentLiked((currentLiked) => ({ ...currentLiked, [id]: active }));
                  return;
                }
                setLiked((currentLiked) =>
                  active ? [...currentLiked, id] : currentLiked.filter((item) => item !== id),
                );
              }}
            />
          </ContentSection>
        )}

        {restock && items.length > 0 ? (
          <Box
            mt="16px"
            pt={items.length ? '0' : '16px'}
            borderTop={items.length ? undefined : '1px solid token(colors.black.20)'}
            whiteSpace="pre-line"
            _mobile={{ pt: items.length ? '0' : '16px', pb: items.length ? '8px' : '16px' }}
          >
            {items.length > 0 && (
              <Typography
                as="p"
                variant="body5"
                tone="tertiary"
                className={css({ _mobile: { display: 'none' } })}
              >
                {restockNote}
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
        ) : kind === 'wishlist' || !items.length ? null : (
          <MyPageProductHistoryNote
            recent={kind === 'recent'}
            note={current.note}
            empty={!items.length}
          />
        )}
      </Stack>
      <MyPageRestockCancelDialog
        pending={false}
        open={pendingCancel !== null}
        onClose={() => setPendingCancel(null)}
        onConfirm={() => {
          setPendingCancel(null);
        }}
      />
    </MyPageFrame>
  );
}
