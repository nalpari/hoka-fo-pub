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
  detailedTrigger: css({
    '&&': { px: '12px', py: '16px', boxShadow: 'inset 0 0 0 1px #E9EAEB' },
    '&&[data-popup-open], &&:focus-visible': {
      boxShadow: 'inset 0 0 0 1px #B3B3B3',
    },
  }),
  detailedIndicator: css({
    display: 'flex',
    flexShrink: 0,
    '[data-popup-open] &': { transform: 'rotate(180deg)' },
  }),
  detailedItem: css({
    display: 'block',
    textAlign: 'left',
    w: '100%',
    px: '12px',
    py: '16px',
    cursor: 'pointer',
    '&[data-highlighted], &:hover': { bg: 'black.10' },
    '&[data-disabled]': { color: 'black.40', bg: 'transparent', cursor: 'not-allowed' },
    _focusVisible: { outline: '2px solid currentColor', outlineOffset: '-2px' },
  }),
  detailedSheetPreview: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    w: '100%',
    px: '12px',
    py: '16px',
    borderBottom: '1px solid #E9EAEB',
  }),
  detailedSheetList: css({ border: '1px solid #B3B3B3', gap: '0' }),
  detail: css({ flexShrink: 0, whiteSpace: 'nowrap' }),
  indicator: css({ display: 'block', flexShrink: 0 }),
};

export type DropdownOption = {
  value: string;
  label: ReactNode;
  prefix?: ReactNode;
  detail?: ReactNode;
  disabled?: boolean;
};

