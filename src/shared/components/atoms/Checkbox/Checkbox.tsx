'use client';

import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react';
import { useId, useRef } from 'react';
import { css, cva } from 'styled-system/css';
import { Flex, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { useFormFieldContext } from '@/shared/components/atoms/FormField/FormField';

const group = cva({
  base: { display: 'flex', gap: '8px' },
  defaultVariants: { direction: 'column' },
  variants: {
    direction: {
      column: { flexDirection: 'column' },
      row: { flexDirection: 'row', flexWrap: 'wrap' },
    },
  },
});

const optionStyle = css.raw({
  cursor: 'pointer',
  '&[data-disabled]': { cursor: 'not-allowed', opacity: '0.55' },
});

const option = css(optionStyle);

const controlStyle = css.raw({
  '&&[aria-invalid="true"]': { outline: '2px solid var(--colors-red-100)', outlineOffset: '-2px' },
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
});

const control = css(controlStyle);

const iconStyle = css.raw({ display: 'block', w: '100%', h: '100%' });

function getCheckboxIconSource(checked: boolean, disabled: boolean) {
  if (disabled) {
    return checked
      ? '/images/icon/form/checkbox-disabled-checked.svg'
      : '/images/icon/form/checkbox-disabled.svg';
  }

  return checked
    ? '/images/icon/form/checkbox-checked.svg'
    : '/images/icon/form/checkbox-unchecked.svg';
}

function renderCheckboxControl(
  props: HTMLAttributes<HTMLSpanElement>,
  { checked, disabled, indeterminate }: BaseCheckbox.Root.State,
  variant: 'default' | 'filter' = 'default',
) {
  return (
    <span {...props}>
      <img
        alt=""
        aria-hidden="true"
        className={css(
          iconStyle,
          variant === 'filter' && !checked && !indeterminate && !disabled && { opacity: '0.53' },
        )}
        src={getCheckboxIconSource(checked || indeterminate, disabled)}
      />
    </span>
  );
}

type BaseCheckboxRootProps = ComponentPropsWithoutRef<typeof BaseCheckbox.Root>;

export type CheckboxOption<T extends string = string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

export type SingleCheckboxProps = Omit<
  BaseCheckboxRootProps,
  'children' | 'className' | 'onCheckedChange'
> & {
  className?: string;
  label: ReactNode;
  /** Compact filter with state-dependent label color. */
  variant?: 'default' | 'filter';
  /** Consent text may contain links or detail buttons. */
  interactiveLabel?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export type CheckboxGroupProps<T extends string = string> = {
  ariaLabel?: string;
  className?: string;
  direction?: 'row' | 'column';
  onValueChange: (value: T[]) => void;
  options: readonly CheckboxOption<T>[];
  renderOption?: (option: CheckboxOption<T>, control: ReactNode) => ReactNode;
  value: T[];
};

function SingleCheckbox({
  className,
  disabled,
  label: checkboxLabel,
  variant = 'default',
  interactiveLabel = false,
  onCheckedChange,
  ...rootProps
}: SingleCheckboxProps) {
  const field = useFormFieldContext();
  const labelId = useId();
  const controlRef = useRef<HTMLSpanElement>(null);

  return (
    <Flex
      as={interactiveLabel ? 'div' : 'label'}
      alignItems="center"
      className={[
        css(
          optionStyle,
          variant === 'filter' && {
            gap: '2',
            color: 'black.50',
            '&:not([data-disabled]):has([data-checked])': { color: 'black.100' },
            '&[data-disabled]': { color: 'black.40', opacity: '1' },
          },
        ),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-disabled={disabled ? '' : undefined}
      data-checkbox-label=""
    >
      <BaseCheckbox.Root
        {...rootProps}
        aria-describedby={
          [rootProps['aria-describedby'], field?.describedBy].filter(Boolean).join(' ') || undefined
        }
        ref={controlRef}
        aria-labelledby={rootProps['aria-labelledby'] ?? (interactiveLabel ? labelId : undefined)}
        className={css(
          controlStyle,
          variant === 'filter' && {
            w: '4',
            h: '4',
            '&[data-disabled]': { bg: 'black.20' },
          },
        )}
        disabled={disabled}
        onCheckedChange={(checked) => onCheckedChange?.(checked)}
        render={(props, state) => renderCheckboxControl(props, state, variant)}
      />
      <Typography
        variant="body4"
        id={interactiveLabel ? labelId : undefined}
        onClick={(event) => {
          if (!interactiveLabel || disabled || (event.target as HTMLElement).closest('a, button'))
            return;
          controlRef.current?.click();
          controlRef.current?.focus();
        }}
      >
        {checkboxLabel}
      </Typography>
    </Flex>
  );
}

function CheckboxGroup<T extends string>({
  ariaLabel,
  className,
  direction = 'column',
  onValueChange,
  options,
  renderOption,
  value,
}: CheckboxGroupProps<T>) {
  const field = useFormFieldContext();
  return (
    <BaseCheckboxGroup
      aria-describedby={field?.describedBy}
      aria-label={ariaLabel}
      className={[group({ direction }), className].filter(Boolean).join(' ')}
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as T[])}
    >
      {options.map((item) => {
        const controlNode = (
          <BaseCheckbox.Root
            className={control}
            disabled={item.disabled}
            render={renderCheckboxControl}
            value={item.value}
          />
        );

        return renderOption ? (
          <Flex as="span" key={item.value}>
            {renderOption(item, controlNode)}
          </Flex>
        ) : (
          <Stack
            as="label"
            alignItems="center"
            className={option}
            data-disabled={item.disabled ? '' : undefined}
            direction="row"
            gap="2"
            key={item.value}
          >
            {controlNode}
            <Typography variant="body4">{item.label}</Typography>
          </Stack>
        );
      })}
    </BaseCheckboxGroup>
  );
}

export function Checkbox(props: SingleCheckboxProps): ReactNode;

export function Checkbox<T extends string>(props: CheckboxGroupProps<T>): ReactNode;

/** 단일 선택 또는 옵션 그룹을 지원하는 체크박스입니다. (Provides a Base UI checkbox for one value or a group of options.) */
export function Checkbox<T extends string>(props: SingleCheckboxProps | CheckboxGroupProps<T>) {
  return 'options' in props ? <CheckboxGroup {...props} /> : <SingleCheckbox {...props} />;
}
