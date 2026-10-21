import type { ComponentProps, ReactNode } from 'react';
import { HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = Omit<ComponentProps<typeof HStack>, 'children'> & {
  label: string;
  amount: number;
  discount?: boolean;
  emphasis?: boolean;
  emphasizeLabel?: boolean;
  action?: ReactNode;
};

/** Displays a prepared amount without calculating discounts or totals. */
export function AmountRow({
  label,
  amount,
  discount = false,
  emphasis = false,
  emphasizeLabel = false,
  action,
  ...layoutProps
}: Props) {
  const labelContent = (
    <Typography variant="body4" weight={emphasizeLabel ? 'semibold' : undefined}>
      {label}
    </Typography>
  );

  return (
    <HStack justifyContent="space-between" {...layoutProps}>
      {action ? (
        <HStack gap="2">
          {labelContent}
          {action}
        </HStack>
      ) : (
        labelContent
      )}
      <Typography
        variant={emphasis ? 'body3' : 'body4'}
        weight={emphasis ? 'semibold' : undefined}
        tone={discount ? 'error' : undefined}
      >
        {discount ? '- ' : ''}
        {amount.toLocaleString()}원
      </Typography>
    </HStack>
  );
}
