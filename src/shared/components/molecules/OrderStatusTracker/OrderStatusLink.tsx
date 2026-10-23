import Link from 'next/link';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type OrderStatusLinkProps = {
  label: string;
  count: number;
  href: string;
  compact?: boolean;
};

const statusLink = css.raw({
  display: 'grid',
  justifyItems: 'center',
  gap: '7px',
  minH: '100px',
  py: '5',
  px: '2',
  color: 'var(--color-text-primary)',
  textAlign: 'center',
  borderRight: '1px solid var(--color-black-20)',
  '&:last-child': {
    borderRight: '0',
  },
});

/** 주문 단계의 수량과 조회 링크를 표시합니다. (Displays an order stage count and its history link.) */
export function OrderStatusLink({ label, count, href, compact = false }: OrderStatusLinkProps) {
  return (
    <Link
      className={css(
        statusLink,
        compact && { minH: '90px', py: '4', px: '1', borderRight: '0', gap: '1' },
      )}
      href={href}
    >
      <Typography as="strong" variant={compact ? 'body1' : 'heading8'}>
        {count}
      </Typography>
      <Typography variant="body5">{label}</Typography>
    </Link>
  );
}
