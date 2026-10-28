import type { ComponentPropsWithoutRef } from 'react';

import { css, cva } from 'styled-system/css';

import { Typography } from '@/components/common/atoms/Typography/Typography';

const badge = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    w: 'fit-content',
    minH: '16px',
    px: '8px',
    py: '6px',
  },
  variants: {
    variant: {
      filled: { bg: 'black.20' },
      line: { border: '1px solid var(--color-border-tertiary)' },
    },
    shape: {
      round: { borderRadius: 'full' },
    },
  },
  defaultVariants: { variant: 'filled', shape: 'round' },
});

const badgeText = css({ display: 'block', whiteSpace: 'nowrap', lineHeight: '14px!' });

export type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  variant?: 'filled' | 'line';
  tone?: 'primary' | 'tertiary';
  shape?: 'round';
};

/** 둥근 채움형·라인형 라벨을 표시합니다. (Displays rounded filled and outlined labels.) */
export function Badge({
  variant,
  tone = 'primary',
  shape = 'round',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span {...props} className={[badge({ variant, shape }), className].filter(Boolean).join(' ')}>
      <Typography as="span" variant="bodyKr5" tone={tone} className={badgeText}>
        {children}
      </Typography>
    </span>
  );
}
