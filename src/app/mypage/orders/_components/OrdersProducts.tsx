import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { getClaimLines, orderStatusLabels } from '@/components/orders/order-policy';
import type { OrderClaim, OrderLine, OrderRecord } from '@/components/orders/orders.types';

/** 주문 일자·번호와 상세 진입을 표시합니다. (Displays order identification and its detail action.) */
export function OrderCardHeader({
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
  showAmount?: boolean;
  imageSize?: 'standard' | 'claim';
};

/** 주문 내역 상품 요약을 표시합니다. (Displays an order history product summary.) */
export function OrderHistoryProduct({
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
        amount={line.displayAmount ?? 0}
        hideAmount={!showAmount || line.displayAmount === undefined}
      />
    </Box>
  );
}

type OrderItemActionsProps = {
  order: OrderRecord;
  onTracking: () => void;
};

/** 주문 상태에 맞는 배송 조회와 리뷰 링크를 표시합니다. (Displays tracking and review links for an order status.) */
function OrderItemActions({ order, onTracking }: OrderItemActionsProps) {
  return (
    <Stack gap="2">
      {order.status !== 'paid' ? (
        <Button variant="secondary" size="short" fullWidth onClick={onTracking}>
          배송 조회
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
export function OrderClaimGroup({
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

export type OrderCardActions = {
  onDetail: (order: OrderRecord) => void;
  onTracking: (order: OrderRecord) => void;
  onClaimDetail: (order: OrderRecord, claim: OrderClaim) => void;
};

/** 주문 한 건의 상품·상태·후속 처리 액션을 구성합니다. (Composes products, status, and follow-up actions for an order.) */
export function OrderCard({ order, ...actions }: { order: OrderRecord } & OrderCardActions) {
  const items = order.items;
  const platform = usePlatform();
  return (
    <Stack as="li" gap="6" listStyleType="none">
      <OrderCardHeader order={order} onDetail={() => actions.onDetail(order)} />
      {items.length ? (
        <>
          <Typography variant="body5">
            <Typography variant="body5" tone="primary" weight="semibold">
              {orderStatusLabels[order.status]}
            </Typography>{' '}
            · {order.expectedDate} 도착 예정
          </Typography>
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
                    {line.displayAmount === undefined
                      ? '-'
                      : `${line.displayAmount.toLocaleString()}원`}
                  </Typography>
                  <OrderItemActions order={order} onTracking={() => actions.onTracking(order)} />
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
            <OrderItemActions order={order} onTracking={() => actions.onTracking(order)} />
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
