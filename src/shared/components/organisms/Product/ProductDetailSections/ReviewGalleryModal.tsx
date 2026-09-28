import { useState } from 'react';
import styles from '@/shared/components/organisms/Product/ProductDetailSections/ReviewGalleryModal.module.scss';
import { Box } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';

export type ReviewGalleryItem = {
  author: string;
  date: string;
  title: string;
  body: string;
  images: readonly string[];
};
type Props = {
  reviews: readonly ReviewGalleryItem[];
  initialReviewIndex: number;
  initialImageIndex: number;
  onClose: () => void;
};

export function ReviewGalleryModal({
  reviews,
  initialReviewIndex,
  initialImageIndex,
  onClose,
}: Props) {
  const [reviewIndex, setReviewIndex] = useState(initialReviewIndex);
  const [imageIndex, setImageIndex] = useState(initialImageIndex);
  const review = reviews[reviewIndex];
  const selectReview = (index: number) => {
    setReviewIndex(index);
    setImageIndex(0);
  };
  return (
    <Box className={styles.backdrop} onMouseDown={onClose} role="presentation">
      <section
        aria-label="리뷰 이미지 상세"
        aria-modal="true"
        className={styles.dialog}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <main className={styles.viewer}>
          <IconButton
            aria-label="이전 이미지"
            disabled={imageIndex === 0}
            onClick={() => setImageIndex((index) => index - 1)}
          >
            ‹
          </IconButton>
          <Box className={styles.mainImage}>{review.images[imageIndex]}</Box>
          <IconButton
            aria-label="다음 이미지"
            disabled={imageIndex === review.images.length - 1}
            onClick={() => setImageIndex((index) => index + 1)}
          >
            ›
          </IconButton>
          <Box className={styles.carousel}>
            {review.images.map((image, index) => (
              <Button
                aria-pressed={index === imageIndex}
                className={index === imageIndex ? styles.selected : undefined}
                key={image}
                onClick={() => setImageIndex(index)}
              >
                {image}
              </Button>
            ))}
          </Box>
        </main>
        <aside className={styles.side}>
          <header>
            <Box>
              <b>{review.author}</b>
              <small>관리자 리뷰 · {review.date}</small>
            </Box>
            <IconButton aria-label="닫기" onClick={onClose}>
              ×
            </IconButton>
          </header>
          <strong>★★★★★</strong>
          <h2>{review.title}</h2>
          <p>{review.body}</p>
          <section>
            <h3>이 상품의 다른 리뷰</h3>
            <Box>
              {reviews.map((item, index) => (
                <Button
                  aria-pressed={index === reviewIndex}
                  className={index === reviewIndex ? styles.active : undefined}
                  key={item.author}
                  onClick={() => selectReview(index)}
                >
                  {item.images[0]}
                </Button>
              ))}
            </Box>
          </section>
        </aside>
      </section>
    </Box>
  );
}
