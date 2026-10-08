import type { ReactNode } from 'react';
import { cva } from 'styled-system/css';

export type StepIndicatorItem = { label: ReactNode; id?: string };
export type StepIndicatorProps = {
  items: StepIndicatorItem[];
  current: number;
  ariaLabel: string;
  mobileHidden?: boolean;
  className?: string;
};

const list = cva({
  base: {
    display: 'flex',
    gap: '5',
    m: '0',
    p: '0',
    color: 'var(--color-black-40)',
    fontSize: '14',
    listStyle: 'none',
  },
  variants: { mobileHidden: { true: { _mobile: { display: 'none' } }, false: {} } },
  defaultVariants: { mobileHidden: false },
});
const item = cva({
  base: { '& + &::before': { mr: '5', content: '"›"' } },
  variants: {
    current: {
      true: {
        color: 'var(--color-black-100)',
        fontWeight: 'bold',
        textDecoration: 'underline',
        textUnderlineOffset: '9px',
      },
      false: {},
    },
  },
});

/** Ordered progress indicator for checkout, signup, and other multistep flows. */
export function StepIndicator({
  items,
  current,
  ariaLabel,
  mobileHidden,
  className,
}: StepIndicatorProps) {
  return (
    <ol
      aria-label={ariaLabel}
      className={[list({ mobileHidden }), className].filter(Boolean).join(' ')}
    >
      {items.map((itemValue, index) => (
        <li
          aria-current={current === index + 1 ? 'step' : undefined}
          className={item({ current: current === index + 1 })}
          key={itemValue.id ?? index}
        >
          {itemValue.label}
        </li>
      ))}
    </ol>
  );
}
