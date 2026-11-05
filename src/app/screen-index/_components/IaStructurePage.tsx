'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Fragment, useMemo, useRef, useState } from 'react';

import { css, cva } from 'styled-system/css';
import { Box, Flex, Grid, Stack } from 'styled-system/jsx';

import { Dropdown } from '@/components/common/atoms/Dropdown';
import { Icon } from '@/components/common/atoms/Icon';
import { Select } from '@/components/common/atoms/Select';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentLayout } from '@/components/common/layouts/ContentLayout';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import {
  type ChangeHistoryReport,
  getChangeReportsForDate,
  getChangeReportTableGroups,
  getChangeScreenLabels,
  getReportNavigationUrl,
  getReportUrlState,
  screenChangeReports,
} from '@/app/screen-index/screenChangeHistory';
import {
  getAncestorScreenSourceFiles,
  getRouteSourceFiles,
  getScreenComponentFiles,
  getScreenConnection,
  getScreenStatePreviews,
  getSharedStateSourceFiles,
  getSiblingScreenSourceFiles,
  isScreenDeleted,
  type ScreenConnection,
} from '@/app/screen-index/screenConnections';
import {
  developerWbsSource,
  getScreenDeveloperNames,
  getScreenDevelopers,
  matchesScreenDeveloper,
} from '@/app/screen-index/screenDevelopers';
import {
  confirmedPublishingProgress,
  getScreenProgress,
  type ScreenProgress,
  type ScreenProgressOverrides,
} from '@/app/screen-index/screenProgress';
import { type ScreenDefinition, screens } from '@/data/screenRegistry';

const reportDates = [
  ...new Set(screenChangeReports.map((report) => report.collectedAtKst.slice(0, 10))),
]
  .sort()
  .reverse();

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
  'not-applicable': '미해당',
  ready: '완료',
  revision: '수정',
  working: '진행중',
  pending: '대기',
};

type SummaryProgress = { [K in keyof ScreenProgress]: ScreenProgress[K] | 'mixed' };

const productScreenCodes = ['eland_hca_01', 'eland_hca_02'] as const;

function isProductScreen(screen: ScreenDefinition) {
  return productScreenCodes.some((code) => code === screen.screenCode);
}

const emptyProgressOverrides: ScreenProgressOverrides = {};

const developerNames = Array.from(new Set(screens.flatMap(getScreenDeveloperNames))).sort((a, b) =>
  a.localeCompare(b, 'ko'),
);

