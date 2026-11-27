'use client';

import Image from 'next/image';

import { useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { dataListRecipe } from '@/components/common/atoms/DataList.recipe';
import { Icon } from '@/components/common/atoms/Icon';
import { NumberStepper } from '@/components/common/atoms/NumberStepper';
import { Typography } from '@/components/common/atoms/Typography';
import { Wishlist } from '@/components/common/atoms/Wishlist';

import { itemKey } from '@/app/cart/cart-item';
import { type CartPreviewRow } from '@/app/cart/cart-preview';
import { getCartImage } from '@/mocks/cartDisplay';

import { CartDialogs } from './CartDialogs';

function CartProductItem({
  row,
  selected,
  onSelect,
  onOptions,
}: {
  row: CartPreviewRow;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onOptions: () => void;
}) {
  const { item, product, amount, soldOut } = row;
  const [quantity, setQuantity] = useState(item.quantity);
  const [favorite, setFavorite] = useState(row.initialFavorite ?? false);
  const price = (mobile = false) => (
    <Stack gap="0" alignItems="flex-end" opacity={soldOut ? '0.3' : '1'}>
      {row.originalAmount ? (
        <Typography variant="b6" tone="subtle" className={css({ textDecoration: 'line-through' })}>
          {row.originalAmount.toLocaleString()}원
        </Typography>
      ) : null}
      <Typography variant="b6M">
        {(mobile ? (row.mobileAmount ?? amount) : amount).toLocaleString()}원
      </Typography>
    </Stack>
  );
  return (
    <Grid
      as="li"
      gridTemplateColumns={{
        base: '16px 144px minmax(0, 1fr) 108px 86px 20px',
        _mobile: '16px 96px minmax(0, 1fr) 20px',
      }}
      rowGap="0"
      py={{ base: '16px', _mobile: '24px' }}
      alignItems="start"
    >
      <Checkbox
        label={null}
        aria-label={`${item.id} 선택`}
        checked={selected}
        disabled={soldOut}
        onCheckedChange={onSelect}
      />
      <Box pos="relative" gridColumn="2" gridRow={{ base: '1', _mobile: '1 / span 2' }}>
        <Image
          src={getCartImage(item, product.primaryImage)}
          alt={product.name}
          width={144}
          height={144}
          sizes="(max-width: 1024px) 96px, 144px"
          className={css({
            display: 'block',
            w: '144px',
            h: '144px',
            objectFit: 'contain',
            bg: 'black.10',
            _mobile: { w: '96px', h: '96px' },
          })}
        />
        {soldOut ? (
          <Box pos="absolute" inset="0" bg="rgba(0,0,0,0.3)" display="grid" placeItems="center">
            <Typography web="h10" mo="h8" className={css({ color: 'white' })}>
              Sold Out
            </Typography>
          </Box>
        ) : null}
        <Box pos="absolute" top="8px" right="8px">
          <Wishlist
            active={favorite}
            ariaLabel={`${item.id} 관심상품`}
            iconSize="20px"
            onActiveChange={setFavorite}
          />
        </Box>
      </Box>
      <Stack gridColumn="3" gap="8px" alignSelf={{ base: 'center', _mobile: 'start' }}>
        <Stack gap="2px" opacity={soldOut ? '0.3' : '1'}>
          <Typography variant="b6M">{product.gender}</Typography>
          <Typography variant="b6M">{product.name}</Typography>
          <Typography variant="b6" tone="subtle">
            <Typography as="span" web="b6" mo="b6M">
              {item.width}
            </Typography>
            , {item.color}, {item.size}
          </Typography>
        </Stack>
        <Button
          variant="link"
          size="md"
          onClick={onOptions}
          className={css({ alignSelf: 'flex-start' })}
        >
          옵션 변경
        </Button>
      </Stack>
      <HStack
        gridColumn={{ base: '4', _mobile: '3 / span 2' }}
        gridRow={{ base: '1', _mobile: '2' }}
        alignSelf={{ base: 'center', _mobile: 'end' }}
        mt={{ base: '0', _mobile: '12px' }}
        justifyContent="space-between"
        gap="8px"
      >
        <Box opacity={soldOut ? '0.3' : '1'}>
          <fieldset disabled={soldOut}>
            <NumberStepper
              value={quantity}
              min={1}
              onChange={setQuantity}
              trash
              ariaLabel={`${item.id} 수량`}
              className={css({ w: '108px!', _mobile: { w: '96px!', h: '32px!' } })}
            />
          </fieldset>
        </Box>
        <Box display={{ base: 'none', _mobile: 'block' }}>{price(true)}</Box>
      </HStack>
      <Box
        gridColumn="5"
        gridRow="1"
        alignSelf="center"
        display={{ base: 'block', _mobile: 'none' }}
      >
        {price()}
      </Box>
      <Button
        variant="icon"
        size={20}
        aria-label={`${item.id} 삭제`}
        className={css({ gridColumn: '6', gridRow: '1', _mobile: { gridColumn: '4' } })}
      >
        <Icon name="xmark-regular" size={20} />
      </Button>
    </Grid>
  );
}

/** 장바구니의 선택·수량과 옵션 초안을 표시합니다. (Displays cart selection, quantities, and option drafts.) */
export function CartProductSection({ rows }: { rows: readonly CartPreviewRow[] }) {
  const availableKeys = rows.filter((row) => !row.soldOut).map(({ item }) => itemKey(item));
  const [selectedKeys, setSelectedKeys] = useState(() =>
    rows.filter((row) => row.initialSelected && !row.soldOut).map(({ item }) => itemKey(item)),
  );
  const [editingRow, setEditingRow] = useState<CartPreviewRow | null>(null);
  // [ 개발팀 바인딩 ] rows는 고정 표시 데이터입니다. 체크·수량·옵션 초안만 로컬로 변경하며 합계·삭제·저장·주문은 미연결입니다. 장바구니 소유자가 상품/옵션 ID와 초안을 요청에 연결하고 pending·실패 시 초안 유지·재시도·성공 후 목록과 금액 갱신을 담당합니다.
  return (
    <Stack gap="0">
      <HStack justifyContent="space-between" pb="16px" flexWrap="wrap" rowGap="12px">
        <Checkbox
          aria-label="전체 상품 선택"
          checked={availableKeys.length > 0 && selectedKeys.length === availableKeys.length}
          onCheckedChange={(checked) => setSelectedKeys(checked ? availableKeys : [])}
          label={
            <Typography variant="b6">
              전체선택 ({selectedKeys.length}/{rows.length})
            </Typography>
          }
        />
        <HStack gap="16px" ml="auto" _mobile={{ gap: '12px' }}>
          {/* <Button
            variant="link"
            size="md"
            type="button"
            disabled={!rows.some((row) => row.soldOut)}
          >
            품절상품 전체삭제
          </Button> */}
          <Button variant="link" size="md" disabled={selectedKeys.length === 0}>
            선택 삭제
          </Button>
        </HStack>
      </HStack>
      <Stack
        as="ul"
        gap="0"
        listStyleType="none"
        className={dataListRecipe({ top: 'thinSubtle', columnGap: 'productControls' }).root}
      >
        {rows.map((row) => {
          const key = itemKey(row.item);
          return (
            <CartProductItem
              key={key}
              row={row}
              selected={selectedKeys.includes(key)}
              onSelect={(checked) =>
                setSelectedKeys((keys) =>
                  checked ? [...keys, key] : keys.filter((value) => value !== key),
                )
              }
              onOptions={() => setEditingRow(row)}
            />
          );
        })}
      </Stack>
      {editingRow ? (
        <CartDialogs
          editingRow={editingRow.optionPreview ?? editingRow}
          unavailableColors={editingRow.optionPreview?.unavailableColors}
          onEditClose={() => setEditingRow(null)}
        />
      ) : null}
    </Stack>
  );
}
