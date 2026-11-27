/**
 * [개발팀 바인딩]
 * ReviewListEntry.id에 실제 구매/리뷰 식별자를 전달하고 product/purchasedAt/review를 같은 행으로 매핑합니다.
 * 현재 WrittenReview 제출 계약은 rating/body입니다. 파일 업로드 계약은 없으므로 사진 리뷰를 연동할 경우 소유자 계약을 먼저 확장해야 합니다.
 */

export type ReviewTab = 'ready' | 'written';

export type WrittenReview = { rating: number; body: string };

export type ReviewListEntry = {
  id: number | string;
  product: { name: string; imageSrc: string; optionLabel: string; gender?: string; price?: string };
  purchasedAt: string;
  review?: WrittenReview;
};
