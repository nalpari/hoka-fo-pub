import type { ComponentProps, ReactNode } from 'react';
import { Stack } from 'styled-system/jsx';
import { Typography, type TypographyProps } from '@/shared/components/atoms/Typography/Typography';

type TextProps = Omit<TypographyProps<'h2'>, 'as' | 'children'>;

export type ContentHeaderProps = Omit<ComponentProps<typeof Stack>, 'title' | 'children'> & {
  title: ReactNode;
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleProps?: TextProps;
  eyebrow?: ReactNode;
  eyebrowProps?: TextProps;
  description?: ReactNode;
  descriptionProps?: TextProps;
};

/** Heading and supporting text; callers choose their semantic level and type scale. */
export function ContentHeader({
  title,
  titleAs = 'h2',
  titleProps,
  eyebrow,
  eyebrowProps,
  description,
  descriptionProps,
  gap = '3',
  ...props
}: ContentHeaderProps) {
  return (
    <Stack gap={gap} {...props}>
      {eyebrow ? (
        <Typography {...eyebrowProps} as="p">
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
    </Stack>
  );
}
