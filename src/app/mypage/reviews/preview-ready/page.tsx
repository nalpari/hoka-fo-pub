import { ReviewStatePreview } from '@/app/mypage/reviews/_components/ReviewStatePreview';

/** 작성 가능한 리뷰 목록 시안을 직접 표시합니다. (Displays the prepared writable review list directly.) */
export default function Page() {
  return <ReviewStatePreview state="ready-list" />;
}
