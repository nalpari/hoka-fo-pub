import { DataTable } from '@/components/common/atoms/DataTable/DataTable';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { SizeGuideChoiceGroup } from './SizeGuideChoiceGroup';
import {
  genderOptions,
  shoeSizes,
  widthOptions,
  type Gender,
  type GuideCategory,
  type Unit,
} from './size-guide.data';

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

export function SizeGuideChart({
  category,
  gender,
  width,
  unit,
  onUnitChange,
}: SizeGuideChartProps) {
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
