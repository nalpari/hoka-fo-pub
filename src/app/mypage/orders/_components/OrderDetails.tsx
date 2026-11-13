import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import {
  DescriptionList,
  type DescriptionListItem,
} from '@/components/common/atoms/DescriptionList';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { OrderHistoryProduct } from '@/components/orders/OrderHistoryProduct';
import type {
  ClaimDetailDisplay,
  OrderClaim,
  OrderDetailDisplay,
  OrderLine,
} from '@/components/orders/orders.types';

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

type OrderDetailProps = {
  display: OrderDetailDisplay;
  onList: () => void;
  onDetail: () => void;
  onTracking: () => void;
  onClaimDetail: (claimId: string) => void;
};

function DetailSectionTitle({ children }: { children: string }) {
  return (
    <Typography
      as="h2"
      web="heading7"
      mo="heading6"
      className={css({
        w: '100%',
        pb: { base: '24px', _mobile: '16px' },
        borderBottom: '1px solid var(--colors-black-100)',
      })}
    >
      {children}
    </Typography>
  );
}

function DetailProduct({ line }: { line: OrderLine }) {
  return (
    <>
      <Box gridColumn="1" minW="0" pl="24px">
        <OrderHistoryProduct line={line} showAmount={false} cartAction />
      </Box>
<Typography variant="body4Medium" className={css({ textAlign: 'center' })}>
        {line.quantity}개
      </Typography>
<Typography variant="body4Medium" className={css({ textAlign: 'center' })}>
        {line.displayAmount === undefined ? '-' : `${line.displayAmount.toLocaleString()}원`}
      </Typography>
    </>
  );
}

function DetailAmountRow({ label, amount }: { label: string; amount: number }) {
  return (
    <HStack justifyContent="space-between" gap="4">
      <Typography variant="body4" tone="subtle">
        {label}
      </Typography>
<Typography variant="body4Medium">
        {amount.toLocaleString()}원
      </Typography>
    </HStack>
  );
}

