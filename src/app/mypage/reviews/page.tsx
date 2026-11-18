'use client';
import { ReviewsContent } from './_components/ReviewsContent';
/** 상품리뷰의 기본 목록과 편집 마크업을 표시합니다. (Displays the default review list and editor markup.) */
export default function Page() {
  return <ReviewsContent state="ready-list" />;
}
