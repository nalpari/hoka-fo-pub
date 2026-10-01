import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/mocks/products';
import { css, cva } from 'styled-system/css';
import { usePlatform } from '@/shared/context/platform';
import { Card } from '@/shared/components/atoms/Card/Card';
import { BadgeLaunchStatus } from '@/shared/components/atoms/Badge/BadgeLaunchStatus';
import { Wishlist } from '@/shared/components/atoms/Wishlist/Wishlist';
import { ProductThumbnail } from '@/shared/components/molecules/ProductThumbnail/ProductThumbnail';
import { ProductSpec } from '@/shared/components/molecules/ProductSpec/ProductSpec';
import { ProductCompareButton } from '@/shared/components/molecules/ProductCompareButton/ProductCompareButton';
import { ProductQuick } from '@/shared/components/molecules/ProductQuick/ProductQuick';
import { ProductDetails } from '@/shared/components/molecules/ProductDetails/ProductDetails';
import type { ProductOptionThumbnail } from '@/shared/components/molecules/ProductOptionList/ProductOptionList';
import type { ProductCardVariant } from '@/shared/components/molecules/ProductCard/productCardTypography';

const root = cva({
  base: {
    minW: '0',
    position: 'relative',
    gap: '4',
    _hover: {
      '& [data-product-thumbnail-hover-image]': { opacity: '1' },
      '& [data-product-quick]': { display: 'grid' },
    },
    _focusWithin: {
      '& [data-product-thumbnail-hover-image]': { opacity: '1' },
      '& [data-product-quick]': { display: 'grid' },
    },
    _mobile: {
      gap: '2.5',
      '& [data-product-quick]': { display: 'none' },
    },
  },
  variants: {
    variant: {
      listing: {},
      showcase: {
        w: '100%',
        flex: '0 0 auto',
        '& .image': {
          h: 'auto',
          aspectRatio: '1',
          bg: 'var(--color-surface-subtle)',
          fontSize: '0',
        },
        _mobile: {
          w: '160px',
          '& .image': { h: '160px', aspectRatio: 'auto' },
        },
      },
    },
  },
  defaultVariants: { variant: 'listing' },
});

const action = css({
  position: 'absolute',
  right: '4',
  top: '4',
  zIndex: '2',
  _mobile: {
    right: '2.5',
    top: '2.5',
  },
});

const launchStatus = css({ position: 'absolute', bottom: '2', left: '2', zIndex: '1' });

const productFooter = css({ display: 'flex', flexDirection: 'column', gap: '2' });

const productWidthCount = (product: Product) => {
  const widths = product.colorOptions?.flatMap((colorOption) =>
    colorOption.widths.map((width) => width.label),
  );

  return new Set(widths?.length ? widths : [product.width]).size;
};

const productOptionThumbnails = (product: Product): ProductOptionThumbnail[] =>
  product.colors.map((color) => ({ id: color, image: product.primaryImage, label: color }));

const activityLabel = (use: Product['use']) => {
  if (use === 'Everyday Run') return '데일리 러닝';
  if (use === 'Trail Running') return '트레일 러닝';
  return '워킹';
};

export type ProductCardOption =
  'promotion' | 'launch-status' | 'like' | 'quick' | 'colors' | 'specifications' | 'compare';

export type ProductCardProps = {
  options?: readonly ProductCardOption[];
  product: Product;
  quick?: boolean;
  variant?: ProductCardVariant;
  compareSelected?: boolean;
  onCompare?: (product: Product) => void;
};

export function ProductCard({
  options = [],
  product,
  quick = false,
  variant = 'listing',
  compareSelected = false,
  onCompare,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const platform = usePlatform();
  const hasOption = (option: ProductCardOption) => options.includes(option);

  return (
    <Card className={root({ variant })}>
      <Card.Header>
        <Link to={`/products/${product.id}`}>
          <ProductThumbnail
            alt={product.name}
            hover
            hoverImage={product.hoverImage}
            lazy
            src={product.primaryImage}
          >
            {hasOption('launch-status') && (
              <BadgeLaunchStatus className={launchStatus} status={product.launchStatus} />
            )}
            {hasOption('quick') && quick && <ProductQuick />}
          </ProductThumbnail>
        </Link>
      </Card.Header>

      {hasOption('like') && (
        <Card.Action className={action}>
          <Wishlist
            active={liked}
            ariaLabel={`${product.name} 관심상품`}
            onActiveChange={setLiked}
          />
        </Card.Action>
      )}

      <ProductDetails
        activities={[activityLabel(product.use)]}
        colorCount={product.colors.length}
        gender={product.gender}
        name={product.name}
        optionThumbnails={productOptionThumbnails(product)}
        platform={platform}
        price={product.price}
        promotion={hasOption('promotion') ? product.promotion : undefined}
        showVariantSummary={hasOption('colors')}
        variant={variant}
        widthCount={productWidthCount(product)}
      />

      {(hasOption('specifications') || (hasOption('compare') && onCompare)) && (
        <Card.Footer className={productFooter}>
          {hasOption('specifications') && (
            <ProductSpec
              cushioning={product.cushioning}
              stability={product.stability}
              width={product.width}
            />
          )}
          {hasOption('compare') && onCompare && (
            <ProductCompareButton onClick={() => onCompare(product)} selected={compareSelected} />
          )}
        </Card.Footer>
      )}
    </Card>
  );
}
