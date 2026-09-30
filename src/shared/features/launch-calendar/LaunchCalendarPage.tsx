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

const calendar = css({ paddingBottom: '112px' });

const intro = css({
  display: 'grid',
  justifyItems: 'center',
  p: '88px 24px 48px',
  textAlign: 'center',
  '.platform-mobile &': { p: '52px var(--layout-mobile-inline-gutter) 34px' },
});

const kicker = css({
  mb: '10px',
  color: '#e31b23',
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '0.14em',
});

const pageTitle = css({
  fontFamily: 'var(--font-family-base)',
  fontSize: '58px',
  fontWeight: '400',
  letterSpacing: '-0.055em',
  '.platform-mobile &': { fontSize: '42px' },
});

const audienceButton = cva({
  base: {
    minW: '74px',
    border: '0',
    borderRadius: '999px',
    bg: '#b9b9b9',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '700',
  },
  variants: { selected: { true: { bg: '#000' }, false: {} } },
});

const tabs = css({ display: 'flex', gap: '22px', mt: '30px' });

const tabGroup = css({ display: 'flex', alignItems: 'center', gap: '22px' });

const separator = css({ color: '#9b9b9b', fontStyle: 'normal' });

const tabButton = cva({
  base: { minH: 'auto', border: '0', bg: 'transparent', px: '0', fontSize: '16px' },
  variants: { active: { true: { fontWeight: '900' }, false: {} } },
});

const audienceNote = css({
  height: '0',
  mt: '16px',
  mb: '-16px',
  color: '#8b8b8b',
  fontSize: '11px',
  opacity: '0',
});

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '50px 12px',
  maxW: 'var(--layout-content-max-width)',
  mx: 'auto',
  px: '24px',
  '.platform-mobile &': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '28px 8px',
    px: 'var(--layout-mobile-inline-gutter)',
  },
});

const card = css({
  minW: '0',
  '&:hover [data-launch-action], &:focus-visible [data-launch-action]': { display: 'inline-block' },
  '&:hover [data-launch-art], &:focus-visible [data-launch-art]': {
    outline: '4px solid #29e3c2',
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
      border: '22px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '48% 52% 42% 58%',
      content: '""',
      transform: 'rotate(-20deg)',
    },
    _after: {
      position: 'absolute',
      zIndex: '-1',
      width: '100%',
      height: '100%',
      bg: 'linear-gradient(145deg, transparent 45%, rgba(0, 0, 0, 0.15))',
      content: '""',
    },
  },
  variants: {
    tone: {
      moss: { bg: 'radial-gradient(circle at 47% 20%, #a49c5b, #57582e 67%, #222b1e)' },
      ink: {
        bg: 'radial-gradient(circle at 48% 72%, #eee 0 15%, #c7b7a7 16% 31%, #2f2d2c 32% 60%, #151515)',
      },
      ice: { bg: 'linear-gradient(155deg, #eaf5f6 10%, #9ebec9 48%, #6a8598 100%)' },
      cocoa: { bg: 'linear-gradient(135deg, #38261e, #8f5d3c 53%, #d8a875)' },
      street: { bg: 'linear-gradient(140deg, #a36f55 0 24%, #43545f 25% 58%, #d9e6ed 59%)' },
      silver: { bg: 'linear-gradient(145deg, #f4f3f0, #babcc3 46%, #4e5359)' },
      lilac: { bg: 'linear-gradient(145deg, #eff0ed, #d5c9e1 52%, #b4a463)' },
      rose: { bg: 'linear-gradient(145deg, #f3e4e5 15%, #d8999d 57%, #6c3740)' },
      sand: { bg: 'linear-gradient(145deg, #d1a77b, #8a6045 49%, #342824)' },
    },
  },
});

const shoe = css({
  position: 'absolute',
  right: '12%',
  bottom: '9%',
  color: 'rgba(12, 12, 12, 0.86)',
  fontSize: 'clamp(130px, 16vw, 240px)',
  fontStyle: 'italic',
  fontWeight: '900',
  letterSpacing: '-0.28em',
  lineHeight: '0.65',
  transform: 'rotate(-17deg)',
});

const mark = css({
  position: 'absolute',
  top: '17px',
  right: '17px',
  color: 'rgba(255, 255, 255, 0.94)',
  fontSize: '15px',
  fontWeight: '900',
  letterSpacing: '-0.11em',
});
const date = css({
  position: 'absolute',
  top: '18px',
  left: '18px',
  fontFamily: 'var(--font-family-base)',
  fontSize: '22px',
  lineHeight: '1',
  '.platform-mobile &': { top: '11px', left: '11px', fontSize: '16px' },
});
const cardInfo = css({
  pt: '15px',
  '& p': {
    minH: '18px',
    mb: '8px',
    color: '#9c9c9c',
    fontSize: '13px',
    '.platform-mobile &': { fontSize: '11px' },
  },
  '& h2': { fontSize: '20px', lineHeight: '1.35', '.platform-mobile &': { fontSize: '16px' } },
});
const cardAction = cva({
  base: {
    display: 'none',
    width: 'max-content',
    mt: '12px',
    px: '18px',
    py: '8px',
    borderRadius: '999px',
    bg: '#000',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '900',
  },
  variants: { status: { now: {}, coming: { bg: '#555' }, 'sold-out': { bg: '#8b8b8b' } } },
});
const nowFeature = css({
  display: 'grid',
  gridTemplateColumns: '37% 63%',
  minH: '580px',
  bg: '#312520',
  color: '#fff',
  '.platform-mobile &': { gridTemplateColumns: '1fr' },
});
const featureCopy = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  p: 'clamp(44px, 6vw, 96px)',
  '& p': { mb: '14px', fontSize: '17px' },
  '& h2': { mb: '29px', fontSize: 'clamp(32px, 3vw, 50px)', lineHeight: '1.05' },
  '& a': {
    px: '42px',
    py: '13px',
    borderRadius: '999px',
    bg: '#fff',
    color: '#000',
    fontWeight: '700',
  },
  '.platform-mobile &': { minH: '260px', p: '40px 26px' },
});
const featureArt = css({
  position: 'relative',
  isolation: 'isolate',
  overflow: 'hidden',
  minH: '580px',
  bg: 'radial-gradient(circle at 43% 25%, #b4a867, #69683e 52%, #3c4529)',
  '.platform-mobile &': { minH: '360px' },
});
const featureShoe = css({
  position: 'absolute',
  top: '22%',
  left: '30%',
  color: '#34271e',
  fontSize: 'clamp(250px, 33vw, 540px)',
  fontStyle: 'italic',
  fontWeight: '900',
  lineHeight: '0.5',
  transform: 'rotate(-78deg)',
});
const featureBrand = css({
  position: 'absolute',
  right: '30px',
  bottom: '24px',
  fontSize: '10px',
  fontWeight: '700',
  letterSpacing: '0.13em',
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
