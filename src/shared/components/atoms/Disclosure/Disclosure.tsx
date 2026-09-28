import type { ReactNode } from 'react';
import { css, cva } from 'styled-system/css';
import { ToggleButton } from '@/shared/components/atoms/ToggleButton/ToggleButton';

const root = cva({
  base: { borderBottom: '1px solid var(--disclosure-border, #dfe3e8)' },
  variants: { tone: { default: {}, strong: { '--disclosure-border': '#111' } } },
  defaultVariants: { tone: 'default' },
});
const trigger = css({
  display: 'flex',
  justifyContent: 'space-between',
  w: '100%',
  py: '22px',
  px: '0',
  border: '0',
  bg: 'transparent',
  textAlign: 'left',
  fontWeight: '700',
});
const content = css({ pb: '22px', color: '#666', lineHeight: '1.6' });

export type DisclosureProps = {
  title: ReactNode;
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tone?: 'default' | 'strong';
  className?: string;
  contentClassName?: string;
};

/** Controlled disclosure primitive for FAQs, notices, and expandable detail rows. */
export function Disclosure({
  title,
  children,
  open,
  onOpenChange,
  tone,
  className,
  contentClassName,
}: DisclosureProps) {
  return (
    <section className={[root({ tone }), className].filter(Boolean).join(' ')}>
      <ToggleButton
        className={trigger}
        expanded={open}
        indicator={false}
        onClick={() => onOpenChange(!open)}
        type="button"
      >
        {title}
        <span aria-hidden="true">{open ? '︿' : '﹀'}</span>
      </ToggleButton>
      {open ? (
        <div className={[content, contentClassName].filter(Boolean).join(' ')}>{children}</div>
      ) : null}
    </section>
  );
}
