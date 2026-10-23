import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { CartSupportContact } from './CartSupportContact';
import { CartSupportHours } from './CartSupportHours';

/** 장바구니 고객센터 연락처와 운영시간을 안내합니다. (Displays cart customer support information.) */
export function CartSupportInfo() {
  return (
    <ContentSection
      as="section"
      gap={{ base: '2', _mobile: '3' }}
      pt={{ base: '4', _mobile: '0' }}
      borderTop={{ base: '1px solid var(--colors-black-20)', _mobile: '0' }}
      title="고객센터 안내"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading6' } }}
    >
      <CartSupportContact />
      <CartSupportHours />
    </ContentSection>
  );
}
