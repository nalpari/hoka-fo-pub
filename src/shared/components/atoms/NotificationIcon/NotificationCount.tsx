import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ComponentPropsWithoutRef } from 'react';
import { css } from 'styled-system/css';
import { Circle } from 'styled-system/jsx';

export type NotificationCountProps = ComponentPropsWithoutRef<'span'> & {
  count?: number;
  max?: number;
};

/** 알림 건수를 작은 원형 배지로 표시합니다. (Displays a notification count in a compact circular badge.) */
export function NotificationCount({
  count = 0,
  max = 99,
  className,
  ...props
}: NotificationCountProps) {
  if (!Number.isFinite(count) || count <= 0) return null;

  const displayCount = count > max ? `${max}+` : count;

  return (
    <Circle
      as="span"
      pos="absolute"
      top="-.3rem"
      right="-4px"
      display="inline-flex"
      size="12px"
      px="2px"
      boxSizing="border-box"
      bg="blue.100"
      textAlign="center"
    >
      <Typography
        variant="body5"
        weight="medium"
        tone="inverse"
        {...props}
        aria-hidden="true"
        className={[css({ fontSize: '8px', lineHeight: '16px' }), className]
          .filter(Boolean)
          .join(' ')}
      >
        {displayCount}
      </Typography>
    </Circle>
  );
}
