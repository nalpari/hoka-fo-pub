'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import { HomeCarouselSection } from '@/shared/components/molecules/HomeCarouselSection/HomeCarouselSection';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';
import { NotFoundPage } from '@/shared/features/not-found/NotFoundPage';
import { usePlatform } from '@/shared/context/platform';
import { products } from '@/mocks/products';
import { runClubBadge } from './RunClubPage';
import {
  runClubImage,
  runClubSessions,
  sessionNotices,
  sessionPrecautions,
  type RunClubSession,
} from './runClub.data';

const styles = {
  hero: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    w: 'min(calc(100% - 110px), 1340px)',
    mx: 'auto',
    py: '72px',
    alignItems: 'center',
    _mobile: {
      w: '100%',
      gridTemplateColumns: '1fr',
      gap: '28px',
      px: 'var(--layout-mobile-inline-gutter)',
      py: '32px',
    },
  }),
  image: css({ w: '100%', h: 'auto', aspectRatio: '1', objectFit: 'cover', display: 'block' }),
  heading: css({
    m: '12px 0 10px',
    fontSize: '36px',
    fontWeight: '900',
    letterSpacing: '-0.04em',
    lineHeight: '1.2',
    _mobile: { fontSize: '28px' },
  }),
  schedule: css({ m: '0 0 24px', fontSize: '16px' }),
  opening: css({ color: 'var(--color-blue-100)', fontSize: '14px', mb: '24px' }),
  facts: css({
    m: '0',
    py: '20px',
    borderBlock: '1px solid var(--color-border-default)',
    fontSize: '16px',
    '& > div': {
      display: 'grid',
      gridTemplateColumns: '64px minmax(0, 1fr)',
      gap: '8px',
      py: '6px',
    },
    '& dt': { fontWeight: '700' },
    '& dd': { m: '0', lineHeight: '1.6' },
    '& small': { display: 'block', color: 'var(--color-text-tertiary)', fontSize: '14px' },
  }),
  notes: css({
    my: '24px',
    fontSize: '14px',
    color: 'var(--color-text-tertiary)',
    lineHeight: '1.8',
    '& p': { m: '0 0 6px' },
    '& ul': { listStyle: 'none', p: '0', m: '0' },
    '& li::before': { content: '"- "' },
  }),
  apply: css({ w: '260px', '& > span': { w: '100%' }, _mobile: { w: '100%' } }),
  guide: css({ bg: 'var(--color-black-10)', py: '72px', _mobile: { py: '40px' } }),
  guideInner: css({
    w: 'min(calc(100% - 110px), 1776px)',
    mx: 'auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    _mobile: {
      w: '100%',
      px: 'var(--layout-mobile-inline-gutter)',
      gridTemplateColumns: '1fr',
      gap: '32px',
    },
  }),
  poster: css({
    color: 'var(--color-blue-100)',
    '& p': { m: '0 0 18px', fontSize: '36px', fontWeight: '900' },
    '& h2': {
      m: '0 0 28px',
      fontSize: '96px',
      fontWeight: '900',
      lineHeight: '1.05',
      letterSpacing: '-0.04em',
      overflowWrap: 'anywhere',
    },
    '& span': { fontSize: '20px' },
    _mobile: {
      '& p': { fontSize: '24px' },
      '& h2': { fontSize: '42px' },
      '& span': { fontSize: '16px' },
    },
  }),
  guideContent: css({
    maxW: '640px',
    '& h2': { m: '0 0 16px', fontSize: '24px', fontWeight: '900' },
    '& > p': { fontSize: '14px', lineHeight: '1.6', mb: '20px' },
    _mobile: { maxW: 'none' },
  }),
  guideFacts: css({
    m: '0',
    fontSize: '14px',
    '& > div': {
      display: 'grid',
      gridTemplateColumns: '64px minmax(0, 1fr)',
      gap: '16px',
      py: '16px',
      borderTop: '1px solid var(--color-border-default)',
    },
    '& > div:last-child': { borderBottom: '1px solid var(--color-border-default)' },
    '& dt': { fontWeight: '700' },
    '& dd': { m: '0', lineHeight: '1.6' },
  }),
  placeholder: css({
    w: 'min(calc(100% - 110px), 1776px)',
    mx: 'auto',
    my: '72px',
    aspectRatio: '2.77',
    bg: '#b3b3b3',
    display: 'grid',
    placeItems: 'center',
    fontSize: '28px',
    fontWeight: '900',
    _mobile: {
      w: 'auto',
      mx: 'var(--layout-mobile-inline-gutter)',
      my: '40px',
      aspectRatio: '1.5',
      fontSize: '20px',
    },
  }),
  recommendations: css({ py: '72px', overflow: 'hidden', _mobile: { py: '40px' } }),
  rail: css({ overflow: 'visible!' }),
  slide: css({
    w: 'calc((100% - 64px) / 5 + 16px)!',
    '&:first-child, &:last-child': { w: 'calc((100% - 64px) / 5 + 8px)!' },
    _mobile: {
      w: '176px!',
      '&:first-child, &:last-child': { w: '176px!' },
      '& > *': { w: '100%' },
    },
  }),
  modalText: css({ m: '0 0 24px' }),
};

