'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowRight,
  faBan,
  faChartLine,
  faChevronDown,
  faChevronRight,
  faCircle,
  faDesktop,
  faFileLines,
  faFolder,
  faFolderOpen,
  faFolderTree,
  faMobileScreenButton,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useMemo, useState } from 'react';
import { css } from 'styled-system/css';
import { Grid, Box, Flex, Stack } from 'styled-system/jsx';
import { screens, type ScreenDefinition } from '@/data/screenRegistry';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import {
  isStorybookPending,
  isStorybookReady,
  isStorybookWorking,
} from '@/shared/features/screen-index/storybookLinks';
import { getProductListingIaKey } from '@/shared/features/catalog/productListingIaRoute';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

config.autoAddCss = false;

type DeliveryStatus = 'ready' | 'working' | 'pending' | 'delayed' | 'deleted';

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
  owners: string;
};

const deletedIaNumbers = new Set(
  screens
    .filter((screen) => screen.note.replace(/상품\s*삭제/g, '').includes('삭제'))
    .map((screen) => screen.iaNumber),
);

type PreviewStoryIds = {
  pc: string;
  mo: string;
};

const previewStoryIdsByIaNumber: Record<number, PreviewStoryIds> = {
  158: {
    pc: 'pages-탐색-0-러닝세션-목록-web--list',
    mo: 'pages-탐색-0-러닝세션-목록-mobile--list',
  },
  260: {
    pc: 'pages-고객센터-6-사이즈-가이드-web--default',
    mo: 'pages-고객센터-6-사이즈-가이드-mobile--default',
  },
  200: {
    pc: 'pages-탐색-0-러닝세션-목록-web--list',
    mo: 'pages-탐색-0-러닝세션-목록-mobile--list',
  },
  258: {
    pc: 'pages-탐색-0-러닝세션-목록-web--list',
    mo: 'pages-탐색-0-러닝세션-목록-mobile--list',
  },
  259: {
    pc: 'pages-탐색-1-러닝세션-상세-web--open',
    mo: 'pages-탐색-1-러닝세션-상세-mobile--open',
  },
  229: {
    pc: 'pages-로그인-3-비밀번호-재설정-web--default',
    mo: 'pages-로그인-3-비밀번호-재설정-mobile--default',
  },
  252: {
    pc: 'pages-로그인-4-비밀번호-재설정-완료-web--default',
    mo: 'pages-로그인-4-비밀번호-재설정-완료-mobile--default',
  },
  226: {
    pc: 'pages-로그인-2-아이디확인-web--default',
    mo: 'pages-로그인-2-아이디확인-mobile--default',
  },
  1: {
    pc: 'pages-메인-0-메인-web--width-1920',
    mo: 'pages-메인-0-메인-mobile--width-375',
  },
  251: {
    pc: 'pages-로그인-5-계정-잠금-안내-web--default',
    mo: 'pages-로그인-5-계정-잠금-안내-mobile--default',
  },
  253: {
    pc: 'pages-회원가입-2-휴대폰-인증-web--account-unlock',
    mo: 'pages-회원가입-2-휴대폰-인증-mobile--account-unlock',
  },
  254: {
    pc: 'pages-로그인-6-계정-잠금-해제-완료-web--default',
    mo: 'pages-로그인-6-계정-잠금-해제-완료-mobile--default',
  },
  257: {
    pc: 'organisms-account-alreadyregisteredmodal--default',
    mo: 'organisms-account-alreadyregisteredmodal--mobile',
  },
  233: {
    pc: 'pages-회원가입-0-회원가입-안내-web--default',
    mo: 'pages-회원가입-0-회원가입-안내-mobile--default',
  },
  234: {
    pc: 'pages-회원가입-2-휴대폰-인증-web--default',
    mo: 'pages-회원가입-2-휴대폰-인증-mobile--default',
  },
  235: {
    pc: 'pages-회원가입-1-가입여부확인-web--default',
    mo: 'pages-회원가입-1-가입여부확인-mobile--default',
  },
  236: {
    pc: 'pages-회원가입-3-약관동의-web--default',
    mo: 'pages-회원가입-3-약관동의-mobile--default',
  },
  237: {
    pc: 'pages-회원가입-4-회원-정보-입력-web--default',
    mo: 'pages-회원가입-4-회원-정보-입력-mobile--default',
  },
  255: {
    pc: 'pages-회원가입-4-회원-정보-입력-web--additional',
    mo: 'pages-회원가입-4-회원-정보-입력-mobile--additional',
  },
  256: {
    pc: 'pages-회원가입-5-마케팅-정보-수신동의-안내-web--default',
    mo: 'pages-회원가입-5-마케팅-정보-수신동의-안내-mobile--default',
  },
  238: {
    pc: 'pages-회원가입-4-회원-정보-입력-web--complete',
    mo: 'pages-회원가입-4-회원-정보-입력-web--complete',
  },
};

