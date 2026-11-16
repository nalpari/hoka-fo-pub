import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { getClaimLines, orderStatusLabels } from '@/components/orders/order-policy';
import { OrderHistoryProduct } from '@/components/orders/OrderHistoryProduct';
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
      gap="8px"
      pb="12px"
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
        <Stack gap="4px">
          <Typography variant="body2" weight="semibold">
            {order.date.replaceAll('-', '.')}
          </Typography>
          <Typography variant="body5" tone="subtle">
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
  return (
    <ContentSection
      gap="16px"
      pt="24px"
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
      <Stack gap="16px">
        {getClaimLines(order, claim).map((line) => (
          <OrderHistoryProduct key={line.key} line={line} />
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
    <Stack as="li" gap="0" listStyleType="none">
      {platform === 'mobile' ? (
        <HStack
          justifyContent="space-between"
          alignItems="flex-end"
          py="16px"
          borderBottom="1px solid var(--colors-black-100)"
        >
          <HStack
            gap={{ base: '16px', _mobile: '4px' }}
            alignItems={{ base: 'baseline', _mobile: 'flex-start' }}
            _mobile={{ flexDirection: 'column' }}
          >
            <Typography variant="body2" weight="semibold">
              {order.date.replaceAll('-', '.')}
            </Typography>
            <Typography variant="body4" tone="tertiary">
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
          gap={{ base: '32px', _mobile: '16px' }}
          py={{ base: '32px', _mobile: '24px' }}
          borderBottom={{
            base: '1px solid var(--colors-black-100)',
            _mobile: '1px solid var(--colors-black-20)',
          }}
        >
          <Stack
            gap="16px"
            py={{ base: '16px', _mobile: '0' }}
            borderBottom={{ base: '1px solid var(--colors-black-20)', _mobile: '0' }}
          >
            {platform !== 'mobile' && index === 0 ? (
              <HStack gap="12px" px="24px" alignItems="baseline">
                <Typography variant="heading9">{order.date.replaceAll('-', '.')}</Typography>
                <Typography variant="body3" tone="tertiary">
                  주문번호 {order.id}
                </Typography>
              </HStack>
            ) : null}
            <HStack justifyContent="space-between" px={{ base: '24px', _mobile: '0' }}>
              <HStack gap="2px" flexWrap="wrap">
                <Typography web="body3" mo="body4" weight="medium" tone="red80">
                  {orderStatusLabels[group.status]}
                </Typography>
                <Typography web="body3" mo="body4" weight="medium">
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
                <OrderHistoryProduct key={line.key} line={line} cartAction />
              ) : (
                <Grid
                  key={line.key}
                  gridTemplateColumns="minmax(0, 536fr) minmax(0, 108fr) minmax(0, 200fr)"
                  alignItems="center"
                  gap="0"
                >
                  <Box px="24px">
                    <OrderHistoryProduct line={line} showAmount={false} cartAction />
                  </Box>
<Typography
                    variant="body3Medium"
                    className={css({ textAlign: 'center' })}
                  >
                    {line.quantity}개
                  </Typography>
<Typography
                    variant="body3Medium"
                    className={css({ textAlign: 'right', px: '24px' })}
                  >
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
            px={{ base: '8px', _mobile: '0' }}
            _mobile={{ flexDirection: 'column', alignItems: 'stretch' }}
          >
            {['preparing', 'shipping', 'delivered', 'purchased'].includes(group.status) ? (
              <Button
                variant="secondary"
                size="short"
                fullWidth={platform === 'mobile'}
                onClick={() => actions.onTracking(order)}
              >
                배송 조회
              </Button>
            ) : null}
            {group.status === 'paid' ? (
              <Button
                variant="secondary"
                size="short"
                fullWidth={platform === 'mobile'}
                type="button"
                onClick={() => actions.onCancel?.(order)}
              >
                주문 취소
              </Button>
            ) : null}
            {group.status === 'delivered' ? (
              <>
                <Button
                  variant="secondary"
                  size="short"
                  fullWidth={platform === 'mobile'}
                  type="button"
                  onClick={() => actions.onReturn?.(order)}
                >
                  환불 신청
                </Button>
                <Button
                  variant="secondary"
                  size="short"
                  fullWidth={platform === 'mobile'}
                  type="button"
                >
                  구매 확정
                </Button>
              </>
            ) : null}
            {group.status === 'purchased' ? (
              <ButtonLink
                href={'/mypage/reviews?order=' + order.id}
                variant="secondary"
                size="short"
                fullWidth={platform === 'mobile'}
              >
                리뷰 작성하기
              </ButtonLink>
            ) : null}
          </HStack>
        </Stack>
      ))}

      {order.claims.map((claim) => (
        <Stack key={claim.id} gap="16px" py="24px" borderBottom="1px solid var(--colors-black-20)">
          <HStack justifyContent="space-between" alignItems="center">
<Typography variant="body4Medium" tone="subtle">
              {claim.kind === 'cancel' ? '구매취소' : '반품요청'}
            </Typography>
            <Button variant="link" size="sm" onClick={() => actions.onClaimDetail(order, claim)}>
              {claim.kind === 'cancel' ? '취소상세보기' : '반품상세보기'}
            </Button>
          </HStack>
          {getClaimLines(order, claim).map((line) => (
            <OrderHistoryProduct key={line.key} line={line} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
