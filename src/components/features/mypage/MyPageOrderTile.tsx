import { Box, HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ProductThumbnail } from '@/components/common/molecules/ProductThumbnail/ProductThumbnail';
import type { MyPageOrderItem } from './mypage-home-data';

export function MyPageOrderTile({ item }: { item: MyPageOrderItem }) {
  return (
    <HStack position="relative" alignItems="flex-start" gap="4">
      <Box w="24" h="24" flexShrink="0">
        <ProductThumbnail alt={item.name} src={item.image} />
      </Box>
      <Stack minW="0" flex="1" gap="1.5" pr="17">
        <HStack minH="18px">
          {item.isNew ? (
            <Typography variant="body4" tone="red80">
              New
            </Typography>
          ) : null}
        </HStack>
        <Stack gap="2.5">
          <Stack gap="1">
            <Stack gap="0.5">
              <Typography variant="body4">{item.gender}</Typography>
              <Typography variant="body4">{item.name}</Typography>
            </Stack>
            <Typography variant="body4" weight="semibold">
              {item.price}
            </Typography>
          </Stack>
          <Typography variant="body5">{item.description}</Typography>
        </Stack>
      </Stack>
      <Box
        position="absolute"
        top="0"
        right="0"
        border="1px solid var(--color-border-tertiary)"
        borderRadius="full"
        px="2"
        py="1.5"
        bg="white.0"
      >
        <Typography variant="body5">{item.status}</Typography>
      </Box>
    </HStack>
  );
}
