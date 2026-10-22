import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ComponentPropsWithoutRef } from 'react';
import { Circle } from 'styled-system/jsx';

export type NotificationCountProps = ComponentPropsWithoutRef<'span'> & {
  count?: number;
  max?: number;
};

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
        variant="notificationCount"
        tone="inverse"
        {...props}
        aria-hidden="true"
        className={className}
      >
        {displayCount}
      </Typography>
    </Circle>
  );
}
