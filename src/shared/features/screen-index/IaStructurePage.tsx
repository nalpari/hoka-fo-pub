'use client';

import { useMemo, useState } from 'react';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import { screens, type ScreenDefinition } from '@/data/screenRegistry';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import { isStorybookReady } from '@/shared/features/screen-index/storybookLinks';

type DeliveryStatus = 'ready' | 'pending' | 'delayed' | 'deleted';

type ScreenGroup = {
  depth1: string;
  screens: ScreenDefinition[];
};

type TreeRow = {
  id: string;
  path: string;
  ancestors: string[];
  depth: number;
  label: string;
  isBranch: boolean;
  screen?: ScreenDefinition;
};

const delayedIaNumbers = new Set([4, 26, 94, 143]);
const deletedIaNumbers = new Set([12, 49, 118]);

const previewStoryIds: Record<number, string> = {
  1: 'pages-home-main--width1920',
  3: 'pages-products-list--width1920',
};

const statusLabels: Record<DeliveryStatus, string> = {
  ready: '정상 진척',
  pending: '대기중',
  delayed: '지연 / 블락',
  deleted: '삭제 / 제외',
};

const styles = {
  page: css({ maxW: 'none', bg: '#f6f8ff', px: '6', py: '6', _mobile: { px: '4', py: '4' } }),
  dashboard: css({
    display: 'grid',
    gridTemplateColumns: 'minmax(280px, 0.9fr) minmax(0, 2.1fr)',
    gap: '4',
    mb: '4',
    _mobile: { gridTemplateColumns: '1fr' },
  }),
  summaryColumn: css({ display: 'grid', gap: '3' }),
  card: css({
    border: '1px solid #dbe5ff',
    borderRadius: '10px',
    bg: '#fff',
    boxShadow: '0 2px 8px rgba(38, 53, 99, 0.06)',
  }),
  summaryCard: css({ p: '4' }),
  cardHeading: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2',
    '& h2': { m: '0', color: '#17223d', fontSize: '14px' },
    '& span': { color: '#68718a', fontSize: '10px', fontWeight: '700' },
  }),
  summaryValue: css({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    mt: '4',
    '& strong': { color: '#2a14b4', fontSize: '27px', letterSpacing: '-0.04em' },
    '& span': { color: '#68718a', fontFamily: 'mono', fontSize: '11px' },
  }),
  progress: css({
    display: 'flex',
    overflow: 'hidden',
    h: '2.5',
    mt: '3',
    borderRadius: 'full',
    bg: '#dce4f5',
  }),
  readyProgress: css({ h: 'full', bg: '#2a14b4' }),
  pendingProgress: css({ h: 'full', bg: '#b9c4dd' }),
  delayedProgress: css({ h: 'full', bg: '#c51c1c' }),
  summaryFooter: css({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2',
    mt: '3',
    color: '#68718a',
    fontSize: '11px',
    '& b': { color: '#17223d' },
  }),
  issueCard: css({
    p: '3',
    borderColor: '#f2b8b5',
    bg: '#fff5f5',
    '& h2': { color: '#c51c1c' },
    '& p': { m: '1 0 0', color: '#b53c3c', fontSize: '12px' },
  }),
  issueButton: css({
    mt: '2',
    border: '0',
    bg: 'transparent',
    color: '#c51c1c',
    fontSize: '11px',
    fontWeight: '800',
    cursor: 'pointer',
    textDecoration: 'underline',
  }),
  navCard: css({ p: '4' }),
  groupGrid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '2',
    mt: '3',
    _mobile: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
  }),
  groupButton: css({
    display: 'grid',
    gap: '1.5',
    p: '2.5',
    border: '1px solid #dbe5ff',
    borderRadius: '5px',
    bg: '#eef3ff',
    textAlign: 'left',
    cursor: 'pointer',
    _hover: { borderColor: '#665be0', bg: '#e7e5ff' },
    '& strong': {
      overflow: 'hidden',
      color: '#17223d',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '11px',
    },
    '& span': { color: '#68718a', fontSize: '10px', fontWeight: '700' },
  }),
  selectedGroup: css({ borderColor: '#2a14b4', bg: '#e7e5ff' }),
  miniProgress: css({
    display: 'flex',
    overflow: 'hidden',
    h: '1',
    borderRadius: 'full',
    bg: '#dce4f5',
  }),
  toolbar: css({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '3',
    mb: '3',
    p: '3',
    border: '1px solid #dbe5ff',
    borderRadius: '7px',
    bg: '#fff',
  }),
  controls: css({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '2',
    _mobile: { w: '100%' },
  }),
  button: css({
    px: '3',
    py: '2',
    border: '1px solid #d4dced',
    borderRadius: '4px',
    bg: '#edf2ff',
    color: '#3e4965',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    _hover: { bg: '#e0e7ff' },
  }),
  search: css({ w: '260px', _mobile: { flex: '1', minW: '180px' } }),
  select: css({
    h: '9',
    px: '2',
    border: '1px solid #d4dced',
    borderRadius: '4px',
    bg: '#f7f9ff',
    color: '#3e4965',
    fontSize: '12px',
  }),
  legend: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5',
    fontSize: '10px',
    fontWeight: '800',
  }),
  chip: css({ px: '2', py: '1', border: '1px solid', borderRadius: '3px', cursor: 'pointer' }),
  readyChip: css({ borderColor: '#b9dfc8', bg: '#effbf3', color: '#17643b' }),
  pendingChip: css({ borderColor: '#d4dced', bg: '#f4f7ff', color: '#68718a' }),
  delayedChip: css({ borderColor: '#f2b8b5', bg: '#fff0ef', color: '#c51c1c' }),
  deletedChip: css({
    borderColor: '#d4d6de',
    bg: '#f0f2f6',
    color: '#7a7f8c',
    textDecoration: 'line-through',
  }),
  tableWrap: css({
    overflowX: 'auto',
    border: '1px solid #dbe5ff',
    borderRadius: '7px',
    bg: '#fff',
  }),
  table: css({
    w: '100%',
    minW: '1400px',
    borderCollapse: 'collapse',
    color: '#313a52',
    fontSize: '12px',
    '& th, & td': {
      px: '3',
      py: '2.5',
      borderBottom: '1px solid #e6ebf7',
      textAlign: 'left',
      verticalAlign: 'middle',
    },
    '& th': { bg: '#dce9ff', color: '#253653', fontSize: '11px', fontWeight: '800' },
  }),
  groupRow: css({
    bg: '#eaf0ff',
    '& td': { borderBottomColor: '#d4e0fb' },
    '& strong': { color: '#2a14b4', fontSize: '13px' },
    '& span': { color: '#68718a', fontSize: '11px', fontWeight: '600' },
  }),
  delayedRow: css({ bg: '#fff0ef', color: '#bd2d2d', '& td': { borderBottomColor: '#f6d0cd' } }),
  deletedRow: css({
    bg: '#f0f2f6',
    color: '#858a97',
    textDecoration: 'line-through',
    opacity: '0.72',
  }),
  treeCell: css({ minW: '410px' }),
  treeItem: css({ display: 'flex', alignItems: 'center', gap: '1.5' }),
  collapseButton: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    w: '5',
    h: '5',
    border: '0',
    borderRadius: '3px',
    bg: 'transparent',
    color: '#52627e',
    cursor: 'pointer',
    _hover: { bg: '#dce4f5' },
  }),
  spacer: css({ display: 'inline-block', w: '5' }),
  depthMarker: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minW: '6',
    px: '1',
    py: '0.5',
    borderRadius: '3px',
    bg: '#e3e0ff',
    color: '#2a14b4',
    fontSize: '10px',
    fontWeight: '800',
  }),
  hierarchyIcon: css({ color: '#2a14b4', fontSize: '13px' }),
  code: css({ color: '#5148d7', fontFamily: 'mono', fontSize: '11px', fontWeight: '700' }),
  wbs: css({ fontFamily: 'mono', fontSize: '11px', whiteSpace: 'nowrap' }),
  owner: css({
    display: 'inline-flex',
    px: '1.5',
    py: '0.5',
    borderRadius: '3px',
    bg: '#e8efff',
    color: '#344a70',
    fontSize: '10px',
    fontWeight: '800',
  }),
  preview: css({
    display: 'flex',
    justifyContent: 'center',
    gap: '1',
    '& a, & span': {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5',
      px: '1.5',
      py: '0.5',
      borderRadius: '3px',
      fontSize: '10px',
      fontWeight: '800',
    },
    '& a': {
      bg: '#e7e5ff',
      color: '#2a14b4',
      textDecoration: 'none',
      _hover: { bg: '#2a14b4', color: '#fff' },
    },
    '& span': { color: '#8d94a3' },
  }),
  note: css({ minW: '290px', lineHeight: '1.4', whiteSpace: 'normal!' }),
  statusTag: css({
    display: 'inline-flex',
    px: '1.5',
    py: '0.5',
    borderRadius: '3px',
    fontSize: '10px',
    fontWeight: '800',
  }),
  readyTag: css({ bg: '#e5f7ed', color: '#17643b' }),
  pendingTag: css({ bg: '#eff2f8', color: '#68718a' }),
  delayedTag: css({ bg: '#c51c1c', color: '#fff' }),
  deletedTag: css({ bg: '#d9dde6', color: '#68718a' }),
  empty: css({ p: '8', color: '#68718a', textAlign: 'center' }),
};

