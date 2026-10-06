import { useState } from 'react';
import type { Product } from '@/mocks/products';
import { css, cva } from 'styled-system/css';
import { usePlatform } from '@/shared/context/platform';
import { Card } from '@/shared/components/atoms/Card/Card';
import { Wishlist } from '@/shared/components/atoms/Wishlist/Wishlist';
import { ProductCardFooter } from '@/shared/components/molecules/ProductCard/ProductCardFooter';
import { ProductCardHeader } from '@/shared/components/molecules/ProductCard/ProductCardHeader';
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
    },
    _focusWithin: {
      '& [data-product-thumbnail-hover-image]': { opacity: '1' },
    },
    _mobile: { gap: '2.5' },
  },
  variants: {
    variant: {
      listing: {},
      showcase: {
        w: '100%',
        flex: '0 0 auto',
        _mobile: {
          w: '160px',
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
  'promotion' | 'like' | 'colors' | 'specifications';

export type ProductCardProps = {
  options?: readonly ProductCardOption[];
  product: Product;
  variant?: ProductCardVariant;
};

export function ProductCard({
  options = [],
  product,
  variant = 'listing',
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const platform = usePlatform();
  const hasOption = (option: ProductCardOption) => options.includes(option);

  return (
    <Card className={root({ variant })}>
      <ProductCardHeader product={product} variant={variant} />

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

      <ProductCardFooter
        product={product}
        showSpecifications={hasOption('specifications')}
      />
    </Card>
  );
}
