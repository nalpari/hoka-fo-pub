import { css } from 'styled-system/css';

const spec = css({ color: '#555', fontSize: '12px' });

export type ProductSpecProps = {
  cushioning: string;
  stability: string;
  width: string;
};

/** Product cushioning, stability, and width summary. */
export function ProductSpec({ cushioning, stability, width }: ProductSpecProps) {
  return (
    <span className={spec}>
      {cushioning} · {stability} · {width}
    </span>
  );
}
