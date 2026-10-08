import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex } from 'styled-system/jsx';
import { css, cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

type CalendarTab = 'history' | 'now' | 'coming';

type Audience = 'adult' | 'kids';

type LaunchTone =
  'moss' | 'ink' | 'ice' | 'cocoa' | 'street' | 'silver' | 'lilac' | 'rose' | 'sand';

type LaunchItem = {
  id: string;
  title: string;
  detail: string;
  date: string;
  release: string;
  tone: LaunchTone;
  status: 'now' | 'coming' | 'sold-out';
};

const calendar = css({ paddingBottom: '28' });

const intro = css({
  display: 'grid',
  justifyItems: 'center',
  p: '88px var(--spacing-6) var(--spacing-12)',
  textAlign: 'center',
  '.platform-mobile &': { p: '13 var(--layout-mobile-inline-gutter) 34px' },
});

const kicker = css({
  mb: '2.5',
  color: 'var(--color-red-80)',
  fontSize: '12' /* 기존: 11px */,
  fontWeight: 'var(--font-weights-bold)',
  letterSpacing: 'var(--letter-spacings-korean)',
});

const pageTitle = css({
  fontFamily: 'var(--font-family-base)',
  fontSize: '58',
  fontWeight: 'var(--font-weights-normal)',
  letterSpacing: 'var(--letter-spacings-korean)',
  '.platform-mobile &': { fontSize: '42' },
});

const audienceButton = cva({
  base: {
    minW: '74px',
    border: '0',
    borderRadius: 'full',
    bg: 'var(--color-black-40)',
    color: 'var(--color-white-000)',
    fontSize: '14',
    fontWeight: 'var(--font-weights-bold)',
  },
  variants: { selected: { true: { bg: 'var(--color-black-100)' }, false: {} } },
});

const tabs = css({ display: 'flex', gap: '22px', mt: '30px' });

const tabGroup = css({ display: 'flex', alignItems: 'center', gap: '22px' });

const separator = css({ color: 'var(--color-black-40)', fontStyle: 'normal' });

const tabButton = cva({
  base: { minH: 'auto', border: '0', bg: 'transparent', px: '0', fontSize: '16' },
  variants: { active: { true: { fontWeight: 'var(--font-weights-black)' }, false: {} } },
});

const audienceNote = css({
  height: '0',
  mt: '4',
  mb: 'calc(var(--spacing-4) * -1)',
  color: 'var(--color-black-50)',
  fontSize: '12' /* 기존: 11px */,
  opacity: '0',
});

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '50px var(--spacing-3)',
  maxW: 'var(--layout-content-max-width)',
  mx: 'auto',
  px: '6',
  '.platform-mobile &': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 'var(--spacing-7) var(--spacing-2)',
    px: 'var(--layout-mobile-inline-gutter)',
  },
});

const card = css({
  minW: '0',
  '&:hover [data-launch-action], &:focus-visible [data-launch-action]': { display: 'inline-block' },
  '&:hover [data-launch-art], &:focus-visible [data-launch-art]': {
    outline: '4px solid var(--color-blue-100)',
    outlineOffset: '-4px',
  },
});

const art = cva({
  base: {
    position: 'relative',
    isolation: 'isolate',
    overflow: 'hidden',
    aspectRatio: '1 / 0.98',
    _before: {
      position: 'absolute',
      zIndex: '-1',
      width: '65%',
      height: '30%',
      border: '22px solid color-mix(in srgb, var(--color-white-000) 50%, transparent)',
      borderRadius: '48% 52% 42% 58%',
      content: '""',
      transform: 'rotate(-20deg)',
    },
    _after: {
      position: 'absolute',
      zIndex: '-1',
      width: '100%',
      height: '100%',
      bg: 'linear-gradient(145deg, transparent 45%, color-mix(in srgb, var(--color-black-100) 15%, transparent))',
      content: '""',
    },
  },
  variants: {
    tone: {
      moss: {
        bg: 'radial-gradient(circle at 47% 20%, var(--color-black-50), var(--color-black-60) 67%, var(--color-black-100))',
      },
      ink: {
        bg: 'radial-gradient(circle at 48% 72%, var(--color-black-20) 0 15%, var(--color-black-40) 16% 31%, var(--color-black-60) 32% 60%, var(--color-black-100))',
      },
      ice: {
        bg: 'linear-gradient(155deg, var(--color-off-white-100) 10%, var(--color-black-40) 48%, var(--color-black-50) 100%)',
      },
      cocoa: {
        bg: 'linear-gradient(135deg, var(--color-black-60), var(--color-black-50) 53%, var(--color-black-40))',
      },
      street: {
        bg: 'linear-gradient(140deg, var(--color-black-50) 0 24%, var(--color-black-60) 25% 58%, var(--color-black-20) 59%)',
      },
      silver: {
        bg: 'linear-gradient(145deg, var(--color-black-10), var(--color-black-40) 46%, var(--color-black-60))',
      },
      lilac: {
        bg: 'linear-gradient(145deg, var(--color-black-20), var(--color-black-20) 52%, var(--color-black-50))',
      },
      rose: {
        bg: 'linear-gradient(145deg, var(--color-black-20) 15%, var(--color-black-40) 57%, var(--color-black-60))',
      },
      sand: {
        bg: 'linear-gradient(145deg, var(--color-black-40), var(--color-black-50) 49%, var(--color-black-60))',
      },
    },
  },
});