const venue = '호카 더현대 서울 매장';

const address = '서울 영등포구 여의대로 108 더현대서울, 3F';

function SessionNotes({ precautions = false }: { precautions?: boolean }) {
  return (
    <aside className={styles.notes} aria-label={precautions ? '주의 사항' : '안내 사항'}>
      <p>{precautions ? '주의 사항' : '안내 사항'} ⓘ</p>
      <ul>
        {(precautions ? sessionPrecautions : sessionNotices).map((notice) => (
          <li key={notice}>{notice}</li>
        ))}
      </ul>
    </aside>
  );
}

type RunClubDetailPageProps = { session?: RunClubSession };

export function RunClubDetailPage({ session: suppliedSession }: RunClubDetailPageProps) {
  const { sessionId } = useParams();
  const platform = usePlatform();
  const [showApplicationNotice, setShowApplicationNotice] = useState(false);
  const session =
    suppliedSession ?? runClubSessions.find((candidate) => candidate.id === sessionId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sessionId]);

  if (!session) return <NotFoundPage />;

  const upcoming = session.status === 'upcoming';
  const recommendedProducts = products.slice(0, 6);
  const guideRows = [
    ['장소', `${venue} · ${address}`],
    ['체크인', '세션 시작 20분 전부터'],
    ['소요시간', '약 1시간 30분 소요'],
    ['코스', session.course],
    ['페이스', '6′30″ / 7′00″ (중급 레벨)'],
    ['거리', session.course.match(/\d+K/)?.[0] ?? '5K'],
    ['준비물', '러닝화, 편안한 복장, 헤드 랜턴'],
    ['혜택', '세션에서 제공되는 선물 & 트라이얼 서비스'],
  ];

  return (
    <main>
      <section className={styles.hero}>
        <img
          className={styles.image}
          src={runClubImage(session.detailImage)}
          alt={`${session.title} 러닝 현장`}
          width={544}
          height={544}
        />
        <div>
          <span className={runClubBadge({ category: session.category })}>{session.category}</span>
          <h1 className={styles.heading}>{session.title}</h1>
          <p className={styles.schedule}>
            {session.schedule} | {session.course}
          </p>
          {upcoming ? <p className={styles.opening}>ⓘ 1월 23일 (토) 10:00 신청 시작</p> : null}
          <dl className={styles.facts}>
            <div>
              <dt>일시</dt>
              <dd>{session.schedule}</dd>
            </div>
            <div>
              <dt>장소</dt>
              <dd>
                {venue}
                <small>{address}</small>
              </dd>
            </div>
            <div>
              <dt>예약금</dt>
              <dd>
                5,000원
                <small>
                  노쇼 방지를 위해 예약금을 받고 있습니다. 현장 출석 확인 후 자동 취소 됩니다.
                </small>
              </dd>
            </div>
            <div>
              <dt>신청 기간</dt>
              <dd>1월 23일 (토) - 1월 29일 (금)</dd>
            </div>
          </dl>
          <SessionNotes />
          <Button
            variant="primary"
            className={styles.apply}
            disabled={session.status !== 'open'}
            onClick={() => setShowApplicationNotice(true)}
          >
            {session.status === 'closed'
              ? '모집 마감'
              : upcoming
                ? '신청이 곧 시작됩니다.'
                : '신청하기'}
          </Button>
        </div>
      </section>
      <section className={styles.guide} aria-label="세션 안내">
        <div className={styles.guideInner}>
          <div className={styles.poster}>
            <p>Hoka Run Club</p>
            <h2>
              {session.category === 'Trail'
                ? 'Bugaksan Uphill Interval Session'
                : 'HOKA Night City Run'}
            </h2>
            <span>
              {session.overlayDate}
              <br />
              @hoka_kr
            </span>
          </div>
          <div className={styles.guideContent}>
            <h2>세션 안내</h2>
            <p>
              호카 런 클럽 {session.title}에서
              <br />
              러너들과 함께 달리며 그룹 러닝의 즐거움을 느껴보세요!
            </p>
            <dl className={styles.guideFacts}>
              {guideRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <SessionNotes precautions />
          </div>
        </div>
      </section>
      {session.id === 'bukchon-night' ? (
        <div className={styles.placeholder}>이미지 영역</div>
      ) : null}
      <section className={styles.recommendations}>
        <HomeCarouselSection
          title="로드 러닝 Essential"
          titleVariant="heading7"
          itemCount={recommendedProducts.length}
          platform={platform}
          slideClassName={styles.slide}
          desktopCenteredItemCount={5}
          desktopItemGutter={16}
          mobileItemGutter={8}
          railClassName={styles.rail}
        >
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="showcase" />
          ))}
        </HomeCarouselSection>
      </section>
      <ModalDialog
        open={showApplicationNotice}
        onOpenChange={setShowApplicationNotice}
        title="세션 신청 안내"
        closeLabel="세션 신청 안내 닫기"
        size="sm"
      >
        <Typography as="p" variant="body3" className={styles.modalText}>
          신청 기능 준비 중입니다.
        </Typography>
        <Button variant="primary" fullWidth onClick={() => setShowApplicationNotice(false)}>
          확인
        </Button>
      </ModalDialog>
    </main>
  );
}
