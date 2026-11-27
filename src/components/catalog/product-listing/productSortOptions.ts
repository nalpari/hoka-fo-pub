export const productSortOptions = [
  { label: '신상품순', value: '신상품순' },
  { label: '높은가격순', value: '높은가격순' },
  { label: '낮은가격순', value: '낮은가격순' },
] as const;

export type ProductSort = (typeof productSortOptions)[number]['value'];

export function getProductSort(value: string | null): ProductSort {
  return (
    productSortOptions.find((option) => option.value === value)?.value ??
    productSortOptions[0].value
  );
}
