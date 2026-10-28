'use client';

import { useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { SizeGuideChoiceGroup } from './SizeGuideChoiceGroup';
import { SizeGuideMeasurements } from './SizeGuideMeasurements';
import { SizeGuideChart } from './SizeGuideChart';
import {
  genderOptions,
  widthOptions,
  type Gender,
  type GuideCategory,
  type Unit,
} from './size-guide.data';

export function SizeGuidePanel({ category }: { category: GuideCategory }) {
  const [gender, setGender] = useState<Gender>('men');
  const [width, setWidth] = useState('regular');
  const [unit, setUnit] = useState<Unit>('cm');
  const shoes = category.value === 'shoes';

  return (
    <ContentSection
      title={category.label}
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'heading7' } }}
      gap="5"
      px={{ base: '8', _mobile: '0' }}
      pt={{ base: '10', _mobile: '6' }}
      pb="8"
      borderBottom="1px solid var(--color-black-20)"
    >
      <SizeGuideMeasurements category={category} gender={gender} />
      <Stack gap="4">
        <SizeGuideChoiceGroup
          label="성별 선택"
          options={genderOptions}
          value={gender}
          onValueChange={setGender}
        />
        {shoes && (
          <SizeGuideChoiceGroup
            label="발볼 선택"
            options={widthOptions}
            value={width}
            onValueChange={setWidth}
          />
        )}
      </Stack>
      <SizeGuideChart
        category={category}
        gender={gender}
        width={width}
        unit={unit}
        onUnitChange={setUnit}
      />
    </ContentSection>
  );
}