export type DropdownProps = {
  /** 기본 입력형이며 detailed는 보조값과 줄바꿈을 지원합니다. */
  variant?: 'default' | 'sort' | 'detailed';
  mobileSheetHeading?: { title: string; intro?: ReactNode };
  popupAlign?: 'start' | 'end';
  layer?: 'default' | 'modal';
  ariaLabel: string;
  label?: ReactNode;
  required?: boolean;
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
  hint,
  error,
  invalid = false,
  info,
  name,
  options,
  mobileNextSelection,
  mobileSheetHeading,
  defaultValue,
  className,
  indicator,
  indicatorSize,
  indicatorWidth,
  indicatorHeight,
  indicatorColor = 'currentColor',
  disabled: disabledProp = false,
  onValueChange,
  value: controlledValue,
}: DropdownProps) {
  const platform = usePlatform();
  const resolvedIndicatorSize =
    indicatorSize ?? (variant === 'sort' && platform === 'mobile' ? '14px' : '18px');
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
  const fallbackValue = defaultValue ?? options[0]?.value ?? '';
  const [uncontrolledValue, setUncontrolledValue] = useState(fallbackValue);
  const value = controlledValue ?? uncontrolledValue;
  const selectedOption = options.find((option) => option.value === value);

  const selectedLabel = selectedOption?.label;
  const isSort = variant === 'sort';
  const isDetailed = variant === 'detailed';
  const nextSelection = showNextSelection ? mobileNextSelection : undefined;
  const sheetLabel =
    nextSelection?.ariaLabel ?? mobileSheetHeading?.title ?? (isSort ? '정렬' : ariaLabel);

  function renderDetailedOption(option: DropdownOption, selected = false) {
    return (
      <Flex
        as="span"
        alignItems="center"
        justifyContent="space-between"
        gap="8px"
        w="100%"
        minW="0"
      >
        <Typography variant={selected ? 'b7M' : 'b7'}>{option.label}</Typography>
        {option.detail !== undefined ? (
          <Typography variant="b7M" className={styles.detail}>
            {option.detail}
          </Typography>
        ) : null}
      </Flex>
    );
  }

  useEffect(() => {
    if (!sheetOpen || (!showNextSelection && !isDetailed)) return;
    const group = sheetOptionsRef.current;
    const selected = group?.querySelector<HTMLElement>('[role="radio"][aria-checked="true"]');
    const first = group?.querySelector<HTMLElement>('[role="radio"]');
    (selected ?? first)?.focus();
  }, [isDetailed, sheetOpen, showNextSelection]);

  const mobileSheet = sheetOpen ? (
    <ModalDialog
      variant="selection"
      open
      mobilePresentation="bottomSheet"
      closeLabel="닫기"
      finalFocus={triggerRef}
      title={sheetLabel}
      onOpenChange={(open) => {
        if (!open) setSheetOpen(false);
      }}
    >
      {isDetailed ? (
        <Stack gap="8px">
          {mobileSheetHeading?.intro}
          {selectedOption ? (
            <button
              type="button"
              className={styles.detailedSheetPreview}
              aria-label={sheetLabel + ' 목록 접기'}
              onClick={() => setSheetOpen(false)}
            >
              {renderDetailedOption(selectedOption, true)}
              <Icon name="hoka-nav-chevron-up-regular" size="16px" />
            </button>
          ) : null}
        </Stack>
      ) : null}
      <div ref={sheetOptionsRef}>
        <Radio
          variant={isDetailed ? 'custom' : 'default'}
          optionClassName={isDetailed ? styles.detailedItem : undefined}
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
            disabled: option.disabled,
            label: isDetailed ? (
              renderDetailedOption(option)
            ) : option.prefix ? (
              <span className={css({ display: 'inline-flex', alignItems: 'center', gap: '8px' })}>
                {option.prefix}
                {option.label}
              </span>
            ) : (
              option.label
            ),
          }))}
          className={isDetailed ? styles.detailedSheetList : css({ gap: '16px' })}
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
          <Typography variant="b6" className={css({ '&&': { lineHeight: 'body' } })}>
            {selectedLabel ?? '정렬'}
          </Typography>
          {indicator ?? (
            <Icon
              name="chevron-down-regular"
              color={disabled ? 'var(--color-black-40)' : indicatorColor}
              style={{
                width: indicatorWidth ?? resolvedIndicatorSize,
                height: indicatorHeight ?? resolvedIndicatorSize,
              }}
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
            isDetailed ? styles.detailedTrigger : undefined,
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
              <Typography variant="b8">
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
              {isDetailed && selectedOption ? (
                renderDetailedOption(selectedOption, true)
              ) : (
                <Typography
                  variant="b4"
                  className={[
                    styles.label({ disabled }),
                    isSort ? css({ '&&': { lineHeight: 'body' } }) : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {selectedLabel ?? (isSort ? '정렬' : null)}
                </Typography>
              )}
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
                  : isDetailed
                    ? styles.detailedIndicator
                    : undefined
              }
            >
              {indicator ?? (
                <Icon
                  name={isSort || isDetailed ? 'chevron-down-regular' : 'sort-down-solid'}
                  color={disabled ? 'var(--color-black-40)' : indicatorColor}
                  className={styles.indicator}
                  style={{
                    width: indicatorWidth ?? resolvedIndicatorSize,
                    height: indicatorHeight ?? resolvedIndicatorSize,
                  }}
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
                          : isDetailed
                            ? styles.detailedItem
                            : styles.item
                      }
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {isDetailed ? (
                        renderDetailedOption(option)
                      ) : (
                        <Flex alignItems="center" gap="2">
                          {isSort ? (
                            <Icon
                              name={
                                option.value === value
                                  ? 'hoka-radio-checked'
                                  : 'hoka-radio-unchecked'
                              }
                              size="16px"
                            />
                          ) : null}
                          {option.prefix}
                          <Typography variant="b6">{option.label}</Typography>
                        </Flex>
                      )}
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
          variant="b8"
          tone="error"
          id={`${id}-error`}
          role="alert"
          className={css({ m: '0' })}
        >
          {error}
        </Typography>
      ) : null}
      {hint ? (
        <Typography as="p" variant="b8" id={`${id}-hint`} className={css({ m: '0' })}>
          {hint}
        </Typography>
      ) : null}
    </Stack>
  );
}
