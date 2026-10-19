'use client';

import { useId, useState, type ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Grid, Flex } from 'styled-system/jsx';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

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
};

const styles = {
  root: css({ w: '100%', minW: 0 }),
  checkbox: css({
    gap: '8px',
    color: 'var(--color-text-tertiary)',
    '& [role="checkbox"]': { w: '18px', h: '18px' },
  }),
  item: css({ borderBottom: '1px solid var(--color-border-default)' }),
  trigger: css({
    textAlign: 'left',
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '-2px' },
  }),
  row: css({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 100px 100px 100px',
    alignItems: 'center',
    w: '100%',
    minH: '60px',
    px: '20px',
    gap: '0',
    _mobile: {
      gridTemplateColumns: 'minmax(0, 1fr) auto auto',
      gap: '12px',
      px: '12px',
      py: '16px',
    },
  }),
  subject: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minW: 0,
    _mobile: { gridColumn: '1 / -1' },
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

function InquirySubject({ item }: { item: InquiryBoardEntry }) {
  const isPrivate = item.visibility !== 'public';

  return (
    <span className={styles.row}>
      <span className={styles.subject}>
        <Typography variant="body4" className={styles.title}>
          {item.visibility === 'restricted' ? '비공개 문의글입니다.' : item.title}
        </Typography>
        {isPrivate && (
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
            <rect x="2.5" y="7.5" width="11" height="9" rx="1" stroke="currentColor" />
            <path d="M5 7V4a3 3 0 0 1 6 0v3M8 11v3" stroke="currentColor" />
          </svg>
        )}
      </span>
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
        {item.status === 'answered' ? '답변완료' : '답변대기'}
      </Typography>
    </span>
  );
}

/** Shared inquiry board for product details and account inquiry history. */
export function InquiryBoard({
  title,
  items,
  action,
  defaultExpandedIds,
  className,
}: InquiryBoardProps) {
  const headingId = useId();
  const [excludePrivate, setExcludePrivate] = useState(false);
  const visibleItems = excludePrivate
    ? items.filter((item) => item.visibility === 'public')
    : items;

  return (
    <section
      aria-labelledby={headingId}
      className={[styles.root, className].filter(Boolean).join(' ')}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        gap="4"
        pb="5"
        borderBottom="1px solid var(--color-black-100)"
        _mobile={{ flexWrap: 'wrap' }}
      >
        <Flex alignItems="center" flexWrap="wrap" gap="5" _mobile={{ gap: '3' }}>
          <Typography as="h3" id={headingId} variant="body2" weight="bold">
            {title}({items.length})
          </Typography>
          <Checkbox
            label="비밀글 제외"
            labelVariant="body4"
            className={styles.checkbox}
            checked={excludePrivate}
            onCheckedChange={setExcludePrivate}
          />
        </Flex>
        {action}
      </Flex>
      {visibleItems.length ? (
        <Accordion
          multiple={false}
          defaultValue={defaultExpandedIds}
          indicator={null}
          itemClassName={styles.item}
          triggerClassName={styles.trigger}
          panelClassName={styles.panel}
          items={visibleItems.map((item) => ({
            value: item.id,
            title: <InquirySubject item={item} />,
            content:
              item.visibility === 'restricted' ? (
                <Typography as="p" variant="body4">
                  비공개글은 작성자 본인만 확인할 수 있습니다.
                </Typography>
              ) : (
                <>
                  <Typography as="div" variant="body4">
                    {item.content}
                  </Typography>
                  {item.answer != null && (
                    <Grid mt="24px" gap="8px">
                      <Typography variant="body4" weight="bold">
                        답변
                      </Typography>
                      <Typography as="div" variant="body4">
                        {item.answer}
                      </Typography>
                    </Grid>
                  )}
                </>
              ),
          }))}
        />
      ) : (
        <Typography as="p" variant="body4" tone="tertiary" className={styles.empty} role="status">
          {excludePrivate ? '공개로 등록된 문의글이 없습니다.' : '등록된 문의글이 없습니다.'}
        </Typography>
      )}
    </section>
  );
}
