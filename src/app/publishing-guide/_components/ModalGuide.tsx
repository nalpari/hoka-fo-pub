'use client';

import Link from 'next/link';

import { useCallback, useRef, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Toast, type ToastNotice } from '@/components/common/atoms/Toast';
import { Typography } from '@/components/common/atoms/Typography';

import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';

import {
  ModalDialog,
  type ModalDialogProps,
  type ModalDialogVariant,
} from '@/components/common/layouts/ModalDialog';
import { modalImageContentRecipe } from '@/components/common/layouts/ModalDialog.recipe';

import { renderGuideCode } from './GuideCode';
import { GuideTimeline } from './GuideTimeline';

type ModalExample = {
  id: string;
  variant?: ModalDialogVariant;
  title: string;
  usage: string;
  source: string;
  desktop: string;
  mobile: string;
  options?: Pick<
    ModalDialogProps,
    'size' | 'mobilePresentation' | 'mobileFixedFooter' | 'overlayTone' | 'scrollFade'
  >;
  action?: 'single' | 'confirm' | 'vertical' | 'disabled';
  sheet?: 'default';
  sheetFooter?: boolean;
  contentAction?: boolean;
  long?: boolean;
};

const variantExamples: { variant: ModalDialogVariant; title: string; usage: string }[] = [
  { variant: 'alert', title: '안내 · alert', usage: '완료·오류·수량 제한 안내' },
  { variant: 'confirm', title: '선택 확인 · confirm', usage: '로그아웃·취소·탈퇴 확인' },
  { variant: 'terms', title: '약관 · terms', usage: '필수·선택·이전 약관 문서' },
  { variant: 'form', title: '입력 · form', usage: '주소·알림 등 공통 입력' },
  { variant: 'selection', title: '선택 · selection', usage: '약관·첨부 방법 등 공통 선택' },
  {
    variant: 'orderLookup',
    title: '주문 상품 조회 · orderLookup',
    usage: '문의 대상 주문과 상품 선택 전용',
  },
  {
    variant: 'productSelection',
    title: '상품 선택 입력 · productSelection',
    usage: '보유 쿠폰 조회·주문 취소·환불(반품) 신청 공통',
  },
  { variant: 'tracking', title: '배송조회 · tracking', usage: '배송 정보와 이력' },
  { variant: 'detail', title: '상세 정보 · detail', usage: '쿠폰·사업자 등 상세 정보' },
  { variant: 'image', title: '이미지 · image', usage: '첨부 이미지 미리보기' },
  { variant: 'sizeGuide', title: '사이즈 가이드 · sizeGuide', usage: '신발·의류 치수 표' },
];

