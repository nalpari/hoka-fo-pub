import { useRef, useState } from 'react';
import { Radio } from '@/components/common/atoms/Radio/Radio';
import { Disclosure } from '@/components/common/molecules/Disclosure/Disclosure';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { productSortOptions } from './productSortOptions';

const sortOptions = css({ minW: '106px' });

type ProductSortDropdownProps = {
  placeholder?: string;
  value: string;
  onChange: (sort: string) => void;
};

/** 상품 정렬 드롭다운의 선택과 키보드 조작을 관리합니다. (Manages selection and keyboard interaction in the product sort dropdown.) */
export function ProductSortDropdown({ placeholder, value, onChange }: ProductSortDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectingWithKeyboard = useRef(false);

  return (
    <Box
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <Disclosure onOpenChange={setOpen} open={open} title={placeholder ?? value} variant="panel">
        <Box
          onKeyDownCapture={(event) => {
            selectingWithKeyboard.current = event.key === ' ' || event.key.startsWith('Arrow');
          }}
          onPointerDownCapture={() => {
            selectingWithKeyboard.current = false;
          }}
        >
          <Radio
            ariaLabel="상품 정렬"
            className={sortOptions}
            onValueChange={(nextValue) => {
              onChange(nextValue);

              if (!selectingWithKeyboard.current) setOpen(false);

              selectingWithKeyboard.current = false;
            }}
            options={productSortOptions}
            value={value}
          />
        </Box>
      </Disclosure>
    </Box>
  );
}
