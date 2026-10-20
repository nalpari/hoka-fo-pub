import type { ComponentProps } from 'react';
import { css } from 'styled-system/css';

const field = css({
  w: '100%',
  border: '0',
  bg: 'transparent',
  color: 'black.100',
  fontSize: '14px',
  lineHeight: '1.3',
  _focusVisible: { outline: '1px solid var(--colors-black-100)' },
});

export function CheckoutShippingInput(props: Omit<ComponentProps<'input'>, 'className'>) {
  return <input {...props} className={field} />;
}
