import { Grid } from 'styled-system/jsx';
import { SupportContactCard } from '@/shared/features/support/SupportContactCard';

export function SupportContacts() {
  return (
    <Grid
      gridTemplateColumns="repeat(2, minmax(0, 1fr))"
      gap="2"
      _mobile={{ gridTemplateColumns: '1fr', gap: '2' }}
    >
      <SupportContactCard
        title="고객상담실"
        description="AS 및 오프라인 매장 관련 문의"
        phone="080-665-5552"
        phoneHref="tel:0806655552"
      />
      <SupportContactCard
        title="온라인 스토어"
        description="주문/배송/교환 및 반품 관련 문의"
        phone="080-2225-6660"
        phoneHref="tel:08022256660"
      />
    </Grid>
  );
}