const groups: { id: string; title: string; description: string; items: ModalExample[] }[] = [
  {
    id: 'modal-variants',
    title: '모달 유형',
    description: '유형은 구조와 스타일, mobilePresentation은 모바일 표시 방식을 지정합니다.',
    items: variantExamples.map(({ variant, title, usage }) => ({
      id: `variant-${variant}`,
      variant,
      title,
      usage,
      source: 'ModalDialog.tsx / ModalDialog.recipe.tsx',
      desktop: variant === 'sizeGuide' ? '최대 너비 768px' : '최대 너비 640px',
      mobile: ['terms', 'form', 'orderLookup'].includes(variant)
        ? '전체화면'
        : ['tracking', 'selection', 'image', 'sizeGuide', 'productSelection'].includes(variant)
          ? '하단 시트'
          : '중앙 팝업',
      options: {
        mobilePresentation: ['terms', 'form', 'orderLookup'].includes(variant)
          ? 'fullscreen'
          : ['tracking', 'selection', 'image', 'sizeGuide', 'productSelection'].includes(variant)
            ? 'bottomSheet'
            : 'popup',
        mobileFixedFooter: variant !== 'orderLookup',
      },
      action:
        variant === 'image'
          ? undefined
          : variant === 'confirm' || variant === 'orderLookup'
            ? 'confirm'
            : 'single',
      long: variant === 'terms',
    })),
  },
  {
    id: 'modal-size',
    title: '기본 크기',
    description: 'sm · lg',
    items: [
      {
        id: 'small',
        usage:
          '동일 크기 사용: 마이페이지 쿠폰 상세·재입고 알림 취소. 본문·버튼 구성은 화면마다 다릅니다.',
        source: 'CouponManagement.tsx / MyPageProductHistory.tsx',
        title: '작은 모달 · sm',
        desktop: '최대 너비 640px',
        mobile: '화면 너비 − 32px',
        options: { size: 'sm' },
        action: 'single',
      },
      {
        id: 'large',
        usage:
          'lg 크기 옵션의 가이드 예시입니다. 장바구니 옵션 변경은 별도 productOption 유형을 사용합니다.',
        source: 'components/common/layouts/ModalDialog.tsx',
        title: '큰 모달 · lg',
        desktop:
          '최대 너비 800px · 오른쪽 열 중앙 · 버튼 180×48px · 버튼 간격 8px · 본문과 40px · 하단 24px',
        mobile: '전체화면 · 하단 버튼',
        options: { size: 'lg', mobilePresentation: 'fullscreen', mobileFixedFooter: true },
        action: 'confirm',
      },
    ],
  },
  {
    id: 'modal-actions',
    title: '버튼·스크롤·배경',
    description: '콘텐츠 하단 버튼 · 세로 버튼 · 비활성 · 긴 내용 · 밝은 배경',
    items: [
      {
        id: 'content-action',
        title: '푸터 없음 · 콘텐츠 하단 버튼',
        usage:
          '회원가입 약관 상세. 확인 버튼이 약관과 공고·시행일 아래 본문 안에 들어가 함께 스크롤됩니다. actions와 footer는 전달하지 않습니다.',
        source: 'signup/terms/_components/SignupTermsContent.tsx · TermsDialog',
        desktop: '중앙 팝업 · 본문 아래 확인 버튼 180×48px',
        mobile: '전체화면 · 본문 아래 전체 너비×48px 확인 버튼 · 고정 푸터 없음',
        options: { mobilePresentation: 'fullscreen' },
        contentAction: true,
      },
      {
        id: 'vertical',
        usage: '가이드용 옵션 예시. 현재 서비스 화면에서 세로 액션 옵션 사용처는 없습니다.',
        source: 'components/common/layouts/ModalDialog.tsx',
        title: '취소·확인 세로 배치',
        desktop: '버튼을 세로로 배치',
        mobile: '버튼을 세로로 배치',
        action: 'vertical',
      },
      {
        id: 'disabled',
        usage:
          '재입고 알림 취소·배송지 삭제·회원정보 확인 모달의 pending 상태에서 확인 버튼을 비활성화합니다. 이 예시는 고정 비활성 상태입니다.',
        source: 'MyPageProductHistory.tsx / AddressManagement.tsx / ProfileContent.tsx',
        title: '확인 버튼 비활성',
        desktop: '취소 버튼과 비활성 확인 버튼',
        mobile: '취소 버튼과 비활성 확인 버튼',
        action: 'disabled',
      },
      {
        id: 'scroll',
        usage:
          '회원가입 약관 상세에서 scrollFade와 고정 확인 버튼을 사용합니다. 실제 모바일 화면은 전체화면입니다.',
        source: 'signup/terms/_components/SignupTermsContent.tsx',
        title: '긴 내용·고정 버튼',
        desktop: '본문 스크롤·하단 페이드',
        mobile: '본문 스크롤·하단 페이드',
        options: { scrollFade: true },
        action: 'single',
        long: true,
      },
      {
        id: 'light',
        usage: '가이드용 옵션 예시. 현재 서비스 화면에서 밝은 오버레이 사용처는 없습니다.',
        source: 'components/common/layouts/ModalDialog.tsx',
        title: '밝은 오버레이',
        desktop: '흰색 오버레이 30%',
        mobile: '흰색 오버레이 30%',
        options: { overlayTone: 'light' },
        action: 'single',
      },
    ],
  },
  {
    id: 'modal-mobile',
    title: '모바일 표시 방식',
    description: '팝업 · 전체화면 · 하단 표시',
    items: [
      {
        id: 'popup',
        usage:
          '기본 팝업 방식 사용: 쿠폰 상세·재입고 알림 취소·우편번호 찾기. 크기·본문·버튼은 화면별로 다릅니다.',
        source: 'CouponManagement.tsx / MyPageProductHistory.tsx / AddressFields.tsx',
        title: '팝업 · popup',
        desktop: '중앙 팝업 · 최대 640px',
        mobile: '중앙 팝업 · 화면 너비 − 32px',
        options: { mobilePresentation: 'popup' },
        action: 'single',
      },
      {
        id: 'fullscreen',
        usage: '모바일 본인인증 약관·회원가입 약관·문의 주문상품 조회에서 사용합니다.',
        source: 'PhoneVerificationContent.tsx / SignupTermsContent.tsx / InquiryOrderLookup.tsx',
        title: '전체화면 · fullscreen',
        desktop: '중앙 팝업 · 최대 640px',
        mobile: '화면 전체 너비·높이',
        options: { mobilePresentation: 'fullscreen' },
        action: 'single',
      },
      {
        id: 'bottom',
        usage:
          '배송조회, 주문 취소·반품 신청, 문의 첨부파일 미리보기. ModalDialog를 모바일에서 바텀시트처럼 표시한 형태입니다. 데스크탑에서는 중앙 팝업, 모바일에서는 하단 시트로 보여주되 같은 모달 안에서 본문·입력 상태·열기/닫기를 유지하기 위해 사용합니다. bottomSheet 옵션이 모바일 전체 너비·상단 모서리 24px·손잡이 36×4px·헤더 최소 56px·타이틀 h8·닫기 xmark-large 18px를 공통 적용합니다. 본문·버튼·세부 여백은 화면별로 다릅니다.',
        source: 'OrderTrackingDialog.tsx / OrderClaimRequest.tsx / InquiryListContent.tsx',
        title: '바텀시트형 모달 · bottomSheet',
        desktop: '중앙 팝업 · 최대 640px',
        mobile: '하단 정렬 · 전체 너비 · 상단 모서리 24px',
        options: { mobilePresentation: 'bottomSheet' },
        action: 'confirm',
      },
    ],
  },
  {
    id: 'modal-sheet',
    title: '바텀시트형 모달 · 조합',
    description: '기본형 · 스크롤 유무 · 버튼 푸터 유무',
    items: [
      ...[
        { id: 'sheet', title: '기본 · 푸터 없음', long: false, sheetFooter: false },
        { id: 'sheet-footer', title: '기본 · 버튼 푸터', long: false, sheetFooter: true },
        { id: 'sheet-scroll', title: '스크롤 · 푸터 없음', long: true, sheetFooter: false },
        { id: 'sheet-scroll-footer', title: '스크롤 · 버튼 푸터', long: true, sheetFooter: true },
      ].map((item) => ({
        ...item,
        sheet: 'default' as const,
        usage:
          'Dropdown의 모바일 선택·정렬, 이전 약관 선택에서 사용하는 기본형입니다. 분홍 영역은 피그마의 본문 자리 표시이며 실제 화면의 콘텐츠를 넣습니다.',
        source: 'Dropdown.tsx / PreviousTermsPicker.tsx',
        desktop: '중앙 팝업 · 최대 640px',
        mobile: `상단 모서리 24px · 손잡이 36×4px · 헤더 최소 56px · h8 · 닫기 18px · ${item.long ? '화면 높이까지 확장 · 본문 스크롤 · 헤더 구분선' : '본문 예시 높이 334px'} · ${item.sheetFooter ? '푸터 좌우 16px · 아래 32px' : '푸터 없음 · 본문 아래 32px'}`,
      })),
    ],
  },
];

