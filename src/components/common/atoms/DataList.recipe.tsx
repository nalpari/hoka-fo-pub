import { cva, sva } from 'styled-system/css';
import type { SystemStyleObject } from 'styled-system/types';

const noTop = { borderTopWidth: '0' } as const;

const strongTop = { borderTop: '2px solid var(--color-black-100)' } as const;

const thinStrongTop = { borderTop: '1px solid var(--color-black-100)' } as const;

const thinSubtleTop = { borderTop: '1px solid var(--color-black-20)' } as const;

const thickSubtleTop = { borderTop: '2px solid var(--color-black-20)' } as const;

const topBorders = {
  none: noTop,
  strong: strongTop,
  emphasis: { borderTop: '2px solid token(colors.border.strong)' },
  thinStrong: thinStrongTop,
  thinSubtle: thinSubtleTop,
  thickSubtle: thickSubtleTop,
  thickToThinSubtle: { ...thickSubtleTop, _mobile: thinSubtleTop },
  strongToThin: { ...strongTop, _mobile: thinStrongTop },
  desktopStrong: { ...strongTop, _mobile: noTop },
} as const;

const bottomBorders = {
  none: { borderBottomWidth: '0' },
  subtle: { borderBottom: '1px solid var(--color-black-20)' },
  muted: { borderBottom: '1px solid var(--color-black-40)' },
  defaultBorder: { borderBottom: '1px solid token(colors.border.default)' },
  strong: { borderBottom: '1px solid var(--color-black-100)' },
  strongToSubtle: {
    borderBottom: '1px solid var(--color-black-100)',
    _mobile: { borderBottomColor: 'var(--color-black-20)' },
  },
  subtleToStrong: {
    borderBottom: '1px solid var(--color-black-20)',
    _mobile: { borderBottomColor: 'var(--color-black-100)' },
  },
} as const;

/** 목록 외 합계·상세·모달의 경계선입니다. 옵션 생략/undefined는 해당 선을 추가하지 않습니다. */
export const dataListBoundaryRecipe = cva({
  variants: {
    top: { unchanged: {}, ...topBorders },
    bottom: { unchanged: {}, ...bottomBorders },
  },
  defaultVariants: { top: 'unchanged', bottom: 'unchanged' },
});

function dividerSlots(border: SystemStyleObject) {
  return {
    root: { '& > :is(li, [data-list-item])': border },
    linkedList: { '& > li > a': border },
  };
}

function headerCellSlots(styles: SystemStyleObject) {
  return {
    cell: styles,
    header: { '& > [data-list-cell]': styles },
    root: { '& > [data-list-header] > [data-list-cell]': styles },
  };
}

const headerText = {
  fontFamily: 'ko',
  transform: 'translateY(1px)',
  letterSpacing: 'korean',
  color: 'inherit',
} as const;

const headingText = {
  ...headerText,
  fontSize: 'heading.22',
  _mobile: { fontSize: 'heading.20' },
  fontWeight: 'bold',
  lineHeight: 'koreanHeading',
} as const;

/**
 * top은 PC·모바일을 묶은 시작선 유형이며 기본값은 strong입니다. 기존 상단선 소유자가 따로 있으면 unchanged를 지정합니다. strongToThin은 PC2px/MO1px 검정, desktopStrong은 모바일 선 없음입니다.
 * 목록의 기존 DOM에 연결합니다. headerTypography는 data-list-header의 직접 data-list-cell(또는 기존 cell 슬롯)만 지정하며 본문 typography에는 관여하지 않습니다.
 * headerVisibility 생략 또는 undefined는 visuallyHidden으로 머리글 공간을 제거하고 보조 기술에 유지합니다. 화면에 표시하려면 visible을 지정합니다.
 * columnGap의 기본값 flush는 항목 가로 간격0입니다. 명시적 unchanged만 간격을 추가하지 않습니다. productControls는 PC16/MO8px,
 * addressActions는 PC/MO24px이며 각 case가 반응형 값을 함께 소유합니다. rowGap은 변경하지 않습니다.
 * itemLayout 기본값 unchanged는 항목 배치를 추가하지 않습니다. productSelection은 항목 gap16/py16과 마지막 중복선 제거, 목록 gap0/검정 하단선을 소유합니다.
 * root 슬롯은 시작선과 직접 자식 li 또는 data-list-item의 가로 간격·하단선을 함께 제어합니다. linkedList는 직접 li > a의 선을 관리하며 중첩 목록에는 전파하지 않습니다.
 */
