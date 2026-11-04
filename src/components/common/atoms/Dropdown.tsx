'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import { type ReactNode, useId, useState } from 'react';

import { css, cva } from 'styled-system/css';
import { Flex, Stack } from 'styled-system/jsx';

import { useFormFieldContext } from '@/components/common/atoms/FormField';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

const styles = {
  trigger: cva({
    base: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      w: '100%',
      py: '2',
      _focusVisible: {
        outline: 'none',
        boxShadow: 'inset 0 0 0 2px var(--colors-black-100)',
      },
      '&[data-popup-open]': {
        boxShadow: 'inset 0 0 0 2px var(--colors-black-100)',
      },
      px: '3',
      border: '0',
      boxShadow: 'inset 0 0 0 1px var(--color-border-tertiary)',
      bg: 'var(--color-white-000)',
      cursor: 'pointer',
      '&&': {
        color: 'var(--color-text-primary)',
      },
      '&&[data-invalid]': { boxShadow: 'inset 0 0 0 2px var(--colors-red-100)' },
    },
    variants: {
      disabled: {
        true: {
          bg: 'var(--color-black-10)',
          cursor: 'not-allowed',
          '&&': {
            color: 'var(--color-black-40)',
          },
        },
        false: {},
      },
    },
  }),
  label: cva({
    base: {
      flex: 1,
      textAlign: 'left',
    },
    variants: {
      disabled: {
        true: {
          '&&': {
            color: 'var(--color-text-subtle)',
          },
        },
        false: {},
      },
    },
  }),
  positioner: css({ zIndex: 10 }),
  popup: css({
    w: 'var(--anchor-width)',
    borderBottomRadius: '4px',
    overflow: 'hidden',
    border: '1px solid var(--color-black-20)',
    bg: 'var(--color-white-000)',
    '&&': {
      color: 'var(--color-text-primary)',
    },
  }),
  item: css({
    h: '36px',
    py: '8px',
    px: '16px',
    cursor: 'pointer',
    _hover: {
      bg: 'var(--color-black-10)',
    },
    '&[data-highlighted]': {
      bg: 'var(--color-black-10)',
    },
  }),
  indicator: css({ display: 'block', flexShrink: 0 }),
};

export type DropdownOption = { value: string; label: ReactNode; prefix?: ReactNode };

export type DropdownProps = {
  layer?: 'default' | 'modal';
  ariaLabel: string;
  label?: ReactNode;
  required?: boolean;
  placeholder?: string;
  hint?: ReactNode;
  error?: ReactNode;
  invalid?: boolean;
  info?: ReactNode;
  name?: string;
  options: readonly DropdownOption[];
  defaultValue?: string;
  className?: string;
  indicator?: ReactNode;
  indicatorSize?: string;
  indicatorWidth?: string;
  indicatorHeight?: string;
  indicatorColor?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  value?: string;
};

/** 선택값과 옵션 목록을 표시하며 모달 내부에서는 전용 포털 높이를 사용합니다. (Displays a select control with optional modal portal layering.) */
export function Dropdown({
  layer = 'default',
  ariaLabel,
  label,
  required: requiredProp,
  placeholder,
  hint,
  error,
  invalid = false,
  info,
  name,
  options,
  defaultValue,
  className,
  indicator,
  indicatorSize = '18px',
  indicatorWidth = indicatorSize,
  indicatorHeight = indicatorSize,
  indicatorColor = 'currentColor',
  disabled: disabledProp = false,
  onValueChange,
  value: controlledValue,
}: DropdownProps) {
  const field = useFormFieldContext();
  const disabled = disabledProp || Boolean(field?.disabled);
  const required = requiredProp ?? field?.required;
  const hasError = invalid || Boolean(error) || Boolean(field?.invalid);
  const id = useId();
  const fallbackValue = defaultValue ?? (placeholder ? '' : (options[0]?.value ?? ''));
  const [uncontrolledValue, setUncontrolledValue] = useState(fallbackValue);
  const value = controlledValue ?? uncontrolledValue;
  const selectedOption = options.find((option) => option.value === value);

  const selectedLabel = selectedOption?.label ?? placeholder;

  return (
    <Stack gap="8px" minW="0">
      <BaseSelect.Root
        items={options}
        name={name}
        required={required}
        defaultValue={fallbackValue}
        disabled={disabled}
        onValueChange={(nextValue) => {
          const next = nextValue ?? fallbackValue;

          if (controlledValue === undefined) setUncontrolledValue(next);
          onValueChange?.(next);
        }}
        value={value || null}
      >
        <BaseSelect.Trigger
          id={field?.htmlFor}
          aria-label={ariaLabel}
          aria-invalid={hasError || undefined}
          data-invalid={hasError ? '' : undefined}
          aria-describedby={
            [field?.describedBy, hint ? `${id}-hint` : '', error ? `${id}-error` : '']
              .filter(Boolean)
              .join(' ') || undefined
          }
          className={[
            styles.trigger({ disabled }),
            label
              ? css({
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  h: 'formField',
                  pt: '8px',
                  pb: '6px',
                  px: '12px',
                  gap: '7px',
                })
              : '',
            hasError
              ? css({
                  '&&': {
                    boxShadow: 'inset 0 0 0 2px var(--colors-red-100)',
                  },
                })
              : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {label ? (
            <span className={css({ display: 'flex', alignItems: 'center', h: '16px', gap: '4px' })}>
              <Typography variant="body5">
                {required ? '* ' : ''}
                {label}
              </Typography>
              {info ? (
                <span title={typeof info === 'string' ? info : undefined}>
                  {typeof info === 'string' ? (
                    <Icon name="circle-info-regular" size="16px" aria-label={info} />
                  ) : (
                    info
                  )}
                </span>
              ) : null}
            </span>
          ) : null}
          <Flex alignItems="center" justifyContent="space-between" gap="2" w="100%">
            <Flex alignItems="center" gap="2" minW="0" flex="1">
              {selectedOption?.prefix}
              <Typography variant="body3" className={styles.label({ disabled })}>
                {selectedLabel}
              </Typography>
            </Flex>
            <BaseSelect.Icon>
              {indicator ?? (
                <Icon
                  name="sort-down-solid"
                  color={disabled ? 'var(--color-black-40)' : indicatorColor}
                  className={styles.indicator}
                  style={{ width: indicatorWidth, height: indicatorHeight }}
                />
              )}
            </BaseSelect.Icon>
          </Flex>
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner
            className={[styles.positioner, layer === 'modal' ? css({ zIndex: '120!' }) : '']
              .filter(Boolean)
              .join(' ')}
            sideOffset={0}
            alignItemWithTrigger={false}
          >
            <BaseSelect.Popup className={styles.popup}>
              <BaseSelect.List
                className={css({
                  maxH: '324px',
                  overflowY: 'auto',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'var(--colors-black-20) transparent',
                })}
              >
                {options.map((option) => (
                  <BaseSelect.Item className={styles.item} key={option.value} value={option.value}>
                    <Flex alignItems="center" gap="2">
                      {option.prefix}
                      <Typography variant="body4">{option.label}</Typography>
                    </Flex>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
      {error ? (
        <Typography
          as="p"
          variant="body5"
          tone="error"
          id={`${id}-error`}
          role="alert"
          className={css({ m: '0' })}
        >
          {error}
        </Typography>
      ) : null}
      {hint ? (
        <Typography as="p" variant="body5" id={`${id}-hint`} className={css({ m: '0' })}>
          {hint}
        </Typography>
      ) : null}
    </Stack>
  );
}
