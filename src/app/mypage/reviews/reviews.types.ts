export type ReviewTab = 'ready' | 'written';

export type WrittenReview = { rating: number; body: string };

export type ReviewListEntry = {
  id: number | string;
  product: { name: string; imageSrc: string; optionLabel: string };
  purchasedAt: string;
  review?: WrittenReview;
};
