'use client';

import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { SupportTabs } from '@/shared/components/molecules/SupportTabs/SupportTabs';
import {
  apparelCareSections,
  shoeCareSections,
  type CareSection,
} from '@/shared/features/care-guide/care.data';
import { supportNavigation } from '@/shared/features/support/support.navigation';

function CareInstructions({ sections }: { sections: readonly CareSection[] }) {
  return (
    <Stack as="ol" gap="4" m="0" px={{ base: '3', _mobile: '2' }} py="4" listStyleType="none">
      {sections.map((section, index) => (
        <ContentSection
          as="li"
          key={section.title}
          gap="2"
          header={
            <HStack alignItems="flex-start" gap="1">
              <Typography as="span" variant="body4">
                {index + 1}.
              </Typography>
              <Typography as="h3" variant="body4">
                {section.title}
              </Typography>
            </HStack>
          }
        >
          <Stack as="ul" gap="0" m="0" pl="3" listStyleType="none">
            {section.items.map((item) => (
              <HStack as="li" key={item} alignItems="flex-start" gap="1">
                <Typography as="span" variant="body4" tone="subtle" aria-hidden="true">
                  ・
                </Typography>
                <Typography variant="body4" tone="subtle">
                  {item}
                </Typography>
              </HStack>
            ))}
          </Stack>
        </ContentSection>
      ))}
    </Stack>
  );
}

const tabs = [
  { value: 'shoes', label: '신발', content: <CareInstructions sections={shoeCareSections} /> },
  {
    value: 'apparel',
    label: '의류/용품',
    content: <CareInstructions sections={apparelCareSections} />,
  },
] as const;

export function CareGuidePage() {
  return (
    <CustomerCenterLayout
      title="세탁 및 손질 방법 안내"
      mobileTitleVariant="heading5"
      activePath="/support/care"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '세탁 및 손질 방법 안내' },
      ]}
      groups={supportNavigation}
    >
      <Stack gap="6">
        <SupportTabs ariaLabel="세탁 및 손질 방법" defaultValue="shoes" tabs={tabs} />
      </Stack>
    </CustomerCenterLayout>
  );
}
