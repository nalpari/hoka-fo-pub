'use client';

import type { ReactNode } from 'react';
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { css } from 'styled-system/css';

const trigger = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  w: '100%',
  p: '0',
  border: '0',
  bg: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  '&[data-panel-open] [data-collapsible-indicator]': { transform: 'rotate(180deg)' },
  _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  _disabled: { cursor: 'not-allowed', opacity: '0.55' },
});

const indicator = css({
  display: 'block',
  flexShrink: 0,
  transition: 'transform 0.15s ease',
});

const defaultIndicator = css({
  display: 'block',
  flexShrink: 0,
});

function DefaultIndicator() {
  return (
    <svg className={defaultIndicator} fill="none" height="8" viewBox="0 0 13 8" width="13">
      <path
        d="M0.480469 0.508114L6.24565 6.2733L11.9805 0.477905"
        stroke="currentColor"
        strokeWidth="1.35887"
      />
    </svg>
  );
}

export type CollapsibleProps = {
  children: ReactNode;
  trigger: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  disabled?: boolean;
  /** Custom indicator. Pass `null` to hide the default chevron. */
  indicator?: ReactNode | null;
  open?: boolean;
  panelClassName?: string;
  triggerClassName?: string;
  onOpenChange?: (open: boolean) => void;
};

/** Reusable expandable region with an accessible Base UI trigger and panel. */
export function Collapsible({
  children,
  trigger: triggerContent,
  className,
  defaultOpen,
  disabled,
  indicator: indicatorContent,
  open,
  panelClassName,
  triggerClassName,
  onOpenChange,
}: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      className={className}
      defaultOpen={defaultOpen}
      disabled={disabled}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
      open={open}
    >
      <BaseCollapsible.Trigger className={[trigger, triggerClassName].filter(Boolean).join(' ')}>
        {triggerContent}
        {indicatorContent !== null ? (
          <span aria-hidden="true" className={indicator} data-collapsible-indicator>
            {indicatorContent ?? <DefaultIndicator />}
          </span>
        ) : null}
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className={panelClassName}>{children}</BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
