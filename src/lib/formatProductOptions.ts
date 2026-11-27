type ProductOptions = {
  color?: string;
  size?: string;
  width?: string;
};

/** 상품 옵션을 색상, 사이즈, 발볼 순서로 표시하고 필요한 경우 수량을 붙입니다. */
export function formatProductOptions({ color, size, width }: ProductOptions, quantity?: number) {
  return [color, size, width, quantity === undefined ? undefined : `${quantity}개`]
    .filter((value) => value?.trim())
    .join(', ');
}