/** [ 개발팀 바인딩 ] display는 호출자가 준비한 상품 그룹·내역·받는사람·결제 표시값입니다. 주문 기능 소유자가 표시 모델과 조회 결과 갱신을 연결하며 이 컴포넌트는 상품 분류·복제·금액 계산·상태 판단을 하지 않습니다. 콜백은 화면 확인용 상세/배송조회/목록 전환이며 삭제는 고정 확인 URL입니다. */
/** 준비된 주문 상세 데이터를 PC·모바일 마크업으로 표시합니다. (Renders prepared order detail data for desktop and mobile.) */
export function OrderDetail({ display, onList, ...actions }: OrderDetailProps) {
  const mobile = usePlatform() === 'mobile';
  return (
    <Stack gap="0" mt={{ base: '24px', _mobile: '8px' }}>
      {!mobile ? (
        <Grid
          gridTemplateColumns="minmax(0, 1fr) 108px 200px"
          gap="0"
          py="20px"
          borderY="1px solid var(--colors-black-100)"
        >
          {['상품/옵션정보', '수량', '가격'].map((label) => (
<Typography
              key={label}
              variant="body3Semibold"
              className={css({ textAlign: 'center' })}
            >
              {label}
            </Typography>
          ))}
        </Grid>
      ) : null}
      <Stack gap="0" borderBottom={{ base: '1px solid var(--colors-black-100)', _mobile: '0' }}>
        <HStack
          gap="8px"
          py={{ base: '32px', _mobile: '16px' }}
          borderBottom={{ base: '0', _mobile: '1px solid var(--colors-black-100)' }}
        >
<Typography variant="body4Semibold">
            {display.date}
            {mobile ? ' 주문' : ''}
          </Typography>
          <Typography variant="body4" tone="tertiary">
            · 주문번호 {display.orderNumber}
          </Typography>
        </HStack>
        {display.activeItems.length ? (
          <Stack
            gap={{ base: '24px', _mobile: '12px' }}
            py={{ base: '16px', _mobile: '24px' }}
            borderBottom="1px solid var(--colors-black-20)"
          >
            <HStack
              justifyContent="space-between"
              gap="8px"
              pl={{ base: '24px', _mobile: '0' }}
              pr={{ base: '24px', _mobile: '0' }}
            >
              <Typography variant="body4">
<Typography as="span" variant="body4Semibold" tone="red80">
                  {display.status}
                </Typography>
                {' · '}
                {display.expectedDate} 도착
              </Typography>
              {!mobile ? (
                <Button variant="link" size="md" onClick={actions.onDetail}>
                  주문상세보기
                </Button>
              ) : null}
            </HStack>
            {display.activeItems.map((line) =>
              mobile ? (
                <OrderHistoryProduct key={line.key} line={line} cartAction />
              ) : (
                <Grid
                  key={line.key}
                  gridTemplateColumns="minmax(0, 1fr) 108px 200px"
                  gap="0"
                  alignItems="center"
                >
                  <DetailProduct line={line} />
                </Grid>
              ),
            )}
            {!mobile ? (
              <HStack justifyContent="flex-end" gap="8px">
                <Button variant="secondary" size="short" onClick={actions.onTracking}>
                  배송 조회
                </Button>
                <ButtonLink href={display.reviewHref} variant="secondary" size="short">
                  리뷰 작성
                </ButtonLink>
              </HStack>
            ) : null}
          </Stack>
        ) : null}
        {display.claimGroups.map((group) => (
          <Stack
            key={group.id}
            gap={{ base: '16px', _mobile: '8px' }}
            py={{ base: '32px', _mobile: '24px' }}
            borderBottom="1px solid var(--colors-black-20)"
          >
            <HStack
              justifyContent={{ base: 'flex-start', _mobile: 'space-between' }}
              gap="16px"
              px={{ base: '24px', _mobile: '0' }}
            >
              <Typography variant="body4" tone={mobile ? 'tertiary' : 'error'}>
                {group.label}
              </Typography>
              <Button variant="link" size="md" onClick={() => actions.onClaimDetail(group.id)}>
                {group.detailLabel}
              </Button>
            </HStack>
            {group.items.map((line) =>
              mobile ? (
                <OrderHistoryProduct key={line.key} line={line} />
              ) : (
                <Grid
                  key={line.key}
                  gridTemplateColumns="minmax(0, 1fr) 108px 200px"
                  gap="0"
                  alignItems="center"
                >
                  <DetailProduct line={line} />
                </Grid>
              ),
            )}
          </Stack>
        ))}
      </Stack>
      <Stack gap="0" mt={{ base: '56px', _mobile: '24px' }}>
        <DetailSectionTitle>받는사람 정보</DetailSectionTitle>
        <DescriptionList
          items={[
            { term: '받는사람', description: display.recipient.name },
            { term: '연락처', description: display.recipient.phone },
            { term: '받는주소', description: display.recipient.address },
            { term: '배송요청사항', description: display.recipient.request },
          ]}
          termProps={{ variant: 'body4', tone: 'tertiary' }}
          descriptionProps={{ variant: 'body4', weight: 'medium' }}
          slotStyles={{
            root: css.raw({ display: 'block' }),
            row: css.raw({
              display: 'grid',
              gridTemplateColumns: { base: '104px minmax(0, 1fr)', _mobile: '96px minmax(0, 1fr)' },
              gap: '8px',
              py: { base: '20px', _mobile: '16px' },
              borderBottom: '1px solid var(--colors-black-20)',
            }),
          }}
        />
      </Stack>
      <Stack gap="0" mt={{ base: '56px', _mobile: '24px' }}>
        <DetailSectionTitle>결제 정보</DetailSectionTitle>
        <HStack
          py="16px"
          justifyContent="space-between"
          borderBottom="1px solid var(--colors-black-20)"
        >
          <Typography variant="body4" tone="tertiary">
            결제수단
          </Typography>
<Typography variant="body4Medium">
            {display.paymentMethod}
          </Typography>
        </HStack>
        <HStack
          alignItems="stretch"
          gap="0"
          borderBottom="1px solid var(--colors-black-20)"
          _mobile={{ flexDirection: 'column' }}
        >
          <Stack
            flex="1"
            gap="16px"
            py={{ base: '32px', _mobile: '16px' }}
            pr={{ base: '32px', _mobile: '0' }}
          >
            <DetailAmountRow label="상품금액" amount={display.productAmount} />
            <DetailAmountRow label="할인금액" amount={display.discountAmount} />
            <DetailAmountRow label="배송비" amount={display.shippingAmount} />
          </Stack>
          <Stack
            flex="1"
            gap="8px"
            py={{ base: '32px', _mobile: '16px' }}
            pl={{ base: '32px', _mobile: '0' }}
            borderLeft={{ base: '1px solid var(--colors-black-20)', _mobile: '0' }}
            alignItems={{ base: 'flex-end', _mobile: 'stretch' }}
          >
            <HStack justifyContent="space-between" w="100%">
              <Typography variant="body4" tone="subtle">
                결제예정금액
              </Typography>
              {mobile ? (
<Typography variant="body3Semibold">
                  {display.payableAmount.toLocaleString()}원
                </Typography>
              ) : null}
            </HStack>
            {!mobile ? (
              <>
                <Typography variant="body5" tone="tertiary">
                  (상품금액 - 할인금액 - 배송비)
                </Typography>
                <Typography variant="heading7">
                  {display.payableAmount.toLocaleString()}원
                </Typography>
              </>
            ) : null}
          </Stack>
        </HStack>
      </Stack>
      {display.history.length ? (
        <Stack gap="0" mt={{ base: '56px', _mobile: '24px' }}>
          <DetailSectionTitle>
            {mobile ? '취소·반품·교환 내역' : '취소 · 반품 내역'}
          </DetailSectionTitle>
          {!mobile ? (
            <Grid
              gridTemplateColumns="minmax(0, 1fr) 200px 140px"
              py="20px"
              borderBottom="1px solid var(--colors-black-100)"
            >
              {['상품/옵션정보', '환불금액', '처리상태'].map((label) => (
<Typography
                  key={label}
                  variant="body3Semibold"
                  className={css({ textAlign: 'center' })}
                >
                  {label}
                </Typography>
              ))}
            </Grid>
          ) : null}
          {display.history.map((entry) => (
            <Stack
              key={entry.id}
              gap="16px"
              py={{ base: '32px', _mobile: '16px' }}
              borderBottom="1px solid var(--colors-black-20)"
            >
              <HStack justifyContent="space-between">
                <Typography variant="body4" tone="tertiary">
                  접수일 : {entry.requestedAt}
                </Typography>
                {mobile ? (
                  <Typography variant="body4" tone="tertiary">
                    {entry.status}
                  </Typography>
                ) : null}
              </HStack>
              {mobile ? (
                <Stack gap="16px">
                  {entry.items.map((line) => (
                    <OrderHistoryProduct
                      key={line.key}
                      line={line}
                      showAmount={false}
                      showQuantity
                    />
                  ))}
                  <DetailAmountRow label="환불금액" amount={entry.refund} />
                </Stack>
              ) : (
                <Grid gridTemplateColumns="minmax(0, 1fr) 200px 140px" gap="0" alignItems="center">
                  <Stack gap="16px">
                    {entry.items.map((line) => (
                      <OrderHistoryProduct
                        key={line.key}
                        line={line}
                        showAmount={false}
                        showQuantity
                      />
                    ))}
                  </Stack>
<Typography
                    variant="body4Medium"
                    className={css({ textAlign: 'center' })}
                  >
                    {entry.refund.toLocaleString()}원
                  </Typography>
<Typography
                    variant="body4Medium"
                    className={css({ textAlign: 'center' })}
                  >
                    {entry.status}
                  </Typography>
                </Grid>
              )}
            </Stack>
          ))}
        </Stack>
      ) : null}
      <Stack
        gap="8px"
        mt={{ base: '48px', _mobile: '24px' }}
        alignItems={{ base: 'center', _mobile: 'stretch' }}
        _mobile={{ w: '100%' }}
      >
        <HStack gap="8px" _mobile={{ flexDirection: 'column', w: '100%' }}>
          <ButtonLink
            href="/mypage/orders/preview-delete-confirm"
            variant="secondary"
            fullWidth={mobile}
            className={css({ w: { base: '180px', _mobile: '100%' } })}
          >
            주문 내역 삭제
          </ButtonLink>
          <Button
            variant="primary"
            fullWidth={mobile}
            onClick={onList}
            className={css({ w: { base: '180px', _mobile: '100%' } })}
          >
            목록
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
}

function ClaimSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <ContentSection
      title={title}
      gap="0"
      mt={{ base: '56px', _mobile: '24px' }}
      headerProps={{
        titleAs: 'h2',
        titleProps: {
          web: 'heading7',
          mo: 'heading6',
          weight: usePlatform() === 'mobile' ? 'bold' : 'black',
        },
        css: css.raw({
          pb: { base: '24px', _mobile: '16px' },
          borderBottom: { base: '2px solid black', _mobile: '1px solid black' },
        }),
      }}
    >
      {children}
    </ContentSection>
  );
}

