import { Button as BaseButton } from '@base-ui/react/button';
import type { ButtonHTMLAttributes } from 'react';
import { css } from 'styled-system/css';
import { circle, square } from 'styled-system/patterns';

const iconButton = css({
  display: 'inline-grid',
  placeItems: 'center',
  minW: '36px',
  minH: '36px',
  border: '0',
  bg: 'transparent',
  _focusVisible: {
    outline: '2px solid #111',
    outlineOffset: '2px',
  },
});

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> & {
  size?: string | number;
  shape?: 'square' | 'circle';
};

export function IconButton({
  className,
  type = 'button',
  size,
  shape = 'square',
  ...props
}: IconButtonProps) {
  const resolvedSize = size ?? (shape === 'circle' ? '36px' : undefined);

  const shapeClass = resolvedSize
    ? shape === 'circle'
      ? circle({ size: resolvedSize, minW: resolvedSize, minH: resolvedSize })
      : square({ size: resolvedSize, minW: resolvedSize, minH: resolvedSize })
    : undefined;

  return (
    <BaseButton
      {...props}
      type={type}
      className={[iconButton, shapeClass, className].filter(Boolean).join(' ')}
    />
  );
}
