'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import { type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css, cva } from 'styled-system/css';
import { Flex, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { useFormFieldContext } from '@/components/common/atoms/FormField';
import { Icon } from '@/components/common/atoms/Icon';
import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

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
  popup: css.raw({
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
  variant?: 'default' | 'sort';
  popupAlign?: 'start' | 'end';
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
  mobileNextSelection?: {
    ariaLabel: string;
    options: readonly DropdownOption[];
    value: string;
    onValueChange: (value: string) => void;
  };
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

/** 기본 선택 필드와 PC 정렬 메뉴·모바일 즉시 선택 시트를 제공합니다. (Provides select fields, desktop sort menus and mobile sheets with immediate selection.) */
export function Dropdown({
  variant = 'default',
  popupAlign = variant === 'sort' ? 'end' : 'start',
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
  mobileNextSelection,
  defaultValue,
  className,
  indicator,
  indicatorSize = variant === 'sort' ? '14px' : '18px',
  indicatorWidth = indicatorSize,
  indicatorHeight = indicatorSize,
  indicatorColor = 'currentColor',
  disabled: disabledProp = false,
  onValueChange,
  value: controlledValue,
}: DropdownProps) {
  const platform = usePlatform();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetOptionsRef = useRef<HTMLDivElement>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showNextSelection, setShowNextSelection] = useState(false);
  const [draftValue, setDraftValue] = useState('');
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
  const isSort = variant === 'sort';
  const nextSelection = showNextSelection ? mobileNextSelection : undefined;
  const sheetLabel = nextSelection?.ariaLabel ?? (isSort ? '정렬' : ariaLabel);

  useEffect(() => {
    if (!sheetOpen || !showNextSelection) return;
    const group = sheetOptionsRef.current;
    const selected = group?.querySelector<HTMLElement>('[role="radio"][aria-checked="true"]');
    const first = group?.querySelector<HTMLElement>('[role="radio"]');
    (selected ?? first)?.focus();
  }, [sheetOpen, showNextSelection]);

  const mobileSheet = sheetOpen ? (
    <ModalDialog
      open
      mobilePresentation="bottomSheet"
      closeLabel="닫기"
      finalFocus={triggerRef}
      title={sheetLabel}
      onOpenChange={(open) => {
        if (!open) setSheetOpen(false);
      }}
    >
      <div ref={sheetOptionsRef}>
        <Radio
          key={sheetLabel}
          ariaLabel={nextSelection?.ariaLabel ?? ariaLabel}
          value={draftValue}
          onValueChange={setDraftValue}
          onOptionActivate={(nextValue) => {
            if (nextSelection) {
              nextSelection.onValueChange(nextValue);
              setSheetOpen(false);
              return;
            }
            if (controlledValue === undefined) setUncontrolledValue(nextValue);
            onValueChange?.(nextValue);
            if (mobileNextSelection) {
              setShowNextSelection(true);
              setDraftValue(mobileNextSelection.value);
              return;
            }
            setSheetOpen(false);
          }}
          options={(nextSelection?.options ?? options).map((option) => ({
            value: option.value,
            label: option.prefix ? (
              <span className={css({ display: 'inline-flex', alignItems: 'center', gap: '8px' })}>
                {option.prefix}
                {option.label}
              </span>
            ) : (
              option.label
            ),
          }))}
          className={css({ gap: '16px' })}
        />
      </div>
    </ModalDialog>
  ) : null;

  // [ 개발팀 바인딩 ] 선택값과 options는 호출 화면이 소유합니다. 모바일 Radio의 클릭·Enter·Space는 onValueChange(value)를 전달합니다. mobileNextSelection이 있으면 같은 시트에서 다음 선택으로 이어지고 그 콜백 후 닫으며, 없으면 즉시 닫습니다. 방향키는 초안만 바꾸고 닫기/Escape는 현재 단계 초안만 폐기합니다. API 요청은 없으며 상품 목록 모바일의 필터 Radio/적용 소유자는 유지합니다.
  if (isSort && platform === 'mobile') {
    return (
      <>
        <Button
          ref={triggerRef}
          variant="unstyled"
          type="button"
          aria-label={ariaLabel}
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
          disabled={disabled}
          onClick={() => {
            setShowNextSelection(false);
            setDraftValue(value);
            setSheetOpen(true);
          }}
          className={[
            css({
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              p: '0',
              border: '0',
              bg: 'transparent',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              _disabled: { cursor: 'not-allowed', color: 'var(--color-black-40)' },
              _focusVisible: { outline: '2px solid var(--colors-black-100)', outlineOffset: '2px' },
              h: 'max(20px, var(--touch-target-min-size))',
              my: 'calc((20px - max(20px, var(--touch-target-min-size))) / 2)',
            }),
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {selectedOption?.prefix}
          <Typography variant="body3" className={css({ lineHeight: '20px' })}>
            {placeholder ?? selectedLabel}
          </Typography>
          {indicator ?? (
            <Icon
              name="chevron-down-regular"
              color={disabled ? 'var(--color-black-40)' : indicatorColor}
              style={{ width: indicatorWidth, height: indicatorHeight }}
            />
          )}
        </Button>
        {name ? <input type="hidden" name={name} value={value} disabled={disabled} /> : null}
        {mobileSheet}
      </>
    );
  }

  return (
    <Stack gap="8px" minW="0">
      <BaseSelect.Root
        modal={false}
        open={platform === 'mobile' ? false : popupOpen}
        onOpenChange={(nextOpen) => {
          if (platform === 'mobile') {
            if (nextOpen) {
              setShowNextSelection(false);
              setDraftValue(value);
              setSheetOpen(true);
            }
          } else {
            setPopupOpen(nextOpen);
          }
        }}
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
          ref={triggerRef}
          {...(platform === 'mobile'
            ? ({ 'aria-haspopup': 'dialog', 'aria-expanded': sheetOpen } as const)
            : {})}
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
            isSort
              ? css({
                  '&&': {
                    w: 'auto',
                    // Keep the 20px layout row while extending the centered hit area.
                    h: 'max(20px, var(--touch-target-min-size))',
                    my: 'calc((20px - max(20px, var(--touch-target-min-size))) / 2)',
                    p: '0',
                    boxShadow: 'none',
                    bg: 'transparent',
                    whiteSpace: 'nowrap',
                  },
                  '&&[data-popup-open]': { boxShadow: 'none' },
                  '&&:focus-visible': {
                    outline: '2px solid var(--colors-black-100)',
                    outlineOffset: '2px',
                  },
                })
              : '',
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
              <Typography
                variant="body3"
                className={[
                  styles.label({ disabled }),
                  isSort ? css({ lineHeight: '1.3', letterSpacing: '-0.02em' }) : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {isSort && placeholder ? placeholder : selectedLabel}
              </Typography>
            </Flex>
            <BaseSelect.Icon
              className={
                isSort
                  ? css({
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0,
                      '[data-popup-open] &': { transform: 'rotate(180deg)' },
                    })
                  : undefined
              }
            >
              {indicator ?? (
                <Icon
                  name={isSort ? 'chevron-down-regular' : 'sort-down-solid'}
                  color={disabled ? 'var(--color-black-40)' : indicatorColor}
                  className={styles.indicator}
                  style={{ width: indicatorWidth, height: indicatorHeight }}
                />
              )}
            </BaseSelect.Icon>
          </Flex>
        </BaseSelect.Trigger>
        {platform !== 'mobile' ? (
          <BaseSelect.Portal>
            <BaseSelect.Positioner
              className={[styles.positioner, layer === 'modal' ? css({ zIndex: '120!' }) : '']
                .filter(Boolean)
                .join(' ')}
              sideOffset={isSort ? 8 : 0}
              align={popupAlign}
              alignItemWithTrigger={false}
            >
              <BaseSelect.Popup
                className={css(
                  styles.popup,
                  isSort
                    ? {
                        w: 'max-content',
                        minW: '130px',
                        p: '12px',
                        borderRadius: '4px',
                        borderColor: '#B3B3B3',
                      }
                    : {},
                )}
              >
                <BaseSelect.List
                  className={css({
                    maxH: '324px',
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--colors-black-20) transparent',
                    ...(isSort ? { display: 'grid', gap: '16px' } : {}),
                  })}
                >
                  {options.map((option) => (
                    <BaseSelect.Item
                      className={
                        isSort
                          ? css({
                              minH: 'var(--touch-target-min-size)',
                              cursor: 'pointer',
                              borderRadius: '2px',
                              _focusVisible: {
                                outline: '2px solid var(--colors-black-100)',
                                outlineOffset: '-2px',
                              },
                            })
                          : styles.item
                      }
                      key={option.value}
                      value={option.value}
                    >
                      <Flex alignItems="center" gap="2">
                        {isSort ? (
                          <Icon
                            name={
                              option.value === value ? 'hoka-radio-checked' : 'hoka-radio-unchecked'
                            }
                            size="16px"
                          />
                        ) : null}
                        {option.prefix}
                        <Typography variant="body4">{option.label}</Typography>
                      </Flex>
                    </BaseSelect.Item>
                  ))}
                </BaseSelect.List>
              </BaseSelect.Popup>
            </BaseSelect.Positioner>
          </BaseSelect.Portal>
        ) : null}
      </BaseSelect.Root>
      {platform === 'mobile' ? mobileSheet : null}
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
