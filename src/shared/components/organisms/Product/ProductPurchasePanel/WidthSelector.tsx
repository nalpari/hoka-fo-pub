import { ProductButtonOptionList } from '@/shared/components/organisms/Product/ProductPurchasePanel/ProductButtonOptionList';
import { css } from 'styled-system/css';

const options = css({
  display: 'flex',
  w: 'fit-content',
  minW: '160px',
  my: '12px 22px',
  overflow: 'hidden',
  borderRadius: 'full',
  bg: '#e9eaec',
  '& [role="radio"]': { minW: '132px', minH: '11', border: '0', bg: 'transparent', color: '#111' },
});
const selected = css({ bg: '#111 !important', color: '#fff !important' });

type WidthSelectorProps = {
  widths: string[];
  value: string;
  onChange: (width: string) => void;
};

/** 선택한 색상에서 제공되는 발볼 옵션을 선택합니다. */
export function WidthSelector({ widths, value, onChange }: WidthSelectorProps) {
  return (
    <ProductButtonOptionList
      ariaLabel="width selector"
      label="발볼"
      listClassName={options}
      onChange={onChange}
      selectedButtonClassName={selected}
      value={value}
      values={widths}
    />
  );
}
