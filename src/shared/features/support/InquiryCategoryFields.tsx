import { Grid, Stack } from 'styled-system/jsx';
import { Dropdown } from '@/shared/components/atoms/Dropdown/Dropdown';

export function InquiryCategoryFields() {
  return (
    <Stack gap="4">
      <Grid columns={2} gap="2" _mobile={{ gridTemplateColumns: '1fr' }}>
        <Dropdown
          ariaLabel="문의 유형"
          label="문의 유형"
          required
          name="inquiry-category"
          defaultValue="반품"
          options={[
            { value: '반품', label: '반품' },
            { value: '주문/배송', label: '주문/배송' },
            { value: '상품', label: '상품' },
            { value: '회원', label: '회원' },
          ]}
        />
        <Dropdown
          ariaLabel="상세 유형"
          label="상세 유형"
          required
          name="inquiry-detail-category"
          defaultValue="신청/취소 문의"
          options={[
            { value: '신청/취소 문의', label: '신청/취소 문의' },
            { value: '진행 상황 문의', label: '진행 상황 문의' },
            { value: '기타 문의', label: '기타 문의' },
          ]}
        />
      </Grid>
    </Stack>
  );
}
