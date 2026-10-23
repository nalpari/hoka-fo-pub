import { Box, Flex } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ProductTechnicalScaleData } from './productDetailPresentation';
import { ProductSpecificationHelp } from './ProductSpecificationHelp';

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
      <Box h="8px" bg="#F5F5F5" pos="relative" aria-hidden="true">
        <Box
          pos="absolute"
          insetY="0"
          style={{ left: `${(level - 1) * 20}%` }}
          w="20%"
          bg={
            level === 1
              ? 'linear-gradient(90deg, #000000 0%, #F5F5F5 100%)'
              : level === 5
                ? 'linear-gradient(90deg, #F5F5F5 0%, #000000 100%)'
                : 'linear-gradient(90deg, #F5F5F5 0%, #000000 50%, #F5F5F5 100%)'
          }
        />
      </Box>
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
