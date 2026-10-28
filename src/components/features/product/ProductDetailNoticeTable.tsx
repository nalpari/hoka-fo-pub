import { css } from 'styled-system/css';
import { DescriptionList } from '@/components/common/atoms/DescriptionList/DescriptionList';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { ProductDetailSpecification } from './productDetailPresentation';

/** 상품 고시 정보를 이름과 값의 목록으로 표시합니다. (Displays product specifications as a list of labels and values.) */
export function ProductDetailNoticeTable({
  items,
}: {
  items: readonly ProductDetailSpecification[];
}) {
  return (
    <DescriptionList
      items={items.map(({ label, value, note }) => ({
        id: label,
        term: (
          <>
            <Typography variant="body4" weight="bold">
              {label}
            </Typography>
            {note ? <Typography variant="body4">{note}</Typography> : null}
          </>
        ),
        description: (
          <Typography variant="body4">
            {typeof value === 'string' ? value : value.join(' | ')}
          </Typography>
        ),
      }))}
      termProps={{ variant: 'body4' }}
      descriptionProps={{ variant: 'body4', tone: 'inherit' }}
      slotStyles={{
        root: css.raw({
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          bg: 'black.10',
          mb: '8',
        }),
        row: css.raw({
          display: 'grid',
          gridTemplateColumns: '28.5% minmax(0, 1fr)',
          gap: '0',
          minH: '60px',
          borderBottom: '1px solid token(colors.black.20)',
          _last: { borderBottom: 'none' },
        }),
        term: css.raw({
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          px: '6',
          py: '5',
          alignItems: 'start',
        }),
        description: css.raw({
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          px: '6',
          py: '5',
          minW: '0',
          overflowWrap: 'anywhere',
        }),
      }}
    />
  );
}
