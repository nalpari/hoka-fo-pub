import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { css } from 'styled-system/css';
import { Grid, Flex, Box } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';

const styles = {
  backdrop: css({
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    display: 'grid',
    placeItems: 'center',
    p: '6',
    background: 'color-mix(in srgb, var(--color-black-100) 60%, transparent)',
    '@media (max-width: 700px)': { p: 0 },
  }),
  viewport: css({
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    display: 'grid',
    placeItems: 'center',
    p: '6',
    '@media (max-width: 700px)': { p: 0 },
  }),
  dialog: css({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 320px',
    w: 'min(1180px, 100%)',
    maxH: 'calc(100vh - 48px)',
    background: 'var(--color-white-000)',
    '@media (max-width: 700px)': {
      display: 'block',
      w: '100%',
      maxH: '100vh',
      overflow: 'auto',
    },
  }),

  selected: css({ borderColor: 'var(--color-black-100) !important' }),

  active: css({ borderColor: 'var(--color-black-100) !important' }),
};

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
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Viewport className={styles.viewport}>
          <Dialog.Popup aria-label="리뷰 이미지 상세" className={styles.dialog}>
            <Grid
              gap="normal"
              pos="relative"
              minH="540px"
              p="30px 70px 100px"
              placeItems="center"
              background="var(--color-black-100)"
              css={{
                '& > button': {
                  position: 'absolute',
                  top: '50%',
                  zIndex: 1,
                  p: '2',
                  border: 0,
                  background: 'transparent',
                  color: 'var(--color-text-inverse)',
                  fontSize: '50' /* 기존 52px */,
                  transform: 'translateY(-50%)',
                },
                '& > button:first-child': { left: '16px' },
                '& > button:nth-child(3)': { right: '16px' },
                '@media (max-width: 700px)': {
                  minH: '58vh',
                  p: '20px 42px 88px',
                },
              }}
            >
              <IconButton
                aria-label="이전 이미지"
                disabled={imageIndex === 0}
                onClick={() => setImageIndex((index) => index - 1)}
              >
                ‹
              </IconButton>
              <Grid
                gap="normal"
                w="min(100%, 620px)"
                h="100%"
                minH="420px"
                placeItems="center"
                background="var(--color-black-20)"
                color="var(--color-text-inverse)"
                css={{ '@media (max-width: 700px)': { minH: '340px' } }}
              >
                {review.images[imageIndex]}
              </Grid>
              <IconButton
                aria-label="다음 이미지"
                disabled={imageIndex === review.images.length - 1}
                onClick={() => setImageIndex((index) => index + 1)}
              >
                ›
              </IconButton>
              <Flex pos="absolute" right={0} bottom="20px" left={0} justifyContent="center" gap="2">
                {review.images.map((image, index) => (
                  <Button
                    aria-pressed={index === imageIndex}
                    className={[
                      css({
                        '&&': {
                          display: 'grid',
                          w: '56px',
                          h: '56px',
                          p: '3px',
                          border: '2px solid transparent',
                          placeItems: 'center',
                          background: 'var(--color-black-20)',
                          color: 'var(--color-text-inverse)',
                          fontSize: '12' /* 기존: 9px */,
                        },
                      }),
                      index === imageIndex ? styles.selected : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    key={image}
                    onClick={() => setImageIndex(index)}
                  >
                    {image}
                  </Button>
                ))}
              </Flex>
            </Grid>
            <Box as="aside" overflow="auto" p="5">
              <Flex
                as="header"
                justifyContent="space-between"
                borderBottom="1px solid var(--color-black-20)"
                pb="4"
              >
                <Grid gap="1">
                  <b>{review.author}</b>
                  <small className={css({ color: 'var(--color-black-40)' })}>
                    관리자 리뷰 · {review.date}
                  </small>
                </Grid>
                <IconButton
                  aria-label="닫기"
                  onClick={onClose}
                  className={css({ p: 0, border: 0, fontSize: '24' /* 기존 26px */ })}
                >
                  ×
                </IconButton>
              </Flex>
              <strong className={css({ display: 'block', mt: '22px' })}>★★★★★</strong>
              <Typography as="h2" variant="heading9">
                {review.title}
              </Typography>
              <Typography as="p" variant="body4">
                {review.body}
              </Typography>
              <Box as="section" mt="30px" pt="18px" borderTop="1px solid var(--color-black-20)">
                <Typography as="h3" variant="heading9">
                  이 상품의 다른 리뷰
                </Typography>
                <Flex gap="6px">
                  {reviews.map((item, index) => (
                    <Button
                      aria-pressed={index === reviewIndex}
                      className={[
                        // Keep the local overrides above the Button recipe's base styles.
                        css({
                          '&&': {
                            display: 'grid',
                            w: '56px',
                            h: '56px',
                            p: '3px',
                            border: '2px solid transparent',
                            placeItems: 'center',
                            background: 'var(--color-black-20)',
                            color: 'var(--color-text-inverse)',
                            fontSize: '12' /* 기존: 9px */,
                          },
                        }),
                        index === reviewIndex ? styles.active : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      key={item.author}
                      onClick={() => selectReview(index)}
                    >
                      {item.images[0]}
                    </Button>
                  ))}
                </Flex>
              </Box>
            </Box>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
