import { Stack } from 'styled-system/jsx';
import { SupportContactCard } from '@/shared/features/support/SupportContactCard';

export function SupportContacts() {
  return (
    <Stack as="section" aria-label="고객센터 연락처" gap="2">
      <SupportContactCard
        headingId="support-contact-customer-title"
        title="고객상담실"
        description="AS 및 오프라인 매장 관련 문의"
        phone="080-665-5552"
        phoneHref="tel:0806655552"
        operatingHoursTitle="평일 운영시간"
        operatingHours="09:00~18:00"
        lunchBreak="점심시간 12:00~13:00"
      />
      <SupportContactCard
        headingId="support-contact-online-title"
        title="온라인 스토어"
        description="주문/배송/교환 및 반품 관련 문의"
        phone="080-2225-6660"
        phoneHref="tel:08022256660"
        operatingHoursTitle="평일 일반 유선상담 운영시간"
        operatingHours="10:00~17:00"
        lunchBreak="점심시간 12:00~13:00"
      />
    </Stack>
  );
}