function ClaimInformation({ items }: { items: readonly DescriptionListItem[] }) {
  return (
    <DescriptionList
      items={items}
      termProps={{ web: 'body3', mo: 'body4', tone: 'subtle' }}
      descriptionProps={{ web: 'body3', mo: 'body4', tone: 'primary', weight: 'medium' }}
      slotStyles={{
        root: css.raw({ display: 'block' }),
        row: css.raw({
          display: 'grid',
          gridTemplateColumns: '96px minmax(0, 1fr)',
          gap: '8px',
          py: { base: '20px', _mobile: '16px' },
          borderBottom: '1px solid var(--colors-black-20)',
        }),
      }}
    />
  );
}

/** [ 개발팀 바인딩 ] display는 호출자가 준비한 날짜·상태 문구·상품 옵션/수량·금액입니다. OrdersContent가 현재 플랫폼의 표시값을 전달하며, 이 컴포넌트는 원본 주문을 가공하거나 상태를 추론하지 않습니다. 실제 조회와 표시 모델 구성·응답 갱신은 주문 기능 소유자가 연결합니다. onList는 로컬 목록 전환이며 환불 요청·계산은 미연결입니다. */
/** 취소·반품 상품과 사유·환불안내를 PC 표와 모바일 목록으로 표시합니다. (Displays claim products, reasons, and refund information for desktop and mobile.) */
export function OrderClaimDetail({
  display,
  claim,
  onList,
}: {
  display: ClaimDetailDisplay;
  claim: OrderClaim;
  onList: () => void;
}) {
  const mobile = usePlatform() === 'mobile';
  const cancel = claim.kind === 'cancel';
  const name = cancel ? '취소' : '반품';
  const {
    orderDate: date,
    orderNumber: number,
    status,
    items,
    reason,
    details,
    productAmount: amount,
    fee,
    refund,
  } = display;
  const money = (value: number | undefined) =>
    value === undefined ? (
      '-'
    ) : (
      <>
        <Typography as="span" web="body3" mo="body4" language="en" weight="medium">
          {value.toLocaleString()}
        </Typography>
        원
      </>
    );
  const columns = 'minmax(0, 1fr) 108px 160px 140px';
  return (
    <Stack gap="0" data-claim-detail={claim.kind}>
      <HStack
        pb="16px"
        gap="2px"
        justifyContent={{ base: 'space-between', _mobile: 'flex-start' }}
        borderBottom="1px solid black"
      >
        <HStack gap={mobile ? '4px' : '8px'} flexShrink="0">
          {!mobile ? (
<Typography variant="body3Medium" tone="subtle">
              주문일자
            </Typography>
          ) : null}
          <Typography
            web="body3"
            mo="body4"
            language={mobile ? 'en' : 'ko'}
            weight="medium"
            tone="primary"
          >
            {date}
          </Typography>
          {mobile ? (
<Typography variant="body4Medium" tone="primary">
              주문
            </Typography>
          ) : null}
        </HStack>
        {mobile ? (
          <Box w="8px" flexShrink="0" textAlign="center">
            <Typography variant="body4" tone="primary">
              ·
            </Typography>
          </Box>
        ) : null}
        <HStack gap={mobile ? '4px' : '8px'} flexShrink="0">
          <Typography
            web="body3"
            mo="body4"
            weight={mobile ? 'regular' : 'medium'}
            tone={mobile ? 'tertiary' : 'subtle'}
          >
            주문번호
          </Typography>
          <Typography
            web="body3"
            mo="body4"
            language={mobile ? 'en' : 'ko'}
            weight={mobile ? 'regular' : 'medium'}
            tone={mobile ? 'tertiary' : 'primary'}
          >
            {number}
          </Typography>
        </HStack>
      </HStack>
      {mobile ? (
        <Stack gap="0" py="16px" borderBottom="1px solid var(--colors-black-20)">
          {items.map((line) => (
            <OrderHistoryProduct key={line.key} line={line} statusText={status} />
          ))}
        </Stack>
      ) : (
        <Stack gap="0" borderBottom="1px solid var(--colors-black-100)">
          <Grid gridTemplateColumns={columns} gap="0" py="20px" borderBottom="1px solid black">
            {['상품/옵션정보', '수량', '가격', '진행상태'].map((label) => (
<Typography
                key={label}
                variant="body3Semibold"
                className={css({ textAlign: 'center' })}
              >
                {label}
              </Typography>
            ))}
          </Grid>
          {items.map((line) => (
            <Grid
              key={line.key}
              gridTemplateColumns={columns}
              gap="0"
              alignItems="center"
              py="32px"
            >
              <Box px="24px">
                <OrderHistoryProduct line={line} showAmount={false} />
              </Box>
              <Typography variant="body3" className={css({ textAlign: 'center' })}>
<Typography as="span" variant="body3Medium" language="en">
                  {line.quantity}
                </Typography>
                개
              </Typography>
<Typography
                variant="body3Medium"
                className={css({ textAlign: 'right', px: '24px' })}
              >
                {money(line.displayAmount)}
              </Typography>
<Typography variant="body3Medium" className={css({ textAlign: 'center' })}>
                {status}
              </Typography>
            </Grid>
          ))}
        </Stack>
      )}
      <ClaimSection title="상세정보">
        <ClaimInformation
          items={[
            {
              term: `${name}접수일자`,
              description: display.requestedAt,
            },
            { term: `${name}접수번호`, description: display.claimNumber },
            {
              term: `${name}완료일`,
              description: display.completedAt,
            },
            ...(!cancel
              ? [
                  {
                    term: '환불완료일',
                    description: display.refundedAt,
                  },
                ]
              : []),
          ]}
        />
      </ClaimSection>
      {!cancel ? (
        <ClaimSection title="상세 회수 정보">
          <ClaimInformation
            items={[
              { term: '회수인', description: claim.collection?.name ?? '-' },
              { term: '연락처', description: claim.collection?.phone ?? '-' },
              { term: '주소', description: claim.collection?.address ?? '-' },
              { term: '택배사', description: claim.collection?.carrier ?? '-' },
              { term: '송장번호', description: claim.collection?.trackingNumber ?? '-' },
              { term: '회수예정일', description: claim.collection?.scheduledDate ?? '-' },
            ]}
          />
        </ClaimSection>
      ) : null}
      <ClaimSection title={mobile ? '취소 사유' : cancel ? '취소사유' : '환불사유'}>
        {!mobile && !cancel ? (
          <ClaimInformation items={[{ term: '취소사유', description: reason }]} />
        ) : (
          <Stack gap="0">
            <Stack
              gap="8px"
              py={{ base: '20px', _mobile: '16px' }}
              borderBottom="1px solid var(--colors-black-20)"
            >
              <Typography web="body3" mo="body4" weight="medium">
                {reason}
              </Typography>
              {mobile ? <Typography variant="body5">{details}</Typography> : null}
            </Stack>
            {!mobile && details ? (
              <Typography
                variant="body4"
                className={css({ py: '20px', borderBottom: '1px solid var(--colors-black-20)' })}
              >
                {details}
              </Typography>
            ) : null}
          </Stack>
        )}
      </ClaimSection>
      <ClaimSection title="환불안내">
        <HStack
          gap="8px"
          py="16px"
          justifyContent={mobile ? 'space-between' : 'flex-start'}
          borderBottom="1px solid var(--colors-black-20)"
        >
          <Typography web="body3" mo="body4" tone="subtle" className={css({ w: '96px' })}>
            환불수단
          </Typography>
          <Typography web="body3" mo="body4" weight="medium">
            {claim.refundMethod ?? '-'}
          </Typography>
        </HStack>
        <HStack
          gap="0"
          alignItems="stretch"
          borderBottom="1px solid var(--colors-black-20)"
          _mobile={{ flexDirection: 'column' }}
        >
          <Stack
            flex="1"
            gap="16px"
            py={{ base: '32px', _mobile: '16px' }}
            pr={{ base: '32px', _mobile: '0' }}
          >
            {[
              { label: '상품금액', value: money(amount) },
              ...(!mobile ? [{ label: '배송비', value: '0원' }] : []),
              { label: '반품비', value: money(fee) },
            ].map((row) => (
              <HStack key={row.label} justifyContent="space-between" gap="8px">
                <Typography web="body3" mo="body4" tone="subtle">
                  {row.label}
                </Typography>
                <Typography web="body3" mo="body4" weight="medium">
                  {row.value}
                  {row.label === '반품비' && display.feeNote ? (
                    <Typography as="span" variant="body5" tone="subtle">
                      {' '}
                      {display.feeNote}
                    </Typography>
                  ) : null}
                </Typography>
              </HStack>
            ))}
            {mobile ? (
              <HStack justifyContent="space-between">
                <Typography variant="body4" tone="subtle">
                  총 환불금액
                </Typography>
<Typography variant="body3Semibold">
                  {refund?.toLocaleString() ?? '-'}원
                </Typography>
              </HStack>
            ) : null}
          </Stack>
          {!mobile ? (
            <Stack
              w="375px"
              pl="32px"
              borderLeft="1px solid var(--colors-black-20)"
              alignItems="flex-end"
              justifyContent="center"
              gap="24px"
            >
<Typography variant="body3Medium">
                결제예정금액
              </Typography>
              <HStack gap="2px" alignItems="flex-end">
                <Typography variant="heading7" language="en">
                  {refund?.toLocaleString() ?? '-'}
                </Typography>
                <Typography variant="body2">원</Typography>
              </HStack>
            </Stack>
          ) : null}
        </HStack>
        <Typography
          variant="body5"
          tone="tertiary"
          className={css({ pt: { base: '16px', _mobile: '12px' } })}
        >
          * 결제 취소 요청이 전달된 후 환불까지 영업일 기준 3~7일이 소요됩니다.
        </Typography>
      </ClaimSection>
      <Box
        mt={{ base: '48px', _mobile: '24px' }}
        alignSelf={{ base: 'center', _mobile: 'stretch' }}
        w={{ base: '180px', _mobile: '100%' }}
      >
        <Button variant="primary" size="tall" fullWidth onClick={onList}>
          목록
        </Button>
      </Box>
    </Stack>
  );
}
