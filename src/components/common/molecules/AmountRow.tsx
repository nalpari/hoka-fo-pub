import type { ComponentProps, ReactNode } from 'react';

import { HStack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

type Props = Omit<ComponentProps<typeof HStack>, 'children'> & {
  label: string;
  amount: number;
  discount?: boolean;
  emphasis?: boolean;
  emphasizeLabel?: boolean;
  action?: ReactNode;
};

/** 금액 합계를 계산하지 않고 전달받은 값으로 표시합니다. (Displays a prepared amount without calculating totals.) */
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
      {emphasis ? (
        <HStack alignItems="baseline" gap="0.5">
          <Typography variant="heading7" tone={discount ? 'error' : undefined}>
            {discount ? '- ' : ''}
            {amount.toLocaleString()}
          </Typography>
          <Typography variant="body3" tone={discount ? 'error' : undefined}>
            원
          </Typography>
        </HStack>
      ) : (
        <Typography variant="body4" tone={discount ? 'error' : undefined}>
          {discount ? '- ' : ''}
          {amount.toLocaleString()}원
        </Typography>
      )}
    </HStack>
  );
}
