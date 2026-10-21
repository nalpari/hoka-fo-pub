'use client';

import { useState } from 'react';
import { cva, css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { DataTable } from '@/shared/components/atoms/DataTable/DataTable';
import { SegmentedControl } from '@/shared/components/atoms/SegmentedControl/SegmentedControl';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SizeGuideMeasurements } from './SizeGuideMeasurements';
import {
  genderOptions,
  shoeSizes,
  widthOptions,
  type Gender,
  type GuideCategory,
  type Unit,
} from './size-guide.data';

const option = cva({
  base: {
    minW: '80px',
    minH: '36px',
    px: '3',
    border: '1px solid var(--color-black-20)',
    borderRadius: '3px',
    bg: 'white',
    color: 'var(--color-black-80)',
    fontSize: '14px',
    cursor: 'pointer',
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  },
  variants: {
    selected: {
      true: { bg: 'var(--color-black-100)', color: 'white', borderColor: 'var(--color-black-100)' },
    },
    compact: {
      true: {
        minW: '40px',
        minH: '24px',
        px: '1',
        border: '0',
        borderRadius: '0',
        fontSize: '12px',
      },
    },
  },
});

const chart = css({
  tableLayout: 'fixed',
  textAlign: 'left',
  borderCollapse: 'separate',
  borderSpacing: '0 12px',
  '& th, & td': {
    h: '36px',
    px: '3',
    borderTop: '1px solid var(--color-black-20)',
    borderBottom: '1px solid var(--color-black-20)',
    borderLeft: '1px solid var(--color-black-20)',
  },
  '& th:last-child, & td:last-child': { borderRight: '1px solid var(--color-black-20)' },
  '& thead th': { borderTopColor: 'var(--color-black-20)', bg: 'var(--color-black-10)' },
  '& tbody th': { bg: 'transparent', fontWeight: 'normal' },
  _mobile: { fontSize: '12px', borderSpacing: '0 8px', '& th, & td': { px: '2' } },
});

export function SizeGuidePanel({ category }: { category: GuideCategory }) {
  const [gender, setGender] = useState<Gender>('men');
  const [width, setWidth] = useState('regular');
  const [unit, setUnit] = useState<Unit>('cm');
  const shoes = category.value === 'shoes';
  const genderLabel = genderOptions.find((item) => item.value === gender)?.label;
  const widthLabel = widthOptions.find((item) => item.value === width)?.label;
  const caption = `${category.label} ${genderLabel}${shoes ? ` ${widthLabel}` : ''} 사이즈 차트 (${unit === 'cm' ? 'CM' : 'INCH'})`;

  return (
    <Stack
      gap="5"
      px={{ base: '8', _mobile: '0' }}
      pt={{ base: '10', _mobile: '6' }}
      pb="8"
      borderBottom="1px solid var(--color-black-20)"
    >
      <Typography as="h2" variant="heading7">
        {category.label}
      </Typography>
      <SizeGuideMeasurements category={category} gender={gender} />
      <Stack gap="4">
        <Stack gap="2">
          <Typography variant="body4" tone="subtle">
            성별 선택
          </Typography>
          <SegmentedControl
            unstyled
            ariaLabel="성별 선택"
            options={genderOptions}
            value={gender}
            onValueChange={setGender}
            className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}
            itemClassName={(_, selected) => option({ selected })}
          />
        </Stack>
        {shoes && (
          <Stack gap="2">
            <Typography variant="body4" tone="subtle">
              발볼 선택
            </Typography>
            <SegmentedControl
              unstyled
              ariaLabel="발볼 선택"
              options={widthOptions}
              value={width}
              onValueChange={setWidth}
              className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}
              itemClassName={(_, selected) => option({ selected })}
            />
          </Stack>
        )}
      </Stack>
      <Stack gap="1">
        <HStack justifyContent="space-between" gap="3">
          <Typography as="h3" variant="body2" weight="bold">
            사이즈 차트
          </Typography>
          <SegmentedControl
            unstyled
            ariaLabel="측정 단위"
            options={[
              { value: 'cm', label: 'CM' },
              { value: 'inch', label: 'INCH' },
            ]}
            value={unit}
            onValueChange={setUnit}
            className={css({ display: 'flex', gap: '0' })}
            itemClassName={(_, selected) => option({ selected, compact: true })}
          />
        </HStack>
        <DataTable caption={caption} className={chart}>
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
      </Stack>
    </Stack>
  );
}
