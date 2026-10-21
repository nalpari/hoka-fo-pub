import Link from 'next/link';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

export type OrderRecommendation = {
  id: string;
  gender?: string;
  name: string;
  price: number;
  imageSrc: string;
  href: string;
};

type Props = { item: OrderRecommendation };

export function OrderRecommendationItem({ item }: Props) {
  return (
    <Link href={item.href} className={css({ flex: '0 0 140px', color: 'black.100' })}>
      <Stack gap="1">
        <img
          src={item.imageSrc}
          alt=""
          className={css({ w: '140px', h: '140px', objectFit: 'cover' })}
        />
        <Typography variant="body5">{item.gender ?? 'All Gender'}</Typography>
        <Typography variant="body5" weight="semibold" className={css({ lineClamp: 2 })}>
          {item.name}
        </Typography>
        <Typography variant="body5">{item.price.toLocaleString()}원</Typography>
      </Stack>
    </Link>
  );
}
