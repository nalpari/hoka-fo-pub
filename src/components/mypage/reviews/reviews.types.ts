import type { RatingValue } from '@/components/common/atoms/RatingStars';

export type ReviewTab = 'ready' | 'written';

export type WrittenReview = { rating: RatingValue; body: string };

export type ReviewListEntry = { id: number; review?: WrittenReview };
