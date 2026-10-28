import type { ReactNode } from 'react';

import { css } from 'styled-system/css';

import {
  DescriptionList,
  type DescriptionListItem,
} from '@/components/common/atoms/DescriptionList/DescriptionList';
import { Typography } from '@/components/common/atoms/Typography/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';

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
      <ContentHeader
        gap="4"
        title={title}
        titleProps={{ variant: 'heading9', className: heading }}
        description={body}
        descriptionProps={{ variant: 'body4', className: description }}
      />
      <DescriptionList items={details} />
      {notice ? (
        <Typography as="p" variant="body5" className={noticeStyle}>
          {notice}
        </Typography>
      ) : null}
    </article>
  );
}
