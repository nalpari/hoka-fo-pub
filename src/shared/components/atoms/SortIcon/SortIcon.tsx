import type { CSSProperties, HTMLAttributes } from 'react';
import { css } from 'styled-system/css';

const sortIcon = css({
  display: 'inline-block',
  flexShrink: '0',
  width: 'var(--sort-icon-size)',
  height: 'calc(var(--sort-icon-size) * 1.5)',
  backgroundColor: 'currentColor',
  maskImage: 'url(/images/icon/form/sort-down.svg)',
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  transform: 'rotate(var(--sort-icon-rotation))',
  WebkitMaskImage: 'url(/images/icon/form/sort-down.svg)',
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
});

const rotationByDirection = {
  asc: '180deg',
  desc: '0deg',
} as const;

export type SortIconDirection = keyof typeof rotationByDirection;

export type SortIconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
  color?: CSSProperties['color'];
  direction?: SortIconDirection;
  disabled?: boolean;
  size?: CSSProperties['width'];
};

export function SortIcon({
  className,
  color,
  direction = 'desc',
  disabled = false,
  size = '12px',
  style,
  ...props
}: SortIconProps) {
  return (
    <span
      {...props}
      aria-hidden={props['aria-label'] ? undefined : true}
      className={[sortIcon, className].filter(Boolean).join(' ')}
      role={props['aria-label'] ? 'img' : undefined}
      style={
        {
          '--sort-icon-size': size,
          '--sort-icon-rotation': rotationByDirection[direction],
          color: color ?? (disabled ? 'var(--colors-black-40)' : undefined),
          ...style,
        } as CSSProperties
      }
    />
  );
}
