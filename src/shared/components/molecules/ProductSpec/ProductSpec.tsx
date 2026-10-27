import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type ProductSpecProps = {
  cushioning: string;
  stability: string;
  width: string;
};

/** 상품의 쿠셔닝·안정성·발볼 정보를 요약합니다. (Summarizes a product's cushioning, stability, and width.) */
export function ProductSpec({ cushioning, stability, width }: ProductSpecProps) {
  return (
    <Typography tone="subtle" variant="body5">
      {cushioning} · {stability} · {width}
    </Typography>
  );
}
