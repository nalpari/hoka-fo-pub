import { Button } from '@/shared/components/atoms/Button/Button';
import { ProductButtonOptionList } from '@/shared/components/organisms/Product/ProductPurchasePanel/ProductButtonOptionList';
import { css } from 'styled-system/css';

const options = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
  my: '12px 22px',
  '& button': { w: '58px', minH: '11' },
});
const selected = css({
  borderColor: '#0082ca !important',
  bg: '#0082ca !important',
  color: '#fff !important',
});
const guide = css({
  p: '0',
  border: '0',
  color: '#0082ca',
  fontSize: '14px',
  textDecoration: 'underline',
});

type SizeSelectorProps = {
  sizes: string[];
  soldOut: string[];
  value: string;
  onChange: (size: string) => void;
  onOpenGuide?: () => void;
};

/** 상품 사이즈 선택과 선택 가능한 사이즈 가이드 진입점을 제공합니다. */
export function SizeSelector({ sizes, soldOut, value, onChange, onOpenGuide }: SizeSelectorProps) {
  const guideAction = onOpenGuide ? (
    <Button className={guide} onClick={onOpenGuide}>
      사이즈 가이드
    </Button>
  ) : undefined;

  return (
    <ProductButtonOptionList
      action={guideAction}
      ariaLabel="size selector"
      disabledValues={soldOut}
      label="사이즈"
      listClassName={options}
      onChange={onChange}
      selectedButtonClassName={selected}
      value={value}
      values={sizes}
    />
  );
}
