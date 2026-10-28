import type { ComponentProps, ReactNode } from 'react';

import { Stack } from 'styled-system/jsx';

import { Typography, type TypographyProps } from '@/components/common/atoms/Typography/Typography';

type TextProps = Omit<TypographyProps<'h2'>, 'as' | 'children'>;

export type ContentHeaderProps = Omit<ComponentProps<typeof Stack>, 'title' | 'children'> & {
  title: ReactNode;
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
  descriptionProps?: TextProps;
};

/** 제목·보조 문구·액션을 선택한 의미와 배치로 표시합니다. (Displays a heading, supporting text, and actions with caller-owned semantics and layout.) */
export function ContentHeader({
  title,
  titleAs = 'h2',
  orientation = 'vertical',
  action,
  titleProps,
  eyebrow,
  eyebrowAs = 'p',
  eyebrowProps,
  textGroupProps,
  description,
  descriptionProps,
  gap = '3',
  ...props
}: ContentHeaderProps) {
  const text = (
    <>
      {eyebrow ? (
        <Typography {...eyebrowProps} as={eyebrowAs}>
          {eyebrow}
        </Typography>
      ) : null}
      <Typography {...titleProps} as={titleAs}>
        {title}
      </Typography>
      {description ? (
        <Typography {...descriptionProps} as="p">
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
