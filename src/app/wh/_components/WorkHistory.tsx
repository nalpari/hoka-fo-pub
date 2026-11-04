'use client';

import { useRouter } from 'next/navigation';

import { useState, useTransition } from 'react';

import { css } from 'styled-system/css';

import { FileSummary } from '@/app/wh/_components/FileSummary';
import { WorkHistoryLoading } from '@/app/wh/_components/WorkHistoryLoading';

type Day = {
  readonly offset: number;
  readonly date: string;
  readonly files: readonly string[];
  readonly commits: readonly {
    readonly sha: string;
    readonly url: string;
    readonly message: string;
    readonly files: readonly string[];
  }[];
  readonly summary: string;
};

const styles = {
  page: css({
    minH: '100dvh',
    bg: '#f3f5f7',
    color: '#192a37',
    fontFamily: 'system-ui, sans-serif',
    px: '24px',
    py: '48px',
    '@media (max-width: 767px)': { px: '16px', py: '24px' },
  }),
  container: css({ maxW: '1280px', mx: 'auto' }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    gap: '24px',
    pb: '28px',
    '@media (max-width: 767px)': {
      alignItems: 'start',
      flexDir: 'column',
      gap: '14px',
      pb: '22px',
    },
  }),
  eyebrow: css({
    color: '#416478',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.08em',
    mb: '10px',
  }),
  title: css({
    fontSize: '30px',
    fontWeight: '700',
    letterSpacing: '-0.04em',
    lineHeight: '1.2',
    '@media (max-width: 767px)': { fontSize: '25px' },
  }),
  description: css({ color: '#5a6c79', fontSize: '14px', mt: '9px' }),
  repo: css({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '12px',
    color: '#536976',
    overflowWrap: 'anywhere',
  }),
  branch: css({
    color: '#245b73',
    bg: '#e2edf1',
    px: '9px',
    py: '4px',
    borderRadius: '4px',
    fontWeight: '700',
  }),
  toolbar: css({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    p: '12px',
    bg: '#fff',
    border: '1px solid #d9e1e5',
    borderRadius: '8px',
    '@media (max-width: 767px)': { alignItems: 'stretch', flexDir: 'column', gap: '10px' },
  }),
  tabs: css({ display: 'flex', gap: '4px', flexWrap: 'wrap' }),
  tab: css({
    px: '15px',
    py: '9px',
    color: '#516572',
    fontSize: '13px',
    fontWeight: '600',
    borderRadius: '5px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    _hover: { bg: '#eef3f5', color: '#192a37' },
    _focusVisible: { outline: '2px solid #34718c', outlineOffset: '2px' },
    '&[aria-pressed="true"]': { bg: '#21495d', color: '#fff' },
    '@media (max-width: 767px)': { px: '12px' },
  }),
  refresh: css({
    ml: 'auto',
    px: '15px',
    py: '9px',
    border: '1px solid #cbd7dd',
    borderRadius: '5px',
    color: '#294657',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    _hover: { bg: '#eef3f5' },
    _disabled: { opacity: '0.6', cursor: 'wait' },
    _focusVisible: { outline: '2px solid #34718c', outlineOffset: '2px' },
    '@media (max-width: 767px)': { ml: '0', alignSelf: 'flex-end' },
  }),
  overview: css({
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    gap: '20px',
    pt: '38px',
    pb: '20px',
    '@media (max-width: 767px)': {
      pt: '28px',
      alignItems: 'start',
      flexDir: 'column',
      gap: '12px',
    },
  }),
  dateLabel: css({ color: '#657985', fontSize: '12px', fontWeight: '600', mb: '5px' }),
  date: css({
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '-0.04em',
    '@media (max-width: 767px)': { fontSize: '18px', overflowWrap: 'anywhere' },
  }),
  counts: css({ color: '#5a6c79', fontSize: '13px', display: 'flex', gap: '18px' }),
  count: css({ color: '#192a37', fontWeight: '700', ml: '5px' }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
    gap: '16px',
    alignItems: 'start',
    '@media (max-width: 767px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
  }),
  panel: css({
    bg: '#fff',
    border: '1px solid #d9e1e5',
    borderRadius: '8px',
    overflow: 'hidden',
    minW: '0',
  }),
  panelHeader: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    px: '20px',
    py: '17px',
    borderBottom: '1px solid #e6ecef',
  }),
  heading: css({ fontSize: '15px', fontWeight: '700' }),
  headingActions: css({ display: 'flex', alignItems: 'center', gap: '12px' }),
  badge: css({
    color: '#526d7c',
    bg: '#edf2f4',
    borderRadius: '4px',
    px: '8px',
    py: '3px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '12px',
    fontWeight: '700',
  }),
  list: css({ listStyle: 'none', m: '0', p: '0' }),
  file: css({
    px: '20px',
    py: '10px',
    borderBottom: '1px solid #f0f3f5',
    color: '#344d5c',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '12px',
    lineHeight: '1.6',
    overflowWrap: 'anywhere',
    _last: { borderBottom: '0' },
  }),
  markers: css({ display: 'flex', flexWrap: 'wrap', gap: '4px', mt: '6px' }),
  marker: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minW: '24px',
    h: '22px',
    px: '5px',
    borderRadius: '4px',
    color: '#172a35',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '11px',
    fontWeight: '700',
    _focusVisible: { outline: '2px solid #34718c', outlineOffset: '2px' },
  }),
  filterReset: css({
    color: '#416478',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    _disabled: { opacity: '0.5', cursor: 'default' },
    _focusVisible: { outline: '2px solid #34718c', outlineOffset: '2px' },
  }),
  commit: css({
    px: '20px',
    py: '14px',
    borderBottom: '1px solid #f0f3f5',
    _last: { borderBottom: '0' },
  }),
  link: css({
    display: 'block',
    color: '#253e4d',
    fontSize: '13px',
    fontWeight: '600',
    lineHeight: '1.5',
    overflowWrap: 'anywhere',
    _hover: { color: '#246581', textDecoration: 'underline' },
    _focusVisible: { outline: '2px solid #34718c', outlineOffset: '3px' },
  }),
  sha: css({
    display: 'block',
    mt: '5px',
    color: '#6a7f8b',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '11px',
  }),
  empty: css({ px: '20px', py: '30px', color: '#607580', fontSize: '13px', lineHeight: '1.6' }),
  summary: css({
    m: '16px',
    p: '16px',
    bg: '#f1f6f8',
    color: '#344e5c',
    fontSize: '13px',
    lineHeight: '1.7',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
  }),
  summaryTitle: css({ display: 'block', color: '#28536a', fontWeight: '700', mb: '6px' }),
  error: css({
    mt: '24px',
    p: '20px',
    bg: '#fff',
    border: '1px solid #d9e1e5',
    borderRadius: '8px',
    color: '#813b38',
    fontSize: '14px',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
  }),
};

