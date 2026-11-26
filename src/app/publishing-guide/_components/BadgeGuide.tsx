'use client';

import { useCallback, useRef, useState } from 'react';
import { PlatformProvider } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge';
import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Toast, type ToastNotice } from '@/components/common/atoms/Toast';
import { Typography } from '@/components/common/atoms/Typography';

import { renderGuideCode } from './GuideCode';
import { GuideTimeline } from './GuideTimeline';

const styles = {
  copyButton: css({
    flexShrink: '0',
    bg: 'black.10',
    border: '1px solid token(colors.black.40)',
    borderRadius: '4px',
    _hover: { bg: 'black.20!' },
  }),
};

const examples = [
  {
    id: 'badge-labels',
    title: '일반 라벨',
    description:
      '채움형과 테두리형은 visual을 필수로 지정합니다. variant는 채움과 테두리, visual은 모서리, tone은 글자색을 지정합니다.',
    samples: [
      {
        label: '배송완료 · filled',
        preview: (
          <Badge variant="filled" visual="round">
            배송완료
          </Badge>
        ),
        code: '<Badge variant="filled" visual="round">배송완료</Badge>',
      },
      {
        label: '채움형 · tertiary',
        preview: (
          <Badge variant="filled" visual="round" tone="tertiary">
            구매확정
          </Badge>
        ),
        code: '<Badge variant="filled" visual="round" tone="tertiary">구매확정</Badge>',
      },
      {
        label: '결제완료 · 테두리형',
        preview: (
          <Badge variant="outlined" visual="round">
            결제완료
          </Badge>
        ),
        code: '<Badge variant="outlined" visual="round">결제완료</Badge>',
      },
      {
        label: '테두리형 · primary',
        preview: (
          <Badge variant="outlined" visual="round">
            접수완료
          </Badge>
        ),
        code: '<Badge variant="outlined" visual="round">접수완료</Badge>',
      },
      {
        label: '답변완료 · 채움형',
        preview: (
          <Badge variant="filled" visual="round" tone="tertiary">
            답변완료
          </Badge>
        ),
        code: '<Badge variant="filled" visual="round" tone="tertiary">답변완료</Badge>',
      },
      {
        label: '글자 옵션',
        preview: (
          <Badge variant="filled" visual="round" web="b8" mo="b8">
            신청완료
          </Badge>
        ),
        code: '<Badge variant="filled" visual="round" web="b8" mo="b8">신청완료</Badge>',
      },
    ],
  },
  {
    id: 'badge-tone',
    title: '글자색 · tone',
    description: 'Typography 톤, Panda 색상 토큰, CSS 색상값을 직접 지정합니다.',
    samples: [
      {
        label: '브랜드 톤',
        preview: (
          <Badge variant="filled" visual="round" tone="brand">
            New
          </Badge>
        ),
        code: '<Badge variant="filled" visual="round" tone="brand">New</Badge>',
      },
      {
        label: '색상 토큰',
        preview: (
          <Badge variant="filled" visual="round" tone="mossGreen.100">
            Trail
          </Badge>
        ),
        code: '<Badge variant="filled" visual="round" tone="mossGreen.100">Trail</Badge>',
      },
      {
        label: 'CSS 색상',
        preview: (
          <Badge variant="plain" tone="#56318A">
            {['New', 'Exclusive']}
          </Badge>
        ),
        code: '<Badge variant="plain" tone="#56318A">{["New", "Exclusive"]}</Badge>',
      },
    ],
  },
  {
    id: 'badge-background',
    title: '배경색 · bg',
    description:
      'bg에는 Panda 색상 토큰을 지정합니다. 생략하면 배지 종류의 기본 배경을 사용합니다.',
    samples: [
      {
        label: '블루 배경',
        preview: (
          <Badge variant="filled" visual="round" bg="blue.100" tone="inverse">
            New
          </Badge>
        ),
        code: '<Badge variant="filled" visual="round" bg="blue.100" tone="inverse">New</Badge>',
      },
    ],
  },
  {
    id: 'badge-address',
    mobilePreviewSize: 12,
    title: '배송지',
    description: '같은 사각 테두리 배지를 웹 14px과 모바일 12px로 비교합니다.',
    samples: [
      {
        label: '기본 배송지',
        preview: (
          <Badge variant="outlined" visual="square">
            기본 배송지
          </Badge>
        ),
        code: '<Badge variant="outlined" visual="square">기본 배송지</Badge>',
      },
      {
        label: '일반 배송지',
        preview: (
          <Badge variant="outlined" visual="square">
            일반 배송지
          </Badge>
        ),
        code: '<Badge variant="outlined" visual="square">일반 배송지</Badge>',
      },
    ],
  },
  {
    id: 'badge-status',
    title: '출시 상태',
    description: '출시 문구는 children으로, 테두리는 variant로 지정합니다.',
    samples: [
      {
        label: 'COMING',
        preview: (
          <Badge variant="outlined" visual="round">
            COMING SOON
          </Badge>
        ),
        code: '<Badge variant="outlined" visual="round">COMING SOON</Badge>',
      },
      {
        label: 'IN_STOCK',
        preview: (
          <Badge variant="filled" visual="round">
            IN STOCK
          </Badge>
        ),
        code: '<Badge variant="filled" visual="round">IN STOCK</Badge>',
      },
    ],
  },
  {
    id: 'badge-promotion',
    title: '프로모션',
    description: '여러 라벨은 전달한 순서대로 표시하고 사이에 구분선을 넣습니다.',
    samples: [
      {
        label: 'Best',
        preview: (
          <Badge variant="plain" tone="brand">
            Best
          </Badge>
        ),
        code: '<Badge variant="plain" tone="brand">Best</Badge>',
      },
      {
        label: 'New',
        preview: (
          <Badge variant="plain" tone="brand">
            New
          </Badge>
        ),
        code: '<Badge variant="plain" tone="brand">New</Badge>',
      },
      {
        label: 'Exclusive',
        preview: (
          <Badge variant="plain" tone="brand">
            Exclusive
          </Badge>
        ),
        code: '<Badge variant="plain" tone="brand">Exclusive</Badge>',
      },
      {
        label: '복수 · 브랜드 색상',
        preview: (
          <Badge variant="plain" tone="brand">
            {['Best', 'Exclusive']}
          </Badge>
        ),
        code: '<Badge variant="plain" tone="brand">{["Best", "Exclusive"]}</Badge>',
      },
      {
        label: '복수 · red80 / Bold',
        preview: (
          <Badge variant="plain" tone="red80" weight="bold">
            {['New', 'Exclusive']}
          </Badge>
        ),
        code: '<Badge variant="plain" tone="red80" weight="bold">{["New", "Exclusive"]}</Badge>',
      },
      {
        label: '빈 배열 · 표시 없음',
        preview: (
          <Badge variant="plain" tone="brand">
            {[]}
          </Badge>
        ),
        code: '<Badge variant="plain" tone="brand">{[]}</Badge>',
      },
    ],
  },
  {
    id: 'badge-running',
    mobilePreviewSize: 10,
    title: '러닝세션',
    description: 'Road와 Trail의 색상 및 세션 글자 · Bold 옵션입니다.',
    samples: [
      {
        label: 'Road',
        preview: (
          <Badge variant="filled" visual="square" bg="citrus.100" web="b6" mo="b9">
            Road
          </Badge>
        ),
        code: '<Badge variant="filled" visual="square" bg="citrus.100" web="b6" mo="b9">Road</Badge>',
      },
      {
        label: 'Trail',
        preview: (
          <Badge
            variant="filled"
            visual="square"
            bg="mossGreen.100"
            web="b6"
            mo="b9"
            tone="inverse"
          >
            Trail
          </Badge>
        ),
        code: '<Badge variant="filled" visual="square" bg="mossGreen.100" web="b6" mo="b9" tone="inverse">Trail</Badge>',
      },
      {
        label: '세션 글자 · Bold',
        preview: (
          <Badge variant="filled" visual="square" bg="citrus.100" web="b6" mo="b9" weight="bold">
            Road
          </Badge>
        ),
        code: '<Badge variant="filled" visual="square" bg="citrus.100" web="b6" mo="b9" weight="bold">Road</Badge>',
      },
    ],
  },
];

