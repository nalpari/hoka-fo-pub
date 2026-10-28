import { Flex } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { ProductTechnicalScaleData } from './productDetailPresentation';
import { ProductSpecificationHelp } from './ProductSpecificationHelp';
import { ProductTechnicalScaleBar } from './ProductTechnicalScaleBar';

/** Static qualitative scale; it is neither an editable Slider nor a numeric Meter. */
export function ProductTechnicalScale({ title, labels, level, help }: ProductTechnicalScaleData) {
  return (
    <ContentSection
      title={title}
      headerProps={{
        titleAs: 'h3',
        titleProps: { variant: 'body3', weight: 'bold' },
        orientation: 'horizontal',
        gap: '2',
        css: css.raw({ justifyContent: 'flex-start' }),
        action: help ? <ProductSpecificationHelp label={title} description={help} /> : undefined,
      }}
      gap="3"
    >
      <ProductTechnicalScaleBar level={level} />
      <Flex justifyContent="space-between" gap="2">
        {labels.map((label) => (
          <Typography key={label} variant="body5">
            {label}
          </Typography>
        ))}
      </Flex>
    </ContentSection>
  );
}
