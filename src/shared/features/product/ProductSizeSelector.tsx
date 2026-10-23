import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Flex } from 'styled-system/jsx';
import type { ProductWidthOption } from '@/mocks/products';
import { ProductSizeSelector as SizeSelector } from '@/shared/components/molecules/ProductOptionSelectors/ProductSizeSelector';
import { productSizeOptions } from '@/shared/features/product/productSizeOptions';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';

type ProductSizeSelectorProps = {
  selectedWidth?: ProductWidthOption;
  value: string;
  error: string;
  onValueChange: (size: string) => void;
};

/** 상품 재고 선택지와 사이즈 가이드·오류 안내를 조합합니다. (Composes product availability, size guidance, and validation feedback.) */
export function ProductSizeSelector({
  selectedWidth,
  value,
  error,
  onValueChange,
}: ProductSizeSelectorProps) {
  return (
    <SizeSelector
      action={
        <Flex gap="2" align="center">
          <Icon name="action/fa-ruler-horizontal" size="18px" color="currentColor" />
          <ButtonLink variant="link" size="md" href="/support/size-guide">
            사이즈 가이드
          </ButtonLink>
        </Flex>
      }
      id="product-size"
      fieldId="product-size-choice"
      error={error}
      options={productSizeOptions(selectedWidth)}
      value={value}
      onValueChange={onValueChange}
      description={
        <Typography as="p" variant="body4" tone="tertiary">
          사이즈 추천: 정사이즈
        </Typography>
      }
    />
  );
}
