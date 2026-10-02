import { Button } from '@/shared/components/atoms/Button/Button';
import { WishlistButton } from '@/shared/components/organisms/Product/ProductPurchasePanel/WishlistButton';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

type PurchaseActionsProps = {
  wish: boolean;
  onWishChange: (pressed: boolean) => void;
  onAddToCart: () => void;
  onOrder: () => void;
};

/** 구매를 주 행동으로, 장바구니·관심상품을 보조 행동으로 제공하는 버튼 영역입니다. */
export function PurchaseActions({
  wish,
  onWishChange,
  onAddToCart,
  onOrder,
}: PurchaseActionsProps) {
  return (
    <Grid gap="2" mt="4">
      <Button
        className={css({
          minH: '14',
          borderColor: '#df0038',
          bg: '#df0038',
          color: '#fff',
          fontSize: '17px',
          fontWeight: '700',
        })}
        onClick={onOrder}
      >
        구매하기
      </Button>
      <Grid gridTemplateColumns="1fr 1fr" gap="2">
        <Button
          className={css({
            minH: '13',
            borderColor: '#111',
            bg: '#fff',
            color: '#111',
            fontWeight: '700',
          })}
          onClick={onAddToCart}
        >
          장바구니
        </Button>
        <WishlistButton onPressedChange={onWishChange} pressed={wish} />
      </Grid>
    </Grid>
  );
}
