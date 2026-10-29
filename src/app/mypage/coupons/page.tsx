'use client';

/**
 * [개발팀 바인딩]
 * MyPageDataContext.coupons의 items/totalCount/hasMore와 category별 서버 조회·register를 연결합니다.
 * 등록 성공 후 목록/요약 수를 갱신하고 resolve합니다. 실패 시 코드가 남습니다. employeeCoupons는 실제 임직원 자격/발급 상태에 맞는 표시 목록입니다.
 */

import { useContext } from 'react';
import { useState } from 'react';
import { MyPageDataContext } from '@/context/MyPageDataContext';
import { useRoutePreview } from '@/context/RoutePreview';
import { useBindingQuery } from '@/hooks/useBindingQuery';
import { useRequestAction } from '@/hooks/useRequestAction';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import { faCircleCheck } from '@/icons/fontAwesome';

type CouponRegistrationSectionProps = {
  code: string;
  error: string;
  onCodeChange: (code: string) => void;
  onRegister: () => void;
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
      gap="4"
      aria-label="쿠폰 등록"
      title="쿠폰 등록"
      headerProps={{
        gap: '4',
        titleAs: 'h1',
        titleProps: { web: 'heading8', mo: 'heading5' },
        description: (
          <>
            이벤트를 통해 발급 받은 쿠폰의 일련번호를 입력하십시오. 발급 받으신 쿠폰 일련번호를
            등록기간 내에 등록 하셔야 사용 가능합니다.
          </>
        ),
        descriptionProps: { variant: 'body3', tone: 'subtle' },
      }}
    >
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onRegister();
        }}
      >
        <TextFormField
          id="coupon-code"
          label="일련번호"
          required
          variant="boxed"
          invalid={Boolean(error)}
          error={error || undefined}
          inputProps={{
            'aria-label': '쿠폰 일련번호',
            placeholder: '일련 번호를 입력해 주세요',
            value: code,
            onChange: (event) => {
              onCodeChange(event.target.value);
            },
          }}
        />
        {code ? (
          <Box mt="3">
            <Button fullWidth type="submit" size="short" variant="primary">
              쿠폰 등록
            </Button>
          </Box>
        ) : null}
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
    <ContentSection
      as="article"
      border="1px solid var(--colors-black-20)"
      pos="relative"
      overflow="hidden"
      css={{
        borderRight: '12px solid var(--colors-black-100)',
        _before: {
          content: '""',
          pos: 'absolute',
          right: '-6px',
          top: '-8px',
          w: '16px',
          h: '16px',
          borderRadius: 'full',
          bg: 'white',
        },
        _after: {
          content: '""',
          pos: 'absolute',
          right: '-6px',
          bottom: '-8px',
          w: '16px',
          h: '16px',
          borderRadius: 'full',
          bg: 'white',
        },
      }}
      gap="6"
      px="4"
      py="6"
      title={coupon.name}
      headerProps={{
        orientation: 'horizontal',
        gap: '8px',
        css: css.raw({ alignItems: 'flex-start' }),
        titleAs: 'h3',
        titleProps: { variant: 'heading6' },
        action: (
          <Button size="sm" variant="link" onClick={() => onDetails(coupon)}>
            상세보기
          </Button>
        ),
      }}
    >
      <Stack gap="3">
        <Typography variant="heading7">{coupon.benefit}</Typography>
        <Stack gap="1">
          <Typography variant="body4">{coupon.condition}</Typography>
          <Typography variant="body4" language="en" tone="tertiary">
            {coupon.expiresAt}
          </Typography>
        </Stack>
      </Stack>
    </ContentSection>
  );
}

type Category = '전체' | CouponItem['category'];

type CouponHistorySectionProps = {
  coupons: CouponItem[];
  onDetails: (coupon: CouponItem) => void;
};

