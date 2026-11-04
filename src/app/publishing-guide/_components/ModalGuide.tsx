'use client';

import { useCallback, useRef, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { BottomSheet } from '@/components/common/layouts/BottomSheet';
import { ModalDialog, type ModalDialogProps } from '@/components/common/layouts/ModalDialog';

import { renderGuideCode } from './GuideCode';
import { type GuideCopyNotice, GuideCopyToast } from './GuideCopyToast';
import { GuideTimeline } from './GuideTimeline';

type ModalExample = {
  id: string;
  title: string;
  usage: string;
  source: string;
  desktop: string;
  mobile: string;
  options?: Pick<ModalDialogProps, 'size' | 'mobilePresentation' | 'overlayTone' | 'scrollFade'>;
  action?: 'single' | 'confirm' | 'vertical' | 'disabled';
  sheet?: 'default' | 'catalog';
  long?: boolean;
};

const groups: { id: string; title: string; description: string; items: ModalExample[] }[] = [
  {
    id: 'modal-size',
    title: '기본 크기',
    description: 'sm · md · lg',
    items: [
      {
        id: 'small',
        usage:
          '동일 크기 사용: 마이페이지 쿠폰 상세·재입고 알림 취소. 본문·버튼 구성은 화면마다 다릅니다.',
        source: 'CouponManagement.tsx / MyPageProductHistory.tsx',
        title: '작은 모달 · sm',
        desktop: '최대 너비 420px',
        mobile: '화면 너비 − 32px',
        options: { size: 'sm' },
        action: 'single',
      },
      {
        id: 'medium',
        usage: '동일 크기 사용: 주문 배송조회·우편번호 찾기. 본문·버튼 구성은 화면마다 다릅니다.',
        source: 'OrderTrackingDialog.tsx / AddressFields.tsx',
        title: '기본 모달 · md',
        desktop: '최대 너비 568px (기본값)',
        mobile: '화면 너비 − 32px',
        options: { size: 'md' },
        action: 'confirm',
      },
      {
        id: 'large',
        usage:
          '동일 크기 사용: 장바구니 옵션 변경. 실제 화면은 모바일 전체화면과 별도 헤더·버튼 스타일을 적용합니다.',
        source: 'cart/_components/CartDialogs.tsx',
        title: '큰 모달 · lg',
        desktop:
          '최대 너비 864px · 오른쪽 열 중앙 · 버튼 180×48px · 버튼 간격 8px · 본문과 40px · 하단 24px',
        mobile: '전체화면 · 하단 버튼',
        options: { size: 'lg', mobilePresentation: 'fullscreen' },
        action: 'confirm',
      },
    ],
  },
  {
    id: 'modal-actions',
    title: '버튼·스크롤·배경',
    description: '세로 버튼 · 비활성 · 긴 내용 · 밝은 배경',
    items: [
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
        desktop: '흰색 50% 배경·블러',
        mobile: '흰색 50% 배경·블러',
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
        desktop: '중앙 팝업 · 최대 568px',
        mobile: '중앙 팝업 · 화면 너비 − 32px',
        options: { mobilePresentation: 'popup' },
        action: 'single',
      },
      {
        id: 'fullscreen',
        usage:
          '모바일 본인인증 약관·회원가입 약관·장바구니 옵션 변경·문의 주문상품 조회에서 사용합니다.',
        source:
          'PhoneVerificationContent.tsx / SignupTermsContent.tsx / CartDialogs.tsx / InquiryOrderLookup.tsx',
        title: '전체화면 · fullscreen',
        desktop: '중앙 팝업 · 최대 568px',
        mobile: '화면 전체 너비·높이',
        options: { mobilePresentation: 'fullscreen' },
        action: 'single',
      },
      {
        id: 'bottom',
        usage:
          '주문 취소·환불(반품) 신청, 이전 약관 선택, 문의 첨부파일 미리보기. 별도 BottomSheet가 아니라 ModalDialog를 모바일에서 바텀시트처럼 표시한 형태입니다. 데스크탑에서는 중앙 팝업, 모바일에서는 하단 시트로 보여주되 같은 모달 안에서 본문·입력 상태·열기/닫기를 유지하기 위해 사용합니다. 이 예시는 모바일 전체 너비·상단 모서리 20px를 반영했으며 본문·버튼·세부 여백은 화면별로 다릅니다.',
        source: 'OrderClaimRequest.tsx / PreviousTermsPicker.tsx / InquiryListContent.tsx',
        title: '바텀시트형 모달 · bottomSheet',
        desktop: '중앙 팝업 · 최대 568px',
        mobile: '하단 정렬 · 전체 너비 · 상단 모서리 20px',
        options: { mobilePresentation: 'bottomSheet' },
        action: 'confirm',
      },
    ],
  },
  {
    id: 'modal-sheet',
    title: 'BottomSheet',
    description: '모바일 전용 하단 시트',
    items: [
      {
        id: 'sheet',
        usage:
          '모바일 검색 결과의 필터에서 사용합니다. 실제 시트에는 필터 항목과 적용 버튼이 들어갑니다.',
        source: 'components/catalog/ProductListingPage.tsx (isSearchPage)',
        title: '기본 하단 시트',
        desktop: '모바일 전용 · 데스크탑에서는 ModalDialog 사용',
        mobile: '전체 너비 · 상단 모서리 16px',
        sheet: 'default',
      },
      {
        id: 'catalog-sheet',
        usage:
          '모바일 상품 목록의 필터에서 사용합니다. 실제 시트에는 필터 항목과 적용 버튼이 들어갑니다.',
        source: 'components/catalog/ProductListingPage.tsx (상품 목록)',
        title: '상품 목록 하단 시트',
        desktop: '모바일 전용 · 데스크탑에서는 ModalDialog 사용',
        mobile: '전체 너비 · 상단 모서리 24px · 상품 목록 여백',
        sheet: 'catalog',
      },
    ],
  },
];

