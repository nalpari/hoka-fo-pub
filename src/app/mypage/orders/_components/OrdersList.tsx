import Image from 'next/image';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Typography } from '@/components/common/atoms/Typography';

import type { OrderClaim, OrderLine, OrderRecord } from '@/components/orders/orders.types';
import { getClaimLines } from '@/components/orders/order-policy';

import { OrderCard, type OrderCardActions, OrderHistoryProduct } from './OrdersProducts';
import {
  OrdersFilters,
  type OrdersFiltersProps,
  type OrderStatusItem,
  OrderStatusTracker,
} from './OrdersStatus';

type OrdersListContentProps = OrdersFiltersProps &
  OrderCardActions & {
    orders: readonly OrderRecord[];
    statusItems: OrderStatusItem[];
    returns?: boolean;
  };

/** 취소·반품 내역의 상품 행을 표시합니다. (Displays one product row in the cancellation and return history.) */
function ClaimHistoryProduct({
  line,
  claim,
  onClick,
  showAmount = true,
  showState = true,
}: {
  line: OrderLine;
  claim: OrderClaim;
  onClick: () => void;
  showAmount?: boolean;
  showState?: boolean;
}) {
  const stateLabel = claim.kind === 'cancel' ? '취소' : '반품';

  return (
    <button
      type="button"
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '3',
        w: '100%',
        p: '0',
        border: '0',
        bg: 'transparent',
        textAlign: 'left',
        cursor: 'pointer',
        _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
      })}
      onClick={onClick}
    >
      <Image
        src={line.image}
        alt={line.name}
        width={64}
        height={64}
        sizes="64px"
        className={css({ w: '16', h: '16', flexShrink: '0', objectFit: 'contain', bg: 'black.10' })}
      />
      <Stack minW="0" gap="1">
        <Typography variant="body5" weight="medium" className={css({ lineClamp: 1 })}>
          {line.name}
        </Typography>
        <Typography variant="body5" tone="subtle" className={css({ lineClamp: 1 })}>
          옵션 : {line.width} / {line.color} / {line.size}
        </Typography>
        {showAmount && line.displayAmount !== undefined ? (
          <Typography variant="body5">{line.displayAmount.toLocaleString()}원</Typography>
        ) : null}
      </Stack>
      {showState ? (
        <Typography variant="body5" className={css({ ml: 'auto', flexShrink: '0' })}>
          {stateLabel}
          {claim.state === 'complete' ? '완료' : '접수'}
        </Typography>
      ) : null}
    </button>
  );
}

/** 취소·반품 내역을 PC 표와 모바일 목록으로 표시합니다. (Displays claim history as a desktop table and mobile list.) */
function ClaimHistoryList({
  orders,
  onClaimDetail,
}: {
  orders: readonly OrderRecord[];
  onClaimDetail: (order: OrderRecord, claim: OrderClaim) => void;
}) {
  const platform = usePlatform();
  const hasItems = orders.some((order) =>
    order.claims.some((claim) => getClaimLines(order, claim).length),
  );

  if (!hasItems) {
    return (
      <Box minH={{ base: '262px', _mobile: '210px' }} display="grid" placeItems="center">
        <Typography variant="body5" tone="subtle">
          취소나 환불한 상품이 없습니다.
        </Typography>
      </Box>
    );
  }

  if (platform === 'mobile') {
    return (
      <Stack as="ul" gap="0" listStyleType="none">
        {orders.flatMap((order) =>
          order.claims.flatMap((claim) =>
            getClaimLines(order, claim).map((line) => (
              <Stack
                as="li"
                key={`${claim.id}-${line.key}`}
                gap="3"
                py="4"
                borderBottom="1px solid var(--colors-black-20)"
              >
                <Typography variant="body5" tone="subtle">
                  <Typography as="span" variant="body5" weight="semibold" tone="primary">
                    {order.date.replaceAll('-', '.')}
                  </Typography>{' '}
                  주문 · 주문번호 {order.id}
                </Typography>
                <ClaimHistoryProduct
                  line={line}
                  claim={claim}
                  onClick={() => onClaimDetail(order, claim)}
                />
              </Stack>
            )),
          ),
        )}
      </Stack>
    );
  }

  const columns =
    'minmax(0, 344fr) minmax(0, 120fr) minmax(0, 120fr) minmax(0, 140fr) minmax(0, 120fr)';

  return (
    <Stack gap="0">
      <Grid
        gridTemplateColumns={columns}
        alignItems="center"
        py="5"
        borderTop="1px solid var(--colors-black-100)"
        borderBottom="1px solid var(--colors-black-100)"
      >
        {['상품정보', '주문일자', '수량', '금액', '처리상태'].map((label, index) => (
          <Typography
            key={label}
            variant="body5"
            className={css({ textAlign: index === 0 ? 'left' : 'center' })}
          >
            {label}
          </Typography>
        ))}
      </Grid>
      {orders.flatMap((order) =>
        order.claims.flatMap((claim) =>
          getClaimLines(order, claim).map((line) => (
            <Grid
              key={`${claim.id}-${line.key}`}
              gridTemplateColumns={columns}
              alignItems="center"
              gap="0"
              py="4"
              borderBottom="1px solid var(--colors-black-20)"
            >
              <ClaimHistoryProduct
                line={line}
                claim={claim}
                showAmount={false}
                showState={false}
                onClick={() => onClaimDetail(order, claim)}
              />
              <Typography variant="body5" className={css({ textAlign: 'center' })}>
                {order.date.replaceAll('-', '.')}
              </Typography>
              <Typography variant="body5" className={css({ textAlign: 'center' })}>
                {line.quantity}개
              </Typography>
              <Typography variant="body5" className={css({ textAlign: 'center' })}>
                {line.displayAmount === undefined
                  ? '-'
                  : `${line.displayAmount.toLocaleString()}원`}
              </Typography>
              <Typography variant="body5" className={css({ textAlign: 'center' })}>
                {claim.kind === 'cancel' ? '취소' : '반품'}
                {claim.state === 'complete' ? '완료' : '접수'}
              </Typography>
            </Grid>
          )),
        ),
      )}
    </Stack>
  );
}

const emptyOrderState = css({
  '& .empty-state__title': {
    fontSize: 'var(--font-sizes-14)',
    fontWeight: 'normal',
    lineHeight: 'body',
    color: 'var(--color-text-subtle)',
  },
});

/** 주문 현황·필터·주문 카드 목록과 빈 상태를 구성합니다. (Composes the order snapshot, filters, cards, and empty state.) */
export function OrdersListContent({
  orders,
  statusItems,
  returns = false,
  ...props
}: OrdersListContentProps) {
  if (returns) {
    return (
      <Stack gap="6">
        <OrdersFilters {...props} returns />
        <ClaimHistoryList
          orders={orders}
          onClaimDetail={(order, claim) => props.onClaimDetail(order, claim)}
        />
      </Stack>
    );
  }

  return (
    <Stack gap="6">
      {/* 주문별 상태 건수를 요약합니다. (Summarizes order counts by status.) */}
      <OrderStatusTracker compact items={statusItems} />
      {/* 주문 기간과 상태 필터를 제공합니다. (Provides order date and status filters.) */}
      <OrdersFilters {...props} />
      {orders.length ? (
        <Stack as="ul" gap="10" listStyleType="none">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} {...props} />
          ))}
        </Stack>
      ) : (
        <Box minH="300px" className={emptyOrderState}>
          <EmptyState variant="standard" title="주문한 상품이 없습니다." />
        </Box>
      )}
    </Stack>
  );
}
