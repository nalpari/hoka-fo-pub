'use client';

/**
 * [개발팀 바인딩]
 * options에 해당 상품/색상/발볼의 사이즈별 상태를, value에 현재 선택을 전달합니다. onValueChange가 서버 요청 전 선택 상태 연결점입니다.
 * 품절/소량 표시 데이터는 서버 재고로 변환하며 상품/색상 변경 시 무효가 된 이전 사이즈는 부모에서 해제합니다.
 */

import { type ReactNode, useId } from 'react';

import { Stack } from 'styled-system/jsx';

import { FormField } from '@/components/common/atoms/FormField';

import {
  SizeSelector,
  type SizeSelectorOption,
} from '@/components/common/molecules/SizeSelector/SizeSelector';

import { ProductOptionSection } from './ProductOptionSection';

export type ProductSizeSelectorProps = {
  options: readonly SizeSelectorOption[];
  value: string;
  onValueChange: (size: string) => void;
  appearance?: 'detail' | 'cart';
  action?: ReactNode;
  description?: ReactNode;
  error?: string;
  id?: string;
  fieldId?: string;
};

/** 선택지의 재고 상태와 화면별 안내를 반영한 사이즈 선택을 표시합니다. (Displays size selection with supplied availability and contextual guidance.) */
export function ProductSizeSelector({
  options,
  value,
  onValueChange,
  appearance = 'detail',
  action,
  description,
  error,
  id,
  fieldId,
}: ProductSizeSelectorProps) {
  const generatedId = useId();

  const selector = (
    <SizeSelector
      mode="single"
      size="regular"
      ariaLabel={appearance === 'cart' ? '사이즈' : '사이즈 선택'}
      columns={appearance === 'cart' ? 4 : 5}
      soldOutAppearance={appearance === 'cart' ? undefined : 'gray'}
      options={options}
      value={value}
      onValueChange={onValueChange}
    />
  );

  return (
    <ProductOptionSection appearance={appearance} title="사이즈" action={action} id={id}>
      {appearance === 'cart' ? (
        selector
      ) : (
        <Stack gap="4">
          <FormField htmlFor={fieldId ?? generatedId} error={error || undefined}>
            {selector}
          </FormField>
          {description}
        </Stack>
      )}
    </ProductOptionSection>
  );
}
