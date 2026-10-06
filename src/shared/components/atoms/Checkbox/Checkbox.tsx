'use client';

import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import type { ComponentRenderFn } from '@base-ui/react/types';
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react';
import { css, cva } from 'styled-system/css';
import { Flex, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

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

const option = css({
  cursor: 'pointer',
  '&[data-disabled]': { cursor: 'not-allowed', opacity: '0.55' },
});

const control = css({
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
});

const icon = css({ display: 'block', w: '100%', h: '100%' });

const renderCheckboxControl: ComponentRenderFn<
  HTMLAttributes<HTMLSpanElement>,
  BaseCheckbox.Root.State
> = (props, { checked, indeterminate }) => (
  <>
    <span {...props}>
      <img
        alt=""
        aria-hidden="true"
        className={icon}
        src={
          checked || indeterminate
            ? '/images/icon/checkbox-checked.svg'
            : '/images/icon/checkbox-unchecked.svg'
        }
      />
    </span>
  </>
);

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
  onCheckedChange,
  ...rootProps
}: SingleCheckboxProps) {
  return (
    <Flex
      as="label"
      alignItems="center"
      className={[option, className].filter(Boolean).join(' ')}
      data-disabled={disabled ? '' : undefined}
      gap="7px"
    >
      <BaseCheckbox.Root
        {...rootProps}
        className={control}
        disabled={disabled}
        onCheckedChange={(checked) => onCheckedChange?.(checked)}
        render={renderCheckboxControl}
      />
      <Typography as="span" variant="formLabel">
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
  return (
    <BaseCheckboxGroup
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
            <Typography as="span" variant="formLabel">
              {item.label}
            </Typography>
          </Stack>
        );
      })}
    </BaseCheckboxGroup>
  );
}

export function Checkbox(props: SingleCheckboxProps): ReactNode;

export function Checkbox<T extends string>(props: CheckboxGroupProps<T>): ReactNode;

/** A Base UI checkbox supporting either one boolean value or a group of option values. */
export function Checkbox<T extends string>(props: SingleCheckboxProps | CheckboxGroupProps<T>) {
  return 'options' in props ? <CheckboxGroup {...props} /> : <SingleCheckbox {...props} />;
}