function exampleCode(example: ModalExample) {
  if (example.variant === 'image')
    return `import Image from 'next/image';
import { Carousel, CarouselPagination, CarouselViewport } from '@/components/common/molecules/Carousel/Carousel';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';
import { modalImageContentRecipe } from '@/components/common/layouts/ModalDialog.recipe';

const styles = modalImageContentRecipe();

<ModalDialog variant="image" open={open} onOpenChange={setOpen}
  title="첨부파일 미리보기" mobilePresentation="bottomSheet">
  <Carousel itemCount={attachments.length}>
    <div className={styles.root}>
      <CarouselViewport mode="mobile" mobileItemGutter={0} freeMode={false} showScrollbar={false}>
        {attachments.map((attachment) => (
          <div key={attachment.name} className={styles.slide}>
            <div className={styles.frame}>
              <Image unoptimized src={attachment.previewUrl} width={240} height={240}
                alt={attachment.name} className={styles.image} />
            </div>
          </div>
        ))}
      </CarouselViewport>
      <CarouselPagination className={styles.pagination} label="첨부파일 선택"
        renderItem={(index, isActive, select) => (
          <button key={index} type="button" aria-label={\`\${index + 1}번 이미지\`}
            aria-pressed={isActive} className={styles.paginationItem}
            onClick={() => select(index)} />
        )} />
    </div>
  </Carousel>
</ModalDialog>`;
  if (example.contentAction)
    return `import { useRef, useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

const [open, setOpen] = useState(false);
const triggerRef = useRef<HTMLButtonElement>(null);

<Button ref={triggerRef} onClick={() => setOpen(true)}>열기</Button>
<ModalDialog
  variant="${example.variant ?? (example.contentAction ? 'terms' : 'detail')}"
  open={open}
  onOpenChange={setOpen}
  title="약관 상세"
  closeLabel="약관 닫기"
  mobilePresentation="fullscreen"
  finalFocus={triggerRef}
  actions={{ kind: 'single', onConfirm: () => setOpen(false) }}
>
  <Stack gap="24px">
      {Array.from({ length: 12 }, (_, index) => (
        <Typography key={index} as="p" variant="b6">
          {index + 1}. 약관 내용입니다. 확인 버튼은 본문 마지막에 함께 스크롤됩니다.
        </Typography>
      ))}
      <Typography as="p" variant="b8" tone="subtle">
        공고일자 : 2025년 08월 25일 / 시행일자 : 2025년 09월 01일
      </Typography>
  </Stack>
</ModalDialog>`;

  if (example.sheet)
    return `import { useState } from 'react';
import { Box } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>열기</Button>
{open && (
  <ModalDialog
  variant="${example.variant ?? (example.contentAction ? 'terms' : 'detail')}"
    open={open}
    mobilePresentation="bottomSheet"
    closeLabel="닫기"
${example.long ? '    scrollable\n' : ''}    title="바텀시트 타이틀"
    onOpenChange={setOpen}
${example.sheetFooter ? '    footer={<Button variant="primary" onClick={() => setOpen(false)}>신청하기</Button>}\n' : ''}  >
    {/* 본문 자리 표시: 실제 화면의 콘텐츠로 교체 */}
    <Box h=${example.long ? '"900px"' : `{{ base: '294px', _mobile: '${example.sheetFooter ? '286px' : '278px'}' }}`} bg="rgba(255, 0, 0, 0.2)" />
  </ModalDialog>
)}`;
  if (example.variant === 'alert' || example.variant === 'confirm')
    return `<ModalDialog
  variant="${example.variant}"
  open={open}
  onOpenChange={setOpen}
  title="${example.title}"
  closeLabel="닫기"
  message="안내 제목입니다."
  description="표시 데이터와 콜백은 호출 화면에서 전달합니다."
  actions={{ kind: '${example.variant === 'confirm' ? 'confirm' : 'single'}', onConfirm: () => setOpen(false) }}
/>`;
  const options = Object.entries(example.options ?? {})
    .map(([key, value]) => (typeof value === 'boolean' ? `  ${key}` : `  ${key}="${value}"`))
    .join('\n');
  const action =
    example.id === 'large'
      ? `  actions={{
    kind: 'confirm',
    onConfirm: () => setOpen(false),
    buttonProps: {
      size: 'tall',
      className: css({ maxW: { base: '180px', _mobile: 'none' } }),
    },
  }}`
      : example.action === 'single'
        ? `  actions={{ kind: 'single', label: '확인', onConfirm: () => setOpen(false) }}`
        : example.action
          ? `  actions={{ kind: 'confirm', onConfirm: () => setOpen(false)${example.action === 'vertical' ? ", direction: 'vertical'" : ''}${example.action === 'disabled' ? ', confirmDisabled: true' : ''} }}`
          : '';
  return `import { useRef, useState } from 'react';
${example.id === 'bottom' || example.id === 'large' ? "import { css } from 'styled-system/css';\n" : ''}import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

const [open, setOpen] = useState(false);
const triggerRef = useRef<HTMLButtonElement>(null);

<Button ref={triggerRef} onClick={() => setOpen(true)}>열기</Button>
<ModalDialog
  variant="${example.variant ?? (example.contentAction ? 'terms' : 'detail')}"
  open={open}
  onOpenChange={setOpen}
  title="${example.title}"
  closeLabel="닫기"
  finalFocus={triggerRef}
${[options, action, example.id === 'large' && "  footerProps={{ desktopContentOffset: 332, css: { pt: '6', _mobile: { pt: '4' } } }}"].filter(Boolean).join('\n')}

>
  <Typography as="p" variant="b6">${example.long ? '긴 안내 내용을 이 영역에 넣습니다. 내용이 높이를 넘으면 스크롤됩니다.' : '안내 내용입니다.'}</Typography>
</ModalDialog>`;
}

