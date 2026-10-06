import { cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

const root = cva({
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2',
    '& button': { minH: '11', borderRadius: '999px', fontSize: '13px', fontWeight: '700' },
    '& button:last-child': { borderColor: '#000', bg: '#000', color: '#fff' },
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
          borderTop: '1px solid #ddd',
          bg: '#fff',
          '& button': { minH: '12', fontSize: '19px', fontWeight: '900' },
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
