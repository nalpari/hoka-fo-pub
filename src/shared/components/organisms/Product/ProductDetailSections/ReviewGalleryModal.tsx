import { useState } from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Backdrop } from '@/shared/components/atoms/Backdrop/Backdrop';
import { Button } from '@/shared/components/atoms/Button/Button';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';

const dialog = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 320px',
  w: 'min(1180px, 100%)',
  maxH: 'calc(100vh - 48px)',
  bg: '#fff',
  _mobile: { display: 'block', w: '100%', maxH: '100vh', overflow: 'auto' },
});

const viewer = css({
  position: 'relative',
  display: 'grid',
  minH: '540px',
  p: '30px 70px 100px',
  placeItems: 'center',
  bg: '#1b1e23',
  _mobile: { minH: '58vh', p: '20px 42px 88px' },
});

const viewerButton = css({
  position: 'absolute',
  top: '50%',
  zIndex: '1',
  p: '8px',
  border: '0',
  bg: 'transparent',
  color: '#fff',
  fontSize: '52px',
  transform: 'translateY(-50%)',
});

const previousImage = css({ left: '16px' });

const nextImage = css({ right: '16px' });

const mainImage = css({
  display: 'grid',
  w: 'min(100%, 620px)',
  h: '100%',
  minH: '420px',
  placeItems: 'center',
  bg: '#d4d7dc',
  color: '#fff',
  _mobile: { minH: '340px' },
});

const carousel = css({
  position: 'absolute',
  right: '0',
  bottom: '20px',
  left: '0',
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
});

const thumbnail = css({
  display: 'grid',
  w: '56px',
  h: '56px',
  p: '3px',
  border: '2px solid transparent',
  placeItems: 'center',
  bg: '#d4d7dc',
  color: '#fff',
  fontSize: '9px',
});

const selectedThumbnail = css({ borderColor: '#111' });

const side = css({
  overflow: 'auto',
  p: '20px',
  '& header': { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', pb: '16px' },
  '& header div': { display: 'grid', gap: '4px' },
  '& header small': { color: '#8b95a5' },
  '& header button': { p: '0', border: '0', fontSize: '26px' },
  '& > strong': { display: 'block', mt: '22px' },
  '& h2': { fontSize: '15px' },
  '& p': { fontSize: '13px', lineHeight: '1.6' },
  '& section': { mt: '30px', pt: '18px', borderTop: '1px solid #e5e7eb' },
  '& section h3': { fontSize: '15px' },
  '& section div': { display: 'flex', gap: '6px' },
});

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
    <Backdrop layer="modal" onClose={onClose} placement="center" tone="black60">
      <section
        aria-label="리뷰 이미지 상세"
        aria-modal="true"
        className={dialog}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <main className={viewer}>
          <IconButton
            aria-label="이전 이미지"
            className={`${viewerButton} ${previousImage}`}
            disabled={imageIndex === 0}
            onClick={() => setImageIndex((index) => index - 1)}
          >
            ‹
          </IconButton>
          <Box className={mainImage}>{review.images[imageIndex]}</Box>
          <IconButton
            aria-label="다음 이미지"
            className={`${viewerButton} ${nextImage}`}
            disabled={imageIndex === review.images.length - 1}
            onClick={() => setImageIndex((index) => index + 1)}
          >
            ›
          </IconButton>
          <Box className={carousel}>
            {review.images.map((image, index) => (
              <Button
                aria-pressed={index === imageIndex}
                className={index === imageIndex ? `${thumbnail} ${selectedThumbnail}` : thumbnail}
                key={image}
                onClick={() => setImageIndex(index)}
              >
                {image}
              </Button>
            ))}
          </Box>
        </main>
        <aside className={side}>
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
                className={index === reviewIndex ? `${thumbnail} ${selectedThumbnail}` : thumbnail}
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
    </Backdrop>
  );
}
