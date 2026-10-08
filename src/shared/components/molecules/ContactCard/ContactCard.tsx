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
const heading = css({ m: '0', fontSize: '16' /* 기존 18px */ });
const description = css({ m: '0', color: 'var(--color-text-muted)', fontSize: '14' /* 기존 13px */ });
const noticeStyle = css({ m: '0', color: 'var(--color-text-muted)', fontSize: '12' });

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
      <h2 className={heading}>{title}</h2>
      {body ? <p className={description}>{body}</p> : null}
      <DescriptionList items={details} />
      {notice ? <p className={noticeStyle}>{notice}</p> : null}
    </article>
  );
}
