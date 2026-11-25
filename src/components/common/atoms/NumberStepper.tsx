'use client';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type { ReactNode } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';

import { useFormFieldContext } from '@/components/common/atoms/FormField';
import { Icon } from '@/components/common/atoms/Icon';

const root = css({
  '&[data-invalid]': { outline: '2px solid var(--colors-red-100)', outlineOffset: '2px' },
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'space-between',
  gridTemplateColumns: '18px minmax(0, 1fr) 18px',
  gap: '0',
  minW: '0',
  w: '108px',
  h: '36px',
  border: '1px solid #E9EAEB',
  bg: 'white',
  px: '15px',
  _mobile: {
    w: '96px',
    h: '32px',
    px: '13.222222px',
    gridTemplateColumns: '16px minmax(0, 1fr) 16px',
  },
});

const control = css({
  display: 'grid',
  placeItems: 'center',
  minW: '0',
  minH: '0',
  w: '100%',
  h: '100%',
  border: '0',
  p: '0',
  bg: 'transparent',
  fontSize: 'body.20',
  color: 'black.100',
  cursor: 'pointer',
  '&:disabled, &[data-disabled]': { color: 'black.40', cursor: 'not-allowed' },
});

const valueStyle = css({
  minW: '0',
  w: '100%',
  h: '100%',
  border: '0',
  bg: 'transparent',
  p: '0',
  textAlign: 'center',
  fontSize: 'body.14',
  fontWeight: '400',
  lineHeight: 'body',
  _mobile: { fontSize: 'body.12' },
  fontFamily: 'en',
  color: 'black.100',
});

// 증감 SVG의 24px 캔버스에 포함된 4px 여백을 보정해 16px 도형 프레임을 맞춘다.
const quantityIcon = css({ maskSize: '150%', WebkitMaskSize: '150%' });

export type NumberStepperProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  ariaLabel?: string;
  className?: string;
  formatValue?: (value: number) => ReactNode;
} & (
  | {
      /** 기본 false이며 수량 1에서는 비활성 삭제 버튼을 표시합니다. */
      trash?: false;
      minimumControl?: ReactNode;
      onTrash?: never;
    }
  | {
      /** true이면 수량 1에서 활성 삭제 버튼을 표시합니다. */
      trash: true;
      minimumControl?: never;
      /** 삭제 실행은 호출부가 연결하며 연결하지 않으면 표시만 유지합니다. */
      onTrash?: () => void;
    }
);

// [ 개발팀 바인딩 ] trash는 표시 옵션이며 삭제 요청은 구현하지 않는다.
// 연결 소유자는 onTrash에 상품/옵션 식별자를 캡처하고 요청·pending 중 중복 방지,
// 실패 표시·재시도와 성공 후 목록 갱신을 담당한다. 현재 장바구니는 콜백 미연결 fixture다.

/** 범위 내 수량을 입력하거나 증감합니다. (Controls quantity entry and increment within bounds.) */
export function NumberStepper({
  value,
  min = 0,
  max,
  step = 1,
  onChange,
  ariaLabel = '수량 선택',
  className,
  formatValue,
  trash = false,
  onTrash,
  minimumControl,
}: NumberStepperProps) {
  const field = useFormFieldContext();
  const iconSize = usePlatform() === 'mobile' ? 16 : 18;

  return (
    <BaseNumberField.Root
      aria-label={ariaLabel}
      className={[root, className].filter(Boolean).join(' ')}
      max={max}
      min={min}
      onValueChange={(nextValue) => onChange(nextValue ?? min)}
      step={step}
      value={value}
    >
      {value === 1 ? (
        <button
          aria-label={`${ariaLabel} 삭제`}
          className={control}
          disabled={!trash}
          onClick={trash ? onTrash : undefined}
          type="button"
        >
          <Icon name="hoka-trash-regular" size={iconSize} />
        </button>
      ) : value === min && minimumControl ? (
        minimumControl
      ) : (
        <BaseNumberField.Decrement aria-label="감소" className={control}>
          <Icon className={quantityIcon} name="hoka-action-minus-regular" size={iconSize} />
        </BaseNumberField.Decrement>
      )}
      <BaseNumberField.Input
        aria-describedby={field?.describedBy}
        aria-label={ariaLabel}
        aria-valuetext={formatValue ? String(formatValue(value)) : undefined}
        className={valueStyle}
      />
      <BaseNumberField.Increment aria-label="증가" className={control}>
        <Icon className={quantityIcon} name="hoka-action-plus-regular" size={iconSize} />
      </BaseNumberField.Increment>
    </BaseNumberField.Root>
  );
}
