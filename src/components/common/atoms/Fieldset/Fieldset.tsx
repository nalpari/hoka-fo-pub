import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { css } from 'styled-system/css';

const fieldset = css({ m: '0', border: '0', p: '0' });

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
        <Typography
          as="legend"
          srOnly={visuallyHiddenLegend}
          className={css({ p: '0', fontWeight: 'bold' })}
        >
          {label}
        </Typography>
      ) : null}
      {children}
    </fieldset>
  );
}
