import { ReviewsContent } from '@/app/mypage/reviews/_components/ReviewsContent';

/** 작성한 리뷰 목록 시안을 직접 표시합니다. (Displays the prepared written review list directly.) */
export default function Page() {
  return <ReviewsContent state="written-list" />;
}
