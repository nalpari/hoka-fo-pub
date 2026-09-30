import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';

export type OrderStatusItem = { label: string; count: number; to?: string };

type Props = { items: OrderStatusItem[]; to?: string };

const heading = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: '12px',
  '& h2': { m: '0', fontSize: '18px' },
  '& a': { color: 'var(--color-text-muted)', fontSize: '12px' },
});

const list = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  borderTop: '1px solid #111',
  borderBottom: '1px solid var(--color-border-subtle)',
  _mobile: { overflowX: 'auto', gridTemplateColumns: 'repeat(5, minmax(88px, 1fr))' },
});

const statusLink = css({
  display: 'grid',
  justifyItems: 'center',
  gap: '7px',
  minH: '100px',
  py: '20px',
  px: '8px',
  color: '#111',
  textAlign: 'center',
  borderRight: '1px solid #eee',
  '&:last-child': { borderRight: '0' },
  '& strong': { fontSize: '23px' },
  '& span': { fontSize: '12px', lineHeight: '1.3' },
});

/** Five-stage order snapshot that remains horizontally scannable on small screens. */
export function OrderStatusTracker({ items, to = '/mypage/orders' }: Props) {
  return (
    <section aria-label="주문 배송 현황">
      <div className={heading}>
        <h2>주문 / 배송 조회</h2>
        <Link to={to}>전체 보기 →</Link>
      </div>
      <div className={list}>
        {items.map((status) => (
          <Link className={statusLink} key={status.label} to={status.to ?? to}>
            <strong>{status.count}</strong>
            <span>{status.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
