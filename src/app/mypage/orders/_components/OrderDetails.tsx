import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge';
import { Button } from '@/components/common/atoms/Button';
import {
  DescriptionList,
  type DescriptionListItem,
} from '@/components/common/atoms/DescriptionList';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import {
  claimReasonLabels,
  getClaimLines,
  orderStatusLabels,
} from '@/components/orders/order-policy';
import type { OrderClaim, OrderRecord } from '@/components/orders/orders.types';
import {
  OrderCardHeader,
  OrderClaimGroup,
  type OrderCardActions,
  OrderHistoryProduct,
} from './OrdersProducts';

/** 주문 상세의 구분선이 있는 항목별 정보를 표시합니다. (Displays ruled key-value information for an order.) */
export function OrderInformationSection({
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
};

/** 주문 상품·받는 사람·결제 정보와 취소 내역을 표시합니다. (Displays order products, recipient, payment, and claim history.) */
export function OrderDetail({ order, onList, ...actions }: OrderDetailProps) {
  const amounts = order.displayAmounts;

  return (
    <ContentSection
      gap="8"
      header={<OrderCardHeader order={order} compact />}
      footer={
        <Button variant="primary" fullWidth onClick={onList}>
          주문목록 돌아가기
        </Button>
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
          {
            term: '총 상품금액',
            description: amounts ? `${amounts.total.toLocaleString()}원` : '-',
          },
          {
            term: '취소금액',
            description: amounts ? `${amounts.claimed.toLocaleString()}원` : '-',
          },
          {
            term: '총 결제금액',
            description: amounts ? `${amounts.remaining.toLocaleString()}원` : '-',
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

/** 취소·반품 상세와 처리 정보 및 환불 내역을 표시합니다. (Displays claim processing details and refund information.) */
export function OrderClaimDetail({
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
          <Badge variant="filled" tone="tertiary">
            {claim.kind === 'cancel' ? '취소' : '반품'}
            {claim.state === 'complete' ? '완료' : '접수'}
          </Badge>
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
          {
            term: '상품금액',
            description:
              claim.displayAmount === undefined ? '-' : `${claim.displayAmount.toLocaleString()}원`,
          },
          { term: '반품비', description: `${claim.fee.toLocaleString()}원` },
          {
            term: '총 환불금액',
            description: (
              <Typography variant="body3" weight="semibold" tone="error">
                {claim.displayRefund === undefined
                  ? '-'
                  : `${claim.displayRefund.toLocaleString()}원`}
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
