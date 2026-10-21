import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Flex, Stack } from 'styled-system/jsx';
import type { ProductWidthOption } from '@/mocks/products';
import { SizeSelector } from '@/shared/components/molecules/SizeSelector/SizeSelector';
import { productSizeOptions } from '@/shared/features/product/productSizeOptions';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { ProductVariantSection } from '@/shared/features/product/ProductVariantSection';
import { FormField } from '@/shared/components/atoms/FormField/FormField';

type ProductSizeSelectorProps = {
  selectedWidth?: ProductWidthOption;
  value: string;
  error: string;
  onValueChange: (size: string) => void;
};

export function ProductSizeSelector({
  selectedWidth,
  value,
  error,
  onValueChange,
}: ProductSizeSelectorProps) {
  return (
    <ProductVariantSection
      action={
        <Flex gap="2" align="center">
          <Icon name="action/fa-ruler-horizontal" size="18px" color="currentColor" />
          <ButtonLink variant="link" size="md" href="/support/size-guide">
            사이즈 가이드
          </ButtonLink>
        </Flex>
      }
      id="product-size"
      title="사이즈"
    >
      <Stack gap="4">
        <FormField htmlFor="product-size-choice" error={error || undefined}>
          <SizeSelector
            mode="single"
            ariaLabel="사이즈 선택"
            columns={5}
            soldOutAppearance="gray"
            onValueChange={onValueChange}
            options={productSizeOptions(selectedWidth)}
            value={value}
          />
        </FormField>
        <Typography as="p" variant="body4" tone="tertiary">
          사이즈 추천: 정사이즈
        </Typography>
      </Stack>
    </ProductVariantSection>
  );
}
