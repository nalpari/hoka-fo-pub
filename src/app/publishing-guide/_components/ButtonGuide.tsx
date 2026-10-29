'use client';

import { type ReactNode, cloneElement, isValidElement, useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, type ButtonProps } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { SupportTabs, type SupportTab } from '@/components/common/molecules/SupportTabs';

const variants = [
  { value: 'primary', title: 'Primary', description: '배경이 채워진 기본 액션 버튼' },
  { value: 'secondary', title: 'Secondary', description: '테두리로 구분하는 보조 액션 버튼' },
] as const;

const categories = [
  { value: 'button', label: '버튼' },
  { value: 'form', label: '폼' },
  { value: 'modal', label: '모달' },
  { value: 'badge', label: '뱃지' },
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
        code: '<Button variant="brand" size="tall">버튼명 텍스트</Button>',
        preview: (
          <Button variant="brand" size="tall">
            버튼명 텍스트
          </Button>
        ),
      },
      {
        label: 'Short',
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
        code: '<Button variant="link" size="sm">자세히 보기</Button>',
        preview: (
          <Button variant="link" size="sm">
            자세히 보기
          </Button>
        ),
      },
      {
        label: 'MD',
        code: '<Button variant="link" size="md">자세히 보기</Button>',
        preview: (
          <Button variant="link" size="md">
            자세히 보기
          </Button>
        ),
      },
      {
        label: 'LG',
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
        code: '<Button variant="plain" size="sm">취소</Button>',
        preview: (
          <Button variant="plain" size="sm">
            취소
          </Button>
        ),
      },
      {
        label: 'MD',
        code: '<Button variant="plain" size="md">취소</Button>',
        preview: (
          <Button variant="plain" size="md">
            취소
          </Button>
        ),
      },
      {
        label: 'LG',
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
        code: '<Button variant="filterTrigger" icon={<Icon name="filter" />}>필터</Button>',
        preview: (
          <Button variant="filterTrigger" icon={<Icon name="filter" />}>
            <Typography variant="body4">필터</Typography>
          </Button>
        ),
      },
      {
        label: 'Regular',
        code: '<Button variant="filterTrigger" size="regular" icon={<Icon name="filter" size={20} />}>Filter & Sort</Button>',
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
        code: '<Button social={{ provider: "kakao" }}>카카오로 로그인</Button>',
        preview: <Button social={{ provider: 'kakao' }}>카카오로 로그인</Button>,
      },
      {
        label: 'Naver',
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
  px: '3',
  py: '2',
  border: '1px solid token(colors.black.20)',
  borderRadius: '1',
  bg: 'white.0',
  color: 'black.100',
  '& code': {
    display: 'block',
    color: 'inherit',
    fontFamily: 'mono',
    fontSize: '10px',
    lineHeight: '1.5',
    overflowWrap: 'break-word',
  },
});

const codeActions = css({
  gridTemplateColumns: 'minmax(0, 1fr) max-content',
  alignItems: 'start',
});

const timeline = css({
  alignSelf: 'start',
  position: 'sticky',
  top: 'calc(var(--layout-site-header-height) + 24px)',
  p: '4',
  border: '1px solid token(colors.black.20)',
  borderRadius: '2',
  bg: 'white.0',
  _mobile: { position: 'static', top: 'auto' },
});

const timelineItems = css({
  ml: '2',
  pl: '4',
  borderLeft: '1px solid token(colors.black.40)',
});

const timelineLink = css({
  position: 'relative',
  display: 'block',
  py: '1',
  color: 'text.primary',
  textDecoration: 'none',
  _before: {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '-21px',
    w: '10px',
    h: '10px',
    transform: 'translateY(-50%)',
    border: '2px solid token(colors.black.40)',
    borderRadius: 'full',
    bg: 'white.0',
  },
  _hover: { color: 'text.primary', textDecoration: 'underline' },
  _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
});

