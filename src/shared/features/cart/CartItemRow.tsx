import { Box, HStack, Stack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { getCartImage } from '@/mocks/cartDisplay';
import { Button } from '@/shared/components/atoms/Button/Button';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Wishlist } from '@/shared/components/atoms/Wishlist/Wishlist';
import { faXmark } from '@/shared/icons/fontAwesome';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { OrderProductSummary } from '@/shared/components/molecules/OrderProductSummary/OrderProductSummary';
import type { CartItem } from '@/shared/types/cart';

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
    <HStack
      as="li"
      alignItems="center"
      gap="0"
      bg="black.10"
      minH={{ base: '185px', _mobile: '164px' }}
      pos="relative"
    >
      <Box
        px={{ base: '4', _mobile: '0' }}
        pos={{ base: 'static', _mobile: 'absolute' }}
        top={{ _mobile: '4' }}
        left={{ _mobile: '4' }}
      >
        <Checkbox
          aria-label={`${product.name} 선택`}
          checked={selected}
          onCheckedChange={onSelect}
          label={null}
        />
      </Box>
      <Stack
        flex="1"
        minW="0"
        pl={{ base: '0', _mobile: '4' }}
        pr="4"
        py={{ base: '8', _mobile: '6' }}
        gap="3"
      >
        <HStack justifyContent="flex-end" pos="absolute" top="3" right="4">
          <IconButton size={24} aria-label={`${product.name} 삭제`} onClick={onRemove}>
            <Icon fontAwesomeIcon={faXmark} size={14} />
          </IconButton>
        </HStack>
        <OrderProductSummary
          variant="cart"
          image={getCartImage(item, product.primaryImage)}
          name={product.name}
          gender={product.gender ?? 'All Gender'}
          optionText={`옵션 : ${item.width} / ${item.color} / ${item.size} ${item.quantity}개`}
          amount={product.price * item.quantity}
        >
          <HStack justifyContent="space-between" mt="1">
            <Button variant="link" size="sm" onClick={onEdit}>
              옵션변경
            </Button>
            <Wishlist
              active={favorite}
              ariaLabel="관심상품"
              label="관심상품"
              iconSize="12px"
              onActiveChange={onFavorite}
            />
          </HStack>
        </OrderProductSummary>
      </Stack>
    </HStack>
  );
}
