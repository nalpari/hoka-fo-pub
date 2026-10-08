'use client';

import type { ReactNode } from 'react';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { css } from 'styled-system/css';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faChevronDown } from '@/shared/icons/fontAwesome';

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
    <Icon color={indicatorColor} fontAwesomeIcon={faChevronDown} size={indicatorSize} />
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
