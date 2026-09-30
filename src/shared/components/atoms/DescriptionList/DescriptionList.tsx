import type { CSSProperties, ReactNode } from 'react';
import { css } from 'styled-system/css';

const list = css({
  display: 'grid',
  gridTemplateColumns: 'var(--description-list-label-width, max-content) minmax(0, 1fr)',
  gap: '10px 16px',
  m: '0',
  fontSize: '13px',
  lineHeight: '1.65',
});
const term = css({ fontWeight: '700' });
const detail = css({ m: '0', color: 'var(--color-text-muted)' });
export type DescriptionListItem = { term: ReactNode; description: ReactNode };
export type DescriptionListProps = {
  items: DescriptionListItem[];
  labelWidth?: string;
  className?: string;
};

/** Semantic key/value list for delivery, specifications, and account summaries. */
export function DescriptionList({ items, labelWidth, className }: DescriptionListProps) {
  return (
    <dl
      className={[list, className].filter(Boolean).join(' ')}
      style={{ '--description-list-label-width': labelWidth } as CSSProperties}
    >
      {items.map((item, index) => (
        <div key={index} style={{ display: 'contents' }}>
          <dt className={term}>{item.term}</dt>
          <dd className={detail}>{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}
