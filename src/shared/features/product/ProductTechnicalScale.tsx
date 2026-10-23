import { Box, Flex } from 'styled-system/jsx';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ProductTechnicalScaleData } from './productDetailPresentation';

/** Static qualitative scale; it is neither an editable Slider nor a numeric Meter. */
export function ProductTechnicalScale({ title, labels, marker }: ProductTechnicalScaleData) {
  return (
    <ContentSection
      title={title}
      headerProps={{ titleAs: 'h3', titleProps: { variant: 'body3', weight: 'bold' } }}
      gap="3"
    >
      <Box h="1px" bg="var(--color-black-20)" pos="relative">
        <Box
          pos="absolute"
          bottom="0"
          left={marker === 'end' ? '70%' : marker === 'start' ? '0' : '35%'}
          w="30%"
          h="8px"
          borderRadius="50%"
          bg="linear-gradient(90deg, transparent, var(--color-black-100), transparent)"
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