const shoe = css({
  position: 'absolute',
  right: '12%',
  bottom: '9%',
  color: 'color-mix(in srgb, var(--color-black-100) 86%, transparent)',
  fontSize: 'clamp(130px, 16vw, 240px)',
  fontStyle: 'italic',
  fontWeight: 'var(--font-weights-black)',
  letterSpacing: 'var(--letter-spacings-korean)',
  lineHeight: 'var(--line-heights-hoka)',
  transform: 'rotate(-17deg)',
});

const mark = css({
  position: 'absolute',
  top: '17px',
  right: '17px',
  color: 'color-mix(in srgb, var(--color-white-000) 94%, transparent)',
  fontSize: '16' /* 기존 15px */,
  fontWeight: 'var(--font-weights-black)',
  letterSpacing: 'var(--letter-spacings-korean)',
});

const date = css({
  position: 'absolute',
  top: '18px',
  left: '18px',
  fontFamily: 'var(--font-family-base)',
  fontSize: '20' /* 기존 22px */,
  lineHeight: 'var(--line-heights-hoka)',
  '.platform-mobile &': { top: '11px', left: '11px', fontSize: '16' },
});

const cardInfo = css({
  pt: '4',
  '& p': {
    minH: '18px',
    mb: '2',
    color: 'var(--color-black-40)',
    fontSize: '14' /* 기존 13px */,
    '.platform-mobile &': { fontSize: '12' /* 기존: 11px */ },
  },
  '& h2': {
    fontSize: '20',
    lineHeight: 'var(--line-heights-body)',
    '.platform-mobile &': { fontSize: '16' },
  },
});

const cardAction = cva({
  base: {
    display: 'none',
    width: 'max-content',
    mt: '3',
    px: '18px',
    py: '2',
    borderRadius: 'full',
    bg: 'var(--color-black-100)',
    color: 'var(--color-white-000)',
    fontSize: '12',
    fontWeight: 'var(--font-weights-black)',
  },
  variants: {
    status: {
      now: {},
      coming: { bg: 'var(--color-black-60)' },
      'sold-out': { bg: 'var(--color-black-50)' },
    },
  },
});

const nowFeature = css({
  display: 'grid',
  gridTemplateColumns: '37% 63%',
  minH: '580px',
  bg: 'var(--color-black-60)',
  color: 'var(--color-white-000)',
  '.platform-mobile &': { gridTemplateColumns: '1fr' },
});

const featureCopy = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  p: 'clamp(var(--spacing-11), 6vw, var(--spacing-24))',
  '& p': { mb: '3.5', fontSize: '16' /* 기존 17px */ },
  '& h2': {
    mb: '30px',
    fontSize: 'clamp(var(--font-sizes-32), 3vw, var(--font-sizes-50))',
    lineHeight: 'var(--line-heights-hoka)',
  },
  '& a': {
    px: '42px',
    py: '14px',
    borderRadius: 'full',
    bg: 'var(--color-white-000)',
    color: 'var(--color-black-100)',
    fontWeight: 'var(--font-weights-bold)',
  },
  '.platform-mobile &': { minH: '260px', p: 'var(--spacing-10) 26px' },
});

const featureArt = css({
  position: 'relative',
  isolation: 'isolate',
  overflow: 'hidden',
  minH: '580px',
  bg: 'radial-gradient(circle at 43% 25%, var(--color-black-40), var(--color-black-60) 52%, var(--color-black-60))',
  '.platform-mobile &': { minH: '360px' },
});

const featureShoe = css({
  position: 'absolute',
  top: '22%',
  left: '30%',
  color: 'var(--color-black-60)',
  fontSize: 'clamp(250px, 33vw, 540px)',
  fontStyle: 'italic',
  fontWeight: 'var(--font-weights-black)',
  lineHeight: 'var(--line-heights-hoka)',
  transform: 'rotate(-78deg)',
});

const featureBrand = css({
  position: 'absolute',
  right: '30px',
  bottom: '6',
  fontSize: '12' /* 기존: 10px */,
  fontWeight: 'var(--font-weights-bold)',
  letterSpacing: 'var(--letter-spacings-korean)',
});

