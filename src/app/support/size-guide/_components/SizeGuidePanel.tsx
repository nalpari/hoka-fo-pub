'use client';

import Image from 'next/image';

import { useState } from 'react';

import { css, cva } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

import { DataTable } from '@/components/common/atoms/DataTable';
import {
  SegmentedControl,
  type SegmentedControlOption,
} from '@/components/common/atoms/SegmentedControl';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import {
  type Gender,
  genderOptions,
  type GuideCategory,
  shoeSizes,
  type Unit,
  widthOptions,
} from '@/app/support/size-guide/size-guide.data';

const option = cva({
  base: {
    minW: '80px',
    minH: '36px',
    px: '3',
    border: '1px solid var(--color-black-20)',
    borderRadius: '3px',
    bg: 'white',
    color: 'var(--color-black-80)',
    cursor: 'pointer',
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  },
  variants: {
    selected: {
      true: { bg: 'var(--color-black-100)', color: 'white', borderColor: 'var(--color-black-100)' },
    },
    compact: { true: { minW: '40px', minH: '24px', px: '1', border: '0', borderRadius: '0' } },
  },
});

/** 사이즈 가이드의 선택 항목을 일반 또는 조밀한 버튼으로 표시합니다. (Displays size guide choices as regular or compact buttons.) */
function SizeGuideChoiceGroup<T extends string>({
  label,
  options,
  value,
  onValueChange,
  compact = false,
}: {
  label: string;
  options: readonly SegmentedControlOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  compact?: boolean;
}) {
  const choices = (
    <SegmentedControl
      unstyled
      ariaLabel={label}
      options={options}
      value={value}
      onValueChange={onValueChange}
      className={css({ display: 'flex', flexWrap: 'wrap', gap: compact ? '0' : '3' })}
      itemClassName={(_, selected) => option({ selected, compact })}
      itemRender={({ label }) => (
        <Typography as="button" variant={compact ? 'body5' : 'body4'}>
          {label}
        </Typography>
      )}
    />
  );

  if (compact) return choices;

  return (
    <Stack gap="2">
      <Typography variant="body4" tone="subtle">
        {label}
      </Typography>
      {choices}
    </Stack>
  );
}

function SizeGuideMeasurementImage({
  category,
  gender,
}: {
  category: GuideCategory;
  gender: Gender;
}) {
  const image = category.value === 'tops' && gender === 'women' ? 'tops-women' : category.image;
  const shoes = category.value === 'shoes';

  return (
    <Box
      pos="relative"
      w={{ base: '280px', _mobile: '100%' }}
      h={{ base: shoes || category.value === 'tops' ? '220px' : '280px', _mobile: '240px' }}
    >
      <Image
        src={`/images/size-guide/${image}.png`}
        alt={`${category.label} 치수 측정 위치`}
        fill
        sizes="(max-width: 767px) 100vw, 280px"
        className={css({
          objectFit: 'contain',
          objectPosition: { base: 'left top', _mobile: 'center' },
        })}
      />
    </Box>
  );
}

type SizeGuideMeasurementMethodProps = {
  title: string;
  steps: readonly string[];
  description?: string;
};

function SizeGuideMeasurementMethod({
  title,
  steps,
  description,
}: SizeGuideMeasurementMethodProps) {
  return (
    <Stack gap="2">
      <Typography variant="body3" weight="bold">
        [{title}]
      </Typography>
      <Stack as="ol" gap="1" listStyleType="none" m="0" p="0">
        {steps.map((step, index) => (
          <Typography as="li" key={step} variant="body4">
            STEP {index + 1}. {step}
          </Typography>
        ))}
      </Stack>
      {description && <Typography variant="body4">{description}</Typography>}
    </Stack>
  );
}

const footWidthSteps = [
  '종이 위에 발을 올리고 양 발의 윤곽을 따라 그려 주세요.',
  '발 앞부분의 가장 넓은 지점(엄지발가락과 새끼발가락 아래쪽) 사이의 너비를 측정해 주세요.',
  '양발 중 더 넓은 발을 기준으로 사이즈표와 비교하여 적합한 발볼 옵션을 확인해 주세요.',
] as const;

