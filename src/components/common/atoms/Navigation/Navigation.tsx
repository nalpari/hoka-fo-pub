import { Button as BaseButton } from '@base-ui/react/button';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { css, cva } from 'styled-system/css';
import { circle } from 'styled-system/patterns';

const navigationButton = cva({
  base: {
    flexShrink: '0',
    border: '0',
    p: '0',
    bg: 'transparent',
    color: 'black.100',
    cursor: 'pointer',
    _hover: { color: 'black.40' },
    _disabled: { color: 'black.40', cursor: 'not-allowed' },
    _focusVisible: { outline: '2px solid currentColor', outlineOffset: '2px' },
  },
  variants: {
    whiteBg: {
      true: { bg: 'white.0', boxShadow: '2' },
      false: {},
    },
  },
  defaultVariants: { whiteBg: false },
});

const glyph = css({
  display: 'block',
  width: 'var(--navigation-icon-size)',
  height: 'var(--navigation-icon-size)',
  backgroundColor: 'currentColor',
  maskImage: 'url(/images/icon/navigation/chevron-right.svg)',
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  transform: 'rotate(var(--navigation-icon-rotation))',
  WebkitMaskImage: 'url(/images/icon/navigation/chevron-right.svg)',
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
});

const rotationByDirection = {
  right: '0deg',
  down: '90deg',
  left: '180deg',
  up: '-90deg',
} as const;

export type NavigationDirection = keyof typeof rotationByDirection;

export type NavigationProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'size'> & {
  direction?: NavigationDirection;
  iconSize?: CSSProperties['width'];
  size?: CSSProperties['width'];
  whiteBg?: boolean;
};

export function Navigation({
  className,
  direction = 'right',
  disabled,
  iconSize = '24px',
  size,
  style,
  type = 'button',
  whiteBg = false,
  ...props
}: NavigationProps) {
  const resolvedSize = size ?? (whiteBg ? '48px' : iconSize);

  return (
    <BaseButton
      {...props}
      className={[navigationButton({ whiteBg }), circle({ size: resolvedSize }), className]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      style={
        {
          '--navigation-icon-size': iconSize,
          '--navigation-icon-rotation': rotationByDirection[direction],
          ...style,
        } as CSSProperties
      }
      type={type}
    >
      <span aria-hidden="true" className={glyph} />
    </BaseButton>
  );
}
