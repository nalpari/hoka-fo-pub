import { CartModalPreview } from '../_components/CartModalPreview';
import CartPage from '../page';

/** 장바구니 옵션 변경 시안을 표시합니다. (Displays the cart option change preview.) */
export default function Page() {
  return (
    <>
      <CartPage />
      <CartModalPreview kind="options" />
    </>
  );
}
