import { useRef, useState } from 'react';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Disclosure } from '@/shared/components/molecules/Disclosure/Disclosure';
import { css } from 'styled-system/css';

const sortOptions = css({ minW: '106px' });

const options = ['베스트순', '신상품순', '높은가격순', '낮은가격순'] as const;

type SortOption = (typeof options)[number];

type DesktopProductSortProps = {
  placeholder?: string;
  value: string;
  onChange: (sort: string) => void;
};

/** Desktop product-list sorting control. */
export function DesktopProductSort({ placeholder, value, onChange }: DesktopProductSortProps) {
  const [open, setOpen] = useState(false);

  const selectingWithKeyboard = useRef(false);

  return (
    <div
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <Disclosure onOpenChange={setOpen} open={open} title={placeholder ?? value} variant="panel">
        <div
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
            options={options.map((option) => ({ label: option, value: option }))}
            value={value as SortOption}
          />
        </div>
      </Disclosure>
    </div>
  );
}
