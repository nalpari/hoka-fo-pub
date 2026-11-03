import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Typography } from '@/components/common/atoms/Typography';

import type { ClaimHistoryItem, OrderRecord } from '@/components/orders/orders.types';

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
    claimHistoryItems: readonly ClaimHistoryItem[];
    onHistoryDetail: (orderId: string, claimId: string) => void;
    statusItems: OrderStatusItem[];
    returns?: boolean;
  };

/** [ 개발팀 바인딩 ] items는 호출자가 준비한 상품·수량·날짜·PC/MO 상태 문구입니다. 상품 분류와 상태 결정은 연결 소유자가 담당하며 onDetail은 전달된 orderId/claimId로 상세를 여는 로컬 UI 콜백입니다. */
/** 취소·반품 내역을 PC 표와 모바일 목록으로 표시합니다. (Displays claim history as a desktop table and mobile list.) */
function ClaimHistoryList({
  items,
  onDetail,
}: {
  items: readonly ClaimHistoryItem[];
  onDetail: (orderId: string, claimId: string) => void;
}) {
  const platform = usePlatform();
  if (!items.length) {
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
        {items.map((item) => (
          <Stack as="li" key={item.key} gap="0" borderBottom="1px solid var(--color-black-100)">
            <Box display="flex" pb="16px" borderBottom="1px solid var(--color-border-subtle)">
              <Typography variant="body4" tone="tertiary">
                <Typography as="span" variant="body4" weight="medium" tone="primary">
                  <Typography as="span" variant="body4" language="en" weight="medium">
                    {item.orderDate}
                  </Typography>{' '}
                  주문
                </Typography>
                {' · 주문번호 '}
                <Typography as="span" variant="body4" language="en" tone="tertiary">
                  {item.orderNumber}
                </Typography>
              </Typography>
            </Box>
            <Box py="16px">
              <OrderHistoryProduct
                line={item.line}
                statusText={item.status.mobile}
                onClick={() => onDetail(item.orderId, item.claimId)}
              />
            </Box>
          </Stack>
        ))}
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
      {items.map((item) => (
        <Stack key={item.key} gap="0" pt="32px">
          <Typography variant="body3" tone="tertiary" className={css({ pl: '24px' })}>
            주문번호{' '}
            <Typography as="span" variant="body3" language="en" tone="tertiary">
              {item.orderNumber}
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
              <OrderHistoryProduct
                line={item.line}
                showAmount={false}
                onClick={() => onDetail(item.orderId, item.claimId)}
              />
            </Box>
            <Typography
              variant="body3"
              language="en"
              weight="medium"
              className={css({ textAlign: 'center' })}
            >
              {item.orderDate}
            </Typography>
            <Typography variant="body3" weight="medium" className={css({ textAlign: 'center' })}>
              {item.line.quantity}개
            </Typography>
            <Typography variant="body3" weight="medium" className={css({ textAlign: 'center' })}>
              {item.line.displayAmount === undefined ? (
                '-'
              ) : (
                <>
                  <Typography as="span" variant="body3" language="en" weight="medium">
                    {item.line.displayAmount.toLocaleString()}
                  </Typography>
                  원
                </>
              )}
            </Typography>
            <Typography variant="body3" weight="medium" className={css({ textAlign: 'center' })}>
              {item.status.web}
            </Typography>
          </Grid>
        </Stack>
      ))}
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
  claimHistoryItems,
  onHistoryDetail,
  statusItems,
  returns = false,
  ...props
}: OrdersListContentProps) {
  if (returns) {
    return (
      <Stack gap="6" css={{ '--color-text-primary': '#000' }}>
        {/* 취소·반품 조회 기간 필터 */}
        <OrdersFilters {...props} returns />
        {/* 취소·반품 내역 목록 및 빈 화면 */}
        <ClaimHistoryList items={claimHistoryItems} onDetail={onHistoryDetail} />
      </Stack>
    );
  }

  return (
    <Stack gap="6">
      {/* 주문·배송 현황 */}
      <OrderStatusTracker items={statusItems} />
      {/* 주문 조회 기간 필터 */}
      <OrdersFilters {...props} />
      {/* 주문 상품 목록 및 빈 화면 */}
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