function ModalExampleCard({
  example,
  onCopy,
}: {
  example: ModalExample;
  onCopy: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const code = exampleCode(example);
  const actions: ModalDialogProps['actions'] =
    example.contentAction || example.action === 'single'
      ? { kind: 'single', label: '확인', onConfirm: () => setOpen(false) }
      : example.action
        ? {
            kind: 'confirm',
            onConfirm: () => setOpen(false),
            direction: example.action === 'vertical' ? 'vertical' : 'horizontal',
            confirmDisabled: example.action === 'disabled',
            buttonProps:
              example.id === 'large'
                ? {
                    size: 'tall',
                    className: css({ maxW: { base: '180px', _mobile: 'none' } }),
                  }
                : undefined,
          }
        : undefined;
  const imageStyles = modalImageContentRecipe();
  const content =
    example.variant === 'image' ? (
      <Carousel itemCount={5}>
        <div className={imageStyles.root}>
          <CarouselViewport
            mode="mobile"
            mobileItemGutter={0}
            freeMode={false}
            showScrollbar={false}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className={imageStyles.slide}>
                <div className={imageStyles.frame}>
                  <Icon name="image-solid" size="40px" color="black.20" />
                </div>
              </div>
            ))}
          </CarouselViewport>
          <CarouselPagination
            className={imageStyles.pagination}
            label="첨부파일 선택"
            renderItem={(index, isActive, select) => (
              <button
                key={index}
                type="button"
                aria-label={`${index + 1}번 이미지`}
                aria-pressed={isActive}
                className={imageStyles.paginationItem}
                onClick={() => select(index)}
              />
            )}
          />
        </div>
      </Carousel>
    ) : example.contentAction ? (
      <Stack gap="24px">
        {Array.from({ length: 12 }, (_, index) => (
          <Typography key={index} as="p" variant="b6">
            {index + 1}. 약관 내용입니다. 확인 버튼은 본문 마지막에 함께 스크롤됩니다.
          </Typography>
        ))}
        <Typography as="p" variant="b8" tone="subtle">
          공고일자 : 2025년 08월 25일 / 시행일자 : 2025년 09월 01일
        </Typography>
      </Stack>
    ) : example.long ? (
      <Stack gap={example.variant === 'terms' ? '24px' : '4'}>
        {Array.from({ length: 32 }, (_, index) => (
          <Typography key={index} as="p" variant="b6">
            {index + 1}. 긴 내용의 스크롤을 확인하는 예시입니다. 본문을 내려도 하단 확인 버튼은
            유지됩니다.
          </Typography>
        ))}
      </Stack>
    ) : (
      <Typography as="p" variant="b6">
        안내 내용입니다. 이 예시는 모달의 표시와 열기·닫기만 확인합니다.
      </Typography>
    );

  return (
    <Stack minW="0" gap="3" p="4" border="1px solid token(colors.black.20)">
      <Typography as="h4" variant="b4S">
        {example.title}
      </Typography>
      <Stack gap="1">
        <Typography as="p" variant="b8">
          데스크탑: {example.desktop}
        </Typography>
        <Typography as="p" variant="b8">
          모바일: {example.mobile}
        </Typography>
      </Stack>
      <Stack gap="1">
        <Typography as="p" variant="b8">
          사용 화면: {example.usage}
        </Typography>
        <Typography as="p" variant="b8" tone="subtle" className={css({ overflowWrap: 'anywhere' })}>
          사용 파일: {example.source}
        </Typography>
      </Stack>
      <HStack minH="24" justifyContent="center" bg="black.10" p="4">
        <Button
          ref={triggerRef}
          variant="secondary"
          size="short"

          onClick={() => setOpen(true)}
        >
          {`${example.title} 열기`}
        </Button>
      </HStack>
      <HStack
        alignItems="flex-start"
        gap="2"
        p="3"
        bg="black.10"
        border="1px solid token(colors.black.20)"
        minW="0"
      >
        <Box as="code" flex="1" minW="0" overflowWrap="anywhere" fontSize="12px" lineHeight="1.5">
          {renderGuideCode(code)}
        </Box>
        <Button
          variant="icon"
          size={32}
          aria-label={`${example.title} 코드 복사`}
          onClick={() => onCopy(code)}
          className={css({ flexShrink: '0' })}
        >
          <Icon name="copy-regular" size={18} />
        </Button>
      </HStack>
      {example.sheet ? (
        open && (
          <ModalDialog
            variant="detail"
            open={open}
            mobilePresentation="bottomSheet"
            closeLabel="닫기"
            scrollable={example.long}
            title="바텀시트 타이틀"
            finalFocus={triggerRef}
            onOpenChange={setOpen}
            footer={
              example.sheetFooter ? (
                <Button variant="primary" onClick={() => setOpen(false)}>
                  신청하기
                </Button>
              ) : undefined
            }
          >
            <Box
              className={
                example.long
                  ? css({ h: '900px' })
                  : example.sheetFooter
                    ? css({ h: '294px', _mobile: { h: '286px' } })
                    : css({ h: '294px', _mobile: { h: '278px' } })
              }
              bg="rgba(255, 0, 0, 0.2)"
            />
          </ModalDialog>
        )
      ) : (
        <ModalDialog
          {...example.options}
          {...(example.variant === 'alert' || example.variant === 'confirm'
            ? {
                variant: example.variant,
                noticeLayout: undefined,
                intro: undefined,
                message: '안내 제목입니다.',
                description: '표시 데이터와 콜백은 호출 화면에서 전달합니다.',
              }
            : {
                variant: example.variant ?? (example.contentAction ? 'terms' : 'detail'),
                children: content,
              })}
          footerProps={
            example.id === 'large'
              ? { desktopContentOffset: 332, css: { pt: '6', _mobile: { pt: '4' } } }
              : undefined
          }
          open={open}
          onOpenChange={setOpen}
          title={example.title}
          closeLabel="닫기"
          finalFocus={triggerRef}
          {...(actions ? { actions } : { footer: undefined })}
        />
      )}
    </Stack>
  );
}

