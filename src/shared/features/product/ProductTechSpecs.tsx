import { Box, Flex, Grid, Stack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const scales = [
  { title: '쿠셔닝', labels: ['반응성', '균형잡힌', '부드러움'] },
  { title: '안정성', labels: ['중립', '안정적', '높은 안정성'] },
  { title: '반발력', labels: ['자연스러운', '균형잡힌 쿠션', '강력한 추진'] },
];

/** Clifton publishing specifications transcribed from the supplied WEB design. */
export function ProductTechSpecs({ product }: { product: Product }) {
  const isClifton = product.styleCode === 'HOKADFG34S';

  return (
    <ContentSection
      title="Tech Specs"
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'heading7' } }}
      gap="8"
    >
      <Grid gridTemplateColumns="minmax(0, 1fr) minmax(0, 2fr)" gap="10">
        <Stack as="dl" gap="8">
          <Stack gap="2">
            <Typography as="dt" variant="body3" weight="bold">
              {isClifton ? '무게' : '용도'}
            </Typography>
            <Typography as="dd" variant="body3">
              {isClifton ? '312g' : product.runningType}
            </Typography>
          </Stack>
          <Stack gap="2">
            <Typography as="dt" variant="body3" weight="bold">
              {isClifton ? 'Heel-to-Toe Drop' : '발볼'}
            </Typography>
            <Typography as="dd" variant="body3">
              {isClifton ? '43/38mm (5mm)' : product.width}
            </Typography>
          </Stack>
        </Stack>
        <Stack gap="8">
          {isClifton ? (
            scales.map((scale, index) => (
              <Stack key={scale.title} gap="3">
                <Typography as="h3" variant="body3" weight="bold">
                  {scale.title}
                </Typography>
                <Box h="1px" bg="var(--color-black-20)" position="relative">
                  <Box
                    position="absolute"
                    bottom="0"
                    left={index === 0 ? '70%' : index === 1 ? '0' : '35%'}
                    w="30%"
                    h="8px"
                    borderRadius="50%"
                    bg="linear-gradient(90deg, transparent, var(--color-black-100), transparent)"
                  />
                </Box>
                <Flex justifyContent="space-between" gap="2">
                  {scale.labels.map((label) => (
                    <Typography key={label} variant="body5">
                      {label}
                    </Typography>
                  ))}
                </Flex>
              </Stack>
            ))
          ) : (
            <Stack as="dl" gap="4">
              {[
                { label: '쿠셔닝', value: product.cushioning },
                { label: '안정성', value: product.stability },
              ].map((specification) => (
                <Stack key={specification.label} gap="2">
                  <Typography as="dt" variant="body3" weight="bold">
                    {specification.label}
                  </Typography>
                  <Typography as="dd" variant="body3">
                    {specification.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </Grid>
    </ContentSection>
  );
}
