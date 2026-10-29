'use client';

import { type ReactNode, cloneElement, isValidElement, useCallback, useRef, useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, type ButtonProps } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { faCopy } from '@/icons/fontAwesome';

import { GuideCopyToast, type GuideCopyNotice } from './GuideCopyToast';
import { GuideTimeline } from './GuideTimeline';

const variants = [
  { value: 'primary', title: 'Primary', description: '배경이 채워진 기본 액션 버튼' },
  { value: 'secondary', title: 'Secondary', description: '테두리로 구분하는 보조 액션 버튼' },
] as const;

const states = [
  { value: 'default', label: '기본' },
  { value: 'disabled', label: '비활성화' },
] as const;

const sizes = [
  { value: 'tall', label: 'Tall', note: '높이 48px · 글자 16px · 좌우 24px' },
  { value: 'short', label: 'Short', note: '높이 40px · 글자 14px · 좌우 16px' },
] as const;

const colorways = ['black', 'white'] as const;

const auxiliaryVariants = [
  {
    id: 'button-brand',
    title: 'Brand',
    description: '브랜드 블루를 강조하는 버튼',
    samples: [
      {
        label: 'Tall',
        note: '높이 48px · 글자 16px · 좌우 24px',
        code: '<Button variant="brand" size="tall">버튼명 텍스트</Button>',
        preview: (
          <Button variant="brand" size="tall">
            버튼명 텍스트
          </Button>
        ),
      },
      {
        label: 'Short',
        note: '높이 40px · 글자 14px · 좌우 16px',
        code: '<Button variant="brand" size="short">버튼명 텍스트</Button>',
        preview: (
          <Button variant="brand" size="short">
            버튼명 텍스트
          </Button>
        ),
      },
    ],
  },
  {
    id: 'button-link',
    title: 'Link',
    description: '밑줄로 표시하는 텍스트 링크',
    samples: [
      {
        label: 'SM',
        note: '높이 16px · 글자 12px · 좌우 0px',
        code: '<Button variant="link" size="sm">자세히 보기</Button>',
        preview: (
          <Button variant="link" size="sm">
            자세히 보기
          </Button>
        ),
      },
      {
        label: 'MD',
        note: '높이 auto · 글자 14px · 좌우 0px',
        code: '<Button variant="link" size="md">자세히 보기</Button>',
        preview: (
          <Button variant="link" size="md">
            자세히 보기
          </Button>
        ),
      },
      {
        label: 'LG',
        note: '높이 auto · 글자 16px · 좌우 0px',
        code: '<Button variant="link" size="lg">자세히 보기</Button>',
        preview: (
          <Button variant="link" size="lg">
            자세히 보기
          </Button>
        ),
      },
    ],
  },
  {
    id: 'button-plain',
    title: 'Plain',
    description: '밑줄 없이 텍스트로 표시하는 버튼',
    samples: [
      {
        label: 'SM',
        note: '높이 16px · 글자 12px · 좌우 0px',
        code: '<Button variant="plain" size="sm">취소</Button>',
        preview: (
          <Button variant="plain" size="sm">
            취소
          </Button>
        ),
      },
      {
        label: 'MD',
        note: '높이 auto · 글자 14px · 좌우 0px',
        code: '<Button variant="plain" size="md">취소</Button>',
        preview: (
          <Button variant="plain" size="md">
            취소
          </Button>
        ),
      },
      {
        label: 'LG',
        note: '높이 auto · 글자 16px · 좌우 0px',
        code: '<Button variant="plain" size="lg">취소</Button>',
        preview: (
          <Button variant="plain" size="lg">
            취소
          </Button>
        ),
      },
    ],
  },
  {
    id: 'button-chip',
    title: 'Chip',
    description: '선택 항목이나 간단한 분류를 표시하는 칩 버튼',
    samples: [
      {
        label: '고정 크기',
        note: '높이 36px · 글자 14px · 좌우 14px',
        code: '<Button variant="chip">러닝</Button>',
        preview: <Button variant="chip">러닝</Button>,
      },
    ],
  },
  {
    id: 'button-filter-trigger',
    title: 'Filter Trigger',
    description: '필터 패널을 여는 트리거 버튼',
    samples: [
      {
        label: 'Compact',
        note: '높이 32.2px · 글자 14px · 좌우 14px',
        code: '<Button variant="filterTrigger" icon={<Icon name="filter" />}><Typography variant="body4">필터</Typography></Button>',
        preview: (
          <Button variant="filterTrigger" icon={<Icon name="filter" />}>
            <Typography variant="body4">필터</Typography>
          </Button>
        ),
      },
      {
        label: 'Regular',
        note: '높이 40px · 글자 16px · 좌우 24px',
        code: '<Button variant="filterTrigger" size="regular" icon={<Icon name="filter" size={20} />}><Typography variant="cta1">Filter & Sort</Typography></Button>',
        preview: (
          <Button variant="filterTrigger" size="regular" icon={<Icon name="filter" size={20} />}>
            <Typography variant="cta1">Filter &amp; Sort</Typography>
          </Button>
        ),
      },
    ],
  },
  {
    id: 'button-header-search',
    title: 'Header Search',
    description: '헤더 검색 진입에 사용하는 고정 크기 버튼',
    samples: [
      {
        label: '고정 크기',
        note: '높이 36px · 글자 16px · 좌우 15px',
        code: '<Button variant="headerSearch" icon={<Icon src="/images/header/search.svg" size="16px" mask />}>검색어를 입력하세요</Button>',
        preview: (
          <Button
            variant="headerSearch"
            icon={<Icon src="/images/header/search.svg" size="16px" mask />}
          >
            검색어를 입력하세요
          </Button>
        ),
      },
    ],
  },
  {
    id: 'button-icon',
    title: 'Icon',
    description: '아이콘만 표시하는 버튼으로 접근성 이름이 필요',
    samples: [
      {
        label: '36px',
        note: '높이 36px · 글자 없음 · 좌우 0px',
        code: '<Button variant="icon" size={36} aria-label="필터 열기"><Icon name="filter" /></Button>',
        preview: (
          <Button variant="icon" size={36} aria-label="필터 열기">
            <Icon name="filter" />
          </Button>
        ),
      },
    ],
  },
  {
    id: 'button-social',
    title: 'Social',
    description: '카카오·네이버 로그인을 위한 버튼 옵션',
    samples: [
      {
        label: 'Kakao',
        note: '높이 48px · 글자 16px · 좌우 24px',
        code: '<Button social={{ provider: "kakao" }}>카카오로 로그인</Button>',
        preview: <Button social={{ provider: 'kakao' }}>카카오로 로그인</Button>,
      },
      {
        label: 'Naver',
        note: '높이 48px · 글자 16px · 좌우 24px',
        code: '<Button social={{ provider: "naver" }}>네이버로 로그인</Button>',
        preview: <Button social={{ provider: 'naver' }}>네이버로 로그인</Button>,
      },
    ],
  },
  {
    id: 'button-load-more',
    title: 'Load More',
    description: '목록의 현재 진행 수를 표시하는 버튼 옵션',
    samples: [
      {
        label: '진행 수 표시',
        note: '높이 48px · 글자 16px · 좌우 24px',
        code: '<Button loadMore={{ counter: { current: 1, total: 3 } }} />',
        preview: <Button loadMore={{ counter: { current: 1, total: 3 } }} />,
      },
    ],
  },
] as const;

