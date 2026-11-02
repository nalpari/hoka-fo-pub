'use client';

import { type ReactNode, useCallback, useRef, useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import {
  type HelpTipSide,
  HelpToggletip,
  HelpTooltip,
} from '@/components/common/molecules/HelpTips';

import { faCopy } from '@/icons/fontAwesome';

import { renderGuideCode } from './GuideCode';
import { type GuideCopyNotice, GuideCopyToast } from './GuideCopyToast';
import { GuideTimeline } from './GuideTimeline';

const sides: readonly { side: HelpTipSide; label: string }[] = [
  { side: 'top', label: '상단' },
  { side: 'right', label: '우측' },
  { side: 'bottom', label: '하단' },
  { side: 'left', label: '좌측' },
];

const sections = [
  { id: 'help-tip-usage', title: '사용 기준', description: '툴팁과 토글팁을 구분합니다' },
  { id: 'help-tooltip', title: 'Tooltip', description: '짧은 보조 설명' },
  { id: 'help-toggletip', title: 'Toggletip', description: '제목·설명·액션' },
] as const;

const card = css({
  minW: '0',
  p: '4',
  border: '1px solid token(colors.black.20)',
  borderRadius: '2',
  bg: 'surface.default',
});

const codeRow = css({
  minW: '0',
  justifyContent: 'space-between',
  p: '3',
  overflowWrap: 'anywhere',
  border: '1px solid token(colors.black.20)',
  bg: 'surface.subtle',
  fontSize: '12px',
  lineHeight: '1.5',
});

const copyButton = css({
  flexShrink: '0',
  bg: 'black.10',
  border: '1px solid token(colors.black.40)',
  borderRadius: '4px',
  _hover: { bg: 'black.20!' },
});

function TipExample({
  label,
  code,
  onCopy,
  children,
}: {
  label: string;
  code: string;
  onCopy: (code: string) => void;
  children: ReactNode;
}) {
  return (
    <Stack className={card} gap="3">
      <Typography variant="body4" weight="semibold">
        {label}
      </Typography>
      <HStack justifyContent="center" alignItems="center" minH="120px">
        {children}
      </HStack>
      <HStack as="code" className={codeRow} alignItems="flex-start" gap="3">
        <Box as="span" flex="1" minW="0" overflowWrap="anywhere">
          {renderGuideCode(code)}
        </Box>
        <Button
          aria-label={`${label} 사용 코드 복사`}
          title="코드 복사"
          className={copyButton}
          variant="icon"
          size={32}
          type="button"
          onClick={() => onCopy(code)}
        >
          <Icon fontAwesomeIcon={faCopy} size={16} />
        </Button>
      </HStack>
    </Stack>
  );
}

/** 툴팁과 토글팁의 용도·방향별 사용법을 보여줍니다. (Shows when and where to use tooltips and toggletips.) */
export function HelpTipsGuide() {
  const [notice, setNotice] = useState<GuideCopyNotice | null>(null);
  const nextNoticeId = useRef(0);
  const dismissNotice = useCallback((id: number) => {
    setNotice((current) => (current?.id === id ? null : current));
  }, []);

  async function copyCode(code: string) {
    nextNoticeId.current += 1;
    const id = nextNoticeId.current;
    try {
      await navigator.clipboard.writeText(code);
      setNotice({ id, text: '사용 코드를 복사했습니다.' });
    } catch {
      setNotice({ id, text: '복사하지 못했습니다. 코드를 직접 선택해 복사해 주세요.' });
    }
  }

  return (
    <Grid
      className={css({
        gridTemplateColumns: { base: 'minmax(0, 1fr) 240px', _mobile: 'minmax(0, 1fr)' },
      })}
      alignItems="start"
      gap="4"
      pt="6"
    >
      <Stack minW="0" gap={{ base: '6', _mobile: '4' }}>
        <HStack alignItems="baseline" gap="3" flexWrap="wrap">
          <Typography as="h2" variant="heading8">
            Tooltip / Toggletip
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            도움말의 내용과 상호작용에 맞는 유형을 선택합니다.
          </Typography>
        </HStack>

        <Stack
          as="section"
          id="help-tip-usage"
          gap="3"
          scrollMarginTop="calc(var(--layout-site-header-height) + 16px)"
          aria-labelledby="help-tip-usage-title"
        >
          <Typography as="h3" id="help-tip-usage-title" variant="heading8">
            사용 기준
          </Typography>
          <Stack gap="2">
            <Typography as="p" variant="body4">
              Tooltip: 폼 필드나 용어의 짧은 보조 설명을 표시합니다.
            </Typography>
            <Typography as="p" variant="body4">
              Toggletip: 제목·설명과 확인 버튼처럼 사용자가 조작할 내용을 표시합니다.
            </Typography>
            <Typography as="p" variant="body5" tone="subtle">
              안내 아이콘(i 또는 ?)을 누르면 열리고, 다시 누르거나 바깥을 누르면 닫힙니다.
            </Typography>
          </Stack>
          <HStack gap="6">
            <HStack gap="2">
              <Typography variant="body5">i 아이콘</Typography>
              <HelpTooltip label="정보 아이콘 안내" text="정보 안내 아이콘입니다." />
            </HStack>
            <HStack gap="2">
              <Typography variant="body5">? 아이콘</Typography>
              <HelpTooltip
                label="질문 아이콘 안내"
                icon="question"
                text="질문 안내 아이콘입니다."
              />
            </HStack>
          </HStack>
        </Stack>

        <Stack
          as="section"
          id="help-tooltip"
          gap="3"
          scrollMarginTop="calc(var(--layout-site-header-height) + 16px)"
          aria-labelledby="help-tooltip-title"
        >
          <Typography as="h3" id="help-tooltip-title" variant="heading8">
            Tooltip
          </Typography>
          <Grid columns={{ base: 4, _mobile: 2 }} gap="3">
            {sides.map(({ side, label }) => {
              const code = `<HelpTooltip label="${label} 도움말" text="추가 정보를 확인하세요." side="${side}" />`;
              return (
                <TipExample key={side} label={label} code={code} onCopy={copyCode}>
                  <HelpTooltip
                    label={`${label} 도움말`}
                    text="추가 정보를 확인하세요."
                    side={side}
                  />
                </TipExample>
              );
            })}
          </Grid>
        </Stack>

        <Stack
          as="section"
          id="help-toggletip"
          gap="3"
          scrollMarginTop="calc(var(--layout-site-header-height) + 16px)"
          aria-labelledby="help-toggletip-title"
        >
          <Typography as="h3" id="help-toggletip-title" variant="heading8">
            Toggletip
          </Typography>
          <Grid columns={{ base: 4, _mobile: 2 }} gap="3">
            {sides.map(({ side, label }) => {
              const code = `<HelpToggletip label="${label} 도움말" title="툴팁 타이틀" description="추가 안내 내용입니다." action={{ label: "확인" }} side="${side}" />`;
              return (
                <TipExample key={side} label={label} code={code} onCopy={copyCode}>
                  <HelpToggletip
                    label={`${label} 도움말`}
                    title="툴팁 타이틀"
                    description="추가 안내 내용입니다."
                    action={{ label: '확인' }}
                    side={side}
                  />
                </TipExample>
              );
            })}
          </Grid>
        </Stack>
      </Stack>
      <GuideTimeline title="툴팁 · 토글팁" entries={sections} />
      <GuideCopyToast notice={notice} onDismiss={dismissNotice} />
    </Grid>
  );
}
