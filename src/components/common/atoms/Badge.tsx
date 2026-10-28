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
        weight?: never;
      })
    | (Omit<LabelProps, 'variant'> & {
        status: LaunchStatus;
        children?: never;
        promotion?: never;
        variant?: never;
        weight?: never;
      })
    | {
        promotion: Promotions;
        weight?: TypographyProps['weight'];
        status?: never;
        children?: never;
        variant?: never;
        tone?: never;
        shape?: never;
      }
  );

/** 일반 라벨과 출시 상태 또는 프로모션을 표시합니다. (Displays a label, launch status, or promotional labels.) */
export function Badge({
  variant,
  tone = 'primary',
  shape = 'round',
  className,
  children,
  status,
  promotion,
  weight,
  ...props
}: BadgeProps) {
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