const variantSection = css({
  pt: '4',
  borderTop: '1px solid token(colors.black.20)',
  scrollMarginTop: 'calc(var(--layout-site-header-height) + 16px)',
});

const sizeCard = css({
  minW: '0',
  p: { base: '4', _mobile: '3' },
  border: '1px solid token(colors.black.20)',
  borderRadius: '2',
  bg: 'white.0',
});

const colorwayCard = css({
  minW: '0',
  p: { base: '4', _mobile: '3' },
  border: '1px solid token(colors.black.20)',
  borderRadius: '1',
  bg: 'black.10',
});

const stateCard = css({
  minW: '0',
  p: { base: '3', _mobile: '2' },
  border: '1px solid token(colors.black.20)',
  borderRadius: '1',
  bg: 'white.0',
});

const stateLabel = css({ flexShrink: '0', whiteSpace: 'nowrap' });

const preview = css({
  display: 'flex',
  alignItems: 'center',
  minH: '16',
  p: '3',
  flexShrink: '0',
  borderRadius: '1',
  '&[data-colorway="white"]': { bg: 'black.60' },
});

const codeLine = css({
  minW: '0',
  justifyContent: 'space-between',
  p: '3',
  overflowWrap: 'anywhere',
  border: '1px solid token(colors.black.20)',
  bg: 'surface.subtle',
  fontSize: '12px',
  lineHeight: '1.5',
});

