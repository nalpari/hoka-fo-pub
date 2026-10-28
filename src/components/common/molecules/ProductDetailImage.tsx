import Image from 'next/image';

import { css } from 'styled-system/css';

const image = css({
  display: 'block',
  w: '100%',
  h: 'auto',
});

const trigger = css({
  display: 'block',
  w: '100%',
  p: '0',
  border: '0',
  bg: 'transparent',
  cursor: 'zoom-in',
});

type ProductDetailImageProps = {
  eager?: boolean;
  alt: string;
  src: string;
  onClick?: () => void;
};

/** 상품 상세 이미지를 반응형 크기와 지정된 로딩 방식으로 표시합니다. (Displays a product detail image with responsive sizing and the requested loading behavior.) */
export function ProductDetailImage({ alt, src, onClick, eager = false }: ProductDetailImageProps) {
  const content = (
    <Image
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      className={image}
      src={src}
      width={1600}
      height={1600}
      sizes="(max-width: 1023px) 100vw, 50vw"
    />
  );

  if (!onClick) return content;

  return (
    <button aria-label={`${alt} 크게 보기`} className={trigger} onClick={onClick} type="button">
      {content}
    </button>
  );
}
