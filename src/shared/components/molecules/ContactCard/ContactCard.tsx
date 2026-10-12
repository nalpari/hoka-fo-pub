import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import {
  DescriptionList,
  type DescriptionListItem,
} from '@/shared/components/atoms/DescriptionList/DescriptionList';

export type ContactCardProps = {
  title: ReactNode;
  description?: ReactNode;
  details: DescriptionListItem[];
  notice?: ReactNode;
  className?: string;
};

const root = css({
  display: 'grid',
  gap: '4',
  p: '6',
  border: '1px solid var(--color-border-subtle)',
});

const heading = css({
  m: '0',
});

const description = css({
  m: '0',
  '&&': {
    color: 'var(--color-text-tertiary)',
  },
});

const noticeStyle = css({
  m: '0',
  '&&': {
    color: 'var(--color-text-tertiary)',
  },
});

/** Reusable customer-service, store, and business-contact information card. */
export function ContactCard({
  title,
  description: body,
  details,
  notice,
  className,
}: ContactCardProps) {
  return (
    <article className={[root, className].filter(Boolean).join(' ')}>
      <Typography as="h2" variant="heading9" className={heading}>
        {title}
      </Typography>
      {body ? (
        <Typography as="p" variant="body4" className={description}>
          {body}
        </Typography>
      ) : null}
      <DescriptionList items={details} />
      {notice ? (
        <Typography as="p" variant="body5" className={noticeStyle}>
          {notice}
        </Typography>
      ) : null}
    </article>
  );
}
