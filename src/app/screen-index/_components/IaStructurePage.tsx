'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import {
  faBan,
  faChevronDown,
  faChevronRight,
  faDesktop,
  faFileLines,
  faFolder,
  faFolderOpen,
  faFolderTree,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Fragment, useMemo, useState } from 'react';

import { css, cva } from 'styled-system/css';
import { Box, Flex, Grid, Stack } from 'styled-system/jsx';

import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentLayout } from '@/components/common/layouts/ContentLayout';

import {
  getScreenConnection,
  getScreenStoryHref,
  isScreenDeleted,
} from '@/app/screen-index/screenConnections';
import {
  getScreenProgress,
  type ScreenProgress,
  type ScreenProgressOverrides,
} from '@/app/screen-index/storybookLinks';
import { type ScreenDefinition, screens } from '@/data/screenRegistry';

config.autoAddCss = false;

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

type WbsAssignment = {
  period: string;
};

const progressFields = [
  { key: 'pcDesign', label: 'PC 디자인', kind: 'design' },
  { key: 'moDesign', label: 'MO 디자인', kind: 'design' },
  { key: 'pcPublishing', label: 'PC 퍼블리싱', kind: 'publishing' },
  { key: 'moPublishing', label: 'MO 퍼블리싱', kind: 'publishing' },
] as const;

const progressLabels = {
  received: '수급',
  missing: '미수급',
  'revision-planned': '수정예정',
  ready: '완료',
  revision: '수정',
  working: '진행중',
  pending: '대기',
};

const emptyProgressOverrides: ScreenProgressOverrides = {};

function matchesProgressFilter(
  screen: ScreenDefinition,
  filter: string,
  overrides: ScreenProgressOverrides,
) {
  if (filter === 'all') return true;
  if (filter === 'deleted') return isScreenDeleted(screen);
  if (isScreenDeleted(screen)) return false;
  return progressFields.some(
    ({ key }) => filter === key + ':' + (getScreenProgress(screen, overrides)[key] ?? 'unknown'),
  );
}

const directWbsAssignments: Record<string, WbsAssignment> = {
  레이아웃: { period: '2026.09.21 ~ 2026.09.23' },
  Main: { period: '2026.10.02 ~ 2026.10.05' },
  '런칭 캘린더': { period: '2026.10.28' },
  기획전: { period: '2026.10.29' },
  이벤트: { period: '2026.10.30' },
  장바구니: { period: '2026.10.22 ~ 2026.10.23' },
  주문: { period: '2026.10.26 ~ 2026.10.27' },
  마이페이지: { period: '2026.10.15 ~ 2026.10.21' },
  카테고리: { period: '2026.10.07 ~ 2026.10.14' },
  고객센터: { period: '2026.10.15 ~ 2026.10.21' },
  로그인: { period: '2026.10.06 ~ 2026.10.07' },
  회원가입: { period: '2026.10.08 ~ 2026.10.12' },
  Company: { period: '2026.11.06 ~ 2026.11.10' },
};

const categoryWbsAssignments = {
  목록: { period: '2026.10.07 ~ 2026.10.14' },
  상세: { period: '2026.10.07 ~ 2026.10.14' },
} satisfies Record<string, WbsAssignment>;

