import { CartModalPreview } from '../_components/CartModalPreview';
import CartPage from '../page';

/** 장바구니 수량 제한 안내 시안을 표시합니다. (Displays the cart quantity limit preview.) */
export default function Page() {
  return (
    <>
      <CartPage />
      <CartModalPreview kind="limit" />
    </>
  );
}
