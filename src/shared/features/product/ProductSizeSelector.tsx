import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import type { ProductWidthOption } from '@/mocks/products';
import { SizeSelector } from '@/shared/components/molecules/SizeSelector/SizeSelector';
import { productSizeOptions } from '@/shared/features/product/productSizeOptions';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Button } from '@/shared/components/atoms/Button/Button';
import { ProductVariantSection } from '@/shared/features/product/ProductVariantSection';

const styles = {
  error: css({ mt: '2' }),
  recommendation: css({ mt: '2' }),
};

type ProductSizeSelectorProps = {
  selectedWidth?: ProductWidthOption;
  value: string;
  error: string;
  onValueChange: (size: string) => void;
  onOpenSizeGuide: () => void;
};

export function ProductSizeSelector({
  selectedWidth,
  value,
  error,
  onValueChange,
  onOpenSizeGuide,
}: ProductSizeSelectorProps) {
  return (
    <ProductVariantSection
      action={
        <Flex gap="2" align="center">
          <Icon name="action/fa-ruler-horizontal" size="18px" color="currentColor" />
          <Button variant="link" size="md" onClick={onOpenSizeGuide} type="button">
            사이즈 가이드
          </Button>
        </Flex>
      }
      id="product-size"
      title="사이즈"
    >
      <SizeSelector
        mode="single"
        ariaLabel="사이즈 선택"
        columns={5}
        soldOutAppearance="gray"
        onValueChange={onValueChange}
        options={productSizeOptions(selectedWidth)}
        value={value}
      />
      {error && (
        <Typography as="p" variant="body5" tone="error" className={styles.error} role="alert">
          {error}
        </Typography>
      )}
      <Typography as="p" variant="body5" tone="tertiary" className={styles.recommendation}>
        사이즈 추천: 정사이즈
      </Typography>
    </ProductVariantSection>
  );
}
