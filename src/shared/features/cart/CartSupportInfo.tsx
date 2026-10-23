import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { CartSupportContact } from './CartSupportContact';
import { CartSupportHours } from './CartSupportHours';
import { Stack } from 'styled-system/jsx';

/** 장바구니 고객센터 연락처와 운영시간을 안내합니다. (Displays cart customer support information.) */
export function CartSupportInfo() {
  return (
    <ContentSection
      as="section"
      gap={{ base: '4' }}
      title="고객센터 안내"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading6' } }}
    >
      <Stack gap="6">
        <CartSupportContact />
        <CartSupportHours />
      </Stack>
    </ContentSection>
  );
}
