import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Button, type ButtonSizingProps } from '@/components/common/atoms/Button/Button';

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
  const content = (
    <>
      {children}
      {indicator ? <span aria-hidden="true">{expanded ? '︿' : '﹀'}</span> : null}
    </>
  );

  if (
    buttonProps.variant === 'link' ||
    buttonProps.variant === 'plain' ||
    buttonProps.variant === 'chip' ||
    buttonProps.variant === 'filterTrigger' ||
    buttonProps.variant === 'headerSearch'
  ) {
    return (
      <Button {...buttonProps} aria-expanded={expanded}>
        {content}
      </Button>
    );
  }

  return (
    <Button {...buttonProps} variant={buttonProps.variant ?? 'ghost'} aria-expanded={expanded}>
      {content}
    </Button>
  );
}
