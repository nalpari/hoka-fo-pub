import { cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

const root = cva({
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2',
    '& button': { minH: '11', borderRadius: '999px', fontSize: '14' /* 기존 13px */, fontWeight: 'bold' },
    '& button:last-child': {
      borderColor: 'var(--color-black-100)',
      bg: 'var(--color-black-100)',
      color: 'var(--color-white-000)',
    },
  },
  variants: {
    placement: {
      inline: { mt: '6', _mobile: { display: 'none' } },
      fixed: {
        display: 'none',
        _mobile: {
          position: 'fixed',
          right: '0',
          bottom: '0',
          left: '0',
          zIndex: '20',
          display: 'grid',
          p: '4',
          borderTop: '1px solid var(--color-black-20)',
          bg: 'var(--color-white-000)',
          '& button': { minH: '12', fontSize: '20' /* 기존 19px */, fontWeight: 'black' },
        },
      },
    },
  },
});

type ProductPurchaseActionsProps = {
  placement: 'inline' | 'fixed';
  onAddToCart: () => void;
  onOrder: () => void;
};

export function ProductPurchaseActions({
  placement,
  onAddToCart,
  onOrder,
}: ProductPurchaseActionsProps) {
  return (
    <div className={root({ placement })}>
      <Button onClick={onAddToCart}>장바구니</Button>
      <Button onClick={onOrder}>구매하기</Button>
    </div>
  );
}
