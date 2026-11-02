import { CartContent } from '@/app/cart/_components/CartContent';
import { CartModalPreview } from '@/app/cart/_components/CartModalPreview';

/** 장바구니 옵션 변경 시안을 표시합니다. (Displays the cart option change preview.) */
export default function Page() {
  return (
    <>
      <CartContent />
      <CartModalPreview kind="options" />
    </>
  );
}
