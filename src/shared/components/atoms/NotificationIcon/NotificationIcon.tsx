import type { CSSProperties, HTMLAttributes } from 'react';
import { css } from 'styled-system/css';
import { NotificationCount } from './NotificationCount';

const notificationIcon = css({
  position: 'relative',
  display: 'inline-flex',
  flexShrink: '0',
  width: 'var(--notification-icon-size)',
  height: 'var(--notification-icon-size)',
  color: 'icon.default',
});

const notificationGlyph = css({
  display: 'block',
  width: '100%',
  height: '100%',
  backgroundColor: 'currentColor',
  maskImage: 'var(--notification-icon-mask)',
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  WebkitMaskImage: 'var(--notification-icon-mask)',
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
});

const notificationAssetByVariant = {
  bag: 'notification-bag.svg',
  basket: 'notification-basket.svg',
  user: 'notification-user.svg',
} as const;

export type NotificationIconVariant = keyof typeof notificationAssetByVariant;

export type NotificationIconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
  variant: NotificationIconVariant;
  count?: number;
  maxCount?: number;
  size?: CSSProperties['width'];
  color?: CSSProperties['color'];
  label?: string;
};

export function NotificationIcon({
  variant,
  count,
  maxCount,
  size = '22px',
  color,
  label,
  className,
  style,
  ...props
}: NotificationIconProps) {
  const hasNotification = Number.isFinite(count) && (count ?? 0) > 0;

  return (
    <span
      {...props}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={[notificationIcon, className].filter(Boolean).join(' ')}
      role={label ? 'img' : undefined}
      style={
        {
          '--notification-icon-size': size,
          '--notification-icon-mask': `url(/images/icon/notification/${notificationAssetByVariant[variant]})`,
          color: color ?? (hasNotification ? 'var(--colors-blue-100)' : undefined),
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className={notificationGlyph} />
      <NotificationCount count={count} max={maxCount} />
    </span>
  );
}
