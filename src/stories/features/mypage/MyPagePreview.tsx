import { AddressStatePreview } from '@/app/mypage/addresses/_components/AddressStatePreview';
import { ReviewStatePreview } from '@/app/mypage/reviews/_components/ReviewStatePreview';
import type { Address } from '@/types/mypage-address.types';
/** 배송지 스토리의 준비된 목록을 표시합니다. (Displays the prepared address story data.) */
export function MyPageAddresses({ initialItems }: { initialItems?: Address[] }) {
  return (
    <AddressStatePreview
      state={initialItems?.length === 0 ? 'empty' : 'list'}
      items={initialItems}
    />
  );
}
/** 리뷰 스토리의 준비된 목록 상태를 표시합니다. (Displays the prepared review story state.) */
export function MyPageReviews({ initialReadyCount }: { initialReadyCount?: number }) {
  return <ReviewStatePreview state={initialReadyCount === 0 ? 'empty' : 'ready-list'} />;
}
