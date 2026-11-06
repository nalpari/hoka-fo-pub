'use client';

import { useCallback, useRef, useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';
import { token } from 'styled-system/tokens';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { renderGuideCode } from './GuideCode';
import { type GuideCopyNotice, GuideCopyToast } from './GuideCopyToast';
import { GuideTimeline } from './GuideTimeline';

// Figma 196:9352의 표기 HEX와 프로젝트 토큰을 대조한 목록입니다.
const colorGroups = [
  {
    id: 'color-base',
    title: 'Base',
    description: '기본 흑백 컬러',
    colors: [
      { name: 'Black100', hex: '#000000', panda: 'black.100', variable: '--color-black-100' },
      { name: 'Black60', hex: '#4D4D4D', panda: 'black.60', variable: '--color-black-60' },
      { name: 'Black50', hex: '#777777', panda: 'black.50', variable: '--color-black-50' },
      { name: 'Black40', hex: '#B3B3B3', panda: 'black.40', variable: '--color-black-40' },
      { name: 'Black20', hex: '#E9EAEB', panda: 'black.20', variable: '--color-black-20' },
      { name: 'Black10', hex: '#F7F7F9', panda: 'black.10', variable: '--color-black-10' },
      { name: 'White', hex: '#FFFFFF', panda: 'white.0', variable: '--color-white-000' },
    ],
  },
  {
    id: 'color-core',
    title: 'Core Colors',
    description: 'HOKA의 핵심 브랜드 컬러',
    colors: [
      {
        name: 'Blue-100',
        hex: '#009DFF',
        panda: 'blue.100',
        variable: '--color-blue-100',
        description: 'HOKA를 대표하는 핵심 컬러입니다.',
      },
      {
        name: 'Citrus-100',
        hex: '#E1FF04',
        panda: 'citrus.100',
        variable: '--color-citrus-100',
        description: 'HOKA Blue와 함께 사용하는 핵심 브랜드 컬러입니다.',
      },
      {
        name: 'Off-White-100',
        hex: '#E8EDF3',
        panda: 'offWhite.100',
        variable: '--color-off-white-100',
        description: '배경에는 순백색 대신 Off White를 사용합니다.',
      },
    ],
  },
  {
    id: 'color-secondary',
    title: 'Secondary',
    description: '보조 브랜드 컬러',
    colors: [
      {
        name: 'Moss Green-100',
        hex: '#5E661F',
        panda: 'mossGreen.100',
        variable: '--color-moss-green-100',
        description: 'HOKA Blue와 함께 브랜드 아이덴티티를 표현합니다.',
      },
    ],
  },
  {
    id: 'color-accent',
    title: 'Accent',
    description: '강조·피드백 컬러',
    colors: [
      {
        name: 'Red-100',
        hex: '#A60000',
        panda: 'red.100',
        variable: '--color-red-100',
        description: '에러 피드백을 표현하는 데 사용합니다.',
      },
      {
        name: 'Red-80',
        hex: '#E10F00',
        panda: 'red.80',
        variable: '--color-red-80',
        description:
          'Figma의 표기 HEX 기준입니다. 원본 색상 칸은 회색으로 표시되어 있어 표기값과 다릅니다.',
      },
    ],
  },
] as const;

type GuideColor = (typeof colorGroups)[number]['colors'][number];

const sections = [
  { id: 'color-usage', title: '사용 기준', description: 'HEX · Panda · CSS 변수 복사' },
  ...colorGroups.map(({ id, title, description }) => ({ id, title, description })),
  { id: 'color-semantic', title: 'Semantic', description: '의미에 따른 색상 사용' },
];

function ColorCopyRow({
  label,
  value,
  name,
  onCopy,
}: {
  label: string;
  value: string;
  name: string;
  onCopy: (value: string) => void;
}) {
  return (
    <HStack
      minW="0"
      alignItems="center"
      gap="3"
      justifyContent="space-between"
      p="3"
      border="1px solid token(colors.black.20)"
      bg="surface.subtle"
    >
      <Stack minW="0" flex="1" gap="1">
        <Typography variant="body5" tone="subtle">
          {label}
        </Typography>
        <Box
          as="code"
          fontSize="12px"
          lineHeight="1.5"
          overflowWrap="anywhere"
          whiteSpace="pre-wrap"
        >
          {renderGuideCode(value)}
        </Box>
      </Stack>
      <Button
        type="button"
        variant="icon"
        size={32}
        title={`${label} 복사`}
        aria-label={`${name} ${label} 복사`}
        onClick={() => onCopy(value)}
        className={css({
          flexShrink: '0',
          bg: 'black.10',
          border: '1px solid token(colors.black.40)',
          borderRadius: '4px',
          _hover: { bg: 'black.20!' },
        })}
      >
        <Icon name="copy-regular" size={18} />
      </Button>
    </HStack>
  );
}

function ColorCard({ color, onCopy }: { color: GuideColor; onCopy: (value: string) => void }) {
  return (
    <Stack
      as="article"
      minW="0"
      p="4"
      gap="3"
      border="1px solid token(colors.black.20)"
      borderRadius="2"
      bg="surface.default"
      aria-label={color.name}
    >
      <Box
        h="88px"
        borderRadius="2"
        border="1px solid token(colors.black.40)"
        style={{ backgroundColor: token.var(`colors.${color.panda}`) }}
        aria-hidden="true"
      />
      <Typography as="h4" variant="body3" weight="semibold">
        {color.name}
      </Typography>
      {'description' in color ? (
        <Typography as="p" variant="body5" tone="subtle">
          {color.description}
        </Typography>
      ) : null}
      <Stack gap="2" mt="auto">
        <ColorCopyRow label="HEX" value={color.hex} name={color.name} onCopy={onCopy} />
        <ColorCopyRow label="Panda 토큰" value={color.panda} name={color.name} onCopy={onCopy} />
        <ColorCopyRow
          label="CSS 변수"
          value={`var(${color.variable})`}
          name={color.name}
          onCopy={onCopy}
        />
        <ColorCopyRow
          label="사용 코드"
          value={`<Box bg="${color.panda}" />`}
          name={color.name}
          onCopy={onCopy}
        />
      </Stack>
    </Stack>
  );
}

/** Figma 컬러와 프로젝트 토큰의 미리보기·복사 기능을 제공합니다. (Provides previews and copy actions for Figma colors and project tokens.) */
export function ColorGuide() {
  const [notice, setNotice] = useState<GuideCopyNotice | null>(null);
  const nextNoticeId = useRef(0);
  const dismissNotice = useCallback((id: number) => {
    setNotice((current) => (current?.id === id ? null : current));
  }, []);

  async function copyValue(value: string) {
    const id = ++nextNoticeId.current;
    try {
      await navigator.clipboard.writeText(value);
      setNotice({ id, text: `${value} 복사했습니다.` });
    } catch {
      setNotice({ id, text: '복사하지 못했습니다. 값을 직접 선택해 복사해 주세요.' });
    }
  }

  return (
    <Grid
      gridTemplateColumns={{ base: 'minmax(0, 1fr) 240px', _mobile: 'minmax(0, 1fr)' }}
      alignItems="start"
      gap="4"
      pt="6"
    >
      <Stack minW="0" gap={{ base: '6', _mobile: '4' }}>
        <HStack alignItems="baseline" gap="3" flexWrap="wrap">
          <Typography as="h2" variant="heading8">
            Colors
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            HOKA 디자인 시스템 · 13개 컬러
          </Typography>
        </HStack>
        <Stack
          as="section"
          id="color-usage"
          aria-labelledby="color-usage-title"
          gap="3"
          scrollMarginTop="calc(var(--layout-site-header-height) + 16px)"
        >
          <Typography as="h3" id="color-usage-title" variant="heading8">
            사용 기준
          </Typography>
          <Typography as="p" variant="body4">
            HEX, Panda 토큰, CSS 변수, 사용 코드를 각각 복사할 수 있습니다. 프로젝트 마크업에서는
            등록된 토큰을 우선 사용합니다.
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            예: Panda 배경은 bg="blue.100", CSS 색상은 var(--color-blue-100)을 사용합니다.
            미리보기는 실제 프로젝트 토큰으로 표시합니다.
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            Figma의 표기 HEX와 프로젝트 값은 모두 일치합니다. Red-80의 회색 색상 칸과 반복된
            Semantic 항목은 아래에 별도로 안내합니다.
          </Typography>
          <a
            href="https://www.figma.com/design/0dCBZJvU7aacxImQTV843M/HOKA-design-system-v1.0?node-id=196-9352"
            target="_blank"
            rel="noreferrer"
            className={css({
              textDecoration: 'underline',
              width: 'fit-content',
              _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
            })}
          >
            <Typography as="span" variant="body5">
              Figma 컬러 원본 보기
            </Typography>
          </a>
        </Stack>
        {colorGroups.map((group) => (
          <Stack
            as="section"
            key={group.id}
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
            <Grid columns={{ base: 4, _mobile: 1 }} gap="3">
              {group.colors.map((color) => (
                <ColorCard key={color.name} color={color} onCopy={copyValue} />
              ))}
            </Grid>
          </Stack>
        ))}
        <Stack
          as="section"
          id="color-semantic"
          aria-labelledby="color-semantic-title"
          gap="3"
          scrollMarginTop="calc(var(--layout-site-header-height) + 16px)"
        >
          <Typography as="h3" id="color-semantic-title" variant="heading8">
            Semantic
          </Typography>
          <Typography as="p" variant="body4">
            Figma의 Sementic 섹션에는 Red-100과 Red-80이 다시 표시되어 있습니다. Red-100은 에러
            피드백에 사용하며, 같은 이름·HEX가 반복되는 Red-80은 Accent 카드 하나로 정리했습니다.
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            프로젝트에 등록된 error 토큰은 red.100을 참조합니다.
          </Typography>
          <ColorCopyRow name="에러 피드백" label="Panda 토큰" value="error" onCopy={copyValue} />
        </Stack>
      </Stack>
      <GuideTimeline title="컬러" entries={sections} />
      <GuideCopyToast notice={notice} onDismiss={dismissNotice} />
    </Grid>
  );
}
