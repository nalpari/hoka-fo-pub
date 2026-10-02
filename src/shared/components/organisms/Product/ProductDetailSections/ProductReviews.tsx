'use client';

import { useState } from 'react';
import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { ReviewGalleryModal } from '@/shared/components/organisms/Product/ProductDetailSections/ReviewGalleryModal';
import { Box } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { ToggleButton } from '@/shared/components/atoms/ToggleButton/ToggleButton';
import { css, cva } from 'styled-system/css';

const root = css({ maxW: '760px' });

const reward = css({ m: '0 0 28px', color: '#333 !important', fontWeight: '700' });

const aiSummary = css({
  p: '6',
  bg: '#f5f7fb',
  '& h3': { m: '0 0 14px', fontSize: '18px' },
  '& p': { color: '#8a94a5 !important' },
});

const rating = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1.1fr',
  gap: '34px',
  m: '32px 0',
  px: '38px',
  _mobile: { gridTemplateColumns: '1fr', gap: '22px', px: '0' },
});

const score = css({
  textAlign: 'center',
  '& strong': { display: 'block', fontSize: '42px' },
  '& p': { m: '8px 0', fontSize: '13px' },
  '& small': { color: '#888' },
});

const reviewFilters = css({
  display: 'flex',
  gap: '2',
  overflowX: 'auto',
  py: '18px',
  borderTop: '1px solid #e5e7eb',
});

const reviewFilter = cva({
  base: {
    flex: '0 0 auto',
    px: '3',
    py: '7px',
    border: '1px solid #dfe3e8',
    borderRadius: '18px',
    bg: '#fff',
    fontSize: '12px',
  },
  variants: {
    active: { true: { borderColor: '#111827', bg: '#111827', color: '#fff' }, false: {} },
  },
});

const reviewList = css({
  borderTop: '1px solid #e5e7eb',
  '& article': {
    display: 'grid',
    gridTemplateColumns: '1fr 150px',
    gap: '30px',
    py: '30px',
    borderBottom: '1px solid #e5e7eb',
    _mobile: { gridTemplateColumns: '1fr', gap: '2.5' },
  },
});

const reviewMeta = css({
  display: 'contents',
  '& > span': {
    gridColumn: '1',
    w: 'fit-content',
    px: '1.5',
    py: '1',
    bg: '#f1f3f6',
    fontSize: '11px',
    fontWeight: '700',
  },
  '& > b': { gridColumn: '2', gridRow: '1', _mobile: { gridColumn: '1', gridRow: 'auto' } },
  '& > small': {
    gridColumn: '2',
    gridRow: '2',
    color: '#9aa2af',
    _mobile: { gridColumn: '1', gridRow: 'auto' },
  },
});

const reviewContent = css({
  gridColumn: '1',
  '& > strong': { letterSpacing: '2px' },
  '& h3': { m: '8px 0 4px', fontSize: '14px' },
  '& > p': { fontSize: '13px' },
  '& > button': { px: '0', border: '0', color: '#999', fontSize: '11px' },
});

const reviewPhotos = css({
  display: 'flex',
  gap: '1.5',
  my: '3.5',
  '& button': {
    display: 'grid',
    w: '92px',
    h: '92px',
    placeItems: 'center',
    p: '0',
    border: '0',
    bg: '#d4d7dc',
    color: '#fff',
    fontSize: '10px',
    _mobile: { w: '70px', h: '70px' },
  },
});

const moreButton = css({
  display: 'block',
  mt: '2',
  ml: 'auto',
  color: '#999 !important',
  textDecoration: 'underline',
});

