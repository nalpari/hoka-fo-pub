import type { ReactNode } from 'react';
import { HStack } from 'styled-system/jsx';
import { Typography, type TypographyProps } from '@/shared/components/atoms/Typography/Typography';
import {
  Button,
  type ButtonProps,
  type ButtonSizingProps,
} from '@/shared/components/atoms/Button/Button';

type CounterProps =
  | { remaining: number; counter?: never }
  | { remaining?: never; counter: { current: number; total: number } };

type ContentProps = CounterProps & {
  label?: ReactNode;
  labelProps?: Pick<TypographyProps, 'variant' | 'mo' | 'web' | 'weight'>;
  counterProps?: Pick<TypographyProps, 'variant' | 'mo' | 'web'>;
};

export type LoadMoreButtonProps = Omit<ButtonProps, 'children' | 'variant' | 'size'> &
  ButtonSizingProps &
  ContentProps;

/** Shared counter content for load-more buttons and page-action links. */
export function LoadMoreButtonContent({
  remaining,
  counter,
  label = '더보기',
  labelProps,
  counterProps,
}: ContentProps) {
  if (counter === undefined)
    return (
      <>
        {label} ({remaining}) ⌄
      </>
    );

  return (
    <HStack gap="1" justifyContent="center">
      <Typography {...(labelProps ?? { variant: 'cta2', weight: 'semibold' })}>{label}</Typography>
      <Typography {...(counterProps ?? { variant: 'body5' })} tone="tertiary">
        ({counter.current}/{counter.total})
      </Typography>
    </HStack>
  );
}

/** List action with either a remaining-item count or a current/total page counter. */
export function LoadMoreButton({
  remaining,
  counter,
  label,
  labelProps,
  counterProps,
  ...props
}: LoadMoreButtonProps) {
  const contentProps: ContentProps =
    counter !== undefined
      ? { counter, label, labelProps, counterProps }
      : { remaining, label, labelProps, counterProps };

  return (
    <Button {...props}>
      <LoadMoreButtonContent {...contentProps} />
    </Button>
  );
}
