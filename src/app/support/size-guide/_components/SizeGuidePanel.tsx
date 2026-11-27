'use client';

import Image from 'next/image';

import { useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Flex, Grid, Stack } from 'styled-system/jsx';

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
  type Unit,
} from '@/app/support/size-guide/size-guide.data';

const styles = {
  choiceGroup: css({
    display: 'flex',
    alignItems: 'center',
    p: '2px',
    h: '48px',
    borderRadius: '52px',
    bg: 'black.20',
    _mobile: { h: '44px' },
  }),
  choiceButton: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 0',
    minW: '0',
    h: '44px',
    p: '0',
    textStyle: 'ko-common-b6',
    border: '0',
    borderRadius: '52px',
    bg: 'transparent',
    color: 'black.100',
    cursor: 'pointer',
    '&[aria-pressed=true]': { bg: 'black.100', color: 'white' },
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '-2px' },
    _mobile: { h: '40px' },
  }),
  chartHeader: css({ minH: '36px', _mobile: { minH: '32px' } }),
  chart: css({
    '&&': {
      fontSize: 'body.13',
      lineHeight: 'body',
      textAlign: 'center',
      '& th, & td': { h: '46px', px: '1' },
      '& thead th': { bg: 'black.10', fontSize: 'body.13', fontWeight: 'medium' },
    },
  }),
};

const sectionTitle = { web: 'h10', mo: 'h8' } as const;

const unitOptions = [
  { value: 'cm', label: 'cm' },
  { value: 'inch', label: 'inch' },
] as const;

function SizeGuideChoiceGroup<T extends string>({
  label,
  options,
  value,
  onValueChange,
}: {
  label: string;
  options: readonly SegmentedControlOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
}) {
  const single = options.length === 1;

  return (
    <ContentSection
      title={label}
      headerProps={{ titleProps: sectionTitle }}
      gap="4"
      w={single ? { base: '164px', _mobile: '117px' } : '100%'}
    >
      <SegmentedControl
        ariaLabel={label}
        className={styles.choiceGroup}
        itemClassName={() => styles.choiceButton}
        options={options}
        value={value}
        onValueChange={onValueChange}
        unstyled
      />
    </ContentSection>
  );
}

function SizeGuideMeasurements({ category, gender }: { category: GuideCategory; gender: Gender }) {
  const { label, measurement } = category;
  if (!measurement) return null;

  const image =
    gender === 'women' ? (measurement.womenImage ?? measurement.image) : measurement.image;

  return (
    <ContentSection
      title="측정 방법 안내"
      headerProps={{
        titleProps: sectionTitle,
        description: '측정한 치수를 사이즈표와 비교해 가장 알맞은 사이즈를 선택해 주세요.',
        descriptionProps: { web: 'b4', mo: 'b6' },
        gap: { base: '3', _mobile: '2' },
      }}
      gap={{ base: '6', _mobile: '4' }}
    >
      <Grid
        gridTemplateColumns={{ base: '288px minmax(0, 1fr)', _mobile: 'minmax(0, 1fr)' }}
        gap={{ base: '10', _mobile: '6' }}
        alignItems="start"
      >
        <Box pos="relative" w="100%" aspectRatio="4 / 3" bg="#E0E0E0">
          <Image
            src={`/images/size-guide/${image}.png`}
            alt={`${label} 치수 측정 위치`}
            fill
            sizes="(max-width: 1024px) calc(100vw - 32px), 288px"
            className={css({ objectFit: 'contain' })}
          />
        </Box>
        <Stack as="ol" gap="4" listStyleType="none" role="list" m="0" p="0">
          {measurement.steps.map((step, index) => (
            <Stack as="li" key={step} gap="2">
              <Flex gap="1">
                <Typography variant="b4B" language="en">
                  {index + 1}.
                </Typography>
                <Typography variant="b4B">{measurement.stepTitles[index]}</Typography>
              </Flex>
              <Typography as="p" variant="b6">
                {step}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Grid>
    </ContentSection>
  );
}

function SizeGuideChart({
  category,
  gender,
  unit,
  onUnitChange,
}: {
  category: GuideCategory;
  gender: Gender;
  unit: Unit;
  onUnitChange: (unit: Unit) => void;
}) {
  const chart = category.charts[gender]?.[unit];
  const genderLabel = genderOptions.find((item) => item.value === gender)?.label;
  const title = category.chartTitle ?? `${genderLabel} ${category.label} 사이즈 차트`;

  return (
    <ContentSection
      title={title}
      gap="4"
      headerProps={{
        titleProps: sectionTitle,
        orientation: 'horizontal',
        gap: '2',
        className: styles.chartHeader,
        action:
          category.units.length > 1 ? (
            <SegmentedControl
              ariaLabel="측정 단위"
              variant="compactPill"
              options={unitOptions.filter(({ value }) => category.units.includes(value))}
              value={unit}
              onValueChange={onUnitChange}
            />
          ) : undefined,
      }}
    >
      {chart ? (
        <DataTable
          caption={category.units.length > 1 ? `${title} (${unit.toUpperCase()})` : title}
          variant="striped"
          className={styles.chart}
        >
          <thead>
            <tr>
              {chart.headers.map((label) => (
                <th key={label} scope="col">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, column) =>
                  column === 0 ? (
                    <th key={column} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={column}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </DataTable>
      ) : (
        <Typography variant="b6" tone="subtle">
          해당 단위의 사이즈표는 준비 중입니다.
        </Typography>
      )}
    </ContentSection>
  );
}

/** 카테고리와 성별에 맞는 사이즈표와 측정 안내를 표시합니다. (Displays the chart and measurement guide for the selected category and gender.) */
export function SizeGuidePanel({
  categories,
}: {
  categories: readonly [GuideCategory, ...GuideCategory[]];
}) {
  const [categoryValue, setCategoryValue] = useState(categories[0].value);
  const category = categories.find(({ value }) => value === categoryValue) ?? categories[0];
  const [gender, setGender] = useState<Gender>(category.genders[0]);
  const [unit, setUnit] = useState<Unit>(category.units[0]);

  return (
    <Stack gap="10" pt={{ base: '10', _mobile: '14' }} pb={{ _mobile: '6' }}>
      <Grid
        gridTemplateColumns={{
          base: 'repeat(2, minmax(0, 342px))',
          _mobile: 'minmax(0, 1fr)',
        }}
        gap="10"
      >
        <SizeGuideChoiceGroup
          label="카테고리 선택"
          options={categories}
          value={category.value}
          onValueChange={(value) => {
            const next = categories.find((option) => option.value === value);
            if (!next || next.value === category.value) return;

            setCategoryValue(next.value);
            setGender(next.genders[0]);
            setUnit(next.units[0]);
          }}
        />
        <SizeGuideChoiceGroup
          label="성별 선택"
          options={genderOptions.filter(({ value }) => category.genders.includes(value))}
          value={gender}
          onValueChange={setGender}
        />
      </Grid>
      <SizeGuideChart category={category} gender={gender} unit={unit} onUnitChange={setUnit} />
      <SizeGuideMeasurements category={category} gender={gender} />
    </Stack>
  );
}