const styles = {
  page: css({ maxW: 'none', bg: '#f6f8ff', px: '6', py: '6', _mobile: { px: '4', py: '4' } }),

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
    '& h2': {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5',
      m: '0',
      color: '#17223d',
      fontSize: '14px',
    },
    '& span': { color: '#68718a', fontSize: '12' /* 기존: 10px */, fontWeight: '700' },
  }),

  navCard: css({ p: '4' }),

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
      fontSize: '12' /* 기존: 11px */,
    },
    '& span': { color: '#68718a', fontSize: '12' /* 기존: 10px */, fontWeight: '700' },
  }),
  selectedGroup: css({ borderColor: '#2a14b4', bg: '#e7e5ff' }),
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

  table: css({
    w: '100%',
    minW: '1300px',
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
    '& th': {
      whiteSpace: 'nowrap',
      bg: '#dce9ff',
      color: '#253653',
      fontSize: '12' /* 기존: 11px */,
      fontWeight: '800',
    },
    '& td[rowspan]': { verticalAlign: 'top' },
  }),
  groupRow: css({
    bg: '#eaf0ff',
    '& td': { borderBottomColor: '#d4e0fb' },

    '& span': { color: '#68718a', fontSize: '12' /* 기존: 11px */, fontWeight: '600' },
  }),
  deletedRow: css({
    bg: '#f0f2f6',
    color: '#858a97',
    textDecoration: 'line-through',
    opacity: '0.72',
  }),
  treeCell: css({ minW: '320px' }),
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
    fontSize: '12' /* 기존: 10px */,
    fontWeight: '800',
  }),
  hierarchyIcon: css({ color: '#2a14b4', fontSize: '14' /* 기존 13px */ }),
  code: css({
    color: '#5148d7',
    fontFamily: 'mono',
    fontSize: '12' /* 기존: 11px */,
    fontWeight: '700',
  }),
  wbs: css({ fontFamily: 'mono', fontSize: '12' /* 기존: 11px */, whiteSpace: 'nowrap' }),
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
      fontSize: '12' /* 기존: 10px */,
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
  path: cva({
    base: {
      display: 'inline-block',
      maxW: '100%',
      px: '2',
      py: '1',
      border: '1px solid #dce1eb',
      borderRadius: '4px',
      bg: '#f4f6fa',
      color: '#536078',
      fontFamily: 'mono',
      fontSize: '12px',
      lineHeight: '1.4',
      overflowWrap: 'anywhere',
      whiteSpace: 'normal',
    },
    variants: {
      page: {
        true: {
          borderColor: '#cbc5ff',
          bg: '#e7e5ff',
          color: '#2a14b4',
          fontWeight: '700',
        },
      },
    },
  }),
  note: css({ minW: '290px', lineHeight: '1.4', whiteSpace: 'normal!' }),
  statusTag: css({
    display: 'inline-flex',
    whiteSpace: 'nowrap',
    px: '1.5',
    py: '0.5',
    borderRadius: '3px',
    fontSize: '12' /* 기존: 10px */,
    fontWeight: '800',
  }),
  readyTag: css({ bg: '#e5f7ed', color: '#17643b' }),
  workingTag: css({ bg: '#e7e5ff', color: '#5148d7' }),
  pendingTag: css({ bg: '#eff2f8', color: '#68718a' }),
  missingTag: css({ bg: '#fff0ef', color: '#b42318' }),
  revisionTag: css({ bg: '#fff7e5', color: '#935600' }),
  deletedTag: css({ bg: '#d9dde6', color: '#68718a' }),
  empty: css({ p: '8', color: '#68718a', textAlign: 'center' }),
};

function getProgressTagClass(value: ScreenProgress[keyof ScreenProgress]) {
  if (value === 'ready' || value === 'received') return styles.readyTag;
  if (value === 'working') return styles.workingTag;
  if (value === 'missing') return styles.missingTag;
  if (value === 'revision-planned' || value === 'revision') return styles.revisionTag;
  return styles.pendingTag;
}

function renderProgressCells(
  kind: 'design' | 'publishing',
  progress: ScreenProgress | undefined,
  screen: ScreenDefinition | undefined,
  progressOverrides: ScreenProgressOverrides,
) {
  return progressFields
    .filter((field) => field.kind === kind)
    .map(({ key }) => {
      const value = progress?.[key];
      return (
        <td key={key}>
          {value ? (
            <Typography
              as="span"
              className={styles.statusTag + ' ' + getProgressTagClass(value)}
              title={
                key.endsWith('Publishing') &&
                screen &&
                progressOverrides[screen.iaNumber]?.[key] === undefined
                  ? '기존 통합 상태를 이관한 초기값입니다. PC·MO별 확인값으로 갱신할 수 있습니다.'
                  : undefined
              }
            >
              {progressLabels[value]}
            </Typography>
          ) : (
            '-'
          )}
        </td>
      );
    });
}

function screenDepth(screen: ScreenDefinition) {
  for (let index = screen.depths.length - 1; index >= 0; index -= 1) {
    if (screen.depths[index]) return index;
  }

  return 0;
}

