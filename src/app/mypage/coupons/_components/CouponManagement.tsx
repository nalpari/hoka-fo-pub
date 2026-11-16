'use client';

import { useRef, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css, cx } from 'styled-system/css';
import { Grid, HStack, Stack, VStack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Card } from '@/components/common/atoms/Card';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';

const couponDescription = css({
  color: 'black.100',
  lineHeight: '1.5!',
  _mobile: { color: '#4D4D4D' },
});

const couponDetailNumber = css({
  '&&': {
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: '700',
    lineHeight: '1.5',
  },
});

const couponSectionTitle = {
  web: 'headingKr7',
  mo: 'headingKr6',
  className: css({ _mobile: { fontWeight: 'bold' } }),
} as const;

/* 1차 개발 범위 제외: 쿠폰 등록 입력·안내 마크업 (재개 시 TextFormField import 복원).
type CouponRegistrationSectionProps = {
  code: string;
  error: string;
  onCodeChange: (code: string) => void;
  onRegister?: () => void;
};

function CouponRegistrationSection({
  code,
  error,
  onCodeChange,
  onRegister,
}: CouponRegistrationSectionProps) {
  return (
    <ContentSection
      as="section"
      gap="24px"
      aria-label="쿠폰 등록"
      title="쿠폰 등록"
      headerProps={{
        gap: { base: '12px', _mobile: '16px' },
        titleAs: 'h1',
        titleProps: { web: 'headingKr6', mo: 'headingKr5' },
        description: (
          <>
            이벤트를 통해 발급 받은 쿠폰의 일련번호를 입력하십시오.
            <br className={css({ _mobile: { display: 'none' } })} />
            발급 받으신 쿠폰 일련번호를 등록기간 내에 등록 하셔야 사용 가능합니다.
          </>
        ),
        descriptionProps: {
          variant: 'bodyKr3',
          className: couponDescription,
        },
      }}
    >
      <form
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center',
          py: '32px',
          bg: 'black.10',
          _mobile: { p: '0', bg: 'transparent' },
        })}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onRegister?.();
        }}
      >
        <TextFormField
          className={css({ w: '590px', maxW: '100%' })}
          id="coupon-code"
          label="일련번호"
          required
          variant="boxed"
          invalid={Boolean(error)}
          error={error}
          inputProps={{
            'aria-label': '쿠폰 일련번호',
            placeholder: '일련 번호를 입력해 주세요',
            value: code,
            onChange: (event) => {
              onCodeChange(event.target.value);
            },
          }}
        />
        <Button
          fullWidth
          type="submit"
          size="tall"
          variant="primary"
          className={css({ w: '180px', _mobile: { w: '100%' } })}
        >
          등록
        </Button>
      </form>
    </ContentSection>
  );
}
*/

type CouponItem = {
  id: string;
  name: string;
  benefit: string;
  condition: string;
  expiresAt: string;
  quantity: number;
  redemptionChannel: string;
  detailTerms: string;
  detailNotice: string;
  category: '상품 할인' | '배송 할인';
};
type CouponCardProps = {
  coupon: CouponItem;
  onDetails: (coupon: CouponItem) => void;
};

