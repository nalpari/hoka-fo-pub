'use client';

import Image from 'next/image';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

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
  type Unit,
} from '@/app/support/size-guide/size-guide.data';

const option = cva({
  base: {
    minH: '37px',
    px: '4',
    border: '0',
    borderRadius: '30px',
    bg: 'black.20',
    color: 'black.100',
    cursor: 'pointer',
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  },
  variants: {
    grouped: {
      true: {
        h: '44px',
        minH: '44px',
        px: '10',
        _mobile: { h: '40px', minH: '40px', w: '64px', px: '0' },
      },
    },
    selected: {
      true: { bg: 'var(--color-black-100)', color: 'white', borderColor: 'var(--color-black-100)' },
    },
    compact: {
      true: {
        flex: '1',
        minH: '44px',
        px: '4',
        borderBottom: '1px solid token(colors.black.40)',
        borderRadius: '0',
        bg: 'transparent',
        color: 'black.100',
        _mobile: { minH: '36.8px' },
        '&[aria-pressed=true]': {
          bg: 'transparent',
          color: 'black.100',
          borderBottom: '2px solid black',
        },
      },
    },
  },
  compoundVariants: [{ grouped: true, selected: true, css: { _mobile: { w: 'auto', px: '5' } } }],
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
  const platform = usePlatform();
  const grouped = !compact;
  const choices = (
    <SegmentedControl
      unstyled
      ariaLabel={label}
      options={options}
      value={value}
      onValueChange={onValueChange}
      className={css({
        display: 'flex',
        flexWrap: 'nowrap',
        gap: '0',
        w: compact ? '270px' : 'fit-content',
        p: grouped ? '1' : '0',
        bg: grouped ? 'black.20' : undefined,
        borderRadius: grouped ? '52px' : undefined,
        _mobile: {
          p: grouped ? '0.5' : '0',
          w: 'fit-content',
        },
      })}
      itemClassName={(_, selected) =>
        option({
          selected,
          compact,
          grouped,
        })
      }
      itemRender={({ label, value: optionValue }) => (
        <Typography
          as="button"
          variant={compact ? 'body3' : 'body4'}
          weight={grouped && optionValue === value ? 'semibold' : 'regular'}
        >
          {label}
        </Typography>
      )}
    />
  );

  if (compact) return choices;

  return (
    <Stack gap="4">
      <Typography web="heading8" mo="heading6" weight={platform === 'mobile' ? 'bold' : 'black'}>
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
  return (
    <Box pos="relative" w="100%" h={{ base: '422px', _mobile: '274px' }} bg="#E0E0E0">
      <Image
        src={`/images/size-guide/${image}.png`}
        alt={`${category.label} 치수 측정 위치`}
        fill
        sizes="(max-width: 1024px) calc(100vw - 32px), 844px"
        className={css({
          objectFit: 'contain',
          objectPosition: 'center',
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
  const platform = usePlatform();
  return (
    <ContentSection
      as="div"
      title={title}
      headerProps={{
        titleAs: 'h3',
        titleProps: {
          web: 'heading8',
          mo: 'heading6',
          weight: platform === 'mobile' ? 'bold' : 'black',
          className: css({ pl: { base: '2', _mobile: '0' } }),
        },
      }}
      gap="2"
      bg="black.10"
      px={{ base: '5', _mobile: '3' }}
      py={{ base: '8', _mobile: '6' }}
      flex="1"
    >
      <Stack as="ol" gap="0" listStyleType="none" m="0" p="0">
        {steps.map((step, index) => (
          <Stack
            as="li"
            key={step}
            gap="3"
            py="4"
            px={{ base: '3', _mobile: '0' }}
            borderBottom={index < steps.length - 1 ? '1px solid token(colors.black.20)' : undefined}
          >
            <Typography web="heading9" mo="heading10" weight="bold">
              STEP {index + 1}.
            </Typography>
            <Typography web="body3" mo="body5">
              {step}
            </Typography>
          </Stack>
        ))}
      </Stack>
      {description && (
        <Typography web="body3" mo="body5" tone="subtle">
          * {description}
        </Typography>
      )}
    </ContentSection>
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
    <Stack
      gap="4"
      flexDirection={{ base: shoes ? 'row' : 'column', _mobile: 'column' }}
      alignItems="stretch"
    >
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
    <Grid gridTemplateColumns="minmax(0, 1fr)" gap={{ base: '6', _mobile: '8' }} alignItems="start">
      <SizeGuideMeasurementImage category={category} gender={gender} />
      <SizeGuideMeasurementInstructions category={category} />
    </Grid>
  );
}

const unitOptions = [
  { value: 'cm', label: 'cm' },
  { value: 'inch', label: 'inch' },
] as const;

type SizeGuideChartProps = {
  category: GuideCategory;
  gender: Gender;
  unit: Unit;
  onUnitChange: (unit: Unit) => void;
};

function SizeGuideChart({ category, gender, unit, onUnitChange }: SizeGuideChartProps) {
  const platform = usePlatform();
  const chart = category.charts[gender]?.[unit];
  const shoes = category.value === 'shoes';
  const genderLabel = genderOptions.find((item) => item.value === gender)?.label;
  const caption = `${category.label} ${genderLabel} 사이즈 차트 (${unit === 'cm' ? 'CM' : 'INCH'})`;

  return (
    <ContentSection
      title="사이즈 차트"
      gap="4"
      headerProps={{
        titleAs: 'h3',
        titleProps: {
          web: 'heading8',
          mo: 'heading6',
          weight: platform === 'mobile' ? 'bold' : 'black',
        },
        orientation: 'horizontal',
        gap: '3',
        action:
          category.units.length > 1 ? (
            <SizeGuideChoiceGroup
              label="측정 단위"
              options={unitOptions.filter(({ value }) => category.units.includes(value))}
              value={unit}
              onValueChange={onUnitChange}
              compact
            />
          ) : undefined,
      }}
    >
      {chart ? (
        <DataTable caption={caption} variant="striped" density={shoes ? 'regular' : 'compact'}>
          <thead>
            <tr>
              {chart.headers.map((label, index) => (
                <th key={index} scope="col">
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
        <Typography variant="body4" tone="subtle">
          해당 단위의 사이즈표는 준비 중입니다.
        </Typography>
      )}
    </ContentSection>
  );
}

/** 사이즈 기준과 측정 안내를 표시합니다 (Displays the size guide panel composition). */
export function SizeGuidePanel({ category }: { category: GuideCategory }) {
  const platform = usePlatform();
  const [gender, setGender] = useState<Gender>(category.genders[0]);
  const [unit, setUnit] = useState<Unit>('cm');
  const genderSelection = (
    <SizeGuideChoiceGroup
      label="성별 선택"
      options={genderOptions.filter(({ value }) => category.genders.includes(value))}
      value={gender}
      onValueChange={setGender}
    />
  );

  return (
    <ContentSection
      {...(platform === 'mobile'
        ? { header: null }
        : {
            title: category.label,
            headerProps: { titleAs: 'h2' as const, titleProps: { variant: 'heading7' as const } },
          })}
      gap="8"
      pt={{ base: '8', _mobile: '9' }}
      pb="0"
    >
      <Stack gap={{ base: '14', _mobile: '8' }}>
        <SizeGuideMeasurements category={category} gender={gender} />
        <Stack gap="6">
          {genderSelection}
          <SizeGuideChart category={category} gender={gender} unit={unit} onUnitChange={setUnit} />
        </Stack>
      </Stack>
    </ContentSection>
  );
}
