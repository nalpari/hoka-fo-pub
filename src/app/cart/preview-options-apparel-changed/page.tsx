import { CartContent } from '@/app/cart/_components/CartContent';
import { CartModalPreview } from '@/app/cart/_components/CartModalPreview';

/** 의류 옵션을 변경한 상태의 시안을 표시합니다. (Displays the changed apparel option design.) */
export default function Page() {
  return (
    <>
      <CartContent />
      <CartModalPreview kind="apparelChanged" />
    </>
  );
}