function CouponHistorySection({ coupons, onDetails }: CouponHistorySectionProps) {
  const binding = useContext(MyPageDataContext).coupons;
  const request = useRequestAction();
  const [category, setCategory] = useState<Category>('전체');
  const [visibleCount, setVisibleCount] = useState(5);
  useBindingQuery(binding?.onQueryChange, { category });
  const visibleCoupons = binding
    ? [...binding.items]
    : coupons.filter((coupon) => category === '전체' || coupon.category === category);

  return (
    <ContentSection
      as="section"
      gap="6"
      aria-label="쿠폰 내역"
      title="쿠폰 내역"
      headerProps={{
        titleProps: { web: 'heading8', mo: 'heading5' },
        description: '쿠폰별 사용조건이 상이하니 사용 전에 반드시 확인하시기 바랍니다.',
        descriptionProps: { variant: 'body3', tone: 'subtle' },
      }}
      footer={
        (binding ? binding.hasMore : visibleCount < visibleCoupons.length) ? (
          <Button
            fullWidth
            size="short"
            variant="secondary"
            onClick={() => {
              if (binding) void request.run(binding.onLoadMore);
              else setVisibleCount((count) => count + 5);
            }}
            loadMore={{
              counter: binding
                ? (binding.pageInfo ?? { current: binding.items.length, total: binding.totalCount })
                : {
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
      <BindingFeedback
        {...binding}
        pending={binding?.pending || request.pending}
        error={binding?.error || request.error}
      />
      <SegmentedControl
        ariaLabel="쿠폰 종류"
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
              {binding?.totalCount ?? visibleCoupons.length}
              <Typography variant="bodyKr4">건</Typography>
            </Typography>
          </HStack>
        </HStack>
        <Grid gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', _mobile: '1fr' }} gap="4">
          {(binding ? visibleCoupons : visibleCoupons.slice(0, visibleCount)).map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} onDetails={onDetails} />
          ))}
        </Grid>
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
  const binding = useContext(MyPageDataContext).coupons;
  const labels = binding ? (binding.employeeCoupons ?? []) : employeeCouponTypes;
  if (!labels.length) return null;
  return (
    <ContentSection
      as="section"
      gap="4"
      aria-label="임직원 쿠폰"
      title="임직원 쿠폰"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading5' } }}
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

type CouponManagerProps = { coupons: CouponItem[] };

function CouponManager({ coupons }: CouponManagerProps) {
  const binding = useContext(MyPageDataContext).coupons;
  const request = useRequestAction();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(null);

  function registerCoupon() {
    if (code.trim().length < 6) {
      setError('쿠폰 일련번호를 확인해 주세요.');
      return;
    }
    setError('');
    void request.run(async () => {
      if (binding) await binding.register(code.trim());
      setRegistered(true);
      setCode('');
    });
  }

  return (
    <Stack gap="10" px="4" pt="6" pb="16">
      <BindingFeedback pending={request.pending} error={request.error} />
      <fieldset disabled={request.pending} className={css({ border: 0, p: 0, m: 0, minW: 0 })}>
        <CouponRegistrationSection
          code={code}
          error={error}
          onCodeChange={(value) => {
            setCode(value);
            setError('');
            setRegistered(false);
          }}
          onRegister={registerCoupon}
        />
      </fieldset>

      <EmployeeCoupons />

      <CouponHistorySection coupons={coupons} onDetails={setSelectedCoupon} />

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
    name: '신규 회원가입 쿠폰',
    benefit: '10,000원',
    condition: '50,000원 이상 구매 시',
    expiresAt: '2026.05.19 - 2026.10.15',
    category: '상품 할인',
  },
  {
    name: '15% 감사 쿠폰',
    benefit: '5,000원',
    condition: '온라인, 성인 의류/신발/용품',
    expiresAt: '2026.05.19 - 2026.10.15',
    category: '상품 할인',
  },
  {
    name: '생일 쿠폰',
    benefit: '10,000원',
    condition: '50,000원 이상 구매 시',
    expiresAt: '2026.05.19 - 2026.10.15',
    category: '배송 할인',
  },
];

const coupons: CouponItem[] = Array.from({ length: 62 }, (_, index) => ({
  ...couponSamples[index % couponSamples.length],
  id: `coupon-${index + 1}`,
}));

/** 보유 쿠폰과 쿠폰 등록 예시 상태를 관리합니다. (Manages owned coupons and the example coupon registration state.) */
function RouteContent() {
  return (
    <MyPageFrame
      activePath="/mypage/coupons"
      breadcrumbs={[{ label: 'MY HOKA', href: '/mypage' }, { label: '쿠폰' }]}
    >
      <CouponManager coupons={coupons} />
    </MyPageFrame>
  );
}

const routePreviewComponents = { CouponManager } satisfies Pick<
  typeof import('@/types/component-contracts/app-mypage-coupons-page'),
  'CouponManager'
>;

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