function getStatus(screen: ScreenDefinition): DeliveryStatus {
  if (deletedIaNumbers.has(screen.iaNumber)) return 'deleted';
  if (delayedIaNumbers.has(screen.iaNumber)) return 'delayed';
  return isStorybookReady(screen.iaNumber) ? 'ready' : 'pending';
}

function screenDepth(screen: ScreenDefinition) {
  for (let index = screen.depths.length - 1; index >= 0; index -= 1) {
    if (screen.depths[index]) return index;
  }

  return 0;
}

function ownerFor(screen: ScreenDefinition) {
  return screen.iaNumber % 2 === 0 ? '박서현' : '조맑은';
}

function wbsFor(screen: ScreenDefinition) {
  const start = (screen.iaNumber % 24) + 1;
  const end = Math.min(start + 4, 28);
  return '04.' + String(start).padStart(2, '0') + ' ~ 04.' + String(end).padStart(2, '0');
}

function createTreeRows(group: ScreenGroup): TreeRow[] {
  const rows: TreeRow[] = [];
  const knownPaths = new Set<string>();

  group.screens.forEach((screen) => {
    const terminalDepth = screenDepth(screen);

    if (terminalDepth === 0) {
      rows.push({
        id: 'screen-' + screen.iaNumber,
        path: screen.depths[0],
        ancestors: [],
        depth: 0,
        label: screen.depths[0],
        isBranch: false,
        screen,
      });
      return;
    }

    for (let depth = 1; depth <= terminalDepth; depth += 1) {
      const path = screen.depths.slice(0, depth + 1).join('|');
      const ancestors = Array.from({ length: depth - 1 }, (_, index) =>
        screen.depths.slice(0, index + 2).join('|'),
      );
      const isBranch = group.screens.some(
        (candidate) =>
          candidate.depths.slice(0, depth + 1).join('|') === path && screenDepth(candidate) > depth,
      );

      if (depth === terminalDepth) {
        rows.push({
          id: 'screen-' + screen.iaNumber,
          path: path + '|screen-' + screen.iaNumber,
          ancestors,
          depth,
          label: screen.depths[depth],
          isBranch,
          screen,
        });
        continue;
      }

      if (knownPaths.has(path)) continue;

      knownPaths.add(path);
      rows.push({
        id: 'group-' + path,
        path,
        ancestors,
        depth,
        label: screen.depths[depth],
        isBranch,
      });
    }
  });

  return rows;
}