const codeTag = css({ color: 'blue.100' });
const codeAttribute = css({ color: 'mossGreen.100' });
const codeString = css({ color: 'red.80' });
const codePunctuation = css({ color: 'black.60' });

const copyButton = css({
  flexShrink: '0',
  bg: 'black.10',
  border: '1px solid token(colors.black.20)',
  borderRadius: '1',
  _hover: { bg: 'black.20' },
});

const codeTokenPattern =
  /(<\/?)([A-Za-z][\w.]*)|([A-Za-z][\w-]*)(?==)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|([{}=/>])/g;

function renderHighlightedCode(code: string) {
  const tokens = [];
  let previousIndex = 0;

  for (const match of code.matchAll(codeTokenPattern)) {
    const index = match.index ?? 0;
    if (index > previousIndex) tokens.push(code.slice(previousIndex, index));

    const className =
      match[1] || match[2]
        ? codeTag
        : match[3]
          ? codeAttribute
          : match[4]
            ? codeString
            : codePunctuation;
    tokens.push(
      <span key={`${index}-${match[0]}`} className={className}>
        {match[0]}
      </span>,
    );
    previousIndex = index + match[0].length;
  }

  if (previousIndex < code.length) tokens.push(code.slice(previousIndex));
  return tokens;
}

type ButtonVariant = (typeof variants)[number]['value'];
type ButtonVariantPanelProps = {
  variant: ButtonVariant;
  onCopy: (code: string) => void;
};

