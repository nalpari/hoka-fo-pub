import { Grid } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';

type Props = {
  items: readonly number[];
  liked: readonly number[];
  product: Product;
  onLikedChange: (id: number, active: boolean) => void;
};

export function MyPageProductHistoryGrid({ items, liked, product, onLikedChange }: Props) {
  return (
    <Grid
      gridTemplateColumns="repeat(2, minmax(0, 1fr))"
      columnGap="2"
      rowGap="6"
      _mobile={{ columnGap: '2', rowGap: '4' }}
    >
      {items.map((id) => (
        <ProductCard
          key={id}
          liked={liked.includes(id)}
          onLikedChange={(active) => onLikedChange(id, active)}
          options={['promotion', 'like', 'colors']}
          product={product}
        />
      ))}
    </Grid>
  );
}
