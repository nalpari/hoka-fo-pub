import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { CareSection } from './care.data';

/** 제품 관리 안내를 섹션별로 표시합니다 (Displays the care instructions composition). */
export function CareInstructions({ sections }: { sections: readonly CareSection[] }) {
  return (
    <Stack as="ol" gap="4" m="0" px={{ base: '3', _mobile: '2' }} py="4" listStyleType="none">
      {sections.map((section, index) => (
        <ContentSection
          as="li"
          key={section.title}
          gap="2"
          title={`${index + 1}. ${section.title}`}
          headerProps={{ titleAs: 'h3', titleProps: { variant: 'body4' } }}
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
