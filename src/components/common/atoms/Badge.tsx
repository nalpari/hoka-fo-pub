import { Children, type ComponentPropsWithoutRef, Fragment } from 'react';

import { css, cx, sva } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { type ColorToken, token } from 'styled-system/tokens';

import { Divider } from '@/components/common/atoms/Divider';
import { Typography, type TypographyProps } from '@/components/common/atoms/Typography';

import { resolveToneColor } from './Typography.tone';

const badge = sva({
  slots: ['root', 'text', 'list'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      w: 'fit-content',
      minH: '16px',
    },
    text: { lineHeight: '1!' },
  },
  variants: {
    variant: {
      plain: { list: { gap: '1', flexWrap: 'wrap' } },
      filled: { root: { bg: 'black.20' }, text: { display: 'block', whiteSpace: 'nowrap' } },
      outlined: {
        root: { border: '1px solid var(--color-border-tertiary)' },
        text: { display: 'block', whiteSpace: 'nowrap' },
      },
    },
    visual: {
      round: { root: { borderRadius: 'full', px: '8px', py: '6px' } },
      square: { root: { px: '8px', py: '8px' } },
    },
  },
  compoundVariants: [
    {
      variant: 'outlined',
      visual: 'square',
      css: {
        root: {
          bg: 'white.0',
          borderColor: 'var(--color-border-subtle)',
          borderRadius: '2px',
          px: '4px',
          py: '3px',
        },
      },
    },
  ],
  defaultVariants: { variant: 'filled' },
});

const badgeTypography = {
  round: { variant: 'bodyKr5' },
  square: { filled: { variant: 'body4' }, outlined: { web: 'body4', mo: 'body5' } },
} as const;

export type Promotion = 'Best' | 'New' | 'Exclusive';

export type Promotions = Promotion | readonly Promotion[];

export type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  /** Typography 톤, Panda 색상 토큰 또는 CSS 색상입니다. 기본값은 primary입니다. */
  tone?: TypographyProps['tone'];
  weight?: TypographyProps['weight'];
  /** Panda 색상 토큰으로 배경을 지정합니다. 생략하면 variant의 기본 배경을 사용합니다. */
  bg?: ColorToken;
  web?: TypographyProps['web'];
  mo?: TypographyProps['mo'];
} & (
    | { variant?: 'filled' | 'outlined'; visual: 'round' | 'square' }
    | { variant: 'plain'; visual?: never }
  );

/** 문구를 배지로 표시하고 plain 목록의 문구 사이에 구분선을 넣습니다. (Displays a badge and separates multiple plain labels.) */
export function Badge({
  variant,
  visual,
  tone = 'primary',
  weight = 'regular',
  bg,
  web,
  mo,
  children,
  className,
  style,
  ...props
}: BadgeProps) {
  const labels = variant === 'plain' ? Children.toArray(children) : [];
  const styles = badge.raw({ variant, visual });

  const rootStyle = bg ? { backgroundColor: token.var(`colors.${bg}`), ...style } : style;

  const typography: Pick<TypographyProps, 'variant' | 'web' | 'mo'> =
    visual === 'square' ? badgeTypography.square[variant ?? 'filled'] : badgeTypography.round;

  return variant === 'plain' ? (
    labels.length > 0 && (
      <HStack as="span" {...props} css={styles.list} className={className} style={rootStyle}>
        {labels.map((label, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <Divider
                orientation="vertical"
                length="3"
                color="currentColor"
                style={{ color: resolveToneColor(tone) }}
              />
            )}
            <Typography
              variant="body4"
              web={web}
              mo={mo}
              tone={tone}
              weight={weight}
              className={css(styles.text)}
            >
              {label}
            </Typography>
          </Fragment>
        ))}
      </HStack>
    )
  ) : (
    <span {...props} className={cx(css(styles.root), className)} style={rootStyle}>
      <Typography
        variant={typography.variant}
        web={web ?? typography.web}
        mo={mo ?? typography.mo}
        tone={tone}
        weight={weight}
        className={css(styles.text)}
      >
        {children}
      </Typography>
    </span>
  );
}