function getWbsAssignment(depths: readonly string[]): WbsAssignment | undefined {
  const [depth1, ...descendants] = depths;

  if (depth1 === '공통') {
    if (descendants[0] === '전체메뉴') {
      return { period: '2026.09.30' };
    }

    if (descendants[0] === '검색' || descendants[0] === '검색결과') {
      return { period: '2026.10.22 ~ 2026.10.23' };
    }
  }

  if (depth1 === 'MEN' || depth1 === 'WOMEN' || depth1 === 'SHOES') {
    const terminalDepth = descendants.reduce((lastDepth, depth) => (depth ? depth : lastDepth), '');
    if (terminalDepth === '목록' || terminalDepth === '상세') {
      return categoryWbsAssignments[terminalDepth];
    }
    return directWbsAssignments.카테고리;
  }

  const assignmentKey =
    depth1 === 'SUPPORT' ? '고객센터' : depth1 === 'About HOKA' ? 'Company' : depth1;
  return directWbsAssignments[assignmentKey];
}

function createTreeRows(group: ScreenGroup): TreeRow[] {
  const rows: TreeRow[] = [];
  const knownPaths = new Set<string>();
  const screenPaths = new Set(
    group.screens.map((screen) => screen.depths.slice(0, screenDepth(screen) + 1).join('|')),
  );

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
        if (isBranch) knownPaths.add(path);
        rows.push({
          id: 'screen-' + screen.iaNumber,
          path: isBranch ? path : path + '|screen-' + screen.iaNumber,
          ancestors,
          depth,
          label: screen.depths[depth],
          isBranch,
          screen,
        });
        continue;
      }

      if (knownPaths.has(path) || screenPaths.has(path)) continue;

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

/**
 * IA 계층과 PC·MO별 작업 현황을 탐색합니다. (Explores the IA hierarchy and delivery progress by platform.)
 *
 * [ 개발팀 바인딩 ] IA 관리 소유자는 확인한 화면별 상태를 내부 IA 번호 기준 progressOverrides로
 * 전달합니다. 디자인은 received/missing/revision-planned/null, 퍼블리싱은 ready/revision/working/pending을 PC·MO별로
 * 독립 전달하며 새 props는 즉시 반영합니다. 조사 목록에 없는 디자인은 미수급, 명시적 null은 -이며 퍼블리싱 기본값은 기존
 * 통합 상태를 이관한 값입니다. 조회·수정·저장 API와 상태 변경 UI는 구현하지 않습니다.
 */
