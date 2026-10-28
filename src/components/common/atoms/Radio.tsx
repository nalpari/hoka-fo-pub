'use client';

import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import type { ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';

import { useFormFieldContext } from '@/components/common/atoms/FormField';
import { Typography } from '@/components/common/atoms/Typography';

const group = css.raw({
  display: 'grid',
  gap: '4',
  '& [role="radio"][aria-invalid="true"]': {
    outline: '2px solid var(--colors-red-100)',
    outlineOffset: '2px',
  },
});

const control = css({
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
});

const indicator = css({ display: 'block', flexShrink: 0, w: '4', h: '4' });

const icon = css({ display: 'block', w: '100%', h: '100%' });

const radioAssetByState = {
  checked: '/images/icon/form/radio-checked.svg',
  disabled: '/images/icon/form/radio-disabled.svg',
  disabledChecked: '/images/icon/form/radio-disabled-checked.svg',
  unchecked: '/images/icon/form/radio-unchecked.svg',
} as const;

export type RadioOption<T extends string = string> = {
  disabled?: boolean;
  label: ReactNode;
  value: T;
};

export type RadioProps<T extends string = string> = {
  label?: ReactNode;
  multilineLabel?: boolean;
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  onValueChange: (value: T) => void;
  options: readonly RadioOption<T>[];
  value: T;
  /** Renders radios directly for visual option controls such as pills and image swatches. */
  variant?: 'default' | 'custom';
  optionClassName?: string;
  selectedOptionClassName?: string;
};

/** 프로젝트 표준 아이콘으로 제어형 단일 선택 라디오 그룹을 표시합니다. (Displays a controlled single-choice radio group with project-standard icons.) */
export function Radio<T extends string = string>({
  label,
  multilineLabel,
  ariaLabel,
  className,
  disabled = false,
  name,
  onValueChange,
  options,
  value,
  variant = 'default',
  optionClassName,
  selectedOptionClassName,
}: RadioProps<T>) {
  const field = useFormFieldContext();
  const controls = (
    <BaseRadioGroup
      aria-describedby={field?.describedBy}
      aria-label={ariaLabel}
      className={[
        css(group, label !== undefined && { display: 'flex!', gap: '6', flexShrink: '0' }),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      name={name}
      onValueChange={(nextValue) => onValueChange(nextValue as T)}
      value={value}
    >
      {options.map((item) => {
        const isSelected = item.value === value;
        const isDisabled = disabled || item.disabled;

        const radioAsset = isDisabled
          ? isSelected
            ? radioAssetByState.disabledChecked
            : radioAssetByState.disabled
          : isSelected
            ? radioAssetByState.checked
            : radioAssetByState.unchecked;

        if (variant === 'custom') {
          return (
            <BaseRadio.Root
              className={[optionClassName, isSelected ? selectedOptionClassName : undefined]
                .filter(Boolean)
                .join(' ')}
              disabled={isDisabled}
              key={item.value}
              value={item.value}
            >
              {item.label}
            </BaseRadio.Root>
          );
        }

        return (
          <HStack
            as="label"
            cursor="pointer"
            css={{ '&[data-disabled]': { cursor: 'not-allowed' } }}
            data-disabled={isDisabled ? '' : undefined}
            key={item.value}
          >
            <BaseRadio.Root className={control} disabled={isDisabled} value={item.value}>
              <span className={indicator}>
                <img alt="" aria-hidden="true" className={icon} src={radioAsset} />
              </span>
            </BaseRadio.Root>
            <Typography variant="body4">{item.label}</Typography>
          </HStack>
        );
      })}
    </BaseRadioGroup>
  );
  return label === undefined ? (
    controls
  ) : (
    <HStack justify="space-between" gap="3" alignItems="start">
      <Box flex="1" minW="0">
        <Typography
          variant="body4"
          className={multilineLabel ? css({ whiteSpace: 'pre-line' }) : undefined}
        >
          {label}
        </Typography>
      </Box>
      {controls}
    </HStack>
  );
}
