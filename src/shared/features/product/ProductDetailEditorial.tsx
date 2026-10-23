import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const features = [
  {
    image: 'feature-upper.png',
    title: '프리미엄 어퍼',
    description: '편안한 착화감과 통기성을 위한 어퍼.',
  },
  {
    image: 'feature-detail.png',
    title: '더 정제된 디테일',
    description: '매일의 러닝을 위한 세심한 디테일.',
  },
  {
    image: 'feature-cushioning.png',
    title: '더 부드러운 착화감',
    description: '발을 편안하게 감싸는 쿠셔닝.',
  },
];

export function ProductDetailEditorial() {
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
              src={`/images/products/clifton-11-gtx/${feature.image}`}
              alt={feature.title}
              width={328}
              height={411}
              loading="lazy"
              className={css({ display: 'block', w: '100%', h: 'auto' })}
            />
            <Stack gap="2">
              <Typography as="h3" variant="heading9">
                {feature.title}
              </Typography>
              <Typography as="p" variant="body4">
                {feature.description}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Grid>
    </ContentSection>
  );
}
