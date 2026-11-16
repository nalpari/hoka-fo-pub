'use client';

import Image from 'next/image';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { Radio } from '@/components/common/atoms/Radio';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';
import { modalProductOptionRecipe } from '@/components/common/layouts/ModalDialog.recipe';

import { type Product } from '@/mocks/products';
import { type CartItem } from '@/types/cart';

type CartOptionType = 'shoes' | 'apparel';

const optionStyles = modalProductOptionRecipe();

type CartOptionsDialogProps = {
  initialSize?: string;
  item: CartItem;
  product: Product;
  optionType?: CartOptionType;
  unavailableColors?: readonly string[];
  onClose: () => void;
};

/** 상품 유형에 맞는 옵션 선택과 닫기를 확인합니다. (Previews option selection and dismissal for each product type.) */
function CartOptionsDialog({
  initialSize,
  item,
  product,
  optionType = 'shoes',
  unavailableColors = [],
  onClose,
}: CartOptionsDialogProps) {
  const platform = usePlatform();
  const [draft, setDraft] = useState({ ...item, size: initialSize ?? item.size });
  const color = product.colorOptions?.find((option) => option.color === draft.color);
  const widths = color?.widths;
  const width = widths?.find((option) => option.label === draft.width);
  const sizes = width?.sizes ?? product.sizes;
  const soldOut = width?.soldOut ?? product.soldOut;
  const changed =
    draft.color !== item.color ||
    draft.size !== item.size ||
    (optionType === 'shoes' && draft.width !== item.width);
  const valid =
    sizes.includes(draft.size) &&
    !soldOut.includes(draft.size) &&
    !unavailableColors.includes(draft.color);

  // [ 개발팀 바인딩 ] item/product와 optionType, unavailableColors는 장바구니 소유자가 전달하는 표시 데이터입니다.
  // initialSize는 변경된 선택을 처음부터 표시하는 preview seed입니다. 현재는 선택 초안과 닫기만 확인하며 변경 저장 요청은 연결하지 않았습니다. 실제 연결 시 소유자가 상품/옵션 ID와
  // draft의 color/width/size를 저장 payload로 매핑하고 pending 중 중복 제출 방지, 실패 시 초안 유지·재시도,
  // 성공 시 목록 갱신과 닫기를 연결해야 합니다. 상품 종류는 이름이나 사이즈 문자열로 추정하지 않습니다.
  return (
    <ModalDialog
      variant="productOption"
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={platform === 'mobile' ? '옵션 변경' : '옵션 변경하기'}
      closeLabel="옵션 변경 닫기"
      mobilePresentation="bottomSheet"
      blurBackdrop={false}
      actions={{
        kind: 'confirm',
        onConfirm: onClose,
        onCancel: onClose,
        cancelLabel: '취소하기',
        confirmLabel: '변경하기',
        confirmDisabled: !changed || !valid,
      }}
    >
      <div className={optionStyles.root} data-product-type={optionType}>
        <h3 className={optionStyles.productName}>{product.name}</h3>
        <div className={optionStyles.options}>
          {optionType === 'shoes' && (
            <Radio
              variant="custom"
              ariaLabel="발볼"
              value={draft.width}
              className={optionStyles.widths}
              optionClassName={optionStyles.width}
              options={(widths?.map((option) => option.label) ?? ['Regular', 'Wide', 'X-Wide']).map(
                (value) => ({ value, label: value }),
              )}
              onValueChange={(width) => setDraft({ ...draft, width })}
            />
          )}
          <section className={optionStyles.section} aria-label="컬러 선택">
            <h4 className={optionStyles.label}>
              컬러: <span className={optionStyles.colorName}>{draft.color}</span>
            </h4>
            <Radio
              variant="custom"
              ariaLabel="컬러"
              value={draft.color}
              className={optionStyles.colors}
              optionClassName={optionStyles.color}
              onValueChange={(color) => setDraft({ ...draft, color })}
              options={product.colors.map((value) => ({
                value,
                disabled: unavailableColors.includes(value),
                label: (
                  <>
                    <Image
                      src={
                        product.colorThumbnails?.find((option) => option.label === value)?.image ??
                        product.primaryImage
                      }
                      alt={value}
                      width={74}
                      height={74}
                      sizes={platform === 'mobile' ? 'calc((100vw - 64px) / 5)' : '74px'}
                      className={optionStyles.thumbnail}
                    />
                    {unavailableColors.includes(value) && (
                      <span className={optionStyles.soldOut}>Sold Out</span>
                    )}
                  </>
                ),
              }))}
            />
          </section>
          <section className={optionStyles.section} aria-label="사이즈 선택">
            <h4 className={optionStyles.label}>사이즈</h4>
            <Radio
              variant="custom"
              ariaLabel="사이즈"
              value={draft.size}
              className={optionStyles.sizes}
              optionClassName={optionStyles.size}
              options={sizes.map((value) => ({
                value,
                label: value,
                disabled: soldOut.includes(value),
              }))}
              onValueChange={(size) => setDraft({ ...draft, size })}
            />
          </section>
        </div>
      </div>
    </ModalDialog>
  );
}

type CartDialogsProps = {
  initialSize?: string;
  editingRow: { item: CartItem; product: Product } | null;
  optionType?: CartOptionType;
  unavailableColors?: readonly string[];
  onEditClose: () => void;
};

/** 구매 수량 제한 안내를 표시합니다. (Displays the purchase quantity limit notice.) */
export function CartLimitDialog({ onClose }: { onClose: () => void }) {
  return (
    <ModalDialog
      variant="alert"
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="장바구니"
      closeLabel="구매 수량 제한 안내 닫기"

      message="변경할 수 없습니다"
      description="구매 수량이 제한된 상품입니다."
      actions={{ kind: 'single', onConfirm: onClose }}
    />
  );
}

/** 장바구니 옵션 편집 화면을 표시합니다. (Displays the cart option editing dialog.) */
export function CartDialogs({
  initialSize,
  editingRow,
  optionType = 'shoes',
  unavailableColors,
  onEditClose,
}: CartDialogsProps) {
  return editingRow ? (
    <CartOptionsDialog
      initialSize={initialSize}
      item={editingRow.item}
      product={editingRow.product}
      optionType={optionType}
      unavailableColors={unavailableColors}
      onClose={onEditClose}
    />
  ) : null;
}
