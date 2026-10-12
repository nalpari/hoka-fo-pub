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

export function DesignGuideTypography() {
  return (
    <ContentLayout
      className={styles.page}
      breadcrumbItems={[
        { label: 'HOME', href: '/' },
        { label: 'DEVELOPMENT' },
        { label: '디자인 가이드' },
        { label: 'Typography' },
      ]}
      title="Typography"
      description="디자인 가이드의 영문·한글 타이포그래피와 실제 렌더링 예시입니다."
    >
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
                {[...columnLabels, 'Example'].map((label) => (
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
                  <td>
                    <Typography variant={variant} lang="en">
                      abcdefghijklmn
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ContentLayout>
  );
}