function exampleCode(example: ModalExample) {
  if (example.sheet)
    return `import { useState } from 'react';
${example.id === 'bottom' || example.id === 'large' ? "import { css } from 'styled-system/css';\n" : ''}import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';
import { BottomSheet } from '@/components/common/layouts/BottomSheet';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>열기</Button>
{open && (
  <BottomSheet
    appearance="${example.sheet}"
    title="${example.title}"
    ariaLabel="${example.title}"
    onClose={() => setOpen(false)}
    footer={<Button onClick={() => setOpen(false)}>확인</Button>}
  >
    <Typography as="p" variant="body4">안내 내용입니다.</Typography>
  </BottomSheet>
)}`;
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
      density: 'wide',
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
  open={open}
  onOpenChange={setOpen}
  title="${example.title}"
  closeLabel="닫기"
  finalFocus={triggerRef}
${[options, action, example.id === 'large' && "  footerProps={{ desktopContentOffset: 332, css: { pt: '6', _mobile: { pt: '4' } } }}"].filter(Boolean).join('\n')}
${
  example.id === 'bottom'
    ? `  popupClassName={css({
    _mobile: {
      '&&': {
        w: '100vw!',
        maxW: '100vw',
        maxH: 'calc(100dvh - 44px)!',
        borderRadius: '20px 20px 0 0',
      },
    },
  })}
  headerProps={{ css: { bg: 'white.0', borderBottom: '1px solid token(colors.black.20)' } }}`
    : ''
}
>
  <Typography as="p" variant="body4">${example.long ? '긴 안내 내용을 이 영역에 넣습니다. 내용이 높이를 넘으면 스크롤됩니다.' : '안내 내용입니다.'}</Typography>
</ModalDialog>`;
}

function ModalExampleCard({
  example,
  onCopy,
}: {
  example: ModalExample;
  onCopy: (code: string) => void;
}) {
  const mobile = usePlatform() === 'mobile';
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const code = exampleCode(example);
  const actions: ModalDialogProps['actions'] =
    example.action === 'single'
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
                    density: 'wide',
                    className: css({ maxW: { base: '180px', _mobile: 'none' } }),
                  }
                : undefined,
          }
        : undefined;
  const content = example.long ? (
    <Stack gap="4">
      {Array.from({ length: 32 }, (_, index) => (
        <Typography key={index} as="p" variant="body4">
          {index + 1}. 긴 내용의 스크롤을 확인하는 예시입니다. 본문을 내려도 하단 확인 버튼은
          유지됩니다.
        </Typography>
      ))}
    </Stack>
  ) : (
    <Typography as="p" variant="body4">
      안내 내용입니다. 이 예시는 모달의 표시와 열기·닫기만 확인합니다.
    </Typography>
  );

  return (
    <Stack minW="0" gap="3" p="4" border="1px solid token(colors.black.20)">
      <Typography as="h4" variant="body3" weight="semibold">
        {example.title}
      </Typography>
      <Stack gap="1">
        <Typography as="p" variant="body5">
          데스크탑: {example.desktop}
        </Typography>
        <Typography as="p" variant="body5">
          모바일: {example.mobile}
        </Typography>
      </Stack>
      <Stack gap="1">
        <Typography as="p" variant="body5">
          사용 화면: {example.usage}
        </Typography>
        <Typography
          as="p"
          variant="body5"
          tone="subtle"
          className={css({ overflowWrap: 'anywhere' })}
        >
          사용 파일: {example.source}
        </Typography>
      </Stack>
      <HStack minH="24" justifyContent="center" bg="black.10" p="4">
        <Button
          ref={triggerRef}
          variant="secondary"
          size="short"
          disabled={Boolean(example.sheet) && !mobile}
          onClick={() => setOpen(true)}
        >
          {example.sheet && !mobile ? '모바일에서 확인' : `${example.title} 열기`}
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
          <Icon name="copy-regular" size={16} />
        </Button>
      </HStack>
      {example.sheet ? (
        open &&
        mobile && (
          <BottomSheet
            appearance={example.sheet}
            title={example.title}
            ariaLabel={example.title}
            onClose={() => setOpen(false)}
            footer={<Button onClick={() => setOpen(false)}>확인</Button>}
          >
            {content}
          </BottomSheet>
        )
      ) : (
        <ModalDialog
          {...example.options}
          footerProps={
            example.id === 'large'
              ? { desktopContentOffset: 332, css: { pt: '6', _mobile: { pt: '4' } } }
              : undefined
          }
          popupClassName={
            example.id === 'bottom'
              ? css({
                  _mobile: {
                    '&&': {
                      w: '100vw!',
                      maxW: '100vw',
                      maxH: 'calc(100dvh - 44px)!',
                      borderRadius: '20px 20px 0 0',
                    },
                  },
                })
              : undefined
          }
          headerProps={
            example.id === 'bottom'
              ? { css: { bg: 'white.0', borderBottom: '1px solid token(colors.black.20)' } }
              : undefined
          }
          open={open}
          onOpenChange={setOpen}
          title={example.title}
          closeLabel="닫기"
          finalFocus={triggerRef}
          actions={actions}
        >
          {content}
        </ModalDialog>
      )}
    </Stack>
  );
}

/** 공통 모달의 데스크탑·모바일 표시와 사용 코드를 안내합니다. (Shows desktop and mobile modal presentations with copyable usage examples.) */
export function ModalGuide() {
  const platform = usePlatform();
  const [notice, setNotice] = useState<GuideCopyNotice | null>(null);
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
          <Typography as="h2" variant="heading8">
            모달
          </Typography>
          <Typography as="p" variant="body4">
            현재 기준: {platform === 'mobile' ? '모바일' : '데스크탑'}
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            1024px 이하는 모바일, 1025px 이상은 데스크탑입니다. 열기 버튼으로 현재 화면 기준의 실제
            모달을 확인합니다.
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            ModalDialog의 기본값은 md · popup · dark입니다. 모바일 표시 옵션은 데스크탑에서 중앙
            팝업으로 유지됩니다. BottomSheet는 별도의 모바일 하단 시트입니다.
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            사용처: 전체화면은 본인인증·약관, 하단 표시는 주문 취소·반품 신청과 이전 약관 선택에서
            사용합니다. 예시의 확인 버튼은 닫기만 수행합니다.
          </Typography>
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
            <Typography as="h3" id={`${group.id}-title`} variant="heading8">
              {group.title}
            </Typography>
            <Typography as="p" variant="body5" tone="subtle">
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
      <GuideCopyToast notice={notice} onDismiss={dismissNotice} />
    </Grid>
  );
}
