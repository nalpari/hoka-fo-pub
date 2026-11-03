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

import {
  claimReasonLabels,
  getClaimLines,
  orderStatusLabels,
} from '@/components/orders/order-policy';
import type {
  OrderClaim,
  OrderDetailPreview,
  OrderLine,
  OrderRecord,
} from '@/components/orders/orders.types';
import { type OrderCardActions, OrderHistoryProduct } from './OrdersProducts';

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

function DetailProduct({
  line,
  display,
  claimed = false,
}: {
  line: OrderLine;
  display?: OrderDetailPreview;
  claimed?: boolean;
}) {
  const shown = {
    ...line,
    width: display ? 'X-와이드' : line.width,
    quantity: display?.itemQuantity ?? line.quantity,
    displayAmount: display?.itemAmount ?? line.displayAmount,
  };

  return (
    <>
      <Box gridColumn="1" minW="0" pl="24px">
        <OrderHistoryProduct line={shown} showAmount={false} cartAction={!claimed} />
      </Box>
      <Typography variant="body4" weight="medium" className={css({ textAlign: 'center' })}>
        {shown.quantity}개
      </Typography>
      <Typography variant="body4" weight="medium" className={css({ textAlign: 'center' })}>
        {(shown.displayAmount ?? 0).toLocaleString()}원
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
      <Typography variant="body4" weight="medium">
        {amount.toLocaleString()}원
      </Typography>
    </HStack>
  );
}

