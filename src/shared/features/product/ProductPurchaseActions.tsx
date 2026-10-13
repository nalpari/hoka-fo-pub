import { cva } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { usePlatform } from '@/shared/context/platform';

const root = cva({
  base: {
    gridTemplateColumns: '1fr 1fr',
  },
  variants: {
    placement: {
      inline: { _mobile: { display: 'none' } },
      fixed: {
        display: 'none',
        _mobile: {
          position: 'fixed',
          right: '0',
          bottom: '0',
          left: '0',
          zIndex: '20',
          display: 'grid',
          px: '4',
          pt: '4',
          pb: '8',
          borderTop: '1px solid var(--color-black-20)',
          bg: 'var(--color-white-000)',
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
  const platform = usePlatform();
  return (
    <Grid className={root({ placement })} gap="2">
      <Button
        onClick={onAddToCart}
        variant="primary"
        fullWidth
        size={platform === 'mobile' ? 'short' : 'tall'}
      >
        장바구니
      </Button>
      <Button
        onClick={onOrder}
        variant="secondary"
        fullWidth
        size={platform === 'mobile' ? 'short' : 'tall'}
      >
        구매하기
      </Button>
    </Grid>
  );
}
