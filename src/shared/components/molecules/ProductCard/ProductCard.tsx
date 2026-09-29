import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/mocks/products';
import { css } from 'styled-system/css';
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

const root = css({
  minW: '0',
  position: 'relative',
  gap: '16px',
  _hover: {
    '& [data-product-thumbnail-hover-image]': { opacity: '1' },
    '& [data-product-quick]': { display: 'grid' },
  },
  _focusWithin: {
    '& [data-product-thumbnail-hover-image]': { opacity: '1' },
    '& [data-product-quick]': { display: 'grid' },
  },
  _mobile: {
    gap: '10px',
    '& [data-product-quick]': { display: 'none' },
  },
});

const action = css({
  position: 'absolute',
  right: '16px',
  top: '16px',
  zIndex: '2',
  _mobile: {
    right: '10px',
    top: '10px',
  },
});

const launchStatus = css({ position: 'absolute', bottom: '8px', left: '8px', zIndex: '1' });

const productFooter = css({ display: 'flex', flexDirection: 'column', gap: '8px' });

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
    <Card className={root}>
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
