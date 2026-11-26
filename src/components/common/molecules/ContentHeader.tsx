import type { ComponentProps, ReactNode } from 'react';

import { cx, sva } from 'styled-system/css';
import { Flex, Stack } from 'styled-system/jsx';

import { Typography, type TypographyProps } from '@/components/common/atoms/Typography';

const contentHeaderRecipe = sva({
  slots: ['title', 'count'],
  variants: {
    variant: {
      standard: {},
      productSection: {
        title: {
          _mobile: {
            '&&': {
              fontFamily: 'ko',
              fontStyle: 'normal',
              fontSize: 'heading.20',
              fontWeight: '900',
              lineHeight: 'koreanHeading',
              letterSpacing: 'korean',
              color: 'black.100',
            },
          },
        },
        count: {
          _mobile: {
            '&&': {
              fontFamily: 'en',
              fontStyle: 'normal',
              fontSize: 'body.20',
              fontWeight: '500',
              lineHeight: 'body',
              letterSpacing: '0',
              color: 'black.100',
            },
          },
        },
      },
    },
  },
  defaultVariants: { variant: 'standard' },
});

type TextProps = Omit<TypographyProps<'h2'>, 'as' | 'children'>;

export type ContentHeaderProps = Omit<
  ComponentProps<typeof Stack>,
  'title' | 'children' | 'prefix'
> & {
  title: ReactNode;
  /** Optional presentation; defaults to standard without style overrides. */
  variant?: 'standard' | 'productSection';
  /** Optional title prefix; omission/undefined preserves the existing title DOM. */
  prefix?: ReactNode;
  /** Optional title suffix, such as a badge. */
  suffix?: ReactNode;
  /** Optional parenthesized count; zero is displayed. */
  count?: number;
  countProps?: Omit<TypographyProps<'span'>, 'as' | 'children'>;
  orientation?: 'vertical' | 'horizontal';
  action?: ReactNode;
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleProps?: TextProps;
  eyebrow?: ReactNode;
  eyebrowAs?: 'p' | 'small';
  eyebrowProps?: TextProps;
  /** Horizontal headers can keep the text together even without supporting text. */
  textGroupProps?: Omit<ComponentProps<typeof Stack>, 'children'>;
  description?: ReactNode;
  descriptionAs?: 'p' | 'time' | 'div';
  descriptionProps?: TextProps & { dateTime?: string };
};

/** 제목·보조 문구·액션을 선택한 의미와 배치로 표시합니다. (Displays a heading, supporting text, and actions with caller-owned semantics and layout.) */
export function ContentHeader({
  title,
  variant = 'standard',
  prefix,
  suffix,
  count,
  countProps,
  titleAs = 'h2',
  orientation = 'vertical',
  action,
  titleProps,
  eyebrow,
  eyebrowAs = 'p',
  eyebrowProps,
  textGroupProps,
  description,
  descriptionAs = 'p',
  descriptionProps,
  gap = '3',
  ...props
}: ContentHeaderProps) {
  const classes = contentHeaderRecipe({ variant });
  const text = (
    <>
      {eyebrow ? (
        <Typography {...eyebrowProps} as={eyebrowAs}>
          {eyebrow}
        </Typography>
      ) : null}
      <Typography {...titleProps} as={titleAs} className={cx(classes.title, titleProps?.className)}>
        {prefix != null || suffix != null || count != null ? (
          <Flex as="span" display="inline-flex" alignItems="baseline" flexWrap="wrap" gap="0.25em">
            {prefix}
            <span>{title}</span>
            {count != null ? (
              <Typography
                language="en"
                weight="medium"
                {...countProps}
                as="span"
                className={cx(classes.count, countProps?.className)}
              >
                ({count})
              </Typography>
            ) : null}
            {suffix}
          </Flex>
        ) : (
          title
        )}
      </Typography>
      {description ? (
        <Typography {...descriptionProps} as={descriptionAs}>
          {description}
        </Typography>
      ) : null}
    </>
  );

  const horizontal = orientation === 'horizontal';

  return (
    <Stack
      direction={horizontal ? 'row' : 'column'}
      alignItems={horizontal ? 'center' : undefined}
      justifyContent={horizontal ? 'space-between' : undefined}
      gap={gap}
      {...props}
    >
      {horizontal && (eyebrow || description || textGroupProps) ? (
        <Stack gap={gap} {...textGroupProps}>
          {text}
        </Stack>
      ) : (
        text
      )}
      {action}
    </Stack>
  );
}
