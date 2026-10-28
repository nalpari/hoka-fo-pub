import { MyPageInitialStateContext } from '@/context/MyPageInitialState';

import AddressesPage from '@/app/mypage/addresses/page';
import ReviewsPage from '@/app/mypage/reviews/page';
import type { Address } from '@/types/mypage-address.types';

/** 배송지 페이지에 예시 초기 목록을 제공합니다. (Provides initial example addresses to the address page.) */
export function MyPageAddresses({ initialItems }: { initialItems?: Address[] }) {
  return (
    <MyPageInitialStateContext value={{ addresses: initialItems }}>
      <AddressesPage />
    </MyPageInitialStateContext>
  );
}

/** 리뷰 페이지에 예시 초기 수량을 제공합니다. (Provides an initial example count to the review page.) */
export function MyPageReviews({ initialReadyCount }: { initialReadyCount?: number }) {
  return (
    <MyPageInitialStateContext value={{ readyReviewCount: initialReadyCount }}>
      <ReviewsPage />
    </MyPageInitialStateContext>
  );
}
