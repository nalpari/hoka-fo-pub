'use client';

import { useState } from 'react';
import { css } from 'styled-system/css';
import { token } from 'styled-system/tokens';
import type { TypographyTone } from '@/shared/components/atoms/Typography/Typography';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';

const colorGroups = [
  {
    name: 'Neutral',
    colors: ['black.100', 'black.60', 'black.50', 'black.40', 'black.20', 'black.10', 'white.0'],
  },
  { name: 'Brand', colors: ['blue.100', 'citrus.100', 'mossGreen.100', 'offWhite.100'] },
  { name: 'Red', colors: ['red.100', 'red.80'] },
] as const;

type PaletteColor = (typeof colorGroups)[number]['colors'][number];

const toneByColor: Partial<Record<PaletteColor, TypographyTone>> = {
  'black.100': 'primary',
  'black.60': 'subtle',
  'black.50': 'tertiary',
  'black.40': 'black40',
  'black.20': 'black20',
  'black.10': 'black10',
  'white.0': 'inverse',
  'blue.100': 'brand',
  'red.100': 'error',
  'red.80': 'red80',
};

const styles = {
  page: css({
    maxW: 'none',
    bg: '#f6f8ff',
    px: '6',
    py: '6',
    '@media (max-width: 479px)': { px: '4', py: '4' },
  }),
  section: css({
    mt: '6',
    '& h2': { m: '0', mb: '4', fontSize: '24', fontWeight: 'bold', color: '#171f38' },
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '4',
    m: '0',
    p: '0',
    listStyle: 'none',
    '@media (max-width: 767px)': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
    '@media (max-width: 479px)': { gridTemplateColumns: '1fr' },
  }),
  card: css({
    minW: '0',
    p: '5',
    bg: '#fff',
    border: '1px solid #dbe5ff',
    borderRadius: '10px',
  }),
  swatch: css({
    display: 'block',
    w: '100%',
    h: '112px',
    mb: '4',
    border: '1px solid #B3B3B3',
    borderRadius: '8px',
  }),
  name: css({ display: 'block', fontSize: '16', fontWeight: 'semibold', color: '#171f38' }),
  hex: css({ display: 'block', mt: '2', fontSize: '14', color: '#4D4D4D' }),
  copySwatch: css({
    cursor: 'pointer',
    _hover: { outline: '1px solid #777777' },
    _focusVisible: { outline: '2px solid #009DFF', outlineOffset: '3px' },
  }),
  status: css({ minH: '24px', mb: '4', fontSize: '14', color: '#4D4D4D' }),
};

export function DesignGuideColor() {
  const [copyStatus, setCopyStatus] = useState('');

  async function copyTone(tone: TypographyTone) {
    const code = `tone="${tone}"`;

    try {
      if (!navigator.clipboard?.writeText) {
        setCopyStatus(`클립보드를 사용할 수 없습니다. ${code}를 직접 복사해 주세요.`);
        return;
      }

      await navigator.clipboard.writeText(code);
      setCopyStatus(`${code} 복사 완료`);
    } catch {
      setCopyStatus(`복사하지 못했습니다. ${code}를 직접 복사해 주세요.`);
    }
  }

  return (
    <ContentLayout
      className={styles.page}
      breadcrumbItems={[
        { label: 'HOME', href: '/' },
        { label: 'DEVELOPMENT' },
        { label: '디자인 가이드' },
        { label: 'Color' },
      ]}
      title="Color"
      description="디자인 가이드의 13가지 기본 색상과 Panda 토큰입니다."
    >
      <p className={styles.hex}>썸네일을 클릭하면 해당 색상의 tone 코드를 복사합니다.</p>
      <p className={styles.status} role="status" aria-live="polite" aria-atomic="true">
        {copyStatus}
      </p>
      {colorGroups.map((group) => (
        <section
          key={group.name}
          className={styles.section}
          aria-labelledby={`color-${group.name}`}
        >
          <h2 id={`color-${group.name}`}>{group.name}</h2>
          <ul className={styles.grid}>
            {group.colors.map((name) => {
              const color = token(`colors.${name}`);
              const tone = toneByColor[name];

              return (
                <li key={name} className={styles.card}>
                  {tone ? (
                    <button
                      type="button"
                      className={`${styles.swatch} ${styles.copySwatch}`}
                      style={{ backgroundColor: color }}
                      aria-label={`tone="${tone}" 복사`}
                      onClick={() => void copyTone(tone)}
                    />
                  ) : (
                    <div
                      className={styles.swatch}
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                  )}
                  <code className={styles.name}>{`colors.${name}`}</code>
                  <span className={styles.hex}>HEX: {color.toUpperCase()}</span>
                  {tone && <code className={styles.hex}>{`tone="${tone}"`}</code>}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </ContentLayout>
  );
}
