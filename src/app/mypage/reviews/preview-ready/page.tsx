import { ReviewsContent } from '@/app/mypage/reviews/_components/ReviewsContent';

/** 작성 가능한 리뷰 목록 시안을 직접 표시합니다. (Displays the prepared writable review list directly.) */
export default function Page() {
  return <ReviewsContent state="ready-list" />;
}