/** 배지 종류별 미리보기와 사용 코드를 표시합니다. (Shows badge previews and usage snippets by type.) */
export function BadgeGuide() {
  const [notice, setNotice] = useState<ToastNotice | null>(null);
  const nextNoticeId = useRef(0);
  const dismissNotice = useCallback((id: number) => {
    setNotice((current) => (current?.id === id ? null : current));
  }, []);

  async function copy(code: string) {
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
        <Typography as="h2" web="h10B" mo="h8">
          Badge · 배지
        </Typography>
        {examples.map((example) => (
          <Stack
            as="section"
            key={example.id}
            id={example.id}
            gap="4"
            p="4"
            border="1px solid token(colors.black.20)"
            scrollMarginTop="calc(var(--layout-site-header-height) + 16px)"
          >
            <Typography as="h3" web="h10B" mo="h8">
              {example.title}
            </Typography>
            <Typography variant="b8" tone="subtle">
              {example.description}
            </Typography>
            <Grid columns={{ base: 2, _mobile: 1 }} gap="3">
              {example.samples.map((sample) => (
                <Stack
                  key={sample.label}
                  gap="3"
                  minW="0"
                  p="3"
                  border="1px solid token(colors.black.20)"
                >
                  <Typography variant="b6S">{sample.label}</Typography>
                  <HStack minH="48px" justifyContent="center">
                    {example.mobilePreviewSize
                      ? (['web', 'mobile'] as const).map((platform) => (
                          <Stack key={platform} gap="2" alignItems="center" flex="1">
                            <Typography variant="b8" tone="subtle">
                              {platform === 'web'
                                ? '웹 · 14px'
                                : `모바일 · ${example.mobilePreviewSize}px`}
                            </Typography>
                            <PlatformProvider platform={platform}>
                              {sample.preview}
                            </PlatformProvider>
                          </Stack>
                        ))
                      : sample.preview}
                  </HStack>
                  <Typography variant="b6S">사용 코드</Typography>
                  <HStack alignItems="flex-start" gap="3" p="4" bg="surface.subtle" minW="0">
                    <Box as="pre" m="0" flex="1" minW="0" overflowX="auto">
                      <code>{renderGuideCode(sample.code)}</code>
                    </Box>
                    <Button
                      variant="icon"
                      size={32}
                      title="코드 복사"
                      className={styles.copyButton}
                      aria-label={`${example.title} ${sample.label} 사용 코드 복사`}
                      onClick={() => copy(sample.code)}
                    >
                      <Icon name="copy-regular" size={18} />
                    </Button>
                  </HStack>
                </Stack>
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
      <GuideTimeline title="배지 유형" entries={examples} />
      <Toast notice={notice} onDismiss={dismissNotice} />
    </Grid>
  );
}
