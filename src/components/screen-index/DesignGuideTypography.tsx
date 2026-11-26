'use client';

import { useState } from 'react';
import { PlatformProvider } from '@/context/platform';

import { css } from 'styled-system/css';

import { Typography } from '@/components/common/atoms/Typography';

import { SupportTabs } from '@/components/common/molecules/SupportTabs';

import { type ResponsiveTypographyVariant, typographyStyles } from '@/styles/typography';

const groups = [
  { id: 'display', title: 'Display' },
  { id: 'heading', title: 'Heading' },
  { id: 'body', title: 'Body' },
] as const;

const platforms = [
  { value: 'wide', label: 'Wide' },
  { value: 'compact', label: 'Compact' },
] as const;

export const typographyGuideSections = groups.map(({ id, title }) => ({
  id: `typography-${id}`,
  title,
  description: id === 'body' ? '공통' : 'Wide · Compact',
}));

const styles = {
  section: css({
    display: 'grid',
    gap: '3',
    minW: '0',
    scrollMarginTop: 'calc(var(--layout-site-header-height) + 16px)',
  }),
  scroll: css({
    maxW: '100%',
    overflowX: 'auto',
    border: '1px solid token(colors.black.20)',
    borderRadius: '2',
  }),
  platformTable: css({ mt: '3' }),
  table: css({
    w: '100%',
    minW: '680px',
    borderCollapse: 'collapse',
    textAlign: 'left',
    '& th, & td': { px: '3', py: '2', borderBottom: '1px solid token(colors.black.20)' },
    '& thead th': { bg: 'surface.subtle' },
  }),
  copy: css({
    p: '0',
    border: '0',
    bg: 'transparent',
    color: 'inherit',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    _focusVisible: { outline: '2px solid token(colors.blue.100)' },
  }),
};

type StyleEntry = (typeof typographyStyles)[number];

const exampleWeights = {
  display: [900],
  heading: [700, 900],
  body: [400, 500, 600, 700, 800],
} as const;

function TypographyExample({
  entry,
  onCopy,
}: {
  entry: StyleEntry;
  onCopy: (path: string, code: string) => void;
}) {
  const sample = entry.language === 'ko' ? '호카 타이포그래피' : 'The Future HOKA';
  const platform = entry.platform === 'compact' ? 'mobile' : 'web';
  const variantProp =
    entry.platform === 'common' ? 'variant' : entry.platform === 'wide' ? 'web' : 'mo';
  const code = `<Typography ${variantProp}="${entry.variant}" language="${entry.language}">${sample}</Typography>`;
  const sampleProps =
    entry.platform === 'wide'
      ? { web: entry.variant }
      : entry.platform === 'compact'
        ? { mo: entry.variant as ResponsiveTypographyVariant }
        : { variant: entry.variant as ResponsiveTypographyVariant };

  return (
    <button
      type="button"
      className={styles.copy}
      aria-label={`${entry.path} 예시 코드 복사`}
      onClick={() => onCopy(entry.path, code)}
    >
      <PlatformProvider platform={platform}>
        <Typography {...sampleProps} language={entry.language} data-typography-style={entry.key}>
          {sample}
        </Typography>
      </PlatformProvider>
    </button>
  );
}

function TypographyStyleTable({
  label,
  entries,
  onCopy,
  withinTab = false,
}: {
  label: string;
  entries: readonly StyleEntry[];
  onCopy: (path: string, code: string) => void;
  withinTab?: boolean;
}) {
  const weights = exampleWeights[entries[0].group];
  const rows = new Map<string, StyleEntry[]>();
  for (const entry of entries) {
    const path = entry.path.replace(/[BMSE]$/, '');
    const row = rows.get(path);
    if (row) row.push(entry);
    else rows.set(path, [entry]);
  }

  return (
    <div
      className={withinTab ? `${styles.scroll} ${styles.platformTable}` : styles.scroll}
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            {[
              'Figma 경로',
              '글꼴',
              '크기',
              '행간',
              '자간',
              ...weights.map((weight) => `예시 ${weight}`),
            ].map((column) => (
              <th key={column} scope="col">
                <Typography variant="b6B">{column}</Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...rows].map(([path, [entry, ...variants]]) => (
            <tr key={path}>
              <th scope="row">
                <Typography variant="b6M" language="en">
                  {path}
                </Typography>
              </th>
              {[
                entry.fontFamily,
                `${entry.fontSize}px`,
                `${entry.lineHeight * 100}%`,
                entry.letterSpacing,
              ].map((value, index) => (
                <td key={index}>
                  <Typography variant="b7" language="en">
                    {value}
                  </Typography>
                </td>
              ))}
              {weights.map((weight) => {
                const example =
                  entry.fontWeight === weight
                    ? entry
                    : variants.find((variant) => variant.fontWeight === weight);
                return (
                  <td key={weight}>
                    {example ? <TypographyExample entry={example} onCopy={onCopy} /> : '—'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Figma의 등록 스타일과 실제 렌더링을 보여주는 비교표입니다. (Shows registered Figma text styles and live examples.) */
export function DesignGuideTypography() {
  const [copyStatus, setCopyStatus] = useState('');

  async function copyStyle(path: string, code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus(`${path} 코드 복사 완료`);
    } catch {
      setCopyStatus(`코드를 복사하지 못했습니다. ${code}`);
    }
  }

  return (
    <>
      <Typography as="p" variant="b8" tone="subtle">
        예시 문구를 클릭하면 해당 스타일의 적용 코드가 복사됩니다.
      </Typography>
      <Typography as="p" variant="b8" role="status" aria-live="polite">
        {copyStatus}
      </Typography>
      {groups.map(({ id, title }) => {
        const entries = typographyStyles.filter((entry) => entry.group === id);
        return (
          <section key={id} id={`typography-${id}`} className={styles.section}>
            <Typography as="h3" web="h10B" mo="h7B">
              {title}
            </Typography>
            {id === 'body' ? (
              <TypographyStyleTable
                label="Body 스타일 비교표"
                entries={entries}
                onCopy={copyStyle}
              />
            ) : (
              <SupportTabs
                ariaLabel={`${title} 플랫폼`}
                defaultValue="wide"
                variant="guide"
                tabs={platforms.map(({ value, label }) => ({
                  value,
                  label,
                  content: (
                    <TypographyStyleTable
                      label={`${title} ${label} 스타일 비교표`}
                      entries={entries.filter((entry) => entry.platform === value)}
                      onCopy={copyStyle}
                      withinTab
                    />
                  ),
                }))}
              />
            )}
          </section>
        );
      })}
    </>
  );
}