/** [ 개발팀 바인딩 ] detailPreview는 PC·모바일 주문상세 시안용 표시 fixture입니다. 실제 주문 연결은 주문 소유자가 상품·클레임 식별자와 받는사람·결제 표시 데이터를 제공하고, 배송 조회·취소/반품 상세 콜백 및 삭제 요청의 pending/실패/성공과 목록 갱신을 별도로 연결해야 합니다. 현재 삭제 버튼은 고정 확인 URL로 이동하며 요청을 실행하지 않습니다. */
/** 주문 상품·받는 사람·결제 정보와 취소 내역을 표시합니다. (Displays order products, recipient, payment, and claim history.) */
export function OrderDetail({ order, onList, ...actions }: OrderDetailProps) {
  const platform = usePlatform();
  const mobile = platform === 'mobile';
  const display = order.detailPreview?.[mobile ? 'mobile' : 'web'];
  const activeItems = order.items.filter(
    (line) => !order.claims.some((claim) => claim.quantities[line.key]),
  );
  const detailDate = display?.date ?? order.date.replaceAll('-', '.');
  const detailNumber = display?.orderNumber ?? order.id;

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
              variant="body3"
              weight="semibold"
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
          <Typography variant="body4" weight="semibold">
            {detailDate}
            {mobile ? ' 주문' : ''}
          </Typography>
          <Typography variant="body4" tone="tertiary">
            · 주문번호 {detailNumber}
          </Typography>
        </HStack>
        {activeItems.length ? (
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
                <Typography as="span" variant="body4" weight="semibold" tone="red80">
                  {orderStatusLabels[order.status]}
                </Typography>
                {' · '}
                {order.expectedDate} 도착
              </Typography>
              {!mobile ? (
                <Button variant="link" size="md" onClick={() => actions.onDetail(order)}>
                  주문상세보기
                </Button>
              ) : null}
            </HStack>
            {activeItems.map((line) =>
              mobile ? (
                <OrderHistoryProduct
                  key={line.key}
                  line={{
                    ...line,
                    width: display ? 'X-와이드' : line.width,
                    quantity: display?.itemQuantity ?? line.quantity,
                    displayAmount: display?.itemAmount ?? line.displayAmount,
                  }}
                  cartAction
                />
              ) : (
                <Grid
                  key={line.key}
                  gridTemplateColumns="minmax(0, 1fr) 108px 200px"
                  gap="0"
                  alignItems="center"
                >
                  <DetailProduct line={line} display={display} />
                </Grid>
              ),
            )}
            {!mobile ? (
              <HStack justifyContent="flex-end" gap="8px">
                <Button variant="secondary" size="short" onClick={() => actions.onTracking(order)}>
                  배송 조회
                </Button>
                <ButtonLink
                  href={`/mypage/reviews?order=${order.id}`}
                  variant="secondary"
                  size="short"
                >
                  리뷰 작성
                </ButtonLink>
              </HStack>
            ) : null}
          </Stack>
        ) : null}
        {order.claims.map((claim) => {
          const claimedLines = order.items.filter((line) => claim.quantities[line.key]);
          return (
            <Stack
              key={claim.id}
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
                  {claim.kind === 'cancel' ? '구매취소' : '반품요청'}
                </Typography>
                <Button
                  variant="link"
                  size="md"
                  onClick={() => actions.onClaimDetail(order, claim)}
                >
                  {claim.kind === 'cancel' ? '취소상세보기' : '반품상세보기'}
                </Button>
              </HStack>
              {claimedLines.map((line) =>
                mobile ? (
                  <OrderHistoryProduct
                    key={line.key}
                    line={{
                      ...line,
                      width: display ? 'X-와이드' : line.width,
                      quantity: display?.itemQuantity ?? line.quantity,
                      displayAmount: display?.itemAmount ?? line.displayAmount,
                    }}
                  />
                ) : (
                  <Grid
                    key={line.key}
                    gridTemplateColumns="minmax(0, 1fr) 108px 200px"
                    gap="0"
                    alignItems="center"
                  >
                    <DetailProduct line={line} display={display} claimed={false} />
                  </Grid>
                ),
              )}
            </Stack>
          );
        })}
      </Stack>
      <Stack gap="0" mt={{ base: '56px', _mobile: '24px' }}>
        <DetailSectionTitle>받는사람 정보</DetailSectionTitle>
        <DescriptionList
          items={[
            { term: '받는사람', description: '홍길동' },
            { term: '연락처', description: '010. 1234. 1234' },
            { term: '받는주소', description: '서울시 강남구 역삼동 123-45' },
            { term: '배송요청사항', description: '부재시 문 앞에 놔주세요.' },
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
          <Typography variant="body4" weight="medium">
            신용카드
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
            <DetailAmountRow
              label="상품금액"
              amount={display?.productAmount ?? order.displayAmounts?.total ?? 0}
            />
            <DetailAmountRow
              label="할인금액"
              amount={display?.discountAmount ?? order.displayAmounts?.claimed ?? 0}
            />
            <DetailAmountRow label="배송비" amount={display?.shippingAmount ?? 0} />
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
                <Typography variant="body3" weight="semibold">
                  {(
                    display?.payableAmount ??
                    order.displayAmounts?.remaining ??
                    0
                  ).toLocaleString()}
                  원
                </Typography>
              ) : null}
            </HStack>
            {!mobile ? (
              <>
                <Typography variant="body5" tone="tertiary">
                  (상품금액 - 할인금액 - 배송비)
                </Typography>
                <Typography variant="heading7">
                  {(
                    display?.payableAmount ??
                    order.displayAmounts?.remaining ??
                    0
                  ).toLocaleString()}
                  원
                </Typography>
              </>
            ) : null}
          </Stack>
        </HStack>
      </Stack>
      {order.claims.length ? (
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
                  variant="body3"
                  weight="semibold"
                  className={css({ textAlign: 'center' })}
                >
                  {label}
                </Typography>
              ))}
            </Grid>
          ) : null}
          {(mobile ? order.claims.slice(0, 1) : order.claims).map((claim) => {
            const lines = order.items.filter((line) => claim.quantities[line.key]);
            return (
              <Stack
                key={claim.id}
                gap="16px"
                py={{ base: '32px', _mobile: '16px' }}
                borderBottom="1px solid var(--colors-black-20)"
              >
                <HStack justifyContent="space-between">
                  <Typography variant="body4" tone="tertiary">
                    접수일 : {display?.claimRequestedAt ?? claim.requestedAt.replaceAll('-', '.')}
                  </Typography>
                  {mobile ? (
                    <Typography variant="body4" tone="tertiary">
                      {claim.kind === 'cancel' ? '취소완료' : '환불완료'}
                    </Typography>
                  ) : null}
                </HStack>
                {mobile ? (
                  <Stack gap="16px">
                    {lines.map((line) => (
                      <OrderHistoryProduct
                        key={line.key}
                        line={{
                          ...line,
                          width: display ? 'X-와이드' : line.width,
                          quantity: display?.itemQuantity ?? line.quantity,
                        }}
                        showAmount={false}
                        showQuantity
                      />
                    ))}
                    <DetailAmountRow
                      label="환불금액"
                      amount={display?.claimRefundAmount ?? claim.displayRefund ?? 0}
                    />
                  </Stack>
                ) : (
                  <Grid
                    gridTemplateColumns="minmax(0, 1fr) 200px 140px"
                    gap="0"
                    alignItems="center"
                  >
                    <Stack gap="16px">
                      {lines.flatMap((line) =>
                        Array.from(
                          { length: claim.kind === 'return' ? (display?.returnLineCount ?? 1) : 1 },
                          (_, index) => (
                            <OrderHistoryProduct
                              key={`${line.key}-${index}`}
                              line={{ ...line, width: display ? 'X-와이드' : line.width }}
                              showAmount={false}
                              showQuantity
                            />
                          ),
                        ),
                      )}
                    </Stack>
                    <Typography
                      variant="body4"
                      weight="medium"
                      className={css({ textAlign: 'center' })}
                    >
                      {(display?.claimRefundAmount ?? claim.displayRefund ?? 0).toLocaleString()}원
                    </Typography>
                    <Typography
                      variant="body4"
                      weight="medium"
                      className={css({ textAlign: 'center' })}
                    >
                      {claim.kind === 'cancel' ? '취소완료' : '환불완료'}
                    </Typography>
                  </Grid>
                )}
              </Stack>
            );
          })}
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

