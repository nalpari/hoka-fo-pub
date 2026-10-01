import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Fieldset } from '@/shared/components/atoms/Fieldset/Fieldset';

type ProductOptionFieldProps = {
  label: string;
  action?: ReactNode;
  children: ReactNode;
};

/** 색상·사이즈처럼 한 가지 옵션을 선택하는 fieldset 기반 영역입니다. */
export function ProductOptionField({ label, action, children }: ProductOptionFieldProps) {
  return (
    <Fieldset
      className={css({
        display: 'grid',
        gridTemplateColumns: 'max-content max-content',
        columnGap: '3',
        minW: '0',
      })}
      legend={label}
    >
      {action && <Box alignSelf="start">{action}</Box>}
      <Box gridColumn="1 / -1">{children}</Box>
    </Fieldset>
  );
}
