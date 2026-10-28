import { Grid, Stack } from 'styled-system/jsx';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { ProductDetailSpecificationList } from './ProductDetailSpecificationList';
import { ProductTechnicalScale } from './ProductTechnicalScale';
import type {
  ProductDetailSpecification,
  ProductTechnicalScaleData,
} from './productDetailPresentation';

type Props = {
  specifications: readonly ProductDetailSpecification[];
  attributes: readonly ProductDetailSpecification[];
  scales: readonly ProductTechnicalScaleData[];
};

export function ProductTechSpecs({ specifications, attributes, scales }: Props) {
  return (
    <ContentSection
      title="Tech Specs"
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'heading7' } }}
      gap="8"
    >
      <Grid gridTemplateColumns="minmax(0, 1fr) minmax(0, 2fr)" gap="10">
        <ProductDetailSpecificationList items={specifications} gap="8" />
        <Stack gap="8">
          {scales.length > 0 ? (
            scales.map((scale) => <ProductTechnicalScale key={scale.title} {...scale} />)
          ) : (
            <ProductDetailSpecificationList items={attributes} gap="4" />
          )}
        </Stack>
      </Grid>
    </ContentSection>
  );
}
