'use client';

/**
 * [ 개발팀 바인딩 ]
 * options에 해당 상품/색상/발볼의 사이즈별 상태를, value에 현재 선택을 전달합니다. onValueChange가 서버 요청 전 선택 상태 연결점입니다.
 * allowSoldOutSelection은 상품상세에서만 품절 사이즈를 알림 대상으로 선택하게 하며 구매 가능 상태로 바꾸지 않습니다. 장바구니 등 기본 소비자는 품절 선택 불가를 유지합니다.
 * 품절/소량 표시 데이터는 서버 재고로 변환하며 상품/색상 변경 시 무효가 된 이전 사이즈는 부모에서 해제합니다.
 */

import { type ReactNode, useId } from 'react';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { FormField } from '@/components/common/atoms/FormField';
import { Typography, type TypographyVariant } from '@/components/common/atoms/Typography';

import {
  SizeSelector,
  type SizeSelectorOption,
} from '@/components/common/molecules/SizeSelector/SizeSelector';

import { ProductOptionSection } from './ProductOptionSection';

const styles = {
  errorText: css({
    '&&': {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '1.5',
      color: '#CC0000',
      _mobile: { fontSize: '13px', fontWeight: '500', lineHeight: '1.3', color: '#E10F00' },
    },
  }),
  errorField: css({ display: 'flex', flexDirection: 'column', gap: '8px' }),
  errorGroup: css({
    border: '1px solid #CC0000',
    borderRadius: '4px',
    p: '4px',
    mx: '-5px',
    '& [aria-invalid="true"]': { outline: 'none' },
    _mobile: { p: '6px', mx: '-7px', '& > section': { gap: '14px' } },
  }),
};

export type ProductSizeSelectorProps = {
  options: readonly SizeSelectorOption[];
  value: string;
  onValueChange: (size: string) => void;
  appearance?: 'detail' | 'cart';
  allowSoldOutSelection?: boolean;
  action?: ReactNode;
  description?: ReactNode;
  error?: string;
  errorVariant?: TypographyVariant;
  id?: string;
  fieldId?: string;
};

/** 선택지의 재고 상태와 화면별 안내를 반영한 사이즈 선택을 표시합니다. (Displays size selection with supplied availability and contextual guidance.) */
export function ProductSizeSelector({
  options,
  value,
  onValueChange,
  appearance = 'detail',
  allowSoldOutSelection = false,
  action,
  description,
  error,
  errorVariant,
  id,
  fieldId,
}: ProductSizeSelectorProps) {
  const generatedId = useId();

  const selector = (
    <SizeSelector
      mode="single"
      allowSoldOutSelection={allowSoldOutSelection}
      size={appearance === 'cart' ? 'medium' : 'regular'}
      ariaLabel={appearance === 'cart' ? '사이즈' : '사이즈 선택'}
      columns={5}
      mobileColumns={appearance === 'cart' || error ? 4 : undefined}
      soldOutAppearance={appearance === 'cart' ? undefined : 'gray'}
      options={options}
      value={value}
      onValueChange={onValueChange}
    />
  );

  if (appearance === 'detail' && error) {
    return (
      <FormField
        htmlFor={fieldId ?? generatedId}
        className={styles.errorField}
        error={
          <Typography variant={errorVariant ?? 'body4'} className={styles.errorText}>
            {error}
          </Typography>
        }
      >
        <Box className={styles.errorGroup}>
          <ProductOptionSection appearance={appearance} title="사이즈" action={action} id={id}>
            {selector}
            {description}
          </ProductOptionSection>
        </Box>
      </FormField>
    );
  }

  return (
    <ProductOptionSection
      appearance={appearance}
      title={
        appearance === 'cart' ? (
          <>
            사이즈:{' '}
            <Typography as="span" web="body3" mo="body4" weight="regular">
              {value}
            </Typography>
          </>
        ) : (
          '사이즈'
        )
      }
      action={action}
      id={id}
    >
      {appearance === 'cart' ? (
        selector
      ) : (
        <Stack gap="4">
          <FormField
            htmlFor={fieldId ?? generatedId}
            error={
              error && errorVariant ? (
                <Typography variant={errorVariant}>{error}</Typography>
              ) : (
                error || undefined
              )
            }
          >
            {selector}
          </FormField>
          {description}
        </Stack>
      )}
    </ProductOptionSection>
  );
}
