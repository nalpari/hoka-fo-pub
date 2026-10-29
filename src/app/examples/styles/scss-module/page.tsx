import Link from 'next/link';

import { Flex, Grid } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import styles from './page.module.scss';

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

/** 페이지 전용 SCSS Module 방식의 비교 예시를 표시합니다. (Shows a comparison example with a page-specific SCSS Module.) */
export default function ScssModuleExamplePage() {
  return (
    <Flex as="main" className={styles.page}>
      <Flex as="header" className={styles.header}>
        <Typography as="p" variant="body3">
          스타일 작성 방식 비교 · 02
        </Typography>
        <Typography as="h1" variant="heading4">
          페이지 전용 SCSS Module
        </Typography>
        <Typography as="p" variant="body2">
          Flex·Grid는 유지하고, 페이지 전용 스타일을 page.module.scss에서 className으로 연결합니다.
        </Typography>
        <Flex as="nav" className={styles.nav} aria-label="스타일 예시 비교">
          <Link className={styles.link} href="/examples/styles/classnames">
            상단 className
          </Link>
          <Link className={styles.link} href="/examples/styles/scss-module" aria-current="page">
            SCSS Module
          </Link>
          <Link className={styles.link} href="/examples/styles/jsx-props">
            기존 JSX props
          </Link>
        </Flex>
      </Flex>

      {/* 정적 스타일 비교용 콘텐츠이며 실제 상품·서비스 데이터와 연결하지 않습니다. */}
      <Grid as="section" gap="5" className={styles.grid} aria-label="러닝 준비 가이드">
        {tips.map((tip) => (
          <Flex as="article" key={tip.number} className={styles.card}>
            <Typography as="p" variant="body3" className={styles.number}>
              {tip.number}
            </Typography>
            <Typography as="h2" variant="heading7">
              {tip.title}
            </Typography>
            <Typography as="p" variant="body3">
              {tip.description}
            </Typography>
          </Flex>
        ))}
      </Grid>

      <details open className={styles.details}>
        <summary className={styles.summary}>작성 코드 보기</summary>
        <pre className={styles.code}>
          <code>{`// page.tsx
import styles from './page.module.scss';

<Flex as="article" className={styles.card}>...</Flex>

// page.module.scss
.card {
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: 12px;
}`}</code>
        </pre>
      </details>
    </Flex>
  );
}
