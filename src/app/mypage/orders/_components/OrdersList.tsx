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
  const stateLabel =
    claim.state === 'complete' ? '환불완료' : `${claim.kind === 'cancel' ? '취소' : '반품'}접수`;

  return (
    <button
      type="button"
      className={css({
        display: 'flex',
        alignItems: 'stretch',
        gap: '16px',
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
        width={96}
        height={96}
        sizes="96px"
        className={css({
          w: '96px',
          h: '96px',
          flexShrink: '0',
          objectFit: 'contain',
          bg: 'black.10',
        })}
      />
      <Stack minW="0" flex="1" gap="0" justifyContent="space-between">
        <Stack gap="1">
          <Typography web="body3" mo="body4" weight="medium">
            {line.name}
          </Typography>
          <Typography web="body3" mo="body4" weight="medium" tone="subtle">
            옵션 : {line.width} / {line.color} / {line.size}
            {showAmount ? ` / ${line.quantity}개` : ''}
          </Typography>
          {showAmount && line.displayAmount !== undefined ? (
            <Typography variant="body4" weight="medium">
              <Typography as="span" variant="body4" language="en" weight="medium">
                {line.displayAmount.toLocaleString()}
              </Typography>
              원
            </Typography>
          ) : null}
        </Stack>
        {showState ? (
          <Typography
            variant="body4"
            weight="medium"
            tone="tertiary"
            className={css({ textAlign: 'right' })}
          >
            {stateLabel}
          </Typography>
        ) : null}
      </Stack>
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
      <Box py={{ base: '120px', _mobile: '96px' }} display="grid" placeItems="center">
        <Typography web="body3" mo="body4" tone="subtle">
          취소나 환불한 상품이 없습니다.
        </Typography>
      </Box>
    );
  }

  if (platform === 'mobile') {
    return (
      <Stack as="ul" gap="24px" listStyleType="none">
        {orders.flatMap((order) =>
          order.claims.flatMap((claim) =>
            getClaimLines(order, claim).map((line) => (
              <Stack
                as="li"
                key={`${claim.id}-${line.key}`}
                gap="0"
                borderBottom="1px solid var(--color-black-100)"
              >
                <Box display="flex" pb="16px" borderBottom="1px solid var(--color-border-subtle)">
                  <Typography variant="body4" tone="tertiary">
                    <Typography as="span" variant="body4" weight="medium" tone="primary">
                      <Typography as="span" variant="body4" language="en" weight="medium">
                        {order.date.replaceAll('-', '.')}
                      </Typography>{' '}
                      주문
                    </Typography>
                    {' · 주문번호 '}
                    <Typography as="span" variant="body4" language="en" tone="tertiary">
                      {order.id}
                    </Typography>
                  </Typography>
                </Box>
                <Box py="16px">
                  <ClaimHistoryProduct
                    line={line}
                    claim={claim}
                    onClick={() => onClaimDetail(order, claim)}
                  />
                </Box>
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
        borderTop="2px solid var(--color-black-100)"
        borderBottom="1px solid var(--colors-black-100)"
      >
        {['상품정보', '주문일자', '수량', '금액', '처리상태'].map((label) => (
          <Typography
            key={label}
            variant="heading9"
            weight="bold"
            className={css({ textAlign: 'center' })}
          >
            {label}
          </Typography>
        ))}
      </Grid>
      {orders.flatMap((order) =>
        order.claims.flatMap((claim) =>
          getClaimLines(order, claim).map((line) => (
            <Stack key={`${claim.id}-${line.key}`} gap="0" pt="32px">
              <Typography variant="body3" tone="tertiary" className={css({ pl: '24px' })}>
                주문번호{' '}
                <Typography as="span" variant="body3" language="en" tone="tertiary">
                  {order.id}
                </Typography>
              </Typography>
              <Grid
                gridTemplateColumns={columns}
                alignItems="center"
                gap="0"
                pt="16px"
                pb="32px"
                borderBottom="1px solid var(--color-border-subtle)"
              >
                <Box px="24px">
                  <ClaimHistoryProduct
                    line={line}
                    claim={claim}
                    showAmount={false}
                    showState={false}
                    onClick={() => onClaimDetail(order, claim)}
                  />
                </Box>
                <Typography
                  variant="body3"
                  language="en"
                  weight="medium"
                  className={css({ textAlign: 'center' })}
                >
                  {order.date.replaceAll('-', '.')}
                </Typography>
                <Typography
                  variant="body3"
                  weight="medium"
                  className={css({ textAlign: 'center' })}
                >
                  {line.quantity}개
                </Typography>
                <Typography
                  variant="body3"
                  weight="medium"
                  className={css({ textAlign: 'center' })}
                >
                  {line.displayAmount === undefined ? (
                    '-'
                  ) : (
                    <>
                      <Typography as="span" variant="body3" language="en" weight="medium">
                        {line.displayAmount.toLocaleString()}
                      </Typography>
                      원
                    </>
                  )}
                </Typography>
                <Typography
                  variant="body3"
                  weight="medium"
                  className={css({ textAlign: 'center' })}
                >
                  {claim.state === 'complete'
                    ? claim.kind === 'cancel'
                      ? '취소완료'
                      : '환불완료'
                    : `${claim.kind === 'cancel' ? '취소' : '반품'}접수`}
                </Typography>
              </Grid>
            </Stack>
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
      <Stack gap="6" css={{ '--color-text-primary': '#000' }}>
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
      <OrderStatusTracker items={statusItems} />
      {/* 주문 기간과 상태 필터를 제공합니다. (Provides order date and status filters.) */}
      <OrdersFilters {...props} />
      {orders.length ? (
        <Stack gap="0px">
          <Grid
            gridTemplateColumns="minmax(0, 536fr) minmax(0, 108fr) minmax(0, 200fr)"
            alignItems="center"
            minH="67px"
            borderTop="1px solid var(--colors-black-100)"
            borderBottom="1px solid var(--colors-black-20)"
            _mobile={{ display: 'none' }}
          >
            <Typography variant="body3" weight="medium" className={css({ textAlign: 'center' })}>
              상품/옵션정보
            </Typography>
            <Typography variant="body3" weight="medium" className={css({ textAlign: 'center' })}>
              수량
            </Typography>
            <Typography variant="body3" weight="medium" className={css({ textAlign: 'center' })}>
              가격
            </Typography>
          </Grid>
          <Stack as="ul" gap={{ base: '0px', _mobile: '32px' }} listStyleType="none">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} {...props} />
            ))}
          </Stack>
        </Stack>
      ) : (
        <Box minH="300px" className={emptyOrderState}>
          <EmptyState variant="standard" title="주문한 상품이 없습니다." />
        </Box>
      )}
    </Stack>
  );
}