export const dataListRecipe = sva({
  slots: ['root', 'header', 'linkedList', 'cell'],
  base: {
    root: { '& > [data-list-header] > [data-list-cell]': { textAlign: 'center' } },
    header: {
      py: '20px',
      ...bottomBorders.strong,
      '& > [data-list-cell]': { textAlign: 'center' },
    },
    cell: { textAlign: 'center' },
  },
  variants: {
    density: { standard: {}, compact: { header: { py: '16px' } } },
    headerVisibility: {
      visible: {},
      visuallyHidden: { header: { srOnly: true, py: '0', borderBottomWidth: '0' } },
    },
    itemLayout: {
      unchanged: {},
      faqAccordion: {
        root: {
          '& > div > h3 > button': {
            minH: '74px',
            gap: '16px',
            py: '24px',
            textAlign: 'left',
            boxShadow: 'inset 0 -1px 0 var(--color-black-20)',
            '&[aria-expanded="true"]': { boxShadow: 'none' },
            _mobile: { minH: '58px', py: '16px' },
          },
        },
      },
      selectedOptions: {
        root: {
          '& > li > [data-list-option]': { gap: '12px', py: '16px' },
          '& > li > [data-list-option] > [data-list-controls]': { columnGap: '12px' },
        },
      },
      inquiryAccordion: {
        root: {
          '& > div': { borderBottom: '1px solid var(--color-border-default)' },
          '& [data-list-columns]': { columnGap: '0', _mobile: { columnGap: '12px' } },
        },
      },
      trackingTable: {
        root: {
          w: '100%',
          tableLayout: 'fixed',
          borderCollapse: 'collapse',
          textAlign: 'center',
          fontSize: 'body.14',
          '--tracking-column': '144px',
          _mobile: { fontSize: 'body.12', '--tracking-column': '84px' },
          '& th, & td': {
            px: '2px',
            py: '12px',
            ...bottomBorders.subtle,
            overflowWrap: 'anywhere',
          },
          '& th': {
            py: '16px',
            ...bottomBorders.subtle,
            fontWeight: '400',
            color: 'black.100',
            _mobile: { py: '12px' },
          },
          '& th:nth-child(-n+2)': { w: 'var(--tracking-column)' },
        },
      },
      productSelection: {
        root: {
          gap: '0',
          ...bottomBorders.subtle,
          '& > [data-list-item]': {
            gap: '16px',
            py: '16px',
            alignItems: 'flex-start',
            '&:last-child': { borderBottomWidth: '0' },
          },
        },
      },
    },
    headerTypography: {
      unchanged: {},
      tracking: headerCellSlots({ fontSize: 'inherit', fontWeight: '400', color: 'inherit' }),
      heading: headerCellSlots({
        ...headingText,
        _mobile: { fontSize: 'heading.20', fontWeight: 'semibold' },
      }),
      headingBold: headerCellSlots({
        ...headingText,
        _mobile: { fontSize: 'heading.20', fontWeight: 'bold' },
      }),
      bodySemibold: headerCellSlots({
        ...headerText,
        fontSize: 'body.16',
        fontWeight: 'semibold',
        lineHeight: 'body',
      }),
      compactSemibold: headerCellSlots({
        ...headerText,
        fontSize: 'body.16',
        fontWeight: 'semibold',
        lineHeight: 'body',
        _mobile: { fontSize: 'body.16', fontWeight: 'semibold' },
      }),
    },
    top: {
      unchanged: { root: {} },
      none: { root: topBorders.none },
      strong: { root: topBorders.strong },
      emphasis: { root: topBorders.emphasis },
      thinStrong: { root: topBorders.thinStrong },
      thinSubtle: { root: topBorders.thinSubtle },
      thickSubtle: { root: topBorders.thickSubtle },
      thickToThinSubtle: { root: topBorders.thickToThinSubtle },
      strongToThin: { root: topBorders.strongToThin },
      desktopStrong: { root: topBorders.desktopStrong },
    },
    rowBorder: {
      subtle: dividerSlots(bottomBorders.subtle),
      semanticSubtle: dividerSlots({ borderBottom: '1px solid var(--color-border-subtle)' }),
      muted: dividerSlots(bottomBorders.muted),
      strong: dividerSlots(bottomBorders.strong),
      strongToSubtle: dividerSlots(bottomBorders.strongToSubtle),
      subtleToStrong: dividerSlots(bottomBorders.subtleToStrong),
    },
    columnGap: {
      unchanged: {},
      flush: {
        root: { '& > :is(li, [data-list-item])': { columnGap: '0' } },
      },
      metadataColumns: {
        root: {
          '& > :is(li, [data-list-item])': { columnGap: '0', _mobile: { columnGap: '8px' } },
        },
      },
      productControls: {
        root: {
          '& > :is(li, [data-list-item])': { columnGap: '16px', _mobile: { columnGap: '8px' } },
        },
      },
      addressActions: {
        root: {
          '& > :is(li, [data-list-item])': { columnGap: '24px', _mobile: { columnGap: '24px' } },
        },
      },
    },
    cellVariant: {
      noticeColumns: {
        root: {
          '& > [data-list-header] > [data-list-cell="title"][data-list-cell]': {
            flex: '1',
            minW: '0',
            textAlign: 'center',
            px: '4',
          },
          '& > [data-list-header] > [data-list-cell="date"][data-list-cell]': {
            flexShrink: '0',
            textAlign: 'center',
            px: '8',
          },
        },
      },
      standard: {},
      heading: headerCellSlots({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black.100',
        letterSpacing: 'korean',
      }),
      noticeTitle: headerCellSlots({ textAlign: 'left', px: '4' }),
      noticeDate: headerCellSlots({ textAlign: 'left', px: '8' }),
    },
  },
  defaultVariants: {
    density: 'standard',
    headerVisibility: 'visuallyHidden',
    itemLayout: 'unchanged',
    headerTypography: 'unchanged',
    top: 'strong',
    rowBorder: 'subtle',
    columnGap: 'flush',
    cellVariant: 'standard',
  },
});
