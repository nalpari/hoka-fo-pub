'use client';

import type { ReactNode } from 'react';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const group = css({ display: 'grid', gap: '4' });

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

const indicator = css({ display: 'block', flexShrink: 0, w: '4', h: '4' });

const icon = css({ display: 'block', w: '100%', h: '100%' });

export type RadioOption<T extends string = string> = {
  disabled?: boolean;
  label: ReactNode;
  value: T;
};

export type RadioProps<T extends string = string> = {
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  onValueChange: (value: T) => void;
  options: readonly RadioOption<T>[];
  value: T;
};

/** Controlled single-choice radio group with project-standard radio icon assets. */
export function Radio<T extends string = string>({
  ariaLabel,
  className,
  disabled = false,
  name,
  onValueChange,
  options,
  value,
}: RadioProps<T>) {
  return (
    <BaseRadioGroup
      aria-label={ariaLabel}
      className={[group, className].filter(Boolean).join(' ')}
      disabled={disabled}
      name={name}
      onValueChange={(nextValue) => onValueChange(nextValue as T)}
      value={value}
    >
      {options.map((item) => {
        const isSelected = item.value === value;

        return (
          <HStack
            as="label"
            className={option}
            data-disabled={disabled || item.disabled ? '' : undefined}
            key={item.value}
          >
            <BaseRadio.Root className={control} disabled={item.disabled} value={item.value}>
              <span className={indicator}>
                <img
                  alt=""
                  aria-hidden="true"
                  className={icon}
                  src={
                    isSelected
                      ? '/images/icon/radio-checked.svg'
                      : '/images/icon/radio-unchecked.svg'
                  }
                />
              </span>
            </BaseRadio.Root>
            <Typography as="span" variant="formLabel">
              {item.label}
            </Typography>
          </HStack>
        );
      })}
    </BaseRadioGroup>
  );
}