const previewStoryIdsByScreenCode: Record<string, PreviewStoryIds> = {
  eland_hca_01: {
    pc: 'pages-상품-0-상품목록-web--width-1920',
    mo: 'pages-상품-0-상품목록-mobile--width-375',
  },
  eland_hca_02: {
    pc: 'pages-상품-1-상품상세-web--width-1920',
    mo: 'pages-상품-1-상품상세-mobile--width-375',
  },
};

const loginPreviewStoryIds: PreviewStoryIds = {
  pc: 'pages-로그인-0-로그인-web--default',
  mo: 'pages-로그인-0-로그인-mobile--default',
};

const findAccountPreviewStoryIds: PreviewStoryIds = {
  pc: 'pages-로그인-1-아이디·비밀번호-찾기-web--default',
  mo: 'pages-로그인-1-아이디·비밀번호-찾기-mobile--default',
};

const findAccountScreenCodes = new Set([
  'eland_hlo_02',
  'eland_hlo_03',
  'eland_hlo_04',
  'eland_hlo_05',
  'eland_hlo_06',
  'eland_hlo_07',
]);

const statusLabels: Record<DeliveryStatus, string> = {
  ready: '완료',
  working: '작업 중',
  pending: '대기중',
  delayed: '지연 / 블락',
  deleted: '삭제 / 제외',
};

const directWbsAssignments: Record<string, WbsAssignment> = {
  Main: { period: '2026.09.21 ~ 2026.09.23', owners: '조맑은' },
  '런칭 캘린더': { period: '2026.10.21 ~ 2026.10.28', owners: '조맑은' },
  기획전: { period: '2026.10.22 ~ 2026.10.23', owners: '조맑은' },
  이벤트: { period: '2026.10.27', owners: '조맑은' },
  장바구니: { period: '2026.10.19 ~ 2026.10.21', owners: '조맑은, 박서현' },
  주문: { period: '2026.10.15 ~ 2026.10.16', owners: '조맑은, 박서현' },
  마이페이지: { period: '2026.10.21 ~ 2026.10.30', owners: '박서현' },
  고객센터: { period: '2026.10.29 ~ 2026.10.31', owners: '조맑은, 박서현' },
  로그인: { period: '2026.10.02 ~ 2026.10.05', owners: '박서현' },
  회원가입: { period: '2026.10.06 ~ 2026.10.07', owners: '박서현' },
  Company: { period: '2026.11.06 ~ 2026.11.10', owners: '조맑은' },
};

