import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

import { dataListRecipe } from '@/components/common/atoms/DataList.recipe';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Typography } from '@/components/common/atoms/Typography';

import {
  DateRangeSearch,
  type DateRangeSearchProps,
} from '@/components/common/molecules/DateRangeSearch';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import type { ClaimHistoryItem, OrderRecord } from '@/components/orders/orders.types';

import { OrderCard, type OrderCardActions } from './OrdersProducts';
import { type OrderStatusItem, OrderStatusTracker } from './OrdersStatus';

type OrdersListContentProps = OrderCardActions & {
  dateSearch: DateRangeSearchProps;
  orders: readonly OrderRecord[];
  claimHistoryItems: readonly ClaimHistoryItem[];
  onHistoryDetail: (orderId: string, claimId: string) => void;
  statusItems: OrderStatusItem[];
  returns?: boolean;
};

/** [ 개발팀 바인딩 ] items는 호출자가 준비한 상품·line.quantity·날짜·PC/MO 상태 문구입니다. PC 표는 빈 목록에도 헤더를 유지하고 수량은 전달된 값을 그대로 표시합니다. 상품 분류와 상태 결정은 연결 소유자가 담당하며 onDetail은 전달된 orderId/claimId로 상세를 여는 로컬 UI 콜백입니다. */
/** 취소·반품 내역을 PC 표와 모바일 목록으로 표시합니다. (Displays claim history as a desktop table and mobile list.) */
function ClaimHistoryList({
  items,
  onDetail,
}: {
  items: readonly ClaimHistoryItem[];
  onDetail: (orderId: string, claimId: string) => void;
}) {
  const platform = usePlatform();
  if (!items.length && platform === 'mobile') {
    return (
      <EmptyState variant="plain" layout="claimHistory" title="취소나 환불한 상품이 없습니다." />
    );
  }

  if (platform === 'mobile') {
    return (
      <Stack
        as="ul"
        gap="24px"
        listStyleType="none"
        className={dataListRecipe({ top: 'none', columnGap: 'unchanged' }).root}
      >
        {items.map((item) => (
          <Stack as="li" key={item.key} gap="0">
            <Box display="flex" pb="16px" borderBottom="1px solid var(--color-border-subtle)">
              <Typography variant="b6" tone="tertiary">
                <Typography as="span" variant="b6M" tone="primary">
                  <Typography as="span" variant="b6M" language="en">
                    {platform === 'mobile'
                      ? (item.mobileOrderDate ?? item.orderDate)
                      : item.orderDate}
                  </Typography>{' '}
                  주문
                </Typography>
                {' · 주문번호 '}
                <Typography as="span" variant="b6" language="en" tone="tertiary">
                  {item.orderNumber}
                </Typography>
              </Typography>
            </Box>
            <Box py="16px">
              <OrderProductSummary
                variant="history"
                image={item.line.image}
                name={item.line.name}
                amount={
                  item.line.displayAmount === undefined
                    ? undefined
                    : platform === 'mobile'
                      ? (item.line.mobileDisplayAmount ?? item.line.displayAmount)
                      : item.line.displayAmount
                }
                amountLanguage="en"
                onClick={() => onDetail(item.orderId, item.claimId)}
                statusText={item.status.mobile}
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
    <Stack
      gap="0"
      className={
        dataListRecipe({
          top: 'thickSubtle',
          rowBorder: 'semanticSubtle',
          columnGap: 'unchanged',
          headerTypography: 'headingBold',
          cellVariant: 'heading',
        }).root
      }
    >
      <Grid
        gridTemplateColumns={columns}
        alignItems="center"
        gap="0"
        data-list-header
        className={dataListRecipe().header}
      >
        {['상품정보', '주문일자', '수량', '금액', '처리상태'].map((label) => (
          <span key={label} data-list-cell>
            {label}
          </span>
        ))}
      </Grid>
      {!items.length && (
        <EmptyState variant="plain" layout="claimHistory" title="취소나 환불한 상품이 없습니다." />
      )}
      {items.map((item) => (
        <Stack key={item.key} data-list-item gap="0" pt="32px">
          <Typography variant="b4" tone="tertiary" className={css({ pl: '24px' })}>
            주문번호{' '}
            <Typography as="span" variant="b4" language="en" tone="tertiary">
              {item.orderNumber}
            </Typography>
          </Typography>
          <Grid gridTemplateColumns={columns} alignItems="center" gap="0" pt="16px" pb="32px">
            <Box px="24px">
              <OrderProductSummary
                variant="history"
                image={item.line.image}
                name={item.line.name}
                amountLanguage="en"
                onClick={() => onDetail(item.orderId, item.claimId)}
              />
            </Box>
            <Typography variant="b4M" language="en" className={css({ textAlign: 'center' })}>
              {item.orderDate}
            </Typography>
            <Typography variant="b4M" language="en" className={css({ textAlign: 'center' })}>
              {item.line.quantity}
            </Typography>
            <Typography variant="b4M" className={css({ textAlign: 'center' })}>
              {item.line.displayAmount === undefined ? (
                '-'
              ) : (
                <>
                  <Typography as="span" variant="b4M" language="en">
                    {item.line.displayAmount.toLocaleString()}
                  </Typography>
                  원
                </>
              )}
            </Typography>
            <Typography variant="b4M" className={css({ textAlign: 'center' })}>
              {item.status.web}
            </Typography>
          </Grid>
        </Stack>
      ))}
    </Stack>
  );
}

/** 주문 현황·필터·주문 카드 목록과 빈 상태를 구성합니다. (Composes the order snapshot, filters, cards, and empty state.) */
export function OrdersListContent({
  orders,
  claimHistoryItems,
  onHistoryDetail,
  statusItems,
  dateSearch,
  returns = false,
  ...props
}: OrdersListContentProps) {
  if (returns) {
    return (
      <Stack gap="24px" css={{ '--color-text-primary': '#000' }}>
        {/* 취소·반품 조회 기간 필터 */}
        <DateRangeSearch {...dateSearch} />
        {/* 취소·반품 내역 목록 및 빈 화면 */}
        <ClaimHistoryList items={claimHistoryItems} onDetail={onHistoryDetail} />
      </Stack>
    );
  }

  return (
    <Stack gap={{ base: '48px', _mobile: '24px' }}>
      {/* 주문·배송 현황 */}
      <OrderStatusTracker items={statusItems} />
      <Stack gap={{ base: '32px', _mobile: '0' }}>
        {/* 주문 조회 기간 필터 */}
        <DateRangeSearch {...dateSearch} />
        {/* 주문 상품 목록 및 빈 화면 */}
        <Stack
          gap="0"
          borderTop={{ base: '2px solid var(--color-black-20)', _mobile: '0' }}
          className={
            dataListRecipe({
              top: 'unchanged',
              columnGap: 'unchanged',
              headerTypography: 'headingBold',
              cellVariant: 'heading',
            }).root
          }
        >
          <Grid
            data-list-header
            gridTemplateColumns="minmax(0, 536fr) minmax(0, 108fr) minmax(0, 200fr)"
            alignItems="center"
            gap={orders.length ? undefined : '0'}
            _mobile={{ display: 'none' }}
            className={dataListRecipe().header}
          >
            {['상품/옵션정보', '수량', '가격'].map((label) => (
              <span key={label} data-list-cell>
                {label}
              </span>
            ))}
          </Grid>
          {orders.length ? (
            <Stack as="ul" gap={{ base: '0', _mobile: '16px' }} listStyleType="none">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} {...props} />
              ))}
            </Stack>
          ) : (
            <Box minH={{ base: '267px', _mobile: '192px' }}>
              <EmptyState layout="orders" variant="standard" title="주문한 상품이 없습니다." />
            </Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
