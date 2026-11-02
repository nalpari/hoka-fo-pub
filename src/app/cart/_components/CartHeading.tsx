import { ContentHeader } from '@/components/common/molecules/ContentHeader';

/** 장바구니 제목을 표시합니다. (Displays the cart heading.) */
export function CartHeading({ itemCount: _itemCount }: { itemCount?: number }) {
  return (
    <ContentHeader
      title="장바구니"
      titleAs="h1"
      titleProps={{ web: 'heading6', mo: 'heading5' }}
      orientation="horizontal"
      gap="1"
      alignItems="baseline"
      justifyContent="flex-start"
    />
  );
}
