import { Box, HStack, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import type { Product } from '@/mocks/products';
import { getCartImage } from '@/mocks/cartDisplay';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { CartItem } from '@/shared/types/cart';

const image = css({ w: '96px', h: '96px', objectFit: 'cover', bg: 'black.10' });

type Props = {
  item: CartItem;
  product: Product;
  selected: boolean;
  favorite: boolean;
  onSelect: (checked: boolean) => void;
  onRemove: () => void;
  onEdit: () => void;
  onFavorite: () => void;
};

export function CartItemRow({
  item,
  product,
  selected,
  favorite,
  onSelect,
  onRemove,
  onEdit,
  onFavorite,
}: Props) {
  return (
    <HStack as="li" alignItems="center" gap="0" bg="black.10" minH="185px" pos="relative">
      <Box px="4">
        <Checkbox
          aria-label={`${product.name} 선택`}
          checked={selected}
          onCheckedChange={onSelect}
          label={null}
        />
      </Box>
      <Stack flex="1" minW="0" pr="4" py="8" gap="3">
        <HStack justifyContent="flex-end" pos="absolute" top="3" right="4">
          <Button
            variant="ghost"
            className={css({ fontSize: '18px', p: '0', minW: '18px' })}
            aria-label={`${product.name} 삭제`}
            onClick={onRemove}
          >
            ×
          </Button>
        </HStack>
        <HStack gap="4" alignItems="flex-start">
          <img
            className={image}
            src={getCartImage(item, product.primaryImage)}
            alt={product.name}
          />
          <Stack minW="0" flex="1" gap="1">
            <Typography variant="body5">{product.gender ?? 'All Gender'}</Typography>
            <Typography
              variant="body4"

              weight="semibold"
              className={css({ lineClamp: 2 })}
            >
              {product.name}
            </Typography>
            <Typography variant="body5" tone="subtle">
              옵션 : {item.width} / {item.color} / {item.size}
              <br />
              {item.quantity}개
            </Typography>
            <Typography variant="body4" weight="semibold">
              {(product.price * item.quantity).toLocaleString()}원
            </Typography>
            <HStack justifyContent="space-between" mt="1">
              <Button variant="link" size="sm" onClick={onEdit}>
                옵션변경
              </Button>
              <Button variant="link" size="sm" aria-pressed={favorite} onClick={onFavorite}>
                {favorite ? '♥' : '♡'} 관심상품
              </Button>
            </HStack>
          </Stack>
        </HStack>
      </Stack>
    </HStack>
  );
}