/** 공통 모달의 데스크탑·모바일 표시와 사용 코드를 안내합니다. (Shows desktop and mobile modal presentations with copyable usage examples.) */
export function ModalGuide() {
  const platform = usePlatform();
  const [notice, setNotice] = useState<ToastNotice | null>(null);
  const nextNoticeId = useRef(0);
  const dismissNotice = useCallback(
    (id: number) => setNotice((current) => (current?.id === id ? null : current)),
    [],
  );
  async function copyCode(code: string) {
    const id = ++nextNoticeId.current;
    try {
      await navigator.clipboard.writeText(code);
      setNotice({ id, text: '사용 코드를 복사했습니다.' });
    } catch {
      setNotice({ id, text: '복사하지 못했습니다. 코드를 직접 선택해 복사해 주세요.' });
    }
  }
  return (
    <Grid
      gridTemplateColumns={{ base: 'minmax(0, 1fr) 240px', _mobile: 'minmax(0, 1fr)' }}
      alignItems="start"
      gap="4"
      pt="6"
    >
      <Stack minW="0" gap="6">
        <Stack gap="2">
          <Typography as="h2" web="h10B" mo="h8">
            모달
          </Typography>
          <Typography as="p" variant="b6">
            현재 기준: {platform === 'mobile' ? '모바일' : '데스크탑'}
          </Typography>
          <Typography as="p" variant="b8" tone="subtle">
            1024px 이하는 모바일, 1025px 이상은 데스크탑입니다. 열기 버튼으로 현재 화면 기준의 실제
            모달을 확인합니다.
          </Typography>
          <Typography as="p" variant="b8" tone="subtle">
            variant는 필수이며 기본 표시 방식은 popup · dark입니다. PC 기본 모달은 최대 너비 640px와
            모서리 10px를 사용합니다. bottomSheet는 모바일에서 하단에 표시됩니다.
          </Typography>
          <Typography as="p" variant="b8" tone="subtle">
            사용처: 전체화면은 본인인증·약관, 바텀시트형 모달은 배송조회·주문 취소·반품 신청,
            바텀시트형 모달은 모바일 드롭다운·이전 약관 선택에서 사용합니다. 예시의 확인 버튼은
            닫기만 수행합니다.
          </Typography>
        </Stack>
        <Stack as="section" gap="3" p="4" border="1px solid token(colors.black.20)">
          <Typography as="h3" variant="b4S">
            상품 옵션 · productOption
          </Typography>
          <Typography as="p" variant="b6">
            옵션 변경 전용 유형입니다. PC 640px · 모바일 하단 시트이며 신발은 발볼·컬러·사이즈,
            의류는 컬러·사이즈를 표시합니다. 본문은 modalProductOptionRecipe의 className을
            사용합니다.
          </Typography>
          <Link href="/cart/preview-options">신발 옵션 변경 보기</Link>
          <Link href="/cart/preview-options-apparel">의류 옵션 변경 보기</Link>
          <code>{'<ModalDialog variant="productOption" mobilePresentation="bottomSheet">'}</code>
        </Stack>
        {groups.map((group) => (
          <Stack
            key={group.id}
            as="section"
            id={group.id}
            aria-labelledby={`${group.id}-title`}
            gap="3"
            scrollMarginTop="calc(var(--layout-site-header-height) + 16px)"
          >
            <Typography as="h3" id={`${group.id}-title`} web="h10B" mo="h8">
              {group.title}
            </Typography>
            <Typography as="p" variant="b8" tone="subtle">
              {group.description}
            </Typography>
            <Grid columns={{ base: 2, _mobile: 1 }} gap="3">
              {group.items.map((example) => (
                <ModalExampleCard key={example.id} example={example} onCopy={copyCode} />
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
      <GuideTimeline title="모달" entries={groups} />
      <Toast notice={notice} onDismiss={dismissNotice} />
    </Grid>
  );
}
