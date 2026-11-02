import type { ReactNode } from 'react';

import { css } from 'styled-system/css';

import { Typography, type TypographyProps } from '@/components/common/atoms/Typography';

const message = css({
  '&[data-tone="error"]': { color: 'error' },
  '&[data-tone="success"]': { color: '#16794b' },
  '&[data-tone="info"]': { color: 'text.subtle' },
});

type StatusMessageProps = {
  children: ReactNode;
  tone?: 'error' | 'success' | 'info';
  className?: string;
  id?: string;
  textProps?: Pick<TypographyProps, 'variant' | 'web' | 'mo' | 'tone' | 'weight'> & {
    as?: 'p' | 'span';
  };
};

/** 폼 검증과 요청 상태를 접근 가능한 안내로 표시합니다. (Displays accessible form validation and request feedback.) */
export function StatusMessage({
  children,
  tone = 'info',
  className,
  id,
  textProps,
}: StatusMessageProps) {
  const isError = tone === 'error';

  return (
    <Typography
      as="p"
      id={id}
      aria-live={isError ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={[textProps?.tone ? undefined : message, className].filter(Boolean).join(' ')}
      data-tone={tone}
      role={isError ? 'alert' : 'status'}
      variant="body5"
      {...textProps}
    >
      {children}
    </Typography>
  );
}