function SizeGuideMeasurementInstructions({ category }: { category: GuideCategory }) {
  const shoes = category.value === 'shoes';

  return (
    <Stack gap="3">
      <SizeGuideMeasurementMethod
        title={`${shoes ? '발 길이' : category.label} 측정 방법`}
        steps={category.steps}
        description={
          shoes ? undefined : '측정한 치수를 사이즈표와 비교해 가장 알맞은 사이즈를 선택해 주세요.'
        }
      />
      {shoes && <SizeGuideMeasurementMethod title="발볼 너비 측정 방법" steps={footWidthSteps} />}
    </Stack>
  );
}

function SizeGuideMeasurements({ category, gender }: { category: GuideCategory; gender: Gender }) {
  return (
    <Grid
      gridTemplateColumns={{ base: '280px minmax(0, 1fr)', _mobile: '1fr' }}
      gap="6"
      alignItems="start"
    >
      <SizeGuideMeasurementImage category={category} gender={gender} />
      <SizeGuideMeasurementInstructions category={category} />
    </Grid>
  );
}

const unitOptions = [
  { value: 'cm', label: 'CM' },
  { value: 'inch', label: 'INCH' },
] as const;

type SizeGuideChartProps = {
  category: GuideCategory;
  gender: Gender;
  width: string;
  unit: Unit;
  onUnitChange: (unit: Unit) => void;
};

function SizeGuideChart({ category, gender, width, unit, onUnitChange }: SizeGuideChartProps) {
  const shoes = category.value === 'shoes';
  const genderLabel = genderOptions.find((item) => item.value === gender)?.label;
  const widthLabel = widthOptions.find((item) => item.value === width)?.label;
  const caption = `${category.label} ${genderLabel}${shoes ? ` ${widthLabel}` : ''} 사이즈 차트 (${unit === 'cm' ? 'CM' : 'INCH'})`;

  return (
    <ContentSection
      title="사이즈 차트"
      gap="1"
      headerProps={{
        titleAs: 'h3',
        titleProps: { variant: 'body2', weight: 'bold' },
        orientation: 'horizontal',
        gap: '3',
        action: (
          <SizeGuideChoiceGroup
            label="측정 단위"
            options={unitOptions}
            value={unit}
            onValueChange={onUnitChange}
            compact
          />
        ),
      }}
    >
      <DataTable caption={caption} variant="spaced">
        <thead>
          <tr>
            <th scope="col">{shoes ? '한국 (KR)' : '사이즈'}</th>
            {category.measurements.map((label) => (
              <th key={label} scope="col">
                {label} ({unit === 'cm' ? 'CM' : 'INCH'})
              </th>
            ))}
            {shoes && <th scope="col">미국 (US){gender === 'unisex' ? ' 남성 / 여성' : ''}</th>}
          </tr>
        </thead>
        <tbody>
          {shoes
            ? shoeSizes(gender).map((size) => (
                <tr key={size}>
                  <th scope="row">{size}</th>
                  <td>00</td>
                  <td>
                    {gender === 'women' ? (size - 220) / 10 + 5 : (size - 250) / 10 + 7}
                    {gender === 'unisex' ? ` / ${(size - 220) / 10 + 5}` : ''}
                  </td>
                </tr>
              ))
            : category.sizes.map((size) => (
                <tr key={size}>
                  <th scope="row">{size}</th>
                  {category.measurements.map((label) => (
                    <td key={label}>
                      {category.value === 'tops' ||
                      category.value === 'bottoms' ||
                      category.value === 'vest'
                        ? '00'
                        : '00~00'}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </DataTable>
      <Typography variant="body4" tone="subtle">
        00으로 표시된 치수는 준비 중입니다.
      </Typography>
    </ContentSection>
  );
}

/** 사이즈 기준과 측정 안내를 표시합니다 (Displays the size guide panel composition). */
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
