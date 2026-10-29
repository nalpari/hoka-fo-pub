'use client';

import { useCallback, useRef, useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import {
  figmaTypographyVariants,
  Typography,
  type TypographyVariant,
} from '@/components/common/atoms/Typography';

import { faCopy } from '@/icons/fontAwesome';

import { GuideCopyToast, type GuideCopyNotice } from './GuideCopyToast';
import { GuideTimeline } from './GuideTimeline';

const groups: readonly {
  id: string;
  title: string;
  description: string;
  examples: readonly { variant: TypographyVariant; text: string }[];
}[] = [
  {
    id: 'typography-heading-en',
    title: '영문 헤딩',
    description: '영문 제목 계층',
    examples: Array.from({ length: 9 }, (_, index) => ({
      variant: `heading${index + 1}` as TypographyVariant,
      text: `Heading ${index + 1}`,
    })),
  },
  {
    id: 'typography-heading-ko',
    title: '한글 헤딩',
    description: '한글 제목 계층',
    examples: Array.from({ length: 9 }, (_, index) => ({
      variant: `headingKr${index + 1}` as TypographyVariant,
      text: `한글 헤딩 ${index + 1}`,
    })),
  },
  {
    id: 'typography-body-en',
    title: '영문 본문',
    description: '영문 본문 계층',
    examples: Array.from({ length: 5 }, (_, index) => ({
      variant: `body${index + 1}` as TypographyVariant,
      text: `Body text ${index + 1}: The future starts here.`,
    })),
  },
  {
    id: 'typography-body-ko',
    title: '한글 본문',
    description: '한글 본문 계층',
    examples: Array.from({ length: 5 }, (_, index) => ({
      variant: `bodyKr${index + 1}` as TypographyVariant,
      text: `본문 텍스트 ${index + 1}: 새로운 움직임을 시작하세요.`,
    })),
  },
  {
    id: 'typography-cta',
    title: 'CTA',
    description: '액션 텍스트',
    examples: [
      { variant: 'cta1', text: 'Shop now' },
      { variant: 'cta2', text: 'Shop now' },
      { variant: 'ctaKr1', text: '구매하기' },
      { variant: 'ctaKr2', text: '구매하기' },
    ],
  },
  {
    id: 'typography-text-link',
    title: '텍스트 링크',
    description: '영문·한글 링크',
    examples: [
      { variant: 'textLink1', text: 'Learn more' },
      { variant: 'textLink2', text: 'Learn more' },
      { variant: 'textLink3', text: 'Learn more' },
      { variant: 'textLinkKr1', text: '자세히 보기' },
      { variant: 'textLinkKr2', text: '자세히 보기' },
      { variant: 'textLinkKr3', text: '자세히 보기' },
    ],
  },
];

const codeStyle = css({
  minW: '0',
  justifyContent: 'space-between',
  p: '3',
  overflowWrap: 'anywhere',
  border: '1px solid token(colors.black.20)',
  bg: 'surface.subtle',
  fontSize: '12px',
  lineHeight: '1.5',
});

const variantSection = css({
  pt: '4',
  borderTop: '1px solid token(colors.black.20)',
  scrollMarginTop: 'calc(var(--layout-site-header-height) + 16px)',
});

const exampleCard = css({
  minW: '0',
  p: { base: '4', _mobile: '3' },
  border: '1px solid token(colors.black.20)',
  borderRadius: '2',
  bg: 'surface.default',
});

const metricText = css({ textAlign: { base: 'right', _mobile: 'left' } });
const copyButton = css({
  flexShrink: '0',
  bg: 'black.10',
  border: '1px solid token(colors.black.20)',
  borderRadius: '1',
  _hover: { bg: 'black.20' },
});

const lineHeightValues: Record<string, string> = {
  body: '1.3',
  hoka: '1',
  koreanHeading: '1.2',
};

const fontWeightValues: Record<string, string> = {
  black: '900',
  bold: '700',
  medium: '500',
  normal: '400',
  semibold: '600',
};

function formatFontSize(fontSize: string) {
  const tokenSize = /--font-sizes-(\d+)/.exec(fontSize)?.[1];
  return `${tokenSize ?? Number.parseFloat(fontSize)}px`;
}

function variantMetrics(variant: TypographyVariant) {
  const style = figmaTypographyVariants[variant];
  const mobileStyle = '_mobile' in style ? style._mobile : undefined;
  const lineHeight = lineHeightValues[style.lineHeight] ?? style.lineHeight;
  const desktopWeight = fontWeightValues[style.fontWeight] ?? style.fontWeight;
  const mobileWeight =
    fontWeightValues[mobileStyle?.fontWeight ?? style.fontWeight] ?? desktopWeight;
  const desktopFontSize = formatFontSize(style.fontSize);
  const mobileFontSize = formatFontSize(mobileStyle?.fontSize ?? style.fontSize);
  const fontSize =
    desktopFontSize === mobileFontSize
      ? desktopFontSize
      : `PC ${desktopFontSize} / Mobile ${mobileFontSize}`;
  const weight =
    desktopWeight === mobileWeight ? desktopWeight : `PC ${desktopWeight} / Mobile ${mobileWeight}`;

  return `Font Size ${fontSize} · Line Height ${lineHeight} · Weight ${weight}`;
}

/** Typography의 실제 variant별 반응형 미리보기와 복사 코드를 제공합니다. (Shows responsive previews and copyable snippets for Typography variants.) */
export function TypographyGuide() {
  const [copyNotice, setCopyNotice] = useState<GuideCopyNotice | null>(null);
  const nextCopyId = useRef(0);

  function showCopyNotice(text: string) {
    nextCopyId.current += 1;
    setCopyNotice({ id: nextCopyId.current, text });
  }

  const dismissCopyNotice = useCallback((id: number) => {
    setCopyNotice((current) => (current?.id === id ? null : current));
  }, []);

  async function copyVariant(variant: TypographyVariant, text: string) {
    const code = `<Typography variant="${variant}">${text}</Typography>`;

    try {
      await navigator.clipboard.writeText(code);
      showCopyNotice(`${variant} 코드를 복사했습니다.`);
    } catch {
      showCopyNotice('복사하지 못했습니다. 표시된 코드를 직접 선택해 복사해 주세요.');
    }
  }

  return (
    <Grid
      className={css({
        gridTemplateColumns: { base: 'minmax(0, 1fr) 240px', _mobile: 'minmax(0, 1fr)' },
      })}
      gap="4"
      alignItems="start"
      pt="6"
    >
      <Stack minW="0" gap={{ base: '6', _mobile: '4' }}>
        <HStack alignItems="baseline" gap="3" flexWrap="wrap">
          <Typography as="h2" variant="heading8">
            Typography
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            프로젝트에서 사용하는 실제 variant를 PC·모바일 반응형으로 확인하고 코드를 복사합니다.
          </Typography>
        </HStack>
        {groups.map((group) => (
          <Stack
            key={group.id}
            as="section"
            id={group.id}
            className={variantSection}
            gap="3"
            aria-labelledby={`${group.id}-title`}
          >
            <HStack alignItems="baseline" gap="3" flexWrap="wrap">
              <Typography as="h3" id={`${group.id}-title`} variant="heading8">
                {group.title}
              </Typography>
              <Typography as="p" variant="body5" tone="subtle">
                {group.description}
              </Typography>
            </HStack>
            <Grid columns={{ base: 2, _mobile: 1 }} gap="3">
              {group.examples.map(({ variant, text }) => (
                <Stack key={variant} className={exampleCard} gap="3">
                  <HStack
                    justifyContent="space-between"
                    alignItems="baseline"
                    flexWrap="wrap"
                    gap="2"
                  >
                    <Typography variant="body5" weight="semibold">
                      {variant}
                    </Typography>
                    <Typography className={metricText} variant="body5" tone="subtle">
                      {variantMetrics(variant)}
                    </Typography>
                  </HStack>
                  <Box
                    minW="0"
                    minH="12"
                    py="3"
                    display="flex"
                    alignItems="center"
                    overflowWrap="anywhere"
                  >
                    <Typography variant={variant}>{text}</Typography>
                  </Box>
                  <HStack as="code" className={codeStyle}>
                    {`<Typography variant="${variant}">${text}</Typography>`}
                    <Button
                      className={copyButton}
                      type="button"
                      variant="icon"
                      size={32}
                      aria-label={`${variant} 코드 복사`}
                      title="코드 복사"
                      onClick={() => copyVariant(variant, text)}
                    >
                      <Icon fontAwesomeIcon={faCopy} size={16} />
                    </Button>
                  </HStack>
                </Stack>
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
      <GuideCopyToast notice={copyNotice} onDismiss={dismissCopyNotice} />
      <GuideTimeline
        title="타이포그래피 유형"
        entries={groups.map(({ id, title, description }) => ({ id, title, description }))}
      />
    </Grid>
  );
}
