'use client';

import { useEffect } from 'react';

import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

export type GuideCopyNotice = { id: number; text: string };

const toastStyle = css({
  position: 'fixed',
  top: 'calc(var(--layout-site-header-height) + 16px)',
  left: '50%',
  zIndex: 1000,
  transform: 'translateX(-50%)',
  maxW: 'calc(100vw - 32px)',
  px: '4',
  py: '3',
  borderRadius: 'full',
  bg: 'black.100',
  color: 'white.0',
  boxShadow: '2',
  pointerEvents: 'none',
  textAlign: 'center',
});

/** 복사 결과를 화면 상단에 잠시 알립니다. (Briefly announces copy results at the top of the screen.) */
export function GuideCopyToast({
  notice,
  onDismiss,
}: {
  notice: GuideCopyNotice | null;
  onDismiss: (id: number) => void;
}) {
  useEffect(() => {
    if (!notice) return;

    const timeoutId = window.setTimeout(() => {
      onDismiss(notice.id);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [notice, onDismiss]);

  if (!notice) return null;

  return (
    <Box className={toastStyle} role="status" aria-live="polite">
      <Typography variant="body5" tone="inverse">
        {notice.text}
      </Typography>
    </Box>
  );
}
