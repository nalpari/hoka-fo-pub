import { Button as BaseButton } from '@base-ui/react/button';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { css } from 'styled-system/css';
import { circle } from 'styled-system/patterns';

const iconButton = css({
  // display: 'inline-grid',
  placeItems: 'center',
  w: 'var(--icon-button-size)',
  h: 'var(--icon-button-size)',
  minW: 'var(--icon-button-size)',
  minH: 'var(--icon-button-size)',
  border: '0',
  bg: 'transparent',
  color: 'var(--icon-button-color, currentColor)',
  '& svg': { color: 'currentColor' },
  '& svg [fill]:not([fill="none"])': { fill: 'currentColor!' },
  '& svg [stroke]:not([stroke="none"])': { stroke: 'currentColor!' },
  _focusVisible: {
    outline: '4px solid var(--button-focus-ring)',
    outlineOffset: '2px',
  },
  _hover: { bg: 'var(--icon-button-hover-bg, var(--color-black-10))' },
});

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'size'> & {
  color?: CSSProperties['color'];
  size?: string | number;
  shape?: 'square' | 'circle';
  tone?: 'default' | 'inverse' | 'disabled';
};

export function IconButton({
  className,
  type = 'button',
  size,
  shape = 'square',
  color = 'currentColor',
  tone = 'default',
  style,
  ...props
}: IconButtonProps) {
  const resolvedSize = typeof size === 'number' ? `${size}px` : (size ?? '36px');

  const shapeClass =
    shape === 'circle'
      ? circle({
          size: 'var(--icon-button-size)',
          minW: 'var(--icon-button-size)',
          minH: 'var(--icon-button-size)',
        })
      : {
          size: 'var(--icon-button-size)',
          minW: 'var(--icon-button-size)',
          minH: 'var(--icon-button-size)',
        };

  return (
    <BaseButton
      {...props}
      type={type}
      style={
        {
          '--icon-button-size': resolvedSize,
          '--icon-button-color':
            tone === 'inverse'
              ? 'var(--color-white-000)'
              : tone === 'disabled'
                ? 'var(--color-black-40)'
                : color,
          ...style,
        } as CSSProperties
      }
      className={[iconButton, shapeClass, className].filter(Boolean).join(' ')}
    />
  );
}
