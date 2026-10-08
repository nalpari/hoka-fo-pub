import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { css } from 'styled-system/css';

const fieldset = css({ m: '0', border: '0', p: '0' });
const legend = css({ p: '0', fontWeight: 'bold' });
const visuallyHidden = css({
  position: 'absolute',
  w: '1px',
  h: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
});

export type FieldsetProps = Omit<ComponentPropsWithoutRef<'fieldset'>, 'children'> & {
  legend?: ReactNode;
  children: ReactNode;
  visuallyHiddenLegend?: boolean;
};

/** Semantic grouping primitive for related form controls. */
export function Fieldset({
  legend: label,
  visuallyHiddenLegend = false,
  className,
  children,
  ...props
}: FieldsetProps) {
  return (
    <fieldset {...props} className={[fieldset, className].filter(Boolean).join(' ')}>
      {label ? (
        <legend
          className={[legend, visuallyHiddenLegend ? visuallyHidden : undefined]
            .filter(Boolean)
            .join(' ')}
        >
          {label}
        </legend>
      ) : null}
      {children}
    </fieldset>
  );
}