export function IaStructurePage({
  previewEnvironment = 'app',
  progressOverrides = emptyProgressOverrides,
}: {
  previewEnvironment?: 'app' | 'storybook';
  progressOverrides?: ScreenProgressOverrides;
}) {
  const [feedback, setFeedback] = useState('');
  const [activeDepth1, setActiveDepth1] = useState('all');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
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
  const activeGroups =
    activeDepth1 === 'all' ? groups : groups.filter((group) => group.depth1 === activeDepth1);
  const visibleGroups = activeGroups
    .map((group) => ({
      ...group,
      screens: group.screens.filter((screen) => {
        const searchable = [
          ...screen.depths,
          ...(screen.sourceDepths ?? []),
          String(screen.sourceIaNumber ?? ''),
          String(screen.iaNumber),
          getScreenConnection(screen).route ?? '',
          ...getScreenConnection(screen).sourceFiles,
          screen.category,
          screen.screenCode,
          screen.note,
        ]
          .join(' ')
          .toLowerCase();

        return (
          matchesProgressFilter(screen, statusFilter, progressOverrides) &&
          searchable.includes(query.trim().toLowerCase())
        );
      }),
    }))
    .filter((group) => group.screens.length > 0);
  const activeTotal = visibleGroups.reduce((total, group) => total + group.screens.length, 0);
  const copyPreviewPath = (path: string) => {
    setFeedback('');
    if (!navigator.clipboard) {
      setFeedback('새 창을 열었습니다. 이 브라우저에서는 경로 복사를 사용할 수 없습니다.');
      return;
    }
    void navigator.clipboard.writeText(path).then(
      () => setFeedback('경로를 클립보드에 복사했습니다.'),
      () => setFeedback('새 창을 열었지만 경로를 복사하지 못했습니다.'),
    );
  };

  const togglePath = (path: string) => {
    setCollapsedPaths((current) => {
      const next = new Set(current);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
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
    >
      {feedback && (
        <Typography
          as="p"
          role="status"
          className={css({ my: '2', color: '#3e4965', fontSize: '12px' })}
        >
          {feedback}
        </Typography>
      )}
      <Grid
        as="section"
        gridTemplateColumns="220px minmax(0, 1fr)"
        gap="4"
        mb="4"
        _mobile={{ gridTemplateColumns: '1fr' }}
        aria-label="IA 화면 현황"
      >
        <article className={styles.card + ' ' + styles.summaryCard}>
          <div className={styles.cardHeading}>
            <Typography as="h2">IA 화면 현황</Typography>
          </div>
          <Typography
            as="p"
            className={css({ my: '3', color: '#2a14b4', fontSize: '32px', fontWeight: '800' })}
          >
            {screens.length}
            <Typography as="span">개 화면</Typography>
          </Typography>
          <Typography as="p" className={css({ color: '#68718a', fontSize: '12px' })}>
            PC · MO 디자인 및 퍼블리싱 별도 관리
          </Typography>
        </article>
        <section className={styles.card + ' ' + styles.navCard} aria-label="화면 체계 NAV 탭 분류">
          <div className={styles.cardHeading}>
            <Typography as="h2">
              <FontAwesomeIcon icon={faFolderTree} aria-hidden="true" />
              화면 체계 NAV 탭 분류 ({groups.length}개 영역)
            </Typography>
          </div>
          <Grid
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            gap="2"
            mt="3"
            _mobile={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
          >
            {groups.map((group) => (
              <button
                key={group.depth1}
                type="button"
                aria-pressed={activeDepth1 === group.depth1}
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
                  <Typography as="span">{group.screens.length}P</Typography>
                </Flex>
              </button>
            ))}
          </Grid>
        </section>
      </Grid>

      <section aria-label="IA 화면 목록">
        <Flex
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          gap="3"
          mb="3"
          p="3"
          border="1px solid #dbe5ff"
          borderRadius="7px"
          bg="#fff"
        >
          <Flex flexWrap="wrap" alignItems="center" gap="2" _mobile={{ w: '100%' }}>
            <button
              type="button"
              className={styles.button}
              onClick={() => {
                setIsExpanded((current) => !current);
                setCollapsedPaths(new Set());
              }}
            >
              <FontAwesomeIcon
                icon={isExpanded ? faChevronDown : faChevronRight}
                aria-hidden="true"
              />{' '}
              전체 {isExpanded ? '접기' : '펼치기'}
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
              placeholder="화면명, IA 번호, 코드, URL, 파일 경로 검색"
              aria-label="IA 화면 검색"
            />
            <select
              className={styles.select}
              aria-label="상태 필터"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">상태 전체</option>
              {progressFields.map(({ key, label, kind }) => (
                <optgroup key={key} label={label}>
                  {(kind === 'design'
                    ? (['received', 'missing', 'revision-planned'] as const)
                    : (['ready', 'revision', 'working', 'pending'] as const)
                  ).map((value) => (
                    <option key={value} value={key + ':' + value}>
                      {label} · {progressLabels[value]}
                    </option>
                  ))}
                  {kind === 'design' && (
                    <option value={key + ':unknown'}>{label} · 확인 전 (-)</option>
                  )}
                </optgroup>
              ))}
              <option value="deleted">삭제 / 제외</option>
            </select>
          </Flex>
        </Flex>

        <Box overflowX="auto" border="1px solid #dbe5ff" borderRadius="7px" bg="#fff">
          <table className={styles.table}>
            <thead>
              <tr>
                <th rowSpan={2} scope="col">
                  메뉴 / 화면 계층 (IA Tree)
                </th>
                <th rowSpan={2} scope="col">
                  구분
                </th>
                <th scope="col">화면 코드</th>
                <th scope="col">
                  {previewEnvironment === 'storybook' ? 'Storybook 미리보기' : '실제 페이지'}
                </th>
                <th scope="col">PC 디자인</th>
                <th scope="col">MO 디자인</th>
                <th scope="col">비고 / 이슈</th>
              </tr>
              <tr>
                <th colSpan={2} scope="col">
                  WBS
                </th>
                <th scope="col">PC 퍼블리싱</th>
                <th scope="col">MO 퍼블리싱</th>
                <th scope="col">작업 파일</th>
              </tr>
            </thead>
            <tbody>
              {visibleGroups.map((group) => (
                <GroupRows
                  key={group.depth1}
                  group={group}
                  previewEnvironment={previewEnvironment}
                  progressOverrides={progressOverrides}
                  isExpanded={isExpanded || query.trim().length > 0}
                  collapsedPaths={collapsedPaths}
                  onToggle={togglePath}
                  onCopyPath={copyPreviewPath}
                />
              ))}
            </tbody>
          </table>
          {!visibleGroups.length && (
            <Typography as="p" className={styles.empty}>
              선택한 조건의 화면이 없습니다.
            </Typography>
          )}
        </Box>
        <Typography as="p" className={styles.empty}>
          현재 {activeTotal}개 화면을 표시합니다.
        </Typography>
      </section>
    </ContentLayout>
  );
}

function GroupRows({
  group,
  previewEnvironment,
  progressOverrides,
  isExpanded,
  collapsedPaths,
  onToggle,
  onCopyPath,
}: {
  group: ScreenGroup;
  previewEnvironment: 'app' | 'storybook';
  progressOverrides: ScreenProgressOverrides;
  isExpanded: boolean;
  collapsedPaths: ReadonlySet<string>;
  onToggle: (path: string) => void;
  onCopyPath: (path: string) => void;
}) {
  const treeRows = createTreeRows(group);
  const groupPath = group.depth1;
  const groupOpen = !collapsedPaths.has(groupPath);
  const groupWbs = getWbsAssignment([group.depth1]);

  return (
    <>
      <tr className={styles.groupRow}>
        <td className={styles.treeCell} rowSpan={groupWbs ? 2 : undefined}>
          <div className={styles.treeItem}>
            <button
              type="button"
              className={styles.collapseButton}
              aria-label={group.depth1 + (groupOpen ? ' 접기' : ' 펼치기')}
              onClick={() => onToggle(groupPath)}
            >
              <FontAwesomeIcon
                icon={groupOpen ? faChevronDown : faChevronRight}
                aria-hidden="true"
              />
            </button>
            <Typography as="span" className={styles.depthMarker}>
              D1
            </Typography>
            <span className={styles.hierarchyIcon}>
              <FontAwesomeIcon icon={faFolderOpen} aria-hidden="true" />
            </span>
            <strong className={css({ color: '#2a14b4', fontSize: '14' /* 기존 13px */ })}>
              {group.depth1}
            </strong>
            <Typography as="span">({group.screens.length} screens)</Typography>
          </div>
        </td>
        <td rowSpan={groupWbs ? 2 : undefined}>대분류</td>
        <td className={styles.code}>CAT_{group.depth1.replaceAll(' ', '_').toUpperCase()}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td className={styles.note}>확정 IA 기준 화면 영역</td>
      </tr>
      {groupWbs && (
        <tr className={styles.groupRow}>
          <td colSpan={2} className={styles.wbs}>
            {groupWbs.period}
          </td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      )}
      {isExpanded &&
        groupOpen &&
        treeRows.map((row) => {
          const hiddenByParent = row.ancestors.some((path) => collapsedPaths.has(path));
          if (hiddenByParent) return null;

          const deleted = row.screen ? isScreenDeleted(row.screen) : false;
          const progress =
            row.screen && !deleted ? getScreenProgress(row.screen, progressOverrides) : undefined;
          const rowWbs = row.screen ? getWbsAssignment(row.screen.depths) : undefined;
          const connection = row.screen ? getScreenConnection(row.screen) : undefined;
          const route = connection?.route;
          const rowClass = deleted ? styles.deletedRow : '';

          return (
            <Fragment key={row.id}>
              <tr className={rowClass}>
                <td className={styles.treeCell} rowSpan={row.screen ? 2 : undefined}>
                  <div
                    className={styles.treeItem}
                    style={{ paddingLeft: String((row.depth + 1) * 20) + 'px' }}
                  >
                    {row.isBranch ? (
                      <button
                        type="button"
                        className={styles.collapseButton}
                        aria-label={
                          row.label + (collapsedPaths.has(row.path) ? ' 펼치기' : ' 접기')
                        }
                        onClick={() => onToggle(row.path)}
                      >
                        <FontAwesomeIcon
                          icon={collapsedPaths.has(row.path) ? faChevronRight : faChevronDown}
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      <span className={styles.spacer} />
                    )}
                    <Typography as="span" className={styles.depthMarker}>
                      D{row.depth + 1}
                    </Typography>
                    <span className={styles.hierarchyIcon}>
                      <FontAwesomeIcon
                        icon={deleted ? faBan : row.isBranch ? faFolder : faFileLines}
                        aria-hidden="true"
                      />
                    </span>
                    <Typography as="span">{row.label}</Typography>
                  </div>
                </td>
                <td rowSpan={row.screen ? 2 : undefined}>
                  {row.screen?.category ??
                    (row.depth === 1 ? '중분류' : row.depth === 2 ? '소분류' : '상세')}
                </td>
                <td className={styles.code}>{row.screen?.screenCode ?? '-'}</td>
                <td>
                  <Stack gap="1" minW="180px">
                    {row.screen && !isScreenDeleted(row.screen) ? (
                      previewEnvironment === 'storybook' ? (
                        <>
                          <div className={styles.preview}>
                            {(['web', 'mobile'] as const).map((platform) => {
                              const href = getScreenStoryHref(row.screen!, platform);
                              return href ? (
                                <a
                                  key={platform}
                                  href={href}
                                  target="_blank"
                                  rel="noreferrer"
                                  title="경로 복사 및 새 창 열기"
                                  onClick={() => onCopyPath(href)}
                                >
                                  <FontAwesomeIcon icon={faDesktop} aria-hidden="true" />{' '}
                                  {platform === 'web' ? 'WEB' : 'Mobile'}
                                </a>
                              ) : (
                                <Typography key={platform} as="span">
                                  {platform === 'web' ? 'WEB' : 'Mobile'} 스토리 없음
                                </Typography>
                              );
                            })}
                          </div>
                        </>
                      ) : route ? (
                        <>
                          <div className={styles.preview}>
                            <a
                              href={route}
                              target="_blank"
                              rel="noreferrer"
                              title={route + ' (경로 복사 및 새 창 열기)'}
                              onClick={() => onCopyPath(route)}
                            >
                              <FontAwesomeIcon icon={faDesktop} aria-hidden="true" /> 페이지
                            </a>
                          </div>
                        </>
                      ) : (
                        <Typography as="span">독립 경로 없음</Typography>
                      )
                    ) : row.screen ? (
                      <Typography as="span">삭제 / 제외</Typography>
                    ) : (
                      '-'
                    )}
                  </Stack>
                </td>
                {renderProgressCells('design', progress, row.screen, progressOverrides)}
                <td className={styles.note}>
                  {deleted && (
                    <Typography as="span" className={styles.deletedTag}>
                      삭제 / 제외
                    </Typography>
                  )}
                  {row.screen ? row.screen.note || '-' : '-'}
                </td>
              </tr>
              {row.screen && (
                <tr className={rowClass}>
                  <td colSpan={2} className={styles.wbs}>
                    {rowWbs?.period ?? '-'}
                  </td>
                  {renderProgressCells('publishing', progress, row.screen, progressOverrides)}
                  <td className={styles.note}>
                    <Flex alignItems="flex-start" gap="3">
                      <Stack gap="1" flex="1" minW="0">
                        {connection?.sourceFiles.length ? (
                          <Flex flexWrap="wrap" gap="2">
                            {connection.sourceFiles.map((file) => (
                              <code
                                key={file}
                                className={styles.path({ page: /\/page\.[jt]sx?$/.test(file) })}
                                title={file}
                              >
                                {file.replace(/^src\//, '')}
                              </code>
                            ))}
                          </Flex>
                        ) : isScreenDeleted(row.screen) ? (
                          '삭제 / 제외'
                        ) : (
                          '-'
                        )}
                      </Stack>
                    </Flex>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
    </>
  );
}