const periods = [
  { label: '7일 전', days: 7 },
  { label: '3일 전', days: 3 },
  { label: '어제', days: 1 },
  { label: '오늘', days: 0 },
] as const;

/** 날짜별 변경 내역과 새로고침을 제공합니다. (Displays changes by date and provides a refresh action.) */
export function WorkHistory({
  data,
  error,
}: {
  readonly data: readonly Day[];
  readonly error: string;
}) {
  const [selected, setSelected] = useState(0);
  const [selectedCommit, setSelectedCommit] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const day = data.find((item) => item.offset === selected);
  const filteredCommit = day?.commits.find((commit) => commit.sha === selectedCommit);
  const visibleFiles = filteredCommit
    ? (day?.files.filter((file) => filteredCommit.files.includes(file)) ?? [])
    : (day?.files ?? []);
  const fileCommits = new Map<string, Array<{ sha: string; index: number }>>();
  day?.commits.forEach((commit, index) => {
    new Set(commit.files).forEach((file) => {
      const matches = fileCommits.get(file) ?? [];
      matches.push({ sha: commit.sha, index });
      fileCommits.set(file, matches);
    });
  });

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>HOKA / DEVELOPMENT</p>
            <h1 className={styles.title}>변경 내역</h1>
            <p className={styles.description}>기간별 파일과 커밋을 확인합니다.</p>
          </div>
          <div className={styles.repo}>
            <span>nalpari/hoka-fo-pub</span>
            <span className={styles.branch}>main</span>
          </div>
        </header>
        <div className={styles.toolbar}>
          <nav aria-label="조회 날짜" className={styles.tabs}>
            {periods.map((period) => (
              <button
                type="button"
                key={period.days}
                aria-pressed={selected === period.days}
                className={styles.tab}
                onClick={() => {
                  setSelected(period.days);
                  setSelectedCommit(null);
                }}
              >
                {period.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            className={styles.refresh}
            disabled={pending}
            onClick={() => {
              setSelectedCommit(null);
              startTransition(() => router.refresh());
            }}
          >
            {pending ? '새로고침 중...' : '↻  새로고침'}
          </button>
        </div>
        {pending && <WorkHistoryLoading />}
        {error ? (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        ) : (
          day && (
            <>
              <div className={styles.overview}>
                <div>
                  <p className={styles.dateLabel}>조회 기간 · 한국 시간</p>
                  <p className={styles.date}>
                    {day.date}
                    {selected !== 0 && ` ~ ${data.find((item) => item.offset === 0)?.date ?? ''}`}
                  </p>
                </div>
                <div className={styles.counts}>
                  <span>
                    변경 파일 <strong className={styles.count}>{visibleFiles.length}</strong>
                  </span>
                  <span>
                    커밋 <strong className={styles.count}>{day.commits.length}</strong>
                  </span>
                </div>
              </div>
              <div className={styles.grid}>
                <section className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <h2 className={styles.heading}>변경 파일</h2>
                    <span className={styles.badge}>{visibleFiles.length}</span>
                  </div>
                  {visibleFiles.length ? (
                    <ul className={styles.list}>
                      {visibleFiles.map((file) => (
                        <li className={styles.file} key={file}>
                          {file}
                          <div className={styles.markers}>
                            {fileCommits.get(file)?.map(({ sha, index }) => (
                              <a
                                key={sha}
                                href={`#commit-${sha}`}
                                className={styles.marker}
                                style={{
                                  backgroundColor: `hsl(${(index * 137.508) % 360} 65% 82%)`,
                                }}
                                aria-label={`커밋 ${index + 1}, ${sha.slice(0, 7)}로 이동`}
                                title={`커밋 ${index + 1}: ${sha.slice(0, 7)}`}
                              >
                                {index + 1}
                              </a>
                            ))}
                          </div>
                          <FileSummary
                            key={`${selectedCommit ?? 'all'}:${(fileCommits.get(file) ?? []).map(({ sha }) => sha).join(',')}`}
                            file={file}
                            commits={(fileCommits.get(file) ?? [])
                              .filter(({ sha }) => !filteredCommit || sha === filteredCommit.sha)
                              .map(({ sha }) => sha)}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.empty}>
                      {filteredCommit
                        ? '선택한 커밋에 변경된 파일이 없습니다.'
                        : '선택한 기간에 변경된 파일이 없습니다.'}
                    </p>
                  )}
                </section>
                <section className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <div className={styles.headingActions}>
                      <h2 className={styles.heading}>커밋</h2>
                      <button
                        type="button"
                        className={styles.filterReset}
                        disabled={!filteredCommit}
                        onClick={() => setSelectedCommit(null)}
                      >
                        필터 초기화
                      </button>
                    </div>
                    <span className={styles.badge}>{day.commits.length}</span>
                  </div>
                  {day.commits.length ? (
                    <ul className={styles.list}>
                      {day.commits.map((commit, index) => (
                        <li className={styles.commit} key={commit.sha} id={`commit-${commit.sha}`}>
                          <button
                            type="button"
                            className={styles.marker}
                            style={{
                              backgroundColor: `hsl(${(index * 137.508) % 360} 65% 82%)`,
                              outline:
                                filteredCommit?.sha === commit.sha
                                  ? '2px solid #192a37'
                                  : undefined,
                              outlineOffset: '2px',
                              cursor: 'pointer',
                            }}
                            aria-label={`커밋 ${index + 1}, ${commit.sha.slice(0, 7)} 파일 필터`}
                            aria-pressed={filteredCommit?.sha === commit.sha}
                            onClick={() => setSelectedCommit(commit.sha)}
                          >
                            {index + 1}
                          </button>
                          <a
                            className={styles.link}
                            href={commit.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {commit.message}
                            <span className={styles.sha}>{commit.sha.slice(0, 7)}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.empty}>선택한 기간에 등록된 커밋이 없습니다.</p>
                  )}
                  {day.summary && (
                    <p className={styles.summary}>
                      <span className={styles.summaryTitle}>변경 요약</span>
                      {day.summary}
                    </p>
                  )}
                </section>
              </div>
            </>
          )
        )}
      </div>
    </main>
  );
}
