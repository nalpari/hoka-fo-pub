'use client';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 주문 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
import Image from 'next/image';
import Link from 'next/link';

import { Drawer } from '@base-ui/react/drawer';
import { type ReactNode, useId, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge';
import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { DataTable } from '@/components/common/atoms/DataTable';
import {
  DescriptionList,
  type DescriptionListItem,
} from '@/components/common/atoms/DescriptionList';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { FilterTabs } from '@/components/common/atoms/FilterTabs';
import { FormField } from '@/components/common/atoms/FormField';
import { Icon } from '@/components/common/atoms/Icon';
import { NumberStepper } from '@/components/common/atoms/NumberStepper';
import { Select } from '@/components/common/atoms/Select';
import { StatusMessage } from '@/components/common/atoms/StatusMessage';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import { AmountRow } from '@/components/common/molecules/AmountRow';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { CharacterCount } from '@/components/common/molecules/FormFields/CharacterCount';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';
import { StepIndicator } from '@/components/common/molecules/StepIndicator';

import { BottomSheet } from '@/components/common/layouts/BottomSheet';
import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import {
  claimReasonLabels,
  getClaimLines,
  orderStatusLabels,
} from '@/components/orders/order-policy';
import { previewOrders } from '@/components/orders/orders.data';
import {
  type ClaimKind,
  type ClaimReason,
  type OrderClaim,
  type OrderFilters,
  type OrderLine,
  type OrderRecord,
  type OrdersPeriod,
  type OrdersView,
} from '@/components/orders/orders.types';
type OrderStatusLinkProps = {
  label: string;
  count: number;
  href: string;
  compact?: boolean;
};
const statusLink = css.raw({
  display: 'grid',
  justifyItems: 'center',
  gap: '7px',
  minH: '100px',
  py: '5',
  px: '2',
  color: 'var(--color-text-primary)',
  textAlign: 'center',
  borderRight: '1px solid var(--color-black-20)',
  '&:last-child': {
    borderRight: '0',
  },
});
/** 주문 단계의 수량과 조회 링크를 표시합니다. (Displays an order stage count and its history link.) */
function OrderStatusLink({ label, count, href, compact = false }: OrderStatusLinkProps) {
  return (
    <Link
      className={css(
        statusLink,
        compact && {
          minH: { base: '90px', _mobile: '86px' },
          py: '0',
          px: '1',
          mt: { _mobile: '4' },
          alignSelf: 'start',
          borderRight: '0',
          gap: '1',
          // alignContent: 'center',
          '& > span:last-child': { whiteSpace: 'pre-line' },
        },
      )}
      href={href}
    >
      <Typography
        as="strong"
        variant={compact ? 'body1' : 'heading8'}
        tone={compact && count === 0 ? 'black40' : 'primary'}
      >
        {count}
      </Typography>
      <Typography variant="body5" tone={compact ? 'tertiary' : 'primary'}>
        {label}
      </Typography>
    </Link>
  );
}
type OrderStatusItem = {
  label: string;
  count: number;
  to?: string;
};
type Props = {
  items: OrderStatusItem[];
  to?: string;
  compact?: boolean;
};
/** 주문 단계별 수량을 기본형 또는 압축형으로 표시합니다. (Displays an order stage snapshot in standard or compact form.) */
function OrderStatusTracker({ items, to = '/mypage/orders', compact = false }: Props) {
  const content = (
    <Grid
      gap="0"
      minH={compact ? { base: '90px', _mobile: '98px' } : undefined}
      alignItems={compact ? 'start' : undefined}
      style={
        compact ? { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` } : undefined
      }
      gridTemplateColumns="repeat(5, 1fr)"
      bg={compact ? 'black.10' : undefined}
      borderTop={compact ? '0' : '1px solid var(--color-black-100)'}
      borderBottom={compact ? '0' : '1px solid var(--color-border-subtle)'}
      _mobile={
        compact ? {} : { overflowX: 'auto', gridTemplateColumns: 'repeat(5, minmax(88px, 1fr))' }
      }
    >
      {items.map((status) => (
        <OrderStatusLink
          key={status.label}
          label={status.label}
          count={status.count}
          href={status.to ?? to}
          compact={compact}
        />
      ))}
    </Grid>
  );
  if (compact) return <section aria-label="주문 배송 현황">{content}</section>;
  return (
    <ContentSection
      as="section"
      aria-label="주문 배송 현황"
      gap="3"
      title="주문 / 배송 조회"
      headerProps={{
        orientation: 'horizontal',
        gap: 'normal',
        titleProps: { variant: 'heading10', className: css({ m: '0' }) },
        action: (
          <Link href={to} className={css({ '&&': { color: 'var(--color-text-tertiary)' } })}>
            <Typography variant="body5" tone="tertiary">
              전체 보기 →
            </Typography>
          </Link>
        ),
      }}
    >
      {content}
    </ContentSection>
  );
}
const dateInput = css({
  '&&': {
    minH: '36px',
    h: '36px',
    px: '3',
    borderRadius: 'full',
    fontSize: '14px',
    bg: 'white.0',
  },
  _mobile: {
    '&&': {
      minH: '28px',
      h: '28px',
      px: '2',
      borderRadius: 'full',
      fontSize: '12px',
      bg: 'white.0',
    },
  },
});
/** 직접 조회 기간 입력과 오류·조회 액션을 표시합니다. (Displays custom date inputs, errors, and the search action.) */
function OrdersDateRange({
  dates,
  error,
  onDateChange,
  onDateSearch,
}: Pick<OrdersFiltersProps, 'dates' | 'error' | 'onDateChange' | 'onDateSearch'>) {
  return (
    <Stack gap="2">
      <HStack
        gap="2"
        minW="0"
        alignItems="center"
        css={{
          '& > input': { flex: '1', minW: '0' },
        }}
      >
        <TextInput
          className={dateInput}
          type="date"
          aria-label="조회 시작일"
          value={dates.start}
          onChange={(event) => onDateChange('start', event.target.value)}
        />
        <Typography variant="body5">–</Typography>
        <TextInput
          className={dateInput}
          type="date"
          aria-label="조회 종료일"
          value={dates.end}
          onChange={(event) => onDateChange('end', event.target.value)}
        />
        <Button variant="link" size="sm" onClick={onDateSearch}>
          조회
        </Button>
      </HStack>
      {error ? (
        <Typography role="alert" variant="body5" tone="error">
          {error}
        </Typography>
      ) : null}
    </Stack>
  );
}
type OrdersFiltersProps = {
  filters: OrderFilters;
  dates: {
    start: string;
    end: string;
  };
  error?: string;
  onPeriodChange: (period: OrdersPeriod) => void;
  onDateChange: (key: 'start' | 'end', value: string) => void;
  onDateSearch?: () => void;
  returns?: boolean;
};
/** 주문 조회 기간과 직접 날짜를 표시합니다. (Displays order period and custom date controls.) */
function OrdersFilters({
  filters,
  dates,
  error,
  onPeriodChange,
  onDateChange,
  onDateSearch,
  returns = false,
}: OrdersFiltersProps) {
  const platform = usePlatform();
  const periodOptions = [
    { value: '1', label: '1개월' },
    { value: '3', label: '3개월' },
    { value: '6', label: '6개월' },
    { value: '12', label: '1년' },
    { value: 'custom', label: '직접설정' },
  ] as const;
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      gap="6"
      _mobile={{ flexDirection: 'column', alignItems: 'stretch', gap: '6' }}
    >
      <FilterTabs
        ariaLabel="조회 기간"
        variant="fill"
        railClassName={css({ '&&': { px: '0', mb: '0', _mobile: { px: '0', mb: '0' } } })}
        value={filters.period}
        onValueChange={onPeriodChange}
        itemClassName={() =>
          css({
            '&&': {
              px: '2',
              h: returns ? '37px' : { base: '34px', _mobile: '28px' },
            },
          })
        }
        options={platform === 'mobile' ? periodOptions : [...periodOptions].reverse()}
      />
      <OrdersDateRange
        dates={dates}
        error={error}
        onDateChange={onDateChange}
        onDateSearch={onDateSearch}
      />
    </HStack>
  );
}
/** 주문 상태와 도착 예정일을 함께 표시합니다. (Displays order status with the expected arrival date.) */
function OrderDeliveryStatus({ label, expectedDate }: { label: string; expectedDate: string }) {
  return (
    <Typography variant="body5">
      <Typography variant="body5" tone="primary" weight="semibold">
        {label}
      </Typography>{' '}
      · {expectedDate} 도착 예정
    </Typography>
  );
}
/** 주문 일자·번호와 상세 진입을 표시합니다. (Displays order identification and its detail action.) */
function OrderCardHeader({
  order,
  onDetail,
  compact = false,
}: {
  order: OrderRecord;
  onDetail?: () => void;
  compact?: boolean;
}) {
  return (
    <HStack
      alignItems={compact ? 'center' : 'flex-end'}
      justifyContent="space-between"
      gap="2"
      pb="3"
      borderBottom="1px solid var(--colors-black-100)"
    >
      {compact ? (
        <Typography variant="body5" tone="subtle">
          <Typography as="span" variant="body5" tone="primary" weight="semibold">
            {order.date.replaceAll('-', '.')}
          </Typography>{' '}
          주문 · 주문번호 {order.id}
        </Typography>
      ) : (
        <Stack gap="1">
          <Typography variant="body2" weight="semibold">
            {order.date.replaceAll('-', '.')}
          </Typography>
          <Typography variant="body5" tone="subtle">
            주문번호 {order.id}
          </Typography>
        </Stack>
      )}
      {onDetail ? (
        <Button variant="link" size="sm" onClick={onDetail}>
          상세보기
        </Button>
      ) : null}
    </HStack>
  );
}
type OrderHistoryProductProps = {
  line: OrderLine;
  onAddToCart?: (line: OrderLine) => void;
  showAmount?: boolean;
  imageSize?: 'standard' | 'claim';
};
/** 주문 내역 상품의 요약과 다시 담기 액션을 표시합니다. (Displays an order history product and its reorder action.) */
function OrderHistoryProduct({
  line,
  showAmount = true,
  imageSize = 'standard',
}: OrderHistoryProductProps) {
  return (
    <Box
      w="100%"
      className={css({
        '& > div > img':
          imageSize === 'claim'
            ? { w: '96px', h: '96px', _mobile: { w: '64px', h: '64px' } }
            : { _mobile: { w: '96px', h: '96px' } },
      })}
    >
      <OrderProductSummary
        variant="coupon"
        image={line.image}
        name={line.name}
        optionText={`옵션 : ${line.width} / ${line.color} / ${line.size} / ${line.quantity}개`}
        amount={line.displayAmount ?? line.price}
        hideAmount={!showAmount}
      >
        <Button variant="link" size="sm">
          장바구니 담기
        </Button>
      </OrderProductSummary>
    </Box>
  );
}
type OrderItemActionsProps = {
  order: OrderRecord;
  onClaim: () => void;
  onTracking: () => void;
  onConfirm: () => void;
};
/** 주문 상태에 맞는 취소·배송·반품·리뷰 액션을 표시합니다. (Displays actions available for the order status.) */
function OrderItemActions({ order, onClaim, onTracking, onConfirm }: OrderItemActionsProps) {
  const kind = order.claimKind;
  return (
    <Stack gap="2">
      {order.status !== 'paid' ? (
        <Button variant="secondary" size="short" fullWidth onClick={onTracking}>
          배송 조회
        </Button>
      ) : null}
      {kind ? (
        <Button variant="secondary" size="short" fullWidth onClick={onClaim}>
          {kind === 'cancel' ? '주문 취소' : '환불 신청'}
        </Button>
      ) : null}
      {order.status === 'delivered' ? (
        <Button variant="secondary" size="short" fullWidth onClick={onConfirm}>
          구매 확정
        </Button>
      ) : null}
      {order.status === 'purchased' ? (
        <ButtonLink
          href={`/mypage/reviews?order=${order.id}`}
          variant="secondary"
          size="short"
          fullWidth
        >
          리뷰 작성하기
        </ButtonLink>
      ) : null}
    </Stack>
  );
}
/** 취소 또는 반품으로 분리된 주문 상품을 표시합니다. (Displays products belonging to an order claim.) */
function OrderClaimGroup({
  order,
  claim,
  onDetail,
}: {
  order: OrderRecord;
  claim: OrderClaim;
  onDetail: () => void;
}) {
  return (
    <ContentSection
      gap="4"
      pt="6"
      borderTop="1px solid var(--colors-black-20)"
      title={claim.kind === 'cancel' ? '구매취소' : '반품접수'}
      headerProps={{
        orientation: 'horizontal',
        titleAs: 'h3',
        titleProps: { variant: 'body5', tone: 'subtle' },
        action: (
          <Button variant="link" size="sm" onClick={onDetail}>
            {claim.kind === 'cancel' ? '취소상세보기' : '반품상세보기'}
          </Button>
        ),
      }}
    >
      <Stack gap="4">
        {getClaimLines(order, claim).map((line) => (
          <OrderHistoryProduct key={line.key} line={line} />
        ))}
      </Stack>
    </ContentSection>
  );
}
type OrderCardActions = {
  onDetail: (order: OrderRecord) => void;
  onClaim: (order: OrderRecord) => void;
  onTracking: (order: OrderRecord) => void;
  onConfirm: (order: OrderRecord) => void;
  onClaimDetail: (order: OrderRecord, claim: OrderClaim) => void;
  onAddToCart?: (line: OrderLine) => void;
};
/** 주문 한 건의 상품·상태·후속 처리 액션을 구성합니다. (Composes products, status, and follow-up actions for an order.) */
function OrderCard({
  order,
  ...actions
}: {
  order: OrderRecord;
} & OrderCardActions) {
  const items = order.items;
  const platform = usePlatform();
  return (
    <Stack as="li" gap="6" listStyleType="none">
      <OrderCardHeader order={order} onDetail={() => actions.onDetail(order)} />
      {items.length ? (
        <>
          <OrderDeliveryStatus
            label={orderStatusLabels[order.status]}
            expectedDate={order.expectedDate}
          />
          {platform !== 'mobile' ? (
            <Stack gap="0">
              <Grid
                gridTemplateColumns="minmax(0, 1fr) 80px 120px 120px"
                borderY="1px solid var(--colors-black-100)"
                py="3"
              >
                <Typography variant="body5">상품정보/옵션</Typography>
                <Typography variant="body5">수량</Typography>
                <Typography variant="body5">가격</Typography>
                <Typography variant="body5">주문상태</Typography>
              </Grid>
              {items.map((line) => (
                <Grid
                  key={line.key}
                  gridTemplateColumns="minmax(0, 1fr) 80px 120px 120px"
                  gap="4"
                  alignItems="center"
                  py="4"
                  borderBottom="1px solid var(--colors-black-20)"
                >
                  <OrderHistoryProduct line={line} showAmount={false} />
                  <Typography variant="body4">{line.quantity}개</Typography>
                  <Typography variant="body4">
                    {(line.displayAmount ?? line.price).toLocaleString()}원
                  </Typography>
                  <OrderItemActions
                    order={order}
                    onClaim={() => actions.onClaim(order)}
                    onTracking={() => actions.onTracking(order)}
                    onConfirm={() => actions.onConfirm(order)}
                  />
                </Grid>
              ))}
            </Stack>
          ) : (
            <Stack gap="4">
              {items.map((line) => (
                <OrderHistoryProduct key={line.key} line={line} />
              ))}
            </Stack>
          )}
          {platform === 'mobile' ? (
            <OrderItemActions
              order={order}
              onClaim={() => actions.onClaim(order)}
              onTracking={() => actions.onTracking(order)}
              onConfirm={() => actions.onConfirm(order)}
            />
          ) : null}
        </>
      ) : null}
      {order.claims.map((claim) => (
        <OrderClaimGroup
          key={claim.id}
          order={order}
          claim={claim}
          onDetail={() => actions.onClaimDetail(order, claim)}
        />
      ))}
    </Stack>
  );
}
type OrdersListContentProps = OrdersFiltersProps &
  OrderCardActions & {
    orders: readonly OrderRecord[];
    statusItems: OrderStatusItem[];
    pending?: boolean;
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
        {showAmount ? (
          <Typography variant="body5">
            {(line.displayAmount ?? line.price).toLocaleString()}원
          </Typography>
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
  pending,
  error,
  onClaimDetail,
}: {
  orders: readonly OrderRecord[];
  pending?: boolean;
  error?: string;
  onClaimDetail: (order: OrderRecord, claim: OrderClaim) => void;
}) {
  const platform = usePlatform();
  const hasItems = orders.some((order) =>
    order.claims.some((claim) => getClaimLines(order, claim).length > 0),
  );
  if (!hasItems) {
    if (pending || error) return null;
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
                {(line.displayAmount ?? line.price).toLocaleString()}원
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
function OrdersListContent({
  orders,
  statusItems,
  pending,
  returns = false,
  ...props
}: OrdersListContentProps) {
  if (returns) {
    return (
      <Stack gap="6">
        <OrdersFilters {...props} returns />
        <ClaimHistoryList
          orders={orders}
          pending={pending}
          error={props.error}
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
      ) : pending || props.error ? null : (
        <Box minH="300px" className={emptyOrderState}>
          <EmptyState variant="standard" title="주문한 상품이 없습니다." />
        </Box>
      )}
    </Stack>
  );
}
/** 주문 상세의 구분선이 있는 항목별 정보를 표시합니다. (Displays ruled key-value information for an order.) */
function OrderInformationSection({
  title,
  items,
}: {
  title: string;
  items: readonly DescriptionListItem[];
}) {
  return (
    <ContentSection
      title={title}
      gap="0"
      headerProps={{
        titleAs: 'h2',
        titleProps: { web: 'heading10', mo: 'heading7' },
        css: css.raw({ pb: '3', borderBottom: '1px solid var(--colors-black-100)' }),
      }}
    >
      <DescriptionList
        items={items}
        termProps={{ variant: 'body4', tone: 'subtle' }}
        descriptionProps={{ variant: 'body4', tone: 'primary' }}
        slotStyles={{
          root: css.raw({ display: 'block' }),
          row: css.raw({
            display: 'grid',
            gridTemplateColumns: '88px minmax(0, 1fr)',
            gap: '3',
            py: '4',
            borderBottom: '1px solid var(--colors-black-20)',
          }),
        }}
      />
    </ContentSection>
  );
}
type OrderDetailProps = OrderCardActions & {
  order: OrderRecord;
  onList: () => void;
  onDelete: () => void;
};
/** 주문 상품·받는 사람·결제 정보와 취소 내역을 표시합니다. (Displays order products, recipient, payment, and claim history.) */
function OrderDetail({ order, onList, onDelete, ...actions }: OrderDetailProps) {
  const amounts = order.displayAmounts ?? { total: 0, claimed: 0, remaining: 0 };
  return (
    <ContentSection
      gap="8"
      header={<OrderCardHeader order={order} compact />}
      footer={
        <Stack gap="4">
          <Button variant="link" size="sm" onClick={onDelete}>
            주문 내역 삭제
          </Button>
          <Button variant="primary" fullWidth onClick={onList}>
            주문목록 돌아가기
          </Button>
        </Stack>
      }
    >
      <Typography variant="body5">
        {orderStatusLabels[order.status]} · {order.expectedDate} 도착 예정
      </Typography>
      <Stack gap="4">
        {order.items.map((line) => (
          <OrderHistoryProduct key={line.key} line={line} />
        ))}
      </Stack>
      <OrderInformationSection
        title="받는사람 정보"
        items={[
          { term: '받는사람', description: '홍길동' },
          { term: '연락처', description: '010-1234-5678' },
          { term: '받는주소', description: '서울시 강남구 역삼동 123-45' },
          { term: '배송요청사항', description: '부재시 문 앞에 놓아주세요.' },
        ]}
      />
      <OrderInformationSection
        title="결제 정보"
        items={[
          { term: '결제수단', description: '신용카드' },
          { term: '총 상품금액', description: `${amounts.total.toLocaleString()}원` },
          {
            term: '취소금액',
            description: `${amounts.claimed.toLocaleString()}원`,
          },
          {
            term: '총 결제금액',
            description: `${amounts.remaining.toLocaleString()}원`,
          },
        ]}
      />
      {order.claims.length ? (
        <ContentSection title="취소·반품·교환 내역" gap="4">
          <Stack gap="4">
            {order.claims.map((claim) => (
              <OrderClaimGroup
                key={claim.id}
                order={order}
                claim={claim}
                onDetail={() => actions.onClaimDetail(order, claim)}
              />
            ))}
          </Stack>
        </ContentSection>
      ) : null}
    </ContentSection>
  );
}
/** 취소·반품의 접수 또는 완료 상태를 표시합니다. (Displays a claim’s requested or completed status.) */
function OrderClaimStatus({ kind, state }: Pick<OrderClaim, 'kind' | 'state'>) {
  return (
    <Badge variant="filled" tone="tertiary">
      {kind === 'cancel' ? '취소' : '반품'}
      {state === 'complete' ? '완료' : '접수'}
    </Badge>
  );
}
/** 취소·반품 상세와 처리 정보 및 환불 내역을 표시합니다. (Displays claim processing details and refund information.) */
function OrderClaimDetail({
  order,
  claim,
  onList,
}: {
  order: OrderRecord;
  claim: OrderClaim;
  onList: () => void;
}) {
  const items = getClaimLines(order, claim);
  const cancel = claim.kind === 'cancel';
  const name = cancel ? '취소' : '반품';
  return (
    <ContentSection
      gap="8"
      header={<OrderCardHeader order={order} compact />}
      footer={
        <Button variant="primary" fullWidth onClick={onList}>
          목록
        </Button>
      }
    >
      <HStack alignItems="flex-start" gap="3">
        <Stack flex="1" minW="0" gap="4">
          {items.map((line) => (
            <OrderHistoryProduct key={line.key} line={line} />
          ))}
        </Stack>
        <Box flexShrink="0">
          <OrderClaimStatus kind={claim.kind} state={claim.state} />
        </Box>
      </HStack>
      <OrderInformationSection
        title="상세정보"
        items={[
          { term: `${name}접수일자`, description: claim.requestedAt.replaceAll('-', '. ') },
          { term: `${name}접수번호`, description: claim.id },
          {
            term: `${name}완료일`,
            description: claim.completedAt?.replaceAll('-', '. ') ?? '처리중',
          },
          { term: '환불완료일', description: claim.completedAt?.replaceAll('-', '. ') ?? '처리중' },
        ]}
      />
      {!cancel ? (
        <OrderInformationSection
          title="상세 회수 정보"
          items={[
            { term: '회수인', description: '홍길동' },
            { term: '주소', description: '서울시 강남구 역삼동 123-45' },
            { term: '택배사', description: claim.state === 'complete' ? 'CJ대한통운' : '-' },
            { term: '송장번호', description: '-' },
            { term: '회수예정일', description: '-' },
          ]}
        />
      ) : null}
      <OrderInformationSection
        title={`${name} 사유`}
        items={[{ term: claimReasonLabels[claim.reason], description: claim.details || '-' }]}
      />
      <OrderInformationSection
        title="환불안내"
        items={[
          { term: '환불수단', description: '네이버페이' },
          { term: '상품금액', description: `${(claim.displayAmount ?? 0).toLocaleString()}원` },
          { term: '반품비', description: `${claim.fee.toLocaleString()}원` },
          {
            term: '총 환불금액',
            description: (
              <Typography variant="body3" weight="semibold" tone="error">
                {(claim.displayRefund ?? 0).toLocaleString()}원
              </Typography>
            ),
          },
        ]}
      />
      <Typography variant="body5" tone="subtle">
        *결제 취소 요청이 완료된 후 결제사별 영업일 기준 3~7일이 소요됩니다.
      </Typography>
    </ContentSection>
  );
}
type OrdersContentProps = OrdersFiltersProps &
  OrderCardActions & {
    orders: readonly OrderRecord[];
    statusItems: OrderStatusItem[];
    pending?: boolean;
    view: OrdersView;
    selectedOrder?: OrderRecord;
    selectedClaim?: OrderClaim;
    returns: boolean;
    message: string;
    dialogs: ReactNode;
    onList: () => void;
    onDelete: () => void;
  };
/** 주문 목록·주문 상세·신청 상세 화면을 공통 골격 안에 구성합니다. (Composes order list, order detail, and claim detail views.) */
function OrdersContent({
  pending,
  view,
  selectedOrder,
  selectedClaim,
  returns,
  message,
  dialogs,
  onList,
  onDelete,
  ...props
}: OrdersContentProps) {
  const title =
    view === 'claim'
      ? selectedClaim?.kind === 'cancel'
        ? '취소 상세'
        : '반품 상세'
      : view === 'detail'
        ? '주문 상세'
        : returns
          ? '취소/반품내역'
          : '주문/배송조회';
  return (
    <MyPageFrame
      activePath={returns ? '/mypage/returns' : '/mypage/orders'}
      breadcrumbs={[{ label: '구매내역', href: '/mypage' }, { label: title }]}
    >
      <Stack pb={{ base: '0', _mobile: '18' }} gap="0">
        <ContentSection
          title={title}
          headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading7' } }}
          gap="4"
        >
          {pending && <Typography role="status">주문 정보를 처리하고 있습니다.</Typography>}
          {message ? <StatusMessage tone="success">{message}</StatusMessage> : null}
          {view === 'claim' && selectedOrder && selectedClaim ? (
            <OrderClaimDetail order={selectedOrder} claim={selectedClaim} onList={onList} />
          ) : view === 'detail' && selectedOrder ? (
            <OrderDetail {...props} order={selectedOrder} onList={onList} onDelete={onDelete} />
          ) : (
            <OrdersListContent {...props} pending={pending} returns={returns} />
          )}
          {dialogs}
        </ContentSection>
      </Stack>
    </MyPageFrame>
  );
}
/** 취소와 반품의 상품 선택·환불 절차를 안내합니다. (Explains product selection and refund steps for claims.) */
function ClaimInstructions({ kind }: { kind: ClaimKind }) {
  return (
    <Typography variant="body4" tone="subtle">
      {kind === 'cancel' ? (
        <>
          취소할 상품과 수량을 선택해주세요.
          <br />
          일부만 취소(부분취소)할 수 있으며, 배송비는 주문의 남은 상품이 모두 취소될 때 함께
          환불됩니다.
        </>
      ) : (
        <>
          반품할 상품과 수량을 선택해주세요.
          <br />
          상품을 회수한 뒤 결제 금액이 환불됩니다. (반품 접수)
        </>
      )}
    </Typography>
  );
}
/** 취소 신청 수량의 입력 범위와 들여쓰기를 구성합니다. (Composes the bounded cancellation quantity input and its indentation.) */
function ClaimProductQuantity({
  productKey,
  max,
  value,
  onQuantity,
}: {
  productKey: string;
  max: number;
  value: number;
  onQuantity: (key: string, quantity: number) => void;
}) {
  return (
    <Stack pl="8" gap="0" alignItems="flex-start">
      <NumberStepper
        ariaLabel={`${productKey} 신청 수량`}
        min={1}
        max={max}
        value={value}
        onChange={(value) => onQuantity(productKey, value)}
      />
    </Stack>
  );
}
/** 신청 상품의 체크박스와 상품 정보를 표시합니다. (Displays a claim product checkbox and product information.) */
function ClaimProductChoice({
  line,
  checked,
  onToggle,
}: {
  line: OrderLine;
  checked: boolean;
  onToggle: (line: OrderLine, checked: boolean) => void;
}) {
  return (
    <HStack gap="4" alignItems="flex-start">
      <Checkbox
        label={null}
        aria-label={`${line.name} ${line.size} ${line.key} 신청 상품 선택`}
        checked={checked}
        onCheckedChange={(checked) => onToggle(line, checked)}
      />
      <OrderHistoryProduct line={line} showAmount={false} imageSize="claim" />
    </HStack>
  );
}
type ClaimProductSelectionProps = {
  items: readonly OrderLine[];
  kind: ClaimKind;
  quantities: Record<string, number>;
  onToggle: (line: OrderLine, checked: boolean) => void;
  onQuantity: (key: string, quantity: number) => void;
};
/** 신청할 상품의 선택과 허용 수량 입력을 표시합니다. (Displays selectable claim products and bounded quantities.) */
function ClaimProductSelection({
  kind,
  items,
  quantities,
  onToggle,
  onQuantity,
}: ClaimProductSelectionProps) {
  return (
    <ContentSection
      title="상품 선택"
      gap="0"
      headerProps={{
        titleAs: 'h2',
        titleProps: { variant: 'body3', weight: 'semibold' },
        css: css.raw({ pb: '3', borderBottom: '1px solid var(--colors-black-100)' }),
      }}
    >
      <Stack as="ul" gap="0" listStyleType="none">
        {items.map((line) => (
          <Stack
            as="li"
            key={line.key}
            gap="4"
            py="4"
            borderBottom="1px solid var(--colors-black-20)"
          >
            <ClaimProductChoice
              line={line}
              checked={Boolean(quantities[line.key])}
              onToggle={onToggle}
            />
            {kind === 'cancel' ? (
              <ClaimProductQuantity
                productKey={line.key}
                max={line.quantity}
                value={quantities[line.key] || 1}
                onQuantity={onQuantity}
              />
            ) : null}
          </Stack>
        ))}
      </Stack>
    </ContentSection>
  );
}
type ClaimReasonFieldsProps = {
  id: string;
  reason: ClaimReason;
  details: string;
  onReasonChange: (reason: ClaimReason) => void;
  onDetailsChange: (details: string) => void;
};
/** 신청 사유·상세 내용과 반품비 안내를 표시합니다. (Displays claim reason, details, and return fee guidance.) */
function ClaimReasonFields({
  id,
  reason,
  details,
  onReasonChange,
  onDetailsChange,
}: ClaimReasonFieldsProps) {
  return (
    <Stack gap="3">
      <FormField htmlFor={`${id}-reason`} label="사유" variant="boxed" required>
        <Select
          id={`${id}-reason`}
          value={reason}
          onChange={(event) => onReasonChange(event.target.value as ClaimReason)}
        >
          <option value="">사유를 선택해 주세요.</option>
          {Object.entries(claimReasonLabels)
            .filter(([value]) => value !== 'size')
            .map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
        </Select>
      </FormField>
      <TextFormField
        id={`${id}-details`}
        label="상세내용 (선택)"
        variant="boxed"
        inputProps={{
          multiline: true,
          value: details,
          maxLength: 250,
          rows: 5,
          placeholder: '자세한 내용을 적어주시면 처리에 도움이 됩니다.',
          onChange: (event) => onDetailsChange(event.target.value),
        }}
        renderControl={(control) => (
          <Stack gap="2" w="100%">
            {control}
            <CharacterCount
              length={details.length}
              limit={250}
              tone="subtle"
              className={css({ textAlign: 'right' })}
            />
          </Stack>
        )}
      />
      <Typography variant="body5" tone="subtle">
        *단순 변심·사이즈 사유의 반품비는 5,000원입니다. 상품 불량·오배송은 반품비가 부과되지
        않습니다. 상품 수령 후 7일 이내에 신청할 수 있으며, 사용 흔적이나 상품 훼손 시 반품이 어려울
        수 있습니다.
      </Typography>
    </Stack>
  );
}
/** 신청 상품금액과 반품비 또는 사유 선택 안내를 표시합니다. (Displays claim product amount and fee or the reason selection hint.) */
function ClaimAmountBreakdown({
  amount,
  fee,
  freeReturnApplied,
}: {
  amount: number;
  fee: number | null;
  freeReturnApplied?: boolean;
}) {
  return (
    <Stack p="4" gap="3">
      <AmountRow label="상품금액" amount={amount} />
      {amount && fee !== null ? (
        <AmountRow
          label={freeReturnApplied ? '반품비 (무료반품 적용)' : '반품비'}
          amount={fee}
          discount
        />
      ) : (
        <HStack justifyContent="space-between">
          <Typography variant="body4">반품비</Typography>
          <Typography variant="body5" tone="subtle">
            사유 선택 후 확인
          </Typography>
        </HStack>
      )}
    </Stack>
  );
}
/** 신청 상품 금액과 수수료·예상 환불액을 표시합니다. (Displays claim product amounts, fees, and estimated refund.) */
function ClaimAmountSummary({
  amount,
  fee,
  refund,
  kind,
  freeReturnApplied,
}: {
  amount: number;
  fee: number | null;
  refund: number | null;
  freeReturnApplied?: boolean;
  kind: 'cancel' | 'return';
}) {
  return (
    <Stack gap="0" border="1px solid var(--colors-black-20)">
      <ClaimAmountBreakdown amount={amount} fee={fee} freeReturnApplied={freeReturnApplied} />
      <AmountRow
        p="4"
        bg="black.10"
        label={
          refund === null
            ? '환불예정금액 (견적 확인 전)'
            : kind === 'cancel'
              ? '취소예정금액'
              : '환불예정금액'
        }
        amount={refund ?? amount}
        emphasis
      />
    </Stack>
  );
}

type OrderClaimSheetProps = {
  order: OrderRecord;
  kind: ClaimKind;
  onClose: () => void;
};
/** 취소·환불 신청 초안을 관리하고 검증 결과를 표시합니다. (Manages a cancellation or refund draft and validation feedback.) */
function OrderClaimSheet({ order, kind, onClose }: OrderClaimSheetProps) {
  const platform = usePlatform();
  const id = useId();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [reason, setReason] = useState<ClaimReason>('');
  const [details, setDetails] = useState('');
  const [error] = useState('');
  const items = order.items;
  const amounts = { amount: 0, fee: 0, refund: 0 };
  const blocked = false;
  const canQuote = true;
  const quotePending = false;
  const quoteError = '';
  const title = kind === 'cancel' ? '주문 취소 신청' : '환불(반품) 신청';
  const submitButton = (
    <Button
      disabled={blocked || !canQuote}
      type="submit"
      form={id}
      variant="primary"
      size="tall"
      fullWidth
    >
      신청하기
    </Button>
  );
  const content = (
    <form id={id} noValidate onSubmit={(event) => event.preventDefault()}>
      <fieldset disabled={false}>
        <Stack gap="6">
          <ClaimInstructions kind={kind} />
          <ClaimProductSelection
            items={items}
            kind={kind}
            quantities={quantities}
            onToggle={(line, checked) => {
              setQuantities((previous) => ({
                ...previous,
                [line.key]: checked ? (kind === 'cancel' ? 1 : line.quantity) : 0,
              }));
            }}
            onQuantity={(key, value) => {
              setQuantities((previous) => ({ ...previous, [key]: value }));
            }}
          />
          <ClaimReasonFields
            id={id}
            reason={reason}
            details={details}
            onReasonChange={(next) => {
              setReason(next);
            }}
            onDetailsChange={setDetails}
          />
          <ClaimAmountSummary {...amounts} kind={kind} />
          {quotePending && <Typography role="status">환불 견적을 확인하고 있습니다.</Typography>}
          {quoteError && (
            <>
              <StatusMessage tone="error">{quoteError}</StatusMessage>
            </>
          )}
          {error ? <StatusMessage tone="error">{error}</StatusMessage> : null}
        </Stack>
      </fieldset>
    </form>
  );
  if (platform === 'mobile') {
    return (
      <BottomSheet
        title={title}
        ariaLabel={title}
        onClose={() => {
          onClose();
        }}
        footer={submitButton}
      >
        {content}
      </BottomSheet>
    );
  }
  return (
    <ModalDialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={title}
      closeLabel={`${title} 닫기`}
      size="md"
      headerProps={{
        css: css.raw({
          px: '6',
          bg: 'white.0',
          borderBottom: '1px solid var(--colors-black-20)',
        }),
      }}
      footer={submitButton}
      footerProps={{
        css: css.raw({
          px: '6',
          '& > button': { w: '40!', flex: 'none', '--button-height': '48px' },
        }),
      }}
    >
      {content}
    </ModalDialog>
  );
}
const trackingTable = css({
  '&&': {
    tableLayout: 'fixed',
    fontSize: '12px',
    '& th, & td': { h: '40px', px: '1', borderBottom: '1px solid var(--color-black-20)' },
    '& thead th': {
      h: '42px',
      bg: 'transparent',
      borderTop: '1px solid var(--color-black-100)',
      borderBottom: '1px solid var(--color-black-100)',
      fontWeight: 'normal',
    },
    '& tbody td + td': { borderLeft: '0' },
  },
});
/** 상품 배송 추적 표를 표시합니다. (Displays the shipment tracking history table.) */
function OrderTrackingHistory({ date }: { date: string }) {
  return (
    <ContentSection
      gap="3"
      title="상품추적"
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'body3', weight: 'semibold' } }}
    >
      <DataTable caption="상품 배송 추적 이력" className={trackingTable}>
        <thead>
          <tr>
            {['처리장소', '상대장소', '구분', '처리일자'].map((label) => (
              <th key={label}>
                <Typography variant="body5">{label}</Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['옥천HUB', '군포HUB', '집하처리'],
            ['군포HUB', '대구동', '간선하차'],
          ].map(([place, destination, state]) => (
            <tr key={`${place}-${destination}`}>
              <td>{place}</td>
              <td>{destination}</td>
              <td>{state}</td>
              <td>
                {date}
                <br />
                11:31
              </td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </ContentSection>
  );
}
const backdrop = css({
  pos: 'fixed',
  inset: '0',
  zIndex: '110',
  bg: 'color-mix(in srgb, var(--color-black-100) 50%, transparent)',
});
const viewport = css({
  pos: 'fixed',
  inset: '0',
  zIndex: '110',
  display: 'flex',
  alignItems: 'flex-end',
});
const popup = css({ w: '100%', minW: '0' });
/** 배송 단계·송장 정보와 상품 추적 이력을 표시합니다. (Displays delivery progress, shipment details, and tracking events.) */
function OrderTrackingDialog({ order, onClose }: { order: OrderRecord; onClose: () => void }) {
  const platform = usePlatform();
  const current =
    order.status === 'preparing'
      ? 2
      : order.status === 'shipping'
        ? 3
        : order.status === 'paid'
          ? 1
          : 4;
  const content = (
    <Stack gap="8">
      <ContentHeader
        title={`${order.expectedDate} 도착예정`}
        titleAs="h2"
        titleProps={{ variant: 'heading6' }}
        textAlign="center"
      />
      <StepIndicator
        variant="connected"
        current={current}
        ariaLabel="배송 진행 단계"
        items={[
          { label: '배송예약' },
          { label: '상품이동중' },
          { label: '배송중' },
          { label: '배송완료' },
        ]}
      />
      <OrderInformationSection
        title="기본정보"
        items={[
          { term: '운송장번호', description: '0000-0000-0000' },
          { term: '상품정보', description: order.items[0]?.name },
          { term: '보내는 분', description: '황**' },
          { term: '받는 분', description: '박**' },
          { term: '배송기사', description: '김길규 (010-1234-5678)' },
        ]}
      />
      <OrderTrackingHistory date={order.date} />
    </Stack>
  );
  if (platform !== 'mobile') {
    return (
      <ModalDialog
        open
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        title="배송조회"
        closeLabel="배송조회 닫기"
        size="sm"
        actions={{ kind: 'single', label: '닫기', onConfirm: onClose }}
      >
        {content}
      </ModalDialog>
    );
  }
  return (
    <Drawer.Root open onOpenChange={(open) => !open && onClose()} swipeDirection="down">
      <Drawer.Portal className={`platform-${platform}`}>
        <Drawer.Backdrop className={backdrop} />
        <Drawer.Viewport className={viewport}>
          <Drawer.Popup aria-label="배송조회" className={popup}>
            <Stack
              gap="0"
              maxH="calc(100dvh - 44px)"
              overflow="hidden"
              borderRadius="20px 20px 0 0"
              bg="white.0"
            >
              <HStack
                as="header"
                flexShrink="0"
                h="56px"
                justifyContent="space-between"
                px="6"
                borderBottom="1px solid var(--color-black-20)"
              >
                <Typography as="h2" variant="body4">
                  배송조회
                </Typography>
                <Button variant="icon" aria-label="배송조회 닫기" onClick={onClose} size={24}>
                  <Icon name="close" size={16} />
                </Button>
              </HStack>
              <Box minH="0" flex="1" overflowY="auto" overscrollBehaviorY="contain" px="6" py="8">
                {content}
              </Box>
              <Box as="footer" flexShrink="0" p="4" borderTop="1px solid var(--color-black-20)">
                <Button variant="primary" size="tall" fullWidth onClick={onClose}>
                  닫기
                </Button>
              </Box>
            </Stack>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
type OrdersPageProps = {
  initialOrders?: readonly OrderRecord[];
  initialView?: OrdersView;
  initialClaimKind?: ClaimKind;
  initialOverlay?: 'tracking' | 'purchase' | 'delete';
  returns?: boolean;
  onAddToCart?: (line: OrderLine) => void;
};
/** 주문 조회와 상세 진입·신청·구매확정의 상태를 관리합니다. (Manages order history navigation, claims, and purchase confirmation.) */
function OrdersPage({
  initialOrders = previewOrders,
  initialView = 'list',
  initialClaimKind,
  initialOverlay,
  returns = false,
}: OrdersPageProps) {
  const [demoOrders] = useState(() => [...initialOrders]);
  const orders = demoOrders;
  const [view, setView] = useState<OrdersView>(initialView);
  const [selectedId, setSelectedId] = useState(initialOrders[0]?.id);
  const [claimId, setClaimId] = useState(initialOrders[0]?.claims[0]?.id);
  const [sheet, setSheet] = useState<{
    id: string;
    kind: ClaimKind;
  } | null>(() =>
    initialClaimKind && initialOrders[0]
      ? { id: initialOrders[0].id, kind: initialClaimKind }
      : null,
  );
  const [trackingId, setTrackingId] = useState<string | null>(
    initialOverlay === 'tracking' ? (initialOrders[0]?.id ?? null) : null,
  );
  const [confirm, setConfirm] = useState<{
    id: string;
    kind: 'delete' | 'purchase';
  } | null>(
    initialOverlay === 'purchase' || initialOverlay === 'delete'
      ? { id: initialOrders[0]?.id ?? '', kind: initialOverlay }
      : null,
  );
  const [message, setMessage] = useState('');
  const [filters, setFilters] = useState<OrderFilters>({
    period: '1',
    start: '2026-09-23',
    end: '2026-10-23',
    query: '',
  });
  const [dates, setDates] = useState({ start: '2026-09-23', end: '2026-10-23' });
  const [error] = useState('');
  const baseOrders = returns ? orders.filter((order) => order.claims.length > 0) : orders;
  const visibleOrders = baseOrders;
  const selectedOrder = orders.find((order) => order.id === (selectedId ?? orders[0]?.id));
  const selectedClaim = selectedOrder?.claims.find((claim) => claim.id === claimId);
  const sheetOrder = orders.find((order) => order.id === sheet?.id);
  const trackingOrder = orders.find((order) => order.id === trackingId);
  const showList = () => {
    setView('list');
    setMessage('');
  };
  const showDetail = (order: OrderRecord) => {
    setSelectedId(order.id);
    setView('detail');
    setMessage('');
  };
  const showClaim = (order: OrderRecord, claim: OrderClaim) => {
    setSelectedId(order.id);
    setClaimId(claim.id);
    setView('claim');
    setMessage('');
  };
  return (
    <OrdersContent
      pending={false}
      orders={visibleOrders}
      statusItems={
        initialOrders.length
          ? [
              { label: '전체', count: 4 },
              { label: '결제완료', count: 1 },
              { label: '상품준비중', count: 1 },
              { label: '배송준비\n/ 배송중', count: 0 },
              { label: '배송완료\n구매확정', count: 2 },
            ]
          : []
      }
      view={view}
      selectedOrder={selectedOrder}
      selectedClaim={selectedClaim}
      returns={returns}
      filters={filters}
      dates={dates}
      error={error}
      message={message}
      onPeriodChange={(period) => setFilters((previous) => ({ ...previous, period }))}
      onDateChange={(key, value) => {
        setDates((previous) => ({ ...previous, [key]: value }));
        setFilters((previous) => ({ ...previous, period: 'custom' }));
      }}
      onDetail={showDetail}
      onClaimDetail={showClaim}
      onList={showList}
      onClaim={(order) => {
        const kind = order.claimKind;
        if (kind) setSheet({ id: order.id, kind });
      }}
      onTracking={(order) => setTrackingId(order.id)}
      onConfirm={(order) => setConfirm({ id: order.id, kind: 'purchase' })}
      onDelete={() => {
        if (selectedOrder) setConfirm({ id: selectedOrder.id, kind: 'delete' });
      }}
      dialogs={
        <>
          {sheet && sheetOrder ? (
            <OrderClaimSheet
              key={`${sheet.id}-${sheet.kind}`}
              order={sheetOrder}
              kind={sheet.kind}
              onClose={() => setSheet(null)}
            />
          ) : null}
          {trackingOrder ? (
            <OrderTrackingDialog order={trackingOrder} onClose={() => setTrackingId(null)} />
          ) : null}
          <ModalDialog
            open={Boolean(confirm)}
            onOpenChange={(open) => {
              if (!open) setConfirm(null);
            }}
            title={confirm?.kind === 'delete' ? '주문 내역 삭제' : '구매 확정'}
            closeLabel="확인 닫기"
            size="sm"
            actions={{
              kind: 'confirm',
              confirmDisabled: undefined,
              onConfirm: () => setConfirm(null),
            }}
          >
            {confirm?.kind === 'delete'
              ? '주문 내역을 삭제하시겠습니까?'
              : '상품을 수령하셨나요? 구매를 확정하시겠습니까?'}
          </ModalDialog>
        </>
      }
    />
  );
}
/** 준비된 주문 내역과 최소 로컬 UI를 표시합니다. (Displays prepared order history and minimal local controls.) */
export function OrdersRoute({ returns = false }: { returns?: boolean }) {
  return <OrdersPage returns={returns} />;
}
export { OrdersPage };
