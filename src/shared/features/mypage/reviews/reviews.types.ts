import type { RatingValue } from '@/shared/components/atoms/RatingStars/RatingStars';

export type ReviewTab = 'ready' | 'written';

export type WrittenReview = { rating: RatingValue; body: string };

export type ReviewListEntry = { id: number; review?: WrittenReview };
