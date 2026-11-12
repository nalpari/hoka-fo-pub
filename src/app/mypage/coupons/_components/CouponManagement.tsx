'use client';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Grid, HStack, Stack, VStack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Card } from '@/components/common/atoms/Card';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Icon } from '@/components/common/atoms/Icon';
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
      gap="6"
      aria-label="쿠폰 등록"
      title="쿠폰 등록"
      headerProps={{
        gap: { base: '3', _mobile: '4' },
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
          gap: '6',
          alignItems: 'center',
          py: '8',
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
        py: '8',
        pl: '33px',
        pr: '25px',
        gap: '8',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        _mobile: { minH: '170px', py: '25px', gap: '6' },
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
        gap="2"
        alignItems="flex-start"
        action={
          <Button
            size="sm"
            variant="link"
            onClick={() => onDetails(coupon)}
            className={css({ flexShrink: '0' })}
          >
            <Typography variant="bodyKr5" weight="regular">
              상세보기
            </Typography>
          </Button>
        }
      />
      <Stack gap="3">
        <HStack gap="0" alignItems="center">
          <Typography
            variant="body3"
            language="en"
            weight="medium"
            className={css({ lineHeight: 'hoka!' })}
          >
            {coupon.benefit.endsWith('원') ? coupon.benefit.slice(0, -1) : coupon.benefit}
          </Typography>
          {coupon.benefit.endsWith('원') ? (
            <Typography variant="bodyKr3" weight="semibold" className={css({ lineHeight: '1.2' })}>
              원
            </Typography>
          ) : null}
        </HStack>
        <Stack gap="6px" _mobile={{ gap: '1' }}>
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
type CouponHistorySectionProps = {
  coupons: CouponItem[];
  onDetails: (coupon: CouponItem) => void;
};

function CouponHistorySection({ coupons, onDetails }: CouponHistorySectionProps) {
  const [visibleCount, setVisibleCount] = useState(5);
  const visibleCoupons = coupons;
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
    <ContentSection
      as="section"
      gap="6"
      aria-label="쿠폰 내역"
      title="쿠폰 내역"
      headerProps={{
        gap: { base: '3', _mobile: '4' },
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
      <Stack gap={{ base: '3', _mobile: '6' }}>
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
        <Stack gap="2">
          <HStack justifyContent="flex-end">
            <HStack gap="0.5">
              <Typography variant="body4">총</Typography>
              <Typography variant="body4" weight="medium">
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
            columnGap="4"
            rowGap={{ base: '5', _mobile: '4' }}
            w="100%"
          >
            {visibleCoupons.slice(0, visibleCount).map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} onDetails={onDetails} />
            ))}
          </Grid>
        </Stack>
      </Stack>
    </ContentSection>
  );
}
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
  const platform = usePlatform();

  const rows = coupon
    ? [
        {
          label: '수량',
          value: (
            <>
              <Typography variant="body4" language="en">
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
              <Typography variant="body4" language="en">
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
            <Typography variant="body4" language="en">
              {coupon.expiresAt}
            </Typography>
          ),
        },
        { label: '사용가능처', value: coupon.redemptionChannel },
      ]
    : [];

  return (
    <ModalDialog
      closeLabel="쿠폰 상세 닫기"
      open={coupon !== null}
      onOpenChange={onOpenChange}
      size="md"
      mobilePresentation="fullscreen"
      blurBackdrop={false}
      title={
        <Typography
          web="bodyKr3"
          mo="bodyKr2"
          weight={platform === 'mobile' ? 'bold' : undefined}
          className={css({ _mobile: { lineHeight: '1.5' } })}
        >
          쿠폰 상세보기
        </Typography>
      }
      popupClassName={css({
        '&[role="dialog"]': { borderRadius: '0', boxShadow: 'none', _mobile: { maxW: 'none' } },
      })}
      headerProps={{
        css: css.raw({
          flexShrink: '0',
          borderBottom: '1px solid token(colors.black.20)',
          '& h2': { h: 'auto' },
          _mobile: {
            minH: '0',
            pt: '6',
            borderBottom: '0',
            '& button, & button svg': { w: '18px', h: '18px' },
          },
        }),
      }}
      contentClassName={css({ p: '24px 16px 32px', _mobile: { p: '24px 16px 32px' } })}
      actions={{
        kind: 'single',
        onConfirm: () => onOpenChange(false),
        buttonProps: { size: 'tall' },
      }}
      footerProps={{
        css: css.raw({
          pt: '0',
          pb: '8',
          '& > button': { w: '180px', '--button-height': '48px', _mobile: { w: '100%' } },
          _mobile: { p: '0', pt: '8' },
        }),
      }}
    >
      {coupon ? (
        <Stack gap="6" css={{ '& :is(dt, dd, h3, p, dd > span)': { lineHeight: '1.5' } }}>
          <Stack as="dl" gap="6" pb="6" borderBottom="1px solid token(colors.black.20)">
            {rows.map(({ label, value }) => (
              <HStack key={label} justifyContent="space-between" alignItems="baseline" gap="3">
                <Typography
                  as="dt"
                  variant="bodyKr4"
                  className={css({ color: '#4D4D4D', flexShrink: '0' })}
                >
                  {label}
                </Typography>
                <Typography
                  as="dd"
                  variant="bodyKr4"
                  className={css({ m: '0', textAlign: 'right' })}
                >
                  {value}
                </Typography>
              </HStack>
            ))}
          </Stack>
          <Stack gap="4">
            <Typography as="h3" variant="bodyKr4" className={css({ color: '#4D4D4D' })}>
              상세조건
            </Typography>
            <Typography as="p" variant="bodyKr4" className={css({ whiteSpace: 'pre-line' })}>
              {coupon.detailTerms}
            </Typography>
            <Typography
              as="p"
              variant="bodyKr5"
              tone="tertiary"
              className={css({ pt: '4', borderTop: '1px solid token(colors.black.20)' })}
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
  { label: { desktop: '50% 쿠폰 발급', mobile: '50% 쿠폰 발급' }, icon: 'circle-check-solid' },
  { label: { desktop: '50% 쿠폰 발급', mobile: '30% 쿠폰 발급' }, icon: 'circle-check-regular' },
] as const;

function EmployeeCoupons() {
  const platform = usePlatform();

  return (
    <ContentSection
      as="section"
      gap={{ base: '6', _mobile: '4' }}
      aria-label="임직원 쿠폰"
      title="임직원 쿠폰"
      headerProps={{ titleAs: 'h2', titleProps: couponSectionTitle }}
    >
      <Grid gridTemplateColumns="repeat(2, minmax(0, 1fr))" gap={{ base: '4', _mobile: '2' }}>
        {employeeCoupons.map(({ label, icon }) => (
          <HStack
            key={icon}
            justifyContent="space-between"
            gap="2"
            p={{ base: '8', _mobile: '4' }}
            bg="black.10"
          >
            <Typography
              web="headingKr8"
              mo="bodyKr3"
              className={css({ _mobile: { lineHeight: '1.5!' } })}
            >
              {platform === 'mobile' ? label.mobile : label.desktop}
            </Typography>
            <Icon name={icon} size={18} />
          </HStack>
        ))}
      </Grid>
    </ContentSection>
  );
}
/**
 * [ 개발팀 바인딩 ] RouteContent가 목록과 상세 표시용 fixture를 CouponManager의 coupons로 전달합니다.
 * 카드의 id와 상세 수량·혜택·사용기간·사용가능처·상세조건·안내문은 같은 쿠폰 표시 모델에 속합니다.
 * 더보기와 상세 열기/닫기는 로컬 조작이며, 임직원 발급 표시는 employee 미리보기 데이터입니다.
 * 실제 연동 소유자가 회원별 쿠폰 조회와 추가 조회, pending·실패·재시도·최신 응답 반영을 연결합니다.
 * 현재 외부 요청 callback과 쿠폰 등록 계약은 없습니다.
 */
type CouponManagerProps = {
  coupons: CouponItem[];
  preview?: 'error' | 'complete' | 'detail' | 'empty';
  employee?: boolean;
};

function CouponManager({ coupons, preview, employee = false }: CouponManagerProps) {
  /* 1차 개발 범위 제외: 쿠폰 등록 상태.
  const [code, setCode] = useState('');
  const error = '';
  const [registered, setRegistered] = useState(preview === 'complete');
  */
  const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(
    preview === 'detail' ? (coupons[1] ?? coupons[0] ?? null) : null,
  );
  return (
    <Stack gap={{ base: '12', _mobile: '8' }}>
      <ContentHeader
        title="쿠폰"
        titleAs="h1"
        titleProps={{ web: 'headingKr6', mo: 'headingKr5' }}
      />
      {/* 1차 개발 범위 제외: 쿠폰 등록 영역.
      <fieldset disabled={false}>
        <CouponRegistrationSection
          code={code}
          error={preview === 'error' ? '쿠폰 일련번호를 확인해 주세요.' : error}
          onCodeChange={(value) => {
            setCode(value);

            setRegistered(false);
          }}
        />
      </fieldset>
      */}

      <Stack gap={{ base: '12', _mobile: '10' }}>
        {employee ? <EmployeeCoupons /> : null}
        <CouponHistorySection coupons={coupons} onDetails={setSelectedCoupon} />
      </Stack>

      {/* 1차 개발 범위 제외: 쿠폰 등록 완료 상태.
      <CouponRegistrationDialog open={registered} onOpenChange={setRegistered} />
      */}
      <CouponDetailsDialog
        coupon={selectedCoupon}
        onOpenChange={(open) => {
          if (!open) setSelectedCoupon(null);
        }}
      />
    </Stack>
  );
}

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
/** 분류 없이 보유 쿠폰 전체와 상세 상태를 표시합니다. (Displays all owned coupons and their details without category tabs.) */
export function RouteContent({
  preview,
  employee,
}: {
  preview?: 'error' | 'complete' | 'detail' | 'empty';
  employee?: boolean;
}) {
  const displayedCoupons =
    preview === 'empty' ? [] : preview === 'detail' ? detailPreviewCoupons : coupons;

  return (
    <MyPageFrame activePath="/mypage/coupons" breadcrumbs={[{ label: '쿠폰' }]}>
      <CouponManager coupons={displayedCoupons} preview={preview} employee={employee} />
    </MyPageFrame>
  );
}
