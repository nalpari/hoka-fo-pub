import { HStack } from 'styled-system/jsx';
import { HeaderPromotionCarousel } from './HeaderPromotionCarousel';
import type { HeaderPromotionButtonType } from './HeaderPromotionContent';

/** Member promotion shown above the sticky navigation on web and mobile. */
export function HeaderPromotionBanner({ buttonType }: { buttonType?: HeaderPromotionButtonType }) {
  return (
    <HStack
      as="aside"
      aria-label="홍보 배너"
      justifyContent="center"
      containerType="inline-size"
      h="50px"
      gap="10px"
      bg="var(--hoka-black)"
      css={{ '&&': { color: 'var(--hoka-white)' } }}
    >
      <HeaderPromotionCarousel buttonType={buttonType} />
    </HStack>
  );
}
