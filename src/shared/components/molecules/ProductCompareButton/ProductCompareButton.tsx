import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

const button = css({ mt: '1', borderColor: '#bbb', p: '2', fontSize: '12px' });

export type ProductCompareButtonProps = {
  onClick: () => void;
  selected?: boolean;
};

/** Toggle button for adding or removing a product from comparison. */
export function ProductCompareButton({ onClick, selected = false }: ProductCompareButtonProps) {
  return (
    <Button
      aria-pressed={selected}
      className={button}
      onClick={onClick}
      variant={selected ? 'primary' : 'secondary'}
    >
      {selected ? '비교 선택됨' : '비교하기'}
    </Button>
  );
}