export function IaStructurePage() {
  const [activeDepth1, setActiveDepth1] = useState('all');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | DeliveryStatus>('all');
  const [isExpanded, setIsExpanded] = useState(true);
  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set());

  const groups = useMemo<ScreenGroup[]>(
    () =>
      Array.from(new Set(screens.map((screen) => screen.depths[0]))).map((depth1) => ({
        depth1,
        screens: screens.filter((screen) => screen.depths[0] === depth1),
      })),
    [],
  );
  const counts = useMemo(
    () =>
      screens.reduce(
        (current, screen) => {
          current[getStatus(screen)] += 1;
          return current;
        },
        { ready: 0, pending: 0, delayed: 0, deleted: 0 } as Record<DeliveryStatus, number>,
      ),
    [],
  );
  const activeGroups =
    activeDepth1 === 'all' ? groups : groups.filter((group) => group.depth1 === activeDepth1);
  const visibleGroups = activeGroups
    .map((group) => ({
      ...group,
      screens: group.screens.filter((screen) => {
        const searchable = [
          ...screen.depths,
          screen.category,
          screen.screenCode,
          screen.note,
          ownerFor(screen),
        ]
          .join(' ')
          .toLowerCase();

        return (
          (statusFilter === 'all' || getStatus(screen) === statusFilter) &&
          searchable.includes(query.trim().toLowerCase())
        );
      }),
    }))
    .filter((group) => group.screens.length > 0);
  const activeTotal = visibleGroups.reduce((total, group) => total + group.screens.length, 0);
  const completePercent = (counts.ready / screens.length) * 100;
  const pendingPercent = (counts.pending / screens.length) * 100;
  const delayedPercent = (counts.delayed / screens.length) * 100;

  const togglePath = (path: string) => {
    setCollapsedPaths((current) => {
      const next = new Set(current);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const showDelayed = () => {
    setStatusFilter('delayed');
    setActiveDepth1('all');
  };

  return (
    <ContentLayout
      className={styles.page}
      breadcrumbItems={[
        { label: 'HOME', href: '/' },
        { label: 'DEVELOPMENT' },
        { label: 'IA 구조도' },
      ]}
      title="IA 구조도"
      description="확정 IA 기준 화면 체계와 구현 현황을 관리합니다."
    >
      <section className={styles.dashboard} aria-label="IA 구현 현황">
        <div className={styles.summaryColumn}>
          <article className={styles.card + ' ' + styles.summaryCard}>
            <div className={styles.cardHeading}>
              <h2>⌁ IA OVERALL SPRINT</h2>
              <span>Real-time</span>
            </div>
            <div className={styles.summaryValue}>
              <strong>{completePercent.toFixed(1)}%</strong>
              <span>
                {counts.ready} / {screens.length}P
              </span>
            </div>
            <div className={styles.progress}>
              <span
                className={styles.readyProgress}
                style={{ width: String(completePercent) + '%' }}
              />
              <span
                className={styles.pendingProgress}
                style={{ width: String(pendingPercent) + '%' }}
              />
              <span
                className={styles.delayedProgress}
                style={{ width: String(delayedPercent) + '%' }}
              />
            </div>
            <div className={styles.summaryFooter}>
              <span>총 {screens.length}개 화면</span>
              <span>
                완료 <b>{counts.ready}</b> · 대기 {counts.pending} · 지연 <b>{counts.delayed}</b>
              </span>
            </div>
          </article>
          <article className={styles.card + ' ' + styles.issueCard}>
            <div className={styles.cardHeading}>
              <h2>⚠ BLOCKED / 긴급 이슈</h2>
              <span>{counts.delayed}건 대응중</span>
            </div>
            <p>지연 상태로 분류된 IA 화면의 일정과 의존성을 확인해야 합니다.</p>
            <button type="button" className={styles.issueButton} onClick={showDelayed}>
              지연 이슈만 보기 →
            </button>
          </article>
        </div>

        <section className={styles.card + ' ' + styles.navCard} aria-label="화면 체계 NAV 탭 분류">
          <div className={styles.cardHeading}>
            <h2>▣ 화면 체계 NAV 탭 분류 ({groups.length}개 영역)</h2>
            <span>● 완료 · ● 대기 · ● 지연</span>
          </div>
          <div className={styles.groupGrid}>
            {groups.map((group) => {
              const groupCounts = group.screens.reduce(
                (current, screen) => {
                  current[getStatus(screen)] += 1;
                  return current;
                },
                { ready: 0, pending: 0, delayed: 0, deleted: 0 } as Record<DeliveryStatus, number>,
              );
              const groupTotal = group.screens.length;

              return (
                <button
                  key={group.depth1}
                  type="button"
                  className={
                    styles.groupButton +
                    (activeDepth1 === group.depth1 ? ' ' + styles.selectedGroup : '')
                  }
                  onClick={() => {
                    setActiveDepth1(group.depth1);
                    setStatusFilter('all');
                  }}
                >
                  <Flex gap="2" alignItems="center">
                    <strong>{group.depth1}</strong>
                    <span>{groupTotal}P</span>
                  </Flex>
                  <span className={styles.miniProgress}>
                    <span
                      className={styles.readyProgress}
                      style={{ width: String((groupCounts.ready / groupTotal) * 100) + '%' }}
                    />
                    <span
                      className={styles.pendingProgress}
                      style={{ width: String((groupCounts.pending / groupTotal) * 100) + '%' }}
                    />
                    <span
                      className={styles.delayedProgress}
                      style={{ width: String((groupCounts.delayed / groupTotal) * 100) + '%' }}
                    />
                  </span>
                  <span>
                    완료 {groupCounts.ready} · 대기 {groupCounts.pending} · 지연{' '}
                    {groupCounts.delayed}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </section>

      <section aria-label="IA 화면 목록">
        <div className={styles.toolbar}>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.button}
              onClick={() => {
                setIsExpanded((current) => !current);
                setCollapsedPaths(new Set());
              }}
            >
              ⌄ 전체 {isExpanded ? '접기' : '펼치기'}
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={() => {
                setActiveDepth1('all');
                setStatusFilter('all');
              }}
            >
              전체 초기화
            </button>
            <TextInput
              className={styles.search}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="화면명, 메뉴명, 화면 코드 검색"
              aria-label="IA 화면 검색"
            />
            <select
              className={styles.select}
              aria-label="상태 필터"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as 'all' | DeliveryStatus)}
            >
              <option value="all">상태 전체</option>
              <option value="ready">정상 진척</option>
              <option value="pending">대기중</option>
              <option value="delayed">지연 / 블락</option>
              <option value="deleted">삭제 / 제외</option>
            </select>
          </div>
          <div className={styles.legend} aria-label="구현 상태 범례">
            {(['ready', 'pending', 'delayed', 'deleted'] as DeliveryStatus[]).map((status) => (
              <button
                key={status}
                type="button"
                className={
                  styles.chip +
                  ' ' +
                  (status === 'ready'
                    ? styles.readyChip
                    : status === 'pending'
                      ? styles.pendingChip
                      : status === 'delayed'
                        ? styles.delayedChip
                        : styles.deletedChip)
                }
                onClick={() => setStatusFilter(status)}
              >
                ● {statusLabels[status]} {counts[status]}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>메뉴 / 화면 계층 (IA Tree)</th>
                <th>구분</th>
                <th>화면 코드</th>
                <th>WBS</th>
                <th>작업자</th>
                <th>바로가기 (PC/MO)</th>
                <th>비고 / 이슈</th>
              </tr>
            </thead>
            <tbody>
              {visibleGroups.map((group) => (
                <GroupRows
                  key={group.depth1}
                  group={group}
                  isExpanded={isExpanded || query.trim().length > 0}
                  collapsedPaths={collapsedPaths}
                  onToggle={togglePath}
                />
              ))}
            </tbody>
          </table>
          {!visibleGroups.length && <p className={styles.empty}>선택한 조건의 화면이 없습니다.</p>}
        </div>
        <p className={styles.empty}>현재 {activeTotal}개 화면을 표시합니다.</p>
      </section>
    </ContentLayout>
  );
}

function GroupRows({
  group,
  isExpanded,
  collapsedPaths,
  onToggle,
}: {
  group: ScreenGroup;
  isExpanded: boolean;
  collapsedPaths: ReadonlySet<string>;
  onToggle: (path: string) => void;
}) {
  const treeRows = createTreeRows(group);
  const groupPath = group.depth1;
  const groupOpen = !collapsedPaths.has(groupPath);

  return (
    <>
      <tr className={styles.groupRow}>
        <td className={styles.treeCell}>
          <div className={styles.treeItem}>
            <button
              type="button"
              className={styles.collapseButton}
              aria-label={group.depth1 + (groupOpen ? ' 접기' : ' 펼치기')}
              onClick={() => onToggle(groupPath)}
            >
              {groupOpen ? '⌄' : '›'}
            </button>
            <span className={styles.depthMarker}>D1</span>
            <span className={styles.hierarchyIcon}>▱</span>
            <strong>{group.depth1}</strong>
            <span>({group.screens.length} screens)</span>
          </div>
        </td>
        <td>대분류</td>
        <td className={styles.code}>CAT_{group.depth1.replaceAll(' ', '_').toUpperCase()}</td>
        <td className={styles.wbs}>04.01 ~ 04.30</td>
        <td>
          <span className={styles.owner}>조맑은</span>
        </td>
        <td>
          <span className={styles.preview}>-</span>
        </td>
        <td className={styles.note}>확정 IA 기준 화면 영역</td>
      </tr>
      {isExpanded &&
        groupOpen &&
        treeRows.map((row) => {
          const hiddenByParent = row.ancestors.some((path) => collapsedPaths.has(path));
          if (hiddenByParent) return null;

          const status = row.screen ? getStatus(row.screen) : undefined;
          const rowClass =
            status === 'delayed'
              ? styles.delayedRow
              : status === 'deleted'
                ? styles.deletedRow
                : '';

          return (
            <tr key={row.id} className={rowClass}>
              <td className={styles.treeCell}>
                <div
                  className={styles.treeItem}
                  style={{ paddingLeft: String((row.depth + 1) * 20) + 'px' }}
                >
                  {row.isBranch ? (
                    <button
                      type="button"
                      className={styles.collapseButton}
                      aria-label={row.label + (collapsedPaths.has(row.path) ? ' 펼치기' : ' 접기')}
                      onClick={() => onToggle(row.path)}
                    >
                      {collapsedPaths.has(row.path) ? '›' : '⌄'}
                    </button>
                  ) : (
                    <span className={styles.spacer} />
                  )}
                  <span className={styles.depthMarker}>D{row.depth + 1}</span>
                  <span className={styles.hierarchyIcon}>
                    {status === 'delayed'
                      ? '⚠'
                      : status === 'deleted'
                        ? '⊘'
                        : row.isBranch
                          ? '▱'
                          : '▹'}
                  </span>
                  <span>{row.label}</span>
                </div>
              </td>
              <td>
                {row.screen?.category ??
                  (row.depth === 1 ? '중분류' : row.depth === 2 ? '소분류' : '상세')}
              </td>
              <td className={styles.code}>{row.screen?.screenCode ?? '-'}</td>
              <td className={styles.wbs}>{row.screen ? wbsFor(row.screen) : '-'}</td>
              <td>
                {row.screen ? <span className={styles.owner}>{ownerFor(row.screen)}</span> : '-'}
              </td>
              <td>
                {row.screen && previewStoryIds[row.screen.iaNumber] ? (
                  <div className={styles.preview}>
                    <a
                      href={'/?path=/story/' + previewStoryIds[row.screen.iaNumber]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      ▣ PC
                    </a>
                    <a
                      href={'/?path=/story/' + previewStoryIds[row.screen.iaNumber]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      ▯ MO
                    </a>
                  </div>
                ) : (
                  <div className={styles.preview}>
                    <span>N/A</span>
                  </div>
                )}
              </td>
              <td className={styles.note}>
                {status === 'delayed' && <span className={styles.delayedTag}>WBS 초과</span>}
                {status === 'deleted' && <span className={styles.deletedTag}>삭제 / 제외</span>}
                {row.screen ? row.screen.note || '-' : '-'}
              </td>
            </tr>
          );
        })}
    </>
  );
}
