import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { DataTable } from '@/shared/components/atoms/DataTable/DataTable';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

/** 상품 배송 추적 표를 표시합니다. (Displays the shipment tracking history table.) */
export function OrderTrackingHistory({ date }: { date: string }) {
  return (
    <ContentSection
      gap="3"
      title="상품추적"
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'body3', weight: 'semibold' } }}
    >
      <DataTable caption="상품 배송 추적 이력">
        <thead>
          <tr>
            {['처리장소', '상태', '구분', '처리일자'].map((label) => (
              <th key={label}>
                <Typography variant="body5">{label}</Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['옥천HUB', '군포HUB'].map((place, index) => (
            <tr key={place}>
              <td>{place}</td>
              <td>{index ? '배송중' : '간선하차'}</td>
              <td>집배송</td>
              <td>
                {date}
                <br />
                11:31
              </td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </ContentSection>
  );
}
