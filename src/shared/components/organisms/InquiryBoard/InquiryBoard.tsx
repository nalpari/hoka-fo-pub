'use client';

import { useId, useState, type ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box, Flex, Grid } from 'styled-system/jsx';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { InquiryBoardHeader } from './InquiryBoardHeader';
import { InquiryBoardContent } from './InquiryBoardContent';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faChevronDown } from '@/shared/icons/fontAwesome';

type InquiryMetadata = {
  id: string;
  author: string;
  date: string;
  status: 'pending' | 'answered';
};

/** Restricted entries deliberately carry no private title, body, or answer. */
export type InquiryBoardEntry = InquiryMetadata &
  (
    | { visibility: 'restricted' }
    | {
        visibility: 'public' | 'private';
        title: string;
        content: ReactNode;
        answer?: ReactNode;
      }
  );

export type InquiryBoardProps = {
  title: string;
  items: readonly InquiryBoardEntry[];
  action?: ReactNode;
  defaultExpandedIds?: string[];
  className?: string;
  variant?: 'default' | 'product';
  pageSize?: number;
  loadMoreSize?: number;
};

const styles = {
  item: css({ borderBottom: '1px solid var(--color-border-default)' }),
  trigger: css({
    textAlign: 'left',
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '-2px' },
  }),
  productPanel: css({
    p: '6',
    bg: 'black.10',
    borderTop: '1px solid token(colors.black.20)',
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap',
  }),
  productEmpty: css({
    display: 'flex',
    minH: '120px',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  title: css({ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
  metadata: css({ textAlign: 'center', _mobile: { textAlign: 'left' } }),
  panel: css({
    p: '32px 20px',
    bg: 'var(--colors-surface-subtle)',
    borderTop: '1px solid var(--color-border-default)',
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap',
    _mobile: { p: '24px 12px' },
  }),

  empty: css({
    py: '48px',
    textAlign: 'center',
    borderBottom: '1px solid var(--color-border-default)',
  }),
};

function InquirySubject({
  item,
  variant,
}: {
  item: InquiryBoardEntry;
  variant: 'default' | 'product';
}) {
  const isPrivate = item.visibility !== 'public';

  return (
    <Grid
      as="span"
      gridTemplateColumns="minmax(0, 1fr) 100px 100px 100px"
      alignItems="center"
      w="100%"
      minH={variant === 'product' ? '59px' : '60px'}
      pl={variant === 'product' ? '6' : '5'}
      pr={variant === 'product' ? '0' : '5'}
      gap="0"
      _mobile={{
        gridTemplateColumns: 'minmax(0, 1fr) auto auto',
        gap: '3',
        px: '3',
        py: '4',
      }}
    >
      <Flex
        as="span"
        alignItems="center"
        gap="2"
        minW="0"
        direction={variant === 'product' ? 'row-reverse' : 'row'}
        justifyContent={variant === 'product' ? 'flex-end' : undefined}
        _mobile={{ gridColumn: '1 / -1' }}
      >
        <Typography variant="body4" className={styles.title}>
          {item.visibility === 'restricted' ? '비공개 문의글입니다.' : item.title}
        </Typography>
        {isPrivate && (
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
            <rect x="2.5" y="7.5" width="11" height="9" rx="1" stroke="currentColor" />
            <path d="M5 7V4a3 3 0 0 1 6 0v3M8 11v3" stroke="currentColor" />
          </svg>
        )}
      </Flex>
      <Typography variant="body4" tone="tertiary" className={styles.metadata}>
        {item.author}
      </Typography>
      <Typography
        as="time"
        dateTime={item.date}
        variant="body4"
        tone="tertiary"
        className={styles.metadata}
      >
        {item.date}
      </Typography>
      <Typography variant="body4" weight="bold" className={styles.metadata}>
        {item.status === 'answered' ? '답변완료' : variant === 'product' ? '접수' : '답변대기'}
      </Typography>
    </Grid>
  );
}

/** Shared inquiry board for product details and account inquiry history. */
export function InquiryBoard({
  title,
  items,
  action,
  defaultExpandedIds,
  className,
  variant = 'default',
  pageSize,
  loadMoreSize = 16,
}: InquiryBoardProps) {
  const headingId = useId();
  const [excludePrivate, setExcludePrivate] = useState(false);
  const [shownCount, setShownCount] = useState(pageSize ?? items.length);
  const visibleItems = excludePrivate
    ? items.filter((item) => item.visibility === 'public')
    : items;
  const limit = pageSize === undefined ? visibleItems.length : shownCount;
  const displayedItems = visibleItems.slice(0, limit);
  const nextCount = Math.min(loadMoreSize, visibleItems.length - limit);

  return (
    <Box as="section" w="100%" minW="0" aria-labelledby={headingId} className={className}>
      <InquiryBoardHeader
        headingId={headingId}
        title={title}
        count={items.length}
        variant={variant}
        filterDisabled={variant === 'product' && items.length === 0}
        excludePrivate={excludePrivate}
        onExcludePrivateChange={(checked) => {
          setExcludePrivate(checked);
          setShownCount(pageSize ?? items.length);
        }}
        action={action}
      />
      {visibleItems.length ? (
        <Accordion
          multiple={variant === 'product'}
          defaultValue={defaultExpandedIds}
          indicator={null}
          itemClassName={styles.item}
          triggerClassName={styles.trigger}
          panelClassName={variant === 'product' ? styles.productPanel : styles.panel}
          items={displayedItems.map((item) => ({
            value: item.id,
            title: <InquirySubject item={item} variant={variant} />,
            content: <InquiryBoardContent item={item} variant={variant} />,
          }))}
        />
      ) : (
        <Typography
          as="p"
          variant={variant === 'product' ? 'body3' : 'body4'}
          tone={variant === 'product' ? 'primary' : 'tertiary'}
          className={variant === 'product' ? styles.productEmpty : styles.empty}
          role="status"
        >
          {excludePrivate && variant !== 'product'
            ? '공개로 등록된 문의글이 없습니다.'
            : '등록된 문의글이 없습니다.'}
        </Typography>
      )}
      {nextCount > 0 && (
        <Flex justifyContent="center" py="5">
          <Button variant="plain" onClick={() => setShownCount((count) => count + nextCount)}>
            더 보기 ({nextCount}) <Icon fontAwesomeIcon={faChevronDown} size="16px" />
          </Button>
        </Flex>
      )}
    </Box>
  );
}
