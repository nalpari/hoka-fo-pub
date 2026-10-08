'use client';

import { css } from 'styled-system/css';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';

const styles = {
  page: css({
    maxW: 'none',
    bg: '#f6f8ff',
    px: '6',
    py: '6',
    _mobile: { px: '4', py: '4' },
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '4',
    _mobile: { gridTemplateColumns: '1fr' },
  }),
  card: css({
    minH: '220px',
    p: '6',
    border: '1px solid #dbe5ff',
    borderRadius: '10px',
    bg: '#fff',
    boxShadow: '0 2px 8px rgba(38, 53, 99, 0.06)',
    '& small': { color: '#2a14b4', fontSize: '12' /* 기존: 11px */, fontWeight: '800', letterSpacing: '0.08em' },
    '& h2': { m: '4 0 3', color: '#171f38', fontSize: '20' /* 기존 22px */, letterSpacing: '-0.02em' },
    '& p': { m: '0', color: '#68718a', fontSize: '14px', lineHeight: '1.7' },
  }),
  tokenList: css({
    display: 'grid',
    gap: '2',
    mt: '5',
    '& span': { color: '#3e4965', fontSize: '12px', fontWeight: '700' },
  }),
  swatch: css({
    display: 'inline-block',
    w: '3',
    h: '3',
    mr: '2',
    borderRadius: 'full',
    verticalAlign: 'middle',
  }),
};

export function DesignGuidePage() {
  return (
    <ContentLayout
      className={styles.page}
      breadcrumbItems={[
        { label: 'HOME', href: '/' },
        { label: 'DEVELOPMENT' },
        { label: '디자인 가이드' },
      ]}
      title="디자인 가이드"
      description="개발 검수 화면에서 사용하는 정보 위계와 상태 표현 기준입니다."
    >
      <section className={styles.grid} aria-label="디자인 가이드">
        <article className={styles.card}>
          <small>FOUNDATION</small>
          <h2>색상과 여백</h2>
          <p>
            밝은 블루 계열의 배경과 흰 카드 표면을 기준으로 정보 영역을 나누고, 일관된 여백과
            구분선을 적용합니다.
          </p>
          <div className={styles.tokenList}>
            <span>
              <i className={styles.swatch} style={{ background: '#2a14b4' }} />
              Primary
            </span>
            <span>
              <i className={styles.swatch} style={{ background: '#f6f8ff' }} />
              Surface
            </span>
            <span>
              <i className={styles.swatch} style={{ background: '#dbe5ff' }} />
              Border
            </span>
          </div>
        </article>
        <article className={styles.card}>
          <small>TYPOGRAPHY</small>
          <h2>정보 위계</h2>
          <p>
            페이지 제목, 영역 제목, 테이블 데이터 순으로 크기와 굵기를 구분합니다. 화면 코드와 상태
            값은 짧고 빠르게 읽히도록 작은 강조 텍스트로 표시합니다.
          </p>
          <div className={styles.tokenList}>
            <span>Page title · 22px</span>
            <span>Section title · 14px</span>
            <span>Table data · 12px</span>
          </div>
        </article>
        <article className={styles.card}>
          <small>INTERACTION</small>
          <h2>상태와 탐색</h2>
          <p>
            영역 카드는 해당 IA 분류의 필터 역할을 하며, 트리 전체 펼치기와 검색을 함께 제공합니다.
            구현 상태는 색상과 텍스트를 함께 사용해 구분합니다.
          </p>
          <div className={styles.tokenList}>
            <span>
              <i className={styles.swatch} style={{ background: '#17643b' }} />
              구현됨
            </span>
            <span>
              <i className={styles.swatch} style={{ background: '#68718a' }} />
              미구현
            </span>
          </div>
        </article>
      </section>
    </ContentLayout>
  );
}
