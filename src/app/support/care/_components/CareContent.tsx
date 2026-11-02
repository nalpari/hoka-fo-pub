import { Flex, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import {
  apparelCareIntroduction,
  apparelCareSections,
  shoeCareOverview,
  shoeCareSections,
} from '@/components/care-guide/care.data';
import { CareInstructions } from '@/components/care-guide/CareInstructions';

/** 세탁 안내의 소개와 분류별 관리 지침을 표시합니다. (Displays the introduction and category-specific care instructions.) */
export function CareContent({ category }: { category: 'shoes' | 'apparel' }) {
  const shoes = category === 'shoes';
  return (
    <Stack
      gap={shoes ? '8' : '10px'}
      px="2"
      pt={shoes ? '4' : '0'}
      _mobile={{ pt: '4', gap: '10' }}
    >
      <ContentSection
        title={
          shoes ? '신발 착화 및 손질에 대한 올바른 방법' : '의류 및 용품 손질에 대한 올바른 방법'
        }
        gap={shoes ? { base: '4', _mobile: '10px' } : '10px'}
        headerProps={{ titleAs: 'h2', titleProps: { variant: 'heading10', weight: 'semibold' } }}
      >
        {shoes ? (
          <Flex gap="10" _mobile={{ direction: 'column', gap: '10px' }}>
            {shoeCareOverview.map((column, index) => (
              <Stack as="ul" key={index} gap="1" m="0" p="0" listStyleType="none">
                {column.map((item) => (
                  <li key={item}>
                    <Typography variant="body4" tone="subtle">
                      - {item}
                    </Typography>
                  </li>
                ))}
              </Stack>
            ))}
          </Flex>
        ) : (
          <Typography web="body5" mo="body4">
            {apparelCareIntroduction[0]}
            <br />
            {apparelCareIntroduction[1]}
          </Typography>
        )}
      </ContentSection>
      {shoes ? (
        <ContentSection
          title="신발 손질 및 관리 방법"
          gap="10px"
          headerProps={{ titleAs: 'h2', titleProps: { variant: 'heading10', weight: 'semibold' } }}
        >
          <CareInstructions sections={shoeCareSections} variant="care" />
        </ContentSection>
      ) : (
        <CareInstructions sections={apparelCareSections} variant="care" />
      )}
    </Stack>
  );
}
