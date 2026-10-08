import { css } from 'styled-system/css';

const image = css({
  display: 'block',
  w: '100%',
  aspectRatio: '1',
  objectFit: 'cover',
  bg: 'var(--color-black-10)',
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
  alt: string;
  src: string;
  onClick?: () => void;
};

export function ProductDetailImage({ alt, src, onClick }: ProductDetailImageProps) {
  const content = <img alt={alt} className={image} src={src} />;

  if (!onClick) return content;

  return (
    <button aria-label={`${alt} 크게 보기`} className={trigger} onClick={onClick} type="button">
      {content}
    </button>
  );
}
