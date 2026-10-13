import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonSizingProps } from '@/shared/components/atoms/Button/Button';

export type ToggleButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
  ButtonSizingProps & {
    expanded: boolean;
    children: ReactNode;
    indicator?: boolean;
  };

/** A disclosure control that keeps the semantic expanded state and indicator consistent. */
export function ToggleButton({
  expanded,
  children,
  indicator = true,
  ...buttonProps
}: ToggleButtonProps) {
  const resolvedProps =
    buttonProps.variant === 'link' ||
    buttonProps.variant === 'filterTrigger' ||
    buttonProps.variant === 'headerSearch'
      ? buttonProps
      : { ...buttonProps, variant: buttonProps.variant ?? 'ghost' };

  return (
    <Button {...resolvedProps} aria-expanded={expanded}>
      {children}
      {indicator ? <span aria-hidden="true">{expanded ? '︿' : '﹀'}</span> : null}
    </Button>
  );
}
