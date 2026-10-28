import type { CSSProperties, ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Typography, type TypographyProps } from '@/components/common/atoms/Typography/Typography';
import { Box } from 'styled-system/jsx';
import type { SystemStyleObject } from 'styled-system/types';

const list = css.raw({
  display: 'grid',
  gridTemplateColumns: 'var(--description-list-label-width, max-content) minmax(0, 1fr)',
  gap: '10px 16px',
  m: '0',
});

export type DescriptionListItem = { id?: string; term: ReactNode; description: ReactNode };

type TextProps = Pick<TypographyProps, 'variant' | 'web' | 'mo' | 'tone' | 'weight'>;

export type DescriptionListSlotStyles = {
  root?: SystemStyleObject;
  row?: SystemStyleObject;
  term?: SystemStyleObject;
  description?: SystemStyleObject;
};

export type DescriptionListProps = {
  items: readonly DescriptionListItem[];
  labelWidth?: string;
  className?: string;
  /** Merge layout styles before Panda class generation; use text props for type scales. */
  slotStyles?: DescriptionListSlotStyles;
  termProps?: TextProps;
  descriptionProps?: TextProps;
};

/** 배송·상품 정보와 계정 요약을 의미 있는 이름/값 목록으로 표시합니다. (Displays semantic key/value lists for delivery, product details, and account summaries.) */
export function DescriptionList({
  items,
  labelWidth,
  className,
  slotStyles,
  termProps,
  descriptionProps,
}: DescriptionListProps) {
  return (
    <dl
      className={[css(list, slotStyles?.root), className].filter(Boolean).join(' ')}
      style={{ '--description-list-label-width': labelWidth } as CSSProperties}
    >
      {items.map((item, index) => (
        <Box key={item.id ?? index} className={css({ display: 'contents' }, slotStyles?.row)}>
          <Typography as="dt" variant="body4" {...termProps} className={css(slotStyles?.term)}>
            {item.term}
          </Typography>
          <Typography
            as="dd"
            variant="body4"
            tone="tertiary"
            {...descriptionProps}
            className={css(slotStyles?.description)}
          >
            {item.description}
          </Typography>
        </Box>
      ))}
    </dl>
  );
}
