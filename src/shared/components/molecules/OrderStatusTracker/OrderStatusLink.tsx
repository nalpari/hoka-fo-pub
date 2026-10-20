import Link from 'next/link';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type OrderStatusLinkProps = {
  label: string;
  count: number;
  href: string;
};

const statusLink = css({
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

export function OrderStatusLink({ label, count, href }: OrderStatusLinkProps) {
  return (
    <Link className={statusLink} href={href}>
      <Typography as="strong" variant="heading8">
        {count}
      </Typography>
      <Typography variant="body5">{label}</Typography>
    </Link>
  );
}
