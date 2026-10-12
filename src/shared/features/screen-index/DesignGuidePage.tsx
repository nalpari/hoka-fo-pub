'use client';

import { css } from 'styled-system/css';
import { token, type Token } from 'styled-system/tokens';
import {
  figmaTypographyVariants,
  Typography,
} from '@/shared/components/atoms/Typography/Typography';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';

type GuideVariant = keyof typeof figmaTypographyVariants;

const guideVariants = Object.keys(figmaTypographyVariants) as GuideVariant[];

const pairedVariants = guideVariants
  .filter((name) => !name.includes('Kr') && !name.startsWith('mono'))
  .map((english) => ({
    english,
    korean: english.replace(/(\d+)$/, 'Kr$1') as GuideVariant,
  }));

const monoVariants = guideVariants.filter((name) => name.startsWith('mono'));

const columnLabels = ['Variant', 'Web font-size', 'Mobile font-size', 'font-weight'];

const comparisonColumnLabels = [
  'Variant',
  'Lang',
  'Web Font Size',
  'Mobile Font Size',
  'Font Weight',
  'Example',
];

function getFontSize(value: string) {
  const size = value.replace(/^var\(--font-sizes-(.+)\)$/, '$1');

  return token(`fontSizes.${size}` as Extract<Token, `fontSizes.${string}`>);
}

function getTypographyValues(variant: GuideVariant) {
  const definition = figmaTypographyVariants[variant];
  const mobile = '_mobile' in definition ? definition._mobile : definition;
  const webWeight = token(`fontWeights.${definition.fontWeight}`);
  const mobileWeight = token(`fontWeights.${mobile.fontWeight}`);

  return [
    getFontSize(definition.fontSize),
    getFontSize(mobile.fontSize),
    webWeight === mobileWeight ? webWeight : `${webWeight} / 모바일 ${mobileWeight}`,
  ];
}

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
    '& small': {
      color: '#2a14b4',
      fontSize: '12' /* 기존: 11px */,
      fontWeight: '800',
      letterSpacing: '0.08em',
    },
    '& h2': {
      m: '4 0 3',
      color: '#171f38',
      fontSize: '20' /* 기존 22px */,
      letterSpacing: '-0.02em',
    },
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
  typographySection: css({
    mt: '6',
    minW: '0',
    p: '6',
    border: '1px solid #dbe5ff',
    borderRadius: '10px',
    bg: '#fff',
    color: '#171f38',
    _mobile: { p: '4' },
    '& h2': { m: '0', mb: '3', fontSize: '20', fontWeight: 'bold' },
    '& p': { m: '0', mb: '5', fontSize: '14', lineHeight: '1.7', color: '#68718a' },
  }),
  tableScroll: css({
    overflowX: 'auto',
    maxW: '100%',
    border: '1px solid #dbe5ff',
    borderRadius: '8px',
    _focusVisible: { outline: '2px solid #2a14b4', outlineOffset: '2px' },
  }),
  table: css({
    w: '100%',
    borderCollapse: 'collapse',
    fontSize: '14',
    lineHeight: '1.5',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    fontVariantNumeric: 'tabular-nums',
    '& th, & td': { py: '3', px: '4', borderBottom: '1px solid #dbe5ff' },
    '& thead th': { bg: '#f6f8ff', fontWeight: 'bold' },
    '& tbody th': { fontWeight: 'semibold' },
    '& tbody:last-child tr:last-child > *': { borderBottom: '0' },
  }),
  pairedTable: css({
    minW: '680px',
    '& tbody:nth-of-type(even)': { bg: '#fafbff' },
    '& [rowspan]': { verticalAlign: 'middle' },
    '& tbody:last-child [rowspan]': { borderBottom: '0' },
  }),
  monoTable: css({
    minW: '560px',
    '& tbody tr:nth-child(even)': { bg: '#fafbff' },
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
      <section className={styles.typographySection} aria-labelledby="typography-comparison-title">
        <h2 id="typography-comparison-title">Typography · 한영 비교</h2>
        <p>
          디자인 가이드의 Heading, Body, CTA, Text Link를 같은 번호의 EN·KO 행으로 비교합니다.
          크기는 px, 굵기는 숫자로 표시하며 모바일 굵기가 다르면 함께 표기합니다. 좁은 화면에서는
          표를 좌우로 스크롤할 수 있습니다.
        </p>
        <div
          className={styles.tableScroll}
          role="region"
          aria-label="한영 타이포그래피 비교표"
          tabIndex={0}
        >
          <table
            className={`${styles.table} ${styles.pairedTable}`}
            aria-labelledby="typography-comparison-title"
          >
            <thead>
              <tr>
                {comparisonColumnLabels.map((label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            {pairedVariants.map(({ english, korean }) => {
              const enValues = getTypographyValues(english);
              const koValues = getTypographyValues(korean);

              return (
                <tbody key={english}>
                  <tr>
                    <th scope="rowgroup" rowSpan={2}>
                      {english}
                    </th>
                    <th scope="row">EN</th>
                    {enValues.map((value, index) => (
                      <td key={columnLabels[index + 1]} rowSpan={value === koValues[index] ? 2 : 1}>
                        {value}
                      </td>
                    ))}
                    <td>
                      <Typography variant={english} lang="en">
                        abcdefghijklmn
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">KO</th>
                    {koValues.map((value, index) =>
                      value === enValues[index] ? null : (
                        <td key={columnLabels[index + 1]}>{value}</td>
                      ),
                    )}
                    <td>
                      <Typography variant={korean} lang="ko">
                        가나다라마바사
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </section>
      <section className={styles.typographySection} aria-labelledby="typography-mono-title">
        <h2 id="typography-mono-title">Typography · Mono</h2>
        <p>
          한글 대응 variant가 없는 Mono 스타일입니다. 웹과 모바일에서 같은 크기와 굵기를 사용합니다.
        </p>
        <div
          className={styles.tableScroll}
          role="region"
          aria-label="Mono 타이포그래피 표"
          tabIndex={0}
        >
          <table
            className={`${styles.table} ${styles.monoTable}`}
            aria-labelledby="typography-mono-title"
          >
            <thead>
              <tr>
                {columnLabels.map((label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monoVariants.map((variant) => (
                <tr key={variant}>
                  <th scope="row">{variant}</th>
                  {getTypographyValues(variant).map((value, index) => (
                    <td key={columnLabels[index + 1]}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ContentLayout>
  );
}
