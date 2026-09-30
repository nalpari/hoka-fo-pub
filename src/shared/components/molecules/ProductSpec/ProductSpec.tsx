import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type ProductSpecProps = {
  cushioning: string;
  stability: string;
  width: string;
};

/** Product cushioning, stability, and width summary. */
export function ProductSpec({ cushioning, stability, width }: ProductSpecProps) {
  return (
    <Typography tone="subtle" variant="meta">
      {cushioning} · {stability} · {width}
    </Typography>
  );
}
