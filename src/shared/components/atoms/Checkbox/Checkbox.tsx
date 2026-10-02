import type { InputHTMLAttributes, ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';

const checkboxStyles = css({ w: '4', h: '4' });

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
};

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <Flex as="label" className={className} alignItems="center" gap="7px" cursor="pointer">
      <input {...props} type="checkbox" className={checkboxStyles} />
      {label}
    </Flex>
  );
}
