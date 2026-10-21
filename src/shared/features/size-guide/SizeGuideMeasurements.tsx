import Image from 'next/image';
import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { Gender, GuideCategory } from './size-guide.data';

export function SizeGuideMeasurements({
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
      display="grid"
      gridTemplateColumns={{ base: '280px minmax(0, 1fr)', _mobile: '1fr' }}
      gap="6"
      alignItems="start"
    >
      <Box
        position="relative"
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
      <Stack gap="3">
        <Stack gap="2">
          <Typography variant="body3" weight="bold">
            [{shoes ? '발 길이' : category.label} 측정 방법]
          </Typography>
          <Stack as="ol" gap="1" listStyleType="none" m="0" p="0">
            {category.steps.map((step, index) => (
              <Typography as="li" key={step} variant="body4">
                STEP {index + 1}. {step}
              </Typography>
            ))}
          </Stack>
          {!shoes && (
            <Typography variant="body4">
              측정한 치수를 사이즈표와 비교해 가장 알맞은 사이즈를 선택해 주세요.
            </Typography>
          )}
        </Stack>
        {shoes && (
          <Stack gap="2">
            <Typography variant="body3" weight="bold">
              [발볼 너비 측정 방법]
            </Typography>
            <Stack as="ol" gap="1" listStyleType="none" m="0" p="0">
              <Typography as="li" variant="body4">
                STEP 1. 종이 위에 발을 올리고 양 발의 윤곽을 따라 그려 주세요.
              </Typography>
              <Typography as="li" variant="body4">
                STEP 2. 발 앞부분의 가장 넓은 지점(엄지발가락과 새끼발가락 아래쪽) 사이의 너비를
                측정해 주세요.
              </Typography>
              <Typography as="li" variant="body4">
                STEP 3. 양발 중 더 넓은 발을 기준으로 사이즈표와 비교하여 적합한 발볼 옵션을 확인해
                주세요.
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