function CouponCard({ coupon, onDetails }: CouponCardProps) {
  return (
    <Card
      className={css({
        pos: 'relative',
        minW: '0',
        minH: '195px',
        h: '195px',
        '& > *': { flexShrink: '0' },
        py: '32px',
        pl: '33px',
        pr: '25px',
        gap: '32px',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        _mobile: { minH: '170px', h: '170px', py: '25px', gap: '24px' },
      })}
      style={{ backgroundImage: 'url(/images/mypage/coupon.svg)' }}
    >
      <ContentHeader
        title={coupon.name}
        titleAs="h3"
        titleProps={{
          web: 'headingKr8',
          mo: 'headingKr6',
          className: couponSectionTitle.className,
        }}
        orientation="horizontal"
        gap="8px"
        alignItems="flex-start"
        action={
          <Button
            size="sm"
            variant="link"
            onClick={() => onDetails(coupon)}
            className={css({ flexShrink: '0' })}
          >
            <Typography variant="cta3" weight="regular" className={css({ lineHeight: '1.3!' })}>
              상세보기
            </Typography>
          </Button>
        }
      />
      <Stack gap="12px">
        <HStack gap="0" alignItems="center">
          <Typography
            variant="body3"
            language="en"
            weight="bold"
            className={css({ lineHeight: 'hoka!' })}
          >
            {coupon.benefit.endsWith('원') ? coupon.benefit.slice(0, -1) : coupon.benefit}
          </Typography>
          {coupon.benefit.endsWith('원') ? (
            <Typography variant="bodyKr3" weight="semibold" className={css({ lineHeight: '1.2!' })}>
              원
            </Typography>
          ) : null}
        </HStack>
        <Stack gap="6px" _mobile={{ gap: '4px' }}>
          <Typography variant="body4">{coupon.condition}</Typography>
          <Typography variant="body4" language="en" tone="tertiary">
            {coupon.expiresAt}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
// 1차 개발 범위 제외: 쿠폰 분류 탭은 사용하지 않고 전체 목록을 표시합니다.
// 재개 시 SegmentedControl import와 category/setCategory 상태를 복원합니다.
// type Category = '전체' | CouponItem['category'];
/* 1차 개발 범위 제외: 쿠폰 등록 완료 팝업.
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function CouponRegistrationDialog({ open, onOpenChange }: Props) {
  return (
    <ModalDialog
      closeLabel="쿠폰 등록 결과 닫기"
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="쿠폰등록"
      headerProps={{ css: { bg: 'white', borderBottom: '1px solid var(--colors-black-20)' } }}
      actions={{ kind: 'single', onConfirm: () => onOpenChange(false) }}
    >
      <Typography as="p" variant="body3">
        쿠폰이 등록되었습니다.
      </Typography>
    </ModalDialog>
  );
}
*/

type CouponDetailsDialogProps = {
  coupon: CouponItem | null;
  onOpenChange: (open: boolean) => void;
};

function CouponDetailsDialog({ coupon, onOpenChange }: CouponDetailsDialogProps) {
  const rows = coupon
    ? [
        {
          label: '수량',
          value: (
            <>
              <Typography variant="body4" language="en" className={couponDetailNumber}>
                {coupon.quantity}
              </Typography>
              개
            </>
          ),
        },
        {
          label: '혜택',
          value: coupon.benefit.endsWith('원') ? (
            <>
              <Typography variant="body4" language="en" className={couponDetailNumber}>
                {coupon.benefit.slice(0, -1)}
              </Typography>
              원
            </>
          ) : (
            coupon.benefit
          ),
        },
        { label: '쿠폰명', value: coupon.name },
        {
          label: '사용기간',
          value: (
            <Typography
              variant="body4"
              language="en"
              className={cx(couponDetailNumber, css({ color: '#040404' }))}
            >
              {coupon.expiresAt}
            </Typography>
          ),
        },
        { label: '사용가능처', value: coupon.redemptionChannel },
      ]
    : [];

  return (
    <ModalDialog
      variant="detail"
      closeLabel="쿠폰 상세 닫기"
      open={coupon !== null}
      onOpenChange={onOpenChange}

      mobilePresentation="fullscreen"
      blurBackdrop={false}
      title="쿠폰 상세보기"
      actions={{
        kind: 'single',
        onConfirm: () => onOpenChange(false),
        buttonProps: { size: 'tall' },
      }}
    >
      {coupon ? (
        <Stack gap="24px" css={{ '--line-heights-body': '1.5' }}>
          <Stack as="dl" gap="24px" pb="24px" borderBottom="1px solid token(colors.black.20)">
            {rows.map(({ label, value }) => (
              <HStack key={label} justifyContent="space-between" alignItems="baseline" gap="12px">
                <Typography
                  as="dt"
                  variant="bodyKr4"
                  tone="subtle"
                  className={css({ flexShrink: '0', lineHeight: '1.5' })}
                >
                  {label}
                </Typography>
                <Typography
                  as="dd"
                  variant="bodyKr4"
                  className={css({
                    m: '0',
                    minW: '0',
                    textAlign: 'right',
                    lineHeight: '1.5',
                    overflowWrap: 'anywhere',
                  })}
                >
                  {value}
                </Typography>
              </HStack>
            ))}
          </Stack>
          <Stack gap="16px">
            <Typography
              as="h3"
              variant="bodyKr4"
              tone="subtle"
              className={css({ lineHeight: '1.5' })}
            >
              상세조건
            </Typography>
            <Typography
              as="p"
              variant="bodyKr4"
              className={css({ whiteSpace: 'pre-line', lineHeight: '1.5' })}
            >
              {coupon.detailTerms}
            </Typography>
            <Typography
              as="p"
              variant="bodyKr4-2"
              tone="tertiary"
              className={css({
                '&&': { fontSize: '13px', lineHeight: '1.5' },
                pt: '16px',
                borderTop: '1px solid token(colors.black.20)',
              })}
            >
              {coupon.detailNotice}
            </Typography>
          </Stack>
        </Stack>
      ) : null}
    </ModalDialog>
  );
}

const employeeCoupons = [
  { desktop: '50% 쿠폰 발급', mobile: '50% 쿠폰 발급' },
  { desktop: '50% 쿠폰 발급', mobile: '30% 쿠폰 발급' },
] as const;

const couponSamples: Pick<
  CouponItem,
  'name' | 'benefit' | 'condition' | 'expiresAt' | 'category'
>[] = [
  {
    name: '50% 할인 쿠폰',
    benefit: '10,000원',
    condition: '50,000원 이상 구매 시',
    expiresAt: '2026.09.15 19:49 ~ 2026.10.15 23:59',
    category: '상품 할인',
  },
  {
    name: '신규 회원가입 쿠폰',
    benefit: '10,000원',
    condition: '50,000원 이상 구매 시',
    expiresAt: '2026.09.15 19:49 ~ 2026.10.15 23:59',
    category: '상품 할인',
  },
  {
    name: '30% 할인 쿠폰',
    benefit: '10,000원',
    condition: '50,000원 이상 구매 시',
    expiresAt: '2026.09.15 19:49 ~ 2026.10.15 23:59',
    category: '배송 할인',
  },
];
const couponNames = [
  '50% 할인 쿠폰',
  '신규 회원가입 쿠폰',
  '30% 할인 쿠폰',
  '생일기념 쿠폰',
  '50% 할인 쿠폰',
];
const coupons: CouponItem[] = Array.from({ length: 62 }, (_, index) => ({
  ...couponSamples[index % couponSamples.length],
  name: couponNames[index % couponNames.length],
  id: `coupon-${index + 1}`,
  quantity: 2,
  redemptionChannel: '온라인 스토어',
  detailTerms: [
    '사용 기간: 9/14(월) 10:00 - 9/21(월) 09:59',
    '최대 할인 금액: 100,000원',
    '',
    '- 대상 상품: HOKA 공식 홈페이지 내 쿠폰 적용 가능 상품',
    '- 본 쿠폰은 ID당 1회만 발급됩니다.',
    '- 쿠폰 사용 후 주문 상품 전체 반품 완료 시 쿠폰 재발급 여부는 운영 정책에 따라 적용됩니다.',
  ].join('\n'),
  detailNotice: '* 쿠폰 사용 가능 상품 및 제외 상품은 운영 정책 확정 후 변경 예정',
}));

const detailPreviewCoupons = coupons.map((coupon, index) =>
  index === 1 ? { ...coupon, benefit: '200,000원' } : coupon,
);
/**
 * [ 개발팀 바인딩 ] RouteContent의 쿠폰 목록과 상세 표시 데이터는 미리보기 fixture입니다.
 * 더보기와 상세·임직원 등록 안내 열기/닫기는 로컬 조작이며, employee와 preview는 미리보기 seed입니다.
 * 임직원 안내를 닫으면 실제 열기 버튼으로 포커스를 복귀하며 발급 요청이나 목록 갱신은 수행하지 않습니다.
 * 실제 연동 소유자가 회원별 쿠폰 조회와 추가 조회, pending·실패·재시도·최신 응답 반영을 연결합니다.
 * 현재 외부 요청 callback과 쿠폰 등록 계약은 없습니다.
 */
/** 분류 없이 보유 쿠폰 전체와 상세 상태를 표시합니다. (Displays all owned coupons and their details without category tabs.) */
export function RouteContent({
  preview,
  employee = false,
}: {
  preview?: 'error' | 'complete' | 'detail' | 'empty';
  employee?: boolean;
}) {
  const displayedCoupons =
    preview === 'empty' ? [] : preview === 'detail' ? detailPreviewCoupons : coupons;

  const platform = usePlatform();
  const [employeeRegistrationOpen, setEmployeeRegistrationOpen] = useState(
    employee && preview === 'complete',
  );
  const registrationTrigger = useRef<HTMLButtonElement | null>(null);
  const firstEmployeeButton = useRef<HTMLButtonElement>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(
    preview === 'detail' ? (displayedCoupons[1] ?? displayedCoupons[0] ?? null) : null,
  );
  const [visibleCount, setVisibleCount] = useState(5);
  const visibleCoupons = displayedCoupons;
  const more =
    visibleCount < visibleCoupons.length
      ? {
          counter: {
            current: Math.ceil(visibleCount / 5),
            total: Math.ceil(visibleCoupons.length / 5),
          },
          onLoadMore: () => setVisibleCount((count) => count + 5),
        }
      : undefined;

  return (
    <MyPageFrame activePath="/mypage/coupons" breadcrumbs={[{ label: '쿠폰' }]}>
      <Stack
        gap="48px"
        _mobile={{ gap: '32px', pt: '24px' }}
        css={{ '--line-heights-body': '1.5' }}
      >
        <ContentHeader
          title="쿠폰"
          titleAs="h1"
          titleProps={{ web: 'headingKr6', mo: 'headingKr5' }}
        />
        <Stack gap={{ base: '48px', _mobile: '40px' }}>
          {employee ? (
            <ContentSection
              as="section"
              gap={{ base: '24px', _mobile: '16px' }}
              aria-label="임직원 쿠폰"
              title="임직원 쿠폰"
              headerProps={{ titleAs: 'h2', titleProps: couponSectionTitle }}
            >
              <HStack gap={{ base: '4', _mobile: '2' }}>
                {employeeCoupons.map((label, index) => (
                  <Button
                    key={index}
                    ref={index === 0 ? firstEmployeeButton : undefined}
                    type="button"
                    variant="secondary"
                    size={platform === 'mobile' ? 'short' : 'tall'}
                    onClick={(event) => {
                      registrationTrigger.current = event.currentTarget;
                      setEmployeeRegistrationOpen(true);
                    }}
                    className={css({
                      w: '180px',
                      _mobile: { flex: '1', minW: '0', w: 'auto', '--button-height': '42px' },
                    })}
                  >
                    <Typography
                      web="cta1"
                      mo="cta1-1"
                      weight="bold"
                      className={css({ lineHeight: '1.3!' })}
                    >
                      {platform === 'mobile' ? label.mobile : label.desktop}
                    </Typography>
                  </Button>
                ))}
              </HStack>
            </ContentSection>
          ) : null}
          <ContentSection
            as="section"
            gap="24px"
            aria-label="쿠폰 내역"
            title="쿠폰 내역"
            headerProps={{
              gap: { base: '12px', _mobile: '16px' },
              titleAs: 'h2',
              titleProps: couponSectionTitle,
              description: '쿠폰별 사용조건이 상이하니 사용 전에 반드시 확인하시기 바랍니다.',
              descriptionProps: {
                variant: 'bodyKr3',
                className: couponDescription,
              },
            }}
            footer={
              more ? (
                <VStack>
                  <Button
                    variant="plain"
                    size="lg"
                    onClick={more.onLoadMore}
                    disabled={!more.onLoadMore}
                    loadMore={{ counter: more.counter }}
                  />
                </VStack>
              ) : null
            }
          >
            <Stack gap={{ base: '12px', _mobile: '24px' }}>
              {/* 1차 개발 범위 제외: 전체 / 상품할인 / 배송할인 탭.
        <SegmentedControl
          ariaLabel="쿠폰 종류"
          itemClassName={() => css({ h: '42px', fontWeight: '400', _mobile: { h: '32px' } })}
          onValueChange={(value) => {
            setCategory(value);
            setVisibleCount(5);
          }}
          options={[
            { value: '전체', label: '전체' },
            { value: '상품 할인', label: '상품할인' },
            { value: '배송 할인', label: '배송할인' },
          ]}
          variant="underline"
          value={category}
        />
        */}
              <Stack gap="8px">
                <HStack justifyContent="flex-end">
                  <HStack gap="2px">
                    <Typography variant="body4">총</Typography>
                    <Typography variant="body4Medium">
                      {visibleCoupons.length}
                      <Typography variant="bodyKr4">건</Typography>
                    </Typography>
                  </HStack>
                </HStack>
                {!visibleCoupons.length ? (
                  <EmptyState title="보유 중인 쿠폰이 없습니다." variant="minimal" />
                ) : null}
                <Grid
                  gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', _mobile: '1fr' }}
                  columnGap="16px"
                  rowGap={{ base: '20px', _mobile: '16px' }}
                  w="100%"
                >
                  {visibleCoupons.slice(0, visibleCount).map((coupon) => (
                    <CouponCard key={coupon.id} coupon={coupon} onDetails={setSelectedCoupon} />
                  ))}
                </Grid>
              </Stack>
            </Stack>
          </ContentSection>
        </Stack>
        {employee && (
          <ModalDialog
            variant="alert"
            open={employeeRegistrationOpen}
            onOpenChange={setEmployeeRegistrationOpen}
            title="쿠폰등록"
            closeLabel="쿠폰 등록 안내 닫기"
            message="쿠폰이 등록되었습니다."
            finalFocus={() => registrationTrigger.current ?? firstEmployeeButton.current}
            actions={{ kind: 'single', onConfirm: () => setEmployeeRegistrationOpen(false) }}
          />
        )}
        <CouponDetailsDialog
          coupon={selectedCoupon}
          onOpenChange={(open) => {
            if (!open) setSelectedCoupon(null);
          }}
        />
      </Stack>
    </MyPageFrame>
  );
}
