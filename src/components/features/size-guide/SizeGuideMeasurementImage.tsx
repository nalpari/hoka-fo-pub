import Image from 'next/image';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import type { Gender, GuideCategory } from './size-guide.data';

export function SizeGuideMeasurementImage({
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
