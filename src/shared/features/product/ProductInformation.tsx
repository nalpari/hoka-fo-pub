'use client';

import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import { css } from 'styled-system/css';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Stack } from 'styled-system/jsx';
import { DescriptionList } from '@/shared/components/atoms/DescriptionList/DescriptionList';

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
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <ContentSection
      as="section"
      gap="4"
      px="8"
      py="8"
      bg="var(--color-black-10)"
      _mobile={{ px: '4' }}
      id={id}
      title={title}
      headerProps={{
        titleAs: 'h2',
        titleProps: { variant: 'productSectionTitle', mo: 'heading8' },
      }}
    >
      <Stack gap="8">
        <Stack gap="3" alignItems="start">
          <Stack id={contentId} gap="4" w="100%">
            {description && (
              <ContentHeader
                gap="3"
                titleAs="h3"
                title={<>{description.title}</>}
                titleProps={{ variant: 'body3', weight: 'bold' }}
                description={<>{description.content}</>}
                descriptionProps={{
                  variant: 'productInformationBody',
                  className: expanded ? undefined : css({ lineClamp: 4 }),
                }}
              />
            )}
            {expanded &&
              features.map((section, index) => (
                <ContentHeader
                  gap="3"
                  key={index}
                  titleAs="h3"
                  title={<>{section.title}</>}
                  titleProps={{ variant: 'body3', weight: 'bold' }}
                  description={<>{section.content}</>}
                  descriptionProps={{ variant: 'productInformationBody' }}
                />
              ))}
          </Stack>
          {description && (
            <Button
              variant="link"
              colorway="black"
              size="md"
              aria-expanded={expanded}
              aria-controls={contentId}
              onClick={() => setExpanded((value) => !value)}
              style={{ '--button-label-weight': '700' } as CSSProperties}
            >
              {expanded ? '닫기' : '더보기'}
            </Button>
          )}
        </Stack>
        <DescriptionList
          items={specifications.map(({ label, value }) => ({ term: label, description: value }))}
          labelWidth="80px"
          termProps={{ variant: 'body3', weight: 'bold' }}
          descriptionProps={{ variant: 'body3', tone: 'primary' }}
          slotStyles={{ root: css.raw({ columnGap: '3', rowGap: '4' }) }}
        />
      </Stack>
    </ContentSection>
  );
}