const styles = {
  page: css({
    maxW: 'none',
    bg: '#f6f8ff',
    px: '6',
    py: '6',
    _mobile: { px: '4', py: '4' },
    '& summary': {
      minH: 'var(--touch-target-min-size)',
      lineHeight: 'var(--touch-target-min-size)',
    },
  }),

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
    minW: 'var(--touch-target-min-size)',
    minH: 'var(--touch-target-min-size)',
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
  developer: css({ fontSize: '12', whiteSpace: 'normal' }),
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
  noteList: css({
    m: '0',
    pl: '16px',
    listStyleType: 'disc',
    display: 'grid',
    gap: '4px',
    overflowWrap: 'anywhere',
  }),
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

function splitNoteEntries(note: string) {
  const entries = note
    .split(/\s+\/\s+|(?=\s+\/[A-Za-z][\w-]*\/)/)
    .flatMap((part) => part.split(/(?<![\d/A-Za-z])(?=\d{1,2}\/\d{1,2}(?!\d)|\(\d{6}\))/))
    .map((entry) => entry.trim())
    .filter(Boolean);
  const seen = new Set<string>();
  return entries.filter((entry) => {
    // 원본 IA와 프로젝트 메모를 합칠 때 생긴 공백 차이의 중복도 표시에서 제거합니다.
    const key = entry.replace(/\s+/g, '').replace(/[.!。]+$/, '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getProgressTagClass(value: ScreenProgress[keyof ScreenProgress]) {
  if (value === 'ready' || value === 'received') return styles.readyTag;
  if (value === 'working') return styles.workingTag;
  if (value === 'missing') return styles.missingTag;
  if (value === 'revision-planned' || value === 'revision') return styles.revisionTag;
  return styles.pendingTag;
}

function renderProgressCells(
  kind: 'design' | 'publishing',
  progress: SummaryProgress | undefined,
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
              className={
                styles.statusTag +
                ' ' +
                (value === 'mixed' ? styles.revisionTag : getProgressTagClass(value))
              }
              title={
                (key === 'pcPublishing' || key === 'moPublishing') &&
                screen &&
                progressOverrides[screen.iaNumber]?.[key] === undefined &&
                confirmedPublishingProgress[screen.iaNumber]?.[key] === undefined
                  ? '기존 통합 상태를 이관한 초기값입니다. PC·MO별 확인값으로 갱신할 수 있습니다.'
                  : undefined
              }
            >
              {value === 'mixed' ? '혼합' : progressLabels[value]}
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
 * 전달합니다. 디자인은 received/missing/revision-planned/not-applicable/null, 퍼블리싱은 ready/revision/working/pending을 PC·MO별로
 * 독립 전달하며 새 props는 즉시 반영합니다. 조사 목록에 없는 디자인은 미수급, 명시적 null은 -이며 퍼블리싱 기본값은 기존
 * 통합 상태를 이관한 값입니다. 상품 요약은 현재 필터 결과와 props에서 계산하며 상태 차이는 혼합으로 표시합니다. 조회·수정·저장 API와 상태 변경 UI는 구현하지 않습니다.
 */
export function IaStructurePage({
  progressOverrides = emptyProgressOverrides,
}: {
  progressOverrides?: ScreenProgressOverrides;
}) {
  const [feedback, setFeedback] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reportLocation = getReportUrlState(searchParams.toString());
  const reportOpen = reportLocation.open;
  const reportTrigger = useRef<HTMLButtonElement>(null);
  const [selectedReportDate, setSelectedReportDate] = useState(reportDates[0] ?? '');
  const [reportDeveloperFilter, setReportDeveloperFilter] = useState('all');
  const reportReturnFocus = useRef<HTMLElement | null>(null);
  const openReport = () => {
    reportReturnFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    router.push(
      getReportNavigationUrl(
        pathname,
        searchParams.toString(),
        { date: selectedReportDate, developer: reportDeveloperFilter },
        window.location.hash,
      ),
      { scroll: false },
    );
  };
  const activeReportDate = reportOpen ? reportLocation.date : selectedReportDate;
  const activeReportDeveloper = reportOpen ? reportLocation.developer : reportDeveloperFilter;
  const onReportOpenChange = (open: boolean) => {
    if (open) {
      openReport();
      return;
    }
    if (reportDates.includes(activeReportDate)) setSelectedReportDate(activeReportDate);
    setReportDeveloperFilter(activeReportDeveloper);
    router.replace(
      getReportNavigationUrl(pathname, searchParams.toString(), null, window.location.hash),
      { scroll: false },
    );
  };
  const [activeDepth1, setActiveDepth1] = useState('all');
  const [productDepth1, setProductDepth1] = useState('all');
  const [query, setQuery] = useState('');
  const [developerFilter, setDeveloperFilter] = useState('all');
  const [productMenuExpanded, setProductMenuExpanded] = useState(false);
  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set());

  const groups = useMemo<ScreenGroup[]>(
    () =>
      Array.from(new Set(screens.map((screen) => screen.depths[0]))).map((depth1) => ({
        depth1,
        screens: screens.filter((screen) => screen.depths[0] === depth1),
      })),
    [],
  );
  const allProductScreens = screens.filter(isProductScreen);
  const navGroups = [
    { depth1: '상품 공통 화면', screens: allProductScreens },
    ...groups
      .map((group) => ({
        ...group,
        screens: group.screens.filter((screen) => !isProductScreen(screen)),
      }))
      .filter((group) => group.screens.length > 0),
  ];
  const activeGroups = groups.map((group) => ({
    ...group,
    screens: group.screens.filter(
      (screen) =>
        activeDepth1 === 'all' ||
        (activeDepth1 === '상품 공통 화면'
          ? isProductScreen(screen) &&
            (productDepth1 === 'all' || screen.depths[0] === productDepth1)
          : group.depth1 === activeDepth1 && !isProductScreen(screen)),
    ),
  }));
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
          ...(getScreenConnection(screen).previewRoutes ?? []).flatMap(({ label, href }) => [
            label,
            href,
          ]),
          ...getScreenConnection(screen).sourceFiles,
          screen.category,
          screen.screenCode,
          screen.note,
          ...getScreenDevelopers(screen).flatMap(({ name, area }) => [name, area]),
        ]
          .join(' ')
          .toLowerCase();

        return (
          matchesScreenDeveloper(screen, developerFilter) &&
          searchable.includes(query.trim().toLowerCase())
        );
      }),
    }))
    .filter((group) => group.screens.length > 0);
  const activeTotal = visibleGroups.reduce((total, group) => total + group.screens.length, 0);
  const productGroups = productScreenCodes
    .map((code) => ({
      code,
      screens: visibleGroups.flatMap((group) =>
        group.screens.filter((screen) => screen.screenCode === code),
      ),
    }))
    .filter((group) => group.screens.length > 0);
  const regularGroups = visibleGroups
    .map((group) => ({
      ...group,
      screens: group.screens.filter((screen) => !isProductScreen(screen)),
    }))
    .filter((group) => group.screens.length > 0);
  const productTotal = productGroups.reduce((total, group) => total + group.screens.length, 0);
  const visibleProductScreens = productGroups.flatMap((group) => group.screens);
  const productDepths = Array.from(
    new Set(visibleProductScreens.map((screen) => screen.depths[0])),
  );
  const productSectionOpen = !collapsedPaths.has('상품 공통 화면');
  const productTreeOpen = productMenuExpanded || query.trim().length > 0;
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
      <Box
        pos="sticky"
        top="0"
        zIndex="20"
        bg="#f6f8ff"
        maxH="60dvh"
        overflowY="auto"
        pb="3"
        aria-label="IA 탐색 도구"
      >
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
          <section
            className={styles.card + ' ' + styles.navCard}
            aria-label="화면 체계 NAV 탭 분류"
          >
            <div className={styles.cardHeading}>
              <Typography as="h2">
                <Icon name="folder-tree-solid" size="1em" aria-hidden="true" />
                화면 체계 NAV 탭 분류 ({navGroups.length}개 영역)
              </Typography>
            </div>
            <Grid
              gridTemplateColumns="repeat(auto-fit, minmax(min(100%, 160px), 1fr))"
              gap="2"
              mt="3"
              _mobile={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))' }}
            >
              {navGroups.map((group) => (
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
                    setProductDepth1('all');
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
                setActiveDepth1('all');
                setQuery('');
                setDeveloperFilter('all');
              }}
            >
              전체 초기화
            </button>
            {activeDepth1 === '상품 공통 화면' && (
              <Dropdown
                ariaLabel="상품 연결 분류"
                value={productDepth1}
                onValueChange={setProductDepth1}
                options={[
                  { value: 'all', label: '상품 분류 전체' },
                  ...Array.from(new Set(allProductScreens.map((screen) => screen.depths[0]))).map(
                    (value) => ({ value, label: value }),
                  ),
                ]}
              />
            )}
            <TextInput
              className={styles.search}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="화면명, 담당자, IA 번호, 코드, URL, 파일 경로 검색"
              aria-label="IA 화면 검색"
            />
            <Select
              aria-label="개발담당자 필터"
              value={developerFilter}
              onChange={(event) => setDeveloperFilter(event.target.value)}
              className={css({ w: 'auto', minW: '140px' })}
            >
              <option value="all">개발담당자 전체</option>
              {developerNames.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
              <option value="unassigned">미지정</option>
            </Select>
          </Flex>
          <Flex gap="2" alignItems="center" flexWrap="wrap">
            <Select
              aria-label="퍼블 보고서 날짜"
              value={reportDates.includes(activeReportDate) ? activeReportDate : selectedReportDate}
              onChange={(event) => setSelectedReportDate(event.target.value)}
              className={css({ w: 'auto', minW: '140px' })}
            >
              {reportDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </Select>
            <Select
              aria-label="보고서 개발담당자 필터"
              value={activeReportDeveloper}
              onChange={(event) => setReportDeveloperFilter(event.target.value)}
              className={css({ w: 'auto', minW: '140px' })}
            >
              <option value="all">보고서 담당자 전체</option>
              {developerNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
              <option value="unassigned">미지정</option>
            </Select>
            <button
              type="button"
              className={styles.button}
              onClick={() => openReport()}
              ref={reportTrigger}
              aria-haspopup="dialog"
              disabled={!selectedReportDate}
            >
              퍼블 변경사항 보고서
            </button>
          </Flex>
        </Flex>
      </Box>
      <MainChangeReportDialog
        open={reportOpen}
        developer={activeReportDeveloper}
        date={activeReportDate}
        onOpenChange={onReportOpenChange}
        finalFocus={() => reportReturnFocus.current ?? reportTrigger.current}
      />
      <section aria-label="IA 화면 목록">
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
                <th scope="col">실제 페이지</th>
                <th scope="col">PC 디자인</th>
                <th scope="col">MO 디자인</th>
                <th scope="col">비고 / 이슈</th>
              </tr>
              <tr>
                <th colSpan={2} scope="col" title={'WBS 확인일: ' + developerWbsSource.checkedAt}>
                  개발담당자
                </th>
                <th scope="col">PC 퍼블리싱</th>
                <th scope="col">MO 퍼블리싱</th>
                <th scope="col">작업 파일</th>
              </tr>
            </thead>
            <tbody>
              {productGroups.length > 0 && (
                <>
                  <tr className={styles.groupRow}>
                    <td className={styles.treeCell}>
                      <div className={styles.treeItem}>
                        <button
                          type="button"
                          className={styles.collapseButton}
                          aria-label={'상품 공통 화면 ' + (productSectionOpen ? '접기' : '펼치기')}
                          aria-expanded={productSectionOpen}
                          onClick={() => togglePath('상품 공통 화면')}
                        >
                          <Icon
                            name={
                              productSectionOpen ? 'chevron-down-regular' : 'chevron-right-solid'
                            }
                            size="1em"
                            aria-hidden="true"
                          />
                        </button>
                        <span className={styles.depthMarker}>D1</span>
                        <Icon
                          name="folder-open-solid"
                          size="1em"
                          className={styles.hierarchyIcon}
                          aria-hidden="true"
                        />
                        <strong>{productDepths.join(' · ')}</strong>
                        <span>({productTotal} screens)</span>
                      </div>
                    </td>
                    <td>대분류</td>
                    <td colSpan={2} className={styles.code}>
                      {productDepths
                        .map((depth) => 'CAT_' + (depth === '공통' ? 'COMMON' : depth))
                        .join(', ')}
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td className={styles.note}>
                      <Stack gap="2">
                        {productGroups.map((group) => (
                          <ProductNotes
                            key={group.code}
                            screens={group.screens}
                            label={group.code === 'eland_hca_01' ? '상품 목록' : '상품 상세'}
                          />
                        ))}
                      </Stack>
                    </td>
                  </tr>
                  {productSectionOpen && (
                    <>
                      {productGroups.map((group) => (
                        <ProductRows
                          key={group.code}
                          screens={group.screens}
                          progressOverrides={progressOverrides}
                          onCopyPath={copyPreviewPath}
                        />
                      ))}
                      <tr>
                        <td colSpan={7}>
                          <button
                            type="button"
                            className={styles.button}
                            aria-expanded={productTreeOpen}
                            aria-controls="product-menu-tree"
                            onClick={() => setProductMenuExpanded((current) => !current)}
                          >
                            연결 메뉴 {productTreeOpen ? '접기' : '펼치기'}
                          </button>
                        </td>
                      </tr>
                      {productTreeOpen && (
                        <tr id="product-menu-tree">
                          <td colSpan={7}>
                            <ProductMenuTree screens={visibleProductScreens} />
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                </>
              )}
              {regularGroups.map((group) => (
                <GroupRows
                  key={group.depth1}
                  group={group}
                  progressOverrides={progressOverrides}
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
          원본 검색 결과 {activeTotal}개 화면 · 상품 {productTotal}개 IA를 공통 화면{' '}
          {productGroups.length}개로 묶어 표시합니다.
        </Typography>
      </section>
    </ContentLayout>
  );
}

function GroupRows({
  group,
  progressOverrides,
  collapsedPaths,
  onToggle,
  onCopyPath,
}: {
  group: ScreenGroup;
  progressOverrides: ScreenProgressOverrides;
  collapsedPaths: ReadonlySet<string>;
  onToggle: (path: string) => void;
  onCopyPath: (path: string) => void;
}) {
  const treeRows = createTreeRows(group);
  const siblingFiles = getSiblingScreenSourceFiles(group.screens);
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
              <Icon
                name={groupOpen ? 'chevron-down-regular' : 'chevron-right-solid'}
                size="1em"
                aria-hidden="true"
              />
            </button>
            <Typography as="span" className={styles.depthMarker}>
              D1
            </Typography>
            <span className={styles.hierarchyIcon}>
              <Icon name="folder-open-solid" size="1em" aria-hidden="true" />
            </span>
            <strong className={css({ color: '#2a14b4', fontSize: '14' /* 기존 13px */ })}>
              {group.depth1}
            </strong>
            <Typography as="span">({group.screens.length} screens)</Typography>
          </div>
        </td>
        <td>대분류</td>
        <td colSpan={2} className={styles.code}>
          CAT_{group.depth1.replaceAll(' ', '_').toUpperCase()}
        </td>
        <td>-</td>
        <td>-</td>
        <td className={styles.note}>확정 IA 기준 화면 영역</td>
      </tr>
      {groupOpen &&
        treeRows.map((row) => {
          const hiddenByParent = row.ancestors.some((path) => collapsedPaths.has(path));
          if (hiddenByParent) return null;

          const deleted = row.screen ? isScreenDeleted(row.screen) : false;
          const progress =
            row.screen && !deleted ? getScreenProgress(row.screen, progressOverrides) : undefined;
          const connection = row.screen ? getScreenConnection(row.screen) : undefined;
          const statePreviews = deleted ? [] : getScreenStatePreviews(connection);
          const groupFiles = siblingFiles.get(row.path) ?? [];
          const inheritedFiles = Array.from(
            new Set([
              ...(row.screen ? getAncestorScreenSourceFiles(row.screen, group.screens) : []),
              ...row.ancestors.flatMap((path) => siblingFiles.get(path) ?? []),
            ]),
          );
          const componentFiles = Array.from(
            new Set([...(connection ? getScreenComponentFiles(connection) : []), ...groupFiles]),
          ).filter((file) => !inheritedFiles.includes(file));
          const sharedFiles = connection ? getSharedStateSourceFiles([connection]) : [];
          const hasStateRows = statePreviews.length > 0;
          const rowClass = deleted ? styles.deletedRow : '';
          const noteEntries = row.screen ? splitNoteEntries(row.screen.note) : [];

          return (
            <Fragment key={row.id}>
              <tr className={rowClass}>
                <td className={styles.treeCell} rowSpan={row.screen ? 2 : undefined}>
                  <div
                    className={styles.treeItem}
                    style={{ paddingLeft: String((row.depth + 1) * 20) + 'px' }}
                  >
                    {row.isBranch || hasStateRows ? (
                      <button
                        type="button"
                        className={styles.collapseButton}
                        aria-label={
                          row.label + (collapsedPaths.has(row.path) ? ' 펼치기' : ' 접기')
                        }
                        aria-expanded={!collapsedPaths.has(row.path)}
                        onClick={() => onToggle(row.path)}
                      >
                        <Icon
                          name={
                            collapsedPaths.has(row.path)
                              ? 'chevron-right-solid'
                              : 'chevron-down-regular'
                          }
                          size="1em"
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
                      <Icon
                        name={
                          deleted ? 'ban-solid' : row.isBranch ? 'folder-solid' : 'file-lines-solid'
                        }
                        size="1em"
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
                    {deleted
                      ? '삭제 / 제외'
                      : hasStateRows
                        ? '하위 상태 참조'
                        : row.screen
                          ? '독립 경로 없음'
                          : '-'}
                  </Stack>
                </td>
                {renderProgressCells('design', progress, row.screen, progressOverrides)}
                <td className={styles.note}>
                  {deleted && (
                    <Typography as="span" className={styles.deletedTag}>
                      삭제 / 제외
                    </Typography>
                  )}
                  {noteEntries.length ? (
                    <ul className={styles.noteList}>
                      {noteEntries.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ul>
                  ) : componentFiles.length ? null : (
                    '-'
                  )}
                  {componentFiles.length > 0 && <SourceFiles files={componentFiles} />}
                </td>
              </tr>
              {row.screen && (
                <tr className={rowClass}>
                  <td colSpan={2} className={styles.developer}>
                    <ScreenDevelopers screens={[row.screen]} />
                  </td>
                  {renderProgressCells('publishing', progress, row.screen, progressOverrides)}
                  <td className={styles.note}>
                    {connection?.sourceFiles.length ? (
                      <SourceFiles
                        files={(statePreviews.length
                          ? sharedFiles
                          : getRouteSourceFiles(connection, connection.route).filter(
                              (file) =>
                                !file.includes('/_components/') && !/\/page\.[jt]sx?$/.test(file),
                            )
                        ).filter(
                          (file) => !inheritedFiles.includes(file) && !groupFiles.includes(file),
                        )}
                      />
                    ) : deleted ? (
                      '삭제 / 제외'
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              )}
              {!collapsedPaths.has(row.path) && (
                <StatePreviewRows
                  previews={statePreviews}
                  screens={row.screen ? [row.screen] : []}
                  sharedFiles={[...sharedFiles, ...inheritedFiles, ...groupFiles]}
                  depth={row.depth + 2}
                  onCopyPath={onCopyPath}
                />
              )}
            </Fragment>
          );
        })}
    </>
  );
}

function StatePreviewRows({
  previews,
  sharedFiles,
  screens: members,
  depth,
  onCopyPath,
}: {
  previews: NonNullable<ScreenConnection['previewRoutes']>;
  sharedFiles: readonly string[];
  screens: ScreenDefinition[];
  depth: number;
  onCopyPath: (path: string) => void;
}) {
  return (
    <>
      {previews.map(({ label, href }) => {
        const owners = members.filter((screen) =>
          getScreenStatePreviews(getScreenConnection(screen)).some(
            (preview) => preview.href === href,
          ),
        );
        return (
          <tr key={href}>
            <td className={styles.treeCell}>
              <div className={styles.treeItem} style={{ paddingLeft: String(depth * 20) + 'px' }}>
                <span className={styles.spacer} />
                <span className={styles.depthMarker}>STATE</span>
                <Typography as="span">{label}</Typography>
              </div>
            </td>
            <td>상태</td>
            <td>
              <ScreenDevelopers screens={owners} href={href} />
            </td>
            <td>
              <div className={styles.preview}>
                <Link
                  href={href}
                  aria-label={label + ' 보기'}
                  target="_blank"
                  rel="noreferrer"
                  title={href + ' (경로 복사 및 새 창 열기)'}
                  onClick={() => onCopyPath(href)}
                >
                  보기
                </Link>
              </div>
            </td>
            <td>-</td>
            <td>-</td>
            <td className={styles.note}>
              <SourceFiles
                files={Array.from(
                  new Set(
                    owners
                      .flatMap((screen) => getRouteSourceFiles(getScreenConnection(screen), href))
                      .filter(
                        (file) =>
                          !file.includes('/_components/') &&
                          !sharedFiles.includes(file) &&
                          (owners.some((screen) => screen.screenCode === 'eland_hca_01')
                            ? /\/page\.[jt]sx?$/.test(file)
                            : true),
                      ),
                  ),
                )}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
}

function ChangeReportTable({ report }: { report: ChangeHistoryReport }) {
  const groups = getChangeReportTableGroups(report, screens);
  return (
    <Box
      overflow="auto"
      maxH="65dvh"
      border="1px solid #dbe5ff"
      _mobile={{ maxH: 'calc(100dvh - 210px)' }}
    >
      <table
        aria-label="개발담당자별 퍼블 변경사항"
        className={css({
          width: '100%',
          minW: '1200px',
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
          fontSize: '12px',
          '& th, & td': {
            border: '1px solid #dbe5ff',
            p: '3',
            verticalAlign: 'top',
            textAlign: 'left',
            overflowWrap: 'anywhere',
          },
          '& thead th': { position: 'sticky', top: '0', bg: '#e5edff', zIndex: '1' },
          '& tbody th': { bg: '#f5f8ff', fontWeight: '600' },
        })}
      >
        <colgroup>
          <col style={{ width: '12%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '24%' }} />
          <col style={{ width: '26%' }} />
          <col style={{ width: '18%' }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">개발담당자</th>
            <th scope="col">메뉴 / 화면</th>
            <th scope="col">변경사항</th>
            <th scope="col">변경 파일 * Before</th>
            <th scope="col">변경라인 * After</th>
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.developer}>
            {group.changes.flatMap((change, changeIndex) =>
              change.entries.map((entry, entryIndex) => (
                <tr key={entry.id}>
                  {changeIndex === 0 && entryIndex === 0 && (
                    <th scope="rowgroup" rowSpan={group.rowCount}>
                      {group.developer}
                    </th>
                  )}
                  <td>
                    <Stack gap="2">
                      {getChangeScreenLabels(entry).map((label) => (
                        <span key={label}>{label}</span>
                      ))}
                    </Stack>
                  </td>
                  {entryIndex === 0 && <td rowSpan={change.entries.length}>{change.summary}</td>}
                  <td>
                    <a
                      href={`${report.remote.replace(/\.git$/, '')}/blob/${entry.status === 'D' || entry.status.startsWith('R') ? report.baseSha : report.targetSha}/${(entry.previousFile ?? entry.file).split('/').map(encodeURIComponent).join('/')}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {entry.previousFile ?? entry.file}
                    </a>
                    <div>
                      {entry.status.startsWith('R')
                        ? '이름변경'
                        : entry.status === 'A'
                          ? '추가'
                          : entry.status === 'D'
                            ? '삭제'
                            : '수정'}
                    </div>
                  </td>
                  <td>
                    {entry.status.startsWith('R') && (
                      <a
                        href={`${report.remote.replace(/\.git$/, '')}/blob/${report.targetSha}/${entry.file.split('/').map(encodeURIComponent).join('/')}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {entry.file}
                      </a>
                    )}
                    {entry.ranges.length ? (
                      <Stack gap="1">
                        {entry.ranges.map((range, index) => (
                          <span key={index}>
                            {range.oldCount
                              ? `${range.oldStart}–${range.oldStart + range.oldCount - 1}`
                              : '없음'}{' '}
                            →{' '}
                            {range.newCount
                              ? `${range.newStart}–${range.newStart + range.newCount - 1}`
                              : '없음'}
                          </span>
                        ))}
                      </Stack>
                    ) : entry.status.startsWith('R') ? null : (
                      '본문 차이 없음'
                    )}
                  </td>
                </tr>
              )),
            )}
          </tbody>
        ))}
      </table>
    </Box>
  );
}

// [ 개발팀 바인딩 ] IA 관리 소유자가 완료한 main 비교 데이터를 표시합니다. 외부 요청·담당자 변경은 없으며
// 부모가 모달 열림과 실제 클릭한 트리거로의 포커스 복원을 소유합니다. 파일과 줄은 보고 시점 B/T 기준입니다.
function MainChangeReportDialog({
  open,
  developer,
  date,
  onOpenChange,
  finalFocus,
}: {
  open: boolean;
  developer: string;
  date: string;
  onOpenChange: (open: boolean) => void;
  finalFocus: () => HTMLElement | null;
}) {
  const reports = getChangeReportsForDate(screenChangeReports, date).map((report) => ({
    ...report,
    entries: getChangeReportTableGroups(report, screens, developer).flatMap((group) =>
      group.changes.flatMap((change) => change.entries),
    ),
  }));
  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      finalFocus={finalFocus}
      title={`${date.slice(2)} 퍼블 변경사항 보고서`}
      closeLabel="보고서 닫기"
      size="lg"
      mobilePresentation="fullscreen"
      popupClassName={css({
        '&&': { maxW: '1320px', w: 'calc(100vw - 48px)' },
        _mobile: { '&&': { w: '100vw' } },
      })}
    >
      <Stack gap="4">
        {!reports.length && <p>선택한 날짜의 보고서가 없습니다.</p>}
        {reports.map((report) => (
          <Stack key={report.reportId} gap="3">
            <strong>main 변경 보고 · {report.entries.length}개 파일</strong>
            <span>
              개발담당자:{' '}
              {developer === 'all' ? '전체' : developer === 'unassigned' ? '미지정' : developer}
            </span>
            <span>
              {report.collectedAtKst} · {report.baseSha.slice(0, 8)} →{' '}
              {report.targetSha.slice(0, 8)}
            </span>
            <span>변경라인: B 이전 → T 이후 · 원복된 변경과 Markdown 파일은 제외했습니다.</span>
            {report.entries.length ? (
              <ChangeReportTable report={report} />
            ) : (
              <p>선택한 개발담당자의 변경사항이 없습니다.</p>
            )}
          </Stack>
        ))}
      </Stack>
    </ModalDialog>
  );
}

function SourceFiles({ files }: { files: string[] }) {
  return files.length ? (
    <Flex flexWrap="wrap" gap="2">
      {files.map((file) => (
        <code
          key={file}
          className={styles.path({ page: /\/page\.[jt]sx?$/.test(file) })}
          title={file}
        >
          {file.replace(/^src\//, '')}
        </code>
      ))}
    </Flex>
  ) : (
    '-'
  );
}

function ScreenDevelopers({
  screens: members,
  href,
}: {
  screens: ScreenDefinition[];
  href?: string;
}) {
  const developers = Array.from(
    new Map(
      members
        .flatMap((screen) => getScreenDevelopers(screen, href))
        .map((assignment) => [assignment.wbs, assignment]),
    ).values(),
  );
  return (
    <Stack gap="1" minW="130px" alignItems="flex-start">
      {developers.length
        ? developers.map(({ name, area, wbs, row }) => (
            <a
              key={wbs}
              href={developerWbsSource.url + '&range=B' + row + ':Y' + row}
              target="_blank"
              rel="noreferrer"
              title={area + ' · WBS ' + wbs + ' · ' + developerWbsSource.checkedAt + ' 확인'}
            >
              {name}
              {developers.length > 1 && <span> ({area})</span>}
            </a>
          ))
        : members.every(isScreenDeleted)
          ? '-'
          : '미지정'}
    </Stack>
  );
}

function productNotes(screen: ScreenDefinition) {
  return splitNoteEntries(screen.note);
}

function ProductNotes({ screens: members, label }: { screens: ScreenDefinition[]; label: string }) {
  const notes = new Map<string, string[]>();
  members.forEach((screen) =>
    productNotes(screen).forEach((note) => {
      notes.set(note, [...(notes.get(note) ?? []), screen.depths.filter(Boolean).join(' → ')]);
    }),
  );
  if (!notes.size) return null;
  return (
    <details>
      <summary>
        {label} 비고 {notes.size}건
      </summary>
      <ul className={styles.noteList}>
        {[...notes].map(([note, paths]) => (
          <li key={note}>
            {note}
            <details>
              <summary>연결 분류 {paths.length}건</summary>
              {paths.map((path, index) => (
                <div key={index}>{path}</div>
              ))}
            </details>
          </li>
        ))}
      </ul>
    </details>
  );
}

function ProductRows({
  screens: members,
  progressOverrides,
  onCopyPath,
}: {
  screens: ScreenDefinition[];
  progressOverrides: ScreenProgressOverrides;
  onCopyPath: (path: string) => void;
}) {
  const representative = members[0];
  // 카테고리별 query를 모두 기본 상태로 늘리지 않고 현재 대표 화면과 검색 진입점을 유지합니다.
  const stateConnections = new Map<string, ScreenConnection>();
  members.forEach((screen) => {
    const connection = getScreenConnection(screen);
    const key = connection.route?.split(/[?#]/)[0] ?? screen.screenCode;
    if (!stateConnections.has(key)) stateConnections.set(key, connection);
  });
  const statePreviews = Array.from(
    new Map(
      Array.from(stateConnections.values())
        .flatMap((connection) => getScreenStatePreviews(connection))
        .map((preview) => [preview.href, preview]),
    ).values(),
  );
  const label = representative.screenCode === 'eland_hca_01' ? '상품 목록' : '상품 상세';
  const progress = Object.fromEntries(
    progressFields.map(({ key }) => {
      const values = new Set(
        members.map((screen) =>
          isScreenDeleted(screen) ? null : getScreenProgress(screen, progressOverrides)[key],
        ),
      );
      return [key, values.size === 1 ? [...values][0] : 'mixed'];
    }),
  ) as SummaryProgress;
  const isListing = representative.screenCode === 'eland_hca_01';
  const sharedFiles = getSharedStateSourceFiles(Array.from(stateConnections.values()));
  const componentFiles = Array.from(
    new Set(
      members.flatMap((screen) => getScreenComponentFiles(getScreenConnection(screen), isListing)),
    ),
  );
  const files = isListing ? [] : sharedFiles;
  return (
    <>
      <tr>
        <td rowSpan={2} className={styles.treeCell}>
          <Stack gap="2">
            <strong>{label}</strong>
            <span>
              {Array.from(new Set(members.map((screen) => screen.depths[0]))).join(' · ')} ·{' '}
              {members.length}개 IA
            </span>
          </Stack>
        </td>
        <td rowSpan={2}>page</td>
        <td className={styles.code}>{representative.screenCode}</td>
        <td>
          <Stack gap="1">
            <span>대표 화면</span>
            <span>하위 상태 참조</span>
          </Stack>
        </td>
        {renderProgressCells('design', progress, undefined, progressOverrides)}
        <td className={styles.note}>
          <SourceFiles files={componentFiles} />
        </td>
      </tr>
      <tr>
        <td colSpan={2} className={styles.developer}>
          <ScreenDevelopers screens={members} />
        </td>
        {renderProgressCells('publishing', progress, undefined, progressOverrides)}
        <td className={styles.note}>
          <SourceFiles files={files} />
        </td>
      </tr>
      <StatePreviewRows
        previews={statePreviews}
        sharedFiles={sharedFiles}
        screens={members}
        depth={2}
        onCopyPath={onCopyPath}
      />
    </>
  );
}

function ProductMenuTree({ screens: members }: { screens: ScreenDefinition[] }) {
  const paths = Array.from(
    new Map(
      members.map((screen) => {
        const path = screen.depths.filter(Boolean);
        if (path.at(-1) === '목록' || path.at(-1) === '상세') path.pop();
        return [JSON.stringify(path), path] as const;
      }),
    ).values(),
  );
  const menuGroups = new Map<string, { depth1: string; depth2: string; menus: string[] }>();
  paths.forEach((path) => {
    const key = JSON.stringify(path.slice(0, 2));
    const group = menuGroups.get(key) ?? { depth1: path[0], depth2: path[1] || '-', menus: [] };
    group.menus.push(path.slice(2).join(' → ') || '-');
    menuGroups.set(key, group);
  });
  const rows = Array.from(menuGroups.values());
  return (
    <table
      className={css({
        w: '100%',
        borderCollapse: 'collapse',
        '& th, & td': { border: '1px solid #e6ebf7' },
        '& > tbody > tr > th': { bg: 'transparent', verticalAlign: 'middle' },
      })}
      aria-label="상품 연결 메뉴 트리"
    >
      <thead>
        <tr>
          <th scope="col">Depth1</th>
          <th scope="col">중간 분류</th>
          <th scope="col">서브 메뉴 경로</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const firstInDepth1 = index === 0 || rows[index - 1].depth1 !== row.depth1;
          let depth1Span = 1;
          if (firstInDepth1) {
            while (
              index + depth1Span < rows.length &&
              rows[index + depth1Span].depth1 === row.depth1
            )
              depth1Span += 1;
          }
          return (
            <tr key={JSON.stringify([row.depth1, row.depth2])}>
              {firstInDepth1 && (
                <th scope="rowgroup" rowSpan={depth1Span}>
                  {row.depth1}
                </th>
              )}
              <th scope="row">{row.depth2}</th>
              <td>{row.menus.join(', ')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
