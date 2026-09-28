import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/mocks/products';
import { css, cva } from 'styled-system/css';
import { Box, Flex, VStack } from 'styled-system/jsx';
import { Card } from '@/shared/components/atoms/Card/Card';
import { Button } from '@/shared/components/atoms/Button/Button';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { Badge } from '@/shared/components/atoms/Badge/Badge';

const root = css({
  minW: '0',
  position: 'relative',
  _hover: {
    '& [data-product-hover-image]': { opacity: '1' },
    '& [data-quick-options]': { display: 'grid' },
  },
  _focusWithin: {
    '& [data-product-hover-image]': { opacity: '1' },
    '& [data-quick-options]': { display: 'grid' },
  },
  _mobile: {
    '& [data-product-hover-image]': { display: 'none' },
    '& [data-quick-options]': { display: 'none' },
  },
});

const productImageArea = css({
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
  bg: '#F7F7F9',
});

const productImage = css({
  gridArea: '1 / 1',
  w: '100%',
  h: '100%',
  objectFit: 'contain',
  bg: '#F7F7F9',
});

const hoverImage = css({ opacity: '0', transition: 'opacity 180ms ease' });
const like = cva({
  base: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    zIndex: '2',
    p: '0',
    border: '0',
    bg: '#fff',
    fontSize: '23px',
  },
  variants: { liked: { true: { color: '#d71920' }, false: {} } },
});
const launchStatus = css({ position: 'absolute', bottom: '8px', left: '8px', zIndex: '1' });
const productSpec = css({ color: '#555', fontSize: '12px' });
const compareToggle = css({ mt: '4px', borderColor: '#bbb', p: '8px', fontSize: '12px' });
const quickOptions = css({
  position: 'absolute',
  inset: '0',
  display: 'none',
  placeContent: 'center',
  justifyItems: 'center',
  gap: '13px',
  bg: 'rgb(0 0 0 / 62%)',
  color: '#fff',
});
const quickButton = css({
  borderRadius: '22px',
  py: '11px',
  px: '32px',
  bg: '#fff',
  color: '#111',
});
const quickSizes = css({ color: '#fff', lineHeight: '1.8', textAlign: 'center' });
const swatch = cva({
  base: {
    display: 'inline-block',
    w: '18px',
    h: '18px',
    m: '2px',
    border: '1px solid #bbb',
    borderRadius: 'full',
    verticalAlign: 'middle',
  },
  variants: { color: { black: { bg: '#111' }, white: { bg: '#fff' } } },
});

const won = (value: number) => `${value.toLocaleString('ko-KR')}원`;

export function ProductCard({
  product,
  quick = false,
  compareSelected = false,
  onCompare,
}: {
  product: Product;
  quick?: boolean;
  compareSelected?: boolean;
  onCompare?: (product: Product) => void;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <Card className={root}>
      <Link to={`/products/${product.id}`}>
        <Box className={`${productImageArea} image`}>
          {product.badge && <em>{product.badge}</em>}
          <Badge
            className={launchStatus}
            tone={product.launchStatus === 'COMING' ? 'danger' : 'neutral'}
          >
            {product.launchStatus === 'COMING' ? 'COMING SOON' : 'IN STOCK'}
          </Badge>
          <img
            alt={product.name}
            className={productImage}
            loading="lazy"
            src={product.primaryImage}
          />
          <img
            alt=""
            aria-hidden="true"
            className={`${productImage} ${hoverImage}`}
            data-product-hover-image
            loading="lazy"
            src={product.hoverImage}
          />
          {quick && (
            <VStack className={quickOptions} data-quick-options>
              <Button className={quickButton} size="sm">
                Quick View
              </Button>
              <Flex>
                <span className={swatch({ color: 'black' })} />
                <span className={swatch({ color: 'white' })} />
              </Flex>
              <small className={quickSizes}>220 225 230 235 240 245 250 255 260</small>
            </VStack>
          )}
        </Box>
      </Link>
      <IconButton
        className={like({ liked })}
        shape="circle"
        size="38px"
        onClick={() => setLiked(!liked)}
        aria-label={`${product.name} 관심상품`}
      >
        {liked ? '♥' : '♡'}
      </IconButton>
      <small>
        {product.category} · {product.gender}
      </small>
      <strong>{product.name}</strong>
      <b>{won(product.price)}</b>
      <i>{product.colors.length} colors</i>
      <span className={productSpec}>
        {product.cushioning} · {product.stability} · {product.width}
      </span>
      {onCompare && (
        <Button
          className={compareToggle}
          onClick={() => onCompare(product)}
          aria-pressed={compareSelected}
          variant={compareSelected ? 'primary' : 'secondary'}
        >
          {compareSelected ? '비교 선택됨' : '비교하기'}
        </Button>
      )}
    </Card>
  );
}
