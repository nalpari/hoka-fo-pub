import { Stack } from 'styled-system/jsx';
import { SizeGuideMeasurementMethod } from './SizeGuideMeasurementMethod';
import type { GuideCategory } from './size-guide.data';

const footWidthSteps = [
  '종이 위에 발을 올리고 양 발의 윤곽을 따라 그려 주세요.',
  '발 앞부분의 가장 넓은 지점(엄지발가락과 새끼발가락 아래쪽) 사이의 너비를 측정해 주세요.',
  '양발 중 더 넓은 발을 기준으로 사이즈표와 비교하여 적합한 발볼 옵션을 확인해 주세요.',
] as const;

export function SizeGuideMeasurementInstructions({ category }: { category: GuideCategory }) {
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
