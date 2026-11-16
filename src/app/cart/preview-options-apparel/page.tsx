import { CartContent } from '@/app/cart/_components/CartContent';
import { CartModalPreview } from '@/app/cart/_components/CartModalPreview';

/** 의류의 옵션 변경 시안을 표시합니다. (Displays the apparel option change preview.) */
export default function Page() {
  return (
    <>
      <CartContent />
      <CartModalPreview kind="apparelOptions" />
    </>
  );
}
