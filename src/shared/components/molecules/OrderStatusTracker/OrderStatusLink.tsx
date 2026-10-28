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
        compact && {
          minH: { base: '90px', _mobile: '86px' },
          py: '0',
          px: '1',
          mt: { _mobile: '4' },
          alignSelf: 'start',
          borderRight: '0',
          gap: '1',
          // alignContent: 'center',
          '& > span:last-child': { whiteSpace: 'pre-line' },
        },
      )}
      href={href}
    >
      <Typography
        as="strong"
        variant={compact ? 'body1' : 'heading8'}
        tone={compact && count === 0 ? 'black40' : 'primary'}
      >
        {count}
      </Typography>
      <Typography variant="body5" tone={compact ? 'tertiary' : 'primary'}>
        {label}
      </Typography>
    </Link>
  );
}
