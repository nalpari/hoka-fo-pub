'use client';

import type { CSSProperties, ReactNode } from 'react';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { css } from 'styled-system/css';

const styles = {
  trigger: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    w: '100%',
    p: 0,
    border: 0,
    bg: 'transparent',
    color: 'inherit',
    textAlign: 'inherit',
    cursor: 'pointer',
  }),
  indicator: css({
    display: 'block',
    flexShrink: 0,
    transition: 'transform 0.15s ease',
    '[data-open] &': { transform: 'rotate(180deg)' },
  }),
  defaultIndicator: css({
    display: 'block',
    w: 'var(--accordion-indicator-size)',
    h: 'var(--accordion-indicator-size)',
    bg: 'currentColor',
    mask: 'url(/images/icon/chevron-down.svg) center / contain no-repeat',
  }),
};

export type AccordionEntry = {
  value: string;
  title: ReactNode;
  content: ReactNode;
};

export type AccordionProps = {
  items: AccordionEntry[];
  multiple?: boolean;
  defaultValue?: string[];
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  panelClassName?: string;
  /** Replaces the default chevron indicator. */
  indicator?: ReactNode;
  indicatorSize?: string;
  indicatorColor?: string;
};

export function Accordion({
  items,
  multiple = true,
  defaultValue,
  className,
  itemClassName,
  triggerClassName,
  panelClassName,
  indicator,
  indicatorSize = '16px',
  indicatorColor = 'currentColor',
}: AccordionProps) {
  const defaultIndicator = (
    <span
      className={styles.defaultIndicator}
      style={
        { '--accordion-indicator-size': indicatorSize, color: indicatorColor } as CSSProperties
      }
    />
  );

  return (
    <BaseAccordion.Root className={className} multiple={multiple} defaultValue={defaultValue}>
      {items.map((item) => (
        <BaseAccordion.Item className={itemClassName} key={item.value} value={item.value}>
          <BaseAccordion.Header>
            <BaseAccordion.Trigger
              className={[styles.trigger, triggerClassName].filter(Boolean).join(' ')}
            >
              {item.title}
              {indicator !== null ? (
                <span className={styles.indicator} aria-hidden="true">
                  {indicator ?? defaultIndicator}
                </span>
              ) : null}
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className={panelClassName}>{item.content}</BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
