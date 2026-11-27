import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { getClaimLines, orderStatusLabels } from '@/components/orders/order-policy';
import type { OrderClaim, OrderLine, OrderRecord } from '@/components/orders/orders.types';
import { formatProductOptions } from '@/lib/formatProductOptions';

const styles = {
  orderAction: css({ minW: '107px', _mobile: { minW: '0', '&&': { '--button-height': '44px' } } }),
};

/** [ 개발팀 바인딩 ] 주문 화면 소유자가 제공한 line의 옵션·PC/MO 수량·표시 금액을 OrderProductSummary에 전달합니다. 공통 컴포넌트는 OrderLine을 해석하거나 금액을 계산하지 않으며 cartAction은 미연결 표시 버튼입니다. */
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
      gap="8px"
      pb="12px"
      borderBottom="1px solid var(--colors-black-100)"
    >
      {compact ? (
        <Typography variant="b8" tone="subtle">
          <Typography as="span" variant="b8S" tone="primary">
            {order.date.replaceAll('-', '.')}
          </Typography>{' '}
          주문 · 주문번호 {order.id}
        </Typography>
      ) : (
        <Stack gap="4px">
          <Typography variant="b2S">{order.date.replaceAll('-', '.')}</Typography>
          <Typography variant="b8" tone="subtle">
            주문번호 {order.id}
          </Typography>
        </Stack>
      )}
      {onDetail ? (
        <Button variant="link" size="md" onClick={onDetail}>
          주문상세보기
        </Button>
      ) : null}
    </HStack>
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
  const platform = usePlatform();
  return (
    <ContentSection
      gap="16px"
      pt="24px"
      borderTop="1px solid var(--colors-black-20)"
      title={claim.kind === 'cancel' ? '구매취소' : '반품접수'}
      headerProps={{
        orientation: 'horizontal',
        titleAs: 'h3',
        titleProps: { variant: 'b8', tone: 'subtle' },
        action: (
          <Button variant="link" size="sm" onClick={onDetail}>
            {claim.kind === 'cancel' ? '취소상세보기' : '반품상세보기'}
          </Button>
        ),
      }}
    >
      <Stack gap="16px">
        {getClaimLines(order, claim).map((line) => (
          <OrderProductSummary
            variant="history"
            key={line.key}
            image={line.image}
            name={line.name}
            optionText={formatProductOptions(
              line,
              platform === 'mobile' ? (line.mobileQuantity ?? line.quantity) : line.quantity,
            )}
            amount={
              line.displayAmount === undefined
                ? undefined
                : platform === 'mobile'
                  ? (line.mobileDisplayAmount ?? line.displayAmount)
                  : line.displayAmount
            }
          />
        ))}
      </Stack>
    </ContentSection>
  );
}

export type OrderCardActions = {
  onReturn?: (order: OrderRecord) => void;
  onCancel?: (order: OrderRecord) => void;
  onDetail: (order: OrderRecord) => void;
  onTracking: (order: OrderRecord) => void;
  onClaimDetail: (order: OrderRecord, claim: OrderClaim) => void;
};

