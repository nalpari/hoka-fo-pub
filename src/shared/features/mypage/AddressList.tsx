import { Badge } from '@/shared/components/atoms/Badge/Badge';
import { Button } from '@/shared/components/atoms/Button/Button';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { HStack, Stack } from 'styled-system/jsx';
import type { Address } from './mypage-address.types';

export function AddressList({
  addresses,
  onEdit,
  onDelete,
  onAdd,
}: {
  addresses: readonly Address[];
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}) {
  return (
    <Stack gap="6" px="4" pt="6" pb="16">
      {addresses.length ? (
        <Stack gap="0">
          {addresses.map((address) => (
            <Stack
              as="article"
              key={address.id}
              gap="2"
              py="5"
              borderBottom="1px solid var(--colors-black-20)"
            >
              <HStack alignItems="center" gap="2">
                <Typography as="h2" variant="heading6">
                  {address.name}
                </Typography>
                {address.isDefault ? (
                  <Badge shape="round" variant="filled" tone="tertiary">
                    기본 배송지
                  </Badge>
                ) : null}
              </HStack>
              <Typography variant="body4" language="en" tone="tertiary">
                {address.phone}
              </Typography>
              <Typography variant="body4" language="en" tone="tertiary">
                {address.zip}
              </Typography>
              <Typography variant="body4" tone="tertiary">
                {address.address} {address.detail}
              </Typography>
              <HStack gap="4" pt="2">
                <Button size="sm" variant="link" onClick={() => onEdit(address)}>
                  수정
                </Button>
                {!address.isDefault ? (
                  <Button size="sm" variant="link" onClick={() => onDelete(address.id)}>
                    삭제
                  </Button>
                ) : null}
              </HStack>
            </Stack>
          ))}
        </Stack>
      ) : (
        <EmptyState title="자주 쓰는 배송지 주소를 설정해주세요." variant="minimal" />
      )}
      <Button fullWidth size="tall" variant="primary" onClick={onAdd}>
        배송지 추가
      </Button>
    </Stack>
  );
}
