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

const badgeText = css.raw({ display: 'block', whiteSpace: 'nowrap' });

const runningSessionBadge = cva({
  base: {
    p: '8px',
  },
  variants: {
    category: {
      Road: { bg: 'citrus.100', color: 'black.100' },
      Trail: { bg: 'mossGreen.100', color: 'white.0' },
    },
  },
});

export type LaunchStatus = 'COMING' | 'IN_STOCK';

export type Promotion = 'Best' | 'New' | 'Exclusive';

export type Promotions = Promotion | readonly Promotion[];

type LabelProps = {
  variant?: 'filled' | 'line';
  tone?: 'primary' | 'tertiary';
  shape?: 'round';
  textProps?: Pick<TypographyProps, 'variant' | 'web' | 'mo' | 'tone' | 'weight'>;
};

export type BadgeProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> &
  (
    | (LabelProps & {
        children?: ComponentPropsWithoutRef<'span'>['children'];
        status?: never;
        promotion?: never;
        promotionTone?: never;
        runningSessionCategory?: never;
        weight?: never;
      })
    | (Omit<LabelProps, 'variant'> & {
        status: LaunchStatus;
        children?: never;
        promotion?: never;
        promotionTone?: never;
        runningSessionCategory?: never;
        variant?: never;
        weight?: never;
      })
    | {
        promotion: Promotions;
        promotionTone?: 'brand' | 'red80';
        runningSessionCategory?: never;
        weight?: TypographyProps['weight'];
        textProps?: never;
        status?: never;
        children?: never;
        variant?: never;
        tone?: never;
        shape?: never;
      }
    | {
        runningSessionCategory: 'Road' | 'Trail';
        textProps?: never;
        status?: never;
        promotion?: never;
        promotionTone?: never;
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
  promotionTone = 'brand',
  runningSessionCategory,
  weight,
  textProps,
  ...props
}: BadgeProps) {
  if (runningSessionCategory !== undefined) {
    return (
      <HStack
        as="span"
        {...props}
        className={[runningSessionBadge({ category: runningSessionCategory }), className]
          .filter(Boolean)
          .join(' ')}
      >
        <Typography variant="body4" weight="regular">
          {runningSessionCategory}
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
                color={promotionTone === 'red80' ? 'red.80' : 'var(--color-text-brand)'}
              />
            )}
            <Typography variant="body4" weight={weight} tone={promotionTone} className={className}>
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
      <Typography
        as="span"
        variant="bodyKr5"
        tone={tone}
        {...textProps}
        className={css(badgeText, !textProps && { lineHeight: '14px!' })}
      >
        {label}
      </Typography>
    </span>
  );
}
