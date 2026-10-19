import type { CSSProperties, ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Box } from 'styled-system/jsx';

const list = css({
  display: 'grid',
  gridTemplateColumns: 'var(--description-list-label-width, max-content) minmax(0, 1fr)',
  gap: '10px 16px',
  m: '0',
});

export type DescriptionListItem = { id?: string; term: ReactNode; description: ReactNode };

export type DescriptionListProps = {
  items: readonly DescriptionListItem[];
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
        <Box key={item.id ?? index} display="contents">
          <Typography as="dt" variant="heading9">
            {item.term}
          </Typography>
          <Typography as="dd" variant="body4" tone="tertiary">
            {item.description}
          </Typography>
        </Box>
      ))}
    </dl>
  );
}