type ButtonVariant = (typeof variants)[number]['value'];
type GuideCategory = (typeof categories)[number]['value'];
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
                          <HStack justifyContent="space-between" alignItems="center" gap="3">
                            <Typography
                              as="span"
                              className={stateLabel}
                              variant="body5"
                              weight="medium"
                            >
                              {state.label}
                            </Typography>
                            <Box className={preview} data-colorway={colorway}>
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
                          </HStack>
                          <Grid className={codeActions} w="100%" gap="2">
                            <Box className={codeLine}>
                              <code>{code}</code>
                            </Box>
                            <Box whiteSpace="nowrap">
                              <Button
                                variant="plain"
                                size="md"
                                type="button"
                                onClick={() => onCopy(code)}
                                aria-label={`${variantSpec.title} ${size.label} ${colorway} ${state.label} 코드 복사`}
                              >
                                복사
                              </Button>
                            </Box>
                          </Grid>
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
      <Stack as="nav" className={timeline} gap="3" aria-label="버튼 유형 바로가기">
        <Typography as="h2" variant="body3" weight="medium">
          버튼 유형
        </Typography>
        <Stack className={timelineItems} gap="0">
          {timelineEntries.map((item) => (
            <a key={item.id} className={timelineLink} href={`#${item.id}`}>
              <Typography as="span" variant="body5" weight="medium">
                {item.title}
              </Typography>
              <Box as="span" display="block">
                <Typography as="span" variant="body5" tone="subtle">
                  {item.description}
                </Typography>
              </Box>
            </a>
          ))}
        </Stack>
      </Stack>
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
            Tall 48px / 16px / 좌우 24px
            <br />
            Short 40px / 14px / 좌우 16px
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
            FilterTrigger 32.2px / 14px · HeaderSearch 36px / 14px
            <br />
            아이콘 전용 버튼은 24px입니다.
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
                <Typography as="h3" variant="body4" weight="medium">
                  {sample.label}
                </Typography>
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
                        <HStack justifyContent="space-between" alignItems="center" gap="3">
                          <Typography
                            as="span"
                            className={stateLabel}
                            variant="body5"
                            weight="medium"
                          >
                            {state.label}
                          </Typography>
                          {renderSamplePreview(sample.preview, state.value === 'disabled')}
                        </HStack>
                        <Grid className={codeActions} w="100%" gap="2">
                          <Box className={codeLine}>
                            <code>{code}</code>
                          </Box>
                          <Box whiteSpace="nowrap">
                            <Button
                              variant="plain"
                              size="md"
                              type="button"
                              onClick={() => onCopy(code)}
                              aria-label={`${item.title} ${sample.label} ${state.label} 코드 복사`}
                            >
                              복사
                            </Button>
                          </Box>
                        </Grid>
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

/** 컴포넌트 분류별 가이드 탭을 제공하고 버튼의 상태·크기별 예시와 코드를 보여줍니다. (Provides component category tabs and button examples with copyable code.) */
export function ButtonGuide() {
  const [activeCategory, setActiveCategory] = useState<GuideCategory>('button');
  const [copyMessage, setCopyMessage] = useState('');

  async function copySource(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopyMessage('버튼 사용 코드를 복사했습니다.');
    } catch {
      setCopyMessage('복사하지 못했습니다. 표시된 코드를 직접 선택해 복사해 주세요.');
    }
  }

  const tabs: readonly SupportTab[] = categories.map((category) => ({
    value: category.value,
    label: category.label,
    content:
      category.value === 'button' ? (
        <ButtonCategoryPanel onCopy={copySource} />
      ) : (
        <Box py="8">
          <Typography as="p" variant="body4" tone="subtle">
            {category.label} 예시는 준비 중입니다.
          </Typography>
        </Box>
      ),
  }));

  return (
    <Stack gap="3">
      <SupportTabs
        ariaLabel="퍼블리싱 가이드 컴포넌트 분류"
        tabs={tabs}
        defaultValue="button"
        value={activeCategory}
        onValueChange={(value) => setActiveCategory(value as GuideCategory)}
        variant="guide"
      />
      <Typography as="p" role="status" aria-live="polite" variant="body5" tone="subtle">
        {copyMessage}
      </Typography>
    </Stack>
  );
}