const categoryWbsAssignments = {
  목록: { period: '2026.10.01 ~ 2026.10.07', owners: '조맑은' },
  상세: { period: '2026.10.07 ~ 2026.10.14', owners: '조맑은, 박서현' },
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

  readyProgress: css({ h: 'full', bg: '#17643b' }),
  workingProgress: css({ h: 'full', bg: '#5148d7' }),
  pendingProgress: css({ h: 'full', bg: '#68718a' }),
  delayedProgress: css({ h: 'full', bg: '#c51c1c' }),
  deletedProgress: css({ h: 'full', bg: '#7a7f8c' }),

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
    fontSize: '12' /* 기존: 11px */,
    fontWeight: '800',
    cursor: 'pointer',
    textDecoration: 'underline',
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
  miniProgress: css({
    display: 'flex',
    overflow: 'hidden',
    h: '1',
    borderRadius: 'full',
    bg: '#dce4f5',
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

  chip: css({ px: '2', py: '1', border: '1px solid', borderRadius: '3px', cursor: 'pointer' }),
  readyChip: css({ borderColor: '#b9dfc8', bg: '#effbf3', color: '#17643b' }),
  workingChip: css({ borderColor: '#cbc5ff', bg: '#f0eeff', color: '#5148d7' }),
  pendingChip: css({ borderColor: '#d4dced', bg: '#f4f7ff', color: '#68718a' }),
  delayedChip: css({ borderColor: '#f2b8b5', bg: '#fff0ef', color: '#c51c1c' }),
  deletedChip: css({
    borderColor: '#d4d6de',
    bg: '#f0f2f6',
    color: '#7a7f8c',
    textDecoration: 'line-through',
  }),

  table: css({
    w: '100%',
    minW: '1500px',
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
    '& th': { bg: '#dce9ff', color: '#253653', fontSize: '12' /* 기존: 11px */, fontWeight: '800' },
  }),
  groupRow: css({
    bg: '#eaf0ff',
    '& td': { borderBottomColor: '#d4e0fb' },

    '& span': { color: '#68718a', fontSize: '12' /* 기존: 11px */, fontWeight: '600' },
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
  owner: css({
    display: 'inline-flex',
    px: '1.5',
    py: '0.5',
    borderRadius: '3px',
    bg: '#e8efff',
    color: '#344a70',
    fontSize: '12' /* 기존: 10px */,
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
  note: css({ minW: '290px', lineHeight: '1.4', whiteSpace: 'normal!' }),
  statusTag: css({
    display: 'inline-flex',
    px: '1.5',
    py: '0.5',
    borderRadius: '3px',
    fontSize: '12' /* 기존: 10px */,
    fontWeight: '800',
  }),
  readyTag: css({ bg: '#e5f7ed', color: '#17643b' }),
  workingTag: css({ bg: '#e7e5ff', color: '#5148d7' }),
  pendingTag: css({ bg: '#eff2f8', color: '#68718a' }),
  delayedTag: css({ bg: '#c51c1c', color: '#fff' }),
  deletedTag: css({ bg: '#d9dde6', color: '#68718a' }),
  empty: css({ p: '8', color: '#68718a', textAlign: 'center' }),
};

function getStatus(screen: ScreenDefinition): DeliveryStatus {
  if (deletedIaNumbers.has(screen.iaNumber)) return 'deleted';
  if (isStorybookPending(screen.iaNumber)) return 'pending';
  if (isStorybookReady(screen.iaNumber, screen.screenCode)) return 'ready';
  if (isStorybookWorking(screen.screenCode)) return 'working';
  return 'pending';
}

function getPreviewStoryIds(screen: ScreenDefinition): PreviewStoryIds | undefined {
  const previewStoryIds = previewStoryIdsByIaNumber[screen.iaNumber];

  if (previewStoryIds) return previewStoryIds;

  if (screen.screenCode.startsWith('eland_hlo_')) {
    return findAccountScreenCodes.has(screen.screenCode)
      ? findAccountPreviewStoryIds
      : loginPreviewStoryIds;
  }

  return previewStoryIdsByScreenCode[screen.screenCode];
}

function getPreviewHref(storyId: string, screen?: ScreenDefinition) {
  const listingArgs =
    screen?.screenCode === 'eland_hca_01'
      ? '&args=listing:' + getProductListingIaKey(screen.iaNumber)
      : '';

  return '/?path=/story/' + storyId + listingArgs;
}

function getStatusTagClass(status: DeliveryStatus) {
  switch (status) {
    case 'ready':
      return styles.readyTag;
    case 'working':
      return styles.workingTag;
    case 'delayed':
      return styles.delayedTag;
    case 'deleted':
      return styles.deletedTag;
    default:
      return styles.pendingTag;
  }
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
      return { period: '2026.09.30', owners: '조맑은' };
    }

    if (descendants[0] === '검색' || descendants[0] === '검색결과') {
      return { period: '2026.10.26', owners: '조맑은' };
    }
  }

  if (depth1 === 'MEN' || depth1 === 'WOMEN' || depth1 === 'SHOES') {
    const terminalDepth = descendants.reduce((lastDepth, depth) => (depth ? depth : lastDepth), '');
    if (terminalDepth === '목록' || terminalDepth === '상세') {
      return categoryWbsAssignments[terminalDepth];
    }
  }

  return directWbsAssignments[depth1];
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
        { ready: 0, working: 0, pending: 0, delayed: 0, deleted: 0 } as Record<
          DeliveryStatus,
          number
        >,
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
          getWbsAssignment(screen.depths)?.owners ?? '',
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
  const workingPercent = (counts.working / screens.length) * 100;
  const pendingPercent = (counts.pending / screens.length) * 100;
  const delayedPercent = (counts.delayed / screens.length) * 100;
  const deletedPercent = (counts.deleted / screens.length) * 100;

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
      description="확정 IA 기준 화면 체계와 구현 현황을 관리합니다."
    >
      <Grid
        as="section"
        gridTemplateColumns="minmax(280px, 0.9fr) minmax(0, 2.1fr)"
        gap="4"
        mb="4"
        _mobile={{ gridTemplateColumns: '1fr' }}
        aria-label="IA 구현 현황"
      >
        <Grid gap="3">
          <article className={styles.card + ' ' + styles.summaryCard}>
            <div className={styles.cardHeading}>
              <Typography as="h2">
                <FontAwesomeIcon icon={faChartLine} aria-hidden="true" />
                IA OVERALL SPRINT
              </Typography>
              <Typography as="span">Real-time</Typography>
            </div>
            <Stack gap="3" mt="4">
              <Flex alignItems="baseline" justifyContent="space-between">
                <strong
                  className={css({
                    color: '#2a14b4',
                    fontSize: '28' /* 기존 27px */,
                    letterSpacing: '-0.04em',
                  })}
                >
                  {completePercent.toFixed(1)}%
                </strong>
                <Typography
                  as="span"
                  className={css({
                    color: '#68718a',
                    fontFamily: 'mono',
                    fontSize: '12' /* 기존: 11px */,
                  })}
                >
                  {counts.ready} / {screens.length}P
                </Typography>
              </Flex>
              <Flex overflow="hidden" h="2.5" borderRadius="full" bg="#dce4f5">
                <span
                  className={styles.readyProgress}
                  style={{ width: String(completePercent) + '%' }}
                />
                <span
                  className={styles.workingProgress}
                  style={{ width: String(workingPercent) + '%' }}
                />
                <span
                  className={styles.pendingProgress}
                  style={{ width: String(pendingPercent) + '%' }}
                />
                <span
                  className={styles.delayedProgress}
                  style={{ width: String(delayedPercent) + '%' }}
                />
                <span
                  className={styles.deletedProgress}
                  style={{ width: String(deletedPercent) + '%' }}
                />
              </Flex>
              <Flex
                justifyContent="space-between"
                gap="2"

                color="#68718a"
                fontSize="12"
                css={{ '& b': { color: '#17223d' } }}
              >
                <Typography as="span">총 {screens.length}개 화면</Typography>
                <Typography as="span">
                  완료 <b>{counts.ready}</b> · 작업 중 {counts.working} · 대기 {counts.pending} ·
                  지연 <b>{counts.delayed}</b>
                </Typography>
              </Flex>
            </Stack>
          </article>
          <article className={styles.card + ' ' + styles.issueCard}>
            <div className={styles.cardHeading}>
              <Typography as="h2">
                <FontAwesomeIcon icon={faTriangleExclamation} aria-hidden="true" />
                BLOCKED / 긴급 이슈
              </Typography>
              <Typography as="span">
                {counts.delayed ? counts.delayed + '건 대응중' : '정상'}
              </Typography>
            </div>
            {counts.delayed ? (
              <>
                <Typography as="p">
                  지연 상태로 분류된 IA 화면의 일정과 의존성을 확인해야 합니다.
                </Typography>
                <button
                  type="button"
                  className={styles.issueButton}
                  onClick={() => {
                    setStatusFilter('delayed');
                    setActiveDepth1('all');
                  }}
                >
                  지연 이슈만 보기 <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                </button>
              </>
            ) : (
              <Typography as="p">현재 등록된 지연 또는 블락 이슈가 없습니다.</Typography>
            )}
          </article>
        </Grid>

        <section className={styles.card + ' ' + styles.navCard} aria-label="화면 체계 NAV 탭 분류">
          <div className={styles.cardHeading}>
            <Typography as="h2">
              <FontAwesomeIcon icon={faFolderTree} aria-hidden="true" />
              화면 체계 NAV 탭 분류 ({groups.length}개 영역)
            </Typography>
            <Typography as="span">
              <FontAwesomeIcon icon={faCircle} aria-hidden="true" /> 완료 ·{' '}
              <FontAwesomeIcon icon={faCircle} aria-hidden="true" /> 작업 중 ·{' '}
              <FontAwesomeIcon icon={faCircle} aria-hidden="true" /> 대기 ·{' '}
              <FontAwesomeIcon icon={faCircle} aria-hidden="true" /> 지연
            </Typography>
          </div>
          <Grid
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            gap="2"
            mt="3"
            _mobile={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
          >
            {groups.map((group) => {
              const groupCounts = group.screens.reduce(
                (current, screen) => {
                  current[getStatus(screen)] += 1;
                  return current;
                },
                { ready: 0, working: 0, pending: 0, delayed: 0, deleted: 0 } as Record<
                  DeliveryStatus,
                  number
                >,
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
                    <Typography as="span">{groupTotal}P</Typography>
                  </Flex>
                  <span className={styles.miniProgress}>
                    <span
                      className={styles.readyProgress}
                      style={{ width: String((groupCounts.ready / groupTotal) * 100) + '%' }}
                    />
                    <span
                      className={styles.workingProgress}
                      style={{ width: String((groupCounts.working / groupTotal) * 100) + '%' }}
                    />
                    <span
                      className={styles.pendingProgress}
                      style={{ width: String((groupCounts.pending / groupTotal) * 100) + '%' }}
                    />
                    <span
                      className={styles.delayedProgress}
                      style={{ width: String((groupCounts.delayed / groupTotal) * 100) + '%' }}
                    />
                    <span
                      className={styles.deletedProgress}
                      style={{ width: String((groupCounts.deleted / groupTotal) * 100) + '%' }}
                    />
                  </span>
                  <Typography as="span">
                    완료 {groupCounts.ready} · 작업 중 {groupCounts.working} · 대기{' '}
                    {groupCounts.pending} · 지연 {groupCounts.delayed}
                  </Typography>
                </button>
              );
            })}
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
              <option value="ready">완료</option>
              <option value="working">작업 중</option>
              <option value="pending">대기중</option>
              <option value="delayed">지연 / 블락</option>
              <option value="deleted">삭제 / 제외</option>
            </select>
          </Flex>
          <Flex
            flexWrap="wrap"
            gap="1.5"
            fontSize="12"
            fontWeight="800"
            aria-label="구현 상태 범례"
          >
            {(['ready', 'working', 'pending', 'delayed', 'deleted'] as DeliveryStatus[]).map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  className={
                    styles.chip +
                    ' ' +
                    (status === 'ready'
                      ? styles.readyChip
                      : status === 'working'
                        ? styles.workingChip
                        : status === 'pending'
                          ? styles.pendingChip
                          : status === 'delayed'
                            ? styles.delayedChip
                            : styles.deletedChip)
                  }
                  onClick={() => setStatusFilter(status)}
                >
                  <FontAwesomeIcon icon={faCircle} aria-hidden="true" /> {statusLabels[status]}{' '}
                  {counts[status]}
                </button>
              ),
            )}
          </Flex>
        </Flex>

        <Box overflowX="auto" border="1px solid #dbe5ff" borderRadius="7px" bg="#fff">
          <table className={styles.table}>
            <thead>
              <tr>
                <th>메뉴 / 화면 계층 (IA Tree)</th>
                <th>구분</th>
                <th>화면 코드</th>
                <th>WBS</th>
                <th>진행 상태</th>
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
  const groupWbs = getWbsAssignment([group.depth1]);

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
        <td>대분류</td>
        <td className={styles.code}>CAT_{group.depth1.replaceAll(' ', '_').toUpperCase()}</td>
        <td className={styles.wbs}>{groupWbs?.period ?? '-'}</td>
        <td>-</td>
        <td>
          {groupWbs ? (
            <Typography as="span" className={styles.owner}>
              {groupWbs.owners}
            </Typography>
          ) : (
            '-'
          )}
        </td>
        <td>
          <Typography as="span" className={styles.preview}>
            -
          </Typography>
        </td>
        <td className={styles.note}>확정 IA 기준 화면 영역</td>
      </tr>
      {isExpanded &&
        groupOpen &&
        treeRows.map((row) => {
          const hiddenByParent = row.ancestors.some((path) => collapsedPaths.has(path));
          if (hiddenByParent) return null;

          const status = row.screen ? getStatus(row.screen) : undefined;
          const rowWbs = row.screen ? getWbsAssignment(row.screen.depths) : undefined;
          const rowPreviewStoryIds = row.screen ? getPreviewStoryIds(row.screen) : undefined;
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
                      icon={
                        status === 'delayed'
                          ? faTriangleExclamation
                          : status === 'deleted'
                            ? faBan
                            : row.isBranch
                              ? faFolder
                              : faFileLines
                      }
                      aria-hidden="true"
                    />
                  </span>
                  <Typography as="span">{row.label}</Typography>
                </div>
              </td>
              <td>
                {row.screen?.category ??
                  (row.depth === 1 ? '중분류' : row.depth === 2 ? '소분류' : '상세')}
              </td>
              <td className={styles.code}>{row.screen?.screenCode ?? '-'}</td>
              <td className={styles.wbs}>{rowWbs?.period ?? '-'}</td>
              <td>
                {status ? (
                  <Typography
                    as="span"
                    className={styles.statusTag + ' ' + getStatusTagClass(status)}
                  >
                    {statusLabels[status]}
                  </Typography>
                ) : (
                  '-'
                )}
              </td>
              <td>
                {rowWbs ? (
                  <Typography as="span" className={styles.owner}>
                    {rowWbs.owners}
                  </Typography>
                ) : (
                  '-'
                )}
              </td>
              <td>
                {rowPreviewStoryIds ? (
                  <div className={styles.preview}>
                    <a
                      href={getPreviewHref(rowPreviewStoryIds.pc, row.screen)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faDesktop} aria-hidden="true" /> PC
                    </a>
                    <a
                      href={getPreviewHref(rowPreviewStoryIds.mo, row.screen)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faMobileScreenButton} aria-hidden="true" /> MO
                    </a>
                  </div>
                ) : (
                  <div className={styles.preview}>
                    <Typography as="span">N/A</Typography>
                  </div>
                )}
              </td>
              <td className={styles.note}>
                {status === 'delayed' && (
                  <Typography as="span" className={styles.delayedTag}>
                    WBS 초과
                  </Typography>
                )}
                {status === 'deleted' && (
                  <Typography as="span" className={styles.deletedTag}>
                    삭제 / 제외
                  </Typography>
                )}
                {row.screen ? row.screen.note || '-' : '-'}
              </td>
            </tr>
          );
        })}
    </>
  );
}
