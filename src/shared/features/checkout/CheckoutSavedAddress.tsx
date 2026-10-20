import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { CheckoutShippingInput } from './CheckoutShippingInput';
import type { ShippingErrors } from './CheckoutShipping';

type Props = {
  errors?: ShippingErrors;
  onEdit: () => void;
};

export function CheckoutSavedAddress({ errors, onEdit }: Props) {
  return (
    <Box border="1px solid var(--colors-black-20)">
      <HStack justifyContent="space-between" alignItems="center" bg="black.10" px="4" h="56px">
        <HStack gap="2">
          <Typography variant="body3" weight="medium">
            홍길동집
          </Typography>
          <Box border="1px solid var(--colors-black-20)" px="1" py="0.5" borderRadius="2px">
            <Typography variant="body5">기본 배송지</Typography>
          </Box>
        </HStack>
        <Button variant="link" size="sm" onClick={onEdit}>
          배송지변경
        </Button>
      </HStack>
      <Stack gap="3" px="4" py="5" borderTop="1px solid var(--colors-black-20)">
        <HStack gap="4" alignItems="flex-start">
          <Box minW="48px">
            <Typography variant="body4" tone="subtle">
              주소
            </Typography>
          </Box>
          <Stack flex="1" gap="1">
            <CheckoutShippingInput
              aria-label="주소"
              name="address"
              autoComplete="street-address"
              defaultValue="서울시 강남구 역삼동 234-1"
            />
            {errors?.address ? (
              <Typography variant="body5" tone="subtle">
                {errors.address}
              </Typography>
            ) : null}
          </Stack>
        </HStack>
        <HStack gap="4">
          <Box minW="48px">
            <Typography variant="body4" tone="subtle">
              받는 분
            </Typography>
          </Box>
          <CheckoutShippingInput
            aria-label="받는 분"
            name="name"
            autoComplete="name"
            defaultValue="홍길동"
          />
        </HStack>
        <HStack gap="4">
          <Box minW="48px">
            <Typography variant="body4" tone="subtle">
              연락처
            </Typography>
          </Box>
          <CheckoutShippingInput
            aria-label="연락처"
            name="phone"
            autoComplete="tel"
            defaultValue="010-1234-5678"
          />
        </HStack>
      </Stack>
    </Box>
  );
}
