import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';

export type OrderStatusItem = { label: string; count: number; to?: string };

type Props = { items: OrderStatusItem[]; to?: string };

const heading = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: '3',
  '& h2': { m: '0', fontSize: '16' /* 기존 18px */ },
  '& a': { color: 'var(--color-text-muted)', fontSize: '12' },
});

const list = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  borderTop: '1px solid var(--color-black-100)',
  borderBottom: '1px solid var(--color-border-subtle)',
  _mobile: { overflowX: 'auto', gridTemplateColumns: 'repeat(5, minmax(88px, 1fr))' },
});

const statusLink = css({
  display: 'grid',
  justifyItems: 'center',
  gap: '7px',
  minH: '100px',
  py: '5',
  px: '2',
  color: 'var(--color-black-100)',
  textAlign: 'center',
  borderRight: '1px solid var(--color-black-20)',
  '&:last-child': { borderRight: '0' },
  '& strong': { fontSize: '24' /* 기존 23px */ },
  '& span': { fontSize: '12', lineHeight: 'body' },
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
