import { CartContent } from '@/app/cart/_components/CartContent';
import { CartModalPreview } from '@/app/cart/_components/CartModalPreview';

/** 장바구니 수량 제한 안내 시안을 표시합니다. (Displays the cart quantity limit preview.) */
export default function Page() {
  return (
    <>
      <CartContent />
      <CartModalPreview kind="limit" />
    </>
  );
}
