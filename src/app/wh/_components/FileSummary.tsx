'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';

import { css } from 'styled-system/css';

import './work-history-animations.css';

const styles = {
  details: css({ mt: '9px', fontFamily: 'system-ui, sans-serif', fontSize: '12px' }),
  trigger: css({
    color: '#416478',
    cursor: 'pointer',
    fontWeight: '600',
    _focusVisible: { outline: '2px solid #34718c', outlineOffset: '2px' },
  }),
  content: css({
    mt: '8px',
    p: '12px',
    bg: '#f1f6f8',
    color: '#344e5c',
    lineHeight: '1.7',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
  }),
  retry: css({ mt: '8px', color: '#245b73', textDecoration: 'underline', cursor: 'pointer' }),
  loading: css({ display: 'flex', alignItems: 'center', gap: '10px' }),
  tripod: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 4px)',
    gridTemplateRows: 'repeat(4, 4px)',
    gap: '2px',
    flexShrink: '0',
  }),
  dot: css({
    w: '4px',
    h: '4px',
    borderRadius: '50%',
    bg: '#416478',
    animation: 'whTripodHandoff 1200ms ease-in-out infinite',
    '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 'var(--tripod-apex)' },
  }),
};

// Tripod Handoff adapted from https://github.com/zzzzshawn/matrix (custom license).
const tripodCells = [
  [1, 3],
  [2, 2],
  [2, 4],
  [3, 1],
  [3, 3],
  [3, 5],
  [4, 0],
  [4, 2],
  [4, 4],
  [4, 6],
] as const;

function tripodOpacity(row: number, col: number, hubRow: number, hubCol: number) {
  const distance = Math.min(1, (Math.abs(row - hubRow) + Math.abs(col - hubCol)) / 5.4);
  const value = 0.08 + (1 - distance * distance * (3 - 2 * distance)) * 0.88;
  return row === 3 && col === 3 ? Math.max(value, 0.38) : value;
}

/** 파일 diff의 변경 요약을 요청할 때 표시합니다. (Displays an on-demand summary of a file diff.) */
export function FileSummary({
  file,
  commits,
}: {
  readonly file: string;
  readonly commits: readonly string[];
}) {
  const [state, setState] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    text: string;
  }>({ status: 'idle', text: '' });

  async function load() {
    setState({ status: 'loading', text: '' });
    try {
      const response = await fetch('/wh/file-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file, commits }),
      });
      const result: { summary?: string; error?: string } = await response.json();
      if (!response.ok || !result.summary)
        throw new Error(result.error || '변경 내용을 불러오지 못했습니다.');
      setState({ status: 'success', text: result.summary });
    } catch (error) {
      setState({
        status: 'error',
        text: error instanceof Error ? error.message : '변경 내용을 불러오지 못했습니다.',
      });
    }
  }

  return (
    <details
      className={styles.details}
      onToggle={(event) => {
        if (event.currentTarget.open && state.status === 'idle') void load();
      }}
    >
      <summary className={styles.trigger}>변경 내용 요약</summary>
      <div className={styles.content} aria-live="polite">
        {state.status === 'loading' ? (
          <div className={styles.loading} role="status">
            <span className={styles.tripod} aria-hidden="true">
              {tripodCells.map(([row, col]) => (
                <span
                  key={`${row}-${col}`}
                  className={styles.dot}
                  style={
                    {
                      gridRow: row,
                      gridColumn: col + 1,
                      '--tripod-apex': tripodOpacity(row, col, 1, 3),
                      '--tripod-left': tripodOpacity(row, col, 4, 0),
                      '--tripod-right': tripodOpacity(row, col, 4, 6),
                    } as CSSProperties
                  }
                />
              ))}
            </span>
            <span>diff를 분석하고 있습니다.</span>
          </div>
        ) : (
          state.text
        )}
        {state.status === 'error' && (
          <div>
            <button type="button" className={styles.retry} onClick={() => void load()}>
              다시 시도
            </button>
          </div>
        )}
      </div>
    </details>
  );
}
