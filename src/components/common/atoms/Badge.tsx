import { type ComponentPropsWithoutRef, Fragment } from 'react';

import { css, cva } from 'styled-system/css';
import { Divider, HStack } from 'styled-system/jsx';

import { Typography, type TypographyProps } from '@/components/common/atoms/Typography';

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

const runClubBadge = cva({
  base: {
    h: '28px',
    _mobile: { w: 'fit-content', h: '20px', px: '2', py: '0' },
  },
  variants: {
    category: { Road: { bg: '#dfff00', color: '#000' }, Trail: { bg: '#5d6825', color: '#fff' } },
  },
});

export type LaunchStatus = 'COMING' | 'IN_STOCK';

export type Promotion = 'Best' | 'New' | 'Exclusive';

export type Promotions = Promotion | readonly Promotion[];

type LabelProps = {
  variant?: 'filled' | 'line';
  tone?: 'primary' | 'tertiary';
  shape?: 'round';
};

export type BadgeProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> &
  (
    | (LabelProps & {
        children?: ComponentPropsWithoutRef<'span'>['children'];
        status?: never;
        promotion?: never;
        runClubCategory?: never;
        weight?: never;
      })
    | (Omit<LabelProps, 'variant'> & {
        status: LaunchStatus;
        children?: never;
        promotion?: never;
        runClubCategory?: never;
        variant?: never;
        weight?: never;
      })
    | {
        promotion: Promotions;
        runClubCategory?: never;
        weight?: TypographyProps['weight'];
        status?: never;
        children?: never;
        variant?: never;
        tone?: never;
        shape?: never;
      }
    | {
        runClubCategory: 'Road' | 'Trail';
        status?: never;
        promotion?: never;
        children?: never;
        variant?: never;
        tone?: never;
        shape?: never;
        weight?: never;
      }
  );

/** 일반 라벨·출시 상태·프로모션 또는 런클럽 분류를 표시합니다. (Displays a label, launch status, promotions, or a run club category.) */
export function Badge({
  variant,
  tone = 'primary',
  shape = 'round',
  className,
  children,
  status,
  promotion,
  runClubCategory,
  weight,
  ...props
}: BadgeProps) {
  if (runClubCategory !== undefined) {
    return (
      <HStack
        as="span"
        {...props}
        className={[runClubBadge({ category: runClubCategory }), className]
          .filter(Boolean)
          .join(' ')}
        p="2"
      >
        <Typography variant="body4" mo="body5" weight="bold">
          {runClubCategory}
        </Typography>
      </HStack>
    );
  }

  if (promotion !== undefined) {
    const promotions = typeof promotion === 'string' ? [promotion] : promotion;

    if (promotions.length === 0) return null;

    return (
      <HStack as="span" {...props} gap="1" flexWrap="wrap">
        {promotions.map((label, index) => (
          <Fragment key={`${label}-${index}`}>
            {index > 0 && (
              <Divider
                as="span"
                aria-hidden="true"
                orientation="vertical"
                h="3"
                color="var(--color-text-brand)"
              />
            )}
            <Typography variant="body4" weight={weight} tone="brand" className={className}>
              {label}
            </Typography>
          </Fragment>
        ))}
      </HStack>
    );
  }

  const resolvedVariant = status ? (status === 'COMING' ? 'line' : 'filled') : variant;
  const label = status ? (status === 'COMING' ? 'COMING SOON' : 'IN STOCK') : children;

  return (
    <span
      {...props}
      className={[badge({ variant: resolvedVariant, shape }), className].filter(Boolean).join(' ')}
    >
      <Typography as="span" variant="bodyKr5" tone={tone} className={badgeText}>
        {label}
      </Typography>
    </span>
  );
}
