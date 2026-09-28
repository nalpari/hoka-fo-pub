import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { css, cva } from 'styled-system/css';

const root = cva({
  base: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    gap: '16px',
  },
  variants: {
    divider: {
      none: {},
      line: { pb: '16px', borderBottom: '1px solid var(--line)' },
      strong: { pb: '16px', borderBottom: '2px solid #111' },
    },
    spacing: { none: {}, page: { mb: '30px' } },
  },
  defaultVariants: { divider: 'none', spacing: 'none' },
});

const eyebrowStyle = css({
  display: 'block',
  color: '#0082ca',
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '.08em',
});
const descriptionStyle = css({ m: '8px 0 0', color: '#666', fontSize: '13px' });

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
        <Heading
          className={[
            cva({
              base: { m: '0' },
              variants: {
                size: {
                  sm: { fontSize: '18px' },
                  md: { fontSize: '21px', _mobile: { fontSize: '20px' } },
                  lg: { fontSize: '28px', _mobile: { fontSize: '26px' } },
                  xl: { fontSize: '32px', _mobile: { fontSize: '28px' } },
                },
              },
            })({ size: titleSize }),
            titleClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {title}
        </Heading>
        {description ? <p className={descriptionStyle}>{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </header>
  );
}
