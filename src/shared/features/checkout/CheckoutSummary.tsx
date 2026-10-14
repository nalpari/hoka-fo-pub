import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { CheckoutRow } from '@/shared/features/checkout/checkout-summary';

const summary = css({ display: 'grid', gap: '3', p: '26px', bg: 'var(--color-black-10)' });

const summaryRow = css({ display: 'flex', justifyContent: 'space-between', gap: '4' });

/** Render prepared order rows; catalogue lookup and totals belong to the page. */
export function CheckoutSummary({ rows, total }: { rows: readonly CheckoutRow[]; total: number }) {
  return (
    <aside className={summary}>
      <Typography as="h2" variant="body1" weight="bold">
        주문 상품
      </Typography>
      {rows.map(({ item, product }) => (
        <div className={summaryRow} key={`${item.id}-${item.color}-${item.width}-${item.size}`}>
          <span>
            {product.name}
            <Typography
              as="small"
              variant="body4"
              tone="tertiary"
              className={css({ display: 'block' })}
            >
              {item.color} / {item.width} / {item.size} · {item.quantity}개
            </Typography>
          </span>
          <b>{(product.price * item.quantity).toLocaleString()}원</b>
        </div>
      ))}
      <div className={summaryRow}>
        <span>배송비</span>
        <b>0원</b>
      </div>
      <div className={summaryRow}>
        <strong>총 결제금액</strong>
        <strong className={css({ color: 'var(--color-red-80)' })}>
          {total.toLocaleString()}원
        </strong>
      </div>
      <Button type="submit" variant="primary" fullWidth>
        결제하기
      </Button>
    </aside>
  );
}