/** 주문 한 건의 상품과 상태별 액션을 PC·모바일로 표시합니다. (Displays order products and status actions on desktop and mobile.) */
export function OrderCard({ order, ...actions }: { order: OrderRecord } & OrderCardActions) {
  const platform = usePlatform();
  const items = order.items.filter(
    (line) => !order.claims.some((claim) => claim.quantities[line.key]),
  );
  const groups = items.reduce<
    { status: OrderRecord['status']; expectedDate: string; lines: OrderLine[] }[]
  >((result, line) => {
    const status = line.displayStatus ?? order.status;
    const expectedDate = line.displayExpectedDate ?? order.expectedDate;
    const last = result[result.length - 1];

    if (last?.status === status && last.expectedDate === expectedDate) {
      last.lines.push(line);
    } else {
      result.push({ status, expectedDate, lines: [line] });
    }

    return result;
  }, []);

  return (
    <Stack
      as="li"
      gap={{ base: '16px', _mobile: '0' }}
      py={{ base: '32px', _mobile: '0' }}
      borderBottom={{ base: '1px solid var(--colors-black-20)', _mobile: '0' }}
      listStyleType="none"
    >
      {platform === 'mobile' ? (
        <HStack
          justifyContent="space-between"
          alignItems="flex-end"
          py="16px"
          borderBottom="1px solid var(--colors-black-20)"
        >
          <HStack
            gap={{ base: '16px', _mobile: '4px' }}
            alignItems={{ base: 'baseline', _mobile: 'flex-start' }}
            _mobile={{ flexDirection: 'column' }}
          >
            <Typography variant="b2S">{order.date.replaceAll('-', '.')}</Typography>
            <Typography variant="b6" tone="tertiary">
              주문번호 {order.id}
            </Typography>
          </HStack>
          <Button variant="link" size="md" onClick={() => actions.onDetail(order)}>
            주문상세보기
          </Button>
        </HStack>
      ) : null}

      {groups.map((group, index) => (
        <Stack
          key={String(index)}
          gap="16px"
          py={{ base: '0', _mobile: '24px' }}
          borderBottom={{ base: '0', _mobile: '1px solid var(--color-border-subtle)' }}
        >
          <Stack
            gap="16px"
            py={{ base: '16px', _mobile: '0' }}
            borderBottom={{ base: '1px solid var(--colors-black-20)', _mobile: '0' }}
          >
            {platform !== 'mobile' && index === 0 ? (
              <HStack gap="12px" pe="24px" alignItems="baseline">
                <Typography web="h10" mo="h8">
                  {order.date.replaceAll('-', '.')}
                </Typography>
                <Typography variant="b4" tone="tertiary">
                  주문번호 {order.id}
                </Typography>
              </HStack>
            ) : null}
            <HStack justifyContent="space-between" pe={{ base: '24px', _mobile: '0' }}>
              <HStack gap="2px" flexWrap="wrap">
                <Typography web="b4M" mo="b6M" tone="accent">
                  {orderStatusLabels[group.status]}
                </Typography>
                <Typography web="b4M" mo="b6M">
                  · {group.expectedDate} {group.status === 'purchased' ? '도착' : '도착 예정'}
                </Typography>
              </HStack>
              {platform !== 'mobile' && index === 0 ? (
                <Button variant="link" size="md" onClick={() => actions.onDetail(order)}>
                  주문상세보기
                </Button>
              ) : null}
            </HStack>
          </Stack>

          <Stack gap="16px" mt={{ base: '16px', _mobile: '0' }}>
            {group.lines.map((line) =>
              platform === 'mobile' ? (
                <OrderProductSummary
                  variant="history"
                  key={line.key}
                  image={line.image}
                  name={line.name}
                  optionText={formatProductOptions(line, line.mobileQuantity ?? line.quantity)}
                  amount={
                    line.displayAmount === undefined
                      ? undefined
                      : platform === 'mobile'
                        ? (line.mobileDisplayAmount ?? line.displayAmount)
                        : line.displayAmount
                  }
                  cartAction
                />
              ) : (
                <Grid
                  key={line.key}
                  gridTemplateColumns="minmax(0, 536fr) minmax(0, 108fr) minmax(0, 200fr)"
                  alignItems="center"
                  gap="0"
                >
                  <Box pe="24px">
                    <OrderProductSummary
                      variant="history"
                      image={line.image}
                      name={line.name}
                      optionText={formatProductOptions(line)}
                      cartAction
                    />
                  </Box>
                  <Typography variant="b4M" className={css({ textAlign: 'center' })}>
                    {line.quantity}개
                  </Typography>
                  <Typography variant="b4M" className={css({ textAlign: 'right', px: '24px' })}>
                    {line.displayAmount === undefined ? '-' : line.displayAmount.toLocaleString()}
                    {line.displayAmount === undefined ? null : '원'}
                  </Typography>
                </Grid>
              ),
            )}
          </Stack>

          <HStack
            gap="8px"
            justifyContent="flex-end"
            pr={{ base: '8px', _mobile: '0' }}
            _mobile={{ mt: '16px', flexDirection: 'column', alignItems: 'stretch' }}
          >
            {['shipping', 'delivered', 'purchased'].includes(group.status) ? (
              <Button
                variant="secondary"
                size="short"
                className={styles.orderAction}
                fullWidth={platform === 'mobile'}
                onClick={() => actions.onTracking(order)}
              >
                <Typography web="b6B" mo="b5B">
                  배송 조회
                </Typography>
              </Button>
            ) : null}
            {group.status === 'paid' || group.status === 'preparing' ? (
              <Button
                variant="secondary"
                size="short"
                className={styles.orderAction}
                fullWidth={platform === 'mobile'}
                type="button"
                onClick={() => actions.onCancel?.(order)}
              >
                <Typography web="b6B" mo="b5B">
                  주문 취소
                </Typography>
              </Button>
            ) : null}
            {group.status === 'delivered' ? (
              <>
                <Button
                  variant="secondary"
                  size="short"
                  className={styles.orderAction}
                  fullWidth={platform === 'mobile'}
                  type="button"
                  onClick={() => actions.onReturn?.(order)}
                >
                  <Typography web="b6B" mo="b5B">
                    환불 신청
                  </Typography>
                </Button>
                <Button
                  variant="secondary"
                  size="short"
                  className={styles.orderAction}
                  fullWidth={platform === 'mobile'}
                  type="button"
                >
                  <Typography web="b6B" mo="b5B">
                    구매 확정
                  </Typography>
                </Button>
              </>
            ) : null}
            {group.status === 'purchased' ? (
              <ButtonLink
                href={'/mypage/reviews?order=' + order.id}
                variant="secondary"
                size="short"
                className={styles.orderAction}
                fullWidth={platform === 'mobile'}
              >
                <Typography web="b6B" mo="b5B">
                  리뷰 작성하기
                </Typography>
              </ButtonLink>
            ) : null}
          </HStack>
        </Stack>
      ))}

      {order.claims.map((claim) => (
        <Stack
          key={claim.id}
          gap={{ base: '32px', _mobile: '16px' }}
          py={{ base: '0', _mobile: '24px' }}
          borderBottom={{ base: '0', _mobile: '1px solid var(--color-border-subtle)' }}
        >
          <HStack
            gap="16px"
            alignItems="center"
            justifyContent={{ base: 'flex-start', _mobile: 'space-between' }}
            pe={{ base: '24px', _mobile: '0' }}
            py={{ base: '16px', _mobile: '0' }}
            borderBottom={{ base: '1px solid var(--color-border-subtle)', _mobile: '0' }}
          >
            <Typography variant="b6M" tone="accent">
              {claim.kind === 'cancel' ? '취소완료' : '환불신청'}
            </Typography>
            <Button variant="link" size="sm" onClick={() => actions.onClaimDetail(order, claim)}>
              {claim.kind === 'cancel' ? '취소상세보기' : '반품상세보기'}
            </Button>
          </HStack>
          {getClaimLines(order, claim).map((line) =>
            platform === 'mobile' ? (
              <OrderProductSummary
                variant="history"
                key={line.key}
                image={line.image}
                name={line.name}
                optionText={formatProductOptions(line, line.mobileQuantity ?? line.quantity)}
                amount={
                  line.displayAmount === undefined
                    ? undefined
                    : platform === 'mobile'
                      ? (line.mobileDisplayAmount ?? line.displayAmount)
                      : line.displayAmount
                }
              />
            ) : (
              <Grid
                key={line.key}
                gridTemplateColumns="minmax(0, 536fr) minmax(0, 108fr) minmax(0, 200fr)"
                alignItems="center"
                gap="0"
              >
                <Box pe="24px">
                  <OrderProductSummary
                    variant="history"
                    image={line.image}
                    name={line.name}
                    optionText={formatProductOptions(line)}
                  />
                </Box>
                <Typography variant="b4M" className={css({ textAlign: 'center' })}>
                  {line.quantity}개
                </Typography>
                <Typography variant="b4M" className={css({ textAlign: 'right', px: '24px' })}>
                  {line.displayAmount?.toLocaleString()}원
                </Typography>
              </Grid>
            ),
          )}
        </Stack>
      ))}
    </Stack>
  );
}