function ButtonVariantPanel({ variant, onCopy }: ButtonVariantPanelProps) {
  const variantSpec = variants.find((item) => item.value === variant)!;
  const sectionId = `button-${variant}`;

  return (
    <Stack
      as="section"
      id={sectionId}
      className={variantSection}
      gap="3"
      aria-labelledby={`${sectionId}-title`}
    >
      <HStack alignItems="baseline" gap="3" flexWrap="wrap">
        <Typography as="h2" id={`${sectionId}-title`} variant="heading8">
          {variantSpec.title}
        </Typography>
        <Typography as="p" variant="body5" tone="subtle">
          {variantSpec.description}
        </Typography>
      </HStack>
      <Stack gap={{ base: '3', _mobile: '2' }} mt="3">
        {sizes.map((size) => (
          <Stack
            key={size.value}
            as="section"
            className={sizeCard}
            gap="3"
            aria-label={`${size.label} 버튼 예시`}
          >
            <HStack justifyContent="space-between" alignItems="flex-start" gap="3">
              <Typography as="h3" variant="body4" weight="medium">
                {size.label}
              </Typography>
              <Typography as="span" variant="body5" tone="subtle">
                {size.note}
              </Typography>
            </HStack>
            <Grid columns={{ base: 2, _mobile: 1 }} gap="3">
              {colorways.map((colorway) => (
                <Stack
                  key={colorway}
                  className={colorwayCard}
                  data-colorway={colorway}
                  gap="3"
                  aria-label={colorway === 'black' ? 'Black 버튼' : 'White 버튼'}
                >
                  <Typography as="h4" variant="body4" weight="medium">
                    {colorway === 'black' ? 'Black' : 'White'}
                  </Typography>
                  <Grid columns={1} gap="3">
                    {states.map((state) => {
                      const disabled = state.value === 'disabled';
                      const code = `<Button variant="${variant}" colorway="${colorway}" size="${size.value}"${disabled ? ' disabled' : ''}>버튼명 텍스트</Button>`;

                      return (
                        <Stack
                          key={state.value}
                          className={stateCard}
                          gap="2"
                          role="group"
                          aria-label={state.label}
                        >
                          <Typography
                            as="span"
                            className={stateLabel}
                            variant="body5"
                            weight="medium"
                          >
                            {state.label}
                          </Typography>
                          <Box className={preview} data-colorway={colorway} justifyContent="center">
                            <Button
                              variant={variant}
                              colorway={colorway}
                              size={size.value}
                              disabled={disabled}
                              aria-label={`${variantSpec.title} ${size.label} ${colorway} ${state.label} 예시`}
                            >
                              버튼명 텍스트
                            </Button>
                          </Box>
                          <HStack as="code" className={codeLine} gap="3">
                            <Box as="span" flex="1" minW="0" overflowWrap="anywhere">
                              {renderHighlightedCode(code)}
                            </Box>
                            <Button
                              className={copyButton}
                              variant="icon"
                              size={32}
                              type="button"
                              onClick={() => onCopy(code)}
                              aria-label={`${variantSpec.title} ${size.label} ${colorway} ${state.label} 코드 복사`}
                              title="코드 복사"
                            >
                              <Icon fontAwesomeIcon={faCopy} size={16} />
                            </Button>
                          </HStack>
                        </Stack>
                      );
                    })}
                  </Grid>
                </Stack>
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

function ButtonCategoryPanel({ onCopy }: { onCopy: (code: string) => void }) {
  const timelineEntries = [
    {
      id: 'button-sizing-guide',
      title: '크기 기준',
      description: '크기·타이포·속성 규칙',
    },
    ...variants.map((item) => ({
      id: `button-${item.value}`,
      title: item.title,
      description: item.description,
    })),
    ...auxiliaryVariants,
  ];

  return (
    <Grid
      className={css({
        gridTemplateColumns: { base: 'minmax(0, 1fr) 240px', _mobile: 'minmax(0, 1fr)' },
      })}
      gap="4"
      alignItems="start"
    >
      <Stack minW="0" gap={{ base: '6', _mobile: '4' }}>
        <ButtonSizingGuide />
        {variants.map((variant) => (
          <ButtonVariantPanel key={variant.value} variant={variant.value} onCopy={onCopy} />
        ))}
        <AuxiliaryButtonsGuide onCopy={onCopy} />
      </Stack>
      <GuideTimeline title="버튼 유형" entries={timelineEntries} />
    </Grid>
  );
}

function ButtonSizingGuide() {
  return (
    <Stack
      as="section"
      id="button-sizing-guide"
      className={variantSection}
      gap="3"
      aria-labelledby="button-sizing-guide-title"
    >
      <Typography as="h2" id="button-sizing-guide-title" variant="heading8">
        크기 기준 및 속성 안내
      </Typography>
      <Grid columns={{ base: 2, _mobile: 1 }} gap="3">
        <Stack className={sizeCard} gap="2">
          <Typography as="h3" variant="body4" weight="medium">
            크기 기준
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            Tall: 높이 48px · 글자 16px · 좌우 24px
            <br />
            Short: 높이 40px · 글자 14px · 좌우 16px
          </Typography>
        </Stack>
        <Stack className={sizeCard} gap="2">
          <Typography as="h3" variant="body4" weight="medium">
            size와 타이포
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            일반 버튼: tall → CTA1, short → CTA2
            <br />
            Link: sm 12px · md 14px · lg 16px
          </Typography>
        </Stack>
        <Stack className={sizeCard} gap="2">
          <Typography as="h3" variant="body4" weight="medium">
            속성 우선순위
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            density → size → auto
            <br />
            auto는 기본 wide, .platform-mobile 안에서는 compact입니다.
          </Typography>
        </Stack>
        <Stack className={sizeCard} gap="2">
          <Typography as="h3" variant="body4" weight="medium">
            높이 예외
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            FilterTrigger compact: 높이 32.2px · 글자 14px · 좌우 14px
            <br />
            FilterTrigger regular: 높이 40px · 글자 16px · 좌우 24px
            <br />
            HeaderSearch: 높이 36px · 글자 16px · 좌우 15px
            <br />
            Icon: 샘플 높이 36px · 글자 없음 · 좌우 0px
          </Typography>
        </Stack>
        <Stack className={sizeCard} gap="2">
          <Typography as="h3" variant="body4" weight="medium">
            라벨 크기
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            일반 버튼의 size는 라벨 Typography도 선택합니다. density와 함께 사용하면 높이와 글자
            크기가 달라질 수 있습니다.
          </Typography>
        </Stack>
        <Stack className={sizeCard} gap="2">
          <Typography as="h3" variant="body4" weight="medium">
            색상
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            colorway는 Black / White 조합을 선택합니다.
          </Typography>
        </Stack>
      </Grid>
    </Stack>
  );
}

function AuxiliaryButtonsGuide({ onCopy }: { onCopy: (code: string) => void }) {
  return (
    <>
      {auxiliaryVariants.map((item) => (
        <Stack
          key={item.id}
          id={item.id}
          as="section"
          className={variantSection}
          gap="3"
          aria-labelledby={`${item.id}-title`}
        >
          <HStack alignItems="baseline" gap="3" flexWrap="wrap">
            <Typography as="h2" id={`${item.id}-title`} variant="heading8">
              {item.title}
            </Typography>
            <Typography as="p" variant="body5" tone="subtle">
              {item.description}
            </Typography>
          </HStack>
          <Stack gap={{ base: '3', _mobile: '2' }} mt="3">
            {item.samples.map((sample) => (
              <Stack key={sample.label} className={sizeCard} gap="3">
                <HStack
                  justifyContent="space-between"
                  alignItems="baseline"
                  flexWrap="wrap"
                  gap="2"
                >
                  <Typography as="h3" variant="body4" weight="medium">
                    {sample.label}
                  </Typography>
                  <Typography as="span" variant="body5" tone="subtle">
                    {sample.note}
                  </Typography>
                </HStack>
                <Grid columns={{ base: 2, _mobile: 1 }} gap="2">
                  {states.map((state) => {
                    const code =
                      state.value === 'disabled' ? withDisabledAttribute(sample.code) : sample.code;

                    return (
                      <Stack
                        key={state.value}
                        className={stateCard}
                        gap="2"
                        role="group"
                        aria-label={state.label}
                      >
                        <Typography
                          as="span"
                          className={stateLabel}
                          variant="body5"
                          weight="medium"
                        >
                          {state.label}
                        </Typography>
                        <Box display="flex" justifyContent="center" minH="16" p="3">
                          {renderSamplePreview(sample.preview, state.value === 'disabled')}
                        </Box>
                        <HStack as="code" className={codeLine} gap="3">
                          <Box as="span" flex="1" minW="0" overflowWrap="anywhere">
                            {renderHighlightedCode(code)}
                          </Box>
                          <Button
                            className={copyButton}
                            variant="icon"
                            size={32}
                            type="button"
                            onClick={() => onCopy(code)}
                            aria-label={`${item.title} ${sample.label} ${state.label} 코드 복사`}
                            title="코드 복사"
                          >
                            <Icon fontAwesomeIcon={faCopy} size={16} />
                          </Button>
                        </HStack>
                      </Stack>
                    );
                  })}
                </Grid>
              </Stack>
            ))}
          </Stack>
        </Stack>
      ))}
    </>
  );
}

function withDisabledAttribute(code: string) {
  return code.replace('<Button', '<Button disabled');
}

function renderSamplePreview(preview: ReactNode, disabled: boolean) {
  if (!isValidElement<ButtonProps>(preview)) return preview;

  return cloneElement(preview, { disabled });
}

/** 버튼 variant별 상태·크기 예시와 복사 가능한 코드를 보여줍니다. (Shows button variant examples by state and size with copyable code.) */
export function ButtonGuide() {
  const [copyNotice, setCopyNotice] = useState<GuideCopyNotice | null>(null);
  const nextCopyId = useRef(0);

  function showCopyNotice(text: string) {
    nextCopyId.current += 1;
    setCopyNotice({ id: nextCopyId.current, text });
  }

  const dismissCopyNotice = useCallback((id: number) => {
    setCopyNotice((current) => (current?.id === id ? null : current));
  }, []);

  async function copySource(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      showCopyNotice('버튼 사용 코드를 복사했습니다.');
    } catch {
      showCopyNotice('복사하지 못했습니다. 표시된 코드를 직접 선택해 복사해 주세요.');
    }
  }

  return (
    <Stack gap="3">
      <ButtonCategoryPanel onCopy={copySource} />
      <GuideCopyToast notice={copyNotice} onDismiss={dismissCopyNotice} />
    </Stack>
  );
}
