import type { ComponentProps, ReactNode } from 'react';

import { HStack } from 'styled-system/jsx';

import { Typography, type TypographyProps } from '@/components/common/atoms/Typography';

type Props = Omit<ComponentProps<typeof HStack>, 'children' | 'web' | 'mo'> &
  Pick<TypographyProps, 'web' | 'mo'> & {
    amountWeb?: TypographyProps['web'];
    amountMo?: TypographyProps['mo'];
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
  amountWeb,
  amountMo,
  discount = false,
  emphasis = false,
  emphasizeLabel = false,
  action,
  web,
  mo,
  ...layoutProps
}: Props) {
  const labelContent = (
    <Typography variant="body4" web={web} mo={mo} weight={emphasizeLabel ? 'medium' : undefined}>
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
          <Typography variant="heading7" tone={discount ? 'red80' : undefined}>
            {discount ? '- ' : ''}
            {amount.toLocaleString()}
          </Typography>
          <Typography variant="body3" tone={discount ? 'red80' : undefined}>
            원
          </Typography>
        </HStack>
      ) : amountWeb || amountMo ? (
        <HStack gap="0" whiteSpace="nowrap">
          <Typography
            variant="body4"
            web={amountWeb ?? web}
            mo={amountMo ?? mo}
            language="en"
            tone={discount ? 'red80' : undefined}
            weight="medium"
          >
            {discount ? '-' : ''}
            {amount.toLocaleString()}
          </Typography>
          <Typography
            variant="body4"
            web={amountWeb ?? web}
            mo={amountMo ?? mo}
            tone={discount ? 'red80' : undefined}
          >
            원
          </Typography>
        </HStack>
      ) : (
        <Typography variant="body4" web={web} mo={mo} tone={discount ? 'red80' : undefined}>
          {discount ? '- ' : ''}
          {amount.toLocaleString()}원
        </Typography>
      )}
    </HStack>
  );
}
