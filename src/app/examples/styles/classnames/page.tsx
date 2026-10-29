import Link from 'next/link';

import { css } from 'styled-system/css';

import { Typography } from '@/components/common/atoms/Typography';

// 예시 1: 모든 페이지 전용 스타일을 상단에 선언하고 JSX에는 className만 연결합니다.
const styles = {
  page: css({
    maxW: '1120px',
    mx: 'auto',
    px: '10',
    py: '16',
    display: 'flex',
    flexDirection: 'column',
    gap: '10',
    _mobile: { px: '5', py: '8', gap: '6' },
  }),
  header: css({ display: 'flex', flexDirection: 'column', gap: '4' }),
  nav: css({ display: 'flex', flexWrap: 'wrap', gap: '3' }),
  link: css({
    display: 'inline-flex',
    alignItems: 'center',
    minH: '44px',
    px: '4',
    border: '1px solid var(--color-border-default)',
    borderRadius: '8px',
    color: 'var(--color-text-primary)',
    textDecoration: 'none',
    _hover: { bg: 'var(--color-surface-subtle)' },
    _focusVisible: { outline: '2px solid var(--color-text-primary)', outlineOffset: '4px' },
    '&[aria-current="page"]': { bg: 'var(--color-text-primary)', color: 'white' },
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '5',
    _mobile: { gridTemplateColumns: '1fr' },
  }),
  card: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '3',
    p: '6',
    border: '1px solid var(--color-border-default)',
    borderRadius: '12px',
    bg: 'var(--color-surface-default)',
  }),
  number: css({ color: 'var(--color-text-subtle)' }),
  details: css({
    p: '6',
    borderRadius: '12px',
    bg: 'var(--color-surface-subtle)',
    '&[open]': { outline: '1px solid var(--color-border-default)' },
  }),
  summary: css({
    cursor: 'pointer',
    _focusVisible: { outline: '2px solid var(--color-text-primary)', outlineOffset: '4px' },
  }),
  code: css({
    mt: '5',
    p: '5',
    overflowX: 'auto',
    borderRadius: '8px',
    bg: 'var(--color-surface-default)',
    fontSize: '14px',
    lineHeight: '1.7',
    whiteSpace: 'pre',
  }),
};

const tips = [
  {
    number: '01',
    title: '가볍게 시작하기',
    description: '편안한 속도로 몸을 풀고 오늘의 컨디션을 확인하세요.',
  },
  {
    number: '02',
    title: '나만의 리듬 찾기',
    description: '거리보다 호흡에 집중하며 일정한 페이스를 유지하세요.',
  },
  {
    number: '03',
    title: '충분히 회복하기',
    description: '러닝을 마친 뒤 스트레칭과 수분 보충으로 마무리하세요.',
  },
];

/** 상단 Panda 클래스 선언 방식의 비교 예시를 표시합니다. (Shows a comparison example with Panda classes declared at the top.) */
export default function ClassnamesExamplePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Typography as="p" variant="body3">
          스타일 작성 방식 비교 · 01
        </Typography>
        <Typography as="h1" variant="heading4">
          TSX 상단에 스타일 모으기
        </Typography>
        <Typography as="p" variant="body2">
          페이지 상단의 styles 객체에서 Panda css()를 선언하고, JSX에는 className만 연결합니다.
        </Typography>
        <nav className={styles.nav} aria-label="스타일 예시 비교">
          <Link className={styles.link} href="/examples/styles/classnames" aria-current="page">
            상단 className
          </Link>
          <Link className={styles.link} href="/examples/styles/scss-module">
            SCSS Module
          </Link>
        </nav>
      </header>

      {/* 정적 스타일 비교용 콘텐츠이며 실제 상품·서비스 데이터와 연결하지 않습니다. */}
      <section className={styles.grid} aria-label="러닝 준비 가이드">
        {tips.map((tip) => (
          <article key={tip.number} className={styles.card}>
            <Typography as="p" variant="body3" className={styles.number}>
              {tip.number}
            </Typography>
            <Typography as="h2" variant="heading7">
              {tip.title}
            </Typography>
            <Typography as="p" variant="body3">
              {tip.description}
            </Typography>
          </article>
        ))}
      </section>

      <details className={styles.details}>
        <summary className={styles.summary}>작성 코드 보기</summary>
        <pre className={styles.code}>
          <code>{`// page.tsx 상단
const styles = {
  card: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '3',
    p: '6',
    borderRadius: '12px',
  }),
};

// page.tsx JSX
<article className={styles.card}>...</article>`}</code>
        </pre>
      </details>
    </main>
  );
}
