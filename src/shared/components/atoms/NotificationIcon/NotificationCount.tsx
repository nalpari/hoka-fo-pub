import type { ComponentPropsWithoutRef } from 'react';
import { css } from 'styled-system/css';

const notificationCount = css({
  position: 'absolute',
  top: '-2px',
  right: '-4px',
  display: 'inline-flex',
  minWidth: '12px',
  height: '12px',
  alignItems: 'center',
  justifyContent: 'center',
  px: '1',
  borderRadius: 'full',
  bg: 'blue.100',
  color: 'white.0',
  fontSize: '8px',
  fontWeight: '400',
  lineHeight: '1',
  textAlign: 'center',
});

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
    <span
      {...props}
      aria-hidden="true"
      className={[notificationCount, className].filter(Boolean).join(' ')}
    >
      {displayCount}
    </span>
  );
}
