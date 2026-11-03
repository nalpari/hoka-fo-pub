'use client';
import { useState } from 'react';

import { css } from 'styled-system/css';
import { Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Card } from '@/components/common/atoms/Card';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Icon } from '@/components/common/atoms/Icon';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import { faCircleCheck } from '@/icons/fontAwesome';
const couponDescription = css({ color: 'black.100', _mobile: { color: 'black.60' } });
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
          variant: 'body3',
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
          density="wide"
          variant="primary"
          className={css({ w: '180px', _mobile: { w: '100%' } })}
        >
          등록
        </Button>
      </form>
    </ContentSection>
  );
}
type CouponItem = {
  id: string;
  name: string;
  benefit: string;
  condition: string;
  expiresAt: string;
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
        titleProps={{ web: 'headingKr8', mo: 'headingKr6' }}
        orientation="horizontal"
        gap="2"
        alignItems="flex-start"
        action={
          <Button
            size="sm"
            variant="link"
            onClick={() => onDetails(coupon)}
            className={css({ flexShrink: '0', '& span': { fontSize: '12px', fontWeight: '400' } })}
          >
            상세보기
          </Button>
        }
      />
      <Stack gap="3">
        <HStack gap="0" alignItems="center">
          <Typography
            variant="heading7"
            language="en"
            weight="medium"
            className={css({ fontSize: '16px', lineHeight: '1' })}
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
type Category = '전체' | CouponItem['category'];
type CouponHistorySectionProps = {
  coupons: CouponItem[];
  previewEmpty?: boolean;
  onDetails: (coupon: CouponItem) => void;
};
function CouponHistorySection({ coupons, onDetails }: CouponHistorySectionProps) {
  const [category, setCategory] = useState<Category>('전체');
  const [visibleCount, setVisibleCount] = useState(5);
  const visibleCoupons = coupons.filter(
    (coupon) => category === '전체' || coupon.category === category,
  );
  return (
    <ContentSection
      as="section"
      gap={{ base: '8', _mobile: '6' }}
      aria-label="쿠폰 내역"
      title="쿠폰 내역"
      headerProps={{
        gap: { base: '3', _mobile: '4' },
        titleAs: 'h2',
        titleProps: { web: 'headingKr7', mo: 'headingKr5' },
        description: '쿠폰별 사용조건이 상이하니 사용 전에 반드시 확인하시기 바랍니다.',
        descriptionProps: {
          variant: 'body3',
          className: couponDescription,
        },
      }}
      footer={
        visibleCount < visibleCoupons.length ? (
          <Button
            fullWidth
            className={css({ alignSelf: 'center', w: '160px', _mobile: { w: '100%' } })}
            size="short"
            variant="secondary"
            onClick={() => {
              setVisibleCount((count) => count + 5);
            }}
            loadMore={{
              counter: {
                current: Math.ceil(visibleCount / 5),
                total: Math.ceil(visibleCoupons.length / 5),
              },
              labelProps: { mo: 'ctaKr2' },
              counterProps: { mo: 'body5' },
            }}
          />
        ) : null
      }
    >
      <Stack gap={{ base: '3', _mobile: '6' }}>
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
            gap="4"
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
type CouponDetailsDialogProps = {
  coupon: CouponItem | null;
  onOpenChange: (open: boolean) => void;
};
function CouponDetailsDialog({ coupon, onOpenChange }: CouponDetailsDialogProps) {
  return (
    <ModalDialog
      closeLabel="쿠폰 상세 닫기"
      open={coupon !== null}
      onOpenChange={onOpenChange}
      size="sm"
      title="쿠폰 상세"
    >
      <Stack gap="3">
        <Typography variant="body3" weight="semibold">
          {coupon?.name}
        </Typography>
        <Typography variant="body4">{coupon?.benefit}</Typography>
        <Typography variant="body4">{coupon?.condition}</Typography>
        <Typography variant="body5" tone="tertiary">
          {coupon?.expiresAt}
        </Typography>
      </Stack>
    </ModalDialog>
  );
}
const employeeCouponTypes = ['50% 쿠폰 발급', '30% 쿠폰 발급'] as const;
function EmployeeCoupons() {
  const labels = employeeCouponTypes;
  if (!labels.length) return null;
  return (
    <ContentSection
      as="section"
      gap="4"
      aria-label="임직원 쿠폰"
      title="임직원 쿠폰"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'headingKr7', mo: 'headingKr5' } }}
    >
      <HStack gap="2">
        {labels.map((label) => (
          <HStack key={label} flex="1" minW="0" justifyContent="space-between" p="4" bg="black.10">
            <Typography variant="body3" weight="medium">
              {label}
            </Typography>
            <Icon fontAwesomeIcon={faCircleCheck} size="18px" />
          </HStack>
        ))}
      </HStack>
    </ContentSection>
  );
}
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 마이페이지 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
type CouponManagerProps = {
  coupons: CouponItem[];
  preview?: 'error' | 'complete' | 'detail' | 'empty';
  employee?: boolean;
};
function CouponManager({ coupons, preview, employee = false }: CouponManagerProps) {
  const [code, setCode] = useState('');
  const error = '';
  const [registered, setRegistered] = useState(preview === 'complete');
  const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(
    preview === 'detail' ? coupons[0] : null,
  );
  return (
    <Stack gap="14" _mobile={{ gap: '10' }}>
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

      {employee || Boolean(undefined) ? <EmployeeCoupons /> : null}

      <CouponHistorySection
        coupons={coupons}
        onDetails={setSelectedCoupon}
        previewEmpty={preview === 'empty'}
      />

      <CouponRegistrationDialog open={registered} onOpenChange={setRegistered} />
      <CouponDetailsDialog
        coupon={selectedCoupon}
        onOpenChange={(open) => {
          if (!open) setSelectedCoupon(null);
        }}
      />
    </Stack>
  );
}
const couponSamples: Omit<CouponItem, 'id'>[] = [
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
}));
/** 보유 쿠폰과 쿠폰 등록 예시 상태를 관리합니다. (Manages owned coupons and the example coupon registration state.) */
export function RouteContent({
  preview,
  employee,
}: {
  preview?: 'error' | 'complete' | 'detail' | 'empty';
  employee?: boolean;
}) {
  return (
    <MyPageFrame
      activePath="/mypage/coupons"
      breadcrumbs={[{ label: 'MY HOKA', href: '/mypage' }, { label: '쿠폰' }]}
    >
      <CouponManager
        coupons={preview === 'empty' ? [] : coupons}
        preview={preview}
        employee={employee}
      />
    </MyPageFrame>
  );
}
