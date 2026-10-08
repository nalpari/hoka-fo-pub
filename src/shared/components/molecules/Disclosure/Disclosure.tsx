'use client';

import type { ReactNode } from 'react';
import { Collapsible } from '@/shared/components/atoms/Collapsible/Collapsible';
import { cva } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';

const root = cva({
  base: { w: '100%' },
  variants: {
    variant: {
      default: { borderBottom: '1px solid var(--color-black-20)' },
      panel: { position: 'relative' },
    },
  },
  defaultVariants: { variant: 'default' },
});

const trigger = cva({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    flexShrink: 0,
    w: '100%',
    border: '0',
    bg: 'transparent',
    textAlign: 'left',
    fontWeight: 'medium',
    fontSize: '16',
    lineHeight: 'body',
    letterSpacing: 'korean',
    color: 'var(--color-black-100)',
  },
  variants: {
    variant: {
      default: { px: '0', py: '22px' },
      panel: {
        gap: '2',
      },
    },
  },
  defaultVariants: { variant: 'default' },
});

const panel = cva({
  variants: {
    variant: {
      default: {},
      panel: {
        position: 'absolute',
        zIndex: 10,
        top: 'calc(100% + 8px)',
        right: '0',
        w: 'max-content',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'border.muted',
        bg: 'var(--color-surface-default)',
        borderRadius: '4px',
      },
    },
  },
  defaultVariants: { variant: 'default' },
});

const content = cva({
  variants: {
    variant: {
      default: { pb: '22px', color: 'var(--color-text-muted)', lineHeight: 'body' },
      panel: { p: '3' },
    },
  },
  defaultVariants: { variant: 'default' },
});

export type DisclosureVariant = 'default' | 'panel';

export type DisclosureProps = {
  title: ReactNode;
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
  indicator?: ReactNode | null;
  panelClassName?: string;
  triggerClassName?: string;
  variant?: DisclosureVariant;
};

/** Styled Collapsible composition for expandable content, rows, and option menus. */
export function Disclosure({
  title,
  children,
  open,
  onOpenChange,
  className,
  contentClassName,
  indicator,
  panelClassName,
  triggerClassName,
  variant = 'default',
}: DisclosureProps) {
  return (
    <Collapsible
      className={[root({ variant }), className].filter(Boolean).join(' ')}
      indicator={indicator}
      onOpenChange={onOpenChange}
      open={open}
      panelClassName={[panel({ variant }), panelClassName].filter(Boolean).join(' ')}
      trigger={title}
      triggerClassName={[trigger({ variant }), triggerClassName].filter(Boolean).join(' ')}
    >
      <Flex className={[content({ variant }), contentClassName].filter(Boolean).join(' ')}>
        {children}
      </Flex>
    </Collapsible>
  );
}
