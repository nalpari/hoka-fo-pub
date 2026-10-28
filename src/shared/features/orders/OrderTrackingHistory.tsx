import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { DataTable } from '@/shared/components/atoms/DataTable/DataTable';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';

const trackingTable = css({
  '&&': {
    tableLayout: 'fixed',
    fontSize: '12px',
    '& th, & td': { h: '40px', px: '1', borderBottom: '1px solid var(--color-black-20)' },
    '& thead th': {
      h: '42px',
      bg: 'transparent',
      borderTop: '1px solid var(--color-black-100)',
      borderBottom: '1px solid var(--color-black-100)',
      fontWeight: 'normal',
    },
    '& tbody td + td': { borderLeft: '0' },
  },
});

/** 상품 배송 추적 표를 표시합니다. (Displays the shipment tracking history table.) */
export function OrderTrackingHistory({ date }: { date: string }) {
  return (
    <ContentSection
      gap="3"
      title="상품추적"
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'body3', weight: 'semibold' } }}
    >
      <DataTable caption="상품 배송 추적 이력" className={trackingTable}>
        <thead>
          <tr>
            {['처리장소', '상대장소', '구분', '처리일자'].map((label) => (
              <th key={label}>
                <Typography variant="body5">{label}</Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['옥천HUB', '군포HUB', '집하처리'],
            ['군포HUB', '대구동', '간선하차'],
          ].map(([place, destination, state]) => (
            <tr key={`${place}-${destination}`}>
              <td>{place}</td>
              <td>{destination}</td>
              <td>{state}</td>
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