const reviews = [
  {
    author: '이*우',
    date: '2025. 10. 2.',
    title: '블랙 포인트의 디테일과 고급스러운 스웨이드 어퍼가 만족스럽습니다.',
    body: '발을 편안하게 감싸고 장시간 착용해도 안정감이 좋습니다.',
    more: '클래식한 니트와 셔츠 조합, 캐주얼한 재킷에도 잘 어울립니다. 블랙 컬러의 신끈과 라이닝이 전체적인 룩에 균형을 더해줘요.',
    images: ['LOOK 01', 'LOOK 02', 'LOOK 03', 'LOOK 04'],
  },
  {
    author: '윤*현',
    date: '2025. 10. 2.',
    title: '마음에 드는 신발이라 생각하면 신고 나갈 때마다 기분이 좋아집니다.',
    body: '평소 사이즈로 선택했는데 잘 맞고, 색상도 화면과 유사합니다.',
    more: '쿠션감이 과하지 않아 일상에서 오래 걸을 때도 편안했고 소재 마감도 기대 이상으로 깔끔했습니다.',
    images: ['LOOK 02', 'LOOK 03', 'LOOK 04', 'LOOK 05'],
  },
  {
    author: '김*현',
    date: '2025. 10. 2.',
    title: '모던한 컬러웨이와 세련된 디자인이 잘 어울립니다.',
    body: '일상용으로 편하게 신기 좋고 마감도 깔끔합니다.',
    more: '가벼운 러닝과 출퇴근 모두에 활용하고 있으며 발볼도 부담 없이 편안하게 느껴집니다.',
    images: ['LOOK 01', 'LOOK 02', 'LOOK 03'],
  },
] as const;

export function ProductReviews() {
  const [expandedAuthor, setExpandedAuthor] = useState<string | null>(null);
  const [gallery, setGallery] = useState<{ reviewIndex: number; imageIndex: number } | null>(null);
  const [filter, setFilter] = useState('최신순');
  return (
    <Box className={root}>
      <p className={reward}>
        배송 완료 후 30일 이내에 상품평 작성 시, 최대 2,000 마일리지 혜택을 드립니다.
      </p>
      <section className={aiSummary}>
        <h3>✦ AI 리뷰 요약</h3>
        <p>리뷰가 더 모이면, AI가 내용을 정리해 알려드릴게요.</p>
      </section>
      <section className={rating}>
        <Box className={score}>
          <strong>★5.0</strong>
          <p>
            97%가 <b>아주 좋아요</b>라고 평가했습니다.
          </p>
          <small>리뷰 104개</small>
        </Box>
      </section>
      <ToggleGroup
        aria-label="리뷰 정렬"
        className={reviewFilters}
        onValueChange={(values) => {
          const nextFilter = values[0];
          if (nextFilter) setFilter(nextFilter);
        }}
        value={[filter]}
      >
        {['최신순', 'AI 추천순', '별점순'].map((value) => (
          <Toggle
            className={reviewFilter({ active: filter === value })}
            key={value}
            value={value}
          >
            {value}
          </Toggle>
        ))}
      </ToggleGroup>
      <Box className={reviewList}>
        {reviews.map((review, reviewIndex) => {
          const expanded = expandedAuthor === review.author;
          return (
            <article key={review.author}>
              <Box className={reviewMeta}>
                <span>상품평 추천</span>
                <b>{review.author}</b>
                <small>
                  관리자 리뷰
                  <br />
                  {review.date}
                </small>
              </Box>
              <Box className={reviewContent}>
                <strong>★★★★★</strong>
                <h3>{review.title}</h3>
                <p>
                  {review.body}
                  {expanded && (
                    <>
                      <br />
                      {review.more}
                    </>
                  )}
                </p>
                <ToggleButton
                  expanded={expanded}
                  className={moreButton}
                  onClick={() => setExpandedAuthor(expanded ? null : review.author)}
                  type="button"
                >
                  {expanded ? '리뷰 접기' : '리뷰 더보기'}
                </ToggleButton>
                <Box className={reviewPhotos}>
                  {review.images.map((image, imageIndex) => (
                    <IconButton
                      aria-label={`${image} 상세 보기`}
                      key={image}
                      onClick={() => setGallery({ reviewIndex, imageIndex })}
                    >
                      {image}
                    </IconButton>
                  ))}
                </Box>
                <Button size="sm" variant="ghost">
                  신고 및 차단
                </Button>
              </Box>
            </article>
          );
        })}
      </Box>
      {gallery && (
        <ReviewGalleryModal
          initialImageIndex={gallery.imageIndex}
          initialReviewIndex={gallery.reviewIndex}
          onClose={() => setGallery(null)}
          reviews={reviews}
        />
      )}
    </Box>
  );
}
