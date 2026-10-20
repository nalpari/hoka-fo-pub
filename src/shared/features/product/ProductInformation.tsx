import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Fragment, type ReactNode } from 'react';
import { Grid } from 'styled-system/jsx';

export type ProductInformationProps = {
  id?: string;
  title?: string;
  sections: readonly { title: string; content: ReactNode }[];
  specifications: readonly { label: string; value: ReactNode }[];
};

/** Product description sections and a semantic specification list. */
export function ProductInformation({
  id,
  title = '상품 정보',
  sections,
  specifications,
}: ProductInformationProps) {
  const [description, ...features] = sections;

  return (
    <ContentSection
      as="section"
      gap="10"
      px="8"
      py="8"
      bg="var(--color-black-10)"
      _mobile={{ px: '4' }}
      id={id}
      header={
        <ContentSection
          gap="6"
          title={<>{title}</>}
          headerProps={{ titleAs: 'h2', titleProps: { variant: 'heading8' } }}
        >
          {description && (
            <ContentHeader
              gap="6"
              titleAs="h3"
              title={<>{description.title}</>}
              titleProps={{ variant: 'heading9' }}
              description={<>{description.content}</>}
              descriptionProps={{ variant: 'body3' }}
            />
          )}
        </ContentSection>
      }
      footer={
        <Button variant="link" colorway="black" size="md">
          더 보기
        </Button>
      }
    >
      {features.map((section, index) => (
        <ContentHeader
          gap="6"
          key={index}
          titleAs="h3"
          title={<>{section.title}</>}
          titleProps={{ variant: 'heading9' }}
          description={<>{section.content}</>}
          descriptionProps={{ variant: 'body3' }}
        />
      ))}
      <Grid as="dl" gridTemplateColumns="26.6% 1fr" columnGap="3" rowGap="6">
        {specifications.map((specification, index) => (
          <Fragment key={index}>
            <Typography as="dt" variant="cta1">
              {specification.label}
            </Typography>
            <Typography as="dd" variant="body4">
              {specification.value}
            </Typography>
          </Fragment>
        ))}
      </Grid>
    </ContentSection>
  );
}
