import { css } from 'styled-system/css';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import {
  DescriptionList,
  type DescriptionListItem,
} from '@/shared/components/atoms/DescriptionList/DescriptionList';

/** 주문 상세의 구분선이 있는 항목별 정보를 표시합니다. (Displays ruled key-value information for an order.) */
export function OrderInformationSection({
  title,
  items,
}: {
  title: string;
  items: readonly DescriptionListItem[];
}) {
  return (
    <ContentSection
      title={title}
      gap="0"
      headerProps={{
        titleAs: 'h2',
        titleProps: { web: 'heading9', mo: 'heading7' },
        css: css.raw({ pb: '3', borderBottom: '1px solid var(--colors-black-100)' }),
      }}
    >
      <DescriptionList
        items={items}
        termProps={{ variant: 'body4', tone: 'subtle' }}
        descriptionProps={{ variant: 'body4', tone: 'primary' }}
        slotStyles={{
          root: css.raw({ display: 'block' }),
          row: css.raw({
            display: 'grid',
            gridTemplateColumns: '88px minmax(0, 1fr)',
            gap: '3',
            py: '4',
            borderBottom: '1px solid var(--colors-black-20)',
          }),
        }}
      />
    </ContentSection>
  );
}
