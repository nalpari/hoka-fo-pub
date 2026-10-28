import { OrderClaimStatus } from './OrderClaimStatus';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { OrderCardHeader } from './OrderCardHeader';
import { OrderHistoryProduct } from './OrderHistoryProduct';
import { OrderInformationSection } from './OrderInformationSection';
import { getClaimLines, getLinesAmount, claimReasonLabels } from './order-policy';
import type { OrderClaim, OrderRecord } from './orders.types';

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
          { term: '상품금액', description: `${getLinesAmount(items).toLocaleString()}원` },
          { term: '반품비', description: `${claim.fee.toLocaleString()}원` },
          {
            term: '총 환불금액',
            description: (
              <Typography variant="body3" weight="semibold" tone="error">
                {Math.max(0, getLinesAmount(items) - claim.fee).toLocaleString()}원
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
