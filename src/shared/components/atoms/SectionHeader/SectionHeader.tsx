import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { css, cva } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const root = cva({
  base: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    gap: '4',
  },
  variants: {
    divider: {
      none: {},
      line: { pb: '4', borderBottom: '1px solid var(--line)' },
      strong: { pb: '4', borderBottom: '2px solid var(--color-black-100)' },
    },
    spacing: { none: {}, page: { mb: '30px' } },
  },
  defaultVariants: { divider: 'none', spacing: 'none' },
});

const eyebrowStyle = css({
  display: 'block',
  color: 'var(--hoka-brand)',
  letterSpacing: 'mono',
});
const descriptionStyle = css({ m: '8px 0 0' });

export type SectionHeaderProps<T extends ElementType = 'h2'> = Omit<
  ComponentPropsWithoutRef<'header'>,
  'title'
> & {
  title: ReactNode;
  titleAs?: T;
  eyebrow?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  divider?: 'none' | 'line' | 'strong';
  spacing?: 'none' | 'page';
  titleClassName?: string;
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';
};

/** Reusable page and section heading with optional supporting content and action slot. */
export function SectionHeader<T extends ElementType = 'h2'>({
  title,
  titleAs,
  eyebrow,
  description,
  action,
  divider,
  spacing,
  className,
  titleClassName,
  titleSize = 'md',
  ...props
}: SectionHeaderProps<T>) {
  const Heading = titleAs ?? 'h2';

  return (
    <header
      {...props}
      className={[root({ divider, spacing }), className].filter(Boolean).join(' ')}
    >
      <div>
        {eyebrow ? <small className={eyebrowStyle}>{eyebrow}</small> : null}
        <Typography
          as={Heading as ElementType}
          className={[css({ m: '0' }), titleClassName].filter(Boolean).join(' ')}
          variant={titleSize === 'lg' || titleSize === 'xl' ? 'heading' : 'body'}
        >
          {title}
        </Typography>
        {description ? (
          <Typography as="p" className={descriptionStyle} tone="subtle" variant="meta">
            {description}
          </Typography>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </header>
  );
}
