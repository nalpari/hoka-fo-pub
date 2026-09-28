import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonProps } from '@/shared/components/atoms/Button/Button';

export type ToggleButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
  Pick<ButtonProps, 'size' | 'variant'> & {
    expanded: boolean;
    children: ReactNode;
    indicator?: boolean;
  };

/** A disclosure control that keeps the semantic expanded state and indicator consistent. */
export function ToggleButton({
  expanded,
  children,
  indicator = true,
  variant = 'ghost',
  size,
  ...props
}: ToggleButtonProps) {
  return (
    <Button {...props} aria-expanded={expanded} size={size} variant={variant}>
      {children}
      {indicator ? <span aria-hidden="true">{expanded ? '︿' : '﹀'}</span> : null}
    </Button>
  );
}
