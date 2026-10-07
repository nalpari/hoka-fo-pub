import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import { ProductDetailGallery } from '@/shared/features/product/ProductDetailGallery';
import { ProductDetailSupport } from '@/shared/features/product/ProductDetailSupport';

const root = css({ minW: '0' });

const support = css({ _mobile: { display: 'none' } });

type ProductDetailMediaProps = {
  images: string[];
  productName: string;
};

export function ProductDetailMedia({ images, productName }: ProductDetailMediaProps) {
  return (
    <Flex className={root} direction="column" gap="96px">
      <ProductDetailGallery images={images} productName={productName} />
      <div className={support}>
        <ProductDetailSupport />
      </div>
    </Flex>
  );
}
