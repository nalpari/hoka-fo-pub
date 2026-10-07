import type { CSSProperties, HTMLAttributes } from 'react';
import { css } from 'styled-system/css';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faUser } from '@/shared/icons/fontAwesome';
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
} as const;

export type NotificationIconVariant = keyof typeof notificationAssetByVariant | 'user';

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
  const asset = variant === 'user' ? undefined : notificationAssetByVariant[variant];

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
          '--notification-icon-mask': asset
            ? `url(/images/icon/notification/${asset})`
            : undefined,
          color: color ?? (hasNotification ? 'var(--color-blue-100)' : undefined),
          ...style,
        } as CSSProperties
      }
    >
      {variant === 'user' ? (
        <Icon aria-hidden="true" fontAwesomeIcon={faUser} size={size} />
      ) : (
        <span aria-hidden="true" className={notificationGlyph} />
      )}
      <NotificationCount count={count} max={maxCount} />
    </span>
  );
}
