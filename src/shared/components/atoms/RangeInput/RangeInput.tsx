import type { InputHTMLAttributes } from 'react';
import { css } from 'styled-system/css';

const range = css({ w: '100%', m: '0', accentColor: 'var(--range-accent, #0082ca)' });
export type RangeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

/** Native range control with a themeable accent color. */
export function RangeInput({ className, ...props }: RangeInputProps) {
  return <input {...props} type="range" className={[range, className].filter(Boolean).join(' ')} />;
}
