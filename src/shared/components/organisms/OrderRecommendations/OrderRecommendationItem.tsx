import Link from 'next/link';
import type { Product } from '@/mocks/products';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

type Props = {
  product: Pick<Product, 'id' | 'gender' | 'name' | 'price'>;
  imageSrc: string;
};

export function OrderRecommendationItem({ product, imageSrc }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className={css({ flex: '0 0 140px', color: 'black.100' })}
    >
      <Stack gap="1">
        <img
          src={imageSrc}
          alt=""
          className={css({ w: '140px', h: '140px', objectFit: 'cover' })}
        />
        <Typography web="body5" mo="body5">
          {product.gender ?? 'All Gender'}
        </Typography>
        <Typography web="body5" mo="body5" weight="semibold" className={css({ lineClamp: 2 })}>
          {product.name}
        </Typography>
        <Typography web="body5" mo="body5">
          {product.price.toLocaleString()}원
        </Typography>
      </Stack>
    </Link>
  );
}
