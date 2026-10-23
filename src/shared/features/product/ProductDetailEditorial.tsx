import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import type { ProductEditorialFeature } from './productDetailPresentation';

export function ProductDetailEditorial({
  features,
}: {
  features: readonly ProductEditorialFeature[];
}) {
  return (
    <ContentSection
      title="Why you’ll love it"
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'heading7' } }}
      gap="6"
    >
      <Grid gridTemplateColumns="repeat(3, minmax(0, 1fr))" gap="4">
        {features.map((feature) => (
          <Stack as="article" key={feature.title} gap="4">
            <img
              src={feature.image}
              alt={feature.title}
              width={328}
              height={411}
              loading="lazy"
              className={css({ display: 'block', w: '100%', h: 'auto' })}
            />
            <ContentHeader
              title={feature.title}
              titleAs="h3"
              titleProps={{ variant: 'heading9' }}
              description={feature.description}
              descriptionProps={{ variant: 'body4' }}
              gap="2"
            />
          </Stack>
        ))}
      </Grid>
    </ContentSection>
  );
}
