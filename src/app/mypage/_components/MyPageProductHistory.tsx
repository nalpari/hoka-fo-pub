'use client';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 마이페이지 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { dataListRecipe } from '@/components/common/atoms/DataList.recipe';
import { Divider } from '@/components/common/atoms/Divider';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { MyPageFrame } from '@/app/mypage/_components/MyPageFrame';
import { type Product, products } from '@/mocks/products';
import { type HistoryItem } from '@/types/mypage-display';
type PreviewItem = HistoryItem & { apparel?: boolean };

type Props = {
  entries?: readonly HistoryItem[];
  items: readonly HistoryItem[];
};

const restockListStyles = {
  mobileDate: css({ display: 'none', _mobile: { display: 'block', mt: '6px' } }),
  dateCell: css({ textAlign: 'center', _mobile: { srOnly: true } }),
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
function MyPageRestockList({ items, entries }: Props) {
  const platform = usePlatform();
  const preview = restockPreview[platform];
  const list = dataListRecipe({
    top: 'strongToThin',
    columnGap: 'metadataColumns',
  });

  return (
    <Stack gap="0" role="table" aria-label="재입고 알림 상품" className={list.root}>
      <Grid role="row" data-list-header className={list.header}>
        {['상품정보', '신청일', '상태'].map((label) => (
          <span role="columnheader" data-list-cell key={label}>
            {label}
          </span>
        ))}
      </Grid>
      {items.map((entry, index) => {
        const { id } = entry;
        const name = entries ? entry?.product.name : preview.name;
        const gender = entries ? entry?.product.gender : preview.gender;
        const requestedAt = entries ? entry?.requestedAt : preview.requestedAt;
        // PC/MO 시안의 서로 다른 상태는 미연결 fixture에서만 적용합니다.
        const sent = entries ? entry?.status === 'sent' : preview.statuses[index] === 'sent';
        return (
          <Grid
            key={id}
            role="row"
            gridTemplateColumns={{
              base: 'minmax(0, 1fr) 150px 150px',
              _mobile: 'minmax(0, 1fr) auto',
            }}
            alignItems="center"
            data-list-item
            rowGap="0"
            py="32px"
            _mobile={{ py: '24px' }}
          >
            <Box
              role="cell"
              display="flex"
              alignItems="center"
              gap="16px"
              px="24px"
              _mobile={{ gap: '8px', px: '0' }}
              minW="0"
            >
              <Checkbox label={null} aria-label={`${name} 재입고 알림 선택`} />
              <OrderProductSummary
                variant="cart"
                name={name ?? ''}
                image={entry?.product.primaryImage ?? product.primaryImage}
                imageSize={{ web: 96, mobile: 64 }}
                content={
                  <Stack gap="0" minW="0">
                    {gender && <Typography variant="b6">{gender}</Typography>}
                    <Typography variant="b6" className={css({ fontWeight: 'medium' })}>
                      {name}
                    </Typography>
                    <Typography
                      aria-hidden="true"
                      variant="b6"
                      tone="tertiary"
                      className={restockListStyles.mobileDate}
                    >
                      신청일 : {requestedAt}
                    </Typography>
                  </Stack>
                }
              />
            </Box>
            <Typography
              role="cell"
              variant="b4"
              tone="subtle"
              className={restockListStyles.dateCell}
            >
              {requestedAt}
            </Typography>
            <Box role="cell" textAlign="center" _mobile={{ alignSelf: 'center' }}>
              <Typography variant="b4" tone="subtle">
                {sent ? '발송완료' : '알림대기'}
              </Typography>
            </Box>
          </Grid>
        );
      })}
    </Stack>
  );
}
type MyPageProductHistoryGridProps = {
  recent?: boolean;
  entries?: readonly HistoryItem[];
  items: readonly PreviewItem[];
  liked: readonly string[];
  onLikedChange: (id: string, active: boolean) => void;
};
function MyPageProductHistoryGrid({
  recent = false,
  entries,
  items,
  liked,
  onLikedChange,
}: MyPageProductHistoryGridProps) {
  const platform = usePlatform();
  const wishlist = !recent;
  return (
    <Grid
      gridTemplateColumns={{
        base: recent ? 'repeat(3, minmax(0, 260px))' : 'repeat(3, minmax(0, 1fr))',
        _mobile: 'repeat(2, minmax(0, 1fr))',
      }}
      px={wishlist ? '16px' : '0'}
      justifyContent={recent ? 'center' : undefined}
      columnGap="16px"
      rowGap="48px"
      _mobile={{ px: '0', columnGap: '8px', rowGap: '40px' }}
    >
      {items.map((item) => (
        <ProductCard
          textWeights={wishlist ? { identity: 'medium', promotion: 'medium' } : undefined}
          key={item.id}
          variant="history"
          thumbnailVariant={wishlist && !entries && item.apparel ? 'listing' : undefined}
          discountLabel={
            (recent || (wishlist && !item.apparel)) && !entries && platform === 'mobile'
              ? recent
                ? recentPreview.mobile.discountLabel
                : wishlistMobilePreview.discountLabel
              : undefined
          }
          activityLabels={
            (recent || (wishlist && !item.apparel)) && !entries
              ? ['데일리 러닝', '워킹']
              : undefined
          }
          colorCount={recent && !entries ? recentPreview.colorCount : undefined}
          liked={liked.includes(item.id)}
          onLikedChange={(active) => onLikedChange(item.id, active)}
          options={['promotion', 'like', recent ? 'color-count' : 'colors']}
          product={item.product}
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
        pt="16px"
        _mobile={{
          mt: '0',
          mx: empty ? '0' : '16px',
          pt: '0',
          borderTop: '0',
        }}
      >
        <Typography as="p" variant="b8" tone="tertiary">
          {note}
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      px={wishlist ? '0' : '16px'}
      pb={wishlist ? '0' : '64px'}
      _mobile={wishlist ? { px: '16px' } : undefined}
    >
      <Divider />
      <Box pt="16px" whiteSpace="pre-line">
        <Typography as="p" variant={wishlist ? 'b8' : 'b6'} tone="tertiary">
          {note}
        </Typography>
      </Box>
    </Box>
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
const wishlistApparelPreview: Product = {
  ...products[0],
  id: 'everyrun',
  name: 'EveryRun 긴팔티',
  gender: "Women's",
  price: 109000,
  originalPrice: undefined,
  discountLabel: undefined,
  promotion: 'Best',
  use: 'Everyday Run',
  primaryImage: '/images/products/everyrun/pdp-94538.png',
  hoverImage: '/images/products/everyrun/pdp-94539.png',
  colors: ['Black', 'Pink', 'Red', 'Blue'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colorThumbnails: [
    { id: 'BLK', label: 'Black', image: '/images/products/everyrun/pdp-94538.png' },
    { id: 'PNK', label: 'Pink', image: '/images/products/everyrun/pdp-94650.png' },
    { id: 'RED', label: 'Red', image: '/images/products/everyrun/pdp-94653.png' },
    { id: 'BLU', label: 'Blue', image: '/images/products/everyrun/pdp-94655.png' },
  ],
};
const wishlistMobilePreview = {
  product: { ...product, promotion: 'Best', originalPrice: 280000 } satisfies Product,
  discountLabel: '20%',
} as const;
// 화면 시안의 플랫폼별 표시 fixture이며 연결된 상품·찜 데이터에는 적용하지 않습니다.
const recentPreview = {
  colorCount: 6,
  web: { product },
  mobile: {
    discountLabel: '20%',
    product: { ...product, promotion: 'Best', originalPrice: 280000 } as Product,
  },
} as const;

const previewItems = {
  wishlist: {
    web: [
      { id: '0', product, liked: true },
      { id: '1', product: wishlistApparelPreview, liked: true, apparel: true },
      { id: '2', product, liked: true },
      { id: '3', product: wishlistApparelPreview, liked: true, apparel: true },
      { id: '4', product, liked: true },
      { id: '5', product: wishlistApparelPreview, liked: true, apparel: true },
    ],
    mobile: [
      { id: '0', product: wishlistMobilePreview.product, liked: true },
      { id: '1', product: wishlistApparelPreview, liked: true, apparel: true },
      { id: '2', product: wishlistMobilePreview.product, liked: true },
      { id: '3', product: wishlistApparelPreview, liked: true, apparel: true },
      { id: '4', product: wishlistMobilePreview.product, liked: true },
      { id: '5', product: wishlistApparelPreview, liked: true, apparel: true },
    ],
  },
  recent: {
    web: [
      { id: '0', product: recentPreview.web.product, liked: true },
      { id: '1', product: recentPreview.web.product, liked: false },
      { id: '2', product: recentPreview.web.product, liked: true },
      { id: '3', product: recentPreview.web.product, liked: false },
      { id: '4', product: recentPreview.web.product, liked: true },
      { id: '5', product: recentPreview.web.product, liked: false },
    ],
    mobile: [
      { id: '0', product: recentPreview.mobile.product, liked: false },
      { id: '1', product: recentPreview.mobile.product, liked: false },
      { id: '2', product: recentPreview.mobile.product, liked: false },
      { id: '3', product: recentPreview.mobile.product, liked: true },
      { id: '4', product: recentPreview.mobile.product, liked: true },
      { id: '5', product: recentPreview.mobile.product, liked: false },
    ],
  },
  'restock-alerts': {
    web: [
      { id: '0', product, liked: false },
      { id: '1', product, liked: false },
    ],
    mobile: [
      { id: '0', product, liked: false },
      { id: '1', product, liked: false },
    ],
  },
} satisfies Record<ProductHistoryKind, Record<'web' | 'mobile', readonly PreviewItem[]>>;

const config = {
  wishlist: {
    title: '관심상품',
    empty: '관심상품 목록이 비어있습니다',
    note: '* 관심 상품에 담은 시점과 구매 시점의 상품 가격 및 할인 정보가 다를 수 있으니 유의해 주시기 바랍니다.',
  },
  recent: {
    title: '최근 본 상품',
    empty: '최근 본 상품\n목록이 비어있습니다',
    emptyDescription: '상품 페이지를 방문하시면\n이곳에 표시됩니다.',
    note: '* 최근 본 상품은 최근에 본 순서대로 최대 50개까지의 상품을 보여드리며, 14일간 유지됩니다.',
  },
  'restock-alerts': {
    title: '재입고 알림 상품',
    empty: '재입고 알림 상품 목록이 비어있습니다',
    note: '* 품절 상품의 상세 화면에서 재입고 알림을 신청하면, 재입고 시 문자로 알려드립니다.\n* 재입고 알림 신청 상태에서 알림 내용을 삭제 시 알림 발송이 취소됩니다.',
  },
} as const;
/** 계정의 상품 내역과 목록 상태를 구성합니다 (Displays the my page product history composition). */
export function MyPageProductHistory({
  kind,
  empty = false,
  entries,
}: {
  kind: ProductHistoryKind;
  empty?: boolean;
  entries?: readonly HistoryItem[];
}) {
  const platform = usePlatform();
  const items: readonly PreviewItem[] = entries ?? (empty ? [] : previewItems[kind][platform]);
  const [likedOverrides, setLikedOverrides] = useState<Record<string, boolean>>({});
  const liked = items
    .filter((item) => likedOverrides[item.id] ?? item.liked)
    .map((item) => item.id);
  const current = config[kind];
  const restock = kind === 'restock-alerts';
  const recent = kind === 'recent';
  const isEmpty = items.length === 0;
  const emptyTextProps = recent
    ? { className: css({ _mobile: { whiteSpace: 'pre-line' } }) }
    : undefined;

  // [ 개발팀 바인딩 ] 최근 본 상품 전체삭제는 표시용입니다. 통합 소유자가 해당 계정 또는 세션의
  // 전체 열람 이력을 대상으로 클릭 시 요청하고, 요청 중 중복 방지와 실패 시 기존 목록 유지 및 재시도를 처리합니다.
  // 성공 시 entries와 전체 건수를 갱신하고 이전 조회 응답을 배제합니다.
  // [ 개발팀 바인딩 ] 재입고 목록은 현재 entries 또는 고정 예시를 표시하고 행 체크만 로컬로 처리합니다.
  // 삭제 버튼은 표시용입니다. 재입고 통합 소유자가 정책에 따른 요청 대상의 신청 행 ID를 연결하고,
  // 요청 중 중복 방지, 실패 시 선택 유지와 재시도, 성공 후 목록 재조회와 이전 응답 배제를 담당합니다.
  return (
    <MyPageFrame
      fillAvailable={!items.length}
      activePath={`/mypage/${kind}`}
      breadcrumbs={[{ label: '상품내역', href: '/mypage' }, { label: current.title }]}
    >
      <Stack
        flex={!items.length ? '1' : undefined}
        gap={items.length ? '40px' : '0'}
        mx={!restock && items.length > 0 ? { _mobile: '-16px' } : undefined}
        _mobile={{
          gap: items.length ? '32px' : '0',
          pt: '24px',
          pb: kind === 'recent' && items.length ? '8px' : '0',
        }}
      >
        <ContentHeader
          title={current.title}
          titleAs="h1"
          titleProps={{ web: 'h4B', mo: 'h7B' }}
          orientation={recent ? 'horizontal' : undefined}
          action={
            recent ? (
              <Button type="button" variant="secondary" size="short" disabled={isEmpty}>
                전체삭제
              </Button>
            ) : undefined
          }
          gap="0"
          pb={items.length ? '0' : '40px'}
          borderBottom={!items.length ? '2px solid black' : undefined}
          _mobile={{
            px: !restock && items.length ? '16px' : '0',
            pt: '0',
            pb: items.length ? '0' : '32px',
          }}
        />
        {!items.length ? (
          <EmptyState
            layout={kind === 'wishlist' ? 'wishlist' : restock ? 'restock' : 'history'}
            variant="page"
            role="status"
            title={`${current.empty}${recent || (kind === 'wishlist' && platform === 'web') ? '' : '.'}`}
            titleProps={emptyTextProps}
            descriptionProps={emptyTextProps}
            description={
              recent
                ? config.recent.emptyDescription
                : restock
                  ? current.note.replace(/^\* /gm, '').replace(/\n/g, ' ')
                  : current.note.replace(/^\* /, '')
            }
          />
        ) : restock ? (
          <Stack gap="16px">
            <Button
              type="button"
              variant="secondary"
              size="short"
              className={css({ alignSelf: 'flex-end' })}
            >
              삭제
            </Button>
            <MyPageRestockList entries={entries} items={items} />
            <Box whiteSpace="pre-line">
              <Typography as="p" variant="b8" tone="tertiary">
                {current.note}
              </Typography>
            </Box>
          </Stack>
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
              items={items}
              liked={liked}
              onLikedChange={(id, active) => {
                setLikedOverrides((current) => ({ ...current, [id]: active }));
              }}
            />
          </ContentSection>
        )}

        {recent && <MyPageProductHistoryNote recent note={current.note} empty={isEmpty} />}
      </Stack>
    </MyPageFrame>
  );
}
