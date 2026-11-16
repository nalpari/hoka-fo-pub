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

import { getDescriptionListExamples } from './descriptionListExamples';
import { renderGuideCode } from './GuideCode';
import { GuideTimeline } from './GuideTimeline';

/** 실제 화면의 항목·값 목록과 복사 가능한 코드를 보여줍니다. (Shows real screen description lists and copyable usage code.) */
export function DescriptionListGuide() {
  const platform = usePlatform();
  const descriptionListExamples = getDescriptionListExamples(platform);
  const entries = descriptionListExamples.map(({ id, title, description }) => ({
    id,
    title,
    description,
  }));
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
        <Typography as="h2" variant="heading8">
          DescriptionList · 항목과 값
        </Typography>
        <Typography as="p" variant="body4">
          items의 term은 항목명, description은 값입니다. termProps·descriptionProps로 글자를,
          labelWidth·slotStyles로 배치를 지정합니다.
        </Typography>
        {descriptionListExamples.map((example) => (
          <Stack
            as="section"
            key={example.id}
            id={example.id}
            gap="4"
            p="4"
            border="1px solid token(colors.black.20)"
            scrollMarginTop="calc(var(--layout-site-header-height) + 16px)"
          >
            <Typography as="h3" variant="heading8">
              {example.title}
            </Typography>
            <Typography variant="body5" tone="subtle">
              사용 파일: {example.source}
            </Typography>
            <Link
              href={example.href}
              className={css({ color: 'blue.100', textDecoration: 'underline' })}
            >
              사용 화면 보기 ↗
            </Link>
            <Typography variant="body5" tone="subtle">
              {example.description}
            </Typography>
            {example.preview}
<Typography variant="body4Semibold">
              사용 코드
            </Typography>
            <HStack alignItems="flex-start" gap="3" p="4" bg="surface.subtle" minW="0">
              <Box as="pre" m="0" flex="1" minW="0" overflowX="auto">
                <code>{renderGuideCode(example.code)}</code>
              </Box>
              <Button
                variant="icon"
                size={32}
                title="코드 복사"
                className={css({
                  flexShrink: '0',
                  bg: 'black.10',
                  border: '1px solid token(colors.black.40)',
                  borderRadius: '4px',
                  _hover: { bg: 'black.20!' },
                })}
                aria-label={`${example.title} 사용 코드 복사`}
                onClick={() => copy(example.code)}
              >
                <Icon name="copy-regular" size={18} />
              </Button>
            </HStack>
          </Stack>
        ))}
      </Stack>
      <GuideTimeline title="항목과 값" entries={entries} />
      <Toast notice={notice} onDismiss={dismissNotice} />
    </Grid>
  );
}
