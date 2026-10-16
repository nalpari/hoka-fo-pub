import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductThumbnail } from '@/shared/components/molecules/ProductThumbnail/ProductThumbnail';

type Props = { items: readonly number[]; thumbnail: string; onCancelRequest: (id: number) => void };

export function MyPageRestockList({ items, thumbnail, onCancelRequest }: Props) {
  return (
    <Stack gap="0">
      {items.map((id) => (
        <HStack
          key={id}
          borderBottom="1px solid var(--colors-black-20)"
          alignItems="center"
          gap="4"
          px="4"
          py="6"
        >
          <Box w="16" h="16" flexShrink="0">
            <ProductThumbnail alt="클리프톤 9" src={thumbnail} />
          </Box>
          <Stack flex="1" gap="1">
            <Typography variant="body4" weight="medium">
              클리프톤 9
            </Typography>
            <HStack gap="1">
              <Typography variant="body4" tone="tertiary">
                신청일 :
              </Typography>
              <Typography variant="body4" language="en" tone="tertiary">
                2026.05.22
              </Typography>
            </HStack>
          </Stack>
          <Button variant="link" size="sm" onClick={() => onCancelRequest(id)}>
            알림대기
          </Button>
        </HStack>
      ))}
    </Stack>
  );
}