/** [ 개발팀 바인딩 ] previewDisplay는 시안별 문구·금액을 그대로 표시하는 fixture입니다. 주문 기능 소유자는 현재 order/claim props의 식별자·collection·refundMethod와 표시 데이터를 제공하고 응답 갱신을 담당하며 이 화면은 환불 계산·요청을 실행하지 않습니다. */
/** 취소·반품 상품과 사유·환불안내를 PC 표와 모바일 목록으로 표시합니다. (Displays claim products, reasons, and refund information for desktop and mobile.) */
export function OrderClaimDetail({
  order,
  claim,
  onList,
}: {
  order: OrderRecord;
  claim: OrderClaim;
  onList: () => void;
}) {
  const mobile = usePlatform() === 'mobile';
  const cancel = claim.kind === 'cancel';
  const name = cancel ? '취소' : '반품';
  const preview = claim.previewDisplay?.[mobile ? 'mobile' : 'web'];
  const date = preview?.orderDate ?? order.date.replaceAll('-', '. ');
  const number = preview?.orderNumber ?? order.id;
  const status =
    preview?.status ?? `${cancel ? '취소' : '환불'}${claim.state === 'complete' ? '완료' : '접수'}`;
  const items = getClaimLines(order, claim).map((line) =>
    preview ? { ...line, width: 'X-와이드', quantity: 2, displayAmount: preview.itemAmount } : line,
  );
  const reason = preview?.reason ?? claimReasonLabels[claim.reason];
  const details = preview?.details ?? claim.details;
  const amount = preview?.productAmount ?? claim.displayAmount;
  const fee = preview?.fee ?? claim.fee;
  const refund = preview?.refund ?? claim.displayRefund;
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
            <Typography variant="body3" weight="medium" tone="subtle">
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
            <Typography variant="body4" weight="medium" tone="primary">
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
                variant="body3"
                weight="semibold"
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
                <Typography as="span" variant="body3" language="en" weight="medium">
                  {line.quantity}
                </Typography>
                개
              </Typography>
              <Typography
                variant="body3"
                weight="medium"
                className={css({ textAlign: 'right', px: '24px' })}
              >
                {money(line.displayAmount)}
              </Typography>
              <Typography variant="body3" weight="medium" className={css({ textAlign: 'center' })}>
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
              description: preview?.requestedAt ?? claim.requestedAt.replaceAll('-', '. '),
            },
            { term: `${name}접수번호`, description: preview?.claimNumber ?? claim.id },
            {
              term: `${name}완료일`,
              description:
                preview?.completedAt ?? claim.completedAt?.replaceAll('-', '. ') ?? '처리중',
            },
            ...(!cancel
              ? [
                  {
                    term: '환불완료일',
                    description:
                      preview?.refundedAt ?? claim.completedAt?.replaceAll('-', '. ') ?? '처리중',
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
                  {row.label === '반품비' && preview?.feeNote ? (
                    <Typography as="span" variant="body5" tone="subtle">
                      {' '}
                      {preview.feeNote}
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
                <Typography variant="body3" weight="semibold">
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
              <Typography variant="body3" weight="medium">
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
        <Button variant="primary" density="wide" fullWidth onClick={onList}>
          목록
        </Button>
      </Box>
    </Stack>
  );
}