const launches: LaunchItem[] = [
  {
    id: '2002r',
    title: '2002R Brown Restock',
    detail: 'U2002RAB',
    date: 'September 16',
    release: '09/16 오전 11:00',
    tone: 'moss',
    status: 'now',
  },
  {
    id: 'sold-out-530',
    title: '530 Limited Pack',
    detail: 'MR530NBX',
    date: 'September 8',
    release: '09/08 오전 11:00',
    tone: 'sand',
    status: 'sold-out',
  },
  {
    id: 'abzorb',
    title: 'ABZORB 1890A',
    detail: 'U1890M2',
    date: 'September 14',
    release: '09/14 오전 11:00',
    tone: 'ink',
    status: 'now',
  },
  {
    id: 'flying',
    title: 'Flying77 구스다운, WINTER',
    detail: '더 깊어진 무드의 프리미엄 다운 컬렉션',
    date: 'September 12',
    release: '09/12 오전 11:00',
    tone: 'ice',
    status: 'now',
  },
  {
    id: 'rover',
    title: 'A Daily Stroll, NB Rover',
    detail: '일상에 스며드는 기분 좋은 발걸음',
    date: 'September 10',
    release: '09/10 오전 11:00',
    tone: 'cocoa',
    status: 'now',
  },
  {
    id: '2010',
    title: 'The ABZORB 2010',
    detail: 'M2010NB',
    date: 'September 23',
    release: '09/23 오전 11:00',
    tone: 'street',
    status: 'coming',
  },
  {
    id: '1954r',
    title: 'The 1954R',
    detail: 'U1954GR',
    date: 'September 21',
    release: '09/21 오전 11:00',
    tone: 'silver',
    status: 'coming',
  },
  {
    id: 'seasonal',
    title: 'Made in USA 26FW Seasonal Collection',
    detail: 'U992 & U990',
    date: 'September 18',
    release: '09/18 오전 11:00',
    tone: 'lilac',
    status: 'coming',
  },
  {
    id: 'flat',
    title: 'Refined for Fall, FW Flat Breeze',
    detail: 'MEGAWEEK',
    date: 'September 18',
    release: '09/18 오전 10:00',
    tone: 'rose',
    status: 'coming',
  },
  {
    id: 'daynight',
    title: 'DAY & NIGHT : 530 & 1906',
    detail: '530JPB / 1906RCH',
    date: 'September 17',
    release: '09/17 오전 10:00',
    tone: 'sand',
    status: 'coming',
  },
];

function LaunchCard({ item, mode }: { item: LaunchItem; mode: CalendarTab }) {
  const scheduled = item.status === 'coming';
  const actionLabel =
    item.status === 'now' ? '구매하기' : item.status === 'coming' ? 'COMING SOON' : 'SOLD OUT';
  return (
    <Link className={card} to={`/products/${item.id}`}>
      <Box className={art({ tone: item.tone })} data-launch-art>
        {mode === 'coming' && <span className={date}>{item.date}</span>}
        <span className={mark}>NB</span>
        <span className={shoe} aria-hidden="true">
          N
        </span>
      </Box>
      <Box className={cardInfo}>
        <p>{mode === 'history' && !scheduled ? item.detail : `${item.release} 출시 예정`}</p>
        <h2>{item.title}</h2>
        <span className={cardAction({ status: item.status })} data-launch-action>
          {actionLabel}
        </span>
      </Box>
    </Link>
  );
}

export function LaunchCalendarPage() {
  const [audience, setAudience] = useState<Audience>('adult');
  const [tab, setTab] = useState<CalendarTab>('history');
  const visible = tab === 'history' ? launches : launches.filter((item) => item.status === tab);
  const featured = launches.find((item) => item.status === 'now')!;

  return (
    <main className={calendar}>
      <header className={intro}>
        <p className={kicker}>HOKA</p>
        <h1 className={pageTitle}>Launch Calendar</h1>
        <Flex className={audience} aria-label="상품 대상 선택">
          <Button
            className={audienceButton({ selected: audience === 'adult' })}
            onClick={() => setAudience('adult')}
          >
            성인
          </Button>
          <Button
            className={audienceButton({ selected: audience === 'kids' })}
            onClick={() => setAudience('kids')}
          >
            키즈
          </Button>
        </Flex>
        <nav className={tabs} aria-label="런칭 캘린더 탭">
          {(['history', 'now', 'coming'] as CalendarTab[]).map((item, index) => (
            <span className={tabGroup} key={item}>
              {index > 0 && (
                <i className={separator} aria-hidden="true">
                  |
                </i>
              )}
              <Button className={tabButton({ active: tab === item })} onClick={() => setTab(item)}>
                {item === 'history' ? 'History' : item === 'now' ? 'Now' : 'Coming'}
              </Button>
            </span>
          ))}
        </nav>
        <p className={audienceNote}>{audience === 'adult' ? '성인 컬렉션' : '키즈 컬렉션'}</p>
      </header>

      {tab === 'now' ? (
        <section className={nowFeature} aria-label="현재 출시 상품">
          <Box className={featureCopy}>
            <p>{featured.release} 런칭</p>
            <h2>{featured.title}</h2>
            <Link to={`/products/${featured.id}`}>구매하기</Link>
          </Box>
          <Box className={featureArt}>
            <span className={featureShoe}>N</span>
            <span className={featureBrand}>HOKA</span>
          </Box>
        </section>
      ) : (
        <section
          className={grid}
          aria-label={tab === 'history' ? '런칭 히스토리' : '출시 예정 상품'}
        >
          {visible.map((item) => (
            <LaunchCard item={item} mode={tab} key={item.id} />
          ))}
        </section>
      )}
    </main>
  );
}
